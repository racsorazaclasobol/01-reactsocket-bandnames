import React, { useContext, useEffect } from 'react'
import { Chart, registerables } from 'chart.js';
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {
    Chart.register(...registerables);
    let myChart;
    const { socket } = useContext( SocketContext );
    
    useEffect( () => {
        socket.on( 'current-bands', ( data ) => {
            crearGrafica(data);
        });
        
    }, [socket] )
    
    
    const crearGrafica = ( bands = [] ) => {
        const ctx = document.getElementById('myChart');
        if (myChart) myChart.destroy();
    
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: bands.map( band => band.name ),
              datasets: [{
                label: '# of Votes',
                data: bands.map( band => band.votes ),
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              },
              indexAxis: 'y',
              animation: false
            }
          });
    }
    

    return (
        <>
            <canvas id="myChart"></canvas>

        </>
    )
}
