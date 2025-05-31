'use strict';

// CONFIG
const server_port = 8080;
const cors_origin = "http://localhost:3000";
const mongo_url = "mongodb://127.0.0.1:27017/nithin_db";
const IS_DEBUG = true;

// PACKAGES
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express(); // express server instance

// 
const toJSON = function() {
    const {__v, _id, ...instance } = this.toObject();
    instance.id = _id;
    return instance;
}

const studentModelFactory = () => {
    const collection_meta_extra = {
        timestamps: false
    };

    const collection_meta = {
        usn     : String,
        name    : String,
        sem     : Number,
        branch  : String,
        cgpa    : Number
    };

    const schema = mongoose.Schema(collection_meta, collection_meta_extra);
    schema.method("toJSON", toJSON);        
    const Model = mongoose.model("student", schema); // It returns an instance for the collection/table in the mongoDB/MySQL. In Mongoose we call it as Model and the synonym in mongoDB is collection.
    // It is a Map for the mongoDB collection nithin_db.students

    return Model;
};

const StudentModel = studentModelFactory();

const connectToMongo = () => {
    mongoose.Promise = global.Promise;

    const thenFn = () => {
        if(IS_DEBUG) { console.log("Connected to database");  }
    };

    const catchFn = error => {
        if(IS_DEBUG) { console.log("Cannot connect to database", error); }
        process.exit();
    };
    const mongoose_config = {useNewUrlParser: true,useUnifiedTopology: true}; // ??? for old node
    mongoose.connect(mongo_url, mongoose_config)  // ??? for old node
    //mongoose.connect(mongo_url)
    .then(thenFn)
    .catch(catchFn);
}

connectToMongo();

app.use(cors(cors_origin));     
app.use(express.json());                        
app.use(express.urlencoded({extended: true}));  

// II - Routes for API end points
let readAll = (request, response) => {
    let rbody = {};
    let rstatus = 200;

    const thenFn = (data) => {
        rbody = data;

        
        if(IS_DEBUG) { 
            let students = rbody.map(student => student.toObject());
            console.log("Read Students:", students); 
        }

        response.status(rstatus).send(rbody);  
    };

    const catchFn = (error) => {
        rbody = {message : `Error in reading students.\n${error}`};

        if(IS_DEBUG) { console.log(rbody); }

        rstatus = 500;
        response.status(rstatus).send(rbody);  
    };

    StudentModel.find()
        .then(thenFn)
        .catch(catchFn);
}

app.get("/students", readAll);

const serverInit  = () => {
    console.log(`Server is running on port ${server_port}`);
}

// III - runs the server
    app.listen(server_port, serverInit);   