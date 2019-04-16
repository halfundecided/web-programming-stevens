# Lecture 10: Middleware and Authentication

## Middleware

### What is middleware?

A middleware is a function that has access to the request and response objects.  
These functions can:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-responnse cycle.
- Call the next middleware function in the stack.  
  You can apply middleware to the entire application, or portionns of the applicationn.
- You can apply it to a portion of the application by supplying a path as the first parameter to the middleware function.

### Practical Uses for Middleware

Middlewares are useful for a number of reasons, and have many common uses

- Logging requests
- Authentication
- Access control
- Caching data
- Serialization

### Writing a middleware

Writing a middleware is extremely easy

- Register your middleware, optionally providing a path to apply that middleware to
- Have your middleware perform a task and when done:
  - Have your middleware end the response
  - Have your middleware call the next middleware

As an example, see the `server.js` file, which has several middleware:

- One which will count the number of requests made to your website
- One which will counnt the number of requests that have been made to the current path
- One which will log the last time the user has made a request, and store it in a cookie.
- One which will deny all users access to the `/admin` path.

## Authentication and Authorization

### What is authentication?

Authentication is the process of verifying what user is currently operating in a system. You would be most familiar with it throught the use of usernames and passwords.  
For example, on MyStevens, you are authenticated by supplying your Stevens username and password. By providing this data, the system sends a Cookie to your browser that stores a sessionn id that associates your requests to your user account.

### What is authorization?

Authrization and authentication are often confused.  
While **authentication** handles **who** you are, **authorization** is the process of validating **what you can access**.  
Authorization comes in many forms; typically, you will see three or more layers of authorization

- Public facing pages; even users that are not authenticated can see these pages. For example, your home page or login page would be public facing
- Authenticated only pages; pages that all authenticated users can see
- Role or claim based pages; pages that users can only see if they have certainn account types, such as faculty being able to access grading features whereas students cannot.

### What are ways we can authenticate?

There are many strategies to authenticate an HTTP Request. We will fully explore **cookie based authentication** in a later section.  
Some other common authentication strategies:

- **Token based authentication**; passing an API token in the querystring to validate that you are a particular user
- **Basic Access Authentication**; providing a username and password on every HTTP request
- **JWT Tokens** being used for authentication

## Using cookies

### What is a cookie?

An HTTP Cookie is a small piece of data that is shared between the server and the client.

- Can be read or set in client or server
- Ultimately, sent back and forth as string data  
  Cookies are sent through headers.  
  HTTP Cookies cannot be deleted, but can be expired
- After their expiration data, they will automatically be removed  
  Cookies will be sent back to the server on every request automatically; only new or updated cookies will be sent in a response.  
  **Cookies are a broswer concept**, and they are rarely passed back and forth when you are writing APIs or requesting resources programmatically.

### Installing the cookies-parser package

We will be using the cookie-parser middleware in order to easily handle out cookies as an object.

- The other case is to manually parse header and parse objects as well as we can, which can get redundant.  
   `npm install cookie-parser --save`
  We then apply the cookie-parser as a middleware, without a route path so that it applies to the whole application.

### Using cookies

- Client Side
  - You can set by setting `document.cookies = "key=value"`
  - Even though you are re-assigning, it will simply add it to your list of cookies.
  - You can get a list of all your cookies and their values usinng the `document.cookies` and parsing it to find the cookie of your choice
  - Deleting cookies requires that you set the cookie with an expirationl ie: `document.cookies = "key=value; expires=Thu, 01 Jan 1970 00:00:00 UTC";`
- Server Side
  - You can set cookies by calling the `response.cookies(name, value, options)` function
  - You can get cookies by referencing the `request.cookies` object, which will have cookies keyed by name.
  - Deleting cookies requires you to expire the cookies, which we can do by setting the cookie with the expires option set to any time in the past, then calling `response.clearCookie(name)`

## Cookie Based Authentication using Express, Middleware, and MongoDB
