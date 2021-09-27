const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name:{
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetLink: {
        type: String,
        size: 1500,
        default: ''
    }   
}, { timestamps: true });

//Generate and hash password token
// userSchema.methods.getResetPasswordToken = () => {
//     const resetToken = require('crypto').randomBytes(20).toString('hex');
//     // Hash token and set to resetPasswordToken filed
//     const resetPasswordToken = require('crypto').createHash('sha256').update(resetToken).digest('hex');

//     // set Expire
//     this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//     return resetToken;
// }

module.exports = mongoose.model('User', userSchema);