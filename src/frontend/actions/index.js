export const select_file = (sha) => {
    return {
        type: 'select_file',
        sha: sha,
    };
};