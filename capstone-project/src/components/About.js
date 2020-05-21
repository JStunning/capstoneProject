import React from "react";

function About() {
  return (
    <React.Fragment>
      <div className='About' style={{backgroundColor: 'rgba(0,0,0,0.95)', margin: '5% 7% 8.1% 7%', padding: '1% 15% 3% 15%'}}>
        <h2 style={{fontSize: '32px'}}>About</h2>
        <img src={require('../images/me_irl.jpg')} alt="my true form" />
        <h3 style={{fontSize: '28px'}}>Jack</h3>
        <p style={{fontSize: '18px'}}>I am a student at Epicodus and this is my Capstone Project. This app is a web scraper, web scrapers let users scrape DOM elements 
          from a website so that you can use that data however you want, it is kind of making your own api out of a webpage. This app is designed to scrape the Classic Wow wiki 
          for data on items/equipment that you can use in Classic World of Warcraft. This app will let people search and pick equipment scraped from the Wiki 
          and put them in their own lists. The App will have a calculator that will add all the Primary stats of the selected items and show them to the user.
          This functionality will hopefully help Classic WoW players make better decisions on what equipment they will use in game and hopefully help them perform
          better because of it.</p>
      </div>
    </React.Fragment>
  )
}

export default About;