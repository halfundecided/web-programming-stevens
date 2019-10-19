# Lecture 06: Next.js

## What is `Next.js`?

Next.js is a universal JavaScript framework that runs in the browser and the server. It offers developers an easy way to get started, and as it uses React.js for templating.  
It is also a straightforward way for developers with React experience to get productive fast.  
The advantages of this approach is to be able to create Rich User experiences in a uniform way, without compromising Search Engine Optimization (SEO) factors that are key to good ranking on Google and other search engines.  
Here are some other cool features Next.js brings to the table:

- Server-rendered by default
- Automatic code splitting for faster page loads
- Simple client-side routing (page based)
- Webpack-based dev environment which supports Hot Module Replacement
- Able to implement with Express or any other Node.js HTTP server
- Customizable with your own Babel and Webpack configurations

## Installing Next.js

- Quick start: `npx create-next-app`
- and add a script to your `package.json` like this:

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

- After that, the file-system is the main API. Every `.js` file becomes a route that gets automatically processed and rendered.
- Populate `./pages/index.js` inside your project:

```js
export default () => <div>Welcome to next.js!</div>;
```

- and then just run `npm run dev` and go to `"http://localhost:3000"`. To use another port, you can run `npm run dev -- -p <your port here>`.
- So far, we get:
  - Automatic transpilation and bundling (with webpack and babel)
  - Hot code reloading
  - Server rendering and indexing of `./pages`
  - Static file serving. `./static/` is mapped to `/static/`

## Automatic Code Splitting

Every `import` you deplare gets bundled and served with each page. That means pages never load unnecessary code

```js
import cowsay from "cowsay-browser";

export default () => {
  <pre>{cowsay.say({ text: "hi there!" })}</pre>;
};
```

## Static Files

- Create a folder called `public` in your project root directory. From your code can then reference those files starting from the base URL `/`

```js
function MyImage() {
  return <img src="/my-image.png" alt="my image" />;
}

export default MyImage;
```

- To serve static files from the root directory you can add a folder called `public` and reference those files from the root, e.g.: `/robots.txt`.

## Navigating Between Pages

```js
import Link from "next/link";

const Index = () => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
);

export default Index;
```

You can also use this as attribute to show a prettier link (more for dynamic URLs)

```js
<Link as={`/show/${show.id}`} href={`/show?id=${show.id}`}>
  <a>{show.name}</a>
</Link>
```

- Client-Side History Support
  - When you hit the Back button, it navigates the page to the index page entirely via the client; `next/link` does all the `location.history` handling for you
  - You don't need to write even a single line of client-side routing code
  - Simply link pages; it just works!
