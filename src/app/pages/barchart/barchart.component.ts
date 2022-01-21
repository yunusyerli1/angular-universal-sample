import { isPlatformBrowser } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {

    @Input() chartProps;
    @Input() barContent;
    @Input() chartValueName;
    series = [];
    chart;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      this.chartmaker();
    }

  }
  chartmaker() {
    this.series = this.barContent?.multipleBarData ? this.barContent.multipleBarData : [{
        type: this.chartProps?.chartType,
        height: this.chartProps?.height ? this.chartProps?.height : '',
        name: this.chartValueName ? this.chartValueName : 'Değer',
        data: this.barContent?.percentage,
        colorByPoint: this.chartProps ? this.chartProps.colorByPoint: true,
        color:this.chartProps.legendColor ? this.chartProps.legendColor: '',
    }]
    this.chart = new Chart({
        chart: {
            type: this.chartProps.chartType,
            height: this.chartProps.height,
            className: this.chartProps.class,
            style: {
                textOutline: 'none',
                fontFamily: 'Muli',
                fontSize: '14px',
                fontWeight: 'Normal',
                color: '#002b49'
            }
        },
        title: {
            text: '',
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: this.barContent?.data,
            crosshair: true,
            lineColor: '#E6E9EB',
        },
        yAxis: {
            min: 0,
            title: {
                text: this.chartValueName,
            },
            gridLineWidth: this.chartProps?.gridLineWidth ? this.chartProps?.gridLineWidth : 0,
            lineWidth: 1,
            lineColor: '#E6E9EB',
            //tickInterval: 1,

        },
        colors: this.chartProps?.colors ? this.chartProps?.colors : ['rgb(0,79,121)', 'rgb(0,92,141,0.9)', 'rgb(0,103,160,0.8)', 'rgb(32,121,171)', 'rgb(61,138,183)', 'rgb(92,157,194,0.5)', 'rgb(138,185,211,0.4)'],
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            valueSuffix: ' millions',
            shared: true,
            useHTML: true
        },

        plotOptions: {
            series: {
                cursor: 'pointer',
                allowPointSelect: true,

                dataLabels: {
                    enabled: true,
                    inside: this.chartProps?.dataLabels?.inside ? false : true,
                    align: this.chartProps.dataLabels?.align ? this.chartProps.dataLabels.align : 'right',
                    color: this.chartProps.dataLabels?.color,
                    borderColor: 'transparent',
                    rotation: this.chartProps.rotation,
                    verticalAlign: this.chartProps?.dataLabels?.verticalAlign,
                    x: this.chartProps?.dataLabels?.x ? this.chartProps?.dataLabels.x : 0,
                    y: this.chartProps?.dataLabels?.y,
                    format: '{y}' + this.chartProps.format,

                    style: {
                        textOutline: 'none',
                        fontFamily: this.chartProps.fontFamily ? this.chartProps.fontFamily : 'Poppins',
                        fontSize:  this.chartProps.fontSize ? this.chartProps.fontSize : '14px' ,
                        fontWeight: this.chartProps.fontWeight ? this.chartProps.fontWeight : 'normal',
                        width:100
                    }
                }
            },
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },

        legend:this.chartProps?.legend ? this.chartProps?.legend : '',
        credits: {
            enabled: false
        },
        series: this.series,
        colorAxis: {
            layout: 'vertical'
        },
    });
}
}
