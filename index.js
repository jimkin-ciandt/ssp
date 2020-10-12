
var http = require('http');
var fs = require('fs');
var path = require('path');


var server = http.createServer((req, res) => {

    if (req.url === '/') {
        readFileSend('./app/index.html')
    } else {
        readFileSend(`/app/${req.url}`)
    }


    function readFileSend(url) {

        let suffix = url.slice( url.lastIndexOf('.') + 1 );
        writeHead(suffix);

        let fileDir = path.join(__dirname, url)
        

        fs.readFile(fileDir, function (err, data) {
            if (err) {
                writeHead('html', 404);
                res.end("<h1 style='text-align: center;'>404 Not found</h1>");

                console.log("req.url: ", req.url);
                console.log('fileDir: ', fileDir);
                console.log('Not found File');
            } else {
                res.end(data);
            }
        })
    }

    function writeHead(suffix, code = 200) {
        let ContentType = "text/plain"
        switch (suffix) {
            case 'htm': 
            case 'html': ContentType = "text/html"; break;
            case 'css': ContentType = "text/css"; break;
            case 'js': ContentType = "application/javascript"; break;
            case 'json': ContentType = "application/json"; break;
            case 'mp4': ContentType = "video/mp4"; break;
            case 'jpg': 
            case 'jpeg': ContentType = "image/jpeg"; break;
            case 'png': ContentType = "image/png"; break;
            case 'gif': ContentType = "image/gif"; break;
        }
        res.writeHead(code, {
            "Content-Type": ContentType + ";charset=UTF-8"
        });
    }

}).listen(3000);