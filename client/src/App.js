import React, { useState } from 'react';
import './App.css';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [reload, setReload] = useState(false);

  const handleStudentAddedOrUpdated = () => {
    setReload(!reload);
  };

  return (
    <Router>
      <div className="container">
        <h1>Student Management System</h1>
        <Routes>
          <Route
            path="/"
            element={<StudentList reload={reload} />}
          />
          <Route
            path="/add"
            element={<StudentForm onStudentAddedOrUpdated={handleStudentAddedOrUpdated} />}
          />
          <Route
            path="/edit/:id"
            element={<StudentForm onStudentAddedOrUpdated={handleStudentAddedOrUpdated} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
