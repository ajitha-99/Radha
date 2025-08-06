/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 07-28-2025
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
}