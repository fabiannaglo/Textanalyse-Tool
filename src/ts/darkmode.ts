export function changeMode(): void{
    /*
      Diese Funktion setzt beim Ausführen die Klasse des body-Elements auf "light" oder "dark".
      Dementsprechend wird mittels CSS das Design geändert.
    */
    if(document.body.classList.contains('light')){
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
    else{
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
}