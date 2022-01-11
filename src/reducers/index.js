import { combineReducers } from 'redux';
import user from './user';
import creategroup from './creategroup';
import pmallocation from './pm-allocation';
import inputvalidator from './input-validator';
import notification from './notification';
import projects from './project-reassignment';
import prj from './prj_reassignment';
import gallery from './gallery';
import mapping from './mapping';

const rootReducer = combineReducers({
	user,
	creategroup,
	pmallocation,
	inputvalidator,
	notification,
	projects,
	prj,
	gallery,
	mapping
});

export default rootReducer;
