const interestedSchema = require('../../Schema/v1/interested');

class InterestedModel {
    // get interested list
    async list(offset, recordsperpage) {
        return await interestedSchema.find({is_deleted:0}).skip(offset).limit(recordsperpage);
    }

    // get interested count
    async count() {
        return await interestedSchema.count({is_deleted:0});
    }

     // get deleted interested list
     async deletedlist(offset, recordsperpage) {
        return await interestedSchema.find({is_deleted:1}).skip(offset).limit(recordsperpage);
    }

    // get deleted interested count
    async deletedcount() {
        return await interestedSchema.count({is_deleted:1});
    }

    // add interested data
    async add(data) {
        return await interestedSchema.create(data);
    }

    // retrieve single interested by id
    async findone(request_id) {
        return await interestedSchema.findById(request_id);
    }

    // edit interested details
    async update(request_id, data) {
        return await interestedSchema.findByIdAndUpdate(request_id, data, { new: true })
    }

    // delete interested
    async delete(request_id) {
        return await interestedSchema.findByIdAndUpdate(request_id,
        {$set: { is_deleted : 1}});
    }
}

module.exports = InterestedModel