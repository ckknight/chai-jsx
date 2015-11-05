chai-jsx
==============

JSX React Element assertions for chai.  Thin wrapper around [react-element-to-jsx-string](https://github.com/algolia/react-element-to-jsx-string).

[![NPM version](http://img.shields.io/npm/v/chai-jsx.svg?style=flat-square)](https://www.npmjs.org/package/chai-jsx)
[![Build Status](http://img.shields.io/travis/ckknight/chai-jsx/master.svg?style=flat-square)](https://travis-ci.org/ckknight/chai-jsx)

Compare different React elements:

```js
expect(<Component />).jsx.to.equal(<Component />);
expect(<Component />).jsx.to.not.equal(<Component prop={value} />);
expect(<Component />).jsx.to.not.equal(<OtherComponent />);
expect(<Component />).jsx.to.not.equal(<div />);
expect(<Component><div /></Component>).jsx.to.equal(<Component><div /></Component>);
expect(<Component><div /></Component>).jsx.to.not.equal(<Component><span /></Component>);
```

#### Installation

This is a addon plugin for the [Chai Assertion Library](http://chaijs.com). Install via [npm](http://npmjs.org).

    npm install chai-jsx


#### Plugin

Use this plugin as you would all other Chai plugins.

```js
var chai = require('chai')
  , chaiJsx = require('chai-jsx');

chai.use(chaiJsx);
```

