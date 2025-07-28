// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function StudentForm({ onStudentAddedOrUpdated, editingStudent }) {
//   const [student, setStudent] = useState({ name: '', email: '', course: '' });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (editingStudent) {
//       setStudent(editingStudent);
//     } else {
//       setStudent({ name: '', email: '', course: '' });
//     }
//   }, [editingStudent]);

//   const validate = () => {
//     const newErrors = {};
//     if (!student.name.trim()) newErrors.name = 'Name is required';
//     if (!student.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
//       newErrors.email = 'Invalid email format';
//     }
//     if (!student.course.trim()) newErrors.course = 'Course is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (!validate()) return;

//   const request = editingStudent
//     ? axios.put(`http://localhost:5000/api/students/${editingStudent.id}`, student)
//     : axios.post('http://localhost:5000/api/students', student);

//   request
//     .then(() => {
//       alert(editingStudent ? 'Student updated!' : 'Student added!');
//       onStudentAddedOrUpdated();
//       setStudent({ name: '', email: '', course: '' });
//       setErrors({});
//     })
//     .catch((err) => {
//       if (err.response && err.response.data.error === 'Email already exists') {
//         setErrors({ email: 'This email is already in use.' });
//       } else {
//         alert('Something went wrong. Please try again.');
//       }
//     });
// };


//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="name"
//         placeholder="Name"
//         value={student.name}
//         onChange={handleChange}
//         required
//       />
//       {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}

//       <input
//         name="email"
//         placeholder="Email"
//         value={student.email}
//         onChange={handleChange}
//         required
//       />
//       {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}

//       <input
//         name="course"
//         placeholder="Course"
//         value={student.course}
//         onChange={handleChange}
//         required
//       />
//       {errors.course && <div style={{ color: 'red' }}>{errors.course}</div>}

//       <button type="submit">{editingStudent ? 'Update' : 'Add'} Student</button>
//     </form>
//   );
// }

// export default StudentForm;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function StudentForm({ onStudentAddedOrUpdated }) {
  const [student, setStudent] = useState({ name: '', email: '', course: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // for edit
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get('http://localhost:5000/api/students')
        .then((res) => {
          const found = res.data.find((s) => s.id === parseInt(id));
          if (found) {
            setStudent(found);
          } else {
            alert('Student not found.');
            navigate('/');
          }
        })
        .catch((err) => {
          alert('Error fetching student data.');
          navigate('/');
        });
    }
  }, [id, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!student.name.trim()) newErrors.name = 'Name is required';
    if (!student.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!student.course.trim()) newErrors.course = 'Course is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const request = id
      ? axios.put(`http://localhost:5000/api/students/${id}`, student)
      : axios.post('http://localhost:5000/api/students', student);

    request
      .then(() => {
        alert(id ? 'Student updated!' : 'Student added!');
        onStudentAddedOrUpdated();
        navigate('/');
      })
      .catch((err) => {
        if (err.response && err.response.data.error === 'Email already exists') {
          setErrors({ email: 'This email is already in use.' });
        } else {
          alert('Something went wrong. Please try again.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>{id ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <input
            name="name"
            placeholder="Name"
            value={student.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: '12px' }}>
          <input
            name="email"
            placeholder="Email"
            value={student.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: '12px' }}>
          <input
            name="course"
            placeholder="Course"
            value={student.course}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.course && <div style={{ color: 'red' }}>{errors.course}</div>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? (id ? 'Updating...' : 'Saving...') : (id ? 'Update Student' : 'Add Student')}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
