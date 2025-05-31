import network from "./init";
export default class StudentDao{
    STUDENT_URL = "/students";
    create = (newStudent) => {
        return network.post(`${this.STUDENT_URL}`, newStudent);
    }
    readAll = () => {
        return network.get(`${this.STUDENT_URL}`);
    } 
    readOne = (id) => {
        return network.get(`${this.STUDENT_URL}/${id}`);
    } 
    update = (id, changedStudent) => {
        return network.put(`${this.STUDENT_URL}/${id}`, changedStudent);
    }
    delete = (id) => {
        return network.delete(`${this.STUDENT_URL}/${id}`);
    }       
}