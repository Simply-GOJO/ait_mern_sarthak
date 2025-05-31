const express = require("express"); 
const cors = require("cors"); 
const mongoose = require("mongoose"); 
const app = express(); 

const app_properties = {
    server_port : 8080,
    cors_origin : "http://localhost:3000",
    mongo_url: "mongodb://localhost:27017/nithin_db", 
    IS_DEBUG : true,
    imports : {express, cors, mongoose},
    instances: { app }
}

module.exports = app_properties;