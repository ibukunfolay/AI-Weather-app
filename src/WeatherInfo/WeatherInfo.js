import React from 'react'

const WeatherInfo = ({articles}) => {

    const calender = (d) =>{
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        let day = days[d.getDay()]
        let month = months[d.getMonth()]
        let year = d.getFullYear()
        let date = d.getDate()
        
        return `${day} ${date}, ${month} ${year}. `
    }

    return (
        <div>
            {(typeof articles.main != "undefined")  ? (
                <div>
                <div className="city-box">
                    <div className="city">{articles.name}, {articles.sys.country}</div>
                    <div className='date'>{calender(new Date())}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">
                        {Math.round(articles.main.temp)}◦c
                    </div>
                    <div className="remark">
                        {articles.weather[0].main}
                    </div>
                </div>
                </div>
            ) : ('')}
        </div>
    )
}

export default WeatherInfo
