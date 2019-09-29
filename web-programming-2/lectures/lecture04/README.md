# Lecture 04: React 2

## Event Handling and Processing

### React Event Handling

For example, the HTML:

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

is slightly different in React:

```js
<button onClick={activateLasers}>Activate Lasers</button>
```

```html
<a href="#" onclick="console.log("The link was clicked."); return false"> Click me </a>
```

In React, this could instead be:

```js
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked");
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me{" "}
    </a>
  );
}
```
