// if we don't use @track also the component will rerender because both are private properties

import { LightningElement, track } from 'lwc';

export default class PrivateProperties extends LightningElement {

    greeting ="Hello Radha";
    @track welcome ="Welcome to the world of salesforce";

    clickHandler(event){
        this.greeting = "Namaste Krishna";
        this.welcome = "Today is the Day19 of the BOOTCAMP";
        
    }
}