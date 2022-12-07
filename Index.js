const express = require("express");
const app = express();
const router = express.Router();
const Feedback = require("./Models/Feedback.js");
const Joinus = require("./Models/Joinus.js");
const Count = require("./Models/Count.js");
app.use(express.static(__dirname + "/public"));
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const mongURI = process.env.MongoURI;
const connectToMongo = () => {
  mongoose
    .connect(mongURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};
connectToMongo();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
// available routes
// ROUTE 1: get all the feedbacks using:get "/api/feedbacks/getuser"
router.get("/fetch_feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error ocured");
  }
});
router.get("/fetch_joinus", async (req, res) => {
  try {
    const joinus = await Joinus.find();
    res.json(joinus);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error ocured");
  }
});
async function findUserByEmail(email) {
  try {
    return Feedback.findOne({ email: email.toLowerCase() });
  } catch (error) {
    throw new Error(`Unable to connect to the database.`);
  }
}
router.post("/post-feedback", async (req, res) => {
  try {
    const feedData = new Feedback({
      name: req.body.name,
      email: req.body.email,
      feed: req.body.feedback,
    });
    const userWithEmail = await findUserByEmail(feedData.email);
    if (userWithEmail) {
      return res.status(409).send({ message: "Email is already taken." });
    }
    feedData.save().then((data) => {
      res.status(200).json({ sucess: "sucess" });
      // 			res.render('FeedbackForm',
      // { msg: "Your feedback successfully saved." });
    });
  } catch (error) {
    res.status(400).json();
    // res.render('FeedbackForm',
    // 	{ msg: "Check Details." });
  }
});
router.post("/post-joinus", async (req, res) => {
  try { 
    const joinusData = new Joinus({
      firstname: req.body.firstname, 
      lastname: req.body.lastname, 
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      street_address: req.body.street_address,
      state_province: req.body.state_province,
      city: req.body.city,
      zip_code: req.body.zip_code,
      blood_grp: req.body.blood_grp,
      current_city: req.body.current_city, 
      reason_to_join: req.body.reason_to_join,
    }); 
    const userWithEmail = await findUserByEmail(joinusData.email);
    if (userWithEmail) {
      return res.status(409).send({ message: "Email is already taken." });
    }
    joinusData.save().then((data) => {
      res.status(200).json({ sucess: "sucess" });
      // 			res.render('FeedbackForm',
      // { msg: "Your feedback successfully saved." });
    });
  } catch (error) {
    res.status(400).json();
   console.log(error)
  }
});
router.get("/", async (req, res) => {
  try {
    res.json("works ");
  } catch (error) {
    res.status(400).json();
    // res.render('FeedbackForm',
    // 	{ msg: "Check Details." });
  }
});
router.get("/fetch_counts", async (req, res) => {
  try {
    const counts = await Count.find();
    res.json(counts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error ocured");
  }
});
app.post('/join',(req,res)=>{
  new Joinus({
    name:req.body.name,
    email:req.body.email,
    dob:req.body.dob,
    gender:req.body.gender,
    phone:req.body.phone,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
    bloodgroup:req.body.bloodgroup,
    currentcity:req.body.currentcity,
    category:req.body.category,
    whyjoin:req.body.whyjoin,
    active:true,
    date: new Date(Date.now()).toLocaleString().split(',')[0],
    time:new Date().toLocaleTimeString()
  })
  .save((err,doc)=>{
    if(err){
      console.log(err);
      res.json(err)
    }

    else{
      volval=true;
      console.log("joinus working",volval);
      // mongodb.db("sharvadatabase").collection("counter").updateOne({name:'Volunteers'},{count:count+1});
      res.json("Success");
    }
  })})
app.use("/", router);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening on port ${port}`);
});
