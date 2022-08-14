const interestedModel = new (require('../../Model/v1/interested'))();
const {sendWelcomeEmail} = require('../../email/account');

class InterestedController {
    // get interested list
    async list(req, res) {
        try {
            let currentpage = parseInt(req.query.currentPage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 100000000000;
            let offset = (currentpage - 1) * recordsPerPage;
            let data = await interestedModel.list(offset, recordsPerPage);
            let count = await interestedModel.count();
            res.status(200).send({
                message: "Interested list retrieved successfully",
                count: count,
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

     // get deleted Interested list
     async deletedlist(req, res) {
        try {
            let currentpage = parseInt(req.query.currentPage) || 1;
            let recordsPerPage = parseInt(req.query.recordsPerPage) || 9;
            let offset = (currentpage - 1) * recordsPerPage;
            let data = await interestedModel.deletedlist(offset, recordsPerPage);
            let count = await interestedModel.deletedcount();
            res.status(200).send({
                message: "Deleted Interested list retrieved successfully",
                count: count,
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    // add Interested 
    async add(req, res) {
        try {
            if(!req.body) {
                return res.status(400).send({
                    message: "Please fill in required fields"
                });
            }

            let data = await interestedModel.add(req.body);
            sendWelcomeEmail(data.email, data.name, data.phone, data.message);
            res.status(201).send({
                message:"Interested data created successfully",
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    // retrieve single Interested with id
    async findOne(req, res) {
        try {
            let data = await interestedModel.findone(req.params.id);
            res.status(200).send({
                message: "Interested details retrieved successfully",
                data: data
            });
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    async update(req, res) {
        try {
            let data = await interestedModel.update(req.body.id, req.body)
            res.status(200).send({
                message: "Interested details updated successfully",
                data: data
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    async delete(req, res) {
        try {
            let data = await interestedModel.delete(req.params.id);
            res.status(200).send({
                message: "Interested details deleted successfully",
            });
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}

module.exports = InterestedController;