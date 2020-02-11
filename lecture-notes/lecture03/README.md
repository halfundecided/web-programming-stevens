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
---> [Go to callbacks folder](https://github.com/halfundecided/web-programming-stevens/tree/master/web-programming-1/lecture-notes/lecture03/callbacks)


## Promises
### What is a promise?
프로미스는 자바스크립트 비동기 처리에 사용되는 객체  
A promise is an object that represents the eventual result of some asynchronous operation. Rather than blocking, an asynchronous method will go through the following steps: 
  + Immediately return a new Promise object, which takes a callback to run on success and failure 
  + Prepare the asynchronous call
  + Run the asynchronous component of the method; due to how JavaScript's event queue works, this will always begin to run after the current method ends. 
  + Return a promise that will resolve the request after the asynchronous operation is completed 

### Three status of promise
프로미스를 사용할 때 알아야 하는 가장 기본적인 개념은 바로 프로미스의 상태이다. 여기서 말하는 상태란 프로미스의 처리과정을 의미한다. `new Promise()`로 프로미스를 생성하고 종료될때까지 3가지의 상태를 갖는다. 
  + __Pending__: 비동기 처리 로직이 아직 완료되지 않은 상태
  + __Fulfilled__: 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
  + __Rejected__: 비동기 처리가 실패하거나 오류가 발생한 상태 

### Pendiing
When you call `new Promise()` method, it's on pending status.   
`new Promise();`
You can approach to its arguments, resolve and reject. 
```javascript
new Promise(function (resolve, reject) {
  //...
});
```

### Fulfilled(완료)
This become fulfilled status. 
```javascript
new Promise(function (resolve, reject) {
  resolve();
});
```
and you can get the result of this using `then()`
```javascript
function getData() {
  return new Promise(function (resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolvedData로 받음
getData().then(function (resolvedData) {
  console.log(resolvedData); //100
});
```

### Rejected
If you execute reject() method, it becomes rejected status. 
```javascript
new Promise(function (resolve, reject) {
  reject();
});
```
You can get the reason of rejection using `catch()`
```javascript
function getData() {
  return new Promise(function (resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

// reject()의 결과 값 Error를 err에 받음
getData().then().catch(function (err) {
  console.log(err); // Error: Request is failed
})
```


### Why are they useful?
Promises allow us to write code that resembles synchronous code in how it is syntactically written, while actually writing powerful and complex asynchronous code.  
It is a cleaner way of performing asynchronous operations, rather than infinitely nesting callbacks, which cause for easier development. --> [Go to promises folder]()

## async / await
### Asynchronous code is messy
In geeneral, writing asynchronous code is syntactically messy. 
 + Ends up in deeply nested callbacks
 + Creates huge promise chains
 + Hard to error check

### async functions
+ A function can be defined as an __async function__, which means that the function will automatically return a promise (even if there are no asynchronous operation in that function)
+ By marking a function as __async__, you allow the await keyword to be used inside of the function.
+ Besides their ability to await promises and their gauranteed returning of a promise, there is no difference between a function and an async function.

### awaiting promises
+ The __await__ keyword can only be used inside of an __async function__
+ When you __await__ a promise, you will cause the rest of the function to execute _after that promise resolves or rejects_. If the promise rejects, an error will be thrown on the line that awaits it. 
  + This allows you to use try/catch syntax in asynchronous operations!
+ The result of an __await__ operation is whatever the promise resolves to. If the promise does not resolve to a value, it will have a result of undefined. 

## References
- https://joshua1988.github.io/web-development/javascript/promise-for-beginners/