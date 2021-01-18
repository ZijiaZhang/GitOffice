export const select_file = (sha) => {
    return {
        type: 'select_file',
        ...sha,
    };
};

export const update_repo_info = (repo_info) => {
    return {
        type: 'update_repo_info',
        repo_info: repo_info,
    };
};
