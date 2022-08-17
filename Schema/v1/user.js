const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name required']
    },
    email: {
        type: String,
        unique: true,
        trim:true,
        lowecase:true,
        required: [true, 'Email required']
    },
    password: {
        type:String,
        trim:true,
        required: [true, "Password is required"],
    },
    role: {
        type: Number,
        min:0, //0 for admin, 1 for user
        max:1,
        default: 1
    },
    tokens: [{
        token: {
            type:String
            
        }
    }]
},{
    timestamps: true
});

// Changing "_id" key to "id"
UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

UserSchema.set('toJSON',{
    virtuals: true
});

// Export the model
module.exports = mongoose.model('User', UserSchema);