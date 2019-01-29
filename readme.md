# postcss-envariables <a href="https://github.com/postcss/postcss"><img align="left" height="49" title="PostCSS" src="http://postcss.github.io/postcss/logo.svg"></a>
> [PostCSS](https://github.com/postcss/postcss) plugin to transform environment variables in CSS.

[![Travis Build Status](https://img.shields.io/travis/Scrum/postcss-envariables/master.svg?style=flat-square&label=unix)](https://travis-ci.org/Scrum/postcss-envariables)[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/GitScrum/postcss-envariables/master.svg?style=flat-square&label=windows)](https://ci.appveyor.com/project/GitScrum/postcss-envariables)[![node](https://img.shields.io/node/v/postcss-envariables.svg?maxAge=2592000&style=flat-square)]()[![npm version](https://img.shields.io/npm/v/postcss-envariables.svg?style=flat-square)](https://www.npmjs.com/package/postcss-envariables)[![Dependency Status](https://david-dm.org/gitscrum/postcss-envariables.svg?style=flat-square)](https://david-dm.org/gitscrum/postcss-envariables)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/xojs/xo)[![Coveralls status](https://img.shields.io/coveralls/Scrum/postcss-envariables.svg?style=flat-square)](https://coveralls.io/r/Scrum/postcss-envariables)

[![npm downloads](https://img.shields.io/npm/dm/postcss-envariables.svg?style=flat-square)](https://www.npmjs.com/package/postcss-envariables)[![npm](https://img.shields.io/npm/dt/postcss-envariables.svg?style=flat-square)](https://www.npmjs.com/package/postcss-envariables)


## Why?
Adds the ability to use a environment variables in CSS.

## Install

```bash
$ npm install postcss-envariables
```

> **Note:** This project is compatible with node v6+

## Usage

```js
// Dependencies
import fs from 'fs';
import postcss from 'postcss';
import env from 'postcss-envariables';
import cssVariables from 'postcss-css-variables';

// CSS to be processed
const css = fs.readFileSync('css/input.css', 'utf8');

// Process CSS
const output = postcss(css)
    .use(env({ /* env: { contextPath: path/to/file } */ }))
    .use(cssVariables())
    .css;

console.log(output);
```

*Use before plugin ```postcss-css-variables```.*  

# Example

## Node

```js
import fs from 'fs';
import postcss from 'postcss';
import env from 'postcss-envariables';
import cssVariables from 'postcss-css-variables';

const css = fs.readFileSync('css/input.css', 'utf8');

const output = postcss(css)
    .use(env({env: {contextPath: 'dev'}}))
    .use(cssVariables())
    .css;

console.log(output);
```

```css
/* input.css */
:root {
    --contextPath: env.contextPath;
}

.selector {
    backgrount-image: url('var(--contextPath)/image.png');
}
```

```css
/* Output example */
.selector {
    backgrount-image: url('dev/image.png');
}

```

## Webpack
*```package.json```*
```json
"scripts": {
    "build": "webpack --mode=development"
}
```

*```postcss.config.js```*
```js
module.exports = ({options: {env}}) => {
    return {
        plugins: {
            'postcss-envariables': {
                env: {
                    contextPath: env === 'development' ? 'dev' : ''
                }
            },
            'postcss-css-variables': {}
        }
    };
};
```

*```webpack.config.js```*
```js
module.exports = (env, argv) => ({
    mode: argv.mode,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                ctx: {
                                    env: argv.mode
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
});
```

*```input.css```*
```css
:root {
    --contextPath: env.contextPath;
}

.selector {
    backgrount-image: url('var(--contextPath)/image.png');
}
```

*```Output```*
```css
.selector {
    backgrount-image: url('dev/image.png');
}

```
