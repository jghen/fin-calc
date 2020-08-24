function hideOrToggleMenu() {

    const nav = document.getElementById('nav');
    const menu = document.getElementById('menu');

    if (nav.style.display === 'block') {
        nav.style.display = 'none';
        menu.style.display = 'block';

    } else {
        nav.style.display = 'block';
        menu.style.display = 'none';
    }
}
function utleieCalc(){
    //inputs
    const UIpris = document.getElementById('totalpris').value;
    const UIek = document.getElementById('egenkapital').value;
    const UIrente = document.getElementById('laanerente').value;
    const UIlanetid = document.getElementById('nedbetalingstid').value;
    const UIleie = document.getElementById('leieinntekt').value;
    const UIfk = document.getElementById('felleskostnader').value;
    const UIkomm = document.getElementById('kommunale').value;
    const UIdiv = document.getElementById('diverse').value;
    const UIvedl = document.getElementById('vedlikehold').value;
    const UIledig = document.getElementById('ledighet').value;

    //convert to number
    const pris = parseFloat(UIpris);
    const ek = parseFloat(UIek);
    const calcinterest = parseFloat(UIrente) / 100;
    const calcyears = parseFloat(UIlanetid);
    const leie = parseFloat(UIleie);
    const fk = parseFloat(UIfk);
    const kommunaleavgifter = parseFloat(UIkomm)/12;
    const div = parseFloat(UIdiv);
    const vedlikeholdmonthly = parseFloat(UIvedl) / 12;
    const vacancymonths = parseFloat(UIledig);

    //totalt lån
    const calcbalance = pris - ek;

    //mnd total betaling på lån
    // calculate payments = Loan * r / (1-(1+r)^-n) 
    // (1+r)^-n is the same as 1/(1+r)^n
    const y = 1 / Math.pow(1 + calcinterest, calcyears);
    const yearlypmt = calcbalance * calcinterest / (1 - y);
    const monthlypmt = yearlypmt / 12;

    //mnd renter  og avdrag på lån
    const renterfirstmonth = calcinterest * calcbalance /12;
    const avdragfirstmonth = monthlypmt  - renterfirstmonth; 

    //vakanse omregnet prosent og månedlig kroner
    const vacprosent = vacancymonths / 12;
    const vakansemonthly = leie * vacprosent;

    //skatt
    
    const nettobeforetax = leie - fk - kommunaleavgifter - div - vakansemonthly - vedlikeholdmonthly;
    const skattesats = 22 / 100;
    const skatt = skattesats * nettobeforetax;

    //rentefradrag
    const rentefradragmonthly = skattesats * renterfirstmonth;

    //netto leie etter skatt
    const netto = nettobeforetax - skatt;

    //cashflow
    const cashmonthly = netto - avdragfirstmonth - renterfirstmonth + rentefradragmonthly;
    
    //avkastning på egenkapital = (årlig netto - renter + rentefradrag) / egenkapital
    const returnmonthly = netto - renterfirstmonth + rentefradragmonthly;
    const annualreturn = 12 * returnmonthly / ek * 100;

    //convert to string
    const avkastning = annualreturn.toFixed(1);
    const ut = leie.toFixed(0);
    const fkost = fk.toFixed(0);
    const kavg = kommunaleavgifter.toFixed(0);
    const dkost = div.toFixed(0);
    const lkost = vakansemonthly.toFixed(0);
    const vkost = vedlikeholdmonthly.toFixed(0);
    const skost = skatt.toFixed(0);
    const nkost = netto.toFixed(0);
    const akost = avdragfirstmonth.toFixed(0);
    const rkost = renterfirstmonth.toFixed(0);
    const rfradrag = rentefradragmonthly.toFixed(0);
    const cash = cashmonthly.toFixed(0);
 
    document.getElementById('aarligavkastning').value = "Årlig avkastning på EK: " + avkastning + " %";
    document.getElementById('utleiekost').value = ut;
    document.getElementById('felleskost').value = "- " + fkost;
    document.getElementById('kommavg').value = "- " + kavg;
    document.getElementById('divkost').value = "- " + dkost;
    document.getElementById('ledigkost').value = "- " + lkost;
    document.getElementById('vedlkost').value = "- " + vkost;
    document.getElementById('skattekost').value = "- " + skost;
    document.getElementById('nettokost').value = "= " + nkost;
    document.getElementById('avdragskost').value = "- " + akost;
    document.getElementById('rentekost').value = "- " + rkost;
    document.getElementById('rentefradrag').value = "+ " + rfradrag;
    document.getElementById('cashflow').value = "= " + cash;
    

    return false;
}
