# YAPP_Cosy_Project

# passport-local 수정 부분 (writer : 김규빈)


---
1. npm install 하시고

2. config/config.js 파일에 있는 환경설정 맞춰주기 위해 각자 로컬 몽고디비에 

	1) use cosy_db 로 cosy_db 만들어주고
	2) db.createCollection('users') 로 컬렉션 생성해줍니다


	(제가 만들어 놓은 db 스키마는 database/user_schema.js 에 있습니당)

3. 접속 포트는 44444 입니다
	(127.0.0.1:44444 로 접속)

* 패스포트 라우팅 함수들은 routes/user_passport.js 에 있습니다

---

# google-login-Auth수정 부분 (writer : 김관현)


---
## 1. 파일 추가 부분 

파일 추가 부분 
+ google.js

## 2. 코드 수정 부분 

### 그외 다수 코드수정 
1. config.js 부분에 구글 패스포트 관련(개인 Auth) 코드 추가
2. passport.js google.js받아오는부분 추가
3. user_schema.js 스키마 부분에서 hashed_password,salt 스키마변수에서 몇번 에러나서 고생함. type을 string값만 주어서 가져오니까 잘 들어갔습니다.

### rotuer부분에서는 
4. /auth/google , /auth/google/callback 경로 추가
5. /profile 라우터는 있어도되고 없어도되는데, 일단 두었음, 나중에 프로필정보만 보고싶을경우 쓸수있게하기위해서
6. 그리고 index.js에서 ActivePageUI부분 렌더링부분이 포함되어있는데, 이것은 ActivePageUI에서 사용자 정보를 보여주기위해서 코드 추가

## 3. 환경 
- 서버 port : 접속 포트 44444로 동일하게 하였으며, 지금 현재 코지2측에서 nCloud24 클라우드서버가 하나있는데, 여기다가 런칭할때는 잠깐써도될거같음.
(127.0.0.1:44444 로 접속)
-  config/config.js 파일에 있는 환경설정 맞춰주기 위해 각자 로컬 몽고디비에 

	1) use cosy_db 로 cosy_db 만들어주고
	2) db.createCollection('users') 로 컬렉션 생성해줍니다
	3) 만들어 놓은 db 스키마는 database/user_schema.js
	
- 규빈이가 말해놓은것처럼 동일 환경은 유지 시켜놓음 

## 결론

- 구글 로그인 passport 처리 완료

- 구글 로그인 google-auth 정보 처리 완료

- 구글 && 로컬 sign in / sign up 처리 완료

- mongodb 연동 완료

- 로그인정보 -> 메인 Activity Page -> 정보표시 완료


---


