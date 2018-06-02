var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberData = new Schema({
    id_email: String,
    password: String,
    name: String,
    birthday: String,
    point: Number,
    recent_login: String
});

var member = mongoose.model('member', memberData, 'members');

module.exports = member;
