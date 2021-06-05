import {template, loop} from './src/mod.ts';

type Definition = {word: string, definition:string};

const projectName = 'ConTemplating';
const definitions: Definition[] = [
    { word: 'con', definition:'French word for "stupid"'},
    { word: 'templating', definition:'Something you learn because it seems easier than what you should actually learn'},
];
const thanks = [
    'Manan & Papa',
    'My doggo',
    'People of Slacker News',
    'My chronic insomnia',
];

const output = template`

[${projectName}](#)
===
> The best dumb templating library out there.

${definitions.map(({word, definition}) => `
***${word}***
> ${definition.split('\n').join('\n>')}
`)}

---
## What is this?
This is a simple library to help you use template string as a templating language. It simply gives you features you might find in other templating languages you can't already get with vanilla js.


## Usage & examples
If you want a "real-ish" example, checkout [README.ts where I generate this readme using \`${projectName}\`](README.ts)


## Quick getting started
Use \`template\` template string method to automatically
    * convert nullish values to empty strings.
    * print arrays without separators

\`\`\`typescript
const goodDogNames = [
    'Pogo',
    'Captain Sergent',
    'Sir Poopalot',
    null,
    undefined,
];

template\`<h2>List of good dog name</h2>
<ul>
$\{goodDogNames.map(name =>
    \`<li>$\{name\}</li>
\`\}
</ul>
\`
\`\`\`

will yield
\`\`\`html
<h2>List of good dog name</h2>
<ul>
    <li>Pogo</li>
    <li>Captain Sergent</li>
    <li>Sir Poopalot</li>
</ul>
\`\`\`

## Other
Typically, templating languages provide a lot more features, but we believe Javascripts already give you most of them out of the box

| Feature | Js Equivalent |
| ------- | ------------- |
| Composition (modules, block, extends, etc) | Import & Function |
| Loop | array [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), etc |
| Variables | Variables (duh) |
| sanitization & autoescape | TODO: ok ill get to this one |

${projectName} also avoid a lot of the complexities of other templating languages.

| Others | ${projectName} |
| ------ | -------------- |
| Slow parsing & rendering | Can't have slow parsing, if you don't have a language to parse |
| New language to learn | Its plain JS. If you are looking for a JS templating language, you already know JS |
| Installation & setup | No setup here, its just a template string method |
| Huge documention website you can read for weeks | No doc needed, the codebase itself takes 2 min to fully understand (and re-implement) |
| Require its own linting rules | Its plain javascript, just use your current linter |
| IDE support | Its plain javascript, just use your current IDE |

---

## Special thanks to:
${thanks.map(name => `* ${name}`).join('\n')}

`
console.log(output);
