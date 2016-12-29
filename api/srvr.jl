# Load required packages
using JuliaWebAPI, Logging, Compat, ZMQ, DifferentialEquations, Plots

plotly()


const SRVR_ADDR = "tcp://127.0.0.1:9999"
const Cross_origin_JSON = Dict{Compat.UTF8String,Compat.UTF8String}("Content-Type" => "application/json; charset=utf-8", "Access-Control-Allow-Origin" => "http://localhost:4200")
const numpoints = 1000

expr_has_head(s, h) = false
expr_has_head(e::Expr, h::Symbol) = expr_has_head(e, Symbol[h])
function expr_has_head(e::Expr, vh::Vector{Symbol})
    in(e.head, vh) || any(a -> expr_has_head(a, vh), e.args)
end

has_function_def(s::String) = has_function_def(parse(s; raise=false))
has_function_def(e::Expr) = expr_has_head(e, Symbol[:(->), :function])


function squareit(b64)
    strArr = String(base64decode(b64))
    arr = JSON.parse(strArr)
    return JSON.json(Dict("data" => arr.^2))
end

function solveit(b64)
    strObj = String(base64decode(b64))
    obj = JSON.parse(strObj)
    # println(obj)
    # println(" ")

    exstr = string("begin\n", obj["diffEqText"], "\nend")
    if has_function_def(exstr)
        return JSON.json(Dict("data" => false, "error" => "Don't define functions in your system of equations..."))
    end
    ex = parse(exstr)
    # Need a way to make sure the expression only calls "safe" functions here!!!
    println("Diff equ: ", ex)
    name = Symbol(strObj)
    params = [parse(p) for p in obj["parameters"]]
    println("Params: ", params)
    # Make sure these are always floats
    tspan = (Float64(obj["timeSpan"][1]),Float64(obj["timeSpan"][2]))
    println("tspan: ", tspan)
    u0 = [parse(Float64, u) for u in obj["initialConditions"]]
    println("u0: ", u0)
    opts = Dict{Symbol,Bool}(
        :build_tgrad => true,
        :build_jac => true,
        :build_expjac => false,
        :build_invjac => true,
        :build_invW => true,
        :build_hes => false,
        :build_invhes => false,
        :build_dpfuncs => true)
    f = ode_def_opts(name, opts, ex, params...)
    println("did f")
    prob = ODEProblem(f,u0,tspan)
    println("did prob: ", prob)
    sol = solve(prob)

    println("did sol")
    newt = collect(linspace(sol.t[1],sol.t[end],numpoints))
    newu = sol.interp(newt)
    p = plot(sol,xlabel="t")
    layout = Plots.plotly_layout_json(p)
    series = Plots.plotly_series_json(p)

    println("Pretty much done at this point")

    # Destroy some methods and objects
    ex = 0
    name = 0
    params = 0

    res = Dict("u" => newu, "t" => newt, "layout" =>layout, "series"=>series)
    return JSON.json(Dict("data" => res, "error" => false))

end

const REGISTERED_APIS = [
        (squareit, false, Cross_origin_JSON),
        (solveit, false, Cross_origin_JSON)
]

process(REGISTERED_APIS, "tcp://127.0.0.1:9999"; bind=true, log_level=INFO)
