
const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 10;

// DB schema

const Date = {
  timestamps: { currentTime: () => new Date() },
};



const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles:{
      type: String,
      default:'user',
      enum: ["user", "admin"]
    },
  },
  { timestamps: true }
);

usersSchema.pre('save', function (next) {
  var user = this
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
})

usersSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Modelis DB lentelės pavadinimas
const TransactionsModel = new mongoose.model('Users', usersSchema);


module.exports = TransactionsModel;
