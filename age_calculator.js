async function date_validation(day,month,year) {
    /*
    checks if:

    - Any field is empty when the form is submitted
    - The day number is not between 1-31
    - The month number is not between 1-12
    - The year is in the future
    - The date is invalid e.g. 31/04/1991 (there are 30 days in April) 
    */
    event.preventDefault(); //this makes the page not refresh

    //this resets the numbers in case there's an animation going on
    //this timeout is necessary to wait for the animation to realize it has to stop (setinterval)
    delay(10);
    document.querySelector(".js-age-years").textContent = "- -";
    document.querySelector(".js-age-months").textContent = "- -";
    document.querySelector(".js-age-days").textContent = "- -";
    //this resets the error messages
    document.querySelector(".empty-day").style.display = "none";
    document.querySelector(".label_input-day").style.border = "1px solid hsl(0, 0%, 86%)";
    document.querySelector(".calendar_txt-day").style.color = "hsl(0, 1%, 44%)";
    document.querySelector(".empty-month").style.display = "none";
    document.querySelector(".label_input-month").style.border = "1px solid hsl(0, 0%, 86%)";
    document.querySelector(".calendar_txt-month").style.color = "hsl(0, 1%, 44%)";
    document.querySelector(".empty-year").style.display = "none";
    document.querySelector(".label_input-year").style.border = "1px solid hsl(0, 0%, 86%)";
    document.querySelector(".calendar_txt-year").style.color = "hsl(0, 1%, 44%)";
    
    document.querySelector(".invalid-year").style.display = "none";
    document.querySelector(".invalid-month").style.display = "none";
    document.querySelector(".invalid-day").style.display = "none";
    document.querySelector(".invalid-date").style.display = "none";


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
            document.querySelector(".empty-day").style.display = "block";
            document.querySelector(".label_input-day").style.border = "1px solid hsl(0, 100%, 67%)";
            document.querySelector(".calendar_txt-day").style.color = "hsl(0, 100%, 67%)";
        }
        if (empty_month) {
            console.error('the month field is empty');
            document.querySelector(".empty-month").style.display = "block";
            document.querySelector(".label_input-month").style.border = "1px solid hsl(0, 100%, 67%)";
            document.querySelector(".calendar_txt-month").style.color = "hsl(0, 100%, 67%)";
        }
        if (empty_year) {
            console.error('the year field is empty');
            document.querySelector(".empty-year").style.display = "block";
            document.querySelector(".label_input-year").style.border = "1px solid hsl(0, 100%, 67%)";
            document.querySelector(".calendar_txt-year").style.color = "hsl(0, 100%, 67%)";
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
            document.querySelector(".invalid-year").style.display = "block";
            document.querySelector(".label_input-year").style.border = "1px solid hsl(0, 100%, 67%)";
            document.querySelector(".calendar_txt-year").style.color = "hsl(0, 100%, 67%)";
        }
    
        if (month.value >= 1 && month.value <= 12) {
            console.log('valid month '+month.value);
            valid_month = true;
        } else {
            //error invalid month
            console.error('invalid month');
            document.querySelector(".invalid-month").style.display = "block";
            document.querySelector(".label_input-month").style.border = "1px solid hsl(0, 100%, 67%)";
            document.querySelector(".calendar_txt-month").style.color = "hsl(0, 100%, 67%)";
        }
    
        if (day.value >= 1 && day.value <= 31) {
            console.log('valid day '+day.value);
            valid_day = true;
        } else {
            //error invalid day
            console.error('invalid day');
            document.querySelector(".invalid-day").style.display = "block";
            document.querySelector(".label_input-day").style.border = "1px solid hsl(0, 100%, 67%)";
            document.querySelector(".calendar_txt-day").style.color = "hsl(0, 100%, 67%)";
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


            if (valid_date) {
                //if the date is valid we calculate the age
                console.log('valid date');
            
                calculate_age(day,month,year)
            } else {
                //invalid date
                console.error('invalid date');
    
                document.querySelector(".invalid-date").style.display = "block";
                document.querySelector(".label_input-day").style.border = "1px solid hsl(0, 100%, 67%)";
                document.querySelector(".calendar_txt-day").style.color = "hsl(0, 100%, 67%)";
                document.querySelector(".label_input-month").style.border = "1px solid hsl(0, 100%, 67%)";
                document.querySelector(".calendar_txt-month").style.color = "hsl(0, 100%, 67%)";
                document.querySelector(".label_input-year").style.border = "1px solid hsl(0, 100%, 67%)";
                document.querySelector(".calendar_txt-year").style.color = "hsl(0, 100%, 67%)";
            }
        }
    

    }

}

