const propertySchema = require('../../Schema/v1/property');

class PropertyModel {
    // get property list
    async list(offset, recordsperpage) {
        return await propertySchema.find({is_deleted:0}).skip(offset).limit(recordsperpage);
    }

     // get property for sale list
     async forsalelist(offset, recordsperpage) {
        return await propertySchema.find({$and:[{is_deleted:0},{propertyStatus:'For Sale'}]}).skip(offset).limit(recordsperpage);
    }

    // get property for rent list
    async forrentlist(offset, recordsperpage) {
        return await propertySchema.find({$and:[{is_deleted:0},{propertyStatus:'For Rent'}]}).skip(offset).limit(recordsperpage);
    }

    // get property for rent list
    async featuredlist(offset, recordsperpage) {
        return await propertySchema.find({$and:[{is_deleted:0},{featured:'Yes'}]}).skip(offset).limit(recordsperpage);
    }

    // get property count
    async count() {
        return await propertySchema.count({is_deleted:0});
    }

    async forsalecount() {
        return await propertySchema.count({$and: [{is_deleted:0},{propertyStatus:'For Sale'}]});
    }

    async forrentcount() {
        return await propertySchema.count({$and: [{is_deleted:0},{propertyStatus:'For Rent'}]});
    }

    async featuredcount() {
        return await propertySchema.count({$and: [{is_deleted:0},{featured:'Yes'}]});
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

    // filter data
    async filterData(data) {
        return await propertySchema.find({$and: [{
            propertyStatus:data.propertyStatus}, 
            {propertyType:data.propertyType}, 
            {maxRooms:{$lte: data.maxRooms}},
            {beds:{$lte: data.beds}},
            {baths:{$lte: data.baths}},
            {price:{$gte:data.minPrice, $lte:data.maxPrice}},
            // {area:{$gte:data.minArea, $lte:data.maxArea}}
        ]})
    }
}

module.exports = PropertyModel