const agencySchema = require('../../Schema/v1/agency');

class AgencyModel {
    // get agency list
    async list(offset, recordsperpage) {
        return await agencySchema.find({is_deleted:0}).skip(offset).limit(recordsperpage);
    }

    // get agency count
    async count() {
        return await agencySchema.count({is_deleted:0});
    }

     // get deleted agency list
     async deletedlist(offset, recordsperpage) {
        return await agencySchema.find({is_deleted:1}).skip(offset).limit(recordsperpage);
    }

    // get deleted agency count
    async deletedcount() {
        return await agencySchema.count({is_deleted:1});
    }

    // add agency data
    async add(data) {
        return await agencySchema.create(data);
    }

    // retrieve single agency by id
    async findone(request_id) {
        return await agencySchema.findById(request_id);
    }

    // edit agency details
    async update(request_id, data) {
        return await agencySchema.findByIdAndUpdate(request_id, data, { new: true })
    }

    // delete agency
    async delete(request_id) {
        return await agencySchema.findByIdAndUpdate(request_id,
        {$set: { is_deleted : 1}});
    }
}

module.exports = AgencyModel