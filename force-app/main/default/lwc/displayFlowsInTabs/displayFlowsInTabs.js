import { LightningElement, api, wire } from 'lwc';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';

export default class DisplayFlowsInTabs extends LightningElement {
    @api recordId;
    @api accountRating;

    @wire (getRecord,{
        recordId:"$recordId",
        fields:[ACCOUNT_RATING]
    }) getRecordOutput({data,error}){
        if(data){
           this.accountRating = getFieldValue(data,ACCOUNT_RATING);
            console.log(getFieldValue(data,ACCOUNT_RATING));
        }
    }

    get isAccountRatingHot(){
        return this.accountRating==='Hot' ? true: false;
    }
    get isAccountRatingWarm(){
        return this.accountRating==='Warm' ? true: false;
    }
    get isAccountRatingCold(){
        return this.accountRating==='Cold' ? true: false;
    }

    get inputVariables(){
        return[
            {
                name: "inputRating",
                type: "String",
                value: this.accountRating
    }];
    }
}