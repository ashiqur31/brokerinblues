const usersModel = new (require('../../Model/v1/users'))();
// const bcrypt = require('bcryptjs');
// const nodeMailer = require('nodemailer');
const { sendPassword } = require('../../email/account');

var CryptoJS = require("crypto-js");

class UserController {
     // Create new user
     async add(req, res) {
        try {
            if (!req.body) {
                return res.status(400).send({
                    message: "Please fill all required field"
                });
            } 

            const user = await usersModel.checkUser(req.body.email)
              
            // Encrypt password
            // req.body.password = await bcrypt.hash(req.body.password, 8)
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SECRET).toString();
            
            if (user) {
                return res.status(404)
                .send({
                    message: "User already exists with email " + req.body.email
                });
            }

            let data = await usersModel.add(req.body);
            res.status(201).send({ 
                message:'User Registered successfully',
                data: {id: data._id, name: data.name, email: data.email}
            });
        } catch (error) {
            console.log("error----======>>>", error, req.body);
            res.status(400).send(error);
        }
    }


    // Login Customer
    async login(req, res) {
        try {
            const user = await usersModel.checkUser(req.body.email);
            if (!user) {
                return res.status(404).send({
                    message: "Email Id not found"
                });
            }

            // Decrypt password
            var decrypted = CryptoJS.AES.decrypt(user.password, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8)
            
            //Check password match
            if (req.body.password !== decrypted) {
                return res.status(200).send({
                    message: "Incorrect Password",
                    success: false
                });
            }

            //Generate Token
            const token = await usersModel.generateAuthToken(user);
            user.tokens = token;
            await user.save();

            if(user.role == 0){
                res.status(201).send({ 
                    message:'Admin is successfully logged in!!',
                    success:true,
                    data: {id: user._id, name: user.name, email: user.email, role: user.role, token: user.tokens}
                });
            }
            else if(user.role == 1){
                res.status(201).send({ 
                    message:'User is successfully logged in!!',
                    success:true,
                    data: {id: user._id, name: user.name, email: user.email, role: user.role, token: user.tokens}
                });
            }
        } catch(error) {
            console.log(error);
            res.status(401).send(error);
        }
    }


    // logout
    async logout(req, res) {
        try {
            await usersModel.logout(req.body.id);
            res.status(200).send({
                message:"Logged out successfully",
                success: true
            })
        } catch(error) {
            console.log(error);
            res.status(401).send(error);
        }
    }

    // forgot password
    async forgotPassword(req, res) {
        try {
            let user = await usersModel.checkUser(req.body.email);
            var password = CryptoJS.AES.decrypt(user.password, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8)
            sendPassword(user.email, password);
            res.status(200).send({
                message: "User details send succesfully",
                success: true
            })
        } catch(error) {
            console.log(error);
            res.status(401).send(error);
        }
    }
}

module.exports = UserController;