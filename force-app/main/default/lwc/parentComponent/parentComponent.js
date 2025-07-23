import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
// if we are annotating with any decorator it is a private property by default
    greeting = " Good Morning";
    userDetails = {
        fname: "Radha",
        lname: "G",
        age: 30
    };




}