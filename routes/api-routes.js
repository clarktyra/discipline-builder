// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/choices", function(req, res) {
    console.log(req.user.id);
    if (!req.user) {
      res.json({});
    } else {
      db.Choices.create({
        temptation: req.body.temptation,
        discipline: req.body.discipline,
        choice: req.body.choice,
        UserId: req.user.id
      })
        .then(function(dbChoice) {
          res.json(dbChoice);
        })
        .catch(function(err) {
          res.status(401).json(err);
        });
    }
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  // app.get("/api/user_data", function(req, res) {
  //   if (!req.user) {
  //     // The user is not logged in, send back an empty object
  //     res.json({});
  //   } else {
  //     // Otherwise send back the user's email and id
  //     // Sending back a password, even a hashed password, isn't a good idea
  //     res.json({
  //       email: req.user.email,
  //       id: req.user.id
  //     });
  //   }
  // });

  app.get("/api/user_data", function(req, res) {
    console.log(req.user.id);
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    if (!req.user) {
      res.json({});
    } else {
      db.Choices.findAll({
        where: {
          UserId: req.user.id,
          createdAt: {
            [Op.gt]: TODAY_START
          }
        },
        order: [["id", "DESC"]]
      }).then(function(choicesData) {
        res.json(choicesData);
      });
    }
  });

  app.get("/api/history", function(req, res) {
    console.log(req.user.id);
    if (!req.user) {
      res.json({});
    } else {
      db.Choices.findAll({
        where: {
          UserId: req.user.id
        },
        order: [["id", "DESC"]]
      }).then(function(choicesData) {
        res.json(choicesData);
      });
    }
  });

  // app.get("/api/sum", function(req, res) {
  //   // console.log(req.user.id);
  //   db.Choices.sum("choice", { where: { UserId: req.user.id } }).then(function(
  //     sum
  //   ) {
  //     res.json(sum);
  //   });
  // //   db.Choices.count("choice", { where: { UserId: req.user.id } }).then(
  // //     function(count) {
  // //       res.json(count);
  // //     }
  // //   );
  // });
};
