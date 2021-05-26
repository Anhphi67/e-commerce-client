import { createStore } from 'redux';
import rootReducer from '../pages/Api'
const store = createStore(rootReducer);
export default store;