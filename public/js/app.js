const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const message_1 = document.querySelector('#message_1')
const message_2 = document.querySelector('#message_2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  message_1.textContent = 'Loading...';
  message_2.textContent = '';
  
  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then((resp) => {
    const res = 

    resp.json().then((data) => {
      if (data.error){
        message_1.innerText = data.error
      } else {
        message_1.innerText = data.location
        message_2.innerText = data.forecast
      }
    })
  }
)});