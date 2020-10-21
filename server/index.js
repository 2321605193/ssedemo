var http = require("http");

http.createServer(function (req, res) {
  var fileName = "." + req.url;

  console.log(req.url)

  if (fileName === "./stream") {
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": 'http://127.0.0.1:8080',
      "Access-Control-Allow-Credentials":true
    });
    res.write("retry: 10000\n"); //断线重连时间
    res.write("data: " + (new Date()) + "\n\n");
    res.write("data: " + (new Date()) + "\n\n");

    interval = setInterval(function () {
      res.write("data: " + (new Date()) + "\n\n");
    }, 1000);

    req.connection.addListener("close", function () {
      clearInterval(interval);
    }, false);

    let obj = {
        name: 'junjun',
        tel: '185****3636'
    }

    setTimeout(()=>{
        res.write("event: chengValue\n");
        res.writeHead(404, {
            "Content-Type":"text/event-stream",
            "Cache-Control":"no-cache",
            "Connection":"keep-alive",
            "Access-Control-Allow-Origin": 'http://127.0.0.1:8080',
            "Access-Control-Allow-Credentials":true
          });
    
        res.write("data: " + (JSON.stringify(obj)) + "\n\n");
    },5000)

  } else if (fileName === "./sse") {
    res.writeHead(200, {
        "Content-Type":"text/event-stream",
        "Cache-Control":"no-cache",
        "Connection":"keep-alive",
        "Access-Control-Allow-Origin": 'http://127.0.0.1:8080',
        "Access-Control-Allow-Credentials":true
      });
      res.write("retry: 10000\n");


      setTimeout(()=>{
        res.write("event: sse\n")
        res.write("data: sse事件触发\n\n");
      },5000)

      setTimeout(()=>{
        res.write("event: input\n")
        res.write("data: input事件触发\n\n");
      },5000)
  }
}).listen(8844, "127.0.0.1");