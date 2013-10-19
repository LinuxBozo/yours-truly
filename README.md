# yours-truly

This is a node.js [API Blueprint](http://apiblueprint.org/) formatter for producing HTML documents.

It uses [protagonist](https://npmjs.org/package/protagonist) and [ejs](https://npmjs.org/package/ejs) to do all the dirty work.

## Writing API documentation

For more info on writing API documentation, read up on the API Blueprint [specification](https://github.com/apiaryio/api-blueprint/blob/master/API%20Blueprint%20Specification.md).

Here's a small sample:


    FORMAT: 1A
    HOST: https://api.example.com/v1

    # Example API

    A simple API example

    # Group People

    This section describes the People endpoint

    ## Person [/people/{id}]

    Represent a particular Person

    + Parameters

        + id (required, string, `123`) ... The id of the Person.

    + Model (application/json)

        ```
        {"first_name":"Samuel","last_name":"Adams","birthdate":"09-27-1722"}
        ```

    ### Retrieve Person [GET]

    Return the information for the Person

    + Response 200 (application/json)

        [Person][]



## Usage: CLI

    $ ./node_modules/yours-truly/bin/yours-truly INPUT_FILE.md [OUTPUT_FILE.html]

### Examples

#### Output to stdout

1. Create your API markdown file, e.g. `blueprint.md`
1. Run `./node_modules/yours-truly/bin/yours-truly blueprint.md`
1. Pipe the output somewhere
1. Done!

#### Output to HTML file

1. Create your API markdown file, e.g. `blueprint.md`
1. Run `./node_modules/yours-truly/bin/yours-truly blueprint.md blueprint.html`
1. Done!

##### Notes

- Trying to view the output HTML file in your browser directly from the filesystem will not display correctly.

## Usage: node module

```js
var yt = require('yours-truly'),
    html = yt('/path/to/blueprint.md');
```

## Related Projects

If the GO language is more your thing, you might want to check out these projects

- [github.com/subosita/iglo](https://github.com/subosito/iglo) : Original inspiration of this project

- [github.com/peterhellberg/hiro](https://github.com/peterhellberg/hiro) : Uses iglo to output HTML to a file
