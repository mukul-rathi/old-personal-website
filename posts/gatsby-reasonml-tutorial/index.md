---
series: ReasonML
title: A step-by-step guide to integrating ReasonML into your Gatsby site
datePublished: 2020-03-31 14:00:00
excerpt: I walk through how to convert the standard Gatsby starter blog to use ReasonML!
image: ./main-picture.png
caption: ReasonML and Gatsby logo
FAQs:
  [
    {
      question: "How do I install Reason with Gatsby?",
      answer:
        "As with most things Gatsby, there's already a plugin for your use-case. Reason is no exception.
        Run `yarn add gatsby-plugin-reason`.",
    },
    { question: "How do I set up my BuckleScript config?", answer: "
        Let's walk through the key parts of the config file. The `name` field should be same as your `package.json` file.
        We specify we are using Reason JSX v3 syntax for our ReasonReact components. You might see older v2 syntax on the web, v3 is _much_ cleaner and you should use this.

        The `sources` field specifies the location of the `.re` files to compile. We compile `foo.re` to the JS file `foo.bs.js` (we use `.bs.js` to highlight it's a BuckleScript-generated JS file). Note we compile **in source** - i.e the `.bs.js` files appear in the same directory as the `.re` file - this is so Gatsby can find the compiled output in the `src/` folder." },
    {
      question: "How do I convert React components to ReasonReact?",
      answer:
        "First, rather than a `props` object, we pass in each of the props as named arguments (we can annotate them with the type explicitly if we want e.g `locationType`). ReasonReact uses a special `make`function and the`[@react.component]`decorator, but these compile down to your same React JS props object. We have one`make` function per module: if you want multiple components in a file, put them each in a separate module.
        ",
    },
    {
      question: "How do I convert CSS-in-JS to work with ReasonML?",
      answer:
        "`style` now takes `ReactDOMRe.Style.make()` as argument, again for type conversion purposes. We need to provide explicit **named arguments** rather than spreading `...scale()` in the example below.
        ",
    },
    {
      question: "How do I import JavaScript files in Reason?",
      answer:
        " To use raw JS code in our Reason files, we need to help the type system check soundness by _annotating the types ourselves_.
        We do this with `[@bs.__] external` annotations.
        For example, `__PATH_PREFIX__` is a JS global variable we want to access. So we define the typed ReasonML variable `pathPrefix`.
        `[@bs.val] external pathPrefix: string = `__PATH_PREFIX__`;`
        If we want to access a value exported by another JS module, we use `[@bs.module <path to module>] external` syntax, and again we provide the type signature.",
    },
    {
      question: "How do I use ReasonReact components in JavaScript files?",
      answer: "
        Rather than exporting by name, we use the following syntax: `let default = make`

        Using ReasonReact components in your JS code is easy (if you want to incrementally switch to Reason), we only need a _tiny_ modification to the imports (add a `.re`): That's it! Valid ReasonML code compiles to valid JS code.
        ",
    },
    { question: "How do I embed raw JavaScript in ReasonML?", answer: "
        To ease the transition from JS to ReasonML, ReasonML offers an **escape hatch**: you can use `[%bs.raw]{||}` to embed raw JS that you haven't yet converted to ReasonML. " },
    {
      question: "How do I map undefined/null values in JavaScript to Reason?",
      answer:
        "Possibly `undefined` values of type `'a` map to values of type `'a option` in Reason. Possible null value of x of type `'a` maps to `'a Js.Nullable.t`.

        To check if an object is neither `null` nor `undefined` we can use `Js.Nullable.toOption(val)`.",
    },
  ]
---

## Overview

If you're reading this post, you probably have heard of Reason and want to try it out. If you haven't, go read [this](https://reasonml.github.io/docs/en/what-and-why) or [this](https://blog.logrocket.com/what-makes-reasonml-so-great-c2c2fc215ccb/) to find out why Reason is really great!

This blog post is a step-by-step guide on how you can get your Gatsby blog set up to use ReasonML. Rather than set up a whole new repo, we'll use the standard `gatsby-starter-blog` template and **focus on what's changed**.

So install the template repo if you haven't already:

`gatsby new your-gatsby-blog https://github.com/gatsbyjs/gatsby-starter-blog`

### JUST GIVE ME THE CODE

You can clone the repository by running:

`git clone https://github.com/mukul-rathi/gatsby-starter-reason-blog/`

## Set up the Reason Gatsby Plugin

As with most things Gatsby, there's already a plugin for your use-case. Reason is no exception.

Run `yarn add gatsby-plugin-reason` and in your `gatsby-config.js` file:

```diff
plugins: [
+  {
+    resolve: "gatsby-plugin-reason",
+    options: {
+      derivePathFromComponentName: true
+    }
+  }
  //  ... other plugins
];
```

At this point you should be able to run `yarn develop` and nothing will have ~~broken~~ changed.

What is this `derivePathFromComponentName` option?

To create a page at path `/foo` we create the corresponding component in `src/pages/foo.js`. However, not all `.js` file names are valid Reason (`.re`) file names, since files map to modules, which have stricter naming constraints. For example, we can't have dashes in our filename (so `about-me.re` isn't allowed), nor can we have filenames consisting of just numbers like `404.re`.

`derivePathFromComponentName` lets us instead use the ReasonReact component name (which doesn't have such restrictions) for the path.

More on ReasonReact later, first let's set up BuckleScript!

## Setting up BuckleScript

BuckleScript compiles Reason down to JS. Let's install it with `yarn add bs-platform`.

We need to add a config file for BuckleScript - create the file `bsconfig.json` in the root of your project:

```json
{
  "name": "gatsby-starter-reason-blog",
  "namespace": true,
  "reason": { "react-jsx": 2 },
  "bs-dependencies": ["reason-react"],
  "sources": [
    {
      "dir": "src",
      "subdirs": true
    }
  ],
  "package-specs": [
    {
      "module": "commonjs",
      "in-source": true
    }
  ],
  "suffix": ".bs.js",
  "refmt": 3
}
```

Let's walk through the key parts of the config file. The `name` field should be same as your `package.json` file.
We specify we are using Reason JSX v3 syntax for our ReasonReact components. You might see older v2 syntax on the web, v3 is _much_ cleaner and you should use this.

The `sources` field specifies the location of the `.re` files to compile. We compile `foo.re` to the JS file `foo.bs.js` (we use `.bs.js` to highlight it's a BuckleScript-generated JS file). Note we compile **in source** - i.e the `.bs.js` files appear in the same directory as the `.re` file - this is so Gatsby can find the compiled output in the `src/` folder.

Here is a [a more comprehensive explanation of the BuckleScript config file](https://bucklescript.github.io/docs/en/build-configuration).

Now when we run `yarn develop`, we canu se Reason seamlessly with Gatsby!

## Layout Component: Full JavaScript Listing

I'll display the code in the post, but I would recommend you look at
`https://github.com/gatsbyjs/gatsby-starter-blog/` (JS version) and `https://github.com/mukul-rathi/gatsby-starter-reason-blog/` side-by-side to see how we converted the JS to Reason.

We'll start by looking at the `Layout` component - in `src/components/layout.js` / `src/components/layout.re` in the two repos respectively.

There's no need to read the code, we'll be using it as an example and will hone in on the specific sections.

```js
import React from "react";
import { Link } from "gatsby";

import { rhythm, scale } from "../utils/typography";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    );
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
```

## Using ReasonReact Components

Great, so let's now start converting our component to ReasonReact. First, install ReasonReact: `yarn add reason-react`.

We'll cover the imports in a second. First let's talk about the real meat of the file: **React components**!

Components in ReasonReact are remarkably similar to React components.

```diff
- const Layout = ({ location, title, children }) => {
+[@react.component]
+let make = (~location: locationType, ~title, ~children) => {
  ...
```

First, rather than a `props` object, we pass in each of the props as named arguments (we can annotate them with the type explicitly if we want e.g `locationType`). ReasonReact uses a special `make`function and the`[@react.component]`decorator, but these compile down to your same React JS props object. We have one`make` function per module: if you want multiple components in a file, put them each in a separate module.

`[@react.component]` sets the name of the component to the name of the module it's in. We can also explicitly set the component name:

```reason
React.setDisplayName(make, "Layout");
```

Looking at a subset of the converted Reason component, it is largely the same, modulo a few syntactic differences between JS and ReasonML (e.g. `++` for concatenation, `##` to access the field of a JS Object).

```reason
  <h1
  style={
    ReactDOMRe.Style.make(
      ~fontSize=scale(1.5)##fontSize,
      ~lineHeight=scale(1.5)##lineHeight,
      ~color="black",
      ~padding="15px",
      ~marginBottom=rhythm(1.5),
      ~marginTop="0",
      (),
    )
  }>
    <Link
      style={
        ReactDOMRe.Style.make(
          ~boxShadow="none",
          ~textDecoration="none",
          ~color="inherit",
          (),
        )
      }
      _to="/">
      {React.string(title)}
</Link>
</h1>;
```

You'll have noticed a couple of differences: These are mainly to convert types.

We need to wrap strings with `React.string` (type conversion from `string` to a `React.element`).

```diff
- {title}
+ {React.string(title)}
```

`style` now takes `ReactDOMRe.Style.make()` as argument, again for type conversion purposes. We need to provide explicit **named arguments** rather than spreading `...scale()` in the example below.

```diff
-style={{
-      ...scale(1.5),
-      marginBottom: rhythm(1.5),
-      marginTop: 0,
- }}
+ style={
+   ReactDOMRe.Style.make(
+      ~fontSize=scale(1.5)##fontSize,
+      ~lineHeight=scale(1.5)##lineHeight,
+      ~marginBottom=rhythm(1.5),
+      ~marginTop="0",
+      (),
+   )
+   }
```

If you're wondering why we do all this, the types help us prevent bugs like in this JS:

```js
style={{
          magginTop: 0, // margin typo - runtime error
          magicCss: "foo", // this property doesn't exist - runtime error
        }}
```

In Reason, this is caught at compile time, because the **types don't match up**. `ReactDOMRe.Style.make()` doesn't have the named arguments `~magginTop` or `~magicCss` in its type definitions.

And a minor detail, Gatsby `Link` component has a `_to` prop instead of `to`, since `to` is a keyword in ReasonML. Under the hood, this `_to` is compiled away by BuckleScript to `to`. _(Quirky I know)_.

```diff
    <Link
-          to={`/`}
+          _to={`/`}
        >

```

How were we able to use JavaScript components in ReasonML? We don't need to explicitly import React, but we do need to import the components themselves.

## JavaScript Interop

### Importing JavaScript modules

To use raw JS code in our Reason files, we need to help the type system check soundness by _annotating the types ourselves_.

We do this with `[@bs.__] external` annotations.

For example, `__PATH_PREFIX__` is a JS global variable we want to access. So we define the typed ReasonML variable `pathPrefix`.

```reason
[@bs.val] external pathPrefix: string = "__PATH_PREFIX__";`
```

If we want to access a value exported by another JS module, we use `[@bs.module "path to module"] external` syntax, and again we provide the type signature.

```diff
- import { rhythm, scale } from "../utils/typography"

+ [@bs.module "../utils/typography.js"]
+    external rhythm: float => string = "rhythm";
+ [@bs.module "../utils/typography.js"]
+     external scale: float => {. "fontSize": string,
+                              "lineHeight": string,
+                              } = "scale";

```

If we wanted to get the default export, we would use the following syntax.

```reason
[@bs.module <path to module>]
 let varName : typeSig = "default"
```

What about React components you might ask? We use the `[@react.component]` decorator and provide the type signature of the `make` function.

E.g for the Gatsby `<Link/>` component the type signature is:

```reason
[@react.component]
  external make:
    ( ~_to: string,
      ~rel: option(string)=?,
      ~className: option(string)=?,
      ~style: option(ReactDOMRe.Style.t)=?,
      ~activeStyle: option(ReactDOMRe.Style.t)=?,
      ~activeClassName: option(string)=?,
      ~children: option(React.element)=?
    ) =>
    React.element
```

And the full external import declaration is:

```reason
[@bs.module "gatsby-link"] [@react.component]
  external make:
    ( ~_to: string,
      ~rel: option(string)=?,
      ~className: option(string)=?,
      ~style: option(ReactDOMRe.Style.t)=?,
      ~activeStyle: option(ReactDOMRe.Style.t)=?,
      ~activeClassName: option(string)=?,
      ~children: option(React.element)=?
    ) =>
    React.element
/* right-hand side of import is the same.  */
     =
    "default";
```

In the ReasonML starter repo, we store all the Gatsby components' type signatures as modules in `src/utils/gatsby.re`. Rather than referring to the component`<Gatsby.Link>`, we set `module Link=Gatsby.Link` so we can refer to it as just `<Link>`

```diff
- import { Link } from "gatsby"
+ module Link = Gatsby.Link;

```

### Using ReasonReact Components in JavaScript

Rather than exporting by name, we use the following syntax:

```diff
- export default Layout
+ let default = make;
```

Using ReasonReact components in your JS code is easy (if you want to incrementally switch to Reason), we only need a _tiny_ modification to the imports (a `.re`):

```diff
- import Layout from "../components/layout"
+ import Layout from "../components/layout.re"
```

That's it! Valid ReasonML code compiles to valid JS code.

### Embedding Raw JavaScript in ReasonML

To ease the transition from JS to ReasonML, ReasonML offers an **escape hatch**: you can use `[%bs.raw]{||}` to embed raw JS that you haven't yet converted to ReasonML. [More on transitioning from raw JS to ReasonML](https://reasonml.github.io/docs/en/converting-from-js).

```reason
/* reason code ... */
let y : type_sig = [%bs.raw]{|
  ... /* js code */
|}];
/* reason code ... */
```

**Be warned:** the onus is on you to provide a type for the raw JS - if you don't then Reason will assume it has _any_ type, meaning you can do `5+y; "Hello" ++ y` even though that isn't type-safe.

If you get uncaught runtime type-errors when running `gatsby develop` it can seem opaque and confusing ("I thought ReasonML was type-safe" you might ask).
Pure Reason code _is_ type-safe, the source of bugs is the JS interop, so _double check_ your type annotations!

**Useful tip:** if you want to use Reason values in your embedded raw JS escape hatch, rewrite the hatch as a function, and then pass the Reason values into the function that's returned.

```reason
let x : 'a = ...;
let f : 'a => 'b = %bs.raw]{|
      x => {
  ... /* js code using value of x */
      }
|}];
let result : `b = f x;
```

#### Dealing with null/undefined

Possibly `undefined` values of type `'a` map to values of type `'a option` in Reason. Possible null value of x of type `'a` maps to `'a Js.Nullable.t`.

To check if an object is neither `null` nor `undefined` we can use `Js.Nullable.toOption(val)`.

e.g. a common JS code fragment you might write is

```js
{
  possiblyNullOrUndefinedVal && (
    <Component someProp={possiblyNullOrUndefinedVal} />
  );
}
```

In ReasonML, you'd write this as:

```reason
switch (toOption(possiblyNullOrUndefinedVal)) {
            | Some(definedNonNullVal) =>
              <Component someProp={definedNonNullVal}/>
            | None => React.null
            }
```

## Layout Component: Full ReasonML Listing

For completeness here's the Layout component in ReasonML, applying the changes in the previous sections:

```reason
module Link = Gatsby.Link;

[@bs.module "../utils/typography.js"]
  external rhythm: float => string = "rhythm";
[@bs.module "../utils/typography.js"]
  external scale:
    float =>
    {
      .
      "fontSize": string,
      "lineHeight": string,
    } =
    "scale";

[@bs.val] external pathPrefix: string = "__PATH_PREFIX__";

type locationType = {. "pathname": string};

[@react.component]
let make = (~location: locationType, ~title, ~children) => {
  let rootPath = pathPrefix ++ "/";
  let header =
    if (location##pathname === rootPath) {
      <h1
        style={
          ReactDOMRe.Style.make(
            ~fontSize=scale(1.5)##fontSize,
            ~lineHeight=scale(1.5)##lineHeight,
            ~marginBottom=rhythm(1.5),
            ~marginTop="0",
            (),
          )
        }>
        <Link
          style={
            ReactDOMRe.Style.make(
              ~boxShadow="none",
              ~textDecoration="none",
              ~color="inherit",
              (),
            )
          }
          _to="/">
          {React.string(title)}
        </Link>
      </h1>;
    } else {
      <h3
        style={
          ReactDOMRe.Style.make(
            ~fontFamily="Montserrat, sans-serif",
            ~marginTop="0",
            (),
          )
        }>
        <Link
          style={
            ReactDOMRe.Style.make(
              ~boxShadow="none",
              ~textDecoration="none",
              ~color="inherit",
              (),
            )
          }
          _to="/">
          {React.string(title)}
        </Link>
      </h3>;
    };
  <div
    style={
      ReactDOMRe.Style.make(
        ~marginLeft="auto",
        ~marginRight="auto",
        ~maxWidth=rhythm(24.),
        ~padding=rhythm(1.5) ++ " " ++ rhythm(0.75),
        (),
      )
    }>
    <header> header </header>
    <main> children </main>
    <footer>
      {React.string("Built with ")}
      <a href="https://www.gatsbyjs.org"> {React.string("Gatsby")} </a>
    </footer>
  </div>;
};

React.setDisplayName(make, "Layout");

let default = make;
```

## Gatsby and GraphQL

### GraphQL template literals

Gatsby requires GraphQL queries to be a specific tagged template literal:

```js
graphql`
 ... your query here
`;
```

When Gatsby preprocesses your files, it walks the JavaScript AST to find this template literal in the `.js`, then executes it.

We can't write this template literal in ReasonML, so we use our escape hatch. E.g. in `src/components/seo.re`.

```js
let data =
    useStaticQuery(
      [%bs.raw
        {|
           graphql`
            query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
    |}
      ],
    );
