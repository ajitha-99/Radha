import { LightningElement, api } from 'lwc';

export default class ChildCustomEventDemo extends LightningElement {




clickHandler(){

//creation of custom event

let mycustomevent = new CustomEvent("displaymsg");

//dispatch event

this.dispatchEvent(mycustomevent);


}


}