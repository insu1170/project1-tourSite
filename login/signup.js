const idCheckForm = document.querySelector('#idCheckForm');
const password = document.querySelector('#signUpInput')
const signUpBut = document.querySelector('#signUpBut');
idCheckForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.querySelector('#Id').value.trim();
  console.log(id.length)

  if(id.length<=5){
    alert('아이디를 다시 입력하세여')
    return;
  }

  fetch('http://localhost:3001/idCheck', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Id: id,
    }),
  })
    .then((res) => res.json())
    .then(data => {
      if (data.pass) {
        alert('사용 가능한 아이디 입니다')
        password.disabled = false
      } else {
        password.disabled = true
        alert('이미 있는 아이디 입니다')
      }
      console.log(data)
    })
  console.log(id)
})

password.addEventListener('input', (ev) => {
  const signUpBut = document.querySelector('#signUpBut')
  console.log(ev.target.value)
  if (ev.target.value.length < 5) {
    signUpBut.classList.add('hidden')
  } else {
    signUpBut.classList.remove('hidden')
  }
})





signUpBut.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('sf')
})