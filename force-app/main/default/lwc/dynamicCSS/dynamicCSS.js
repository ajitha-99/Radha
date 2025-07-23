import { LightningElement } from 'lwc';

export default class DynamicCSS extends LightningElement {
    pColor ="chocolate-color";

    addCssHandler(event){
     let element = this.template.querySelector("p");
        element.classList.add("green-border");
        console.log("event.target.value is :"+event.target.value)
        
    }

    removeCssHandler(event){
        let element = this.template.querySelector("p");
        element.classList.remove("green-border");
        console.log("event.target.value is :"+event.target.value)

    }

    toggleCssHandler(event){
        let element = this.template.querySelector("p");
        element.classList.toggle("green-border");
        console.log("event.target.value is :"+event.target.value)

    }
}