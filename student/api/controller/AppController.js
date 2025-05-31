const module_properties = {

};

class AppController{    
    serverInit  = () => {
        //dependencies
        const { server_port } = module_properties.app_properties;
        //task
        console.log(`Server is running on port ${server_port}`);
    }

    serverRootAction = (request, response) => {
        const rbody = { message: `Welcome To Student App` };
        response.send(rbody);
    }

    connectToMongo = async () => {
        //dependencies
        const { IS_DEBUG, mongo_url } = module_properties.app_properties;
        const { mongoose } = module_properties.app_properties.imports;
        //task
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

module.exports = {AppController, AppController_module_properties: module_properties};