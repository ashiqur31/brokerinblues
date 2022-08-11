const propertySchema = require('../../Schema/v1/property');

class PropertyModel {
    // get property list
    async list(offset, recordsperpage) {
        return await propertySchema.find({is_deleted:0}).skip(offset).limit(recordsperpage);
    }

    // get property count
    async count() {
        return await propertySchema.count({is_deleted:0});
    }

     // get deleted property list
     async deletedlist(offset, recordsperpage) {
        return await propertySchema.find({is_deleted:1}).skip(offset).limit(recordsperpage);
    }

    // get deleted property count
    async deletedcount() {
        return await propertySchema.count({is_deleted:1});
    }

    // add property data
    async add(data) {
        return await propertySchema.create(data);
    }

    // retrieve single property by id
    async findone(request_id) {
        return await propertySchema.findById(request_id);
    }

    // edit property details
    async update(request_id, data) {
        return await propertySchema.findByIdAndUpdate(request_id, data, { new: true })
    }

    // delete property
    async delete(request_id) {
        return await propertySchema.findByIdAndUpdate(request_id,
        {$set: { is_deleted : 1}});
    }
}

module.exports = PropertyModel