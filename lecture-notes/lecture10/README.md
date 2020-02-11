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

### What is authentication?

Authentication is the act of confirming the idenntity of a person, group, or entity. In web technology, this often means creating a **user login system**

- You will use a combination of data in order to identify a user.  
  There are many other forms of authentication in web technology:
- You can make an authentication system that allows you to limit API Access
  - Force users to have a token
  - Allow users a certain number of access hits a month
- You can selectively allow or dis-allow access to resources based on user login state

### Implementing Authenticationn

In order to implement authentication and create a user login system, we will breaking down the task into several steps:

- Creating and storing users
- Allowing users to login via a form
- Storing session data in a cookie
- Validating the data stored in the cookie
- Storing the user as part of the request object.

### 1. Creating and Storing Users

The first step of authentication is very, very easy; you hate to create, and store users.  
There are some things you will be storing, and some things you will be storing in a very specific way

- First off, **you will never store a plaintext password.** You will be using the **bcrypt** package in order to create a hash of the password
- For the sake of authentication, you're going to be adding an array for users that will keep track of multiple session identifiers. These session identifiers will allow you to keep track of logged in browser sessions

You will need to create a form to allow users to signup, where you will need to check for:

- Duplicate username / emails / other non-duplicatable data
- Existence of passwords

### 2. Allowing users to login via a form

This step is extremely easy!  
You will need to provide users with some way to actually perform a login. You will need to setup a form that allows users to POST their username and password to a route.  
This route will nneed to validate the username and password provided against entries in the database.

- You will retrieve the user with that matchinng username
- You will use **bcrypt** to compare if their supplied password is a match to the their **hashed password**  
  I have created a simple file, bcrypt_example.js to demonstrate how to use bcrypt to create and compare hashes.  
  If there is a match, you can proceed; if not you will simply allow the request to continue.

### 3. Storing session data in a cookie

If the user logged in with proper credentials, you will then create a session id! This session id should be some sort of very long identifier, such as a Guid.  
Rather than storing the user id or username, and password in cookies, we instead are opting to store a session id so that the username or password cannot be intercepted.  
This session id will be passed to the user via-cookie and will also be stored as one of many session ids on the user in the database.

### 4. Validating the data stored in the cookie

It is now time to make your middleware!  
Your middleware should run on each request, and will check for a cookie containing a session ID  
If it contains a session id, you will check the database for a single user that has that session id stored in their session id field

- If there is a match, you’ve found your user!
- If not, your request is coming from an unauthenticated source; expire their cookie.  
  If not, your request is coming from an unauthenticated source.

### 5. Storing the user in the request object

In your middleware, you have access to the request and the response objects, and you can add properties to them easily.  
If you are able to associate a session id with a user, you may define a property on the request (or response!) object that stores the user, or some representation of them (ie: just storing the user id).  
The data you store will be accessible:

- In middleware that are defined after the authentication middleware
- In your routes  
  If you define middleware after your authentication middleware, you can attach them to particular paths (such as /user) and, if a user is not logged in, you can redirect them. You can also do things such as check on other paths (ie: /admin) to see if the user has permission to access those paths, and redirect if not.

### Logging Out

Logging out is extremely easy, and only has two steps!

- After hitting a logout route, you will expire the cookie for the session id
- You will remove the session id from the user’s session id list
- You will invalidate any other cookies that are relevant to the user.  
  By doing both of those, you will have successfully invalidated the session and the user will no longer be authenticated.
