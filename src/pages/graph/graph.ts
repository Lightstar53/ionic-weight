import { Component } from '@angular/core';
import { NavController , ModalController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { GeneralService } from '../../services/general.service';
import { FormulaService } from '../../services/formula.service';

import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html'
})
export class GraphPage {

  constructor(public navCtrl: NavController,
              private http: HttpClient,
              private general: GeneralService,
              private formula: FormulaService,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController) {}

  // Global variables
  current_weight = 0;
  weight_data = [];
  l_dates = [];
  total_weight_lost = { difference: 0, color: ''};
  total_days_passed = 0;
  filter_years = [{ year: 'All', color: 'default' }];

  lineChartData = [{
    label: 'Weight (lbs)',
    data: []
  }];
  lineChartLabels = [];
  lineChartOptions = {
    responsive: true,
    elements: { point: { radius: 0 } }
  };
  lineChartColors = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBacl_dayskgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend = true;
  lineChartType = 'line';

  // Retrieve data
   getJSON(): Observable<any> {
    return this.http.get("./assets/weight.json");
  }
  // On page load
  ionViewDidLoad() {
    this.getJSON().subscribe(data => {
      let _lineChartData = [{
        label: 'Weight (lbs)',
        data: []
      }];
      const keysSorted = data.weights.slice(0);
      // Sort by date
      keysSorted.sort(function(a,b) {
          return a.date - b.date;
      });
      this.weight_data = keysSorted;
      for (const data of this.weight_data) {
        _lineChartData[0].data.push(data.weight);
        this.l_dates.push(data.date);
        this.lineChartLabels.push(this.general.getShortDate(data.date));
      }
      this.lineChartData = _lineChartData;
      this.updateStats();

      // Filter data by year
      const years = [];
      for (const date of this.l_dates) {
        const year = this.general.getYearFromDate(date);
        if (years.indexOf(year) === -1) {
          years.push(year);
        }
      }
      for (const year of years) {
        this.filter_years.push({
          year: year,
          color: 'light'
        });
      }
      console.log(this.filter_years, years)
    });
  }

  // Update graph based on filter
  updateGraphFilter(year = null) {
    this.l_dates = [];
    this.lineChartLabels.length = 0;
    let _lineChartData = [{
      label: 'Weight (lbs)',
      data: []
    }];

    if (year && year !== 'All') {
      const filter = this.filterDataYear(year);
      console.log(filter);

      for (const data of filter) {
        _lineChartData[0].data.push(data.weight);
        this.l_dates.push(data.date);
        this.lineChartLabels.push(this.general.getShortDate(data.date));
      }

      this.lineChartData = _lineChartData;
      console.log(this.lineChartLabels, this.lineChartData)
    } else {
      for (const data of this.weight_data) {
        _lineChartData[0].data.push(data.weight);
        this.l_dates.push(data.date);
        this.lineChartLabels.push(this.general.getShortDate(data.date));
      }

      this.lineChartData = _lineChartData;
    }

    let index = 0;
    for (const fil of this.filter_years) {
      if (fil.year === year) {
        this.filter_years[index].color = 'default';
      } else {
        this.filter_years[index].color = 'light';
      }
      index++;
    }

    this.updateStats();
  }

  // Update stats page
  updateStats() {
    this.current_weight = this.lineChartData[0].data[this.lineChartData[0].data.length - 1];
    this.total_days_passed = this.general.totalDaysPassed(this.l_dates);

    // Check weight lost
    this.total_weight_lost.difference = this.general.totalWeightLost(this.lineChartData[0].data);
    if (this.total_weight_lost.difference > 0) {
      this.total_weight_lost.color = 'secondary';
    } else {
      this.total_weight_lost.color = 'warning';
    }
  }

  // Filter data based by year
  filterDataYear(year) {
    const filter = _.chain(this.weight_data)
                  .filter(d => this.general.getYearFromDate(d.date) === year)
                  .map(d => {
                    return {
                      weight: d.weight,
                      date: d.date
                    }
                  })
                  .value();
    return filter;
  }

  // total weight lost
  alertTotalLost() {
    let alert;
    if (this.total_weight_lost.difference > 0) {
      alert = this.alertCtrl.create({
        title: 'Congrats!',
        subTitle: `You have lost ${this.total_weight_lost.difference} lbs<br>
                  in ${this.total_days_passed} days (${this.general.getWeeks(this.total_days_passed)} weeks)`,
        buttons: ['OK']
      });
    } else if (this.total_weight_lost.difference < 0){
      alert = this.alertCtrl.create({
        title: 'Hmm....',
        subTitle: `You have gained ${this.total_weight_lost.difference * -1} lbs<br>
                  in ${this.total_days_passed} days (${this.general.getWeeks(this.total_days_passed)} weeks)`,
        buttons: ['OK']
      });
    } else {
      alert = this.alertCtrl.create({
        title: 'No change',
        subTitle: `No change in weight<br>
                  in ${this.total_days_passed} days (${this.general.getWeeks(this.total_days_passed)} weeks)`,
        buttons: ['OK']
      });
    }
    alert.present();
  }
}