function delay(n) { // sync timeout
    n = n || 2000;
    return new Promise(done => {
      setTimeout(() => {
        done();
      }, n);
    });
}

function calculate_age(day,month,year) { //this functions receives valid day month and year submitted and outputs in the html the age
    let current_date = new Date();

    let current_day = current_date.getDate();
    let current_month = current_date.getMonth()+1;
    let current_year = current_date.getFullYear();
    console.log('current_day'+current_day);
    console.log('current_month'+current_month);
    console.log('current_year'+current_year);

    //first we check if the date has passed already (if it's the date then we count it as if it passed)
    let date_passed = false;

    if (month.value < current_month) { //date month passed
        console.log('month passed');
        date_passed = true;
    } else if(month.value == current_month && day.value <= current_day){ //we are in the date month and we check if the day already passed or not
        console.log('day passed');
        date_passed = true;
    }

    let age_years;
    let age_months;
    let age_days;

    if (date_passed){

        console.log('date passed');
        age_years = current_year - year.value;
        age_months = current_month - month.value;

        if (current_day >= day.value) { //this is to make sure the days are calculated right based on if the current day is after the date day or before
            age_days = current_day - day.value;
        } else {
            age_days = (previous_month_days(month.value)-day.value)+current_day;

            age_months -= 1; //this happens when the date day hasn't passed
        }


    } else {
        //if the date didn't pass we subtract the years, subtract 1 more, the months are 12 minus the different between date month and current month (-1 if the date day has not passed) and the days are the total days in the previous month minus the date day plus the current day

        console.log('date hasnt passed');

        age_years = current_year - year.value;
        age_years -= 1;

        age_months = 12-(month.value - current_month);

        if (current_day >= day.value) {//this is to make sure the days are calculated right based on if the current day is after the date day or before
            age_days = current_day - day.value;
        } else {
            age_days = (previous_month_days(month.value)-day.value)+current_day;

            age_months -= 1; //this happens when the date day hasn't passed
        }

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

        let counter_reset = false;

        let counter = setInterval(() => {
            
            document.querySelector(".arrow_icon").addEventListener("click", function() {//this is necessary to stop the animation once the submit button has been pressed
                counter_reset = true;
            })
            
            document.querySelector(age.selector).textContent = i; //textContent is similar to innerHtml
            
            if (i == age.value || counter_reset == true) {
                clearInterval(counter);
            }
            
            i += 1;
        }, duration);
    });


}

function previous_month_days(current_month) {
    const JANUARY = 1;
    const FEBRUARY = 2;
    const MARCH = 3;
    const MAY = 5;
    const JULY = 7;
    const AUGUST = 8;
    const OCTOBER = 10;
    const DECEMBER = 0; //it's 0 because if the current month is january(1) then the previous is gonna be 0

    if (current_month - 1 == JANUARY || current_month - 1 == MARCH || current_month - 1 == MAY || current_month - 1 == JULY || current_month - 1 == AUGUST || current_month - 1 == OCTOBER || current_month - 1 == DECEMBER) { //months with 31 days
        
        return 31;
    } else if(current_month - 1 == FEBRUARY) { // february

        if (year.value % 100 == 0) {//secular year
            if (year.value % 4 == 0 && year.value % 400 == 0) {//leap year

                return 29;
            } else { //not a leap year
                
                return 28;
            }
        } else { //not secular year
            if (year.value % 4 == 0) {//leap year
                
                return 29;
            }else { //not a leap year
                
                return 28;
            }
        }
    } else { //months with 30 days

        return 30;
    }
}
    