import React, { useEffect, useRef, useState } from "react";

export default function Today({current}) {
    return (
        <>
            <article id="current">
                <section id="basic" class="today">
                    <h1>{current.city}</h1>
                    <h3>{current.temp}&#8457;</h3>
                    <p>{current.description}</p>
                    <p>Lo: {current.dailyLo}&#8457; / Hi: {current.dailyHi}&#8457;</p>
                </section>
                <section>
                    <details>
                        <summary><strong>More Info</strong></summary>
                        <br></br>
                        <p>Wind Speed: {current.windSpeed} mph</p>
                        <p>Humidity: {current.humidity}%</p>
                        <p>Pressure: {current.pressure} kPa</p>
                        <p>Sunrise: {current.sunrise}</p>
                        <p>Sunset: {current.sunset}</p>
                    </details>
                </section>
            </article>
        </>
    )
}