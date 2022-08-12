const mongoose = require('mongoose');

const PropertySchema = mongoose.Schema({
    propertyType: {
        type: String,
        required: [true, 'Property type required']
    },
    propertyStatus: {
        type: String,
        required: [true, 'Property Status required']
    },
    propertyPrice: {
        type: Number,
        required: [true, 'Property Price required']
    },
    maxRooms: {
        type: Number,
        required: [true, 'Max Rooms required']
    },
    beds: {
        type: Number
    },
    baths: {
        type: Number
    },
    area: {
        type: Number
    },
    price: {
        time: Number
    },
    agencies: {
        type: String
    },
    description: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String,
    },
    city: {
        type: String
    },
    zipCode: {
        type: Number
    },
    landmark: {
        type: String
    },
    media: {
        type:Array,
        default: []
    },
    videoLink: {
        type: String
    },
    emergencyExit: {
        type: Boolean,
        default: false
    },
    cctv: {
        type: Boolean,
        default: false
    },
    freeWifi: {
        type: Boolean,
        default: false
    },
    freeParking: {
        type: Boolean,
        default: false
    },
    ac: {
        type: Boolean,
        default: false
    },
    securityGuard: {
        type: Boolean,
        default: false
    },
    terrace: {
        type: Boolean,
        default: false
    },
    laundryService: {
        type: Boolean,
        default: false
    },
    elevatorLift: {
        type: Boolean,
        default: false
    },
    balcony: {
        type: Boolean,
        default: false
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
PropertySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

PropertySchema.set('toJSON',{
    virtuals: true
});

// Export the model
module.exports = mongoose.model('Property', PropertySchema);