# Lecture 07: API Development and Intermediate MongoDB

## Intermediate MongoDB

### Advanced Finding
We can find documents many more ways than just matching on multiple fields:
  + Query by subdocuments
  + Query for matches inside an array
  + Query for a field to be one of many values
  + Matching fields that are less than a value
  + Matching fields that are greater than a value
  + Performing a logical query for all matching queries, or any matching queries
  + JavaScript based querying

### Advanced Updatingn
There are many ways we can update documents, rather than just replacing their entire content. 
  + We cann change onnly specific fields 
  + Update subdocuments
  + Increment fields
  + Multiply fields value
  + Remove fields 
  + Update to a minumum value
  + Manipulate arrays 
All of these are demonstrated in `advanced_mongo.js`, where you can experiment with them accordingly through the node command line or writing your own file. 

### Array Querying Operation
Naturally, as JSON documents, we can store arrays in MongoDB.
  + Entries can be primitives or objects!  
We can query documents based on arrays and update arrays and their entries. When dealing with arrays containing subdocuments, we can query for matching fields on subdocuments. We can query arrays to find documents that have arrays with matching entries. 

### Array Manipulation Operations
Arguably, the most difficult part of MongoDB is array manipulation due to the complex syntax of combining arrays and subdocuments.  
There are many ways of updating arrays: 
  + Adding to the array if it does not already exist. 
  + Adding to the array whether or not it exists
  + Poppinng the first or last elemennt
  + Remove a single matching element
  + Removing all matching elements 


## POST, PUT, DELETE (API)
### POST, PUT, and DELETE
Last lecture, we focused on GET requests. GET requests are used to retrieve data, and do not have access to request bodies.  
POST, PUT, and DELETE calls are used for other actions. 
  + `POST` requests call for the creation of ann entity
  + `PUT` requests call for an enntity to be updated
  + `DELETE` requests call for an entity to be deleted  
Eachh of these request types can use the following types of data:
  + Querystring parameters
  + Request bodies
  + URL Params
  + Headers 
