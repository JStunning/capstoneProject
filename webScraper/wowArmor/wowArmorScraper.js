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

async function wowArmorScraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const setItemsInDB = (h1, items) => {
    try {
      db.getDB().collection(collection).insertOne( { title: h1, items: items } );
   } catch (e) {
      console.log(e);
   };
  }

  const nonTypedUrls = ['https://classic.wowhead.com/trinkets', `https://classic.wowhead.com/shields`, 'https://classic.wowhead.com/rings', 'https://classic.wowhead.com/quiver-items', 'https://classic.wowhead.com/cloaks', 'https://classic.wowhead.com/amulets']
  
  for(let i = 0; i < nonTypedUrls.length; i++){
    await page.goto(nonTypedUrls[i]);

    const h1 = await page.evaluate(() => document.querySelector("h1").textContent)

    let items = await page.evaluate(() => {
      const nodelist = document.querySelectorAll("a.listview-cleartext");
      const arrayList = Array.from(nodelist);
      return arrayList.map(e => e.innerText)
    });

    finalList[h1] = items;

    setItemsInDB(h1, items);

    finalList = {}
  }


  
  const armorTypes = ['cloth', 'leather', 'mail', 'plate']
  
  for(let j = 0; j < armorTypes.length; j++){
    // const url = ['https://classic.wowhead.com/trinkets', `https://classic.wowhead.com/${armorTypes[j]}-shoulder-armor`, `https://classic.wowhead.com/shields`, 'https://classic.wowhead.com/rings', 'https://classic.wowhead.com/quiver-items', `https://classic.wowhead.com/${armorTypes[j]}-leg-armor`, `https://classic.wowhead.com/${armorTypes[j]}-head-armor`, `https://classic.wowhead.com/${armorTypes[j]}-hand-armor`, `https://classic.wowhead.com/${armorTypes[j]}-foot-armor`, 'https://classic.wowhead.com/cloaks', `https://classic.wowhead.com/${armorTypes[j]}-chest-armor`, `https://classic.wowhead.com/${armorTypes[j]}-bracers`, `https://classic.wowhead.com/${armorTypes[j]}-belts`, 'https://classic.wowhead.com/amulets']
    const armorUrls = [ `https://classic.wowhead.com/${armorTypes[j]}-shoulder-armor`, `https://classic.wowhead.com/${armorTypes[j]}-leg-armor`, `https://classic.wowhead.com/${armorTypes[j]}-head-armor`, `https://classic.wowhead.com/${armorTypes[j]}-hand-armor`, `https://classic.wowhead.com/${armorTypes[j]}-foot-armor`, `https://classic.wowhead.com/${armorTypes[j]}-chest-armor`, `https://classic.wowhead.com/${armorTypes[j]}-bracers`, `https://classic.wowhead.com/${armorTypes[j]}-belts`]
 
    for (let i = 0; i < armorUrls.length; i++){
      await page.goto(armorUrls[i]);
  
      const h1 = await page.evaluate(() => document.querySelector("h1").textContent)
  
      let items = await page.evaluate(() => {
        const nodelist = document.querySelectorAll("a.listview-cleartext");
        const arrayList = Array.from(nodelist);
        return arrayList.map(e => e.innerText)
      });

      finalList[h1] = items;

      console.log(h1, items)
      setItemsInDB(h1, items);

      finalList = {}
    }
  }

  console.log('finalList ', finalList);
  browser.close();
}

wowArmorScraper()