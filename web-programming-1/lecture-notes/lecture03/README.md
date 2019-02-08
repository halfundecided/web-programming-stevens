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
+ In __asynchronous__ code, some operations are run __non-sequentially__. No order is guaranteed. 