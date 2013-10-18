/**
 * yours-truly
 *
 * Author:
 *   M. Adam Kendall <linuxbozo@gmail.com>
 *
 * Copyright:
 *   2013 M. Adam Kendall
 *
 * License:
 *   MIT
 */

var protagonist = require('protagonist');
    fs = require('fs'),
    path = require('path'),
    cwd = process.cwd(),
    ejs = require('ejs');

var getButtonClass = function(method) {
    switch(method) {
        case "GET":
            return "primary"
        case "POST":
            return "success"
        case "PUT":
            return "info"
        case "PATCH":
            return "warning"
        case "DELETE":
            return "danger"
        default:
            return "default"
    }
};

var dashes = function(input) {
    return input.replace(/\s+/g, '-').toLowerCase();
}

/*
 * Helper function to write output to either file or stdout
 */
function writer(filePath, data) {
    var template = __dirname + '/tmpl.ejs'
    var tmplFile = fs.readFileSync(template, 'utf8');
    html = ejs.render(tmplFile,{
        api: data,
        getButtonClass: getButtonClass,
        dashes: dashes,
        filename: template
    })
    if (filePath) {
        fs.appendFileSync(filePath, html);
    } else {
        console.log(html);
    }
}

/*
 This will determine if the filepath is relative or absolute.
 If relative, it will return the full absolute path based on CWD.
 */
function getFilePath(outputFile) {
    if (outputFile) {
        if (outputFile.match("^/") === "/") {
            return outputFile;
        } else {
            return path.join(cwd, "/", outputFile);
        }
    }
    return null;
}

/*
 Process the file
*/
function processMD(inputFile, outputFile) {
    protagonist.parse(inputFile, function(error, result) {
        if (error) {
            console.log(error);
            return;
        }
        writer(outputFile, result.ast);
    });
}

module.exports = function(inputFN, outputFN) {
    var outputFile = getFilePath(outputFN);
    var inputFile = fs.readFileSync(getFilePath(inputFN)).toString();
    if (outputFile && fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
    }
    processMD(inputFile, outputFile);
}