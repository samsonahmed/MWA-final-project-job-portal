const express = require("express");
const mongoose = require("mongoose");
const recruiter = require("./routes/recruiter");
const seekers=require("./routes/seeker")
const cors=require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    `mongodb+srv://samson:${password}@cluster0.l6tcx.mongodb.net/jobportal?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => console.error(`Error connecting to the database : err`));

// app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));
// app.use((req, res, next) => {
 

//   next();
// });

app.use("/recruiters", recruiter);
app.use("/seekers", seekers);
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
app.listen(3000, () => {
    console.log(`Server started on 3000`);
});
