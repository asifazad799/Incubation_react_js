// server/index.js
const express = require("express");
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const db = require('./config/connection');
const { notFound, erroHandler } = require("./middlewares/errorMiddleware");
const PORT = process.env.PORT || 3001;
const app = express();
require('dotenv').config();

app.use(express.json())
db.connect((err) => {
  if (err) console.log("Connection error " + err);
  else console.log("Database Connected to port 27017");
});

app.use('/users',userRoutes)
app.use('/admin',adminRoutes)

app.use(notFound)
app.use(erroHandler)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

