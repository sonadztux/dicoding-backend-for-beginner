const http = require('http');
const { report } = require('process');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS')

    const { url, method } = request;

    if(url === '/') {
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Homepage',
            }));
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request!`,
            }));
        }
    }else if (url === '/about') {
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'About page',
            }));
        }else if(method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString());
                const { name } = body;
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: `Hello, ${name}. Welcome to about page`,
                }));
            });
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request!`,
            }));
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
    }
};

const server = http.createServer(requestListener);

server.listen(5000, 'localhost', () => {
    console.log('Server running on http://localhost:5000');
});