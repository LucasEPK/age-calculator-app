function date_validation(day,month,year) {
    /*
    checks if:

    - Any field is empty when the form is submitted
    - The day number is not between 1-31
    - The month number is not between 1-12
    - The year is in the future
    - The date is invalid e.g. 31/04/1991 (there are 30 days in April) 
    */
    event.preventDefault(); //this makes the page not refresh

    let empty_year = false;
    let empty_month = false;
    let empty_day = false;
    if (year.value == "") {
        empty_year = true;
    }
    if (month.value == "") {
        empty_month = true;
    }
    if (day.value == "") {
        empty_day = true;
    }

    if (empty_day || empty_month || empty_year) {
        //there are empty fields

        if (empty_day) {
            console.error('the day field is empty');
        }
        if (empty_month) {
            console.error('the month field is empty');
        }
        if (empty_year) {
            console.error('the year field is empty');
        }

    } else {
        //no empty fields
        
        //this boolean variables are for checking the validity of the date
        let valid_year = false;
        let valid_month = false;
        let valid_day = false;
        let valid_date = false;
        
        let current_date = new Date();
        let current_year = current_date.getFullYear();

        if (year.value >= 0 && year.value < current_year) { 
            console.log('valid year '+year.value);
            valid_year = true;
        } else {
            //error year in the future
            console.error('year in the future');
        }
    
        if (month.value >= 1 && month.value <= 12) {
            console.log('valid month '+month.value);
            valid_month = true;
        } else {
            //error invalid month
            console.error('invalid month');
        }
    
        if (day.value >= 1 && day.value <= 31) {
            console.log('valid day '+day.value);
            valid_day = true;
        } else {
            //error invalid day
            console.error('invalid day');
        }
    
        if (valid_year && valid_month && valid_day) {
            //here we check if the day is right depending on the month and the year
            if (month.value == 1 || month.value == 3 || month.value == 5 || month.value == 7 || month.value == 8 || month.value == 10 || month.value == 12) { //months with 31 days
    
                console.log('month with 31 days');
                if (day.value <= 31) {
                    valid_date = true;
                }
    
            } else if(month.value == 2) { // february
    
                if (year.value % 100 == 0) {//secular year
                    if (year.value % 4 == 0 && year.value % 400 == 0) {//leap year
                        console.log('leap year');
                        if (day.value <= 29) {
                            valid_date = true;
                        }
                    } else { //not a leap year
                        console.log('not a leap year');
                        if (day.value <= 28) {
                            valid_date = true;
                        }
                    }
                } else { //not secular year
                    if (year.value % 4 == 0) {//leap year
                        console.log('leap year');
                        if (day.value <= 29) {
                            valid_date = true;
                        }
                    }else { //not a leap year
                        console.log('not a leap year');
                        if (day.value <= 28) {
                            valid_date = true;
                        }
                    }
                }
    
            } else { //months with 30 days
                console.log('month with 30 days');
    
                if (day.value <= 30) {
                    
                    valid_date = true;
                }
    
            }
        }
    
        if (valid_date) {
            //if the date is valid we calculate the age
            console.log('valid date');
        
            calculate_age(day,month,year)
        } else {
            //invalid date
            console.error('invalid date');
        }

    }

}

function calculate_age(day,month,year) { //this functions receives valid day month and year submitted and outputs in the html the age
    let current_date = new Date();

    let current_day = current_date.getDate();
    let current_month = current_date.getMonth()+1;
    let current_year = current_date.getFullYear();
    console.log('current_day'+current_day);
    console.log('current_month'+current_month);
    console.log('current_year'+current_year);

    //first we check if the birthday has passed already (if it's the birthday then we count it as if it passed)
    let birthday_passed = false;

    if (month.value < current_month) { //birthday month passed
        
        birthday_passed = true;
    } else if(month.value == current_month && day.value <= current_day){ //we are in the birthday month and we check if the day already passed or not
        birthday_passed = true;
    }

    let age_years;
    let age_months;
    let age_days;

    if (birthday_passed){
        //if the birthday passed already then we subtract
        console.log('birthday passed');

        age_years = current_year - year.value;
        age_months = current_month - month.value;
        age_days = current_day - day.value;
    } else {
        //if the birthday didn't pass we subtract the years, subtract 1 more and the days and month are the current ones
        console.log('birthday hasnt passed');

        age_years = current_year - year.value;
        age_years -= 1;
        age_months = current_month;
        age_days = current_day;
    }

    console.log('age_years:'+age_years);
    console.log('age_months:'+age_months);
    console.log('age_days:'+age_days);

    print_to_html(age_years, age_months, age_days)
}

function print_to_html(years, months, days) {
    //here we take the age as parameters and output it to the html with an animation 

    //this objects and the array are created to make code more compact
    let years_obj = {
        selector: ".js-age-years",
        value: years
    };

    let months_obj = {
        selector: ".js-age-months",
        value: months
    }
    
    let days_obj = {
        selector: ".js-age-days",
        value: days
    }
    let ages = [years_obj, months_obj, days_obj];

    let interval = 1000;

    ages.forEach(age => {
        //for each age parameter (years, months,days) we display the numbers going up in an animation till it reaches the proper number using setinterval function

        let i = 0;
        let duration = interval/age.value; //this makes the number complete in the interval time

        console.log(duration);

        let counter = setInterval(() => {
            i += 1;
            
            document.querySelector(age.selector).textContent = i; //textContent is similar to innerHtml
    
            if (i == age.value) {
                clearInterval(counter);
            }
        }, duration);
    });


}
    