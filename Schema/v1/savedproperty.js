const mongoose = require('mongoose');

const SavedPropertySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User Id required'],
        ref: "User"
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'propertyId required'],
        ref: "Property"
    }
},{
    timestamps: true
});

// Changing "_id" key to "id"
SavedPropertySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

SavedPropertySchema.set('toJSON',{
    virtuals: true
});

// Export the model
module.exports = mongoose.model('SavedProperty', SavedPropertySchema);