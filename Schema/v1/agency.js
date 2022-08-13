const mongoose = require('mongoose');

const AgencySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Agency Name required']
    },
    phone: {
        type: Number,
        required: [true, 'Agency Phone Number required']
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    media: {
        type:Array,
        default: []
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