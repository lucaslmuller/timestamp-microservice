var http = require('http');
var url = require('url');
var express = require("express");
var app = new express();
var fs = require('fs');
var path = require('path');

app.get("/", function(req, res){
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(fs.readFileSync('index.html'));
});

app.get("/:time", function(req, res){
  var urlObj = url.parse(req.url, true),
      path = req.params.time,
      time,
      d,
      result = {
        "unix" : null,
        "natural" : null
      };
      
  var months = [
    "January"
    , "February"
    , "March"
    , "April"
    , "May"
    , "June"
    , "July"
    , "August"
    , "September"
    , "October"
    , "November"
    , "December"];
    
    if(path == ""){
      
      result.unix = result.natural = null;
      
    }  else {
      
      if(isNaN(parseInt(path))){
        time = decodeURI(path);
          result.unix =  Date.parse(time) / 1000;
          result.natural = time;
        
      } else {
        time = parseInt(path);
        d = new Date(time * 1000);
          result.unix = time,
          result.natural = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
      }
      
    }
      

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
});

app.listen(process.env.PORT || 8080);