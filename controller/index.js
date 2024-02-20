const main = (req, res) => {
    res.render('index'); //홈 페이지
};

const post = (req, res) => {
    res.render('post'); //전체 글 페이지
};

const detail = (req, res) => {
    res.render('detail'); //상세페이지
};

const write = (req, res) => {
    res.render('write'); //글쓰기페이지
};

const signup = (req, res) => {
    res.render('signup'); //회원가입페이지
};

const login = (req, res) => {
    res.render('login'); //로그인 페이지
};

const profile = (req, res) => {
    res.render('profile'); //정보조회 페이지
};

module.exports = { main, post, detail, write, signup, login, profile };
