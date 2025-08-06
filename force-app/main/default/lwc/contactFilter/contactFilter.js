import { LightningElement, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { NavigationMixin } from 'lightning/navigation';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi'; 
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
export default class ContactFilter extends NavigationMixin( LightningElement) {

    selectedAccountId = "";
    selectedIndustry = "";
//initially we have to make the button disabled as soon as the account is selected the 
//button should be enabled
    disableCreate = true;
    @wire(getObjectInfo,{
        objectApiName: ACCOUNT_OBJECT
    }) accountInfo;

    @wire(getPicklistValues, {
        recordTypeId: "$accountInfo.data.defaultRecordTypeId",
        fieldApiName: ACCOUNT_INDUSTRY
    }) industryPicklist;

    
        
       
    selectedRecordHandler(event){

        this.selectedAccountId = event.detail;
       
        console.log("Selected Account", this.selectedAccountId);
        if(this.selectedAccountId){
            this.disableCreate = false;
        }else {
            this.disableCreate = true;
        }
        this.notifyFilterChange();
        }

        industryChangeHandler(event){
            this.selectedIndustry = event.detail.value;
            this.notifyFilterChange();
        }

        addNewContact(){

         let defaultValue =  encodeDefaultFieldValues({
                AccountId: this.selectedAccountId
            });
//we have to use page ref to create contact by importing navigation mix
      let pageref = {
       type: 'standard__objectPage',
    attributes: {
        objectApiName: 'Contact',
        actionName: 'new'
    },
    state: {
        defaultFieldValues : defaultValue
    }
        }
         this[NavigationMixin.Navigate](pageref);
    }

  notifyFilterChange(event){

    let myCustomevent = new CustomEvent('filterchange', {
        detail: {
            accountid: this.selectedAccountId,
            industry: this.selectedIndustry
        }

    });

    this.dispatchEvent(myCustomevent);

  }
}


    