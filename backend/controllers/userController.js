const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "7d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    console.log("2nd", user.name);

    const token = createToken(user._id);
    if (token) {
      console.log("token created!");
    }

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signupUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.signup(email, name, password);

    const token = createToken(user._id);

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserDetails = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const _id = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ _id });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }

  // const { id } = req.user._id;
  // console.log("tutaj: ", id);

  // // if (!mongoose.Types.ObjectId.isValid(id)) {
  // //   return res.status(404).json({ error: "No user with this id" });
  // // }

  // if (!user) {
  //   return res.status(404).json({ error: "No user with this id" });
  // }

  // if (user) {
  //   console.log(user);
  // }
};

module.exports = { loginUser, signupUser, getUserDetails };
