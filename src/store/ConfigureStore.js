import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import ConfigReducers from "./reducers/ConfigReducers";
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    config: ConfigReducers
    // config: null
});


const ConfigureStore = () => {
    const store = createStore(
        rootReducer,
        compose(applyMiddleware(thunk))
    );
    
    return {store}
}

export default ConfigureStore;