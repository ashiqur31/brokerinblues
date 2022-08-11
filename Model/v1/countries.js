const countriesSchema = require('../../Schema/v1/country');

class CountryModel {

    // Retrieve all country
    async list() {
            return await countriesSchema.find();
    }

}

module.exports = CountryModel;


