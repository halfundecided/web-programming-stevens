# Lecture 02: Gulp, SASS, Optimizations, and Bootstrap 4

## Easy Optimizations

### Declutter your head

The head tag blocks the page while assets are loading. You should basically never load JavaScript in your head tag, and only load small amounts of CSS.

### Minify, Uglify, Optimize your code

Minification is the process of removing whitespace and other unnecessary bloat from your code. This saves you many many kilobytes.  
Uglifying/Optimizing your code rewrites the code to remove as much as possible  
You should strive to have as few bytes as possible sent down. Even things that are usually large (huge JavaScript files) can be made small.

### Remove Dead Code / Reduce Overhead / Reduce Requests

You should make sure that all code that is unused is constantly removed. In general, you should make sure that you use as little code as possible. When possible, don't import huge libraries; import as small parts as possible.  
In addition, you should reduce the total number of requests as much as possible. Requests are very expensive operations.

### Use CDNS and Caching

Cached resources load near instanttly, and CDNS have the dual purpose of speeding up load time at a network level (by having multiple distribution centers), and by allowing scripts to be cached across many websites.

### Compress Text with Gzip, Optimize Images

Squash down every byte possible by using Gzip on your server to reduce the size of assets sent. You should also optimize images to make them as small as possible.

## SASS

### What is SASS?

- SASS is a pre-processed CSS language
  - It gets compiled into CSS
- It must be built before the browser can rendr it
  - We build with Gulp
- It's just syntactical sugar over CSS
  - [https://sass-lang.com/guide](https://sass-lang.com/guide)
  - SASS does not do anything that CSS does not, it just makes it more convenient to write

### What are SASS Features?

- Variables
- Nesting
- Imports
- Mixins
- Extending
- Inheritance

### Variables

We can define variables simply by using the dollar sign in front of a string name and assigning a value  
Variables have scope; they are accessible in the block they are defined

```css
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

### Operators

SASS supports many basic operators - and, it supports mixing units.

```css
.container {
  width: 100%;
}

article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}

aside[role="complementary"] {
  float: right;
  width: 300px / 960px * 100%;
}
```

### String interpolation

We can interpolate varialbes easily, which is very useful in mixins and making dynamic class names

```css
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
```

is compiled to:

```css
p.foo {
  border-color: blue;
}
```

### Nesting

You can nest SASS selectors in order to create a nested CSS output:  
You can use a parent selector to reference the selector and add rules before or after that selector rule-set.

```css
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```

is compiled to:

```css
#main p {
  color: #00ff00;
  width: 97%;
}

#main p .redbox {
  background-color: #ff0000;
  color: #000000;
}
```

### The parent selector

We can use the & symbol to state "for the selector I am nested inside with these other selectors" or "with this selector than the current selector"

```css
a {
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  body.firefox & {
    font-weight: normal;
  }
}
```

is compiled to:

```css
a {
  font-weight: bold;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
body.firefox a {
  font-weight: normal;
}
```

### Imports

You can have SASS import different files by using the `@import 'filename.scss` syntax. This is useful for including other related data.

### Nested Media Queries

We can nest media queries inside of rulesets and have the media query bubble up and wrap the updated ruleset.

```css
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
```

is compiled to:

```css
.sidebar {
  width: 300px;
}
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
```

### General control

We can use many common control types with SASS, such as `if` and `for`

```css
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```
