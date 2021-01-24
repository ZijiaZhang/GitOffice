import * as express from "express"
import {ensureAuthenticated} from "../util";
var GitHub = require('github-api');
const fetch = require("node-fetch");

export const github_api_router = express.Router()



github_api_router.get('/user', ensureAuthenticated, (async (req, res, next) => {
    res.send(req.user.profile);
}))

/**
 *  List All repos of a user
 *
 **/
github_api_router.get('/repos', ensureAuthenticated, (async (req, res, next) => {
    let token = req.user.accessToken;
    let gh = new GitHub({
        token
    });
    let me = gh.getUser();
    let repos = await me.listRepos();
     res.send(repos.data);
}))

github_api_router.get('/repo/:owner/:name', ensureAuthenticated, (async (req, res, next) => {
    let token = req.user.accessToken;
    let gh = new GitHub({
        token
    });
    let repo = gh.getRepo(req.params.owner, req.params.name);
    let detail = await repo.getDetails()
    res.send(detail.data);
}))

github_api_router.get('/repo/:owner/branches', ensureAuthenticated, (async (req, res, next) => {
    let token = req.user.accessToken;
    let gh = new GitHub({
        token
    });
    let repo = gh.getRepo(req.params.owner, req.params.name);
    let branches = await repo.listBranches()
    res.send(branches.data);
}))

github_api_router.get('/repo/:owner/:name/:branch_name', ensureAuthenticated, (async (req, res, next) => {
    let token = req.user.accessToken;
    let gh = new GitHub({
        token
    });
    let repo = gh.getRepo(req.params.owner, req.params.name);
    let detail = await repo.getBranch(req.params.branch_name)
    res.send(detail.data);
}))

github_api_router.get('/repo/:owner/:name/tree/:sha', ensureAuthenticated, (async (req, res, next) => {
    let token = req.user.accessToken;
    let gh = new GitHub({
        token
    });
    let repo = gh.getRepo(req.params.owner, req.params.name);
    let detail = await repo.getTree(req.params.sha)
    res.send(detail.data);
}))


github_api_router.get('/repo/:owner/:name/blob/:sha', ensureAuthenticated, (async (req, res, next) => {
    let token = req.user.accessToken;
    let gh = new GitHub({
        token
    });
    let repo = gh.getRepo(req.params.owner, req.params.name);
    let detail = await repo.getBlob(req.params.sha)
    res.send(detail.data);
}));

github_api_router.get('/repo/:owner/:name/contents/:path', ensureAuthenticated, (async (req, res, next) => {
    let token = req.user.accessToken;
    let gh = new GitHub({
        token
    });
    let repo = gh.getRepo(req.params.owner, req.params.name);
    let detail = await repo.getContents(null, req.params.path, true);
    res.send(detail.data);
}))

github_api_router.post('/repo/:owner/:name/:branch/:path', ensureAuthenticated, (async (req, res, next) => {
    let content = req.body.content;
    let message = req.body.message;
    let sha = req.body.sha;
    let token = req.user.accessToken;
    let gh = new GitHub({
        token
    });
    let repo = gh.getRepo(req.params.owner, req.params.name);
    let url = `https://api.github.com/repos/${req.params.owner}/${req.params.name}/contents/${req.params.path}`;
    console.log(url);
    console.log(req.body);
    let result = await fetch(url, {
        body: JSON.stringify(req.body), headers: {Authorization: "token " + token}, method: 'PUT'
    });
    let t = await result.json();
    console.log(t);
    // let result = await repo.writeFile(req.params.branch, req.params.path, content, message, {sha: sha})
    res.send(result);
}))
