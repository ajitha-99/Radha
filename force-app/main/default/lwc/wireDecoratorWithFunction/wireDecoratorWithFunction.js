//iterate through the account list using map method
//map doent modify the existing array instead it creates a new array with the modified values
//check if the property is available or not, if not available display the property 
//check the value is available in the property or not.
//if not provide default value to the property
//to check the property is present or not we have a method hasOwnProperty


import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/AccountLwc.getAccount';  

const columns = [
    { label: "Account Name", fieldName: "Name" },
    { label: "Account Industry", fieldName: "Industry"},
    { label: "Account Rating", fieldName: "Rating"}
    
];


export default class WireDecoratorWithFunction extends LightningElement {

accounts;
errors;
columns = columns;
//when the value is available then the wire function is invoked
//mutating menas changing the data directly,such as modifying values, adding properties or deleting them
@wire(getAccount) accountFunction({data, error}){
 if (data) { // Use 'data' directly from the destructured object
     let updatedAccounts =  data.map((currItem) => {
        let updatedData = {}; // Declare updatedData locally

            if(!currItem.hasOwnProperty("Rating")){
                updatedData = {...currItem, Rating: "Warm" }; // Assign to local updatedData
            } else{
                updatedData = {...currItem}; // Assign to local updatedData
            }
            return updatedData; // Return the local updatedData
        });
            this.accounts = [...updatedAccounts]; // Assign the new array to this.accounts
            this.errors = null;
    
    }else if(error){ // Use 'error' directly from the destructured object
        console.log(error);
        this.errors = error;
        this.accounts = null;

    }
}


}

