const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser'); // body-parser 모듈 추가
const mysql = require('mysql');
const path = require('path')
const cors = require('cors');
const fs = require('fs')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // body-parser 사용 설정
app.use(express.static(path.join(__dirname, 'page')));

app.set('port', process.env.PORT || 3001);

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'login'
});


connection.connect();

app.post('/login/check', (req, res) => {
    const id = req.body.Id;
    const password = req.body.PassWord;
    console.log(id, password);

    connection.query('SELECT * FROM userinfo WHERE userid = ? AND userPassword = ?', [id, password], (err, results) => {
        if (results.length > 0) {
            console.log('로그인 성공');
            res.json({pass: true});
        } else {
            console.log('일치하는 정보가 없습니다');
            res.json({pass: false});
        }
    });
});

app.get('/main/page', (req, res) => {
    console.log('sfsf')
    res.sendFile(path.join(__dirname, 'page', 'mainPage.html'))
})
// 위아래 두 개 함수빼기 가능
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'login', 'signup.html'));
});

app.post('/idCheck', (req, res) => {
    const id = req.body.Id
    connection.query('SELECT * FROM userinfo WHERE userid = ?', [id], (err, resurt) => {
        if (resurt.length != 0) {
            console.log('아이디:', id, '가 이미 존재합니다')
            res.json({pass: false})
        } else {
            res.sendFile(path.join(__dirname, 'page', 'mainPage.html'));
            res.json({pass: true})
        }
    })
})

app.get('/give/areaList', (req, res) => {

    queryString = 'SELECT * FROM select_dosi'
    search_DB(queryString, res)

})
//위 아래 두개 함수로 뺄 수 있을 듯?
app.get('/give/typeList', (req, res) => { //여행 목록 출력
    connection.query('select * from contenttype', (err, resurt) => {
        console.log(resurt)
        res.json(resurt)
    })
})

function search_DB(queryString, res) {
    connection.query(queryString, (err, resurt) => { //db 관련
        console.log(resurt)
        res.json(resurt)
    })
}


app.get('/give/cityList', (req, res) => { //시군구 출력
    console.log(req.query.cityId)
    connection.query('SELECT * FROM city where select_dosi_id = ?', [req.query.cityId], (err, resurt) => {
        if (err != null) {
            res.json(err)
        } else {
            console.log(resurt)
            res.json(resurt)
        }
    })
})

// 아래 함수로 빼자
app.get('/search/area', (req, res) => { // 선택한 여행지 리스트 전체 출력
    console.log(req.query)
    API_data(`https://apis.data.go.kr/B551011/KorService1/areaBasedSyncList1?numOfRows=50&MobileOS=ETC&MobileApp=MobileApp%20%3D%20AppTest&serviceKey=98Vek11xffZmo0MJfrphW5WZDgNUqCJdGLhezdgrWxYCcf14SgliAnkY%2B4VD%2BSNoOFlfCf8XYVJrFwngORkzgg%3D%3D&_type=json&showflag=1&arrange=O&contentTypeId=${req.query.type}&areaCode=${req.query.area}&sigunguCode=${req.query.city}`, res)
});

function API_data(url, res) { //api 데이터를 받고 값을 응답하는 함수
    fetch(url)
        .then(response => response.json())
        .then(result => res.json(result))
        .catch(error => console.error('Error:', error));
}


function Detail_API_data(url1, url2, res) {
    Promise.all([
        fetch(url1).then(response => response.json()),
        fetch(url2).then(response => response.json())
    ])
        .then(data => {
            // 두 개의 API로부터 받은 데이터가 배열로 들어옵니다.
            res.json(data);
        })
        .catch(error => console.error('Error:', error));
}


app.get('/detail/data', (req, res) => {
    const area = req.query.area
    const type = req.query.type
    url1 = `https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=MobileApp%20%3D%20AppTest&_type=json&contentId=${type}&contentTypeId=${area}&serviceKey=98Vek11xffZmo0MJfrphW5WZDgNUqCJdGLhezdgrWxYCcf14SgliAnkY%2B4VD%2BSNoOFlfCf8XYVJrFwngORkzgg%3D%3D`
    url2 = `https://apis.data.go.kr/B551011/KorService1/detailInfo1?MobileOS=ETC&MobileApp=MobileApp%20%3D%20AppTest&_type=json&contentId=${type}&contentTypeId=${area}&serviceKey=98Vek11xffZmo0MJfrphW5WZDgNUqCJdGLhezdgrWxYCcf14SgliAnkY%2B4VD%2BSNoOFlfCf8XYVJrFwngORkzgg%3D%3D`
    Detail_API_data(url1, url2, res)
    console.log(req.query, '응답')
})


const server = http.createServer(app).listen(app.get('port'), () => {
    console.log('서버 시작' + app.get('port'));
});
