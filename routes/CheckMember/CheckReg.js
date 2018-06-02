var express = require('express');
var router = express.Router();
var member = require('../../models/Member');

// 2** 성공
// 4** 클라이언트 오류
// 5** 서버 오류

router.post('/', function(req, res){
    var id_email = req.body.id_email;
    var password = req.body.password;
    var name = req.body.name;
    var birthday = req.body.birthday; // yyyymmdd

    var item = {};
    var result_code;

    member.find({id_email: id_email}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            // 회원정보 저장
            var new_member = new member();
            new_member.id_email = id_email;
            new_member.password = password;
            new_member.name = name;
            new_member.birthday = birthday;
            new_member.point = 0;
            new_member.recent_login = "00000000"; // yyyymmdd
            new_member.save();

            var res_data = new Object();
            res_data.status_code = "202";
            res_data.message = "Register success";

            result_code = 1;
            item.code = result_code;

            res.end(JSON.stringify(item));
        }
        else{
            var res_data = new Object();
            res_data.status_code = "403";
            res_data.message = "Register failure";

            result_code = 0;
            item.code = result_code;

            res.end(JSON.stringify(item));
        }
    });
});

module.exports = router;