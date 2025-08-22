import { LightningElement, api } from 'lwc';

export default class ChildLwcAuraComponent extends LightningElement {

    @api name;

    @api showMessage(greeting){
        alert(greeting.toUpperCase() + ' ' + this.name);
    
    }
}