import { ADD_TO_CART, UPDATE_CART, DELETE_ITEM_CART } from "../../shared/constants/action-type";

const initState = {
    items: [],
};

export default (state = initState, action) => {

    switch (action.type) {
        case ADD_TO_CART: return addToCart(state, action.payload);
        case UPDATE_CART: return updateCart(state, action.payload);
        case DELETE_ITEM_CART: return deleteItemCart(state, action.payload);
        default: return state;
    }
}

const addToCart = (state, payload) => {
    let isProductExists = false;
    const items = state.items;
    items.map((item, index) => {
        if(item._id === payload._id){
            item.qty += payload.qty;
            isProductExists = true;
        }
        return item;
    });
    const newItems = isProductExists? items: [...items, payload];
    // localStorage.setItem("cart_items", JSON.stringify(newItems));
    return {...state, items: newItems}
}

const updateCart = (state, payload)=>{
    const items = state.items;
    const {id, qty} = payload;

    const newCarts = items.map((item, index)=>{
        if(item._id === id){
            item.qty = qty;
        }
        return item;
    });
    return {...state, items: newCarts}
}

const deleteItemCart = (state, payload)=>{
    const items = state.items;
    const newCarts = items.filter((item)=>{
        if(item._id === payload.id){
            return false;
        } 
        return true;
    });

    return {...state, items: newCarts}
}