import { LightningElement, wire, api } from 'lwc';
import searchRecords from '@salesforce/apex/CustomLookupController.searchRecords';

const DELAY = 300;
export default class CustomLookup extends LightningElement {

@api apiName = "Account";
searchValue;
@api objectLabel = "Account";
@api iconName = "standard:account";
selectedRecord ={
    selectedId : "",
    selectedName : ""
};
displayOptions = false;

//the wire method will be again called as soon as the search value or parameter value changes
//automatically called by framework when the component is called
// as soon as the apiname changes the wire method is called in order 
// to do that we have to use reactive wire properties or to make the variables reactive
// we have to use $ sign to make the properties reactive
@wire (searchRecords,{

    objectApiName : "$apiName",
    searchKey : "$searchValue"
}) outputs; 

get isRecordSelected(){
    return this.selectedRecord.selectedId === "" ? false : true;
}
 
//here our apex method is called for each and every input of the user
//we are hitting the salesforce server and getting the response
changeHandler(event){
    window.clearTimeout(this.delayTimeout);
   
   let enteredValue = event.target.value;

   //debouncing--- do not update the reactive property as long as the function is called
   //being called within  a delay of 500 milliseconds
   //then and only then update the reactive property or call apex method
   //settimeout accepts callback function and delay
   this.delayTimeout  = setTimeout(()=>{
       this.searchValue = enteredValue;
       this.displayOptions = true;
   },DELAY);
}


clickHandler(event){
    let selectedId = event.currentTarget.dataset.item;
    console.log("selectedId", selectedId);

    let outputRecord = this.outputs.data.find(curritem => curritem.Id === selectedId);
    this.selectedRecord = {
    selectedId: outputRecord.Id,
    selectedName: outputRecord.Name
}
    this.sendSelection();
    this.displayOptions = false;
}

removalSelectionHandler(event){

    this.selectedRecord = {
    selectedId: "",
    selectedName: ""
}
    this.sendSelection();
    this.displayOptions = false;
}


sendSelection(event){

    let mySelectionEvent = new CustomEvent("selectrec", {
        detail: this.selectedRecord.selectedId
    });
    this.dispatchEvent(mySelectionEvent);

}
}