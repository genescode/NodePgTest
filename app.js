var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native


var conString = process.env.POSTGRES_URL || "postgres://postgres:admin@localhost:5432/VDM";


var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres db', err);
  }

});

var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');

var app = express();

app.use(morgan('tiny'));

var port = process.env.PORT || 3000;

app.get(  '/',function(req, res){

    res.send('welcome to my API');
});

app.get(  '/Snt',function(req, res){
  client.query('SELECT * FROM "VDM Schema"."SNT_TRANS_TEST"', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      } else {
  console.log(result.rows);
  var dt = new Date();
  var utcDate = dt.toUTCString();
  var sntRow = new String
  sntRow = JSON.stringify(result.rows);
  res.send( utcDate + ' Executed SNT Query '  + sntRow );
      }
  }); 

  //res.send('Executed SNT Query');
}); 

app.listen(port,function(){
   debug(`Runningon PORT: ${chalk.green(port)}`);
});