//endpoint : Primary domain Url + '/services/apexrest' + url provided in the restapi class
// endpoint url : https://force23-dev-ed.my.salesforce.com/services/apexrest/account/*

// providing multiple get operations is not possible

@RestResource(urlMapping='/account/*')
global class AccountRestApi {

 //CD355118   
@HttpGet
global static Account getAccount(){
    RestRequest req = RestContext.request;
     String accNum = req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
     Account result =[SELECT Id, Name, Rating,Industry, Website FROM Account WHERE AccountNumber = :accNum];
        
 return result;
}

@HttpPost
global static Id createAccount(String name,String rating,String industry,String website){

    Account acc = new Account(
        Name = name,
        Rating = rating,
        Industry = industry,
        Website = website
    );
    insert acc;
    return acc.Id;

}
    
@HttpPatch
global static Id updateAccount(){
    RestRequest req = RestContext.request;
     String accNum = req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
     Account acc =[SELECT Id FROM Account WHERE AccountNumber = :accNum];
Map<String, Object> accMap=  (Map<String, Object>)JSON.deserializeUntyped(req.requestBody.toString());
      
      for(string fld : accMap.keyset()){
          acc.put(fld,accMap.get(fld));
      }
      update acc;
    return acc.Id;
}


@HttpPut
global static Id upsertAccount(String name,String rating,String industry,String website,String id){

    Account acc = new Account(
        Name = name,
        Rating = rating,
        Industry = industry,
        Website = website,
        Id = id
    );
    upsert acc;
    return acc.Id;

}

@HttpDelete
global static void deleteAccount(){
    RestRequest req = RestContext.request;
     String accNum = req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
     delete [SELECT Id, Name, Rating,Industry, Website FROM Account WHERE AccountNumber = :accNum];
        
 
}


}