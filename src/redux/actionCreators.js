import * as actionType from './actionType';
import axios from 'axios';

export const addIngredient = (igtype)=>{
    return{
        type:actionType.ADD_INGREDIENT,
        payload:igtype
    }
}

export const removedIngredient = (igtype)=>{
    return{
        type:actionType.REMOVED_INGREDIENT,
        payload:igtype,
    }
}

export const updatePurchable = ()=>{
    return {
        type:actionType.UPDATE_PURSHABLE,
    }
}

export const resetIngredients = () => {
    return {
        type:actionType.RESET_INGREDIENTS,
    }
}

export const loadOrder = (orders)=>{
    return {
        type:actionType.LOAD_ORDERS,
        payload:orders
    }
}

export const orderLoadedFailed = () =>{
    return{
        type:actionType.ORDER_LOAD_FAILED,
    }
}

export const fetchOrder = (token,userId) => dispatch=>{
    const queryParams = '&orderBy="userId"&equalTo="'+ userId +'"'; //fireBase rule to show data wich is match with userId.
    
    axios.get('https://burgerbuliders-default-rtdb.firebaseio.com/order.json?auth='+ token + queryParams ) // last modified
    .then(response=>{
        dispatch(loadOrder(response.data))// without dispatch this function can't pass to the reducer.js
    })
    .catch(error=>{
        dispatch(orderLoadedFailed(error))
    })
}