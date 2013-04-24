var connect = require("connect")
    , connect_router = require("connect_router")
    , _router = require("./router"); 

var httpServer = connect.createServer()
        .use(connect.logger({ immediate: true, format: 'dev' }))
        .use(connect.bodyParser())
        .use(connect.cookieParser())
        .use(connect.session({ secret: 'keyboard cat'}))
        .use(connect_router(_router.main))
        .use(connect.static(__dirname+"/Resource"))
        .use(connect.errorHandler( {statck:true,message:true,dump:true}))
        .listen(process.env.PORT, process.env.IP, function(){
            console.log("Run on Server...");
        });
        
//.replace() - 임의조작 - 대체할 모듈이나 함수 찾기
// ajax 응답 도착 여부 확인법.
// absolute위치 확인
