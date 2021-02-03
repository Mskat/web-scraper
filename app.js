'use strict';

const cheerio = require('cheerio');
const knwl = require('knwl.js');
const prompt = require('prompt');

//email validation
let validation = {
    properties: {
        email: {
            pattern: /^[a-z\d]+[\w\d.-]*@(?:[a-z\d-]+\.){1,5}[a-z]{2,6}$/i,
            message: 'Give a proper email address!',
            required: true
        }
    }
};

prompt.start();

//method getting an email address from the user
prompt.get(validation, function (err, result) {
    if (err) { return onErr(err); }
    console.log('Received email: ' + result.email);
});

