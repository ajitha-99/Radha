/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 08-13-2025
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Salesforce best pratices to use user_mode
**/
public with sharing class AccountLwc {
    @AuraEnabled(cacheable=true)
    
    public static List<Account> getAccount() {

    return [
        SELECT Id, Name, Industry, Rating
        FROM Account
        WITH USER_MODE] ;  
    }

    @AuraEnabled(cacheable=true)
   
    public static List<Account> getParentAccounts(){
        return [select Id, Name, Industry from Account 
        where AnnualRevenue != null
        WITH USER_MODE];
    }
}