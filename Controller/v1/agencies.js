const agencyModel = new (require('../../Model/v1/agencies'))();

class AgencyController {
    // get agency list
    async list(req, res) {
        try {
            let currentpage = parseInt(req.query.currentpage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 9;
            let offset = (currentpage - 1) * recordsPerPage;
            let data = await agencyModel.list(offset, recordsPerPage);
            let count = await agencyModel.count();
            res.status(200).send({
                message: "Agency list retrieved successfully",
                count: count,
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

     // get deleted agency list
     async deletedlist(req, res) {
        try {
            let currentpage = parseInt(req.query.currentpage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 9;
            let offset = (currentpage - 1) * recordsPerPage;
            let data = await agencyModel.deletedlist(offset, recordsPerPage);
            let count = await agencyModel.deletedcount();
            res.status(200).send({
                message: "Deleted agency list retrieved successfully",
                count: count,
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    // add agency 
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

            let data = await agencyModel.add(req.body);
            res.status(201).send({
                message:"Agency data created successfully",
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    // retrieve single agency with id
    async findOne(req, res) {
        try {
            let data = await agencyModel.findone(req.params.id);
            res.status(200).send({
                message: "Agency details retrieved successfully",
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
            let data = await agencyModel.update(req.body.id, req.body)
            res.status(200).send({
                message: "Agency details updated successfully",
                data: data
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    async delete(req, res) {
        try {
            let data = await agencyModel.delete(req.params.id);
            res.status(200).send({
                message: "Agency details deleted successfully",
            });
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}

module.exports = AgencyController;