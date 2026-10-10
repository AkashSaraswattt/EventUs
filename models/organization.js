const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/beta_06`)
const orgSchema = new mongoose.Schema({
    name : String,
    email : String,
    location : String,
    password : String
});

module.exports = mongoose.model("org", orgSchema);
