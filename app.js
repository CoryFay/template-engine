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

// empty array where we will store all of our new objects
const output = [];

// 4 different prompt possibilities
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

// function that is called when node is ran
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

// functions here will correspond with the 'role' selected by the user
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

// this will run when the user is done adding members. Also contains 'writeFile' to generate our HMTL
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