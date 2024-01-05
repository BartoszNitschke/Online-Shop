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
    const { name } = user.name;

    const token = createToken(user._id);

    res.status(200).json({ email, token, localData: name });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signupUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.signup(email, name, password);

    const token = createToken(user._id);

    res.status(200).json({ email, name, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserDetails = async (req, res) => {
  const { email } = req.params;
  console.log("tutaj: ", email);

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "No user with this id" });
  // }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "No user with this id" });
  }

  if (user) {
    //console.log(user);
  }

  res.status(200).json(user);
};

module.exports = { loginUser, signupUser, getUserDetails };
