import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = composeWithDevTools({  
  trace: true, 
  traceLimit: 25 
});

export default createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));
