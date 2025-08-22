import { LightningElement, api } from 'lwc';
import {
    FlowAttributeChangeEvent
} from 'lightning/flowSupport';
export default class FlowComponentDemo extends LightningElement {

//we have to use @api before the property name to make it public 
// and accessible in the property tag in the config file
//role attribute in the xml file says if role=input it is only one way communication from flow to lwc
//role=output means it is one way communication from lwc to flow
//role=inputoutput means it is two way communication between flow and lwc--default behaviour

//as soon as the user changes the value of Name property in lwc, 
// the value of changeHandler event is fired
//to communicate the value of the name has changed to flow we use
//flowattributechangeevent
@api inputName;

changeHandler(event){
    this.inputName = event.target.value;
    const attributeChangeEvent = new FlowAttributeChangeEvent(
            "inputName",
            this.inputName
        );
         this.dispatchEvent(attributeChangeEvent);
}
//notify the flow about the change in the name
//first is the property name and second is the value
//we have to use api before the property name to make it public

}