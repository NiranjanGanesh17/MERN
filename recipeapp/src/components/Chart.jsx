import React from 'react';
import { Doughnut, Pie, Bar } from 'react-chartjs-2';

function Chart({ PrepTime, CookTime, show }) {
    return (
        <React.Fragment>
            {/* <div id='charts'> */}
            <div id='chart' >
                <Pie
                    data={{
                        labels: ['cooking-time', 'preperation-time'],
                        datasets: [
                            {
                                label: 'Most liked Recipe',
                                data: [PrepTime, CookTime],
                                backgroundColor: [
                                    'rgba(255,99,132,0.6)',
                                    'rgba(54,162,235,0.6)',
                                    'rgba(74,294,192,0.6)',
                                    'rgba(255,159,64,0.6)'
                                ]
                            }
                        ]
                    }}
                    width={100}
                    height={50}
                    options={{ maintainAspectRatio: false }}
                />
                {/* <Pie
                    data={props.data}
                    width={100}
                    height={50}
                    options={{ maintainAspectRatio: false }}
                /> */}

            </div>
            {/* </div> */}
        </React.Fragment>

    )
}

export default Chart
