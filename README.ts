import {template, loop} from './src/mod.ts';

type Definition = {word: string, definition:string};

const projectName = 'ConTemplating';
const definitions: Definition[] = [
    { word: 'con', definition:'French word for "stupid"\nAgainst a proposition, opinion, etc'},
    { word: 'templating', definition:'Tool to help you write and maintain text documents'},
    { word: 'contemplate', definition:'To consider with continued attention; reflect upon; ponder; study; meditate on.'},
];
const thanks = [
    'My partner & my doggo',
    'Maman & Papa',
    'People of Slacker News',
    'My chronic insomnia',
];


const sideBySide = (left:string[], right:string[])=>{
    // Make sure each side will align at the seam
    if(left.some(line => line.length !== left[0].length)){
        throw `Each entry in A must be the same length but found: ${left.map((line)=>line.length).join(',')}`;
    }

    const accumulator:string[] = [];
    const emptyLeftLine = left[0].replaceAll(/./g,' ');
    for ( let i = 0; i < Math.max(left.length, right.length); i++){
        accumulator.push(
            (left[i] ?? emptyLeftLine) + // Ensure there is enough space to align right
            (right[i] ?? '')
        );
    }

    return accumulator;
}

// If you think "This is needlessly complicated", you are right!
// It would have been simpler to type it directly in markdown,
// but it wouldn't be a good test otherwise
const bannerText = definitions.map(({word, definition}) => `
"${word}"
 > ${definition.split('\n').join('\n > ')}
`).join('\n').split('\n')

const output = template`
\`\`\`txt
${sideBySide([
 "       ▄▄▄▄▄▄▄▄           "
,"     ▄█▀▀░░░░░░▀▀█▄       "
,"   ▄█▀▄██▄░░░░░░░░▀█▄     "
,"  █▀░▀░░▄▀░░░░▄▀▀▀▀░▀█    "
," █▀░░░░███░░░░▄█▄░░░░▀█   "
," █░░░░░░▀░░░░░▀█▀░░░░░█   "
," █░░░░░░░░░░░░░░░░░░░░█   "
," █░░██▄░░▀▀▀▀▄▄░░░░░░░█   "
," ▀█░█░█░░░▄▄▄▄▄░░░░░░█▀   "
,"  ▀█▀░▀▀▀▀░▄▄▄▀░░░░▄█▀    "
,"   █░░░░░░▀█░░░░░▄█▀      "
,"   █▄░░░░░▀█▄▄▄█▀▀        "
,"    ▀▀▀▀▀▀▀               "
,"                          "
], bannerText).join('\n')
}
\`\`\`

[${projectName}](#)
===
Simple library to help you use template string as a templating language. It simply gives you feature you might find in other templating languages you can't already get with vanilla js.

## Usage & examples
If you want a "real-ish" example, checkout [README.ts](README.ts). It's the code to generate this [readme](README.md).

## Quick getting started
Use [\`template()\`](src/mod.ts) method as a tagged template to automatically
* Convert nullish values to empty strings.
* Print arrays without separators

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

\`\`\`html
<h2>List of good dog name</h2>
<ul>
    <li>Pogo</li>
    <li>Captain Sergent</li>
    <li>Sir Poopalot</li>
</ul>
\`\`\`

## Why
Templating libraries have never been bigger, not only they are often fully featured language, they also have framework built on top of them (often called static site generator).

Howere they rely on another language and frameworks for data & execution.

It might be JS fatigue speaking, but this seems wastevul.
I believe we spend too much time to learn, maintain and workaround what seems like yet another language & framework.

**What if we didn't need a second language for templating?**

**What if we could easily do everything a templating language provides using nothing but the host language & API?**

This project will attempt to answer this question.

> PS: I kind of already answered the question by using a (less elegant) prototype of \`${projectName}\` to make my lost blog.
>
> Yes it works! But I want to make it official this time and not keep it to myself.

## Dogfooding
The [README.md](README.md) you are looking at was also made using \`${projectName}\`, although it's not a complex example, it proves the concept is valid at small scale.

The next step is to re-make my lost blog. This will ensure \`${projectName}\` is viable for medium size projects.

## How
> TLDR: Its all about functions and template strings

Javscript now has [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) which can be used to insert variable and expressions in string literal without using concatenation or formatting.
Template strings can also be improved upon with [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) which are simply methods that can parse the strings and variables.

These two additions to the language enable us to do what templating languages are meant to do; **organize strings and data into text documents**.

Everything else templating languages provide are already in the language, but used to be difficult to mix with string in a clean and efficient fashion.

| Feature | JS Equivalent |
| ------- | ------------- |
| Composition (modules, block, extends, yields, etc) | [Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) & [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functionsa) |
| Loop | Array.prototype methods like [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), etc |
| Variables | [Template strings embedded expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#expression_interpolation) |
| sanitization & autoescape | TODO: Ok ill get to this one, although, its not needed untill you use outside data |

#### Things we get for free
* Parsing / Interpreting template
* Rendering to string
* Cashing (some sort of)
* No setup or config needed
* Nothing more to learn, we simply use what is in the language in a new way.
* Run in the browser natively (at least naively through .innerhtml)
* No extra IDE support needed

## Contribute

Contributions are welcome but maybe unecessary?
I welcome comments & PR, but remember that in terms of implementation, less is more.

### Requirements
* [Deno](https://deno.land/)
* [Git](https://git-scm.com/)

### Supported platforms
* [Deno](https://deno.land/)

Technically also works on [Nodejs](https://nodejs.org/en/) and any browser if you transpile the code from [Typescript](https://www.typescriptlang.org/) down to Javascript
A transpiled version *might* follow once I start publishing versions

### Tests
Simply run the [\`test\`](test) script at the root of the project
Tests are located under the [\`tests\`](tests) folder and follow [Deno's testing api](https://deno.land/manual@main/testing)

### Build this readme
Simply run the [\`build\`](build) script

### Sources
Sources are located in the [\`src\`](src) folder

---

## Special thanks to:
${thanks.map(name => `* ${name}`).join('\n')}
`

if(output.length <= 0){
    throw "No output to write!";
}

const oldReadme = await Deno.readTextFile('./README.md');
await Deno.writeTextFile('./README.md', output);
console.log('Write to ./README.md complete')
console.log(`Wrote ${output.length} characters (diff ${oldReadme.length - output.length})`)
