import React from "react";

function StatCalculator() {
  return (
    <React.Fragment>
      <div className='StatCalculator'>
      <img src={require('../images/stat-calculator.png')} alt="search-title" id="sc-img" style={{width: '12vw', marginTop: '1%'}} />
        <ul>
          <div>
            <li>Stamina</li>
            <p>numbers</p>
          </div>
          <div>
            <li>Strength</li>
            <p>numbers</p>
          </div>
          <div>
            <li>Dexterity</li>
            <p>numbers</p>
          </div>
          <div>
            <li>Intelligence</li>
            <p>numbers</p>
          </div>
          <div>
            <li>Wisdom</li>
            <p>numbers</p>
          </div>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default StatCalculator;