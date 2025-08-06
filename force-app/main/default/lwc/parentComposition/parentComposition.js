import { LightningElement } from 'lwc';

export default class ParentComposition extends LightningElement {

firechildDivhandler(){
    console.log("Event Handled in Parent Component - At Div Level");

}

firechildhandler(){
 console.log("Event Handled in Parent Component - At Child Level");

}

}