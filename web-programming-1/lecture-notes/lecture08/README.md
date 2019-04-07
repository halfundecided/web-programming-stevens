# Lecture 08: Introduction to CSS, HTML Forms, and Node Templating

## Express and Static Files

### What are static assets?

Lately, we have seen servers that were setup to send different content based on what route was requested.  
In web vernacular, an assets is something that your page uses:

- CSS stylesheets
- JavaScript files
- Images
- Fonts  
  Static assets are, simply, assets that don't change. This means that they are not dynamic content. You will often need many static assets to build out your web page.

### Setting Express to server assets

Express has pricelessly one inbuilt middleware for you to use: the static middleware.

- A middleware is a function that runs and modifies a request before it hits a route.  
  You can see the usage of the static middleware in **app.js** for the lecture code. This will allow you to access your static assets by going to the follow path: `/assets/path/to/file.ext`  
  Express is seeing that you match the `/assets` path, then navigating inside your asset folder until it finds /path/to/file.ext; if it finds it, it will serve the file.

### Sending a file through a route

Sometimes, you want to simply return a file that's not a necessarily asset. Some reasons are:

- Serving different HTML pages or CSS files to different users
- Using a pretty url to represent a file that has to be downloaded
  Proxing content and manipulating it  
  For this, you can use two methods on the response object:
- `response.sendFile(fle.ext)`: this methhod will send a file to the user's browser; if the browser can render it, it will render it; else it will ask the user to download it: useful for sending HTML, CSS, image, etc files
- `res.download(file.ext)`: this method will send a file to the user to be downloaded.

## Form Elements

### What is a form?

HTML Forms are one of the main points of interaction between a user and a web site or application. They allow users to send data to the web site. Most of the time thhat data is sent to the web server, but the web page can also intercept it to use it on its own.  
A form is a collection of fields used to signify user input. Forms allow for interactive experiences. Forms allow users to interact with the server: can submit data to server through forms. You can have multiple forms per page.

### What is a form made of?

Forms are made of a form element

- Has an `action` attribute that signifies where the form will be submitted to
- Has an `method` attribute that signifies how the form will be submitted (GET, POST, etc)
- Can have a name that helps identify the form through the DOM API  
  Forms have one or more inputs that allow users to populate data
- This data will be submitted to the server
- This data can be accessed through the DOM API

### What is an input?

An input is an individual piece of data

- Inputs have names
- Inputs can have id's
- Inputs have values
- Some types of input can have placeholders
  The server receives data in a key-value format, where the key is the name and the value is the value. Names are unique on a form-level basis. Ids are unique on a document level basis. Many types of input.

### What types of input can I have?

There are many types of input, most of them revolving around some sort of text. You will most commonly use:

- text
- email
- number
- radio
- file
- checkbox  
  By going to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input you can see a list of all input types and their properties

### Text based inputs

There are many types of input, most of them revolving around some sort of text.

- Text can be numerical
- Text can be string based  
  When submitting through an HTML form, this text is submitted as a **string**, no matter what the data type is.

### Single-Select and Radio Inputs

Some types of inputs internally store strings, but give a limited number of options.  
In the `select` example, the form will send information with `query` as the **key** and whichever option you select as it's **value**. It uses the option's **value** field to determine what query will get, when that option is selected.  
The `input type="radio"` example, as far as the form is concerned, puts the same data as the `select` example. The value of whichever radio input is checked (which changes when the user selects a new value) will become the value of `query`.

```html
<select name="query">
  <option value="Austin">Austin</option>
  <option value="Helvetica">Font</option>
</select>
<input type="radio" name="query" value="Austin" />Austin<br />
<input type="radio" name="query" value="Helvetica" checked />Font
```
