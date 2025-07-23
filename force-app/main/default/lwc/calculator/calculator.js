import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {

    numberone = "";
    numbertwo = "";
    result = 0;
    displayOutput = false;
//the attributes are invoked from UI so we are using events here
//whenever you have to read the value from input we have to use event.target.value
//whatever the attribute you are targeting you have to use event.target. that attribute name
// i have to store that value in number1. whenever you have to refer that property in our method we have to use this operator
//followed by property name.
//if we have to build more than 2 properties let's say we have to create a form and have to display more than 15 fields then in that scenario we have to use
// a single method to store all the values.
// changeHandlerNumberOne(event){
//     this.numberone = event.target.value;
//     console.log(this.numberone);
//     };

//      changeHandlerNumberTwo(event){
//         this.numbertwo = event.target.value;
//         console.log(this.numbertwo);
//     };

changeHandler(event){
    // let name = event.target.name;
    // let value = event.target.value;
let{name, value} = event.target;
    if(name === "number1"){
        this.numberone = value;
    }else if(name === "number2"){
        this.numbertwo = value;
    }
    //destructuring the above we can write in a single line by destructuring

   // let{name, value} = event.target;
}
// to convert the text values into integer we have to use parseInt method or Integer method
//we can add all these events ina single method
//the way to hide the text when the component is loading is to use displayOutput property
//whenever we have to display the output we have to use displayOutput = true
calculateInput(event){
    this.displayOutput = true;
    let labelelement = event.target.label;

    if(labelelement === "Add"){
        this.result = parseInt(this.numberone) + parseInt(this.numbertwo);
    }else if(labelelement === "Subtract"){
        this.result = parseInt(this.numberone) - parseInt(this.numbertwo);
}else if(labelelement === "Multiply"){
    this.result = parseInt(this.numberone) * parseInt(this.numbertwo);
}else if(labelelement === "Division"){
    this.result = parseInt(this.numberone) / parseInt(this.numbertwo);
}



//reset the fields

this.numberone = "";
this.numbertwo = "";
}
// addHandler(event){
//       this.result = parseInt(this.numberone) + parseInt(this.numbertwo); 

//     };

//     subtractHandler(event){
//         this.result = parseInt(this.numberone) - parseInt(this.numbertwo);
//     };

//     multiplyHandler(event){
//         this.result = parseInt(this.numberone) * parseInt(this.numbertwo);
//     };

//     divisionHandler(event){
//         this.result = parseInt(this.numberone) / parseInt(this.numbertwo);
//     };

   

   
}