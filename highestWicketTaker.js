let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/india-a-in-south-africa-2021-22-1277058/south-africa-a-vs-india-a-1st-unofficial-test-1277076/full-scorecard";

request(url,cb);
function cb(err,res,html)
{
    let cheerioSelector = cheerio.load(html);
    let tables = cheerioSelector(".table.bowler");
    let highestWickets = 0;
    let hName = "";
    

    for(let i =0;i<tables.length;i++)
    {
        let columns = cheerioSelector(tables[i]).find("tr");
        
        for(let j=0;j<columns.length;j++)
        {
            let eachPlayer = cheerioSelector(columns[j]).find("td");
            let playerName = cheerioSelector(eachPlayer[0]).text();
            let wicketsTaken = cheerioSelector(eachPlayer[4]).text();

            if(highestWickets<=wicketsTaken)
            {
                highestWickets = wicketsTaken;
                hName = playerName;
            }
            console.log(playerName+"    "+wicketsTaken);
        }
    }
    console.log("highest scorer is "+ hName + "with wickets"+ highestWickets);
}