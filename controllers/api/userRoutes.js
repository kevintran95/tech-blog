const router = require('express').Router();
const { User } = require('../../models');

// Route to create new user
router.post('/', async (req,res) => {
  try {
      const dbUserData = await User.create({
          username: req.body.username,
          password: req.body.password,
      });
      // Creates a session
      req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.loggedIn = true;
          res.status(200).json(dbUserData);
      });
      
  } catch (err) {
       res.status(400).json(err);
  }
});

// Route to login as an existing user
router.post('/login', async (req,res) => {
  try {
      const dbUserData = await User.findOne({
          where: {
              username: req.body.username
          }
      });
      // If there is no matching username in the system, send error message
      if (!dbUserData) {
          res.status(400).json({message: 'Incorrect Username or Password. Please try again.'});
          return;
      }
      const validPassword = await dbUserData.checkPassword(req.body.password);
      // If the password does not match, send error message
      if (!validPassword) {
          res.status(400).json({message: 'Incorrect Username or Password. Please try again.'});
          return;
      }
      // User is logged in: establish the logged in variable 
      req.session.save(()=>{
          req.session.user_id = dbUserData.id;
          req.session.loggedIn=true;
          res.status(200).json({ user: dbUserData, message: "Successfuly logged in!" });
      })
  } catch (err) {
      res.status(500).json(err);
  }
});

router.post('/logout', (req,res)=>{
  if (req.session.loggedIn) {
      req.session.destroy(() => {
          console.log('hello');
          console.log(req.session);
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});

module.exports = router;
