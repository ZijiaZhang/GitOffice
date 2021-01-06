import {combineReducers} from "redux";

const selectfile = (file_sha = '', action) => {
    if (action.type === 'select_file') {
        return action.sha;
    }
    return file_sha;
};

const update_repo_info = (repo_info = {}, action) => {
    console.log(repo_info);
    if (action.type === 'update_repo_info') {
        return action.repo_info;
    }
    return repo_info;
};

export default combineReducers({
    selected_file: selectfile,
    repo_info: update_repo_info
});
