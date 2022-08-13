const mongoose = require('mongoose');

const InterestedSchema = mongoose.Schema({
    name: {
        type: String,
        // required: [true, 'User Name required']
    },
    phone: {
        type: Number,
        // required: [true, 'User Phone Number required']
    },
    email: {
        type: String,
        // required: [true, 'Email required']
    },
    message: {
        type:String
    },
    is_deleted: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    }
},{
    timestamps: true
});

// Changing "_id" key to "id"
InterestedSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

InterestedSchema.set('toJSON',{
    virtuals: true
});

// Export the model
module.exports = mongoose.model('Interested', InterestedSchema);