const propertyModel = new (require('../../Model/v1/properties'))();

class PropertyController {
    // get property list
    async list(req, res) {
        try {
            let currentpage = parseInt(req.query.currentpage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 9;
            let offset = (currentpage - 1) * recordsPerPage;
            console.log(currentpage);
            let data = await propertyModel.list(offset, recordsPerPage);
            let count = await propertyModel.count();
            res.status(200).send({
                message: "Property list retrieved successfully",
                count: count,
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

     // get for sale property list
     async forsalelist(req, res) {
        try {
            let currentpage = parseInt(req.query.currentpage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 9;
            let offset = (currentpage - 1) * recordsPerPage;
            console.log(offset);
            let data = await propertyModel.forsalelist(offset, recordsPerPage);
            let count = await propertyModel.forsalecount();
            res.status(200).send({
                message: "Property for sale list retrieved successfully",
                count: count,
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

     // get for rent property list
     async forrentlist(req, res) {
        try {
            let currentpage = parseInt(req.query.currentpage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 9;
            let offset = (currentpage - 1) * recordsPerPage;
            let data = await propertyModel.forrentlist(offset, recordsPerPage);
            let count = await propertyModel.forrentcount();
            res.status(200).send({
                message: "Property for rent list retrieved successfully",
                count: count,
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    // get featured property list
    async featuredlist(req, res) {
        try {
            let currentpage = parseInt(req.query.currentpage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 9;
            let offset = (currentpage - 1) * recordsPerPage;
            let data = await propertyModel.featuredlist(offset, recordsPerPage);
            let count = await propertyModel.featuredcount();
            res.status(200).send({
                message: "Featured Property list retrieved successfully",
                count: count,
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }


     // get latest property list
     async latestlist(req, res) {
        try {
            let currentpage = parseInt(req.query.currentpage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 9;
            let offset = (currentpage - 1) * recordsPerPage;
            console.log(offset);
            let data = await propertyModel.latestlist(offset, recordsPerPage);
            let count = await propertyModel.latestlistcount();
            res.status(200).send({
                message: "Latest Property list retrieved successfully",
                count: count,
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

     // get property list
     async deletedlist(req, res) {
        try {
            let currentpage = parseInt(req.query.currentpage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 9;
            let offset = (currentpage - 1) * recordsPerPage;
            let data = await propertyModel.deletedlist(offset, recordsPerPage);
            let count = await propertyModel.deletedcount();
            res.status(200).send({
                message: "Deleted property list retrieved successfully",
                count: count,
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    // add property 
    async add(req, res) {
        try {
            if(!req.body) {
                return res.status(400).send({
                    message: "Please fill in required fields"
                });
            }
            const file = req.files;
            // check if image selected
            if(file) {
                req.body.media = [];
                // show image path
                for(var i =0; i < file.length;i++) {
                    const fileName = req.files[i].filename;
                    const basepath = `/assets/images/`;
                    req.body.media.push(`${basepath}${fileName}`) ;
                }
            }

            let data = await propertyModel.add(req.body);
            res.status(201).send({
                message:"Property data created successfully",
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    // retrieve single property with id
    async findOne(req, res) {
        try {
            let data = await propertyModel.findone(req.params.id);
            res.status(200).send({
                message: "Property details retrieved successfully",
                data: data
            });
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    async update(req, res) {
        try {
            const file = req.files;
            // check if image selected
            if(file) {
                req.body.media = [];
                // show image path
                for(var i =0; i < file.length;i++) {
                    const fileName = req.files[i].filename;
                    const basepath = `/assets/images/`;
                    req.body.media.push(`${basepath}${fileName}`) ;
                }
            }
            let data = await propertyModel.update(req.body.id, req.body)
            res.status(200).send({
                message: "Property details updated successfully",
                data: data
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    async delete(req, res) {
        try {
            let data = await propertyModel.delete(req.params.id);
            res.status(200).send({
                message: "Property details deleted successfully",
            });
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    async filterProperties(req, res) {
        try{
            let currentpage = parseInt(req.query.currentpage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 9;
            let offset = (currentpage - 1) * recordsPerPage;
            let data = await propertyModel.filterData(req.body, offset, recordsPerPage);
            let count = await propertyModel.filtereDataCount(req.body);
            res.status(200).send({
                message: "Filtered data",
                count:count,
                data:data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}

module.exports = PropertyController;