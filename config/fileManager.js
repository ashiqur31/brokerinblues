const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Image size and type validation
const maxSize = 1 * 1024 * 1024; // for 1MB

const FILE_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}

class FileManager {

    constructor() {
        this.imageResizeResolution = parseInt(process.env.IMAGE_RESIZE_RESOLUTION)
    }

    //CREATE FILE NAME
    getFileName(file) {
        return file.originalname;
    }

    async getFileExtension(filename) {
        if (filename) {
            let fileSplit = filename.split(".");
            if (fileSplit.length === 2) {
                return fileSplit[1];
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

    resolvePath() {
        return path.join(__dirname, "./../assets/images/")
    }

    upload() {
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                const isValid = FILE_TYPE_MAP[file.mimetype];
                let uploadError = new Error('invalid image type');
                
                if(isValid){
                    uploadError = null
                }
                console.log("multerfile",file)
                
                //cb(uploadError, this.resolvePath(file.fieldname))
                cb(uploadError, this.resolvePath())
                
            }.bind(this),
            filename: function (req, file, cb) {
                let fileName = this.getFileName(file)
                if (!req.body[file.fieldname]) {
                    req.body[file.fieldname] = []
                    req.body[file.fieldname].push(fileName)
                } else
                    req.body[file.fieldname].push(fileName)
                cb(null, fileName)
            }.bind(this)
        })

        return multer({
            // TODO: Add file size limit
            storage,
            limits: { fileSize: maxSize }
        });
    }
    
}

module.exports = FileManager