# CS546 Web Programming1: Lab8

## Template Time

For this lab, you will be using HTML, CSS, and Handlebars to make your first simple templated web application! You will be building a form that allows you to search through a familiar dataset.  
You will be making three pages in your application:

- `http://localhost:3000/` the main page of this application will provide a search form to start a search on the dataset
- `http://localhost:3000/search` this page will search through the `people.json` dataset and return up to 20 matching results, where either the `firstName` or `lastName` contains the provided request form param, `personName`.
- `http://localhost:3000/dettails/{id}` this page will show all the details of the person with the id matching the provided URL param, `id`
- **All other URLs should return a 404**

### `GET http://localhost:3000/`

- [x] This page will respond with a valid HTML document.
- [x] The title of the document should be "People Finder". You should have the title set as the `<title>` element of the HTML document and as an `h1` in your document.
- [ ] Your page should reference a CSS file, `/public/site.css`; this file should have at least 5 rulesets that apply to this page; these 5 rules can also apply to elements across all of your pages, or be unique to this page.
- [x] You should have a `main` element, and inside of the `main` element have a `p` element with a brief (2-3 sentence description) of what your website does.
- [x] Also inside the `main` element, you will have a `form`; this `form` will `POST` to `/search`.
  - [x] This `form` will have an `input` and a `label`; the `label` should properly reference the same `id` as the `input`.
  - [x] you should also have a `button` with a type of `submit` that submits the form. The `input` in your `form` should have a `name` of `personName`.

### `POST http://localhost:3000/search`

- [x] This page will respond with a valid HTML document.
- [x] The title of the document should be "People Found". You should have the title set as the `<title>` element of the HTML document and as an `h1` in your document.
- [x] In an `h2` element, you will print the supplied `personName`.
- [ ] Your page should reference a CSS file, `/public/site.css`; this file should have at least 5 rulesets that apply to this page; these 5 rules can also apply to elements on `/`, or be unique to this page.
- [x] You should have a `main` element, and inside of the `main`element have a `ul` tag that has a list of up to 20 people matching the `personName` found in the request body in the following format (after searching `Rob`).

```html
<ul>
  <li>
    <a href="/details/1">Rob Herley</a>
  </li>
  <li>
    <a href="/details/99">Dolph Robottham</a>
  </li>
  <li>
    <a href="/details/270">Grady Orrobin</a>
  </li>
</ul>
```

- [x] You must also provide an `a` tag that links back to your `/` route with the text `Make another search`.
- [x] If no matches are found, you will print the following HTML paragraph:

```html
<p class="not-found">
  We're sorry, but no results were found for {personName}.
</p>
```

**If the user does not input text into their form, make sure to give a response status code of 400 on the page, and render an HTML page with a paragraph class called `error`; this paragraph should describe the error.**

### `GET http://localhost:3000/details/{id}`

- [x] This page will respond with a valid HTML document.
- [x] The title of the document should be "Person Found". You should have the title set as the `<title>` element of the HTML document and as an `h1` in your document.
- [x] In an `h2` element, you will print the name of the person found.
- [ ] Your page should reference a CSS file, `/public/site.css`; this file should have at least 5 rulesets that apply to this page; these 5 rules can also apply to elements on `/`, or be unique to this page.
- [x] You should have a `main` element, and inside of the `main` element have a `dl` tag that has a definition list of all the properties of the matching person in the following HTML structure.  
       Matching Person:

```json
{
  "id": 1,
  "firstName": "Robert",
  "lastName": "Herley",
  "address": "1 Castle Point",
  "zip": "07030",
  "phone": "(631) 8967161",
  "ssn": "123-45-6789"
}
```

HTML Printed:

```html
<dl>
  <dt>ID</dt>
  <dd>1</dd>
  <dt>First Name</dt>
  <dd>Robert</dd>
  <dt>Last Name</dt>
  <dd>Herley</dd>
  <dt>Address</dt>
  <dd>1 Castle Point</dd>
  <dt>Zip Code</dt>
  <dd>07030</dd>
  <dt>Phone</dt>
  <dd>(631) 8967161</dd>
  <dt>Social Security Number</dt>
  <dd>123-45-6789</dd>
</dl>
```

**If the user does not input text into their form, make sure to give a response status code of 400 on the page, and render an HTML page with a paragraph class called `error`; this paragraph should describe the error.**

### `http://localhost:3000/public/site.css`

- [ ] This file should have 5 rulesets that apply to the `/` route, and 5 rulesets that apply to all of your pages. Rulesets may be shared across both pages; for example, if you styled a `p` tag, it would count as ` of the 5 for both pages. You may include more thant 5 rulesets if you so desire.

## Hint

You can use varialbes in your handlebars layout, that you pass to res.render. For example, in your layout you could have:

```html
<meta name="keywords" content="{{keywords}}" />
```

and in your route:

```js
res.render("someView", { keywords: "dogs coffee keto" });
```

Which will render as:

```html
<meta name="keywords" content="dogs coffee keto" />
```

## Requirements

- You must not submit your node_modules folder
- You must remember to save your dependencies to your package.json folder
- You must do basic error checking in each function
  Check for arguments existing and of proper type.
  Throw if anything is out of bounds (ie, trying to perform an incalculable math operation or accessing data that does not exist)
- If a function should return a promise, instead of throwing you should return a rejected promise.
- You must remember to update your package.json file to set app.js as your starting script!
- Your HTML must be valid (Links to an external site.)Links to an external site. or you will lose points on the assignment.
- Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as i, b, font, center, etc) will result in points being deducted; think in terms of content first, then style with your CSS.
- You can be as creative as you'd like to fulfill front-end requirements; if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.
- All inputs must be properly labeled!
- All previous requirements about the package.json author, start task, dependenices, etc. still apply
