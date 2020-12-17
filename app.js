const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { endianness } = require("os");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const output = [];
const starterQuestions = [
  {
    type: 'confirm',
    message: 'Would you like to add a team member?',
    name: 'addMore',
    default: false
  },
  {
    type: 'list',
    message: 'Select a role: ',
    choices: ['Manager', 'Engineer', 'Intern', 'None'],
    default: 'None',
    name: 'role'
  }
]
const managerQuestions = [
  {
    type: 'list',
    message: 'Reconfirm the role of the team member: ',
    choices: ['Manager', 'Engineer', 'Intern', 'None'],
    name: 'role',
    default: 'Manager'
  },
  {
    type: 'input',
    message: 'Enter the team member name: ',
    name: 'tmName',
    default: 'Name'
  },
  {
    type: 'number',
    message: 'Enter the team member ID: ',
    name: 'tmID',
    default: 00
  },
  {
    type: 'input',
    message: 'Enter the team member email: ',
    name: 'tmEmail',
    default: 'tm@email.com'
  },
  {
    type: 'number',
    message: 'Enter the office number: ',
    name: 'tmOfficeNum',
    default: 00
  }
]
const engineerQuestions = [
  {
    type: 'list',
    message: 'Reconfirm the role of the team member: ',
    choices: ['Manager', 'Engineer', 'Intern', 'None'],
    name: 'role',
    default: 'Engineer'
  },
  {
    type: 'input',
    message: 'Enter the team member name: ',
    name: 'tmName',
    default: 'Name'
  },
  {
    type: 'number',
    message: 'Enter the team member ID: ',
    name: 'tmID',
    default: 00
  },
  {
    type: 'input',
    message: 'Enter the team member email: ',
    name: 'tmEmail',
    default: 'tm@email.com'
  },
  {
    type: 'input',
    message: 'Enter the github username: ',
    name: 'tmGithub',
    default: 'tmGithub00'
  }
]
const internQuestions = [
  {
    type: 'list',
    message: 'Reconfirm the role of the team member: ',
    choices: ['Manager', 'Engineer', 'Intern', 'None'],
    name: 'role',
    default: 'Intern'
  },
  {
    type: 'input',
    message: 'Enter the team member name: ',
    name: 'tmName',
    default: 'Name'
  },
  {
    type: 'number',
    message: 'Enter the team member ID: ',
    name: 'tmID',
    default: 00
  },
  {
    type: 'input',
    message: 'Enter the team member email: ',
    name: 'tmEmail',
    default: 'tm@email.com'
  },
  {
    type: 'input',
    message: 'Enter the school they attend: ',
    name: 'tmSchool',
    default: 'University'
  }
]
function start(){
  inquirer.prompt(starterQuestions).then((answers) =>{
    if (answers.addMore === true && answers.role === 'Manager'){
      manager();
    }else if(answers.addMore === true && answers.role === 'Engineer'){
      engineer();
    }else if(answers.addMore === true && answers.role === 'Intern'){
      intern();
    }else{
      end();
    }
  })
  
}
function manager(){
  inquirer.prompt(managerQuestions).then((answers) => {
    const employee = new Manager(answers.tmName, answers.tmID, answers.tmEmail, answers.tmOfficeNum);
    output.push(employee);
    start();
  })
}
function engineer(){
  inquirer.prompt(engineerQuestions).then((answers) => {
    const employee = new Engineer(answers.tmName, answers.tmID, answers.tmEmail, answers.tmGithub);
    output.push(employee);
    start();
  })
}
function intern(){
  inquirer.prompt(internQuestions).then((answers) => {
    const employee = new Intern(answers.tmName, answers.tmID, answers.tmEmail, answers.tmSchool);
    output.push(employee);
    start();
  })
}
function end(){
  // console.log('You are all set! Here is your team: ');
  // console.log('-----------------------------------');
  // console.log(output);
  const renderPage = render(output);
  fs.writeFile(outputPath, renderPage, function(err) {
    if (err){
      return console.log(err)
    }
    console.log('Your page has been generated in the "output" folder.')
  })
}
start();
  
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
