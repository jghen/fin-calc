function toggleMenu() {

    const nav = document.getElementById('nav');
    const menu = document.getElementById('menu');
    const blur = document.querySelector('.blurred');

    if (nav.style.display === 'block') {
        nav.style.display = 'none';
        menu.style.display = 'block';
        blur.style.display = 'none';

    } else {
        nav.style.display = 'block';
        menu.style.display = 'none';
        blur.style.display = 'block';
    }
}
function taxCalc(){
    //inputs
    const UIlonn = document.getElementById('lonnsinntekter').value;
    const UIslan = document.getElementById('studielaan').value;
    const UIsrente = document.getElementById('studierente').value;
    const UIblan = document.getElementById('boliglaan').value;

    const UIbrente = document.getElementById('boligrente').value;
    const UIbbrok = document.getElementById('boligbrok').value;
    const UIbinnskudd = document.getElementById('bankinnskudd').value;
    const UIirente = document.getElementById('innskuddsrente').value;
    const UIbarn = document.getElementById('barn').value;

    //convert to number
    const lonn = parseFloat(UIlonn);
    const slan = parseFloat(UIslan);
    const srente = parseFloat(UIsrente) / 100;
    const blan = parseFloat(UIblan);

    const brente = parseFloat(UIbrente) / 100;
    const bbrok = parseFloat(UIbbrok) / 100;
    const binnskudd = parseFloat(UIbinnskudd);
    const irente = parseFloat(UIirente) / 100;
    const barn = parseFloat(UIbarn);

    //outputs
    const bruttoinntekt = lonn;
    const gjeldsrenter = blan * brente * bbrok + slan * srente;
    const minstefradrag = 104716;
    let foreldrefradrag;
    //foreldrefradrag
    if (barn===0){
        foreldrefradrag = 0;
    }else if (barn===1){
        foreldrefradrag = 12500;
    }else {
        foreldrefradrag = 12500 + 7500 * barn;
    }
 
    const renteinntekter = binnskudd * irente;
    const personfradrag = 56550;

    //trinnnskatt
    const trinn1nedre = 184800;
    const trinn2nedre = 260100;
    const trinn3nedre = 651250;
    const trinn4nedre = 1021550;
    let trinn1ovre;
    let trinn2ovre;
    let trinn3ovre;
    let trinn4ovre;
    
    trinn1ovre = (bruttoinntekt < trinn2nedre) ? bruttoinntekt : trinn2nedre;
    trinn2ovre = (bruttoinntekt < trinn3nedre) ? bruttoinntekt : trinn3nedre;
    trinn3ovre = (bruttoinntekt < trinn4nedre) ? bruttoinntekt : trinn4nedre;
    trinn4ovre = (bruttoinntekt >= trinn4nedre) ? bruttoinntekt : 0; 
  
    let trinn1gr;
    let trinn2gr;
    let trinn3gr;
    let trinn4gr;
    trinn1gr = (bruttoinntekt > trinn1nedre) ? trinn1ovre - trinn1nedre : 0;
    trinn2gr = (bruttoinntekt > trinn2nedre) ? trinn2ovre - trinn2nedre : 0;
    trinn3gr = (bruttoinntekt > trinn3nedre) ? trinn3ovre - trinn3nedre : 0;
    trinn4gr = (bruttoinntekt > trinn4nedre) ? trinn4ovre - trinn4nedre : 0;
    
    const trinn1 = trinn1gr * 1.7 / 100;
    const trinn2 = trinn2gr * 4.0 / 100;
    const trinn3 = trinn3gr * 13.2 / 100;
    const trinn4 = trinn4gr * 16.2 / 100;
    //trinnskatt ferdig:
    const trinnskatt = trinn1 + trinn2 + trinn3 + trinn4;
    const trygdeavgift = 82 / 1000 * bruttoinntekt;

    const alminneliginntekt = bruttoinntekt - gjeldsrenter - minstefradrag - foreldrefradrag + renteinntekter;
    const skattegrunnlag = alminneliginntekt - personfradrag;
    const fellesskatt = 220 / 1000 * skattegrunnlag;
    const skatt = trygdeavgift + fellesskatt + trinnskatt;
    const mndtrekk = skatt * 10 / 105;
    const mndbrutto = bruttoinntekt / 12;
    const prosenttrekk = mndtrekk / mndbrutto * 100;
    
    //convert to string
    const skattetrekk = prosenttrekk.toFixed(0);
    /* const alm = alminneliginntekt.toFixed(0);
    const gr = skattegrunnlag.toFixed(0);
    const felles = fellesskatt.toFixed(0);
    const aar = skatt.toFixed(0);
    const mnd = mndtrekk.toFixed(0);
    const trinn = trinnskatt.toFixed(0);
    const trygd = trygdeavgift.toFixed(0); */
 

    document.getElementById('skt').value = skattetrekk + " %";
    /* document.getElementById('alminntekt').value = alm;
    document.getElementById('sktgr').value = gr;
    document.getElementById('trygdeavgift').value = trygd;
    document.getElementById('fellesskatt').value = felles;
    document.getElementById('trinnskatt').value = trinn;
    document.getElementById('skattperaar').value = aar;
    document.getElementById('skattpermnd').value = mnd; */
    
    return false;
}
