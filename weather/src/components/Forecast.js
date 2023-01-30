import React, { useEffect, useRef, useState } from "react";
import Daily from "./Daily";



export default function Forecast({dailyForecasts}) {
    return (
        <>
            <article id="forecast" class="today">
                <div>
                    <h2 id="title">7 Day Forecast</h2>
                </div>
                <div id="columns">
                    <div class="container">
                        <table>
                            {dailyForecasts}
                        </table>
                    </div>
                </div>
            </article>
        </>
    )
}