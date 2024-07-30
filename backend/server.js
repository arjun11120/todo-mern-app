const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/todoRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to the database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

// Use routes
app.use('/api', routes); // Ensure route prefix is correct

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
