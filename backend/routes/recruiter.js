const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Jobs = require("../models/jobs");
const Recruiter = require("../models/recruiter");
const AppliedJob = require("../models/appliedJobs");
router.get("/", (req, res, next) => {
  Recruiter.find()
    .exec()
    .then((docs) => {
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
router.get("/postedJobs/:companyName", (req, res, next) => {
  Jobs.find({ companyName: req.params.companyName.toLowerCase() })
    .exec()
    .then((docs) => {
      if (docs) {
        console.log(docs);
        res.json(docs);
      } else {
        res.json({ message: "No Job Posted" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.get("/appliedEmployee/:companyName", (req, res, next) => {
  AppliedJob.find({ companyName: req.params.companyName.toLowerCase() })
    .exec()
    .then((docs) => {
      if (docs) {
        console.log(docs);
        res.json(docs);
      } else {
        res.json({ message: "No Job Posted" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.post("/", (req, res, next) => {
  const recruiter = new Recruiter({
    _id: new mongoose.Types.ObjectId(),
    companyName: req.body.companyName.toLowerCase(),
    password: req.body.password,
    email: req.body.email,
    experience: req.body.experience,
    about: req.body.about,
  });
  recruiter
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
router.post("/addJobs/:companyName", (req, res, next) => {
  const date = new Date();
  const postedDate =
    date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate();
  const job = new Jobs({
    _id: new mongoose.Types.ObjectId(),
    companyName: req.params.companyName.toLowerCase(),
    jobRole: req.body.jobRole,
    experience: req.body.experience,
    skills: req.body.skills,
    jobDescription: req.body.jobDescription,
    jobType: req.body.jobType,
    postedDate: postedDate,
  });
  job
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
  const date = new Date();
  const postedDate =
    date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate();
  console.log(req.body);
  let jobs = {
    jobRole: req.body.jobRole,
    experience: req.body.experience,
    skill: req.body.skill,
    jobDescription: req.body.jobDescription,
    jobType: req.body.jobType,
    postedDate: postedDate,
  };
  let result = await Recruiter.findOne({ companyName: req.params.companyName });
  result.postedJobs.push(jobs);
  await result.save();
  res.json({ sucess: 1 });
});
router.post("/login", async (req, res) => {
  const result = await Recruiter.findOne({
    companyName: req.body.companyName.toLowerCase(),
    password: req.body.password,
  });
  console.log(result);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ success: 0 });
  }
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

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
