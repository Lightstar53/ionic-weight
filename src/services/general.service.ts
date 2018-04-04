import { Injectable } from '@angular/core';


// Used for general functions used globally
@Injectable()
export class GeneralService {
    constructor() { }

    // Round to nearest 2 decimal places
    roundTwoDec(weight) {
        return weight.toFixed(2);
    }

    // Return array from heights 5ft to 7ft
    listAllHeights() {
        function range(start, edge, step = 1) {
        // If only one number was passed in make it the edge and 0 the start.
        if (arguments.length == 1) {
            edge = start;
            start = 0;
        }
        // Validate the edge and step numbers.
        edge = edge || 0;
        step = step || 1;
        // Create the array of numbers, stopping befor the edge.
        for (var ret = []; (edge - start) * step > 0; start += step) {
            ret.push(start);
        }
        return ret;
        }
        const seq = range(58, 76); // Range from 60 - 84 inches
        return seq;
    }

    // Return year
    getYearFromDate(date) {
        return new Date(date).getFullYear();
    }

    // Return array of years from data
    getYearsFromData(l_dates) {
        const years = [];
        for (const date of l_dates) {
        const year = this.getYearFromDate(date);
        if (years.indexOf(year) === -1) {
            years.push(year);
        }
        }
        return years;
    }

    // Converts date to MM/DD/YYYY format
    getShortDate(given_date) {
        const date = new Date(given_date);
        let dd = date.getDate();
        let mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear().toString();
        return mm + '/' + dd + '/' + yyyy.slice(2,4);
    }

    // Calculate weight lost
    totalWeightLost(l_weight) {
        const min = this.getMin(l_weight);
        const max = this.getMax(l_weight);
        console.log(l_weight, min, max)
        return this.roundTwoDec(max-min);
    }

    // Min
    getMin(l_weight) {
        return Math.min(...l_weight);
    }
    // Max
    getMax(l_weight) {
        return Math.max(...l_weight);
    }

    // Calculate total days
    totalDaysPassed(l_days) {
        const one_day = 1000 * 60 * 60 * 24;    // Convert both dates to milliseconds
        const min = new Date(l_days[0]).getTime();
        const max = new Date(l_days[l_days.length - 1]).getTime();

        return Math.round((max-min)/ one_day);
    }

    // Get height in inches
    getHeightInches(height) {
        const feet = parseInt(height[0]);
        const inches = parseInt(height.slice(2, height.length));
        return inches + (feet * 12);
    }

    // Get height in ft, inches
    getHeight(inches) {
        const feet = Math.floor(inches / 12);
        inches %= 12;
        return `${feet},${inches}`;
    }
    // Get time in weeks
    getWeeks(days) {
        const weeks = Math.floor(days/7);
        return weeks;
    }
}
