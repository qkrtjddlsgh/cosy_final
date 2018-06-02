/**
 * 패스포트 설정 파일
 *
 * 구글 인증 방식에 사용되는 패스포트 설정
 *
 * @date 2016-11-10
 * @author Mike
 */

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var config = require('../config');

module.exports = function(app, passport) {
    return new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    }, function(accessToken, refreshToken, profile, done) {
        console.log('passport의 google 호출됨.');
        console.dir(profile);

        // load -> findOne Change
        var database = app.get('database');
        database.UserModel.findOne({ 'id_email': profile.emails[0].value }, function (err, user) {
            if (err) return done(err);

            console.log("좀 나와라 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"
                + profile.picture + profile._json.image.url);

            if (!user) {
              console.log('없어ㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓ');
                var user = new database.UserModel({
                    name: profile.displayName,
                    id_email: profile.emails[0].value,
                    provider: 'google',
                    google: profile._json,
                    birthday : profile.birthday,
                    //image : profile.picture[0].value.substring(0, profile.picture[0].value.indexOf('?')),
                    image : profile._json.image.url
                    //image : profile.photos[0].value
                    //user.image[0].value.substring(0, user.image[0].value.indexOf('?'))
                });

                user.save(function (err) {
                    return done(err, user);
                });

            } else {                  // 구글 로그인 실패한 경우
                console.log('있어ㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓ');
                return done(err, user);
            }
        });

    });
};
