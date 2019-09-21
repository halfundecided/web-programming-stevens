# Lecture 03: React

## What is React?

It's a **UI component library**. The UI components are created with React using JavaScript, not a special template language. This approach is called creating composable UIs, and it's fundamental to React's philosophy.  
`React UI components are highly self-contained, concern-specific blocks of functionality.`

A few Examples of some components

- data-picker
- Captcha
- Address
- ZIP code
- Autocomplete
- Contact Form
- User Sign-in/Sign-up

## The problem that React Solves

What problem does React solve? Looking at the last few years of web development, note the problems in building and managing complex web UIs for front-end applications: React was born primarily to address those.

## Benefits of using React

- Simpler apps: React has a CBA with pure JavaScript; a declarative style; and powerful, developer-friendly DOM abstractions (and not just DOM, but also iOS, Android, and so on).
- Fast UIs: React provides outstanding performance tanks to its virtual DOM and smart-reconciliation algorithm, which, as a side benefit, lets you perform testing without spinning up (starting) a headless browser.
- Less code to write: React's great community and vast ecosystem of components provide developers with a variety of libraries and components. This is important when you're considering what framework to use for development.

## Simplicity

In React, this simplicity is achieved with the following features:

- **Declarative over imperative style**: React embraces declarative style over imperative by updating vies automatically.
- **Component0based architecture using pure JavaScript**: React doesn't use domain-specific language(DSLs) for it scomponents, just pure JavaScript. And there's no separation when working on the same functionality.
- **Powerful abstractions**: React has a simplified way of interacting with the DOM, allowing you to normalize event handling and other interfaces that work similarly across browsers.

## Declarative vs Imperative Style

Declarative style means developers write how it should be, not what to do, step-by-step (imperative).  
But why is declarative style a better choice? The benefit is that declarative style reduces complexity and makes your code easier to read and understand.

```javascript
/* Imperative */
var arr = [1, 2, 3, 4, 5],
  arr2 = [];
for (var i = 0; i < arr.length; i++) {
  arr2[i] = arr[i] * 2;
}
console.log("a", arr2);

/* Declarative */
var arr = [1, 2, 3, 4, 5],
  arr2 = arr.map(function(v, i) {
    return v * 2;
  });
console.log("b", arr2);
```

The convenience of React's declarative style fully shines when you need to make changes to the view. Those are called changes of the internal state. When the state changes, React updates the view accordingly.

## React and the Virtual DOM

React uses a **virtual DOM** to find differences (the delta) between what's already in the browser and the new view. This process is called **DOM diffing** or **reconciliation of state** and view (bringing them back to similarity). This means developers don't need to worry about explicitly changing the view; all they need to do is update the state, and the view will be updated automatically as needed

## Componen-Based Architecture Using Pure JavaScript

- Component-based architecture existed before React came on the scene.
- Separation of concerns, loosing coupling, and code reuse are at the heart of this approach because it provides many benefits
- A building block of CBA in React is the component class.
- as with other CBAs, it has many benefits, with code reuse being the main one (you can write less code).

## Powerful Abstractions

**React has a powerful abstraction of the document model. It hides the underlying interfaces and provides normalized/synthesized methods and properties.**

## Speed and Testability

React's virtual DOM exists only in the JavaScript memory. Every time there's a data change, React first compares the differences using its virtual DOM; only when the library knows there has been a change in the rendering will it update the actual DOM.

1. Render
2. State changes(`setState`)
3. Smart diffing algorithm(reconciliation)
4. Rerender only affected elements

## Single-page applications and React

- Another name for SPA architecture is thick client, because the browser, being a client, holds more logic and performs functions such as rendering of the HTML, validation, UI changes, and so on. Let's take a bird's-eye view of a typical SPA architecture with a user, a browser, and a server.

- The figure depicts a user making a request, and input actions like clicking a button, drag-and-drop, mouse hovering, and so on

## Properties

Properties are a cornerstone of the declarative style that React uses. Think of properties as **unchangeablevalues within an element**. They allow elements to have different variations if used in a view, such as changing a link URL by passing a new value for a property: `React.createElement('a', {href: 'http://www.google.com'})`  
One thing to remember is that **properties are immutable(불변의) whithin their components.** A parent assigns properties to its children upoin their creation. **The child element isn't supposed to modify its properties.**  
For instance, you can pass a property `PROPERTY_NAME` with the value `VALUE`, like this: `<TAG_NAME PROPERTY_NAME = VALUE />`  
Properties closely resemble HTML attributes. This is one of their purposes, but they also have another: you can use the properties of an element in your code as you wish. Properties can be used as follows:

- To render standard HTML attributes of an element: href, title, tyle, class, and so on.
- In the JavaScript code of a React component class via this.props values; for example, `this.props.PROPERTY_NAME` (replacing PROPERTY_NAME with your arbitrary name)

```js
render() {
  if (this.props.heading) return <h1>Hello</h1>
  else return <p>not Hello</p>
}
```

## JSX - JavaScript XML

JSX is a preprocessor step that adds XML syntax to JavaScript.
You can definitely use React without JSX as we have seen but JSX makes React a lot more elegant.  
Just like XML, JSX tags have a tag name, attributes, and children. If an attribute value is enclosed in quotes, the value is a string. Otherwise, wrap the value in braces and the value is the enclosed JavaScript expression.

1. **JSX is an Expression too**: After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects. This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions:

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

2. **Specifying Children with JSX**
   If a tag is empty, you may close it immediately with `/>`, like XML: `const element = <img src={user.avatarUrl} />`  
   JSX tags may contain children:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

3. **JSX prevents Injection Attacks**
   It is safe to embed user input in JSX. By default, React DOM excapes any values embedded in JSX before rendering them.

## Babel

Babel is a free and open-source JavaScript compiler and configurable transpiler used in web development. Babel allows software developers to write source code in a preferred programming language or markup language nad have it translated by Babel into JavaScript, a language understood by modern web prowsers.

## State: What are React component states?

A React **state** is a mutable data store of components - self-contained, functionality-centric blocks of UI and logic. **Mutable** means state values can change. By using state in a view (render() and changing values later, you can affect the view's representation).

The **state object** is an attribute of a component and can be accessed with a **this** referencel for example, **this.state.name**. You will recall that you can access and print variables in JSX with curly braces(`{}`). Similarly, you can render **this.state** in render(); for example, `{this.state.inputFieldValue}`. This syntax is similar to the way you access properties with `this.props.name`.

When you want to use state in your render method you need to initilize the state. We do this in the **constructor method** within your React class like so:

```js
constructor(props) {
  super(props);
  this.state = {
    userID: this.props.uid,
    userName: this.props.userName
  }
}
```

## Setting State

When we set state we need to do it in a certain way. We can't simply type: `this.state.author="Patrick Hill"`  
We need to use the `setState()` method: `this.setState({author: 'Patrick Hill`});`The only place where you can use`this.state` to set the state is in the constructor.

## State vs. Properties

React introduces a concept of state and properties

- State is the internal state of your component at a point in time. **It is changed based on user action.** Your state is the **data of the component at a point in time.** Generally, states revolve around UI updates.
- Props can be seen as the configuration. **Props cannot be changed.**  
  We can build components with ot without states. Components without states are called stateless components.

## Component Lifecycle

React defines several component events in three categories. Each category can fire events various number of times:

- **Mounting**: React invokes events only once.
- **Updating**: React can invoke events many time.
- **Unmounting**: React invokes events only once.
