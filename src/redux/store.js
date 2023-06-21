import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";

const persistConfig = {
    key: "redux-store",
    storage: storage,
    keyPrefix: "vietpro"
}

const store = createStore(persistReducer(persistConfig, reducers));
persistStore(store);
export default store;