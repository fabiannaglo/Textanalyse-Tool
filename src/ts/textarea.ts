// THIS IS A MODULE!

export const textPlaceholder: string = "Text hier einfügen";

export class Textarea extends HTMLElement {
  constructor() {
    super(); 
    this.innerHTML = '<textarea id="text-1">' + textPlaceholder + '</textarea>';
  }
}
