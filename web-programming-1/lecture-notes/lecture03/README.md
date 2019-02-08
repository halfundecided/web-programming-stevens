# Lecture 03: Async Programming

## What is Asynchronous(비동기) Code?
### How is JavaScript run?
+ JavaScript runs off of whar is known as an _event_ loop. 
+ Every statement gets added into a queue of instructions to run, that are processed in order. 
+ However, some operations (such as making network requests, file calls, etc.) are very expensive and would normally use up huge amounts of time and resources in order to complete. This would normally result in blocking execution.
+ Rather than allowing these to block all execution, we can use asynchronous code in order to continue execution and run the code that relies on the results of expensive operations in callbacks that occur at a later point in time. 

### What is synchronous code 
+ Synchronous code is code that runs in the order it is written.
+ The key to remembering the difference between asynchronous and synchronous programming is to view all programming as a chain of operations.
+ In __synchronous__ code, these operations are run __sequentially__. Operations that are written first, will be run first. This will hold true even for functions that run callbacks despite being synchronous, such as [].map
+ In __asynchronous__ code, some operations are run __non-sequentially__. No order is guaranteed. Traditionally, asynchronous functions will take callback functions in order to run code that relies on the result of the function.

### A callback function?
+ In JavaScript, you can pass functions as the arguments for other functions. 
+ This is very useful for asynchronous code, as you can pass a callback function to a long-running function. 
+ Examples
  + You can make a database call that runs asynchronously, and when the result comes back pass the result to the callback 
  + You can make a network request that runs asynchronously, and when the request is completed the response is passed to the callback. 

## Where will we use asynchronous code?
### When working with files
There are many file system functions that are exposed through node's native `fs` module. Most of these are asynchronous, as I/O operations on a computer are notoriously slow. 
  + Read and write files
  + Get directory listings
  + Create and delete directories
  + Watch for file changes to occur
  + https://nodejs.org/api/fs.html

### Running a Web Server
When you run your own web server, you have no idea when someone will actually access your routes. For this reason, all your server code will be __asynchronous__. Your server code will have to wait for a network request to initiate before sending data back down to the client. 

### Making an HTTP Request 
+ Making an HTTP request is an asynchronous operation, since it can take a very long time for the request to complete. 
+ There are many more parts than you would expect to making an HTTP request, and the responding server(if it exists) could take any amount of time to complete the request. 
+ For this reasint, HTTP requests are asynchronous so that the file can be downloaded and such while other operations are completing, rather than blocking and holding up your entire application when a server is responding slowly. 

### Database Operations
+ Connecting to a database, finding entried, creating new entries, updating old entries, and deleting entries are all asynchronous operations.
+ There is a great deal of network traffic/inter-process communication that has to occur to perform any database operation, and then a result must be awaited. 

## Example: Reading Files with Callbacks 
### Our Goal
1. Use prompt to ask the user for the name of a file to open
2. Once that is complete, we will read the file
3. Once that is complete, we will reverse the content of the file
4. Once that is complete, we will save the file again  
---> [Go to callbacks folder]()


