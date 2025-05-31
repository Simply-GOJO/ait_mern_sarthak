const module_properties = {

}; 
class AppRoutes {   
    // End Points of Students
    // Routes for CRUD operations defined
    students = (studentController) => {
        //dependencies
        const { app } = module_properties.app_properties.instances;
        //task
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
        //dependencies
        const { app } = module_properties.app_properties.instances;
        //task
        //NA  | (1) route for server root     | GET /
        app.get("/", appController.serverRootAction); 
    }
}

module.exports = { AppRoutes, AppRoutes_module_properties: module_properties};