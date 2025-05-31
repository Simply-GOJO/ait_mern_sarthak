'use strict';
/*
Defining mongo db 'promise' methods using 'async' and 'await'

To run:
Step 1: Run the mongo server where 'nithin_db' is the name of the database
Step 2: Run the app 
    $node app_v2
        #OR 
    $node app_v3.j2 
Step 3: Use 'postman' to test the api end points 
[
    {   "usn": "1001",	"name": "dravid",	"sem": 3,	"branch": "CSE",	"cgpa": 9.3	},    
	{	"usn": "1002",  "name": "ganguli",	"sem": 5,	"branch": "ECE",	"cgpa": 9.7	},    
	{	"usn": "1005",	"name": "sami",	"sem": 2,	"branch": "ISE",	"cgpa": 4.3	},    
	{	"usn": "1006",	"name": "subman gill",	"sem": 2,	"branch": "ECE",	"cgpa": 7.7	},    
	{	"usn": "1007",	"name": "jaiswal",	"sem": 5,	"branch": "ME",	"cgpa": 4.7	}
]
gernerated id = 659fab0a38cb75b8578dc309
*/ 
const server_port = 8080;
const cors_origin = "http://localhost:3000";
const mongo_url = "mongodb://localhost:27017/nithin_db";
const IS_DEBUG = true;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//...
class AppModel {
    toJSON = function() {
        const { __v, _id, ...instance } = this.toObject();
        instance.id = _id;
        return instance;
    }

    StudentModel = () => {
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
        schema.method("toJSON", this.toJSON);        
        const StudentModel = mongoose.model("student", schema);
    
        return StudentModel;
    }
}

//...
class AppController{    
    serverInit  = () => {
        console.log(`Server is running on port ${server_port}`);
    }

    serverRootAction = (request, response) => {
        const rbody = { message: `Welcome To My Application` };
        response.send(rbody);
    }

    connectToMongo = async () => {
        mongoose.Promise = global.Promise;
        
        try {
            await mongoose.connect(mongo_url);

            if(IS_DEBUG) { console.log("Connected to database");  }
        }
        catch( error ) {
            if(IS_DEBUG) { console.log("Cannot connect to database", error); }
            process.exit();
        }
    }
}

//...
const appController = new AppController();
const appModel = new AppModel();


appController.connectToMongo();
const StudentModel = appModel.StudentModel(); 

//...
class StudentController {
    create = async (request, response) => {
        const student = { ...request.body };  

        let rbody = { };
        let rstatus = 200;

        try {
            const data = await StudentModel.create(student);

            rbody = data;

            if(IS_DEBUG) { console.log("Created Student:", rbody.toObject()); }
        }
        catch( error ) {
            rbody = {message : `Error in creating student.\n${error}`};           

            if(IS_DEBUG) { console.log(rbody); }

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }     
    
    readAll = async (request, response) => {
        let rbody = {};
        let rstatus = 200;

        try {
            const data = await StudentModel.find();

            rbody = data;
            
            if(IS_DEBUG) { 
                const students = rbody.map(student => student.toObject());
                console.log("Read Students:", students); 
            } 
        }
        catch( error ) {
            rbody = {message : `Error in reading students.\n${error}`};

            if(IS_DEBUG) { console.log(rbody); }

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);  
    }
    
    readById = async (request, response) => {
        const id = request.params.id;

        let rbody = {};
        let rstatus = 200;

        try {
            const data = await StudentModel.findOne({ _id : id }); 

            //const data = await StudentModel.findById(id);

            if(!data) {
                rbody = {"message" : "Student is not found"};

                if(IS_DEBUG) { console.log(rbody); }

                rstatus = 404;
            }
            else {
                rbody = data;

                if(IS_DEBUG) { console.log("Read Student:", data.toObject()); }
            }
        }
        catch( error ) {
            rbody = {message : `Error in reading student.\n${error}`};

            if(IS_DEBUG) { console.log(rbody); }

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }

    update = async (request, response) => {
        const id = request.params.id;
        const student = {...request.body};

        let rbody = {};
        let rstatus = 200;

        try {
            const data = await StudentModel.findOneAndUpdate({ _id : id }, student, {new: true});
            //const data = await StudentModel.findByIdAndUpdate(id, student, {new: true})

            if(!data) {
                rbody = {"message" : "Student is not found"};

                if(IS_DEBUG) { console.log(rbody); }

                rstatus = 404;
            }
            else {
                rbody = data;

                if(IS_DEBUG) { console.log("Updated student:", data.toObject()); }
            }
        }
        catch( error ) {
            rbody = {message : `Error in updating student.\n${error}`};

            if(IS_DEBUG) { console.log(rbody); }

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);        
    }
    
    remove = async (request, response) => {
        const id = request.params.id;
        
        let rbody = {};
        let rstatus = 200;

        try {
            const data = await StudentModel.findOneAndDelete({ _id : id });
            //const data = await StudentModel.findByIdAndDelete(id);

            if(!data) {
                rbody = {"message" : "Student is not found"};

                if(IS_DEBUG) { console.log(rbody); }

                rstatus = 404;
            } 
            else { 
                rbody = {message: "Student is Deleted successfully."};

                if(IS_DEBUG) { console.log(rbody); }
            }
        }
        catch( error ) {
            rbody = {message : `Error in deleting student.\n${error}`};

            if(IS_DEBUG) { console.log(rbody); }

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }  
}


//...
class AppRoutes {   
    // End Points of Students
    // Routes for CRUD operations defined
    students = (studentController) => {
        //C  | (1) student creation         | POST /students        
        app.post("/students", studentController.create);     

        //R   | (2) read all students        | GET /students
        app.get("/students", studentController.readAll);     

        //R   | (3) read a student by id    | GET /students/:id
        app.get("/students/:id", studentController.readById);       
        
        //U   | (4) update student          | PUT /students/:id
        app.put("/students/:id", studentController.update);

        //D   | (5) delete student          | DELETE /students/:id
        app.delete("/students/:id", studentController.remove);   
    }

    // End Points of Root
    root = (appController) => {
        //NA  | (1) route for server root     | GET /
        app.get("/", appController.serverRootAction); 
    }
}


// I - middleware calls
    // 1. third-party middleware 
    //      - Enable cross-origin resource sharing (CORS) with various options
    //      - Here, 'cross-origin' means 'cross-site'
    //      -       'cross-origin resource sharing' means 'cross-site resource request and response'
    app.use(cors(cors_origin)); 

    // 2. built-in middleware
    //      - parses incoming requests with JSON payloads. 
    //        NOTE: Available with Express 4.16.0+
    app.use(express.json());                        

    // 3. built-in middleware
    //      - parses incoming requests with URL-encoded payloads. 
    //        NOTE: Available with Express 4.16.0+
    app.use(express.urlencoded({extended: true}));  

// II - Routes for API end points
    const appRoutes = new AppRoutes();
    appRoutes.root(appController);
    appRoutes.students(new StudentController());

// III - runs the server
    app.listen(server_port, appController.serverInit);   