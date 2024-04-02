document.addEventListener('DOMContentLoaded', () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const type = urlParams.get('type');
  const area = urlParams.get('area');
  const img = urlParams.get('img');

  document.querySelector('#img').innerText=''
document.querySelector('#img').appendChild(document.createElement('img')).src=img

  const URL = `http://localhost:3001/detail/data?area=${area}&type=${type}`

  getDetailInfo(URL)
  console.log(urlParams, type, area, img);
});

//https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=MobileApp%20%3D%20AppTest&_type=json&contentId=1942245&contentTypeId=12&serviceKey=98Vek11xffZmo0MJfrphW5WZDgNUqCJdGLhezdgrWxYCcf14SgliAnkY%2B4VD%2BSNoOFlfCf8XYVJrFwngORkzgg%3D%3D

//https://apis.data.go.kr/B551011/KorService1/detailInfo1?MobileOS=ETC&MobileApp=MobileApp%20%3D%20AppTest&_type=json&contentId=1942245&contentTypeId=12&serviceKey=98Vek11xffZmo0MJfrphW5WZDgNUqCJdGLhezdgrWxYCcf14SgliAnkY%2B4VD%2BSNoOFlfCf8XYVJrFwngORkzgg%3D%3D

function getDetailInfo(URL) {
  fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.json())
  .then((data) =>{
    console.log(data)
    const NormalData = data[0].response.body.items.item[0];
    var secondData= '';

    if(data[1].response.body.items==''){
      secondData = ''
    }else{
    secondData=data[1].response.body.items.item[0]
      }
    const detailList = giveList(NormalData.contenttypeid,NormalData, secondData);

    if (detailList === undefined) {
      location.reload();
    } else {
      const TitleList = ['firstTitle', 'secondTitle', 'threeTitle', 'fourTitle', 'fiveTitle', 'sixTitle', 'sevenTitle', 'eightTitle'];
      const ContentList = ['firstContent', 'secondContent', 'threeContent', 'fourContent', 'fiveContent', 'sixContent', 'sevenContent', 'eightContent'];

      for (var a = 0; a <= 7; a++) {
        var text = Object.values(detailList[a]);
        if (text =='') text = ['정보없음'];
        document.querySelector(`#${TitleList[a]}`).innerText = Object.keys(detailList[a]);
        document.querySelector(`#${ContentList[a]}`).innerHTML += text;
      }
      var title = secondData.infoname;
      if(title==undefined){
        title = '정보없음'
      }
      document.querySelector('#eightTitle').innerText=title

    }
    })
  document.querySelector('h1').classList.add('hidden')
  document.querySelector('table').classList.remove('hidden')
}





function giveList(type,data,secondData) {
  let list = [];
console.log(data)
  switch (type) {
    case '12':
      var title = secondData.infoname;
      list = [
        {'전화번호': data.infocenter},
        {'콘텐츠': data.expguide},
        {'이용 나이':data.expagerange},
        {'주차장':data.parking},
        {'휴일':data.restdate},
        {'이용 가능 기간':data.useseason},
        {'이용 가능 시간':data.usetime},
        {title:secondData.infotext}
      ];
      break;
    case '14':
      var title = secondData.infoname;
      list = [{'전화번호':data.infocenterculture},
        {'주차':data.parkingculture},
        {'휴일':data.restdateculture},
        {'크기':data.scale},
        {'좌석수':data.accomcountculture},
        {'이용료':data.usefee},
        {'운영시간':data.usetimeculture },
        {title:secondData.infotext}];
      break;
    default:
      break;
  }

  return list;
}
