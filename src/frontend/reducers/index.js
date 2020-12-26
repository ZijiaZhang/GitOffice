import {combineReducers} from "redux";

const selectfile = (file_sha = '', action) => {
    if (action.type === 'select_file') {
        return action.sha;
    }
    return file_sha;
};

export default combineReducers({
    selected_file: selectfile,
});
