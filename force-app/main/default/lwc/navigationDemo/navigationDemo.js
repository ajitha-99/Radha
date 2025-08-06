import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
export default class NavigationDemo extends NavigationMixin(LightningElement) {

navHomeclickHandler(){
    let pageRef = {
        type: 'standard__namedPage',
        attributes: {
            pageName: 'home'
        }
    };

 this[NavigationMixin.Navigate](pageRef);
}

navAccListViewclickHandler(){
    let pageRef = {
    type: 'standard__objectPage',
    attributes: {
        objectApiName: 'Account',
        actionName: 'list'
    },
    state: {
        filterName: 'MyAccounts'
  }
}
this[NavigationMixin.Navigate](pageRef);
}

createDefaultAccountclickHandler(){

    const defaultValues = encodeDefaultFieldValues(
        {
            AccountNumber: '123478521',
            Name: 'Navigation Test',
            NumberOfEmployees: '35000',
            OwnerId: '005XXXXXXXXXXXXXXX',
            Site: 'www.salesforce.com',
            Rating: "Hot",
            Industry: "Technology",
            Type: 'Prospect'
        });
     let pageRef = {
        
    type: 'standard__objectPage',
    attributes: {
        objectApiName: 'Account',
        actionName: 'new'
    },
    state: {
        defaultFieldValues : defaultValues
        
    }
    }
    this[NavigationMixin.Navigate](pageRef);

}


createNewAccountclickHandler(){
    let pageRef = {
        
    type: 'standard__objectPage',
    attributes: {
        objectApiName: 'Account',
        actionName: 'new'
    }
}
    this[NavigationMixin.Navigate](pageRef);


}

recordEditAccountclickHandler(){
    let pageRef = {
        
    type: 'standard__recordPage',
        attributes: {
            recordId: '0015g00000RzlJRAAZ',
            objectApiName: 'Account',
            actionName: 'edit'
    }
}
    this[NavigationMixin.Navigate](pageRef);

}

}


