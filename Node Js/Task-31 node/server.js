const fs = require('fs')
const path = require('path')
const http = require('http')

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        const filePath = path.join(__dirname, 'html-1.html')
        fs.readFile(filePath, 'utf-8', (err, html) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; chartset=utf-8' });
                res.end('Error loding HTML file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; chartset=utf-8' })
            res.end(html);
        })
        return;

    } else if (req.url === "/html2") {
        const filePath = path.join(__dirname, 'html-2.html')
        fs.readFile(filePath, 'utf-8', (err, html) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; chartset=utf-8' });
                res.end('Error loding HTML file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; chartset=utf-8' })
            res.end(html);

        })
        return;
    } else if (req.url === "/html3") {
        const filePath = path.join(__dirname, 'html-3.html')
        fs.readFile(filePath, 'utf-8', (err, html) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; chartset=utf-8' });
                res.end('Error loding HTML file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; chartset=utf-8' })
            res.end(html);
        })
        return;

    } 
    
    res.end('Page not Found');

})
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})


