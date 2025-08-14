import { LightningElement, api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import Account_NAME_FIELD from '@salesforce/schema/Account.Name';
import Account_INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import Account_RATING_FIELD from '@salesforce/schema/Account.Rating';
import Account_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class RecordEditFormDemo extends NavigationMixin(
    LightningElement
) {

    @api recordId;
    @api objectApiName;
    //you can use any approach to get the record id. where we put our component it takes that object 
    //automatically when we use @api decorator
   // objectApiName = ACCOUNT_OBJECT;

fields = {
 name: Account_NAME_FIELD,
 industry: Account_INDUSTRY_FIELD,
 rating: Account_RATING_FIELD,
 revenue: Account_REVENUE_FIELD
};
successHandler(event){
 let pageref = {
    
        type: 'standard__recordPage',
        attributes: {
            recordId: event.detail.id,
            objectApiName: this.objectApiName,
            actionName: 'view'
        }
 }
  this[NavigationMixin.Navigate](pageref);
}

errorHandler(event){
    //console.log(JSON.stringify(event.detail));

const customevent = new ShowToastEvent({
            title: "Error",
            message: event.detail.message,
            variant: "error"
        });
        this.dispatchEvent(customevent);
    

}

submitHandler(event){
    //check if industry is blank, if yes populate with Energy
    //prevent the default behaviour of form submission
    //console.log(this.template.querySelector("lightning-record-edit-form").reportValidity());
     //console.log(JSON.stringify(event.detail));
     //submit method is only available in record-edit-form
    event.preventDefault();
    const fields = event.detail.fields;
    if(!fields.Industry){
        fields.Industry = "Energy";
    }
  
    this.template.querySelector("lightning-record-edit-form").submit(fields);
   
}

 resetHandler(){
    const inputFields = this.template.querySelectorAll(
       "lightning-input-field"
   );
   if (inputFields) {
       inputFields.forEach(currItem => {
           currItem.reset();
       });
   }

 }
}