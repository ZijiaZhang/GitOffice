import * as express from "express"
import {ensureAuthenticated} from "../util";
var GitHub = require('github-api');

export const github_api_router = express.Router()


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

github_api_router.post('/repo/:owner/:name/:branch', ensureAuthenticated, (async (req, res, next) => {
    let path = req.body.path;
    let content = req.body.content;
    let message = req.body.message;
    let token = req.user.accessToken;
    let gh = new GitHub({
        token
    });
    let repo = gh.getRepo(req.params.owner, req.params.name);
    let result = await repo.writeFile(req.params.branch, path, content, message)
    res.send(result.data);
}))
