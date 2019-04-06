const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
app.listen(8081);
app.use(express.static(path.resolve(__dirname, '../../dist')));
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf-8')
    res.send(html)
})

console.log("start running UIDD2019 noman app")