import inquirer from "inquirer";
import chalk from "chalk";

// get API link from google opentdb.com 

const apiLink = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple"

let fetchData = async (data:any)=>{
    let fetchQuiz:any = await fetch(data)
    let res = await fetchQuiz.json()
    return res.results;
}
let data = await fetchData(apiLink)
// console.log(data.results)

let startQuiz = async ()=>{
    let score:number = 0;
    // getting data from user
    let name = await inquirer.prompt({
        type:"input",
        name:"fname",
        message:"please enter your name :"
    })
    for (let i=1; i <= 5; i++){
        let answer = [...data[i].incorrect_answers, data[i].correct_answer];

        let ans = await inquirer.prompt({
            type:"list",
            name:"quiz",
            message: data[i].question,
            choices:answer.map((val:any)=>val)
        })
        if(ans.quiz == data[i].correct_answer ){
            ++score
            console.log(chalk.bold.italic.blue("Correct"))
        }else{
            console.log(`Correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`)
        }
    }
    console.log(`Dear ${chalk.green.bold(name.fname)}, your score is ${chalk.red.bold(score)} out of ${chalk.red.bold("5")}`)

}
startQuiz() 