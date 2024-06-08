const userModel = require("../models/userModel");
const { isValidObjectId } = require("mongoose");
const Validator = require("../Validators/userValidator");
const subscriptionModel = require("../models/subscriptionModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id, userName, subscriptionType) => {
  return jwt.sign(
    { id: id, userName: userName, subscriptionType: subscriptionType },
    process.env.SECRET_KEY,
    { expiresIn: "72h" }
  );
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
  const userCreated = await userModel.create({
    userName,
    password: hashedPassword,
    email,
  });
  const token = generateToken(user._id, user.userName, user.subscriptionType);

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
  });
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
    const token = generateToken(user._id, user.userName, user.subscriptionType);
    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ massage: "logging in" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
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
    const nweUser = await userModel
      .findByIdAndUpdate(user[0]._id, {
        subscriptionType: { name, limitExport, saveImageCount },
      })
      .select("-password");
    res.status(200).json(nweUser);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.decreaseExport = async (req, res, next) => {
  const { userName } = req.params;
  const user = await userModel.findOne({ userName: userName });
  if (!user) {
    return res.status(401).json({ message: "userName not found" });
  }
  const data = user.subscriptionType;
  try {
    const updatedUser = await userModel
      .findByIdAndUpdate(
        user._id,
        {
          $set: {
            'subscriptionType.limitExport': data.limitExport - 1,
          },
        },
        { new: true }
      )
      .select('-password');

    const token = generateToken(
      updatedUser._id,
      updatedUser.userName,
      updatedUser.subscriptionType
    );
    res.cookie('jwt', token, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
exports.getUserData = async (req, res) => {
  res.json({ user: req.user });
};
