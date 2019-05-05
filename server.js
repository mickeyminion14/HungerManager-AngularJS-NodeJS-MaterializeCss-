const express = require ('express');
const app = express();
const bodyparser = require('body-parser');

const routes = require('./app/routes')
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.use('/', routes);

const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080; 
const HOST = process.env.host || '0.0.0.0';
app.use(bodyparser.urlencoded ({extended : false}));

app.use(express.static('./public'));

app.listen(PORT, function () {
	console.log("server running on https://"+HOST+":"+PORT+"/");
});
