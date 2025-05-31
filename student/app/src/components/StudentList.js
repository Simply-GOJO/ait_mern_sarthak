import { Component } from 'react';
import StudentDao from '../network/StudentDAO';
import WrapRouter from './common/WrapRouter';
class StudentListLessRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
			students : [{ usn : '', name : '', sem : 1, branch : 'CSE', cgpa : 0, id: 'ID1234' }],
			page_preference : { isLoading: true}
		};
    }

    async componentDidMount () {
        const page_preference = { ...this.state.page_preference };   
        page_preference.isLoading = true;
        this.setState({ page_preference: page_preference });
        try { 
            const dao = new StudentDao();
            
            const response = await dao.readAll();
            if(response.status !== 200) {
                alert('Server Error');
                return
            }
            const students = response.data;
                     
            page_preference.isLoading = false;
            this.setState({ page_preference: page_preference, students : students });
        }
        catch( error ) { 
            alert("Server Error");
        }
    }

    onDeleteStudent = async (student) => {
        const { id } = student;

        if(!window.confirm(`Are you sure to delete ${student.name}?`)) {
            return false;
        }

        try { 
            const dao = new StudentDao();
            const response = await dao.delete(id);
            if(response.status !== 200) {
                alert('Server Error');
                return
            }
            alert('Student Deleted Successfully');
            
            //console.log( response ); //????
            window.location.reload(); //????
        }
        catch( error ) {
            alert('Server Error');
        }        
    }
    render () { 
        return ( 
            <>
                <div className="container">
                    <h1 className="h3 mb-3 fw-normal">List of Students</h1>
                    <div><a href={`/student/create`} className="btn btn-primary">Add Student</a></div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>USN#</th>
                                <th>Name</th>
                                <th>Semester</th>
                                <th>Branch</th>
                                <th>CGPA</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(!this.state.page_preference.isLoading) ? 
                                (this.state.students.map(( e ) => {
                                    return (
                                        <tr key={e.id}>
                                            <td>{e.usn}</td>
                                            <td>{e.name}</td>
                                            <td>{e.sem}</td>
                                            <td>{e.branch}</td>
                                            <td>{e.cgpa}</td>
                                            <td>
                                                <a href={`/student/edit/${e.id}`}
                                                    className="btn btn-warning">Edit</a>&nbsp;
                                                <button type="button"
                                                    onClick={() => this.onDeleteStudent(e)}
                                                    className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>);
                                    }/* end each mapper */) /* end map */
                                )
                                : (<tr><td colSpan={6}>Loading...</td></tr>)
                            }
                        </tbody>
                    </table>
                </div>                
            </>
        )
    }
}

const StudentList = WrapRouter(StudentListLessRouter)
export default StudentList;