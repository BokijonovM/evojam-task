import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import localStorage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { CurrentPathREducer } from "../reducer/reducer.js";

const aComposeFunctionThatAlwaysWorks =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  path: "root",
};

const persistConfig = {
  key: "root",
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECRET_PERSIST_KEY,
    }),
  ],
};

const bigReducer = combineReducers({
  path: CurrentPathREducer,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);

const configureStore = createStore(
  persistedReducer,
  initialState,
  aComposeFunctionThatAlwaysWorks(applyMiddleware(thunk))
);

const persistor = persistStore(configureStore);

export { configureStore, persistor };
