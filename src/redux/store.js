import { createStore } from 'redux';
import { gameInformerDataReducer } from './reducers.js';

export default createStore(gameInformerDataReducer);