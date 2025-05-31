import { Component } from 'react';
import StudentDao from '../network/StudentDAO';
import WrapRouter from './common/WrapRouter';
class CreateStudentLessRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
			student : { usn : '', name : '', sem : 1, branch : 'CSE', cgpa : 0 },
			page_preference : { isLoading: true}
		};
    }

    componentDidMount() {
        let page_preference = { ...this.state.page_preference };
        page_preference.isLoading = false;
        this.setState({ page_preference: page_preference });
    }

    onBoxChange = (event) => {
        let student = { ...this.state.student };        
        student[event.target.id] = event.target.value;
        this.setState({ student: student });
    }

    onCreateStudent = async (event) => {
        //console.log(this.state.student) //????
        const newStudent = { usn : this.state.student.usn, 
            name : this.state.student.name, 
            sem : this.state.student.sem, 
            branch : this.state.student.branch, 
            cgpa : this.state.student.cgpa }

        if(!window.confirm("Are you sure to create student?")) {
            return false;
        }

        try { 
            const dao = new StudentDao();
            const response = await dao.create(newStudent);
            if(response.status !== 200) {
                alert('Server Error');
                return
            }
            alert('Student Created Successfully');
            //const savedStudent = response.data; //????
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
                    <form>    
                        <div><a href={`/student/list`} className="btn btn-secondary">Go Back</a></div>
                        <h1 className="h3 mb-3 fw-normal">Create Student</h1>
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
                        <button className="w-100 btn btn-lg btn-primary"
                            type="button"
                            onClick={this.onCreateStudent}>Create</button>
                    </form>
                </div> 
            </>
        )
    }
}

const CreateStudent = WrapRouter(CreateStudentLessRouter)
export default CreateStudent;