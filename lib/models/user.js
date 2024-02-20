// User Model

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

// Cart is an array of product ids as integers
// TODO: Routine is still WIP, not sure what type it should be or how to handle it.
let userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  cart: [Number],
  routine: [String],
  conditions: [String],
  age: Number,
  vegan: Boolean,
  crueltyFree: Boolean,
  budget: Number,
  useBudget: Boolean,
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);

export const registerUser = async function(userData) {
  if (!userData.password || !userData.email) {
    console.error("ERROR: Missing information in Register request.");
    throw new Error('Error: Missing information in request');
  } else {
    try {
      const hash = await bcrypt.hash(userData.password, 10);
      let newUser = new User({email: userData.email, password: hash});
      
      await newUser.save();
      console.log("User: " + userData.email + " successfully registered.");
    } catch(err) {
      throw new Error(err);
      console.log("Error: " + err);
      if (err.code == 11000) {
        throw new Error("email already used.");
      } else {
        throw new Error("Unknown error has occurred.");
      }
    }
  }
}

export const checkUser = async function(userData) {
  try {
    const user = await User.findOne({email: userData.email}).exec();
    
    // Compare passwords
    try {
      await bcrypt.compare(userData.password, user.password);
      return user;
    } catch(err){
      throw new Error("Incorrect password for user " + userData.email);
    }
    
  } catch(err) {
    throw new Error("Unable to find user " + userData.email);
  }
}

export const setProfile = async function(id, profile) {
  try {
    try {
      const user = await User.findById(id).exec();
      user.vegan = profile.vegan;
      user.useBudget = profile.useBudget;
      user.budget = profile.budget;
      user.crueltyFree = profile.crueltyFree;
      user.age = profile.age;
      user.conditions = profile.conditions;
      user.save();
    } catch(err) {
      throw new Error("Unknown error has occurred.")
    }
  } catch(err) {
    throw new Error("Unable to find user " + id);
  }
}

export const findUserById = async function(id) {
  try {
    const user = await User.findById(id).exec();

    if (user) {
      return user;
    } else {
      throw new Error("Error");
    }
  } catch(err){
    throw new Error('Unable to find user ' + id);
  }
}

// TODO: Retrieve cart, profile, recommendations