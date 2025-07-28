import { LightningElement } from 'lwc';

export default class SampleToDoList extends LightningElement {

    taskname ="";
    display =false;
    tasks=[];
    

    handleClick(event){
        let{name,value} = event.target;

        if(name === "taskname"){
            this.taskname = value;
        }
    }

    resetClick(event){
        this.taskname ="";
    }

    addtaskhandler(){
    
         if (!this.taskname) {
            return;  // Do nothing if task name is empty or only whitespace
        }

        // Create a new task object with taskname and completed flag (default to false)
        let newTask = {
            taskname: this.taskname,
            completed: false  // Task is initially not completed
        };

        // Add the new task to the tasks array
        this.tasks = [...this.tasks, newTask];

        // Reset the taskname after adding the task
        this.taskname = "";
    }

    // Handle checkbox change (mark task as completed or incomplete)
    handlechange(event) {
        const taskName = event.target.label;  // Get the task name from checkbox label
        const checked = event.target.checked;  // Get checkbox status (checked or unchecked)

        // Update the completed status of the task based on checkbox status
        this.tasks = this.tasks.map(task => {
            if (task.taskname === taskName) {
                task.completed = checked;  // Toggle task completion
            }
            return task;
        });
     }
}

        
    
    
 
 
    
