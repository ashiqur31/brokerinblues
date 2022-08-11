const countriesModel = new (require('../../Models/v1/countries'))();

class CountriesController {
    
    // Retrieve all country
    async list(req, res) {
        try {
            let data = await countriesModel.list();
            res.handler.success(data, 'Country List retrieved successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

}   

module.exports = CountriesController;
