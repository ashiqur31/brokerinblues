const mongoose = require('mongoose');

const AgencySchema = mongoose.Schema({
    agencyName: {
        type: String,
        required: [true, 'Agency Name required']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Agency Phone Number required']
    },
    email: {
        type: String,
        required: [true, 'Email required']
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
AgencySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

AgencySchema.set('toJSON',{
    virtuals: true
});

// Export the model
module.exports = mongoose.model('Agency', AgencySchema);