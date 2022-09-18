function showdate(){

    var date =document.getElementById('date')
        var now=new Date
        var dt=now.toDateString()
        var time=now.toLocaleTimeString()
        let tim=dt + ' ' + time
        
        // console.log(dt,tim);
    
    date.innerHTML=tim
}
setInterval(showdate, 1000);

//https://api.openweathermap.org/data/2.5/weather?q=ajmer&appid=6323444dfed2b2c3f3a15350a221f60f
const weatherapi ={
    key : "6323444dfed2b2c3f3a15350a221f60f",
    baseurl : "https://api.openweathermap.org/data/2.5/weather"
}

let inputbox=document.getElementById('inputbox');
let container=document.getElementById('cn')
inputbox.addEventListener('keypress',(e)=>{
    if(e.key=="Enter"){
        console.log(inputbox.value);
        weatherreport(inputbox.value)
        container.style.visibility='unset'
    }
})
let btn=document.getElementById("btn")
btn.addEventListener('click',()=>{
    if(inputbox.value != ""){
        weatherreport(inputbox.value);
        container.style.visibility='unset'
    }
    else{
        
        alert("Enter city name")
    }

    // if(weather.cod == '404'){
    //     alert("The City Not Found")
    // }
})

function weatherreport(city){
    fetch(`${weatherapi.baseurl}?q=${city}&appid=${weatherapi.key}&units=metric`)
    .then(weather =>{
            return weather.json();
    }).then(showweatherreport)
}
function showweatherreport(weather){
    console.log(weather)
    let location=document.getElementById("city")
    location.innerHTML=`${weather.name},${weather.sys.country}`

    let temp=document.getElementById("temp")
    temp.innerHTML=`${weather.main.temp}&deg c`

    let minmax=document.getElementById("minmax")
    minmax.innerHTML=`${Math.floor(weather.main.temp_min)}&deg C (min), ${Math.ceil(weather.main.temp_max)}&deg C (max)`

    let type=document.getElementById("type")
    type.innerText=`${weather.weather[0].main}`
    
    console.log(type)

    let logo=document.getElementById('lg')
    if(type.textContent == 'Clouds'){
        logo.innerHTML=`<i id="cloud" class="fa-sharp fa-solid fa-cloud"></i>`
    }
    else if(type.textContent == 'Sunny'){
        logo.innerHTML=`<i id="sun" class="fas fa-sun" style="color: yellow;"></i>`
    }
    else if(type.textContent == 'Haze'){
        logo.innerHTML=`<i class="fa-solid fa-cloud-rain"></i>`
    }
    else if(type.textContent == 'Clear'){
        logo.innerHTML=`<i class="fa-sharp fa-solid fa-cloud-sun"></i>`
    }
}   