'use strict';
/*
version: 4.0
*/ 
const app_properties = require('./config'); 

//...
const {AppModel, AppModule_module_properties} = require('./model/AppModel'); 
AppModule_module_properties["app_properties"] = app_properties; // properties provider

//...
const {AppController, AppController_module_properties}  = require('./controller/AppController'); 
AppController_module_properties["app_properties"] = app_properties;// properties provider
//...
const appController = new AppController(); 
    app_properties["instances"]["appController"] = appController;// properties extension
const appModel = new AppModel(); 
    app_properties["instances"]["appModel"] = appModel;// properties extension

appController.connectToMongo();
const StudentModel = appModel.StudentModel(); 
    app_properties["models"] = { StudentModel };// properties extension

//...
const {StudentController, StudentController_module_properties} = require('./controller/StudentController'); 
StudentController_module_properties["app_properties"] = app_properties;// properties provider
//...
const {AppRoutes, AppRoutes_module_properties} = require('./AppRoutes'); 
AppRoutes_module_properties["app_properties"] = app_properties;// properties provider

function app_init(){
    //depedencies
    const { cors_origin } = app_properties;
    const { express, cors } = app_properties.imports;
    const { app } = app_properties.instances;
    //task
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
}
app_init();

module.exports = app_properties;
   