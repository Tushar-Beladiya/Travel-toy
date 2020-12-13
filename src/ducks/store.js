import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from "./auth/reducers";
import quizReducer from "./quiz/quizReducer";
import profileReducer from "./profile/reducers";
import tripsReducer from "./trips/reducers";

import { persistStore, persistReducer, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import NetworkService from '../services/network-service';


// redux-persist is used to persist redux state on page refresh 
// whitelist the reducers which you want to persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const logger = createLogger({
  duration: true,
  timestamp: true,
  diff: true,
});

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  profile: profileReducer,
  trips: tripsReducer,
  quizReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history), logger));

const store = createStore(persistedReducer, middlewares);

export const persistor = persistStore(store);

// axios request interceptor
NetworkService.setupInterceptors(store);

export default store;
