import { LightningElement } from 'lwc';

export default class ChildComposition extends LightningElement {

handleClick() {
let myCustomevent = new CustomEvent('fire', {
 bubbles: true,
 composed: true
});

this.dispatchEvent(myCustomevent);

}




}
