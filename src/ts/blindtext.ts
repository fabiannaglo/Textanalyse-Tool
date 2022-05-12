import { loremipsum, loremipsumde, lieuropanlingues, hinterdenwortbergen, werther, kafka, trapattoni, erhoerteleiste, typoblindtext, webstandards, pangramm } from "./blindtexteData";

const text_2 = document.querySelector('#text-2') as HTMLTextAreaElement;
const btCheckboxes = document.querySelector('.blindtext-checkboxes') as HTMLDivElement;
const btNumber = document.querySelector('#bt-number') as HTMLInputElement;
const btType = document.querySelector('#bt-type') as HTMLSelectElement;
const btAbsaetze = document.querySelector('#bt-absaetze') as HTMLInputElement;

// Blindtext
export function uniqueCheckbox(): void{
    let checkbox = btCheckboxes.querySelectorAll('input[type="checkbox"');
    let firstCheckbox = checkbox[0] as HTMLInputElement;

    for(let x: number = 0; x<checkbox.length; x++){
      let thisCheckbox = checkbox[x] as HTMLInputElement;
      thisCheckbox.removeAttribute("checked");
      thisCheckbox.checked = false;
    }

    firstCheckbox.setAttribute("checked", "true");
    firstCheckbox.checked = true;

    for(let i: number = 0; i<checkbox.length; i++){
      checkbox[i].addEventListener('change', function(){
        for(let x: number = 0; x<checkbox.length; x++){
          let thisCheckbox = checkbox[x] as HTMLInputElement;
          thisCheckbox.removeAttribute("checked");
          thisCheckbox.checked = false;
        }

        let clickedCheckbox = event?.target as HTMLInputElement;
        clickedCheckbox.setAttribute("checked", "true");
        clickedCheckbox.checked = true;

        getBlindtext();
      });
    }
}

export function getBlindtext(): void{
    let typeElem = btCheckboxes.querySelector("input[checked]") as HTMLInputElement;

    let blindtextData: string = "";

    if(typeElem.id == "loremipsum"){
      blindtextData = loremipsum;
    }
    else if(typeElem.id == "loremipsumde"){
      blindtextData = loremipsumde;
    }
    else if(typeElem.id == "lieuropanlingues"){
      blindtextData = lieuropanlingues;
    }
    else if(typeElem.id == "hinterdenwortbergen"){
      blindtextData = hinterdenwortbergen;
    }
    else if(typeElem.id == "werther"){
      blindtextData = werther;
    }
    else if(typeElem.id == "kafka"){
      blindtextData = kafka;
    }
    else if(typeElem.id == "trapattoni"){
      blindtextData = trapattoni;
    }
    else if(typeElem.id == "erhoerteleiste"){
      blindtextData = erhoerteleiste;
    }
    else if(typeElem.id == "typoblindtext"){
      blindtextData = typoblindtext;
    }
    else if(typeElem.id == "webstandards"){
      blindtextData = webstandards;
    }
    else if(typeElem.id == "pangramm"){
      blindtextData = pangramm;
    }

    let anzahl: number = parseInt(btNumber.value);
    let absaetze: number = parseInt(btAbsaetze.value);

    let output = "";

    if(btType.value == "woerter"){

      let dataArray: string[] = blindtextData.split(" ");
      let multiplikator: number = Math.ceil(anzahl / dataArray.length);

      for(let i: number = 0; i<multiplikator; i++){
        if(i != 0){
          output += ' ';
        }
        output += blindtextData;
      }

      dataArray = output.split(" ");
      
      output = "";

      for(let i: number = 0; i<anzahl; i++){
        if(i != 0){
          output += ' ';
        }
        output += dataArray[i];
      }
    }
    else if(btType.value == "zeichen"){
      if(blindtextData.length < anzahl){
        let multiplikator: number = Math.ceil(anzahl / blindtextData.length);

        for(let i: number = 0; i<multiplikator; i++){
          if(i != 0){
            output += ' ';
          }
          output += blindtextData;
        }
      }
      else{
        output = blindtextData;
      }

      output = output.substring(0, anzahl);
      text_2.value = output;
    }
    else if(btType.value == "saetze"){
      
      const satzzeichen: RegExp = /[.!?]/; // Die Satzzeichen Punkt (.), Ausrufezeichen (!) und Fragezeichen (?) trennen die Sätze. Daher wird hier getrennt.

      let textModified = blindtextData.replace(satzzeichen, satzzeichen + '|');
      let dataArray: string[] = blindtextData.split("|");
      let multiplikator: number = Math.ceil(anzahl / dataArray.length);
      multiplikator++; // Vermeidet letztes (leeres) Element

      for(let i: number = 0; i<multiplikator; i++){
        output += blindtextData;
      }

      textModified = output.replace(/[!]/g, '!|');
      textModified = textModified.replace(/[?]/g, '?|');
      textModified = textModified.replace(/[.]/g, '.|');
      dataArray = textModified.split("|");
      dataArray.length--; // Vermeidet letztes (leeres) Element

      output = "";

      for(let i: number = 0; i<anzahl; i++){
        if(i != 0){
          output += " ";
        }

        output += dataArray[i];
      }
    }

    if(absaetze > 1){
      const satzzeichen: RegExp = /[.!?]/; // Die Satzzeichen Punkt (.), Ausrufezeichen (!) und Fragezeichen (?) trennen die Sätze. Daher wird hier getrennt.
      let textModified: string = output.replace(/[!]/g, '!|');
      textModified = textModified.replace(/[?]/g, '?|');
      textModified = textModified.replace(/[.]/g, '.|');
      let dataArray: string[] = textModified.split("|");

      for(let i: number=0; i<dataArray.length; i++){
        if(dataArray[i].charAt(0) == " "){
          dataArray[i] = dataArray[i].substring(1);
        }
      }

      let trenner: number = Math.ceil(dataArray.length / absaetze);

      output = "";

      for(let i: number=0; i<dataArray.length; i++){
        if(i == 0){

        }
        else if( (i % trenner) == 0){
          output += "\n\n";
        }
        else if(i != 0){
          output += " ";
        }

        output += dataArray[i];
      }
    }

    text_2.value = output;
}