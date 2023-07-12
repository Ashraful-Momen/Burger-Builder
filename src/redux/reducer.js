import * as actionType from "./actionType";

const INGREDIENT_PRICES = {
	Salad: 20,
	Cheese: 30,
	Meat: 50,
};

const INITIAL_STATE = {
	ingredients: [
		{ type: "Salad", amount: 0 },
		{ type: "Cheese", amount: 0 },
		{ type: "Meat", amount: 0 },
	],

	orders:[],
	orderLoading:true,
	orderError:false,

	totalPrice: 80,
	purchasable: false,

	//FireBase Auth variable: 
	token :null, 
	userId:null,

	//AuthLoading:
	authLoading:false,
	authFailedMsg:null,

};

export const reducer = (state = INITIAL_STATE, action) => {
	const ingredients = [...state.ingredients];
	switch (action.type) {
		case actionType.ADD_INGREDIENT:
			for (let item of ingredients) {
				if (item.type === action.payload) {
					item.amount++;
				}
			}
			return {
				...state,
				ingredients: ingredients,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
			};

		case actionType.REMOVED_INGREDIENT:
			const updatedIngredients = [...state.ingredients];
			const newPrice = state.totalPrice - INGREDIENT_PRICES[action.payload];
			for (let item of updatedIngredients) {
				if (item.type === action.payload) {
					if (item.amount <= 0) return state;
					item.amount--;
				}
			}
			return {
				...state,
				ingredients: updatedIngredients,
				totalPrice: newPrice,
			};

		case actionType.UPDATE_PURSHABLE:
			const sum = state.ingredients.reduce((sum, element) => {
				return sum + element.amount;
			}, 0);
			return {
				...state,
				purchasable: sum > 0,
			};
		case actionType.RESET_INGREDIENTS:
			return{
				...state,
				ingredients: [
					{ type: "Salad", amount: 0 },
					{ type: "Cheese", amount: 0 },
					{ type: "Meat", amount: 0 },
				],
			
				totalPrice: 80,
				purchasable: false,

			}
		case actionType.LOAD_ORDERS:
			// console.log(action.payload)
			let orders=[];
			for(let key in action.payload)
			{
				// console.log(action.payload[key]);
				orders.push({
					...action.payload[key],
					id:key,
				})
			}
			// console.log(orders)
			return{
				...state,
				orders:orders,
				orderLoading:false,
			}
		case actionType.ORDER_LOAD_FAILED:
			console.log(action);
			return{
				...state,
				orderError:true,
				orderLoading:false,
			}
		//FireBase Auth:
		case actionType.AUTH_SUCCESS:
			return{
				...state,
				token:action.payload.token,
				userId:action.payload.userId
			}
		case actionType.AUTH_LOGOUT:
			return{
				...state,
				token:null,
				userId:null,
				authFailedMsg:null, //last Add

			}
		case actionType.AUTH_LOADING:
			return{
				...state,
				authLoading:action.payload,
			}
		case actionType.AUTH_FAILED:
			return{
				...state,
				authFailedMsg:action.payload,
			}

		default:
			return { ...state };
	}
};
