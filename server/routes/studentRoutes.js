const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all students
router.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// POST a new student
router.post('/students', (req, res) => {
  const { name, email, course } = req.body;
  db.query(
    'INSERT INTO students (name, email, course) VALUES (?, ?, ?)',
    [name, email, course],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: result.insertId, name, email, course });
    }
  );
});

// PUT (update student)
router.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;
  db.query(
    'UPDATE students SET name=?, email=?, course=? WHERE id=?',
    [name, email, course, id],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.send('Student updated.');
    }
  );
});

// DELETE a student
router.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM students WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.send('Student deleted.');
  });
});

module.exports = router;
