//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!

import '../css/style.scss';

window.onload = () => {
  loaded();
};

window.onmousemove = (e) => {
  mouseMove(e);
}

function mouseMove(e:any){

  let posTop = e.clientY;
  posTop = posTop - (cursor.clientWidth/2);
  let posLeft = e.clientX;
  posLeft = posLeft - (cursor.clientHeight/2);


  cursor.style.top = posTop + 'px';
  cursor.style.left = posLeft + 'px';
}

const text_1 = document.querySelector('#text-1') as HTMLTextAreaElement;
const textproperties = document.querySelector('.textproperties') as HTMLDivElement;
const keywordList = document.querySelector('.keyword-list') as HTMLDivElement;
const cursor = document.querySelector('.cursor') as HTMLDivElement;
const modeButton = document.querySelector('.mode') as HTMLDivElement;


function loaded(){
  loadedClear();
  funktionenZuweisen();
}

function funktionenZuweisen(){
  text_1?.addEventListener('input', function(){
    let text = text_1.value;

    if(text.length <= 0){
      clearAll();
      loadedClear();
    }
    else{
      textAnalysieren(text);
    }
  });

  modeButton.addEventListener('click', changeMode);
}

function changeMode(){
  if(document.body.classList.contains('light')){
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  }
  else{
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  }
}

function textAnalysieren(text: string){
  let textSplitted = text.replace(/[^a-zA-Z0-9üÜöÖäÄß ]/g, ' ');
  textSplitted = textSplitted.replace(/ /g, ',');
  textSplitted = textSplitted.replace(/,,/g, ',');

  if(textSplitted.charAt(textSplitted.length - 1) == ','){
    textSplitted = textSplitted.slice(0, -1);
  }

  let textArray = textSplitted.split(",");
  //textArray = textArray.sort();
  

  for(let i=0; i<textArray.length; i++){
    if(textArray[i].length <= 0){
      textArray.splice(i, 1);
    }
  }
  for(let i=0; i<textArray.length; i++){
    if(textArray[i].length <= 0){
      textArray.splice(i, 1);
    }
  }

  getTextproperties(text, textArray);
  getKeywords(textArray);

}


function getTextproperties(text:any, textArray:any){

  // Textlänge
  let textlaenge = text.length;

  // Wortanzahl
  let wortanzahl = textArray.length;

  if(textlaenge == 0){
      wortanzahl = 0;
  }
  
  // Satzanzahl
  let satzanzahl = text;
  const satzzeichen = /[.!?]/;
  let saetze = satzanzahl.split(satzzeichen);
  satzanzahl = saetze.length - 1;

  if(satzanzahl <= 0 && textlaenge >= 1){
      satzanzahl = 1;
  }

  // Durchschn. Wortlänge
  let wortlaengeArray = [];

  for(var t=0; t<textArray.length; t++){
    wortlaengeArray.push(textArray[t].length);
  }

  let dWortlaenge = 0;

  for(var t=0; t<wortlaengeArray.length; t++){
    dWortlaenge += wortlaengeArray[t];
  }

  dWortlaenge = dWortlaenge / wortanzahl;
  dWortlaenge = Math.round(dWortlaenge * 100) / 100;

  // Durchschn. Satzlänge
  let saetzeArray = [];

  for(let x=0; x<saetze.length; x++){
    let aktuellerSatz = saetze[x];
    aktuellerSatz = aktuellerSatz.replace(/[^a-zA-Z0-9üÜöÖäÄß ]/g, ' ');
    aktuellerSatz = aktuellerSatz.replace(/ /g, ',');
    aktuellerSatz = aktuellerSatz.replace(/,,/g, ',');
  
    if(aktuellerSatz.charAt(aktuellerSatz.length - 1) == ','){
      aktuellerSatz = aktuellerSatz.slice(0, -1);
    }
  
    let aktuelleWoerter = aktuellerSatz.split(",");

    for(let i=0; i<aktuelleWoerter.length; i++){
      if(aktuelleWoerter[i].length <= 0){
        aktuelleWoerter.splice(i, 1);
      }
    }

    saetzeArray.push(aktuelleWoerter.length);
  }

  for(var i=0; i<saetzeArray.length; i++){
    if(saetzeArray[i] <= 0){
      saetzeArray.splice(i, 1);
    }
  }


  let dSatzlaenge = 0;

  for(var i=0; i<saetzeArray.length; i++){
    dSatzlaenge += saetzeArray[i];
  }

  dSatzlaenge = dSatzlaenge / satzanzahl;
  dSatzlaenge = Math.round(dSatzlaenge * 100) / 100;


  


  // Lesezeit

  let lesezeit = wortanzahl / 150; // durchschnittlich liest der Mensch 150 Wörter pro Minute
  let lesezeitString = lesezeit.toFixed(2);

  if(lesezeit < 60){
    lesezeitString += ' Minuten'
  }
  if(lesezeit >= 60){
      lesezeit = lesezeit / 60;
      lesezeitString = lesezeit.toFixed(2);
      lesezeitString += ' Stunden';
  }


  clearAll();

  createTextProp("Zeichenanzahl", textlaenge, "textlaenge");
  createTextProp("Anzahl der Wörter", wortanzahl, "wortanzahl");
  createTextProp("Anzahl der Sätze", satzanzahl, "satzanzahl");
  createTextProp("Durchschnittliche Wortlänge", dWortlaenge, "dWortlaenge");
  createTextProp("Durchschnittliche Satzlänge", dSatzlaenge, "dSatzlaenge");
  createTextProp("Lesezeit", lesezeitString, "lesezeit");

}

