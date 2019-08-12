
//========================== Load Modules Start ===========================
const userMapper = require("./userMapper")
const userMsg = require("./userConstants").messages
const mongoose = require('mongoose')

//========================== Load Modules End =============================



//========================== Export Module Start ===========================

function isValidEmail(data) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(data)
}

function isValidPassword(data) {
    let regex = /^(?=.*[A-z])(?=.*[0-9])(?=.*[@#$_-])\S{8,20}$/;
    return regex.test(data)
}

/**for check register details */
var validateRegister = function (req, res, next) {
    var { emailId, contactNumber, firstName, lastName, password } = req.body
    if (!firstName) {
        res.send(userMapper.bedRequestRes(userMsg.firstName_Cant_Empty));
    } else if (!isValidEmail(emailId)) {
        res.send(userMapper.bedRequestRes(userMsg.email_Cant_Empty))
    } else if (!isValidPassword(password)) {
        res.send(userMapper.bedRequestRes(userMsg.pwd_Cant_Empty))
    } else if (!contactNumber) {
        res.send(userMapper.bedRequestRes(userMsg.contactNumber_Cant_Empty))
    } else {
        next();
    }
};

/**for check valid login details */
var validateLogin = function (req, res, next) {
    var { emailId, password } = req.body
    if (!isValidEmail(emailId)) {
        res.send(userMapper.bedRequestRes(userMsg.email_Cant_Empty))
    } else if (!isValidPassword(password)) {
        res.send(userMapper.bedRequestRes(userMsg.pwd_Cant_Empty))
    } else {
        next();
    }
}


//========================== Export Module Start ==============================

module.exports = {
    validateRegister,/**for check register details*/

    validateLogin,/**for check valid login details */


};

//========================== Export Module End ===============================

