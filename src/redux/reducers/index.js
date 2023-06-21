import { combineReducers } from "redux";
import cartReducer from "./cart";
export default combineReducers({
    Cart: cartReducer
})