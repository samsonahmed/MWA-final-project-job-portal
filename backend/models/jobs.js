const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
companyName:String,
jobRole: String,
experience: String,
skills:String,
jobDescription: String,
jobType: String,
postedDate:String
});
module.exports = mongoose.model("Jobs", jobSchema);
