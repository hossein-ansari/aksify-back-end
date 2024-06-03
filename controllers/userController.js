const userModel = require("../models/userModel");
const { isValidObjectId } = require("mongoose");
const Validator = require("../Validators/userValidator");
const subscriptionModel = require("../models/subscriptionModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const generateToken = (user) => {
  return jwt.sign({id}, process.env.SECRET_KEY, { expiresIn: '72h' });
};
exports.create = async (req, res) => {
  const isValid = Validator(req.body);
  if (!isValid) {
    res.status(422).json(isValid);
  }
  const { userName, password, email } = req.body;
  const user = await userModel.findOne({ userName: userName });
  if (user) {
    return res.status(422).json({ message: "userName already used" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userCreated = await userModel.create({ userName, password: hashedPassword, email });
  const token = generateToken(userCreated._id);
  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict'
  });
  res.json({ message: 'Logged in successfully' });
  res.status(200).json({
    massage: "user created",
  });
};
exports.login = async (req, res) => {
  const isValid = Validator(req.body);
  if (!isValid) {
    res.status(422).json(isValid);
  }
  const { userName, password } = req.body;
  const user = await userModel.findOne({ userName: userName }).select("-__v");
  if (!user) {
    return res.status(401).json({ message: "userName not found" });
  }
  try {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "password ir wrong" });
    }
    const token = generateToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict'
    });
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    return res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.update = async (req, res) => {
  const isValid = Validator(req.body);
  if (!isValid) {
    res.status(422).json(isValid);
  }
  const { userName, subscriptionTypeId } = req.body;
  const user = await userModel.find({ userName: userName });
  const { limitExport, name, saveImageCount } = await subscriptionModel.findOne(
    { _id: subscriptionTypeId }
  );
  if (!user) {
    return res.status(401).json({ message: "userName not found" });
  }
  try {
    const nweUser = await userModel.findByIdAndUpdate(user[0]._id, {
      subscriptionType: { name, limitExport, saveImageCount },
    }).select('-password');
    res.status(200).json(nweUser)
  } catch (err) {
    res.status(400).json(err)
  }
};
exports.getUserData = (req, res) => {
  res.json({ user: req.user });
};