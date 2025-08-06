
import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactBrowserController.getContactList';

export default class ContactBrowser extends LightningElement {
   
 selectedAccountId = "";
 selectedIndustry = "";
  
//we have to use $ to access the apex method and make the properties reactive
@wire(getContactList,   {
    accountId: "$selectedAccountId",
    industry: "$selectedIndustry"
}) ContactListFunction({data, error}){
    if(data){
        console.log("selected account id is" +this.selectedAccountId);
        console.log("selecte industry is" +this.selectedIndustry);
        console.log("contactList", data);
    }
    else if(error){
        console.log("selected contacts failed", error);
    }

}

filterChange(event){
    this.selectedAccountId = event.detail.accountid;
     this.selectedIndustry = event.detail.industry;

}


}