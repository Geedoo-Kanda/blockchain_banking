"use client";

import React from "react";
import Chart from "react-apexcharts";

const config = {
    options: {
        chart: {
            id: "Flux de transactions"
        },
        xaxis: {
            categories: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        },        
        colors: ['#1650EB', '#FF0000']
    },
    series: [
        {
            name: "Reçu",
            data: [30, 40, 45, 50, 49, 60, 100]
        },
        {
            name: "Envoyé",
            data: [35, 60, 40, 62, 48, 69, 90]
        },
    ],
};

const LineChart = () =>{
    return(
            <Chart
              options={config.options}
              series={config.series}
              type="bar"
            />
    )
}
export default LineChart;