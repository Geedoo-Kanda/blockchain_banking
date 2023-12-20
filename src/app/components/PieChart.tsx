/* @jsxImportSource react */
import React from "react";
import Chart from "react-apexcharts";

const config = {
    options: {
        chart: {
            id: "Total de transactions",
            type: "donut", // Changement du type de graphique à "donut"
        },
        labels: ["Envoyé", "Reçu"], // Utilisation de labels au lieu de categories
        colors: ['#2563EB', '#FF0000']
    },
    series: [61, 39], 
};

const PieChart = () => {
    return (
        <Chart
            options={config.options as any}
            series={config.series}
            type="donut"
        />
    );
};

export default PieChart;
