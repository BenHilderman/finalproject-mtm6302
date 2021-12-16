// data
const settingsbutton = document.getElementById("settingsbutton")
const moredatabutton = document.getElementById("moredatabutton")
const container = document.getElementById("container")
const navigation = document.getElementById("navigation")
const moredatanavigation = document.getElementById("moredatanavigation")
let userSettings = localStorage.getItem('userSettings')

// settings
let clocktwelve = document.getElementById("clocktwelve")
let clocktwentyfour = document.getElementById("clocktwentyfour")
let secondsOn = document.getElementById("secondsOn")
let secondsOff = document.getElementById("secondsOff")

// gets user settings from local storage
if (userSettings == 1) {
    secondsOn.checked = true
    clocktwelve.checked = true
}
if (userSettings == 2) {
    secondsOff.checked = true
    clocktwelve.checked = true
}
if (userSettings == 3) {
    secondsOff.checked = true
    clocktwentyfour.checked = true
}
if (userSettings == 4) {
    secondsOn.checked = true
    clocktwentyfour.checked = true
}

// displays nav on settings click
settingsbutton.addEventListener("click", toggleHamburger)
function toggleHamburger() {
    navigation.classList.toggle("showNav")
}

moredatabutton.addEventListener("click", toggleMoreData)
function toggleMoreData() {
    moredatanavigation.classList.toggle("showNav")
}

fetch('https://api.nasa.gov/planetary/apod?api_key=i04yO2CTxbavI7LxM0Ceaq7oah80yterahYlNc6H&thumbs=True')
    .then(function(response) {
        return response.json()
    })
    .then(function(imageData) {
        if (imageData.media_type === 'video') {
            document.querySelector('p').textContent = 'APOD is a video'
            fetch('https://api.nasa.gov/planetary/apod?api_key=i04yO2CTxbavI7LxM0Ceaq7oah80yterahYlNc6H&date=2021-12-05&thumbs=True')
                .then(function(response) {
                    return response.json()
                })
                .then(function(imageData) {
                    if (imageData.media_type === 'video') {
                        document.querySelector('p').textContent = 'Error'
                    } else {
                        document.getElementById('bg').setAttribute('src', imageData.hdurl)
                    }
                })
        } else {
            document.getElementById('bg').setAttribute('src', imageData.hdurl)
        }
    })

clock();
function clock() {
    let date = new Date();
    let dayofweek = date.getDay();
    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();
    let currentSeconds = date.getSeconds();
    let dayofmonth = date.getDate();
    
    let oneJan = new Date(date.getFullYear(),0,1);
    let numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    let weeknumber = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);

    // get day of year
    let start = new Date(date.getFullYear(), 0, 0);
    let diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let dayofyear = Math.floor(diff / oneDay);

    if (currentHours >= 6 && currentHours < 12) {
        timeofday = "AM";
        greeting = "Good Morning"
    } else if (currentHours >= 12 && currentHours < 16) {
        timeofday = "PM";
        greeting = "Good Afternoon"
    } else {
        timeofday = "PM";
        greeting = "Good Evening"
    }
    // will always be 2 digits even if its a single number (01 instead of 1)
    let hours = ('0' + currentHours).slice(-2)
    let minutes = ('0' + currentMinutes).slice(-2)
    let seconds = ('0' + currentSeconds).slice(-2)
    // for 12 hour clock
    if (document.getElementById("clocktwelve").checked) {
        if (hours > 12) {
            hours = hours - 12
            if (document.getElementById("secondsOff").checked) {
                time = hours + ":" + minutes + " " + timeofday;
                // local storage user settings
                let userSettings = 2
                localStorage.setItem('userSettings', userSettings)
            } 
            else {
                time = hours + ":" + minutes + ":" + seconds + " " + timeofday;
                // local storage user settings
                let userSettings = 1
                localStorage.setItem('userSettings', userSettings)
            }
        }
        else {
            if (document.getElementById("secondsOff").checked) {
                time = hours + ":" + minutes + " " + timeofday;
                // local storage user settings
                let userSettings = 2
                localStorage.setItem('userSettings', userSettings)
            } 
            else {
                time = hours + ":" + minutes + ":" + seconds + " " + timeofday;
                // local storage user settings
                let userSettings = 1
                localStorage.setItem('userSettings', userSettings)
            }
        }
    } else {
        if (document.getElementById("secondsOff").checked) {
            time = hours + ":" + minutes + " ";
            // local storage user settings
            let userSettings = 3
            localStorage.setItem('userSettings', userSettings)
        } else {
            time = hours + ":" + minutes + ":" + seconds + " ";
            // local storage user settings
            let userSettings = 4
            localStorage.setItem('userSettings', userSettings)
        }
    }

if (dayofweek == 0) {
    dayofweek = "Sunday"
}
if (dayofweek == 1) {
    dayofweek = "Monday"
}
if (dayofweek == 2) {
    dayofweek = "Tuesday"
}
if (dayofweek == 3) {
    dayofweek = "Wednesday"
}
if (dayofweek == 4) {
    dayofweek = "Thursday"
}
if (dayofweek == 5) {
    dayofweek = "Friday"
}
if (dayofweek == 6) {
    dayofweek = "Saturday"
}
    document.getElementById("dayofweek").textContent = 'Day of the week:  ' + dayofweek;
    document.getElementById("dayofyear").textContent = 'Day of the year:  ' + dayofyear;
    document.getElementById("dayofmonth").textContent = 'Day of the month:  ' + dayofmonth;
    document.getElementById("weekofyear").textContent = 'Week of the year:  ' + weeknumber;
    
    document.getElementById("greeting").textContent = greeting;
    document.getElementById("clock").innerHTML = time;
    document.getElementById("clock").textContent = time;
    setTimeout(clock, 1000);
}