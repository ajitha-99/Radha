import { LightningElement, api } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
export default class ScreenQuickActionDemo extends LightningElement {

    @api recordId;
    @api objectApiName;


    fields = {
        accountName: ACCOUNT_NAME,
        accountIndustry: ACCOUNT_INDUSTRY,
        accountRating: ACCOUNT_RATING
    };

    closeModal(){

        this.dispatchEvent(new CloseActionScreenEvent());
    }

    successHandler(){
        const event = new ShowToastEvent({
            title: "Success",
            message:"Record saved successfully",
            variant: "success"
        });
        this.dispatchEvent(event);
        this.dispatchEvent(new CloseActionScreenEvent());
    
    }
}