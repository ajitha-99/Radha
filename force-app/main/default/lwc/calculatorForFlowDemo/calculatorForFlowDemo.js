import { LightningElement, api } from 'lwc';
import {
    FlowAttributeChangeEvent
} from 'lightning/flowSupport';
export default class CalculatorForFlowDemo extends LightningElement {

    @api inputNumber1="";
    @api inputNumber2="";
    @api outputResult="";


    handleClick(event){

        let name = event.target.name;

        if(name === "add"){
            this.outputResult = Number(this.inputNumber1) + Number(this.inputNumber2);
        }else if(name === "subtract"){
            this.outputResult = Number(this.inputNumber1) - Number(this.inputNumber2); 
        }else if(name === "multiply"){
             this.outputResult = Number(this.inputNumber1) * Number(this.inputNumber2);
        }else if(name === "divide"){      
             this.outputResult = Number(this.inputNumber1) / Number(this.inputNumber2);
        }
        
const attributeChangeEvent = new FlowAttributeChangeEvent(
            "outputResult",
            this.outputResult
        );
        this.dispatchEvent(attributeChangeEvent);
    }
}