
function loanMonthly(){
          //get values     
    const UIbalance = document.getElementById('balance').value;
    const UIyears = document.getElementById('years').value;
    const UIinterest = document.getElementById('interest').value;

    // calculate numbers
    const calcbalance = parseFloat(UIbalance);
    const calcyears = parseFloat(UIyears) * 12;
    const calcinterest = parseFloat(UIinterest) / 100 / 12;

    // calculate payments = Loan * r / (1-(1+r)^-n) 
    // (1+r)^-n = 1/(1+r)^n
    const y = 1 / Math.pow(1 + calcinterest, calcyears);
    const monthly = calcbalance * calcinterest /(1-y);
    const monthlypayment = monthly.toFixed(0);

    //show results
    document.getElementById('pmt').value = monthlypayment;
    return false;
    
};


function hideOrToggleMenu(){

    const nav = document.getElementById('nav');
    const menu = document.getElementById('menu');
    const h3 = document.getElementById('h3center');

    if (nav.style.display === 'block'){
        nav.style.display = 'none';
        menu.style.display = 'block';
        h3.style.margin = 'inherit';
        
    }
    else{
        nav.style.display = 'block';
        menu.style.display = 'none';
        h3.style.marginRight ='-7rem';

    }
}; 

