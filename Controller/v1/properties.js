const propertyModel = new (require('../../Model/v1/properties'))();

class PropertyController {
    // get property list
    async list(req, res) {
        try {
            let currentpage = parseInt(req.query.currentPage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 9;
            let offset = (currentpage - 1) * recordsPerPage;
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

     // get property list
     async deletedlist(req, res) {
        try {
            let currentpage = parseInt(req.query.currentPage) || 1;
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
            const file = req.file;
            // check if image selected
            if(file) {
                // show image path
                const fileName = req.file.filename;
                const basepath = `/assets/images/`;
                req.body.media = `${basepath}${fileName}`;
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
            const file = req.file;

           // check if image selected and show image path
            if(file){
                const fileName = req.file.filename;
                const basepath = `/assets/images/`;
                req.body.media = `${basepath}${fileName}`
            } 

            let data = await propertyModel.update(req.params.id, req.body)
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
}

module.exports = PropertyController;