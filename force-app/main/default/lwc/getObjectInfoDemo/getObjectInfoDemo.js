import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { LightningElement, wire } from 'lwc';
//to get reference of a object
import ACCOUNT_OBJECT   from '@salesforce/schema/Account';  
export default class GetObjectInfoDemo extends LightningElement {

    accountinfo;
    accounterror;

@wire(getObjectInfo, {

    objectApiName: ACCOUNT_OBJECT
}) outputFunction({data,error}){
    if(data){
        console.log('Account Info Data', data);
        this.accountinfo = data;
        this.accounterror = null;
    }else if(error){
        console.log("Error", error);
        this.accounterror = error;
        this.accountinfo = null;
    }
}


}
