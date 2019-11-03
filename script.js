var teller;
var alle_tall = [];
var vennetype;
// var resultater;
var vennetall1;
var vennetall2;
var debug = true;
var oppgavenr;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// debug print
function dp (text) {
  if (debug) {console.log(text)};
}

// Lager HTML-kode for sprøsmål
function lag_sporsmal(tall1, tall2) {
  // dp ("func lag_sporsmal");
  
  var x = "";
  if (Math.floor(Math.random() * 100) + 1 < 50) {
    brukersvar_forst = false;
    x += tall1 + " + ";
    x += '<input autocomplete="false" maxlength="1" type="text" inputmode="numeric" id=svar onInput="skriv_nytt_sporsmal()"></input>';
  } else {
    brukersvar_forst = true;
    x += '<input autocomplete="false" maxlength="1" type="text" inputmode="numeric" id=svar onInput="skriv_nytt_sporsmal()"></input>';
    x += " + " + tall1;
  }
  x += " = " + (tall1 + tall2) + " ";
  // x += "<input type=submit value=Svar>";
  // x += "</form></p>";

  return x;
}

function sjekk_svar (brukersvar) {
  if (brukersvar_forst == true) {
    regnestykke = brukersvar + "+" + aktivt_tall + "=" + vennetype;
  } else {
    regnestykke = aktivt_tall + "+" + brukersvar + "=" + vennetype;
  }
  
  if ((vennetype - aktivt_tall - brukersvar) !== 0) {
    resultat_text = '<p class="feil_svar">Feil svar: ' + regnestykke + '</p>';
  } else {
    resultat_text = '<p class="riktig_svar">Riktig svar: ' + regnestykke + '</p>';
  }
  console.log(aktivt_tall + "+" + brukersvar + "=" + vennetype);
  document.getElementById("resultater").innerHTML += resultat_text;
}

function skriv_nytt_sporsmal () {
  dp ("func skriv_nytt_sporsmal");

  
  if (oppgavenr != 0) {
    brukersvar = document.getElementById("svar").value;
    if (brukersvar == "" || !(brukersvar.match(/[0-9]{1}/))) {
      document.getElementById("feilmelding").innerHTML = "Skriv tall mellom 0 og 9";
      return;
    } else {
      document.getElementById("feilmelding").innerHTML = "";
      sjekk_svar(brukersvar);
    }
  }
  oppgavenr += 1;
  if (oppgavenr <= alle_tall.length) {
    aktivt_tall = alle_tall[oppgavenr - 1];
    document.getElementById("sporsmal").innerHTML = lag_sporsmal(aktivt_tall, vennetype - aktivt_tall);
    document.getElementById("svar").focus();
  } else {
    document.getElementById("svar").blur();
    document.getElementById("sporsmalboks").style.display = "none";
    document.getElementById("ferdigboks").style.display = "block";
  }
}

// Finn en tilfeldig vennetype mellom 1 og 10
vennetype = Math.floor(Math.random() * 10) + 1;
document.getElementById("overskrift").innerHTML = vennetype + "-venner";

// Legg alle tall i en array
for (teller = 1; teller <= vennetype; teller++) {
  alle_tall.push(teller);
}

// Lag tilfeldig rekkefølge i array
shuffle(alle_tall);

// Start på oppgave nummer 0
oppgavenr = 0;

skriv_nytt_sporsmal ();