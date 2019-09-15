require('./server');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userVerifySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
});

//Verify username and password for signin
userVerifySchema.statics.findByCredentials = async (username, password) => {
    const user = await UserVerify.findOne({username: username})
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//Hash the plain text password before saving
//pre - before the user is being saved
userVerifySchema.pre('save', async function(next) {
    const user = this;
    console.log(user)
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});

const UserVerify = mongoose.model('UserVerify', userVerifySchema)

module.exports = UserVerify