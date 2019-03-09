# Lecture 06: Fundamentals of Web Development

## What is the web, and how does it work?

### The Core Process of the Web
At the end of the day, the web is all about the communication of ideas. Everything in the web can be seen as a __request__ and a __response__.
  + When you go to a news website, you're requesting news and receiving news in response. 
  + When you go to a shopping website, you're requesting product information and receiving relevant information.
  + When your server receives input, it determines what to do with that input and outputs the proper response.  
Your duty as a web developer is to make that communication possible. Your programs will get a request and give a response, and allow that communication to occure as smoothly as possible. 

### The request
Every time you navigating to a website, your browser sends a request on your behalf to the server.
  + There is a lot to an HTTP request. 
  + Each request follows a standardized process. [details](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)  
Every request is formatted in a specific way, with the same data provided on each request. 

### Parts of that request
HTTP Verb signifying what action you are trying to (GET POST PUT DELETE) The server you want to connect to (the HOST).  
The location of the resource you want to access on that server (the location) Headers 
  + Headers are metadata about your request
  + These include cookies

### What does the server do with that info?
The server reads that request and determines what needs to be done in order to generate a response that makes sense for the data that the server has been given. 