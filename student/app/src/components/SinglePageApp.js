import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Component } from 'react';
import StudentList from './StudentList';
import CreateStudent from './CreateStudent';
import EditStudent from './EditStudent';
import MainPage from './MainPage';


class SinglePageApp extends Component {
    render() {    
      return(<>
        <BrowserRouter>            
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/student" element={<StudentList/>} />
            <Route path="/student/list" element={<StudentList/>} />
            <Route path="/student/create" element={<CreateStudent/>} />
            <Route path="/student/edit/:id" element={<EditStudent/>} />
          </Routes>
        </BrowserRouter>
      </>);
  }
}

export default SinglePageApp;