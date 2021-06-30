const User = require('../models/user');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

//pass the user datas to a new profile object
exports.userById = (req, res, next, id) => {
    User.findById(id)
        // populate followers and following users array
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User not found'
                });
            }
            req.profile = user; // adds profile object in req with user info
            next();
        });
};

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(users);
    }).select('name email updated created role');
};

//original get user by id
exports.getUser = (req, res) => {
    //const userId = req.params.id
    let user = req.profile;
    //it can be findOne too
    //User.findOne({_id: userId}).exec((err, user)=> {
    User.findById(user.id).exec((err, user)=> {
        if(err || !user){
            return res.status(400).json({
                error: 'User not found!!!'
            })
        }
       
        //hiding the hashed password and salt
        user.hashed_password = undefined;
        user.salt = undefined;
        //returning user data
        res.json(user);
    })
};

/*
exports.update = (req, res)=> {
    //  console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body)
      const {name, password, _id} = req.body
  
      User.findOne(_id, (err, user)=>{
          if(err|| !user){
              return res.status(400).json({
                  error: 'User not found'
              })
          }
          if(!name || name.length<6){
              return res.status(400).json({
                  error: 'Name is required, min 6 characters'
              });
          } else {
              user.name = name
          }
  
          if(password){
              if(password.length < 6){
                  return res.status(400).json({
                      error: 'Password should be min 6 characters long'
                  });
              } else {
                  user.password = password
              }
          }
  
          user.save((err, updatedUser)=> {
              if(err){
                  console.log('USER UPDATE ERROR, err')
                  return res.status(400).json({
                      error: 'User update failed'
                  });
              }
              updatedUser.hashed_password = undefined
              updatedUser.salt = undefined
              res.json(updatedUser)
          });
      });
  };*/

/*
exports.update = (req, res, next) => {
         let user = req.profile;
         user = _.extend(user, req.body); // extend - mutate the source object
         user.updated = Date.now();
         user.save(err => {
             if (err) {
                 return res.status(400).json({
                     error: "You are not authorized to perform this action"
                 });
             }
             user.hashed_password = undefined;
             user.salt = undefined;
             res.json({ user });
         });
     };*/

exports.update = (req, res, next) => {
    let form = new formidable.IncomingForm();
    // console.log("incoming form data: ", form);
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save user
        let user = req.profile;
        // console.log("user in update: ", user);
        user = _.extend(user, fields);

        user.updated = Date.now();
        // console.log("USER FORM DATA UPDATE: ", user);

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
             //console.log("user after update with formdata: ", user);
            res.json(user);
        });
    });
};

exports.userPhoto = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set(('Content-Type', req.profile.photo.contentType));
        return res.send(req.profile.photo.data);
    }
    next();
};

exports.deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ message: 'User deleted successfully' });
    });
};

exports.hasAuthorization = (req, res, next) => {
    let sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
    let adminUser = req.profile && req.auth && req.auth.role === 'admin';

    const authorized = sameUser || adminUser;

    // console.log("req.profile ", req.profile, " req.auth ", req.auth);
    // console.log("SAMEUSER", sameUser, "ADMINUSER", adminUser);

    if (!authorized) {
        return res.status(403).json({
            error: 'User is not authorized to perform this action'
        });
    }
    next();
};