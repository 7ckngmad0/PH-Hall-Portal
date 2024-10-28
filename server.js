const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt'); 
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:8080'
  }));

app.use(express.json());
app.use(express.static('public')); 

// Ensure users.json exists
const usersFilePath = path.join(__dirname, 'users.json');
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([])); 
}

// Endpoint for signup
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { username, password: hashedPassword };

    // Read existing users from users.json
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        const users = JSON.parse(data || '[]');
        users.push(userData);

        // Write updated users back to users.json
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving user data' });
            }
            res.status(201).json({ message: 'User  signed up successfully' });
        });
    });
});

// Endpoint for login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        const users = JSON.parse(data || '[]');
        const user = users.find(u => u.username === username);

        if (user) {
            // Compare the hashed password
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.json({ message: 'Login successful' });
                } else {
                    res.status(401).json({ message: 'Invalid username or password' });
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});