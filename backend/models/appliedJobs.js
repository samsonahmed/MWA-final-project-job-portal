const mongoose = require("mongoose");
const appliedJobSchema = mongoose.Schema({
companyName: String,
seeker:{
    name: String,
    email: String,
    phone: String,
    location: String,
    interests: String,
},
jobRole: String,
experience: String,
skills:String,
jobDescription: String,
jobType: String,
postedDate:String})
module.exports = mongoose.model("AppliedJob", appliedJobSchema);