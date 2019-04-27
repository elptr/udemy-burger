import * as actionTypes from '../actions/actionTypes';


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error:false
};

const INGREDIENT_PRICES = {
    salad:0.6,
    bacon:0.7,
    cheese:0.5,
    meat:1.3
};


const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, //create deep clone of object
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 //es6 syntax to dynamicaly ovewrite a property in a given js object
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            //don't need to use break,
            // because we have return in each case, and it won't be
            //further code execution in this function
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error:false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }
        default:
            return state;
    }
};


export default reducer;