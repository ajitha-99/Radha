/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 07-28-2025
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class CustomLookupController {
    @AuraEnabled(cacheable=true)
    
    public static List<SObject> searchRecords(String objectApiName, string searchKey) {
        
        List<SObject> sObjectList = new List<SObject>();

        if(String.isNotBlank(searchKey)){

// if my string is not blank then i am perfomring a search in the key and use it
//in the dynamic soql query and return the result
//to perform generic search we have to  use dynamic soql in query

            String Key = '%'+ searchKey +'%';  

            String strQuery = 'Select Id, Name From '+ objectApiName +' Where Name Like: Key ';
            sObjectList = Database.query(strQuery, AccessLevel.USER_MODE);
        } 
        return sObjectList;

    }
}   