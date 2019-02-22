# Lecture 04: MongoDB

## An extremely brief prelude
### JSON
We use JavaScript style objects to transmit data between processes, servers, systems. etc. The standard followed when transmitting objects is called JASON: JavaScript Object Notation, a syntax for serializing objects, arrays, numbers, strings, booleans and null.  
In MongoDB, data is stored in a binary version of JSON.  
  + We can parse a JSON string to be an object using `JSON.parse(someJSONstring)`.
  + We can take a JavaScript object and serialize it to JSON using `JSON.stringify(myObject)`

## Intro to Databases
### What is a database? 
A database is an organized collection of data. It allows you to create, read, update, and delete data. Unlike storing in memory, databases allow you to persist your data.  
__MongoDB__ is a __document-based database__.
  + __Document-based__ databases store semi-structured data (think, JSON!) and only lookup by key(a unique identifier).  
You interact with MongoDB by submitting queries to your database that describe operations that you wish to do. 

### What is a document-based database?
Traditional databases are stored in tables that are composed of columns describing data and rows of data. They have a pre-defined schema to them, constraining the type of data you can make in each table.  
Document-based databases forgo this, and allow you to simply store and retrieve data at a particular location. They are very good at ID lookups, but suffer slightly on querying.

### Why MongoDB?
MongoDB is incredibly easy to setup and use, allowing you to focus on web-development as a whole and how all the parts work together, rather than focusing on the nuances of databases.  
It stores JSON-like structures, making it easy to conceptualize.
  + Easy to have nested objects(subdocuments)  
Much like objects, each collection stores data in a dictionary fashion.  
The querying language is composed by JSON that describe queries, making it easy to pick up. 

### The structure of MongoDB
MongoDB only has a few layers to it:
  + __Databases__: You can create a database to contain related collections
  + __Collections__: Each database has a number of collections. Collections are sets of documents that you _decide_ are related by their content.Your documents do not have to have the same fields.
  + __Documents__: Documents are self contained pieces of data that you store in a collection. 
  + __Subdocuments__: A document field can describe another document that will be stored in its parent. This is akin to an object that has a second object stored as a property. This is referred to as a subdocument. 

### Basic operations in MongoDB 
  + __Insert__: will take an object and insert it into the database. 
  + __Find__: will take an object describing fields and values to match and returns an array of matching documents.
  + __Update__: will take two objects; one that contains an object describing fields and values to match, and one tht will describe the update to perform. It can update multiple if you provide a third object with settings telling it to update multiple documents. 
  + __Remove__: will take an object describing fields and values to match and will remove the object. It can remove multiple if you provide a second object with settings telling it to update multiple documents. 

### Demonstration
  + [mongoConnection.js](): This file allows you to create one shared database connection for your entire app!
  + [mongoCollections.js](): In this file, you can setup a module that will export async functions (promises) that reesolve to database collections; this insures that the connection is working, and allows you to organize code better 
  + [dogs.js](): This file sets up a module that shows the basic pattern of Create, Read, Update, and Delete!

## Connecting to MongoDB
### Installing the MongoDB driver package
We will be using the official MongoDB driver released by the official Mongo team; Other drivers add complexity that we need not worry about for the scope of this course.  
`npm install mongodb --save`  
Using the driver is simple, since MongoDB natively uses JSON to query and store documents.
  + We will be using this driver in order to setup connections do basic querying against MongoDB. 
  + See the api section for the most recent driver for documentaton!  
The MongoDB driver methods return promises, which means we can await them from inside of async functions.

### Connecting to your database 
Once we deal with installing the package to the project and reequiring it, we can create a database connection. This is demonstrated in __mongoConnection.js__ file we saw before.  
The basic algorithm of using a database is simple: 
  + You use connection information in order to connect to the database. 
  + You store this database connection in a variable and use it to access collections 
  + You store this collection reference in a variable and use it to access collection operations 

### Creating and using a collection
In order to create, read, update, or delete documents you must first have a collection. Collections will be automatically created when a document is first inserted into a new collection. We can retrieve data from a collection by retrieving a reference to the collection and querying it, which you can see in dogs.js

### Abstracting Your Queries 
It is often very useful to create a file to abstract away your database querying.  
By creating a layer between your application code and your database, you will allow yourself to: 
  + More easily make changes to thee database lateer on 
  + Allow non-database programmers to more easily use thee database (separation of concerns!)
  + More easily improve performance at a later time 
  + Easier and more consistent error checking throughout your entire application.
  + Make it a reasonable task to change your entiredatabase when the first database your company chose ends up being unable to support large amounts of data and you need to transition over to another database. 
  

## Basic Data Manipulation in MongoDB
### Inserting into your collection
In [app.js]() 