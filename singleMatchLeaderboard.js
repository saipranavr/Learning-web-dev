let request = require("request");
let cheerio = require("cheerio");

function singleMatchExtractor(url)
{
    request(url,cb);
}

function cb(err,res,html)
{
    let cheerioSelector = cheerio.load(html);
    let names = cheerioSelector(".match-info.match-info-MATCH.match-info-MATCH-half-width .team");
    let winningTeam ;

    for(let i=0;i<names.length;i++)
    {
        // console.log(cheerioSelector(names[i]).text());
        
        let twoNames = cheerioSelector(names[i]).find(".name");
        if(cheerioSelector(names[i]).hasClass("team-gray")==false)
        {
            winningTeam = cheerioSelector(twoNames).text();
        }
        
    }
    // console.log(winningTeam);

    let allInnings = cheerioSelector(".Collapsible");
    for(let i=0;i<2;i++)
    {
        let collapseHeading = cheerioSelector(allInnings[i]).find(".header-title");
        let teamInHeading = (cheerioSelector(collapseHeading).text()).split("1st")[0];
        teamInHeading = teamInHeading.trim();

        if(teamInHeading==winningTeam)
        {
            let winTeamContent = cheerioSelector(allInnings[i]).html();
            printBatsmen(winTeamContent,cheerioSelector)
        }
    }


}

function printBatsmen(winTeamContent,cheerioSelector)
{
    let Batsmen =[]
    let columns = cheerioSelector(winTeamContent).find(".table.batsman tbody tr");
    for(let j=0;j<columns.length;j++)
    {
        let eachPlayer = cheerioSelector(columns[j]).find("td");
            if(eachPlayer.length==8)
            {
                let playerName = cheerioSelector(eachPlayer[0]).text();
                let runs = cheerioSelector(eachPlayer[2]).text();
                console.log(playerName+"    "+runs);
                
                Batsmen.push({
                    Name : playerName,
                    Runs : runs
                })
                
            }
    }
    console.table(Batsmen);
    
}

module.exports ={
    singleMatchExtractor: singleMatchExtractor
}