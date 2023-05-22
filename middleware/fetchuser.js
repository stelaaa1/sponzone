const jwt = require('jsonwebtoken');
//SECRET KEY FOR JWT
//it is important and needed to be hidden from client-side
const JWT_SECRET = 'ehfggfGWEGVBB#@&WBFBEV324IU298NBV34FKJB$@';
//if recreated all previous doc with this token is invalid

//("next") is the middleware after fetuser that will run
//here-router.post("/getuser" will run
const fetchuser = (req, res, next) => {
  //Get the user form JWT Token and add id to req object

  const { atoken: token } = req.body;

  if (!token) {
    res.status(401).send({ error: 'please authenticate using valid token' });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    res.status(401).send({ error: 'please authenticate using valid token' });
  }
};

module.exports = fetchuser;
