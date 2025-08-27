import { LightningElement, wire } from 'lwc';
import getContactListForDataTable from '@salesforce/apex/ContactLwcEventController.getContactListForDataTable';
const columns = [
    { label: "Name", 
        type:"customName", 
        typeAttributes:{
        contactName: {
            fieldName: "Name"
        }
         }},
    //I want to make the link as clickable then we have to use type
    //If we want to override the default link behaviour in any component 
    // i.e. url then we have to use typeAttribute
     { label: "Account Name", fieldName: "accountLink", type: "url",
         typeAttributes: { label: { 
            fieldName: "accountName" },
            //to open the record in the new tab we need to define target="_blank"
            target: "_blank"
     }}, 
    { label: "Title", fieldName: "Title",
     cellAttributes: { 
        class: {fieldName: "titlecolor"}}
    } , 
    { label: "Rank", 
       fieldName: "Rank__c", 
        type: "customRank",
     typeAttributes: {
         rankIcon: {
             fieldName: "rankIcon"
         } }},
    { label: "Title", fieldName: "Title" },
    { label: "Picture", 
        type: "customImage",
        typeAttributes: {
            pictureUrl: {
                fieldName: "Picture__c"
            }}
        },
    { label: "Phone", fieldName: "Phone", type: "phone" },
    { label: "Email", fieldName: "Email", type: "email" }
     
];

export default class CustomStyleDataTable extends LightningElement {

contacts;
columns = columns;
//i am not storing the data in the contacts directly instead i am iterating through contacts
//using map method and pushing them in an array items
//to populate the related account id and name and link to the contacts
@wire(getContactListForDataTable) wiredContacts({data,error}){
    if(data){
        this.contacts = data.map((currItem)=>{
           let accountLink = `/${currItem.AccountId}`;
           let accountName = currItem.Account.Name;
           let titlecolor = currItem.Title==='CFO'?"slds-text-color_success":"slds-text-color_error";
           let rankIcon = currItem.Rank__c > 5 ? "utility:ribbon" : "";
           return {
            ...currItem,
             accountLink: accountLink,
             accountName: accountName,
             titlecolor: titlecolor,
              rankIcon: rankIcon
           }
        });
        console.log(data);
    }else {
        console.log(error);
    }
}

}