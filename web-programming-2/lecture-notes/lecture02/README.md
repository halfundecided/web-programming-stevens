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

### For and each

```css
@for $i from 1 through 3 {
  .item-#{i} {
    width: 2em * $i;
  }
}
```

```css
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url("/images/#{$animal}.png");
  }
}
```

### Minxins

Mixins are styles that can have parameters. We include the mixins, rather than extend them.

```css
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}

.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
```

### Functions

We can write our own functions in SASS, which allow us to very easily create our own libraries full of rules and utility methods that we can use across an entire project.

```css
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar {
  width: grid-width(5);
}
```

### Extending

We can extend content so that we can reduce redundancy in our HTML and no longer have to remember combinations of classes to define

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

compiled to:

```css
.error,
.seriousError {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}
```

## Building Bootstrap 4

### Bootstrap 4 Changes

Bootstrap 4 is a major rewrite of Bootstrap that is currently in beta.  
The major differences are:

- Dropped IE8 support; IE9+
- Changed from LESS to SASS
- Now using `rem` as the primary unit
- New, even tinier grid added
- Flexbox grid added
- Panels, thumbnails, and wells are now cards
- General improvements

### What's the compromise?

We can compromise by still using Bootstrap but customizing and building our own version of Bootstrap.  
There are 2 general strategies:

- Download Bootstrap's compiled version and modify it accordingly.
- Download Bootstrap's source code, change variables, and build it yourself.  
  By downloading Bootstrap's source, we can create our own copy of its style
- By keeping a reference to source repository, you can pull in updates constantly from the official Bootstrap repository.
- You can modify all variables and cleanly modify the entire display with minimal tweaks to the actual source logic.

### How do we compile Bootstrap?

Bootstrap 4 is written in SASS, so we can just customize it by updating the SASS source files. We can easily create Gulp setup to go through the process of building it ourselves. You can install the bootstrap through NPM, and reference the SASS files in your gulp script.  
`npm install bootstrap`

### Selectively including Components

One of the easiest optimizations to ever make is removing things you don't need. Bootstrap's primary file `bootstrap.scss` is actually just a series of includes that allow you to selectively enable and disable components from being included.  
If you know that your page only nees a certain subset of features, you can simply remove thoes includes from this file and enjoy the benefits of:

- Smaller downloads
- Shorter build times
- Simpler code base with fewer things to worry about

### Tweaking Bootstrap: Variables

The first thing to look for when tweaking Bootstrap is the `_variable.scss` file.  
This file contains a series of variables that can be updated that each are propagated throughout the entire bootstrap source. You will notice that there are many branding-related concepts. By tweaking a single variable, we can change the look and feel of many components to all be matching

### Tweaking Bootstrap: Modifying the content

Bootstrap runs off a series of includes, meaning that it's designed in an incredibly modular fashion.  
Each included file builds out one single component, meaning that you can modify components and not affect other styles.  
We can also follow their design pattern and leverage their common utility classes to create new components of out own. We can write out components using the Bootstrap variables and mixins to quickly create highly consistent components.

## Gulp

### What is Gulp?

- Gulp is, simply put, a task runner.
  - You think of tasks. It runs these tasks.
- Gulp is a node module that is centralized on the concept of using streams and manipulating their data
- Gulp is a command line tool, that is installed through a global node module known as `Gulp`.

### What will our first task do?

Our first task will take a bunch of SASS code and turn it into a single CSS file.

- Grab all scss files we want to compile
- Initialize a sourcemap
- Compile the SASS into CSS
- Add prefixes to increase browser support
- Concatenate all the files
- Minify the result
- Save the result to file

### What modules?

- `gulp-sass`: Compiles SASS into CSS using libsass
- `gulp-sourcemaps`: Creates a map from old code to new code
- `gulp-concat`: Concatenates files.
- `gulp-clean-css`: Minifies our CSS
- `gulp-autoprefixer`: Adds useful vendor prefixes for browser support
