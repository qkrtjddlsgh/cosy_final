var express = require('express');
var router = express.Router();
var member = require('../../models/Member');
var today = require('../../util_modules/GetToday');

// 2** 성공
// 4** 클라이언트 오류
// 5** 서버 오류

router.post('/', function(req, res){
    var id_email = req.body.id_email;
    var password = req.body.password;

    var item = {};
    var result_code;

    member.find({id_email: id_email}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.status_code = "401"; // redirect to MainPage
            res_data.message = "ID is not exist";

            result_code = 0;
            item.code = result_code;

            res.end(JSON.stringify(item));
        }
        else{
            if(password == doc[0].password){
                var res_data = new Object();
                res_data.status_code = "201"; // redirect to ActivePage
                res_data.message = "Login success";

                // point에 따른 view redirect 처리 필요

                var date = today(new Date());
                var recent_login = doc[0].recent_login;

                if(recent_login < date){
                    // point 업데이트
                    var query = {$set: {recent_login: date, point: doc[0].point+1}};

                    member.update({id_email: id_email}, query, function(err, result){
                        if(err){
                            console.error(err.message);
                        }
                        else{
                            result_code = 1;
                            item.code = result_code;
                            item.point = doc[0].point+1;
                            item.name = doc[0].name;

                            res.end(JSON.stringify(item));
                        }
                    });
                }
                else{
                    result_code = 1;
                    item.code = result_code;
                    item.point = doc[0].point+1;
                    item.name = doc[0].name;

                    res.end(JSON.stringify(item));
                }
            }
            else{
                var res_data = new Object();
                res_data.status_code = "402"; // redirect to MainPage
                res_data.message = "Password is incorrect";

                result_code = 0;
                item.code = result_code;

                res.end(JSON.stringify(item));
            }
        }
    });
});

module.exports = router;