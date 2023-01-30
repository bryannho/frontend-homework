import React, { useEffect, useRef, useState } from "react";

export default function Daily({daily}) {
    return (
        <>
            <tr>
                <td><strong>{daily.date}</strong></td>
                <td>{daily.description}</td>
                <td>
                    <div>Lo: {daily.temp_min}&#8457;</div>
                    <div>Hi: {daily.temp_max}&#8457;</div>
                </td>
            </tr>
        </>
    )
}