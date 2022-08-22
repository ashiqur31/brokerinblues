const savedPropertyModel = new (require('../../Model/v1/savedproperties'))();
const properties = new (require('../../Model/v1/properties'))();

class SavedPropertiesController {
    // view saved property
    async list(req, res) {
        try {
            let savedProperty = [];
            const id = new Object(req.body.userId)
            let data = await savedPropertyModel.list(id);
            for(var i = 0; i < data.length; i++) {
                let savedProperties = await properties.findone(data[i].propertyId);
                savedProperty.push(savedProperties);
                let sid = {sid: data[i]._id}
                savedProperty.push(sid);
            }
            res.status(200).send({
                message: "Saved Property List Retreived successfully",
                success: true,
                data:savedProperty
            })
        } catch(error) {
            console.log(error);
            res.status(401).send(error);
        }
    }

    // add saved properties
    async add(req, res) {
        try {
            if (!req.body) {
                return res.status(400).send({
                    message: "Please fill all required field"
                });
            } 

            await savedPropertyModel.add(req.body);
            res.status(201).send({
                message:"SavedProperty added successfully",
                success:true,
            })
        } catch(error) {
            console.log(error);
            res.status(401).send(error);
        }
    }

    // delete saved property
    async delete(req, res) {
        try {
            let data = await savedPropertyModel.delete(req.sid);
            res.status(200).send({
                message: "Saved property deleted succesfully",
                success: true,
                data: data
            })
        } catch(error) {
            console.log(error);
            res.status(401).send(error);
        }
    }
}

module.exports = SavedPropertiesController;