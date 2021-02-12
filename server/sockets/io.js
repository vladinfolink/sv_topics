const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET, POST, OPTIONS, PUT, PATCH, DELETE"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
  },
});


module.exports = { app, http, socketIo, server, io };
