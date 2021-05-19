import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {logger, createLogger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import { usersReducer } from './users';
import { requestsReducer } from './requests';
import { gamesReducer } from './games';
import { messagesReducer } from './messages';

// the reducer
const reducer = combineReducers({
    users: usersReducer,
    games: gamesReducer,
    messages: messagesReducer
})
const middleware = composeWithDevTools(
    applyMiddleware(thunk, createLogger({collapsed: true}))
  )
const store = createStore(reducer, middleware);


export default store;
export * from './games'
export * from './users'
export * from './messages'
