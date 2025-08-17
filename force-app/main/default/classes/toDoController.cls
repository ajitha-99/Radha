public with sharing class toDoController {
    @AuraEnabled(cacheable=true)
    public static List<Task_Manager__c> loadIncompleteTasks() {
    
        return [
            SELECT Id, Name, Task_Date__c, Is_Completed__c
            FROM Task_Manager__c
            WHERE OwnerId =: UserInfo.getUserId() 
            AND Is_Completed__c = FALSE
            WITH USER_MODE
            ORDER BY Task_Date__c ASC
        ];
    

    }
}   