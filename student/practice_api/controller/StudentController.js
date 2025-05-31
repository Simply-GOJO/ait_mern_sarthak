//const StudentModel = global.StudentModel; 

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

module.exports = StudentController;