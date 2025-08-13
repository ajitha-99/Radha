import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class RecordFormDemo extends NavigationMixin(
    LightningElement
) {

@api recordId;
@api objectApiName;


fieldList = [NAME_FIELD, INDUSTRY_FIELD, RATING_FIELD, REVENUE_FIELD];

showToast() {
        const event = new ShowToastEvent({
            title: 'Success',
            message:
                'Record Updated Successfully.',
            variant: "success"
        });
        this.dispatchEvent(event);
    }
// the recordId is present in the event.detail.id when a record is created 
 navigateToRecordPage(event){
    console.log("Event Detail", event.detail);
   let pageref = {
        type: 'standard__recordPage',
        attributes: {
            recordId: event.detail.id,
            objectApiName: this.objectApiName,
            actionName: 'view'
        }

 };
  this[NavigationMixin.Navigate](pageref);
}
}