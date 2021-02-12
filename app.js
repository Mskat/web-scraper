'use strict';

const request = require('request');
const cheerio = require('cheerio');
const Knwl = require('knwl.js');
const prompt = require('prompt');

let knwlInstance = new Knwl();

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
    let url = "https://www." + email.substring(email.lastIndexOf("@") + 1);
    scrapeWebsite(url);
};

//method scrapes a website
function scrapeWebsite(url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            let links = $('a');
            let paragraphs = $('p');
            console.log('EMAILS: \n');
            console.log(findEmails(links));
            console.log('PHONES: \n');
            console.log(findPhones(paragraphs));
        };
    });
};

function findEmails(content) {
    knwlInstance.init(content);
    let emails = knwlInstance.get('emails');
    return emails;
};

function findPhones(content) {
    knwlInstance.init(content);
    let phones = knwlInstance.get('phones');
    return phones;
};

function findPlaces(content) {
    knwlInstance.init(content);
    let places = knwlInstance.get('places');
    return places;
};

