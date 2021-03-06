#!/usr/bin/env node

var http = require('http');
var fs = require('fs');

// Put down your own client ID and secret here:
var clientId = "YOUR_OWN_CLIENT_ID";
var clientSecret = "YOUR_OWN_SECRET_ID";

var jsonPayload = JSON.stringify({
    number: "12025550108",  // FIXME
    caption: "Lovely girl", // FIXME
    image: fs.readFileSync("../assets/cute-girl.jpg").toString('base64')  // FIXME
});

var options = {
    hostname: "api.whatsmate.net",
    port: 80,
    path: "/v1/telegram/single/photo/binary/0",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-WM-CLIENT-ID": clientId,
        "X-WM-CLIENT-SECRET": clientSecret,
        "Content-Length": Buffer.byteLength(jsonPayload)
    }
};

var request = new http.ClientRequest(options);
request.end(jsonPayload);

request.on('response', function (response) {
    console.log('Heard back from WhatsMate Telegram Gateway:\n');
    console.log('Status code: ' + response.statusCode);
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
        console.log(chunk);
    });
});


