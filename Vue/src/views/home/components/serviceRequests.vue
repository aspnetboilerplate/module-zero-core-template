<template>
    <div style="width:100%;height:100%;" id="service_request_con"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'serviceRequests',
    mounted () {
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                top: '3%',
                left: '1.2%',
                right: '1%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Operator / Internet service',
                    type: 'line',
                    stack: 'Total amount',
                    areaStyle: {normal: {
                        color: '#2d8cf0'
                    }},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Bank / Finance',
                    type: 'line',
                    stack: 'Total amount',
                    areaStyle: {normal: {
                        color: '#10A6FF'
                    }},
                    data: [257, 358, 278, 234, 290, 330, 310]
                },
                {
                    name: 'Game / Video',
                    type: 'line',
                    stack: 'Total amount',
                    areaStyle: {normal: {
                        color: '#0C17A6'
                    }},
                    data: [379, 268, 354, 269, 310, 478, 358]
                },
                {
                    name: 'Catering / Takeaway',
                    type: 'line',
                    stack: 'Total amount',
                    areaStyle: {normal: {
                        color: '#4608A6'
                    }},
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'E-commerce',
                    type: 'line',
                    stack: 'Total amount',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {
                        color: '#398DBF'
                    }},
                    data: [820, 645, 546, 745, 872, 624, 258]
                }
            ]
        };
        const serviceRequestCharts = echarts.init(document.getElementById('service_request_con'));
        serviceRequestCharts.setOption(option);

        window.addEventListener('resize', function () {
            serviceRequestCharts.resize();
        });
    }
};
</script>