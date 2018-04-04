import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { GeneralService } from '../../services/general.service';
import { FormulaService } from '../../services/formula.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(
    private general: GeneralService,
    private formula: FormulaService,
    public navCtrl: NavController,
    public alertCtrl: AlertController) {
  }

  // Global variables
  current_weight = 135;
  current_bmi = 0;
  current_gender = 'Male';
  bmi_status = { message: '', color: ''};
  my_height_in = 66;
  my_height = '5,6';
  all_heights_in = [];
  total_weight_lost = { difference: 0, color: ''};
  total_days_passed = 0;
  filter_years = [{ year: 'All', color: 'default' }];

  robinson_calcuation = 0;
  miller_calcuation = 0;
  devine_calcuation = 0;
  hamwi_calcuation = 0;

  segment = 'Stats';
  segments = {
    'Stats': [],
    'Formulas': []
  };

  // On page load
  ionViewDidLoad() {
      this.all_heights_in = this.general.listAllHeights();
      this.updateStats();
  }

  // Update stats page
  updateStats() {
    this.my_height_in = this.general.getHeightInches(this.my_height);
    this.current_bmi = this.formula.calculateBMI(this.current_weight, this.my_height_in)

    // Check BMI and calculations
    if (this.current_bmi < 18.5) {
      this.bmi_status.message = 'Underweight';
      this.bmi_status.color = 'warning';
    } else if (this.current_bmi >= 18.5 && this.current_bmi < 25) {
      this.bmi_status.message = 'Normal';
      this.bmi_status.color = 'default';
    } else if (this.current_bmi >= 25 && this.current_bmi < 30) {
      this.bmi_status.message = 'Overweight';
      this.bmi_status.color = 'danger';
    } else {
      this.bmi_status.message = 'Obese';
      this.bmi_status.color = 'dark';
    }
    this.robinson_calcuation = this.formula.robinsonFormula(this.current_gender, this.my_height_in);
    this.miller_calcuation = this.formula.millerFormula(this.current_gender, this.my_height_in);
    this.devine_calcuation = this.formula.devineFormula(this.current_gender, this.my_height_in);
    this.hamwi_calcuation = this.formula.hamwiFormula(this.current_gender, this.my_height_in);
  }

  // Recommended weight
  alertWeightRange() {
    let alert = this.alertCtrl.create({
      title: `Current: ${this.current_weight} lbs`,
      subTitle: `Recommended weight based on BMI:<br>
                ${this.formula.recommendedWeight(this.my_height_in).min} lbs -
                ${this.formula.recommendedWeight(this.my_height_in).max} lbs`,
      buttons: ['OK']
    });
    alert.present();
  }

  // Recommended weight
  alertBMI() {
    let alert = this.alertCtrl.create({
      title: `BMI: ${this.current_bmi}`,
      subTitle: `Underweight: under 18.5<br>
                Normal weight: 18.5 to 24.9<br>
                Overweight: 25 to 29.9<br>
                Obese: 30 or more`,
      buttons: ['OK']
    });
    alert.present();
  }

  // Recommended weight
  alertRobinson() {
    let alert = this.alertCtrl.create({
      title: 'Robinson Formula (1983)',
      subTitle: `Ideal weight:<br>
                ${this.formula.robinsonFormula(this.current_gender, this.my_height_in)} lbs`,
      buttons: ['OK']
    });
    alert.present();
  }

  // Recommended weight
  alertMiller() {
    let alert = this.alertCtrl.create({
      title: 'Miller Formula (1983)',
      subTitle: `Ideal weight:<br>
                ${this.formula.millerFormula(this.current_gender, this.my_height_in)} lbs`,
      buttons: ['OK']
    });
    alert.present();
  }

  // Recommended weight
  alertDevine() {
    let alert = this.alertCtrl.create({
      title: 'Devine Formula (1974)',
      subTitle: `Ideal weight:<br>
                ${this.formula.devineFormula(this.current_gender, this.my_height_in)} lbs`,
      buttons: ['OK']
    });
    alert.present();
  }

  // Recommended weight
  alertHamwi() {
    let alert = this.alertCtrl.create({
      title: 'Hamwi Formula (1964)',
      subTitle: `Ideal weight:<br>
                ${this.formula.hamwiFormula(this.current_gender, this.my_height_in)} lbs`,
      buttons: ['OK']
    });
    alert.present();
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

  // Prompt user to enter weight
  promptWeight() {
    let prompt = this.alertCtrl.create({
      title: 'Weight',
      message: "Please enter your weight in lbs",
      inputs: [
        {
          name: 'current_weight',
          placeholder: 'weight (lbs)',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            this.current_weight = data.current_weight;
            this.updateStats();
          }
        }
      ]
    });
    prompt.present();
  }
}
