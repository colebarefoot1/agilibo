import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router, ActivatedRoute } from '@angular/router';
import { ScrumTeamService } from '../../../services/scrumTeam/scrumTeam.service';
import { AlertService } from '../../../services/alert.service';
import { VelocityProgressView, combinedCharts, Commit, Complete, ChangeCommit, RunningVel, OverDeliver, category } from '../../../models/VelocityProgressView';
import { VelocityProgressService } from '../../../services/kpi/velocityprogress/velocityprogress.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'velocitykpi',
    templateUrl: './velocitykpi.component.html'
})

@Injectable()
export class VelocityKpiComponent implements OnInit {
    loading = false;
    teamname: any;
    teamKey: string = "";
    mysprintlist: VelocityProgressView[] = [];
    chartLayout: any;
    errorMessage: string = "";
    constructor(private router: Router, private _avRoute: ActivatedRoute, private http: Http, private velocityprogressservice: VelocityProgressService, private alertService: AlertService) {
        if (this._avRoute.snapshot.params["id"]) {
            this.teamKey = this._avRoute.snapshot.params["id"];
        }
        if (this._avRoute.snapshot.params["teamname"]) {
            this.teamname = this._avRoute.snapshot.params["teamname"];
        }
    }
    chart: any = [];
    tlist: any = {};

    ngOnInit(): void {

        this.getList();
        this.velocityprogressservice.getvalueForGraphCategory(this.teamKey)
            .subscribe(res => {

                this.tlist = this.velocityprogressservice.chartValue;
                let xaxis = this.velocityprogressservice.chartValue['category'].map((d: any) => d.label);
                let c1 = this.velocityprogressservice.chartValue['commit'].map((d: any) => d.value);
                let cplt1 = this.velocityprogressservice.chartValue['complete'].map((d: any) => d.value);
                let changeCommit = this.velocityprogressservice.chartValue['changeCommit'].map((d: any) => d.value);
                let overDeliver = this.velocityprogressservice.chartValue['overDeliver'].map((d: any) => d.value);
                let runningVel = this.velocityprogressservice.chartValue['runningVel'].map((d: any) => d.value);
               
                /////////////////////////////Charts
                this.chart = new Chart('canvas', {
                    type: 'bar',
                    data: {
                        labels: xaxis,
                        datasets: [{
                            label: 'Sprint Story Points committed',
                            data: c1,
                            backgroundColor: 'rgba(0,0,128, 0.8)',
                            borderColor: 'rgba(0,0,0,0)',
                            borderWidth: 1,
                            yAxisID: 'y-axis-1'
                        },
                        {
                            label: 'Sprint Story Points completed',
                            data: cplt1,
                            backgroundColor: 'rgba(0,128,128,0.9)',
                            borderColor: 'rgba(0,0,0,0)',
                            borderWidth: 1,
                            yAxisID: 'y-axis-1'
                        },
                        {
                            label: 'Sprint commitment change',
                            data: changeCommit,
                            backgroundColor: 'rgba(128,128,128,0.9)',
                            borderColor: 'rgba(0,0,0,0)',
                            borderWidth: 1,
                            yAxisID: 'y-axis-1'
                        },
                        {
                            label: 'Running velocity for 5 closed sprint',
                            data: runningVel,
                            borderColor: 'red',
                            yAxisID: 'y-axis-2',
                            type: 'line'
                        },
                        {
                            label: 'Over Deliver',
                            data: overDeliver,
                            borderColor: 'blue',
                            yAxisID: 'y-axis-2',
                            type: 'line'
                        }
                        ],
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Scrum Delivery KPI'
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: true
                        },
                        scales: {
                            yAxes: [
                                {
                                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                    display: true,
                                    position: 'left',
                                    id: 'y-axis-1',
                                }, {
                                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                    display: true,
                                    position: 'right',
                                    id: 'y-axis-2',
                                    gridLines: {
                                        drawOnChartArea: false
                                    }
                                }],
                        }
                    }
                });

                ///////////////////////////////////////CHarts
            });
    }

    getList() {
        this.velocityprogressservice.getVelocityProgressForKPITeamwise(this.teamKey)
            .subscribe(data => {
                this.mysprintlist = this.velocityprogressservice.teamkpilist;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }
}