function loadedClear(){
  text_1.value = '';
  keywordList.innerHTML = '<span class="no-content">Fügen Sie einen Text ein, um die Keywords zu analysieren.</span>';

  const noContent = document.querySelector('.no-content') as HTMLSpanElement;
  noContent.classList.remove('hidden');

  createTextProp("Zeichenanzahl", "-", "textlaenge");
  createTextProp("Anzahl der Wörter", "-", "wortanzahl");
  createTextProp("Anzahl der Sätze", "-", "satzanzahl");
  createTextProp("Durchschnittliche Wortlänge", "-", "dWortlaenge");
  createTextProp("Durchschnittliche Satzlänge", "-", "dSatzlaenge");
  createTextProp("Lesezeit", "-", "lesezeit");

  keywordList.removeAttribute('style');
}

function clearAll(){  
  textproperties.innerHTML = '';
  keywordList.innerHTML = '<span class="no-content">Fügen Sie einen Text ein, um die Keywords zu analysieren.</span>';


  const noContent = document.querySelector('.no-content') as HTMLSpanElement;
  noContent.classList.remove('hidden');
}

function createTextProp(title: string, inhalt: any, cssClass: string){

  let newProp = document.createElement('div');
  newProp.innerHTML = '<div class="prop-name">' + title + '</div>';
  newProp.innerHTML += '<div class="prop-value">' + inhalt + '</div>';

  newProp.className = 'prop-item ' + cssClass;



  textproperties?.appendChild(newProp);
}

function getKeywords(textArray: any){

  // Hier weitermachen

  textArray = textArray.sort();

  var countedArray = [];
  var counter = 0;

  for(let i=0; i<textArray.length; i++){


    if(i == (textArray.length - 1)){
      // Letztes Array Element
      counter++;
      countedArray.push([textArray[i], counter]);
    }
    else{
      let nextElem = textArray[i+1];

      if(nextElem != textArray[i]){
        counter++;
        countedArray.push([textArray[i], counter]);
        counter = 0;
      }
      else{
        counter++;
      }
    }
  }

  countedArray.sort((a,b) => <any>b[1] - <any>a[1]);

  const noContent = document.querySelector('.no-content') as HTMLSpanElement;
  noContent.classList.add('hidden');

  for(let i=0; i<countedArray.length; i++){
    createKeyword(countedArray[i], textArray);
  }

  if(document.querySelector('.keyword-item') as HTMLDivElement){
    var keywordItems = document.querySelectorAll('.keyword-item');

    if(keywordItems.length >= 20){
      keywordList.style.height = 400 + 'px';

      let more = document.createElement('div');
      more.className = 'more-btn';
      more.innerHTML = 'Mehr laden ...';
      more.addEventListener('click', moreKeywords);
      keywordList.appendChild(more);
    }
  }
}

function createKeyword(arrElem:any, textArray:any){
  let kwItem = document.createElement('div');
  kwItem.className = 'keyword-item';
  kwItem.innerHTML += '<div class="keyword-name"><span class="name">Keyword: </span><span class="value">' + arrElem[0] + '</span></div>';
  kwItem.innerHTML += '<div class="keyword-amount"><span class="name">Anzahl: </span><span class="value">' + arrElem[1] + '</span></div>';


  let rate = textArray.length;
  rate = arrElem[1] / rate * 100;
  rate = Math.round(rate * 100) / 100;


  kwItem.innerHTML += '<div class="keyword-rate"><span class="name">Anteil: </span><span class="value">' + rate + '%</span></div>';

  keywordList.appendChild(kwItem);
}

function moreKeywords(){
  keywordList.style.height = keywordList.scrollHeight + 'px';
  
  let more = document.querySelector('.more-btn') as HTMLDivElement;
  more.outerHTML = '';
}