const User = require("../models/User") 

module.exports = {
    // READ ALL ------------------------------
    findAll: (req, res) => {
        User.find()
            .then(allUsers => {
                res.json({allUsersArray: allUsers})
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({message: "error", error:err})
            });
    },
    // READ ONE --------------------------------
    findOne: (req, res) => {
        console.log("🎈 req.params.id =>", req.params.id);
        User.findById(req.params.id)
            .then(user => {
                console.log("retrieved one user: ", user);
                res.json(user)})
            .catch(err => {
                console.log("couldn't find obj ⚠⚠⚠");
                res.status(400).json({message: "error", error:err})
            })
    },
    // CREATE -----------------------------------
    createUser: (req, res) => {
        User.create(req.body)
            .then(newUser => res.json(newUser))
            .catch(err => res.status(400).json(err))
    },
    // UPDATE ------------------------------
    updateUser : (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
            .then(updatedUser => res.json(updatedUser))
            .catch(err => res.status(400).json(err))
    },
    // DELETE --------------------------------
    deleteUser : (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then(result => {
                res.json({result: result})
            })
            .catch(err => {
                console.log("🔴🔴🔴 ERROR", req.params.id);
                res.status(400).json(err)
            })
    }
}