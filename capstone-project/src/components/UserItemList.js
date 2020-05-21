import React from "react";
import PropTypes from "prop-types";

function UserItemList(props) {
  //let num = 0;
  function handleClick(e) {
    e.preventDefault();
    let arg = e.target.getAttribute('value');
    console.log(arg)
    props.filterList(arg);
  }
  return (
    <React.Fragment>
      <div className='UserItemList'>
      <img src={require('../images//user-item-list.png')} alt="user-title" id="uil-img" style={{width: '10vw', marginTop: '1%'}} />
        <div id='AllUserItems'>
        <div id='LeftUserItems'>
            <p>Head slot</p>
            <img src={require('../images/inventoryslot_head.jpg')} alt="head slot" value="46" onClick={handleClick} />
            <p>Neck slot</p>
            <img src={require('../images/inventoryslot_neck.jpg')} alt="neck slot" value="19" onClick={handleClick} />
            <p>Shoulder slot</p>
            <img src={require('../images/inventoryslot_shoulder.jpg')} alt="shoulder slot" value="44" onClick={handleClick} />
            <p>Back slot</p>
            <img src={require('../images/inventoryslot_chest.jpg')} alt="back slot" value="18" onClick={handleClick} />
            <p>Chest slot</p>
            <img src={require('../images/inventoryslot_chest.jpg')} alt="chest slot" value="49" onClick={handleClick} />
            <p>Wrist slot</p>
            <img src={require('../images/inventoryslot_wrists.jpg')} alt="wrist slot" value="50" onClick={handleClick} />
          </div>
          <div id='BottomUserItems'>
            <p>Main-hand slot</p>
            <img src={require('../images/inventoryslot_mainhand.jpg')} alt="main hand slot" value="9" onClick={handleClick} />
            <p>Off-hand slot</p>
            <img src={require('../images/inventoryslot_offhand.jpg')} alt="off hand slot" value="15" onClick={handleClick} />
            <p>Ranged slot</p>
            <img src={require('../images/inventoryslot_ranged.jpg')} alt="ranged slot" value="7" onClick={handleClick} />
          </div>
          <div id='RightUserItems'>
            <p>Hand slot</p>
            <img src={require('../images/inventoryslot_hands.jpg')} alt="hands slot" value="47" onClick={handleClick} />
            <p>Waist slot</p>
            <img src={require('../images/inventoryslot_waist.jpg')} alt="waist slot" value="51" onClick={handleClick} />
            <p>Legs slot</p>
            <img src={require('../images/inventoryslot_legs.jpg')} alt="legs slot" value="45" onClick={handleClick} />
            <p>Feet slot</p>
            <img src={require('../images/inventoryslot_feet.jpg')} alt="feet slot" value="48" onClick={handleClick} />
            <p>Trinket1 slot</p>
            <img src={require('../images/inventoryslot_trinket.jpg')} alt="trinket1 slot" value="14" onClick={handleClick} />
            <p>Trinket2 slot</p>
            <img src={require('../images/inventoryslot_trinket.jpg')} alt="trinket2 slot" value="14" onClick={handleClick} />
            <p>Ring1 slot</p>
            <img src={require('../images/inventoryslot_finger.jpg')} alt="finger1 slot" value="16" onClick={handleClick} />
            <p>Ring2 slot</p>
            <img src={require('../images/inventoryslot_finger.jpg')} alt="finger2 slot" value="16" onClick={handleClick} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

UserItemList.propTypes = {
  filterList: PropTypes.func
};


export default UserItemList;