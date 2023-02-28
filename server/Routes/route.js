const express = require("express");
const router = express.Router();
const users = require("../Models/userSchema");

//####################### TO ADD NEW USER ##########################

router.post("/create-user", async (req, res) => {
  const { name, email, designation } = req.body;
  if (!name || !email || !designation) {
    res.status(400).json("Please fill all the fields");
  } else {
    try {
      const isAlreadyExists = await users.findOne({ email: email });
      if (isAlreadyExists) {
        res.status(403).json({ message: "User Already Exists!!" });
      } else {
        const newUser = new users({
          name,
          email,
          designation,
        });
        await newUser.save();
        res
          .status(201)
          .json({ data: newUser, message: "Record Created Successfully" });
      }
    } catch (error) {
      res.status(400).json({ message: "Oops, Something went wrong!" });
    }
  }
});

//####################### TO FETCH ALL USERS ##########################

router.get("/users", async (req, res) => {
  const userData = await users.find().select("-__v");
  res.status(200).json({ data: userData})
});

//####################### TO FETCH INDIVIDUAL USER ##########################

router.get("/users/:id", async (req, res) => {
  const{id} = req.body;
  const singleUserData = await users.findById({ _id: id }).select("-__v");
  singleUserData
    ? res.status(200).json({ data: singleUserData })
    : res.status(400).json({ error: "Oops, Something went wrong!!" });
});

//####################### TO UPDATE INDIVIDUAL USER ##########################

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUserData = await users.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  updatedUserData
    ? res.status(200).json({ data: updatedUserData, message:"Details Updated Successfully" })
    : res.status(400).json({ error: "Oops, Something went wrong!!" });
});

//####################### TO DELETE INDIVIDUAL USER ##########################

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUserData = await users.findByIdAndDelete({ _id: id });
  deletedUserData
    ? res.status(200).json({ data: deletedUserData,message:"User Deleted Successfully" })
    : res.status(400).json({ error: "Oops, Something went wrong!!" });
});

module.exports = router;
