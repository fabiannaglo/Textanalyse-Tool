// scss wird importiert
import '../css/style.scss';

// ts-Funktionen einladen
import { mouseMove } from "./customCursor";
import { resetTextproperties, getTextproperties } from "./textproperties";
import { resetKeywords, getKeywords } from "./keywords";
import { changeMode } from "./darkmode";

// Funktion, die ausgeführt wird, sobald die Seite geladen hat
window.onload = () => {
  loaded();
};

// Funktion, die ausgeführt wird, sobald die Maus bewegt wird (Custom Cursor)
window.onmousemove = (e) => {
  mouseMove(e);
}

// Feste Variablen werden definiert
const text_1 = document.querySelector('#text-1') as HTMLTextAreaElement;
const modeButton = document.querySelector('.mode') as HTMLDivElement;





function loaded(){
  resetAll();
  funktionenZuweisen();
}

function resetAll(){
  text_1.value = "";
  resetTextproperties();
  resetKeywords();
}



function funktionenZuweisen(){
  /*
    Dem Textfeld wird ein Event hinzugefügt.

    Das Event bewirkt, dass bei einer Eingabe die Funktion "textAnalysieren"
    ausgeführt wird. Vorher werden alle Output-Felder zurückgesetzt.
    Wenn in das Textfeld etwas eingefügt bzw. verändert wird, wird die Funktion "textAnalysieren" ausgeführt.
    Vorher werden alle Felder geleert und auf Standard gesetzt.
  */
  text_1?.addEventListener('input', function(){
    let text: string = text_1.value;

    if(text.length <= 0){
      resetTextproperties();
      resetKeywords();
    }
    else{
      resetTextproperties();
      resetKeywords();
      textAnalysieren(text);
    }
  });

  // Wechsel zwischen Light- & Darkmode durch einen Button-Klick
  modeButton.addEventListener('click', changeMode);
}

function textAnalysieren(text: string){
  /*
    Der eingegebene Text wird in dieser Funktion analysiert.

    Zuerst wird der Text in einen Array geteilt, der einzelne Wörter beinhaltet.
  */
  let textSplitted: string = text.replace(/[^a-zA-Z0-9üÜöÖäÄß ]/g, ' ');
  textSplitted = textSplitted.replace(/ /g, ',');
  textSplitted = textSplitted.replace(/,,/g, ',');

  if(textSplitted.charAt(textSplitted.length - 1) == ','){
    textSplitted = textSplitted.slice(0, -1);
  }

  let textArray: string[] = textSplitted.split(",");
  
  // Leere Elemente im Array werden entfernt
  for(let i:number=0; i<textArray.length; i++){
    if(textArray[i].length <= 0){
      textArray.splice(i, 1);
    }
  }
  for(let i:number=0; i<textArray.length; i++){
    if(textArray[i].length <= 0){
      textArray.splice(i, 1);
    }
  }


  // Zwei Funktionen werden ausgeführt und die ermittelten Werte übergeben
  getTextproperties(text, textArray);
  getKeywords(textArray);
}