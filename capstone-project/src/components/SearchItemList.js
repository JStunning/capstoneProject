import React from "react";
import PropTypes from "prop-types";

function SearchItemList(props) {
  function makeItemList() {
    if(props.itemList === undefined){
      return <li>{props.itemList}</li>
    } else {
      return(
        <div>
          {props.itemList.map((item) => (
            <li key={item.id}>{item}</li>
          ))}
        </div>
      )
    }
  }
  console.log("props itemlist", props.itemList)
  return (
    <React.Fragment>
      <div className='SearchItemList'>
        <img src={require('../images/search-item-list.png')} alt="search-title" id="sil-img" style={{width: '12vw', marginTop: '1%'}} /><br />

        <label>Stamina</label>
        <input type="radio" id="stamina" name="statButton" value="purple" />

        <label>Strength</label>
        <input type="radio" id="strength" name="statButton" value="red" />

        <label>Dexterity</label>
        <input type="radio" id="dexterity" name="statButton" value="green" />

        <label>Intelligence</label>
        <input type="radio" id="intelligence" name="statButton" value="blue" />

        <label>Wisdom</label>
        <input type="radio" id="wisdom" name="statButton" value="yellow" />
        
        <div className='SearchListResults'>
          <ul>
          {/* {props.itemList.items.map((item) => 
            <li>{item}</li>
          )} */}
          {/* <li>{props.itemList}</li> */}
          {makeItemList()}
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

SearchItemList.propTypes = {
  itemList: PropTypes.array
};

export default SearchItemList;