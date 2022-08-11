const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    country_code: {
        type:String,
        required: [true, 'Country Code is required']
    },
    country_name: {
        type: String,
        required: [true, 'Country Name is required']
    }
},{
    timestamps:true
});

// Changing "_id" key to "id"
CountrySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

CountrySchema.set('toJSON',{
    virtuals: true
});

// Export the model
module.exports = mongoose.model('Country', CountrySchema);