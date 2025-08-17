import { createRecord } from 'lightning/uiRecordApi';
import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import TASK_MANAGER_OBJECT from '@salesforce/schema/Task_Manager__c';
import TASK_NAME_FIELD from '@salesforce/schema/Task_Manager__c.Name';
import TASK_DATE_FIELD from '@salesforce/schema/Task_Manager__c.Task_Date__c';
import IS_COMPLETE_FIELD from '@salesforce/schema/Task_Manager__c.Is_Completed__c';
import COMPLETED_DATE_FIELD from '@salesforce/schema/Task_Manager__c.Completed_Date__c';

export default class ToDoApplication extends LightningElement {

    taskname = "";
    taskdate = null;
    incompletetask = [];
    completedtask = [];

changeHandler(event){
    let{name,value} = event.target;

    if(name === "taskname"){
        this.taskname = value;
    }else if(name === "taskdate"){
        this.taskdate = value;
    }
}



resetChangeHandler(event){
    this.taskname = "";
    this.taskdate = null;
}

addTaskHandler(event){
    //condition1: set the end date to today if it is missing/null
    //Salesforce accepts the date in Iso form so we have converted the date as it dispalys date timestamp by default
    if(!this.taskdate){
        this.taskdate = new Date().toISOString().slice(0,10);
    }
//condition2: if my validation is true means there are no errors in the tasks add the task to the to do list
// to do list means incomplete task property we are referring as to do list
    if(this.validateTask()){
        //if the task is valid then push the task to the array using spread operator
        //push method doesn't work without @track decorator
        // this.incompletetask =[...this.incompletetask,{
        //     taskname : this.taskname,
        //     taskdate : this.taskdate
        // }
        // ];
        // this.resetChangeHandler();
        // // to override the existing array we use spread operator
        // let sortedArray = this.sortTask(this.incompletetask);
        //    this.incompletetask = [...sortedArray];
        //    console.log(this.incompletetask);
        let inputfields = {};
        inputfields[TASK_NAME_FIELD.fieldApiName] = this.taskname;
        inputfields[TASK_DATE_FIELD.fieldApiName] = this.taskdate;
        inputfields[IS_COMPLETE_FIELD.fieldApiName] = false;

        let recordInput = {
            apiName: TASK_MANAGER_OBJECT.objectApiName,
            fields : inputfields};

        createRecord(recordInput)
        .then((result) => {
            console.log(result);
            this.ShowToastEvent('Success', 'Task Added Successfully', 'success');
            this.resetChangeHandler();
            this.taskname = '';

        })
        .catch(error => {
            console.log(error);
        })
        }
        
    }

//if the task is already present in my array or not
validateTask(){
    //check if the task is empty or not
    let isValid = true;//flag to set initially everything to true
    //Find the input element with the class 'taskname' in the HTML template in order 
    // to display custom validity and report validity we use ths method
    let element = this.template.querySelector(".taskname");
    //condition 1 --- check the task name is empty or not
    //condition 2 --- check the task name is already present(duplicate) in the array or not
    
    if(!this.taskname){
        isValid = true;
    }
else{
    //whenever we have to search for the task name in the array we use the find method
    //find element always return the first value in the array 
    // if not present it will return undefined
    //we can also use includes method to check the presence of the element in the array
     let taskitem = this.incompletetask.find(currItem => 
     currItem.taskname === this.taskname &&
     currItem.taskdate === this.taskdate

       );
       if(taskitem){
           isValid = false;
           element.setCustomValidity("Task already present");
       }
    }
    // reset the custom validity message to empty if there are no errors found
    if(isValid){
        element.setCustomValidity("");
    }
    //when ever we set the set error message in order to display on UI we use report validity method from salesforce
    //component library
    element.reportValidity();
    return isValid;
    }

//whenever we sort we take two items at a time and compare them
//1 and 2
//2 and 3
sortTask(inputArr){
   let sortedArray =  inputArr.sort((a,b) => {
     const dateA = new Date(a.taskdate);
     const dateB = new Date(b.taskdate);
     // compare the dates in ascending order
     return dateA - dateB;
    }
    );
    return sortedArray;
}

//from incomplete task that is our to dolist whenever we have click on delete icon the tadk shold be deleted
//whenever we have to click on check icon the task should be moved to completed lists
//splice method directly modifies the array and returns the removed elements (if any).
//from index remove one item from array
//after removing the element again we are resorting the array using the same method sortTask
removalHandler(event){
    let index = event.target.value;
    this.incompletetask.splice(index, 1);

    let sortedArray = this.sortTask(this.incompletetask);
    this.incompletetask = [...sortedArray];


}

completetask(event){
    //remove the entry from incomplete
    // add the same entry in completed item
    let index = event.target.name;
    this.refreshData(index);


}
//which attribute you want to access that you have to use after dataset. in the html we are accessing itemm in the data attribute.so we have to use item
dragHandler(event){
    event.dataTransfer.setData("index", event.target.dataset.item);

}

allowDrop(event){
    event.preventDefault();//prevents the default behaviour of the browser
}
//whatever data we have to set during dragging we have read that data 
dropElementHandler(event){
    let index = event.dataTransfer.getData("index");
        this.refreshData(index);
}

refreshData(index){

     let removeitem =  this.incompletetask.splice(index, 1);

    let sortedArray = this.sortTask(this.incompletetask);
    this.incompletetask = [...sortedArray];

    // add the same entry in completed item
    this.completedtask = [...this.completedtask, removeitem[0]];
}

ShowToastEvent(title, message, variant){
    const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}

