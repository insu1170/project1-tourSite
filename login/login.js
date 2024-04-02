const loginFrom = document.querySelector('#login')
loginFrom.addEventListener('submit', (e) => {
  e.preventDefault()
  const id = document.querySelector('#Id').value;
  const password = document.querySelector('#PassWord').value;
  console.log(id, password)

  fetch('http://localhost:3001/login/check', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Id: id,
      PassWord: password
    }),
  })
    .then((res) => res.json())
    .then(data => {
      if (data.pass) { //true False 반환
        window.location.href = '/project1-tourSite/page/mainPage.html';
      } else {
        alert('다시 입력')
      }
    })
})


const signupFrom = document.querySelector('#signUpFrom');
signupFrom.addEventListener('submit', (e) => {
  fetch('http://localhost:3001/signup')
    .then((res) => window.location.href = '/project1-tourSite/login/signup.html')
})