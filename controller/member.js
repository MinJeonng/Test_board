const { Member, Profile } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//회원가입
exports.signup = async (req, res) => {
    const { userId, pw, username, age, email } = req.body;
    //존재여부확인
    const find = await Member.findOne({ where: { userId } });
    console.log('find', find);

    if (find) {
        res.json({ result: false, message: '이미 존재하는 회원' });
    } else {
        //암호화
        const password = await bcrypt.hash(pw, 11);
        //생성 create
        const result = await Member.create({ userId, password });
        console.log('signup', result);
        const result2 = await Profile.create({ username, age, email, memberId: result.id });
        console.log('profile', result2);
        res.json({ result: true });
    }
};
//로그인
exports.login = async (req, res) => {
    console.log(req.body);
    const { userId, pw } = req.body;
    //검색 findOne
    const result = await Member.findOne({ where: { userId } });
    console.log('login', result);
    if (result) {
        const password = await bcrypt.compare(pw, result.password); //먼저, 사용자를 찾고(userid로) 있으면 이게 실행이니까, 실행되면 한번더 password를 검사, pw는 우리가 입력한 값, result.password는 db에 적혀있는값
        // 그러고 나면 T/F로 값이 나올 것
        if (password) {
            const token = jwt.sign({ id: result.id }, process.env.SECRET, { expiresIn: '1h' });
            res.json({ result: true, data: result, token });
        } else {
            res.json({ success: false, message: '비밀번호가 틀립니다.' });
        }
        //jwt 토큰 발행 - 어떤 값을 토큰 발행할건지 정해서 프론트에 주는 것, 받아서 사용할때마다 header에 담아서 보내게 되는 것
        // 그 값을 백엔드에서 받으면 미들웨어에서 정상값인지 확인하고, 다 끝나고 나면 decode라고 해서 정상이다 라고 말해줌.

        // if (save === 'save') {
        //     res.cookie(SAVEID, result.id, { maxAge: 100000, httpOnly: true });
        // } else {
        //     res.clearCookie(SAVEID);
        // }
    } else {
        res.json({ result: false });
    }
};
//회원조회
exports.find = async (req, res) => {
    const { id } = req.user; //auth 미들웨어에서 보내주는 값
    console.log(req.user);
    //findByPk
    //const find = await Member.findOne({ where: { id } });
    const result = await Member.findByPk(id, {
        attributes: ['userId', 'password'],
        include: [{ model: Profile, attributes: ['username', 'age', 'email'] }],
    });
    console.log('result', result);
    res.json({ result: true, data: result });
};
//정보수정
exports.update = async (req, res) => {
    const { pw, email, username, age } = req.body;
    const { id } = req.user; //이때 id는 프론트가 아니라 백엔드에서 가져옴
    const result = await Member.update({ password: pw }, { where: { id } });
    console.log('update', result);
    await Profile.update({ username, age, email }, { where: { memberId: id } });
    res.json({ result: true });
};
//회원탈퇴
exports.delete = async (req, res) => {
    const { id } = req.body;
    const result = await Member.destroy({ where: { id } });
    console.log('delete', result);
    res.json({ result: true });
};

//로그아웃
exports.logout = (req, res) => {
    if (req.session.member) {
        //세션제거
        req.session.destroy(() => {
            res.clearCookie(SAVEID);
            res.json({ result: true });
        });
    } else {
        res.json({ result: false, message: '로그인 상태가 아닙니다.' });
    }
};
/*
//쿠키 보내기
exports.getCookie = (req, res) => {
    if (req.cookies[SAVEID]) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
};
*/