```

What we'd _like_ to do is provide a type-safe wrapper to `graphql`, as so.

```reason
[@bs.module "gatsby"] external graphql: 'something = "graphql";
```

But, since we're only using graphql in our raw JS, BuckleScript compiles it away. So instead we are forced to use (the hackier)

```reason
%bs.raw
{| import {graphql} from "gatsby" |};
```

### Processing GraphQL queries

Gatsby ignores GraphQL queries in Reason files (it only processes `.js` files). _After_ it preprocesses the GraphQL queries it compiles the ReasonML files using BuckleScript.

When we run `gatsby build`, Gatsby thus complains that the BuckleScript files' GraphQL queries have not been processed. We can get around this by pre-compiling the BuckleScript files using `bsb -make-world` and _then_ running `gatsby build`. The `yarn build` command in the repo's `package.json` file does this - **use** `yarn build` **when deploying your site**.

We then import the BuckleScript files, rather than the Reason files.

```diff
- import Layout from "../components/layout.re"
+ import Layout from "../components/layout.bs"
```

However, this approach only works for static queries. For page queries, the only workaround is to wrap your ReasonReact component in a JS file:
e.g. `src/templates/blog-post.js`.

(Another Gatsby quirk is you have to import the component and then export it again, for the GraphQL query to be well-formed.)

```js
import { graphql } from "gatsby";
import BlogPost from "./blogPost.bs";

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
```

## Summary

Hopefully, at this point, you're up and ready to use ReasonML in your Gatsby site! One of the best things about the ReasonML type system is that once you've set up JS interop, the type system is unobtrusive and only gets in your way if you've introduced a type error.

If you have any questions or better suggestions, feel free to tweet at me. [Start using the Gatsby Reason Blog Starter](https://github.com/mukul-rathi/gatsby-starter-reason-blog) and continue learning ReasonML [here](https://reasonml.github.io/docs/en/converting-from-js).
