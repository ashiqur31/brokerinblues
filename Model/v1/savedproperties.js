const savedPropertySchema = require('../../Schema/v1/savedproperty');

class SavedPropertyModel {

    // Retrieve all users with pagination
    async list(userId) {
        return await savedPropertySchema.find({userId: userId});
    }

    // count total records
    async count() {
        return  await savedPropertySchema.count()
    }

    // Create new user
    async add(data) {
        return await savedPropertySchema.create(data);
    }

    // Delete a user with id
    async delete(request_id) {
        return await savedPropertySchema.findByIdAndRemove(request_id)
    }

}

module.exports = SavedPropertyModel;


