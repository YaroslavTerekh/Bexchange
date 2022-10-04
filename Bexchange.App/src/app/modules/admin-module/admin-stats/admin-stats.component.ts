import { AuthorizationService } from './../../../services/authorization.service';
import { AdminServiceService } from './../../../services/admin-service.service';
import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent implements OnInit {
  resUsers: User[] = [];
  users: User[] = [];
  userId!: number;

  constructor(
    private adminService: AdminServiceService,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.userId = this.authorizationService.getUserId();

    this.adminService.getLastUsers()
      .subscribe(res => {
        this.initECharts(res);
        this.resUsers = Object.values(res);

        this.resUsers.forEach(item => {
          if (Array.isArray(item) && item.length > 0) {
            item.forEach(childItem => {
              this.users.push(childItem);       
            })
          }
        });    
      });

  }

  createDate(num: number): string {
    let date = new Date(new Date().setDate(new Date().getDate() - num));
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();

    if (+month < 10) {
      month = `0${month}`;
    }

    if (+day < 10) {
      day = `0${day}`;
    }

    return `${day}.${month}`;
  }

  initECharts(users: any) {
    type EChartsOption = echarts.EChartsOption

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [this.createDate(6), this.createDate(5), this.createDate(4), this.createDate(3), this.createDate(2), this.createDate(1), 'Today']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [users.day1.length, users.day2.length, users.day3.length, users.day4.length, users.day5.length, users.day6.length, users.day7.length],
          type: 'line',
          areaStyle: {
          }
        }
      ],
      color: [
        '#3ba272'
      ]
    };

    option && myChart.setOption(option);
  }
}
