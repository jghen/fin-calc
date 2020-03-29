function hideOrToggleMenu() {

    const nav = document.getElementById('nav');
    const menu = document.getElementById('menu');
    const h3 = document.getElementById('h3center');

    if (nav.style.display === 'block') {
        nav.style.display = 'none';
        menu.style.display = 'block';
        h3.style.margin = 'inherit';

    } else {
        nav.style.display = 'block';
        menu.style.display = 'none';
        h3.style.marginRight = '-7rem';
    }
}
//neds jquery to work 
function commaSeparateNumber(index, val) {
    val = val.replace(/\D/g, '');
    var array = val.split('');
    var index = -3;
    while (array.length + index > 0) {
        array.splice(index, 0, ".");
        // Decrement by 4 since we just added another unit to the array.
        index -= 4;
    }
    return array.join('');
};
//neds jquery to work 
$(document).on('keyup', '.number', function () {
    $(this).val(commaSeparateNumber);
});

function loanMonthly() {
    //get values     
    const UIbalance = document.getElementById('balance').value;
    const UIyears = document.getElementById('years').value;
    const UIinterest = document.getElementById('interest').value;

    // convert from string to number
    const calcbalance = parseFloat(UIbalance);
    const calcyears = parseFloat(UIyears) * 12;
    const calcinterest = parseFloat(UIinterest) / 100 / 12;

    // calculate payments = Loan * r / (1-(1+r)^-n) 
    // (1+r)^-n is the same as 1/(1+r)^n
    const y = 1 / Math.pow(1 + calcinterest, calcyears);
    const monthly = calcbalance * calcinterest / (1 - y);
    
    //convert to string
    const monthlypayment = monthly.toFixed(0);

    //show results:
    document.getElementById('pmt').value = monthlypayment;

    //prevent the form from clearing right after calculation:
    return false;

}

function savingsMonthly() {

    const Sbalance = document.getElementById('balance').value;
    const Spayment = document.getElementById('payment').value;
    const Syears = document.getElementById('years').value;
    const Sinterest = document.getElementById('interest').value;

    // convert from string to number
    const principal = parseFloat(Sbalance);
    const monthlypayment = parseFloat(Spayment);
    const terms = parseFloat(Syears)*12;
    const r = parseFloat(Sinterest)/100/365*360/12; 
    
    // a single contribution = principal*r^n
    const singleContribution = principal * Math.pow(1+r, terms);


    //monthly savings grows to = pmt +pmt*r^1 + pmt*r^2 + pmt*r^3 + ...... +  = sum(pmt*r^i)

    let i = 0; //use let to make it changeable.
    const newPrincipal = [0]; //create new array with value = 0
    const valueFirstMonth = monthlypayment; //value first month is the initial principal
    newPrincipal[0]=valueFirstMonth; //insert value first month in position 0

         while (i < terms+1) {
        let valuePos0 = newPrincipal[i]; //use let
        let valuePos1 = valuePos0 + monthlypayment* Math.pow(1+r,i+1); //use let
        newPrincipal.push(valuePos1); //push new balance to next position in the array
        i=i+1;
    }
    //get the last element in the array
    const lastelement = newPrincipal[terms-1];
    const totalbalance = Math.round(singleContribution + lastelement);
    const endbalance = totalbalance.toLocaleString('en-US');
    document.getElementById('savings').value = endbalance;
    return false; 

}

function retirementYearly (){
    let fund = document.getElementById('Rbalance').value;
    const withdrawal = document.getElementById('withdrawal').value;
    const returnrate = document.getElementById('return').value;

    //remove commas
    const noCommaFund = fund.split('.').join("");
   
    //convert to number
    const balance = parseFloat(noCommaFund);
    const withdraw = parseFloat(withdrawal);
    const r = 1 + parseFloat(returnrate)/100; //r = 1 + interest
    
    const pensionFund=[0];
    pensionFund[0] = balance; //position 0 in array pensionFund = balance of pensionfund at year 0;

    let i = 0;
    const upper = withdraw;

    // formula: year i+1 start = pensionFund[i+1] = pensionFund[i] * r - withdraw 

    //y0 start: fund = [1000]
    //i = 0, y1 start: 1000 - 500 * 110% = 550,  fund = [1000, 550], first loop done, i = 1
    //i = 1, y2 start: 550 - 500 * 110% = 55, fund [1000, 600, 55], second loop done, i = 2
    // i = 2 y3start: will not start year 3. because pensionFund[i=2] = pensionFund[3] < 500
    // length = 3, array = [1000, 600, 100]


    while (pensionFund[i] > upper && pensionFund.length-1 < 100) {
            let startOfYear = (pensionFund[i]); //convert to number: fund balance at i
            let endOfYear = r * (startOfYear - withdraw); //number: fund balance at i+1
            pensionFund.push(endOfYear); //push the fund balance (string) at i+1
            i=i+1;
    }

    const lastBalance = pensionFund[pensionFund.length-1]; //get last balance
    const lastYears = pensionFund.length-1; 
    const y = lastYears.toFixed(0); //convert lasting years to string
    let extraMonths = 0;

    if (lastBalance >= withdraw/12 && lastYears<100) {
        extraMonths = Math.round(lastBalance / withdraw * 12); // how many months wil last balance last?
        const m = extraMonths.toFixed(0); //convert lasting months to string 
        document.getElementById('fundLasts').value = y + ' years, ' + m + ' months';

    } else if (lastBalance < withdraw && lastYears<100) {
        document.getElementById('fundLasts').value = y + ' years, 0 months';

    } else {
        document.getElementById('fundLasts').value = "100+ yrs. You're OK..";
    }

    return false;
}
