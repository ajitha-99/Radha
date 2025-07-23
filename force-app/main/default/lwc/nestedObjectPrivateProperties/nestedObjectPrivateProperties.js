//whenever you are changing the single property of an object component will not automatically rerender
//similar applies to array as well. if you modify an array and don't put @track we will get the same error

import { LightningElement, track } from 'lwc';

export default class NestedObjectPrivateProperties extends LightningElement {

   @track myDetails = { fname: "Ajitha", lname: "G"};
   @track myTask = ["Office", "Meeting", "Bootcamp"];

   // add one single element to an array or modifying the existing array we have to use @track decorator
    clickHandler(event){
        this.myDetails.fname = "Krishna";
    }

    addTaskHandler(event){
        this.myTask.push("LWC");
    }
// if you are completely refreshing the object or complete Array @track decorator is not required
    RefreshHandler(event){
        this.myDetails = {fname: "Hare", lname: "Radha"};
        this.myDetails = {...this.myDetails, age:30};
        this.myTask =[...this.myTask, "Self Study"];
    }
}