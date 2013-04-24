var fs = require("fs");
var req = require('request-iconv').set('EUC-KR');
var jsdom = require('jsdom');

function main(app){
    app.get("/", function(request, response){
        fs.readFile("view/main.html", function(error, data){
            response.writeHead(200, {'Content-Type':'text/html; charset=EUC-KR'});
            response.end(data);
        });
    });
    app.post("/get", function(request, response){
        var prod = request.body.prod;
        req({
            method: 'POST',
            uri: 'http://www.istarbucks.co.kr/Menu/product_list_ajax.asp',
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            body: prod
        }, function(err, res, body) {
            console.log(body);
            while(body.indexOf('href="/css') !== -1) {
                body = body.replace('href="/css/common.css"', '');
            }
            while(body.indexOf('src="/img') !== -1) {
                body = body.replace('src="/img', 'src="http://www.istarbucks.co.kr/img');
            }
            while(body.indexOf('src="/upload') !== -1) {
                body = body.replace('src="/upload', 'src="http://www.istarbucks.co.kr/upload');
            }
            response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            response.end(body);
        });
    });
    app.get('/map', function(request, response) {
        fs.readFile("view/map.html", function(error, data){
            response.writeHead(200, {'Content-Type':'text/html; charset=EUC-KR'});
            response.end(data);
        });
    });
    app.get("/view", function(request, response){
        req({
            method: 'POST',
            uri: 'http://www.istarbucks.co.kr/Menu/view_drink.asp',
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            body: 'Product_cd=110563&PageType=prod&prod=prod'
        }, function(err, res, body) {
            
            response.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            response.end(body);
        });
    });
}
exports.main = main;