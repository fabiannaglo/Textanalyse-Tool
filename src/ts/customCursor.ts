const cursor = document.querySelector('.cursor') as HTMLDivElement;

export function mouseMove(e:any): void{
    /*
      Die Funktion erfasst die Mausposition und setzt die Position der Custom-Cursor-Div auf die Mausposition.
      Der Custom-Cursor wird mittig zum Mauszeiger positioniert.   
    */
  
    let posTop: any = e.clientY;
    posTop = posTop - (cursor.clientWidth/2);
    let posLeft: any = e.clientX;
    posLeft = posLeft - (cursor.clientHeight/2);
  
    cursor.style.top = posTop + 'px';
    cursor.style.left = posLeft + 'px';
  }