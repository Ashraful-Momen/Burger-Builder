import React from 'react';
import './Ingredient.css'
import BreadTop from "../../../assets/img/breadTop.jpg";
import BreadBottom from "../../../assets/img/breadBottom.jpg";
import Meat from "../../../assets/img/meet.jpg";
import Cheese from "../../../assets/img/cheese.jpg";
import Salad from "../../../assets/img/salat.jpg";



const Ingredient = (props) => {
  let ingredientElement = null; // Use a different variable name here

  switch (props.type) {
    case 'BreadTop':
      ingredientElement = <div> <img src={BreadTop} alt='breadTop'/></div>
      break;
    case 'BreadBottom':
      ingredientElement = <div> <img src={BreadBottom} alt='breadbottom'/></div>
      break;
    case 'Meat':
      ingredientElement = <div> <img src={Meat} alt='meet'/></div>
      break;
    case 'Cheese':
      ingredientElement = <div> <img src={Cheese} alt='meet'/></div>
      break;
    case 'Salad':
      ingredientElement = <div> <img src={Salad} alt='meet'/></div>
      break;
    default:
      ingredientElement = null;
  }

  return (
    <div className='Ingredient'>
      {ingredientElement} {/* Render the ingredient JSX element */}
    </div>
  )
}

export default Ingredient;

