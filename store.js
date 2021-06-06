const redux = require('redux');
const reduxLogger = require('redux-logger');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
// 두개의 reducer를 한번에 넘기기 위해
const combineReducers = redux.combineReducers;
// actions
// action-types
const ADD_SUBSCRIBER = 'ADD_SUBSCRIBER'
const ADD_VIEWCOUNT = 'ADD_VIEWCOUNT'
const addSubscriber = () => {
  return {
    type: ADD_SUBSCRIBER
  }
}

const addViewCount = () => {
  return {
    type: ADD_VIEWCOUNT
  }
}

// reducers: 액션을 여기서 핸들리
const subscriberState = {
  subscribers: 365
}

// state에 값이 들어오지 않으면 초기 값으로 initialstate를 사용한다는 뜻
const subscriberReducer = (state = subscriberState, action) => {
  // switch문을 통해서 넘겨 받은 actions를 핸들링하는다.
  switch(action.type) {
    case ADD_SUBSCRIBER:
      return {
        ...state,
        subscribers: state.subscribers + 1
      }
      default: return state;
  }
}

const viewState = {
  viewCount: 100
}
const viewReducer = (state = viewState, action) => {
  switch(action.type) {
    case ADD_VIEWCOUNT:
      return {
        ...state,
        viewCount: state.viewCount + 1
      }
      default: return state
  }
}

const rootReducer = combineReducers({
  view: viewReducer,
  subscriber: subscriberReducer,
})

// store, 두 번째 인자로 미들웨어 넘길수 있음
const store = createStore(rootReducer, applyMiddleware(logger));

// subscribe - view - dispatch
// store.subscribe(() => {
//   console.log('subscribe ==>>', store.getState())
// })
store.dispatch(addSubscriber());
store.dispatch(addSubscriber());
store.dispatch(addSubscriber());
store.dispatch(addSubscriber());
store.dispatch(addViewCount());
store.dispatch(addViewCount());