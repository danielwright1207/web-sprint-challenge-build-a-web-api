const express = require("express");
const actionRouter = require("./actions/actions-router");
const projectRouter = require("./projects/projects-router");
const server = express();
server.use(express.json());
server.use(actionRouter);
server.use(projectRouter);
// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
