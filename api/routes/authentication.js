const jwt = require("jsonwebtoken");

const checkadmin = (req, res, next) => {
  try {
    const cookie = JSON.parse(JSON.stringify(req.cookies));
    if (Object.keys(cookie).length == 0) {
      return res.status(200).json({
        message: "You are not Authenticated!!",
      });
    }
    const token = cookie.token;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(200).json({
          message: "Token is not Valid!!",
          error: err,
        });
      } else {
        // console.log(decoded);
        if (!decoded.isadmin) {
          return res.status(200).json({
            message: "You are not an admin!!!",
          });
        }
        next();
      }
    });
  } catch (err) {
    res.status(200).json({
      error: err,
      message: "Error in checkadmin middleware",
    });
  }
};

module.exports = { checkadmin };
