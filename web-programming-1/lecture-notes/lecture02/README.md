# Lecture 02: Modules, Applications and Errors 

## Structure of a Node App
### What is a Node app?
You can view a node app as a series of scripts that are run together. A web application, for example, would have the following scripts:
- A script that, when run, listens on port 3000 for HTTP requests to retrieve data
- A second script that runs as a background proocess and researches information to add to the databases
- A third script that analyzes newly researched information and creates statistics on the new data

### What makes an app?
Generally, your application will have the following structure: 
- `package.json`: describes the application, and its dependencies 
- `node_modules/`: stores all the dependencies
- `app.js`: initilizes and runs a server 
- `views/`
- `static/`

### `package.json`
The package.json is a very important file that stores information about your project, such as:
- name
- repoository
- license type 
- list of dependencies 
- list of developer dependencies 
- author
- scripts
To start your project, you can navigate to your folder and use the `npm init` command to interactively create the start of that file. 
- [x] You must submit the package.json file and include the author field with your name. 

### Dependencies 
Node allows authors to publish their code online on Github or on NPM; anyone can then download their code through the npm application and install it as a dependency towards a project.  
References to these dependencies can be saved to your `package.json` file.   
Dependencies are exposed in the form of modules.  
You can install dependencies with the following command:
- `npm install PACKAGENAME`
- [x] You must save it to your `package.json` file, othewise points will be deducted for submissions.

### The Scripts Object
`package.json` command contains a field, "**script**", that is an object containing different script tasks. For each key in the scripts object, you would have a value that contains the command for running each script. For example, you could have a script for testing your code and running your app
```json
"scripts": {
    "start": "node app.js", "test": "node test.js"
}
```

### What are packages and npm?
Node has a massive repository of published code that you can very easily pull into your assignments where applicable through the `npm`.  
You will require the modules that your packages export, and use code that other people have created, tested, and tried. You will then use these packages to expand on your own applications and build out fully functional applications. 

### Installing the app
Node runs off of a series of dependencies, which are managed through the pckage manager, NPM.  
When download a node application, you will be downloading it without dependencies, so you must install them on download 
  + `npm install`
  + Dependencies are stored in the node_modules folder  
** When you submit an assignment, you must submit it without the node_modules folder. **

### Running the app
`npm start`: will run the start script from the scripts object in the package.json file

### Setting up your application
- Make a new folder for the application
- Run `npm init` and go through the walkthrough
- Open `package.json` and update the "scripts" section and add a property of: `"start": "node app.js", where `app.js` is the name of the file you want to run on start 
- Install your dependencies and save them to the package
  + `npm install PACKAGENAME`
- Write some code in your starting file
- Run app with `npm start`


## Modules
### What is a module?
Generally, a module is an individual unit that can be plugged into another system or codebase with relative ease. In Node.js, you will be using modules everywhere. 

### Require
There is a special, global function called `require`, which will allow you to import code from other files, packages, etc.  
When you require a file/package, you will be accessing whatever the programmer assigned to be exported in that file. From there, you can use the code. 