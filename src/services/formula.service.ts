import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

// Used for general functions used globally
@Injectable()
export class FormulaService {
constructor(private general: GeneralService) { }

// Robinson formula for calculating ideal weight
robinsonFormula(gender, inches) {
    if (inches < 60) {
    inches = 60;
    }
    if (gender === 'Male') {
    // Men: Ideal Body Weight (kg) = 52 kg + 1.9 kg per inch over 5 feet.
    return this.general.roundTwoDec((52 + (1.9 * (inches - 60))) * 2.2046);
    } else {
    // Women: Ideal Body Weight (kg) = 49 kg + 1.7 kg per inch over 5 feet.
    return this.general.roundTwoDec((49 + (1.7 * (inches - 60))) * 2.2046);
    }
}

  // Miller formula for calculating ideal weight
  millerFormula(gender, inches) {
    if (inches < 60) {
      inches = 60;
    }
    if (gender === 'Male') {
      // Men: Ideal Body Weight (kg) = 56.2 kg + 1.41 kg per inch over 5 feet.
      return this.general.roundTwoDec((56.2 + (1.41 * (inches - 60))) * 2.2046);
    } else {
      // Women: Ideal Body Weight (kg) = 53.1 kg + 1.36 kg per inch over 5 feet.
      return this.general.roundTwoDec((53.1 + (1.36 * (inches - 60))) * 2.2046);
    }
  }

  // Devine formula for calculating ideal weight
  devineFormula(gender, inches) {
    if (inches < 60) {
      inches = 60;
    }
    if (gender === 'Male') {
      // Men: Ideal Body Weight (kg) = 50 kg + 2.3 kg per inch over 5 feet.
      return this.general.roundTwoDec((50 + (2.3 * (inches - 60))) * 2.2046);
    } else {
      // Women: Ideal Body Weight (kg) = 45.5 kg + 2.3 kg per inch over 5 feet.
      return this.general.roundTwoDec((45.5 + (2.3 * (inches - 60))) * 2.2046);
    }
  }

  // Hamwi formula for calculating ideal weight
  hamwiFormula(gender, inches) {
    if (inches < 60) {
      inches = 60;
    }
    if (gender === 'Male') {
      // Men: Ideal Body Weight (in kilograms) = 48 kg + 2.7 kg for each inch over 5 feet
      return this.general.roundTwoDec((48 + (2.7 * (inches - 60))) * 2.2046);
    } else {
      // Women: Ideal Body Weight (in kilograms) = 45.5 kg + 2.2 kg for each inch over 5 feet.
      return this.general.roundTwoDec((45.5 + (2.2 * (inches - 60))) * 2.2046);
    }
  }

    // Calculate BMI given weight and height
    calculateBMI(weight, height) {
        // BMI = weight (lb) ÷ height2 (in2) × 703
        const bmi = weight / Math.pow(height, 2) * 703;
        return this.general.roundTwoDec(bmi);
    }
    // Calculate weight for BMI and height
  calculateWeightFromBMI(BMI, height) {
    const weight = (BMI * (Math.pow(height, 2))) / 703;
    return this.general.roundTwoDec(weight);
  }
  // Recommended weight in lbs based on BMI
  recommendedWeight(height_in) {
    return {
      min: this.calculateWeightFromBMI(18.5, height_in),
      max: this.calculateWeightFromBMI(24.9, height_in)
    }
  }
}
