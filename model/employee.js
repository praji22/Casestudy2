var Mongoose = require('mongoose');
const employeeSchema = Mongoose.Schema(
    {
        name:String,
        location:String,
        position:String,
        salary:Number
    }
);
var employeeModel = Mongoose.model("employees",employeeSchema);
module.exports = {employeeModel};