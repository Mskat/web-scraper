'use strict';

const request = require('request');
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

//method gets an email address from the user
prompt.get(validation, function (err, result) {
    if (err) { return onErr(err); }
    let email = result.email;
    findWebsite(email);
});

//method finds a website by given email address
function findWebsite(email) {
    let domain = "https://www." + email.substring(email.lastIndexOf("@") + 1);
    console.log(domain);
};




