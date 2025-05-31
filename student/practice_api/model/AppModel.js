//const mongoose = global.mongoose;

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

module.exports = AppModel;