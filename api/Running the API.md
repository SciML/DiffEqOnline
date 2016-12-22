# Running the API locally

This example is closely modeled on the docs for [JuliaWebAPI.jl](https://github.com/JuliaWeb/JuliaWebAPI.jl).  Make sure you have the `JuliaWebAPI`, `Compat`, and `JSON` packages installed.

In this folder, run `julia srvr.jl &`.

In a Julia REPL or Jupyter notebook run

```julia
using JuliaWebAPI   #Load package
using Logging
Logging.configure(level=INFO);

#Create the ZMQ client that talks to the ZMQ listener above
const apiclnt = APIInvoker("tcp://127.0.0.1:9999");

#Starts the HTTP server in current process
run_http(apiclnt, 7777)
```

Go to `http://localhost:7777/squareit/WzEsMiwzXQ==` to see if it's working.  The nonsensical bit at the end is the base64 encoding of `"[1,2,3]"`.  You should see a response of `{"data":"[1,4,9]"}`.  

## Important note

By default, the `Access-Control-Allow-Origin` headers are set to only accept connections from front-ends hosted locally.  You will need to modify the settings in `srvr.jl` if you're serving the front end elsewhere -- from the github pages for example.   
