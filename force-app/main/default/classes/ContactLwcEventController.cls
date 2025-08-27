/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 07-31-2025
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * void means it doesn't return anything. 
 * we have to use List<contact>to get the contact data list and return type to be
 * called in other apex or lwc
**/
public with sharing class ContactLwcEventController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        List<Contact> conList = [
            SELECT Id,Name,FirstName,LastName, Email,Title, Phone,PhotoUrl
            FROM Contact 
            WHERE PhotoUrl != null 
            WITH USER_MODE
            LIMIT 10];
            
            return conList;
    }
@AuraEnabled(cacheable=true)
    public static List<Contact> getContactListForDataTable() {
        List<Contact> conList = [
            Select Id,Email,Name,Title,Phone,Picture__c,Rank__c,AccountId, Account.Name 
            FROM Contact 
            WHERE AccountId != null 
            WITH USER_MODE
            LIMIT 10];
            
            return conList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactListBasedOnAccount(String accountId) {
        List<Contact> conList = [
            Select Id,
            Name,
            FirstName,
            LastName,
            Title,
            Phone,
            Email,
            Picture__c,
            Rank__c,
            AccountId, 
            Account.Name,
            LeadSource
            FROM Contact 
            WHERE AccountId =: accountId 
            WITH USER_MODE
            LIMIT 10];
            
            return conList;
    }
     
}