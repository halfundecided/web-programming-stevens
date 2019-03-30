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

### A request body
POST, PUT, and DELETE requests can all provide data in a request body. A request body is a series of bytes transmitted below the headers of an HTTP Request. We will be submitting a request body in two ways: 
  + Text that is in a JSON format (modern format of submitting data)
  + Text that is in a form data format (traditionally how browsers POST)  
The request body will be interpreted by our server using the body-parser middleware. 

### Using request body data
In order to access request body data, we must first apply the body-parser middleware.  
We will be having out express app use the JSON body-parser middleware.  
This will allow us to add text that is formatted as JSON to a request body, and to have our server parse thhe JSON and place the object in the request.body property.  
This will allow us to submit data with out `POST`, `PUT,` and `DELETE` calls and begin interacting with our server. 

### Using postman
As we use more methods, such as `POST`, `PUT`, and `DELETE`, is becomes increasingly difficult to test using your browser, particularly because you cannot directly `PUT` and `DELETE` from the browser.  
You can use a REST client such as Postman and PAW to test your API calls. 
  + https://www.getpostman.com/
  + https://luckymarmot.com/paw  
A REST client is a program that will allow you to easily configure and make HTTP calls to your servers. 

### Using Postman to send JSON
In order to use Postman, you need: 
  + The URL you wish to submit data to 
  + The request method you wish to use
  + Body data
    + You must set the body type to __raw__
    + You must also set the type to __JSON__

### Adding a blog post with Postman
```json
{
    "title": "Test JSON Post",
    "body": "Test JSON body",
    "posterId": 1
}
```

### Using that post on the server 
We can then use data posted on the server by accessing the `req.body` property. 
```javascript
router.post("/", (req, res) => {
    let blogPostData = req.body;

    postData.addPost(blogPostData.title, blogPostData.body, blogPostData.posterId)
        .then(() => {
            res.sendStatus(200);
        }, 90 => {
            res.sendStatus(500);
        });
});
```

### Updating data
We use the `PUT` verb to update data. URLs to update object often include its identifier. That means to update a blog post with an id of 3 you would PUT to `http://localhost:3000/blog/3` Your request body would contain the new version of the blog post. 

### Deleting data
Informing your server that you want to delete an entity is extremely easy. Much like `PUT`, you would send a `DELETE` call to a URL that contains the identifier. That means to delete a blog post with an id of 3 you would `DELETE` to `http://localhost:3000/blog/3`

## Server Side Error Checking
### What is server side validation?
Users will submit errors; it's a fact of life that as a web developer, you will encounter situations where an error is submitted.  
There are many types of errors that can occur: 
  + The user tries to request a resource that does not exist
  + The user inputs data that does not make sense
  + The user is not authenticated
  + The input the user provides does not make sense 
  + The user is attempting to access resources they do not have access to 

### Server side error checking
Whenever input comes from a user, you must check that this input is: 
  + Actually there
  + Actually the type you want
  + Actually valid 
There are two places you will need to perform error checking: 
  + Inside of your routes; this will easily catch user submitted errors 
  + Inside of your data modules; this will allow you to ensure that you don't create bad data. 

### Error handling in an API
While we build out these APIs, error handling is extremely easy. When you encounter an issue in your API routes, you will:
  + Determine what type of error it is and respond with the proper status code. 
  + In addition to the failed status code, also send back a JSON object that describes what happened. It can be as simple as having a property called `errorMessage` with a string describing the error, or an array of all the errors!
  