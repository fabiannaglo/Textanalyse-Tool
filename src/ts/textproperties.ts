
const textproperties = document.querySelector('.textproperties') as HTMLDivElement;

const textpropertiesData: string[][] = [
    ["textlaenge",  "Zeichenanzahl"],
    ["wortanzahl",  "Wortanzahl"],
    ["satzanzahl",  "Satzanzahl"],
    ["dWortlaenge",  "Durchschnittliche Wortlänge"],
    ["dSatzlaenge",  "Durchschnittliche Satzlänge"],
    ["lesezeit",  "Lesezeit"],
];


export function resetTextproperties(): void{
    /*
        Die Funktion setzt die Texteigenschaften auf Standard zurück.
    */

    textproperties.innerHTML = "";
  
    for(let i:number=0; i<textpropertiesData.length; i++){
      createTextProp( textpropertiesData[i][1], "-", textpropertiesData[i][0] );
    }
}

function createTextProp(title: string, inhalt: string, cssClass: string): void{
    /*
        Die Funktion erstellt ein neues <div>-Element mit gegebenen Werten
        für die Texteigenschaften.
    */

    let newProp = document.createElement('div') as HTMLDivElement;
    newProp.innerHTML = '<div class="prop-name">' + title + '</div>';
    newProp.innerHTML += '<div class="prop-value">' + inhalt + '</div>';
    newProp.className = 'prop-item ' + cssClass;
    textproperties?.appendChild(newProp);
}
  
function changeTextProp(inhalt: any, cssClass: string): void{
    /*
        Die Funktion verändert den Wert einer Texteigenschaft.
    */

    if(document.querySelector('.prop-item.' + cssClass) as HTMLDivElement){
      let item = document.querySelector('.prop-item.' + cssClass) as HTMLDivElement;
      let val = item?.querySelector('.prop-value') as HTMLDivElement;
      val.innerHTML = inhalt;
    }
}

export function getTextproperties(text: string, textArray: string[]): void{
    /*
      Die Funktion ermittelt Grundeigenschaften, wie die Zeichen-, Wort- & Satzanzahl im eingegebenen Text.
    */
  
  
    // Textlänge
    let textlaenge: number = text.length;
  
  
    // Wortanzahl
    let wortanzahl: number = 0;
  
    if(textlaenge != 0){
      wortanzahl = textArray.length;
    }
    
  
    // Satzanzahl
    let satzanzahl: any = text;
    const satzzeichen: RegExp = /[.!?]/; // Die Satzzeichen Punkt (.), Ausrufezeichen (!) und Fragezeichen (?) trennen die Sätze. Daher wird hier getrennt.
    let saetze: string[] = satzanzahl.split(satzzeichen);
    satzanzahl = saetze.length - 1;
  
    if(satzanzahl <= 0 && textlaenge >= 1){
        satzanzahl = 1; // Wenn im Text z.B. "Hallo Welt" ohne Satzzeichen eingegeben wird, soll trotzdem ein Satz gerechnet werden.
    }
  
  
    // Durchschn. Wortlänge
    let dWortlaenge: number = 0;
    
    for(let t:number=0; t<textArray.length; t++){
      dWortlaenge += textArray[t].length;
    }
  
    dWortlaenge = dWortlaenge / wortanzahl;
    dWortlaenge = Math.round(dWortlaenge * 100) / 100;
  
  
    // Durchschn. Satzlänge
    let saetzeArray: any[] = [];
  
    for(let x:number=0; x<saetze.length; x++){
      let aktuellerSatz: any = saetze[x];
      aktuellerSatz = aktuellerSatz.replace(/[^a-zA-Z0-9üÜöÖäÄß ]/g, ' ');
      aktuellerSatz = aktuellerSatz.replace(/ /g, ',');
      aktuellerSatz = aktuellerSatz.replace(/,,/g, ',');
    
      if(aktuellerSatz.charAt(aktuellerSatz.length - 1) == ','){
        aktuellerSatz = aktuellerSatz.slice(0, -1);
      }
    
      let aktuelleWoerter: any[] = aktuellerSatz.split(",");
      for(let i:number=0; i<aktuelleWoerter.length; i++){
        if(aktuelleWoerter[i].length <= 0){
          aktuelleWoerter.splice(i, 1);
        }
      }
  
      saetzeArray.push(aktuelleWoerter.length);
    }
  
    for(let i:number=0; i<saetzeArray.length; i++){
      if(saetzeArray[i] <= 0){
        saetzeArray.splice(i, 1);
      }
    }
  
  
    let dSatzlaenge: number = 0;
    for(let i:number=0; i<saetzeArray.length; i++){
      dSatzlaenge += saetzeArray[i];
    }
  
    dSatzlaenge = dSatzlaenge / satzanzahl;
    dSatzlaenge = Math.round(dSatzlaenge * 100) / 100;
  
  
    // Lesezeit
    let lesezeit: number = wortanzahl / 150; // durchschnittlich liest der Mensch 150 Wörter pro Minute
    lesezeit = Math.round(lesezeit * 100) / 100;
    let lesezeitString: string = lesezeit.toString();
  
    if(lesezeit < 60){
      lesezeitString += ' Minuten'
    }
    if(lesezeit >= 60){
        lesezeit = lesezeit / 60;
        lesezeit = Math.round(lesezeit * 100) / 100;
        lesezeitString = lesezeit.toString();
        lesezeitString += ' Stunden';
    }
  
  
    // Mithilfe der Funktion "clearAll" werden bisher ermittelte Werte zurückgesetzt, sodass diese neu gesetzt werden können.
    //clearAll();
  
    // Die Funktion "createTextProp" wird mit 3 Werten für jede Eigenschaft aufgerufen.
    changeTextProp(textlaenge, "textlaenge");
    changeTextProp(wortanzahl, "wortanzahl");
    changeTextProp(satzanzahl, "satzanzahl");
    changeTextProp(dWortlaenge, "dWortlaenge");
    changeTextProp(dSatzlaenge, "dSatzlaenge");
    changeTextProp(lesezeitString, "lesezeit");
}