const puppeteer = require('puppeteer');
// const fs = require('fs');
const express = require('express')
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json());

const db = require("../db");
const collection = "items"

app.post('/', (req, res) => {
  const userInput = req.body;
  db.getDB().collection(collection).insertOne(userInput, (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.json({result : result, document : result.ops[0]})
    }
  })
})

app.delete('/:id', (req, res)=>{
  const todoID = req.params.id;

  db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(todoID)}, (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.json(result)
    }
  })
})

app.get('/getItems', (req,res) => {
  db.getDB().collection(collection).find({}).toArray((err, documents) => {
    if(err){
      console.log(err);
    } else {
      console.log
      console.log("documents ",documents)
      res.json(documents);
    }
  })
})

db.connect((err) => {
  if(err){
    console.log('unable to connect to database');
    process.exit(1);
  } else {
    app.listen(3000, ()=> {
      console.log('connected to database, app listening on port 3000');
    });
  }
})

let finalList = {}

async function wowScraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const urls = ['https://classic.wowhead.com/guides/feral-druid-tank-gear-bis-classic-wow', "https://classic.wowhead.com/guides/lights-bulwark-protection-paladin-tanking#pre-raid-best-in-slot", "https://classic.wowhead.com/guides/warrior-tank-gear-bis-classic-wow", "https://classic.wowhead.com/guides/druid-healing-gear-bis-classic-wow", "https://classic.wowhead.com/guides/paladin-healing-gear-bis-classic-wow", "https://classic.wowhead.com/guides/priest-healing-gear-bis-classic-wow", "https://classic.wowhead.com/guides/shaman-healing-gear-bis-classic-wow", "https://classic.wowhead.com/guides/balance-druid-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/feral-druid-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/hunter-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/mage-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/paladin-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/shadow-priest-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/rogue-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/elemental-shaman-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/enhancement-shaman-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/warlock-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/fury-warrior-dps-gear-bis-classic-wow"]
  for (let i = 0; i < urls.length; i++){
    await page.goto(urls[i]);

    const h1 = await page.evaluate(() => document.querySelector("h1").textContent)
  
    let bisQ1 = await page.evaluate(() => {
      const nodelist = document.querySelectorAll(`a.q1.icontiny`);
      const arrayList = Array.from(nodelist);
      return arrayList.map(e => e.innerText)
    });
  
    let bisQ2 = await page.evaluate(() => {
      const nodelist = document.querySelectorAll(`a.q2.icontiny`);
      const arrayList = Array.from(nodelist);
      return arrayList.map(e => e.innerText)
    });
  
    let bisQ3 = await page.evaluate(() => {
      const nodelist = document.querySelectorAll(`a.q3.icontiny`);
      const arrayList = Array.from(nodelist);
      return arrayList.map(e => e.innerText)
    });
  
    let bisQ4 = await page.evaluate(() => {
      const nodelist = document.querySelectorAll(`a.q4.icontiny`);
      const arrayList = Array.from(nodelist);
      return arrayList.map(e => e.innerText)
    });
  
    let bisList = []
    bisList.concat(bisQ1, bisQ2, bisQ3, bisQ4)
    console.log('bislist ', bisList.concat(bisQ1, bisQ2, bisQ3, bisQ4))
  
    finalList[h1] = bisList.concat(bisQ1, bisQ2, bisQ3, bisQ4);
    console.log('bisQ1 ', bisQ1)
    console.log('bisQ2 ', bisQ2)
    console.log('bisQ3 ', bisQ3)
    console.log('bisQ4 ', bisQ4)
  
    const setItemsInDB = () => {
      try {
        db.getDB().collection(collection).insertOne( { title: h1, items: finalList[h1] } );
     } catch (e) {
        print (e);
     };
    }

    setItemsInDB();
    finalList = {}
  }
  
 

  browser.close();
}

wowScraper()