import { Component } from 'react';
import WrapRouter from './common/WrapRouter';
import StudentDao from '../network/StudentDAO';

class EditStudentLessRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
			student : { usn : '', name : '', sem : 1, branch : 'CSE', cgpa : 0 },
			page_preference : { isLoading: true}
		};
    }

    async componentDidMount () {
        try { 
            const dao = new StudentDao();
            const response = await dao.readOne(this.props.router.params.id);
            if(response.status !== 200) {
                alert('Server Error');
                return
            }
            const student = response.data;
            const page_preference = { ...this.state.page_preference };            
            page_preference.isLoading = false;
            this.setState({ page_preference: page_preference, student : student });
        }
        catch( error ) { 
            alert("Server Error");
        }
    }

    onBoxChange = (event) => {
        let student = { ...this.state.student };        
        student[event.target.id] = event.target.value;
        this.setState({ student: student });
    }

    onUpdateStudent = async (event) => {
        //console.log(this.state.student)//????
        const changedStudent = { usn : this.state.student.usn, 
            name : this.state.student.name, 
            sem : this.state.student.sem, 
            branch : this.state.student.branch, 
            cgpa : this.state.student.cgpa }
        const { id } = this.state.student;

        if(!window.confirm("Are you sure to update student?")) {
            return false;
        }

        try { 
            const dao = new StudentDao();
            const response = await dao.update(id, changedStudent);
            if(response.status !== 200) {
                alert('Server Error');
                return
            }
            alert('Student Updated Successfully');
            //const savedStudent = response.data;//????
            //console.log( savedStudent ); //????
            this.props.router.navigate("/student/list");
        }
        catch( error ) {
            alert('Server Error');
        }        
    }
    render () { 
        return ( 
            <>                  
                <div className="container">
                    <div><a href={`/student/list`} className="btn btn-secondary">Go Back</a></div>
                    <form>    
                        <h1 className="h3 mb-3 fw-normal">Edit Student</h1>
                        <div className="form-floating">
                            <input type="text" 
                                	className="form-control" 
                                    id="usn" 
                                    placeholder=""
                                    value={this.state.student.usn}
                                    onChange={this.onBoxChange}
                                    />
                            <label htmlFor="usn">USN #</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="name" 
                                placeholder=""
                                value={this.state.student.name}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="name">Your Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="sem" 
                                placeholder=""
                                value={this.state.student.sem}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="sem">Semester#</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="branch" 
                                placeholder=""                                
                                value={this.state.student.branch}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="branch">Branch</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="cgpa" 
                                placeholder=""                                
                                value={this.state.student.cgpa}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="cgpa">CGPA</label>
                        </div>
                        
                        <button className="w-100 btn btn-lg btn-warning"
                            type="button"
                            onClick={this.onUpdateStudent}>Update</button>
                    </form>
                </div> 
            </>
        )
    }
}

const EditStudent = WrapRouter(EditStudentLessRouter)
export default EditStudent;