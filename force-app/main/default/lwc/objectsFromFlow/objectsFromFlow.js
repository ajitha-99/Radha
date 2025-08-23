import { LightningElement,track, api } from 'lwc';

export default class ObjectsFromFlow extends LightningElement {

@track _contacts = [];

//it sets the value of contacts 
//it accepts the values from the user or 
//whatever the user is sending put the values in a local variable
set contacts(contacts=[]){
    this._contacts = [...contacts];//copy of array of contacts
}

//it returns the value of contacts in the local variable
@api
get contacts(){
    return this._contacts;
}
//iterting through contacts using map method and pushing them in an array items
//populate the value that the pill container will render
get items(){
   let contactEmailArray = this._contacts.map((currItem) => {
        return {
            type: 'icon',
            label: currItem.Email,
            name: currItem.Email,
            iconName: 'standard:contact',
            alternativeText: 'Contact Email'
        };
});
     return contactEmailArray;
    }
    }









