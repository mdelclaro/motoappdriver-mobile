import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import RequestReducer from "./reducers/RequestReducer";
import UIReducer from "./reducers/UIReducer";
import AuthReducer from "./reducers/AuthReducer";
import FormReducer from "./reducers/FormReducer";
import StatusReducer from "./reducers/StatusReducer";

const rootReducer = combineReducers({
  ui: UIReducer,
  auth: AuthReducer,
  form: FormReducer,
  status: StatusReducer,
  corrida: RequestReducer
});

// redux-persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["status", "ui", "corrida"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
