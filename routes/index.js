var express = require('express');
var router = express.Router();
var database = require('../database/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/Login', function(req, res){
  res.render('Login.ejs');
});

router.get('/RegPage', function(req, res){
  res.render('RegPage.ejs');
});

router.get('/ActivePage', function(req, res){
    res.render('ActivePage.ejs');
});

router.get('/RegPageUI', function(req, res){
    res.render('RegPageUI.ejs');
});

router.get('/Ending', function(req, res){
  res.render('Ending.ejs');
});

/*렌더링부분에서 문제생겼음. 여기서 google인증에서 -> 넘어오는부분 successdirect에서 activepageUI로  넘겨주면서
인증이 되었을 경우에  req.user에서 정보를 가져온다. 그리고, 그것들을 activepageui.ejs에서사용할수 있게 렌더링해준다.*/

router.get('/ActivePageUI', function(req, res){
  //res.render('ActivePageUI.ejs');
  console.log('/ActivePageUI 패스 요청됨.');

  // 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임
  console.log('req.user 객체의 값');
  console.dir(req.user);

  // 인증 안된 경우
  if (!req.user) {
    console.log('사용자 인증 안된 상태임.');
    res.redirect('/');
  } else {
    console.log('사용자 인증된 상태임.');
    console.log('/ActivePageUI 패스 요청됨.');
    console.dir(req.user);

    if (Array.isArray(req.user)) {
      res.render('ActivePageUI.ejs', {user: req.user[0]._doc});
    } else {
      res.render('ActivePageUI.ejs', {user: req.user});
    }
  }

  console.log("============="+ req.user[0]);console.log("============="+ req.user[0]);console.log("============="+ req.user[0]);console.log("============="+ req.user[0]);
});

router.get('/ChatPage', function(req, res){
  // console.log('user : ' + req.user.id_email);

  var id_email = req.user.id_email;
  var today = new Date();
  // console.log(req.user.recent_login);

  database.UserModel.findOne({ 'id_email' :  req.user.id_email }, function(err, result) {

    // var recent_login = result.recent_login;
    var recent_login = req.user.recent_login;
    var tmpTime = recent_login;

    if(recent_login == "" ||  recent_login == null || recent_login == 'null'){
      console.log('스무고개 열어줄 수 있음');
      res.render('ChatPage.ejs', {'user' : result, 'code' : 1});    // code == 1    정상적으로 스무고개 열어줌
    }
    else{

      console.log('현재시간 / 최근 접속 시간 : ' + today + " //  " + recent_login);
      console.log('시간차 : ' + (today - tmpTime));

      if((today - tmpTime)/1000*60*60*24 >=1){      // 어제 스무고개를 이미 한 경우
        console.log('스무고개 열어줄 수 없음');
        res.render('ChatPage.ejs', {'user' : result, 'code' : 0});    // code == 0    스무고개 열어줄 수 없음
      }
      else{                                        // 스무고개를 한 지 1일 이상이 된 경우
        console.log('스무고개 열어줄 수 있음');
        res.render('ChatPage.ejs', {'user' : result, 'code' : 1});    // code == 1    정상적으로 스무고개 열어줌
      }

    }

  });

  // if(recent_login == "" || (today - recent_login)/1000*60*60*24 >=1 || recent_login == null || recent_login == 'null'){
  //   console.log('스무고개 열어줄 수 있음');
  //   res.render('ChatPage.ejs', {'user' : req.user, 'code' : 1});    // code == 1    정상적으로 스무고개 열어줌
  // }
  // else{
  //   console.log('스무고개 열어줄 수 없음');
  //   res.render('ChatPage.ejs', {'user' : req.user, 'code' : 0});    // code == 0    스무고개 열어줄 수 없음
  // }


  // database.UserModel.findOne({ 'id_email' :  id_email }, function(err, user) {
  //
  //   console.log('user : ' + user);
  //     var recent_login = new Date();
  //     recent_login = user.recent_login;
  //     var today = new Date();
  //     console.log('--------------today : ' +today);
  //     var tmp = recent_login.getDate();
  //     recent_login.setDate(tmp + 1);
  //
  //     console.log('--------------recent_login : '+recent_login);
  //
  //     if(recent_login == "" || recent_login < today || recent_login == null){
  //       res.render('ChatPage.ejs', {'user' : user, 'code' : 1});    // code == 1    정상적으로 스무고개 열어줌
  //     }
  //     else{
  //       res.render('ChatPage.ejs', {'user' : user, 'code' : 0});    // code == 0    스무고개 열어줄 수 없음
  //     }
  //   });




});

router.get('/ChatPage2', function(req, res){
    res.render('ChatPage2.ejs');
});

router.get('/devcamp', function(req, res){

    var id_email = req.user.id_email;

    database.UserModel.findOne({ 'id_email' :  id_email }, function(err, user) {

        // user.point의 1000의자리 수 확인해서 포인트 승급시켜줌
        switch (parseInt(user.point/1000)) {
            case 0:
            user.point = 1000;
                break;
            case 1:
            user.point = 2000;
                break;
            case 2:
            user.point = 3000;
                break;
            case 3:
            user.point = 4000;
                break;
            case 4:
            user.point = 5000;
                break;
            case 5:
            user.point = 6000;
                break;
            case 6:
            user.point = 7000;
                break;
            case 7:
            user.point = 8000;
                break;
            case 8:
            user.point = 9000;
                break;
            case 9:
            user.point = 10000;
                break;
            case 10:
            user.point = 11000;
                break;
            case 11:
            user.point = 12000;
                break;
            case 12:
            user.point = 13000;
                break;
            case 13:
            user.point = 14000;
                break;
            case 14:
            user.point = 15000;
                break;
        }
        user.recent_login = new Date();

        console.log(user.recent_login + "/" + user.point + "/" + new Date());
        user.save(function(err, result){
          console.log(result);
          // res.render('ActivePageUI.ejs', {user : user});
          res.redirect('/');
        });

        // res.render('ActivePageUI.ejs', {user : user});
        // res.redirect('/ActivePageUI');
    });
});

router.get('/chatting', function(req, res){
    res.render('chatting.ejs');
});

/*김수현 추가*/
router.get('/FirstStory',function(req,res){
    res.render('FirstStory.ejs');
});
/************/

//  포인트 리셋 부분
router.get('/reset', function(req, res){
    var id_email = req.user.id_email;
    database.UserModel.findOne({ 'id_email': id_email }, function (err, user) {
      user.point = 0;
      user.recent_login = '';
      user.save();
      res.render('ActivePageUI.ejs', {login_success:true, user: user});
      // res.redirect('/');
    });
});

module.exports = router;
