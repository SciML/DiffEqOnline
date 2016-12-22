# Load required packages
using JuliaWebAPI, Logging, Compat, ZMQ, DifferentialEquations


const SRVR_ADDR = "tcp://127.0.0.1:9999"
const Cross_origin_JSON = Dict{Compat.UTF8String,Compat.UTF8String}("Content-Type" => "application/json; charset=utf-8", "Access-Control-Allow-Origin" => "http://localhost:4200")


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

     try # Put everything in a try-catch block for now -- probably wrecks the performance
        exstr = string("begin\n", obj["diffEqText"], "\nend")

        # Sanitization goes here!!!
        ex = parse(exstr)
        println("Diff equ: ", ex)
        name = Symbol("Foo")
        params = [parse(p) for p in obj["parameters"]]
        println("Params: ", params)
        # Make sure these are always floats
        tspan = (Float64(obj["timeSpan"][1]),Float64(obj["timeSpan"][2]))
        println("tspan: ", tspan)
        u0 = [parse(u) for u in obj["initialConditions"]]
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
        println("did sol: ", sol.u)
        println("Pretty much done at this point")
        res = Dict("u" => sol.u, "t" => sol.t)
        return JSON.json(Dict("data" => res, "error" => false))
    catch err
        console.log(err)
        return JSON.json(Dict("data" => false, "error" => String(err)))
    end

end

const REGISTERED_APIS = [
        (squareit, false, Cross_origin_JSON),
        (solveit, false, Cross_origin_JSON)
]

process(REGISTERED_APIS, "tcp://127.0.0.1:9999"; bind=true, log_level=INFO)
