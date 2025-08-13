import { LightningElement } from 'lwc';

export default class ParentComposition extends LightningElement {

firechildDivhandler(){
    console.log("Event Handled in Parent Component - At Div Level");

}

firechildhandler(){
 console.log("Event Handled in Parent Component - At Child Level");

}

// the bubbles false and composed false then only child component is invoked
//the bubbles true and composed false then parent and child component is invoked
//the bubbles true and composed true then grand parent and parent and child is invoked

}