let request = require("request");
let cheerio = require("cheerio");
let sml = require("./singleMatchLeaderboard");

let url = "https://www.espncricinfo.com/live-cricket-match-results";

request(url,cb);
function cb(err,res,html)
{
    let cheerioSelector = cheerio.load(html);

    let matchCards = cheerioSelector(".col-md-8.col-16");
    console.log(matchCards.length);

    for(let i=0;i<matchCards.length;i++)
    {
        let allButtons = cheerioSelector(matchCards[i]).find(".match-cta-container .btn.btn-sm.btn-outline-dark.match-cta");
        let scoreCardLink = cheerioSelector(allButtons[2]).attr("href");
        let fullLink = "https://www.espncricinfo.com"+scoreCardLink;

        sml.singleMatchExtractor(fullLink);
    }

}