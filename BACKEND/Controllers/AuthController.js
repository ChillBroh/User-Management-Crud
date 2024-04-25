const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Email and Password Required!");
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User Not Found");
    }
    if (password !== user.password) {
      throw new Error("Invalid Password");
    }
    if (role !== user.role) {
      throw new Error("Invalid Role");
    }

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: createSendToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signToken = (email, role) => {
  return jwt.sign({ email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user) => {
  user.password = undefined;

  const token = signToken(user.email, user.role);
  const role = user.role;
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  const decode = (token) => {
    const tokenWithoutBearer = token.split(" ")[1];
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    return decoded;
  };
  return {
    status: "success",
    token,
    role,
    cookieOptions,
  };
};

const logout = (req, res, next) => {
  try {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      message: "logged Out!",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  loginUser,
  logout,
  //   resetPassword,
};
