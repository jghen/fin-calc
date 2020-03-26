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

    let i = 0;
    const newPrincipal = [0]; //create new array with value = 0
    const valueFirstMonth = monthlypayment; //value first month is the initial principal
    newPrincipal[0]=valueFirstMonth //insert value first month in position 0

         while (i < terms+1) {
        let valuePos0 = newPrincipal[i];
        let valuePos1 = valuePos0 + monthlypayment* Math.pow(1+r,i+1);
        newPrincipal.push(valuePos1);
        i=i+1;
    }
    //get the last element in the array
    const lastelement = newPrincipal[terms-1];
    const totalbalance = singleContribution + lastelement;
    const endbalance = totalbalance.toFixed(0);
    document.getElementById('savings').value = endbalance;
  
    return false; 

}
