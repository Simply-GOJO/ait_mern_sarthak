'use strict';
/*
version: 3.0
Defining mongo db 'promise' methods using 'async' and 'await'

To run:
Step 1: Run the mongo server where 'nithin_db' is the name of the database
Step 2: Run the app 
    $node app
        #OR 
    $node app.js 
Step 3: Use 'postman' to test the api end points 

-----------------------------------------------
project structure
-----------------------------------------------
    - config.js
    - [] model
        - AppModel.js
    - [] controller
        - AppController.js
        - StudentController.js
    - AppRoutes.js
    - app.js
```````````````````````````````````````````````
    !!! All other modules are imported to app.js
    !!! app.js shares its identifiers via 'global' object
```````````````````````````````````````````````

-----------------------------------------------
single page project
-----------------------------------------------
    - app_v2.js
```````````````````````````````````````````````

-----------------------------------------------
single page project
    'promise' way ie defining 'thenFn' and 'catchFn'
-----------------------------------------------
    - app_v1.js
``````````````````````````````````````````````` 
*/ 
const { server_port } = require('./config'); global.server_port = server_port;
const { cors_origin } = require('./config'); global.cors_origin = cors_origin;
const { mongo_url } = require('./config'); global.mongo_url = mongo_url;
const { IS_DEBUG } = require('./config'); global.IS_DEBUG = IS_DEBUG;

const express = require("express"); global.express = express;
const cors = require("cors"); global.cors = cors;
const mongoose = require("mongoose"); global.mongoose = mongoose;
const app = express(); global.app = app;

//...
const AppModel = require('./model/AppModel'); global.AppModel = AppModel;
//...
const AppController = require('./controller/AppController'); global.AppController = AppController;
//...
const appController = new AppController(); global.appController = appController;
const appModel = new AppModel(); global.appModel = appModel;


appController.connectToMongo();
const StudentModel = appModel.StudentModel(); global.StudentModel = StudentModel; 
//...
const StudentController = require('./controller/StudentController'); global.StudentController = StudentController;

//...
const AppRoutes = require('./AppRoutes'); global.AppRoutes = AppRoutes;


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