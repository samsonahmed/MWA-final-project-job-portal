const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Jobs = require("../models/jobs");
const Seeker = require("../models/seeker");
const Recruiter = require("../models/recruiter");
const AppliedJobs = require("../models/appliedJobs");
router.get("/", (req, res, next) => {
  Seeker.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
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
router.get("/getJobs", (req, res, next) => {
  Jobs.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.get("/appliedJobs/:name", (req, res, next) => {
  AppliedJobs.find({ name: req.params.name.toLowerCase() })
    .exec()
    .then((docs) => {
      if (docs) {
        res.json(docs);
      } else {
        res.json({ message: "No Job Applied Found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.post("/applyjobs/:name/:companyName", async (req, res, next) => {
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

  const date = new Date();
  const postedDate =
    date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate();
  const appliedjob = new AppliedJobs({
    _id: new mongoose.Types.ObjectId(),
    companyName: req.params.companyName.toLowerCase(),
    seeker: {
      name: name,
      email: email,
      phone: phone,
      interests: interests,
      location: location,
    },
    jobRole: req.body.jobRole,
    experience: req.body.experience,
    skills: req.body.skills,
    jobDescription: req.body.jobDescription,
    jobType: req.body.jobType,
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
      res.status(500).json({
        error: err,
      });
    });
});
router.post("/login", async (req, res) => {
  const result = await Seeker.findOne({
    name: req.body.name.toLowerCase(),
    password: req.body.password,
  });
  console.log(result);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ success: 0 });
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
