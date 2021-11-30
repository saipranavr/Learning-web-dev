let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/india-a-in-south-africa-2021-22-1277058/south-africa-a-vs-india-a-1st-unofficial-test-1277076/full-scorecard";

request(url,cb);
function cb(err,res,html)
{
    let cheerioSelector = cheerio.load(html);
    let tables = cheerioSelector(".table.batsman");
    let highestRuns = 0;
    let hName = "";

    for(let i =0;i<tables.length;i++)
    {
        let columns = cheerioSelector(tables[i]).find("tbody tr");
        
        for(let j=0;j<columns.length;j++)
        {
            let eachPlayer = cheerioSelector(columns[j]).find("td");
            if(eachPlayer.length==8)
            {
                let playerName = cheerioSelector(eachPlayer[0]).text();
                let runs = cheerioSelector(eachPlayer[2]).text();
                console.log(playerName+"    "+runs);
                if(highestRuns<=Number(runs))
                {
                    highestRuns = runs;
                    hName = playerName;
                }
            }
            
        }
        console.log("///////////////////////////////////////////////")
    }
    console.log(highestRuns,hName);
}