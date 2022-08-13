require('dotenv').config();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name, phone, message) => {
    var htmlBody = `<!DOCTYPE html><html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Broker in Blues | Email template </title><link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=swap"rel="stylesheet"><style type="text/css">body {font-family: Roboto, sans-serif;position: relative;
        background: white;font-size: 14px;color: black;}ul {margin: 0;padding: 0;}li {display: inline-block;text-decoration: unset;}a {text-decoration: none;color: #f35d43;}.main-logo {margin: -6px 0 -15px -18px;}.btn {background-color: #292929;border-color: transparent;
        -webkit-print-color-adjust: exact;letter-spacing: 0.4px;border-radius: 4px;font-weight: 500;font-size: 14px;line-height: 19px;color: #FFFFFF;cursor: pointer;padding: 7px 13px;-webkit-box-shadow: 1px 11px 20px 0px rgba(233, 179, 14, 0.12);
        box-shadow: 1px 11px 20px 0px rgba(233, 179, 14, 0.12);text-transform: capitalize;}.btn:focus {outline: none;}.text-center {text-align: center}.template-width {width: 724px;}.success-img img {width: 40%;margin: 10px 0 10px;}.booking-table {
        width: 100%;border: 1px solid #dddddd;margin-top: 40px;}.booking-table .booking-td {width: 100%;display: flex;justify-content: space-between;}@media (max-width: 767px) {.template-width {width: 550px;}.success-img img {width: 50%;}.booking-table .booking-td {
        display: block;}.booking-table .booking-td table {width: 100% !important;}.booking-table .booking-td table tr td:first-child {width: 50%;}}@media (max-width: 576px) {.template-width {width: 420px;}.success-img img {width: 65%;}.header td {display: block;text-align: center;}
        .header .menu ul li a {margin-right: 10px !important;}.success-img h3 {width: 90% !important;font-size: 14px;}.main-logo {margin-bottom: -12px;}.booking-td table {padding-left: 5px !important;}.booking-td table tbody {font-size: 14px !important;}}
        @media (max-width: 480px) {.template-width {width: 300px;}}</style></head><body style="margin: 80px auto;"><table class="template-width" align="center" border="0" cellpadding="0" cellspacing="0"style="background-color: #fff;  box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);"><tbody>
        <tr><td style="padding: 10px 20px;"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr class="header"><td align="left" valign="top"><a href="../index.html" style="display: block;"><img src="../assets/images/email-template/logo.png" style="width: 120px;" class="main-logo"></a></td>
        </tr></tbody></table></td></tr><tr><td style="padding: 0 20px 50px;"><table class="booking-table"><tbody><tr><td><h5style="margin: 0 0 6px 0; font-size: 18px; border-bottom: 1px solid #dddddd; padding: 10px;">Submitted Details</h5></td></tr><tr><td class="booking-td" style="width: 100%;">
        <table style="padding-left: 10px; color: #616161; width: 50%; padding-bottom: 10px;padding-top: 5px;"><tbody style="font-size: 16px; line-height: 1.5;"><tr><td>Name:</td><td style="font-weight: 500; color: #3c3c3c;">${name}</td></tr><tr><td>Phone:</td><td style="font-weight: 500; color: #3c3c3c;">${phone}</td></tr>
        <tr><td>Email:</td><td style="font-weight: 500; color: #3c3c3c;">${email}</td></tr><tr><td>Message:</td><td style="font-weight: 500; color: #3c3c3c;">${message}</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>`
    

    const msg = {
        to: email, // Change to your recipient
        from: 'ashiqur31@gmail.com', // Change to your verified sender
        subject: 'Brokerinblue: Submitted details',
        // text: 'and easy to do anywhere, even with Node.js',
        html: htmlBody,
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}

module.exports = {sendWelcomeEmail}