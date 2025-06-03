import scheduleReducer from './scheduleRelated/scheduleHandle';
// ...
const rootReducer = combineReducers({
  // ...reducers أخرى
  schedule: scheduleReducer,
  // ...
});
export default rootReducer;
