// import React from "react";
// import Ingredient from "../Ingredient/Ingredient";
// import "./Burger.css"

// const Burger = (props) => {
// 	console.log(props);
// 	let ingredientArr = props.ingredients.map((item) => {
// 		let amountArr = [...Array(item.amount).keys()]; // here [...Array(6).key()-> generate 6 items of array]
// 		// console.log(amountArr,item.type);
// 		return amountArr.map(
// 			() => <Ingredient type={item.type} key={Math.random()} />, //we pass list in this component, that's why pass key(). don't use return -> {} bracket then meet,salad,cheese not showing
// 			// console.log(item.type)
// 		)
// 	})
//     .reduce((arr,element)=>{
//         return arr.concat(element)
//     },[]) ;
//     console.log(ingredientArr);
// 	return (
// 		<div className="Burger">
// 			<Ingredient type="BreadTop" />
// 			{ingredientArr}
// 			<Ingredient type="BreadBottom" />
// 		</div>
// 	);
// };

// export default Burger;

import React from "react";
import Ingredient from "../Ingredient/Ingredient";
import "./Burger.css";

const Burger = (props) => {
	let ingredientArr = props.ingredients // here [...Array(6).key()-> generate 6 items of array]
		.flatMap((item) => {
			let amountArr = [...Array(item.amount).keys()];

			return amountArr.map((_, index) => (
				<Ingredient type={item.type} key={item.type + index} /> //we pass list in this component, that's why pass key(). don't use return -> {} bracket then meet,salad,cheese not showing
			));
		})
		.reduce((arr, element) => { // use ruduce() for making ingredientArr.length . 
			return arr.concat(element);
		}, []);
        //help of reduce() , we can use this if else conditions.
        if(ingredientArr.length ===0){
            ingredientArr = <p>Please add some Ingredient!</p>
        }

	return (
		<div className="Burger">
			<Ingredient type="BreadTop" />
			{ingredientArr}
			<Ingredient type="BreadBottom" />
		</div>
	);
};

export default Burger;
