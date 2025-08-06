import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import { LightningElement, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'; 
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating'; 

export default class GetPickListValuesDemo extends LightningElement {

    value;


    @wire(getObjectInfo, { 
        objectApiName: ACCOUNT_OBJECT }) outputprop;
   

    @wire(getPicklistValues, {

        recordTypeId: '$outputprop.data.defaultRecordTypeId',
        fieldApiName: ACCOUNT_RATING

    }) ratingProp;

    

handleChange(event) {

    this.value = event.target.value;
}



}   