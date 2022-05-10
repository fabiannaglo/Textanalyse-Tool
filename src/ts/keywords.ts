const keywordList = document.querySelector('.keyword-list') as HTMLDivElement;
const noContent = document.querySelector('.no-content') as HTMLSpanElement;

export function resetKeywords(): void{
    /*
        Die Funktion setzt die Keywordliste auf Standard zurück.
    */

    if(keywordList.querySelector('.keyword-item')){
        let keywordItems = keywordList.querySelectorAll('.keyword-item');

        for(let i:number=0; i<keywordItems.length; i++){
            keywordItems[i].outerHTML = "";
        }

        noContent.classList.remove('hidden');
        keywordList.removeAttribute('style');
    }

    if(keywordList.querySelector('.more-btn')){
        let moreBtn = keywordList.querySelector('.more-btn') as HTMLDivElement;
        moreBtn.outerHTML = "";
    }
}

export function getKeywords(textArray: any[]): void{
    /*
        Die Funktion nimmt die einzelnen Wörter aus dem eingegebenen Text,
        zählt die Anzahl der Vorkommnisse und sortiert den mehrdimensionalen
        Array anschließend nach der Anzahl.

        Zuletzt werden alle Keywords auf der Website eingeladen.
    */
  
    textArray = textArray.sort(); // Array alphabetisch sortieren
  
    let countedArray: any[] = [];
    let counter: number = 0;
  
    for(let i:number=0; i<textArray.length; i++){
      if(i == (textArray.length - 1)){
        // Letztes Array Element
        counter++;
        countedArray.push([textArray[i], counter]);
      }
      else{
        let nextElem:any = textArray[i+1];
  
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
  
    /*
        Zweidimensionaler Array wird nach 2. Wert absteigend (descending) sortiert,
        sodass das Keyword mit den meisten Vorkommnissen zuerst angezeigt wird.
    */
    countedArray.sort((a,b) => <any>b[1] - <any>a[1]); 
  

    noContent.classList.add('hidden');
  
    for(let i:number=0; i<countedArray.length; i++){
      createKeyword(countedArray[i], textArray);
    }
  
    if(document.querySelector('.keyword-item') as HTMLDivElement){
      let keywordItems = document.querySelectorAll('.keyword-item');
  
      if(keywordItems.length >= 20){
        /*
            Wenn mehr als 20 Keywords vorhanden sind, wird die Höhe der Keywordanzeige
            begrenzt. Hierdurch wird die Website nicht endlos lang.

            Zusätzlich wird ein Button eingefügt, sodass man über einen Klick alle
            weiteren Keywords anzeigen kann.
        */

        keywordList.style.height = 400 + 'px';
  
        let more = document.createElement('div') as HTMLDivElement;
        more.className = 'more-btn';
        more.innerHTML = 'Mehr laden ...';
        more.addEventListener('click', moreKeywords);
        keywordList.appendChild(more);
      }
    }
}
  
function createKeyword(arrElem:any[], textArray:any[]): void{
    /*
        Die Funktion erstellt ein neues <div>-Element, das ein Keyword enthält.
        Zusätzlich zum Keyword wird noch die Anzahl an Vorkommnissen im Text
        und der prozentuale Anteil dieses Keywords am Gesamttext ausgegeben.
    */

    let kwItem = document.createElement('div') as HTMLDivElement;
    kwItem.className = 'keyword-item';
    kwItem.innerHTML += '<div class="keyword-name"><span class="name">Keyword: </span><span class="value">' + arrElem[0] + '</span></div>';
    kwItem.innerHTML += '<div class="keyword-amount"><span class="name">Anzahl: </span><span class="value">' + arrElem[1] + '</span></div>';
  
    let rate: number = textArray.length;
    rate = arrElem[1] / rate * 100;
    rate = Math.round(rate * 100) / 100;
  

    kwItem.innerHTML += '<div class="keyword-rate"><span class="name">Anteil: </span><span class="value">' + rate + '%</span></div>'; 
    keywordList.appendChild(kwItem);
}
  
function moreKeywords(): void{
    /*
        Die Funktion wird durch einen Klick auf den Button "Mehr laden..." ausgeführt.
        Sie bewirkt, dass die alle Keywords angezeigt werden.
    */
    keywordList.style.height = keywordList.scrollHeight + 'px';
    
    let more = document.querySelector('.more-btn') as HTMLDivElement;
    more.outerHTML = '';
}