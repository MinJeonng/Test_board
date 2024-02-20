const jwt = require('jsonwebtoken');
//const { DecoratorHandler } = require('undici-types');

exports.auth = (req, res, next) => {
    //암호화. header에 암호화된 값을 서버에 보내주는 것. 그러면 백엔드에서 유효한지 확인하고 여부 결정
    // 보안된 값을 가지고 브라우저에 가지고 있다가(ejs에 보내는 코드가 있음) 백엔드에 보내주는 것.
    //auth : authorization 권한..
    const header = req.headers.authorization;
    //req.headers['authorization'] => 배열형태로 써도 되고 객체로 해서 접근가능
    console.log(header);
    if (!header) {
        return res.status(401).json({ success: false }); //토큰이 없으면 출력
    }
    const [_, token] = header.split(' '); //token만 사용하면 됌
    //jwt 인증
    jwt.verify(token, process.env.SECRET, (err, decode) => {
        if (err) {
            return res.status(403).json({ success: false }); //토근이 잘못되는 경우
        }
        req.user = decode; //jwt로 암호화된 값을 decode, 다음 미들웨어로 전달하는 값
        next();
    });
};
