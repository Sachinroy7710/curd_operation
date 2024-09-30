import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students'
});

// Check if the connection was successful
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Route to get data from the 'curd' table
app.get('/curd', (req, res) => {
    const sql = "SELECT * FROM curd";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: "Error fetching data from the server", error: err });
        }
        return res.json(result);
    });
});

// Route to insert data into 'curd' table
app.post('/curd', (req, res) => {
    const sql = "INSERT INTO curd (name, email, age, role) VALUES (?)";
    
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.role
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error executing insert query:', err);
            return res.status(500).json({ message: "Error inserting data into server", error: err });
        }
        return res.status(201).json({ message: "Data inserted successfully", result });
    });
});

// Route to read data from 'curd' table by ID
app.get('/curd/:id', (req, res) => {
    const sql = "SELECT * FROM curd WHERE id=?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing select query:', err);
            return res.status(500).json({ message: "Error fetching data from the server", error: err });
        }
        return res.json(result);
    });
});


// Route to update data in the 'curd' table by ID
app.put('/curd/:id', (req, res) => {
    const sql = "UPDATE curd SET name = ?, email = ?, age = ?, role = ? WHERE id = ?";
    const { name, email, age, role } = req.body;
    const id = req.params.id;

    db.query(sql, [name, email, age, role, id], (err, result) => {
        if (err) {
            console.error('Error executing update query:', err);
            return res.status(500).json({ message: "Error updating data in the server", error: err });
        }
        return res.status(200).json({ message: "Data updated successfully", result });
    });
});



// Route to delete a record by ID
app.delete('/curd/:id', (req, res) => {
    const sql = "DELETE FROM curd WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting record:', err);
            return res.status(500).json({ message: "Error deleting record", error: err });
        }
        return res.status(200).json({ message: "Record deleted successfully" });
    });
});


// Start the server
const port= process.env.PORT || 8085;
app.listen(port, () => {
    console.log('Server is running on port 8085');
});
