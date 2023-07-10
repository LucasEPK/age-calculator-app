function date_validation(day,month,year) {

    let valid_year = false;
    let valid_month = false;
    let valid_day = false;
    let valid_date = false;
    
    if (year.value >= 0 && year.value < 2023) {
        valid_year = true;
    } else {
        //error year in the future
    }

    if (month.value >= 1 && month.value <= 12) {
        valid_month = true;
    } else {
        //error invalid year
    }

    if (day.value >= 1 && day.value <= 31) {
        valid_day = true;
    } else {
        //error invalid day
    }

    if (valid_year && valid_month && valid_day) {
        //here we check if the day is right
    }

    if (valid_date) {
        calculate_age(day,month,year)
    } else {
        //invalid date
    }
}

function calculate_age(day,month,year) {//this functions receives valid day month and year submitted and outputs in the html the age
    
}