import React from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import { useEffect, useState } from 'react'
// import { BrowserRouter, Route} from 'react-router-dom'

import WeatherInfo from './WeatherInfo/WeatherInfo'

const alanKey = 'be2f1d020482e5cbe38aea2c3bc7a05e2e956eca572e1d8b807a3e2338fdd0dc/stage'

const api = {
    key: "987a3c2da1e697e7af4c0adb6d7e4bf0",
    base: "https://api.openweatherapp.org/data/2.5/"
}

const App = () =>{
    const [Weather, setWeather] = useState([])
    const [query, setQuery] = useState('')
    const [load, setLoad] = useState({})

    const search = event => {
        if(event.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result =>{
                    setLoad(result)
                    setQuery('')
                    console.log(load)
                })
        }
    }

    useEffect( () =>{
       alanBtn({
           key: alanKey,
           onCommand: ({command, articles}) => {
               if(command ==='weather') {
                   setWeather(articles)
                
               }
           }
       }) 
    }, [])

    const calender = (d) =>{
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        let day = days[d.getDay()]
        let month = months[d.getMonth()]
        let year = d.getFullYear()
        let date = d.getDate()
        
        return `${day} ${date}, ${month} ${year}. `
    }

    return(
        <div className='app warm'>
            <section>
                <div className='input-box'>
                   <form >
                        <input className='input' type='text' placeholder="Enter city..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                        />
                   </form>
                </div>
                {(typeof load.main !='undefined') ? (
                    <div>
                        <div className="city-box">
                            <div className="city">{load.name}, {load.sys.country}</div>
                            <div className='date'>{calender(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(load.main.temp)}◦c
                            </div>
                            <div className="remark">
                                {load.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : ('')}
                
            </section>
            <WeatherInfo articles={Weather} />
        </div>
    )
}

export default App 