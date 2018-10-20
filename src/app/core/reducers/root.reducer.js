import { combineReducers } from 'redux';

import { appReducer } from './app.reducer';
import { sharedReducers } from './shared';

export default function({ reducers }): any {
	return combineReducers({
		app: appReducer({ reducers }),
		...sharedReducers
	});
}
