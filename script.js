const date = new Date();

const renderCalendar = () => {

date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".month h1").innerHTML = months[date.getMonth()];

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  if(nextDays>0){
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next-date">${j}</div>`;
      monthDays.innerHTML = days;
    }
  } else monthDays.innerHTML = days;
  
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();



// ======= Clock =======
function clock(){
  let date = Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if(hours<10){
    hours = ("0" + hours).slice(-2);
  }
  if(minutes<10){
    minutes = ("0" + minutes).slice(-2);
  }

  document.querySelector('.clock').innerHTML = hours + ":" + minutes;
}

setInterval(clock,1000);



// ======= Weather =======
let degree = document.querySelector('.degree');
let summary = document.querySelector('.summary');
let icon = document.querySelector('.weather-icon');

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition( position => {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let key = '186bcee11240bb8bcd1e9c20ce47fdc2';

    console.log(lon);
    // https://cors-anywhere.herokuapp.com/ to get API server in localhost 
    let proxy = "https://cors-anywhere.herokuapp.com/";

    let api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  
      fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        // const {temp} = data.main;
        degree.textContent = Math.floor(data.main.temp);
        summary.textContent = data.weather[0].main;
        // icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      })
      .catch(err => {
        console.error(err);
      });


    
  });
}

