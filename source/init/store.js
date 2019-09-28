// Core
import { createStore } from 'redux';

// Roots
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

// Middleware
import { enhancedStore, sagaMiddleware } from './middleware';

export const store = createStore(rootReducer, enhancedStore);

sagaMiddleware.run(rootSaga);
