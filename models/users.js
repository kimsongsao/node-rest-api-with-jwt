const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require("validator");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please fill your name"],
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, "Please fill your email"],
        validate: [validator.isEmail, " Please provide a valid email"],
    },
    address: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please fill your password"],
        minLength: 6,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please fill your password confirm"],
        validate: {
            validator: function (el) {
                // "this" works only on create and save
                return el === this.password;
            },
            message: "Your password and confirmation password are not the same",
        },
    },
    role: {
        type: String,
        enum: ["admin", "subcriber"],
        default: "subcriber",
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

// hash user password before saving into database
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hashSync(this.password, saltRounds);
    next();
});
// This is Instance Method that is gonna be available on all documents in a certain collection
userSchema.methods.correctPassword = async function (
    typedPassword,
    originalPassword,
) {
    return await bcrypt.compare(typedPassword, originalPassword);
};
module.exports = mongoose.model('User', userSchema);