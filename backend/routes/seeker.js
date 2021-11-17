const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Jobs = require("../models/jobs");
const Seeker = require("../models/seeker");
const Recruiter = require("../models/recruiter");
const AppliedJobs = require("../models/appliedJobs");
router.get("/", (req, res, next) => {
  Jobs.find()
    .exec()
    .then((docs)=> {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.get("/getJobs", async (req, res, next) => {
  await Jobs.find()
  .exec()
  .then((docs)=> {
    console.log("this my doc "+docs);
    res.status(200).json(docs);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
})
router.get("/:name", async (req, res, next) => {
  await Seeker.findOne({ name: req.params.name })
    .exec()
    .then((docs) => {
      console.log(docs);
      res.json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.get("/getJobs", async (req, res, next) => {
  await Jobs.find()
  .exec()
  .then((docs)=> {
    console.log("this my doc "+docs);
    res.json(docs);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
})
router.get("/appliedJobs/:name", (req, res, next) => {
  console.log("inside this :"+req.params.name)
  AppliedJobs.find({ 'seeker.name': req.params.name.toLowerCase() })
  .select("-seeker")
    .exec()
    .then((docs) => {
      if (docs.length> 0) {
        res.json({docs,success:1});
      } else {
        res.json({ success: 0});
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.post("/applyjobs/:name/:companyName/:job_id/", async (req, res, next) => {
  console.log(req.params.name+" "+req.params.companyName+" "+req.params.job_id);
  const result= await AppliedJobs.findOne({_id:req.params.job_id});
  if(result){
     console.log("successfully")
      res.json({success:0});
  }
  else{
  let name = "";
  let email = "";
  let phone = "";
  let location = "";
  let interests = "";
  await Seeker.findOne({ name: req.params.name.toLowerCase() })
    .exec()
    .then((docs) => {
      console.log(docs);
      name = docs.name.toString();
      email = docs.email.toString();
      phone = docs.phone.toString();
      location = docs.location.toString();
      interests = docs.interests.toString();
    });
    let jobRole='';
    let experience='';
    let skills='';
    let jobDescription='';
    let jobType=''
    await Jobs.findOne({ name: req.params.name.toLowerCase() })
    .exec()
    .then((docs) => {
      console.log(docs);
      jobRole= docs.jobRole.toString();
      experience = docs.experience.toString();
      skills = docs.skills.toString();
      jobDescription = docs.jobDescription.toString();
      jobType = docs.jobType.toString();
    });
  const date = new Date();
  const postedDate =
    date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate();
  const appliedjob = new AppliedJobs({
    // _id: new mongoose.Types.ObjectId(),
    _id:req.params.job_id,
    companyName: req.params.companyName.toLowerCase(),
    seeker: {
      name: name,
      email: email,
      phone: phone,
      interests: interests,
      location: location,
    },
    jobRole: jobRole,
    experience: experience,
    skills: skills,
    jobDescription: jobDescription,
    jobType: jobType,
    postedDate: postedDate,
  });
  appliedjob
    .save()
    .then((result) => {
      console.log(result);
      res.json({
        success: 1,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err,
      });
    });
  }
});
router.post("/login", async (req, res) => {
  const name = await Seeker.findOne({
    name: req.body.name.toLowerCase(),
    password: req.body.password,
  }).exec()
  .then((docs)=>{
    if(docs){
    return docs.name.toString();
    }
    else{
      return undefined;
    }
  })
  console.log(name);
  if(name) {
      jwt.sign({name}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
      res.json({
        token,name,success:1
      });
    });
  } else {
    res.json({success:0});
  }
});
router.post("/", (req, res, next) => {
  console.log(req.body);
  const seeker = new Seeker({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name.toLowerCase(),
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    experience: req.body.experience,
    location: req.body.location,
    gender: req.body.gender,
    interests: req.body.interests,
  });
  seeker
    .save()
    .then((result) => {
      console.log(result);
      res.json({
        success: 1,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.patch("/addJobs/:companyName", async (req, res, next) => {
  console.log("Inside this method");
  console.log(req.body);
  let jobs = {
    jobRole: req.body.jobRole,
    experience: req.body.experience,
    skill: req.body.skill,
    jobDescription: req.body.jobDescription,
    jobType: req.body.jobType,
  };
  let result = await Recruiter.findOne({ companyName: req.params.companyName });
  result.postedJobs.push(jobs);
  await result.save();
  res.json({ sucess: 1 });
});

router.patch("/addSeekers/:companyName", async (req, res, next) => {
  console.log("Inside this method");
  console.log(req.body);
  let result = await Recruiter.findOne({ companyName: req.params.companyName });
  let seeker = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location,
    appliedFor: result.jobRole,
  };
  result.seekers.push(seeker);
  await result.save();
  res.json({ sucess: 1 });
});
router.put("/:name", async (req, res, next) => {
  console.log("Inside this method");
  console.log(req.body);
  const update={email: req.body.email,phone: req.body.phone,
    gender: req.body.gender,
    location: req.body.location,
    experience: req.body.experience,
    interests: req.body.interests
  }
  await Seeker.findOneAndUpdate(
    { name: req.params.name },
    update,
    function (err, result) {
      try {
        console.log(result)
        res.json({ success: 1 });
        console.log("updated");
      } catch (err) {
        console.log(err);
      }
    }
  ).clone().catch(err =>{console.log(err)});
});

module.exports = router;
