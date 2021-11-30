let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/west-indies-in-sri-lanka-2021-22-1288341/sri-lanka-vs-west-indies-1st-test-1288345/ball-by-ball-commentary";

request(url,cb);
function cb(err,res,html)
{
    let cheerioSelector = cheerio.load(html);
    let element = cheerioSelector(".match-comment .d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    let text = cheerioSelector(element[0]).text();
    console.log(text);
}