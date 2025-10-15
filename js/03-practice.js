// Потрібно створити функціонал для отримання прогнозу погоди в місті.
// Використай публічне API https://www.weatherapi.com/docs/
// Використовуй ендпоінт Forecast для того, щоб отримати прогноз погоди на декілька днів.

// Створи форму в яку користувач:
// 1 вводить назву міста.
// 2 обирає на яку кількість днів він хоче отримати прогноз погоди (3, 5 та 7 днів).
// (Іноді параметр не працює в такому випадку можна зробити пошук на 1, 2 та 3 дні)
// Приклад форми https://prnt.sc/kFmLOj6gBdv-

// Після сабміту форми відмалюй картки з інформацією отриманою з бекенду.
// Картка має містити відомості про:
// 1 Зображення з погодою (icon)
// 2 Текст з погодою (text)
// 3 Дату (date)
// 4 Середню температуру в Цельсія (avgtemp_c)
// Приклад картки https://prnt.sc/h_p-A6Hty-i-

// °C

const BASE_URL = "http://api.weatherapi.com/v1";
const API_KEY = "2f11846a6adc4e3eb6f115653251510";

const form = document.querySelector(".js-search-form");
const container = document.querySelector(".js-list");
const modalOverlay = document.querySelector(".modal-overlay")
const modal = document.querySelector(".modal")

form.addEventListener("submit", handlerSubmit);

function handlerSubmit(event) {
    event.preventDefault()
    
    const { city, days } = event.target.elements
    
    serviceWeather(city.value, days.value)
        .then(data => {
            container.innerHTML = createMarkup(data.forecast.forecastday)           
        })
        .catch(error => {
            alert(error);
        });
    

}

function serviceWeather(city = "", days = 1) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: city,
        days,
        lang: 'uk',
    })

    return fetch(`${BASE_URL}/forecast.json?${params}`)
        .then(res => {            
            if (!res.ok) {
                throw new Error("Щось пішло не так");
            }

            return res.json();
    })
}

function createMarkup(arr) {
    return arr.map(({ date, day: { avgtemp_c, condition: { icon, text } } }) => 
        `<li class="weather-card">
            <img class="weather-icon" src="${icon}" alt"${text}">
            <h2 class="weather-date">${date}</h2>
            <h3 class="weather-text">${text}</h3>
            <h3 class="temperature">${avgtemp_c} °C</h3>
        </li>`
    ).join("")
}

container.addEventListener("click", onListClick);
modalOverlay.addEventListener("click", onListBlur)

function onListBlur() {
        modalOverlay.classList.add("isOpen")
}

function onListClick() {
modalOverlay.classList.remove("isOpen");

}
