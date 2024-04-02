const area = document.querySelector('#area');
const city = document.querySelector('#city');
const traver = document.querySelector('#traver');
const selectArea = document.querySelector('#area option');
const search = document.querySelector('#search')
area.addEventListener('click', () => {

  area.innerHTML = '';
  city.innerHTML = '';

  giveAreaData('http://localhost:3001/give/areaList', area)
  giveAreaData(`http://localhost:3001/give/cityList?cityId=0`, city)
}, { once: true });

traver.addEventListener('click', () => {
  traver.innerHTML = '';
  giveAreaData('http://localhost:3001/give/typeList', traver)
}, { once: true });


area.addEventListener('change', () => {
  console.log(city)
  city.innerHTML = '';
  giveAreaData(`http://localhost:3001/give/cityList?cityId=${area.value}`, city)
})

search.addEventListener('click', () => { // api 값 table에 출력
  fetch(`http://localhost:3001/search/area?area=${area.value}&city=${city.value}&type=${traver.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.response.body.items.item)
      const resData = data.response.body.items.item;

      const insert = document.querySelector('.MainList');
      insert.innerHTML = ''; 
      resData.forEach(area => {
        const div = document.createElement('div');
        div.classList.add('divTable');
        insert.appendChild(div)
        div.addEventListener('click', () => detailPage(area.contentid,area.contenttypeid,area.firstimage));
        // 첫 번째 테이블
        const table = document.createElement('table');
        
        table.classList.add('items');
        const tr1 = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.classList.add('TdItem')
        const img = document.createElement('img');
      
        td1.textContent = `${area.addr1}  ${area.addr2}`; //주소
        img.src = area.firstimage2; 
      
        insert.appendChild(div);
        div.classList.add('TableDiv')
        div.appendChild(table);
        table.appendChild(tr1);
        tr1.appendChild(td1);
      
        // 두 번째 테이블
        const tr2 = document.createElement('tr');

        table.appendChild(tr2);
        tr2.appendChild(img);        

        const td3 = document.createElement('td');
        td3.innerHTML = area.title;
        td3.classList.add('TdItem')
        
        const tr3 =document.createElement('tr');// 세 번째 테이블
        table.appendChild(tr3)
        tr3.appendChild(td3)
      });
      
    })
  console.log(area.value, city.value, traver.value)
})


function giveAreaData(link, citys) {
  fetch(link, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = '전체';
      citys.appendChild(option)
      data.forEach(areas => {
        const option = document.createElement('option');
        console.log(areas.area, areas.value)
        option.value = areas.value !== undefined ? areas.value : areas.id;
        option.textContent = areas.area;
        citys.appendChild(option)
      });
    });
}

function detailPage(type,area,img){
  const options = 'width=600, height=500, top=50, left=50, scrollbars=yes'
  window.open(`/project1-tourSite/page/detail.html?area=${area}&type=${type}&img=${img}`,'_blank', 'width=600, height=500, top=150, left=150, scrollbars=yes, location =yes');
  console.log('gd')
  
}

//https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=MobileApp%20%3D%20AppTest&_type=json&contentId=1942245&contentTypeId=12&serviceKey=98Vek11xffZmo0MJfrphW5WZDgNUqCJdGLhezdgrWxYCcf14SgliAnkY%2B4VD%2BSNoOFlfCf8XYVJrFwngORkzgg%3D%3D

//https://apis.data.go.kr/B551011/KorService1/detailInfo1?MobileOS=ETC&MobileApp=MobileApp%20%3D%20AppTest&_type=json&contentId=1942245&contentTypeId=12&serviceKey=98Vek11xffZmo0MJfrphW5WZDgNUqCJdGLhezdgrWxYCcf14SgliAnkY%2B4VD%2BSNoOFlfCf8XYVJrFwngORkzgg%3D%3D