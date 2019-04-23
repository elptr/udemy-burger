import * as actionTypes from './actions';


const initialState = {
    ingredients: { //added temporary, before leaning asynchronous http request with redux
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    }
    ,
    totalPrice: 4
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, //create deep clone of object
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 //es6 syntax to dynamicaly ovewrite a property in a given js object
                }
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
                }
            }
        default:
            return state;
    }
};


export default reducer;