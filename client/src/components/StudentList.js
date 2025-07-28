// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function StudentList({ reload, onEditRequest }) {
//   const [students, setStudents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 3;

//   const fetchStudents = () => {
//     axios.get('http://localhost:5000/api/students')
//       .then(res => setStudents(res.data));
//   };

//   const deleteStudent = (id) => {
//     axios.delete(`http://localhost:5000/api/students/${id}`)
//       .then(() => fetchStudents());
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [reload]);

//   const filteredStudents = students.filter((student) =>
//     student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     student.course.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//   const nextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const prevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by name, email, or course"
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setCurrentPage(1);
//         }}
//         style={{
//           width: '98%',
//           padding: '8px',
//           marginBottom: '16px',
//           borderRadius: '4px',
//           border: '1px solid #ccc',
//         }}
//       />

//       {currentStudents.length > 0 ? (
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#eee' }}>
//               <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
//               <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
//               <th style={{ border: '1px solid #ccc', padding: '8px' }}>Course</th>
//               <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentStudents.map((student) => (
//               <tr key={student.id}>
//                 <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.name}</td>
//                 <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.email}</td>
//                 <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.course}</td>
//                 <td style={{ border: '1px solid #ccc', padding: '8px' }}>
//                   <button onClick={() => onEditRequest(student)}>Edit</button>{' '}
//                   <button onClick={() => deleteStudent(student.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No students found.</p>
//       )}

//       {/* Pagination Controls */}
//       {filteredStudents.length > studentsPerPage && (
//         <div style={{ marginTop: '16px', textAlign: 'center' }}>
//           <button onClick={prevPage} disabled={currentPage === 1}>
//             Previous
//           </button>{' '}
//           Page {currentPage} of {totalPages}{' '}
//           <button onClick={nextPage} disabled={currentPage === totalPages}>
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StudentList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentList({ reload }) {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 3;
  const navigate = useNavigate();

  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students')
      .then(res => setStudents(res.data));
  };

  const deleteStudent = (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(() => fetchStudents());
  };

  useEffect(() => {
    fetchStudents();
  }, [reload]);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => navigate('/add')}>Add New Student</button>
      </div>

      <input
        type="text"
        placeholder="Search by name, email, or course"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          width: '98%',
          padding: '8px',
          marginBottom: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      {currentStudents.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Course</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.email}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.course}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <button onClick={() => navigate(`/edit/${student.id}`)}>Edit</button>{' '}
                  <button onClick={() => deleteStudent(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found.</p>
      )}

      {filteredStudents.length > studentsPerPage && (
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>{' '}
          Page {currentPage} of {totalPages}{' '}
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentList;
