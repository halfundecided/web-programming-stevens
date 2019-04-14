# Lecture 09: Frontend JavaScript and Client Side Form Validation

## Client Side JavaScript

### Differences between Node.js and Browsers

There is a global scope; variable collisions are a very large issue. You include JavaScript files through HTML.  
There is no native modules; rather, currently, including required code is done with module libraries or by including script files.  
You do not have access to any of the file system aspects of node. The syntax is often not up to date in most browsers. Different browsers behave differently.

### JavaScript "libraries"

Browsers, unfortunately, do not have the ability to just use scripts directly from NPM and include external code. Instead of having access to packages and modules, you must instead download "libraries" and include them on your page.

- A library is a pre-written JavaScript file that is released to make developing your own application easier.
- Some commom libraries are: jQuery, React, Bootstrap, AngularJS

### How JavaScript is run in the browser

While a web page is loaded, whenever it sees a script tag, it will pause execution and interpret the contents of the script element.

- If the script contains a reference to a file, it will start downloading the file (and download other script files at once) and interpret the contents.
- These files will be interpreted in the order of their script tags placement, even if they finish their downloads out of order.  
  After each script is interpreted, it is executed
- Interpretation is the process of the JavaScript language being parsed so the browser can execute it
- Execution is the part where the script is run and the commands are performed

### Manipulating the Page

One of the primary reasons for JavaScript to execute in the browser is to interact with the web page that users see. We do this, through manipulating the DOM

- Document
- Object
- Model  
  JavaScript, when run in the browser, is able to access the document (web page) and manipulate it in a number of ways through the DOM API.

## The DOM and JavaScript
