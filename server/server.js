const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const passport = require('passport');
require('./config/passport');

require('dotenv').config();
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes)

app.get('/', (req, res) => res.send('API running...'));

const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
