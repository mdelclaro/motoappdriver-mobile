import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import {
  RequestReducer,
  UIReducer,
  AuthReducer,
  FormReducer,
  StatusReducer,
  LocationReducer,
  InfoReducer,
  ChatReducer
} from "./reducers/";

const appReducer = combineReducers({
  ui: UIReducer,
  auth: AuthReducer,
  form: FormReducer,
  status: StatusReducer,
  corrida: RequestReducer,
  location: LocationReducer,
  info: InfoReducer,
  chats: ChatReducer
});

const rootReducer = (state, action) => {
  if (action.type === "auth_logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

// redux-persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ui", "form"],
  timeout: 0
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
