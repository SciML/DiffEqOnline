# Load required packages
using JuliaWebAPI
using Logging
using Compat
using ZMQ


const SRVR_ADDR = "tcp://127.0.0.1:9999"
const Cross_origin_JSON = Dict{Compat.UTF8String,Compat.UTF8String}("Content-Type" => "application/json; charset=utf-8", "Access-Control-Allow-Origin" => "http://localhost:4200")


function squareit(b64)
    strArr = String(base64decode(b64))
    arr = JSON.parse(strArr)
    return JSON.json(Dict("data" => arr.^2))
end

const REGISTERED_APIS = [
        (squareit, false, Cross_origin_JSON)
]

process(REGISTERED_APIS, "tcp://127.0.0.1:9999"; bind=true, log_level=INFO)