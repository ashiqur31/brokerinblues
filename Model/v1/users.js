const userSchema = require('../../Schema/v1/user');
const jwt = require('jsonwebtoken');

class UserModel {

    // Retrieve all users with pagination
    async userlist(offset, recordsPerPage) {
            return await userSchema.find({'role': {$eq : 1}}).select('_id name email').skip(offset).limit(recordsPerPage);
    }

    // count total records
    async count() {
        return  await userSchema.count({'role': {$eq : 1}})
     }

    // Check user already exist
    async checkUser(req_email) {
        return await userSchema.findOne({email : req_email})
    }

    // Create new user
    async add(data) {
        return await userSchema.create(data);
    }

    // Retrieve a single user with id
    async getUser(request_id) {
            return await userSchema.findById(request_id)
    }

    // Update a user with id
    async update(request_id, data) {
        return await userSchema.findByIdAndUpdate(request_id, data,
            { 
                new: true 
            })
    }

    // Delete a user with id
    async delete(request_id) {
        return await userSchema.findByIdAndRemove(request_id)
    }

    // generate jwt token
    async generateAuthToken(user) {
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
        return token
    }

}

module.exports = UserModel;


