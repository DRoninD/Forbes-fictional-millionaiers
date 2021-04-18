// DOM
const main = document.getElementById("main");

const addUser = document.getElementById('add-user');

const doubleMoney = document.getElementById('double-money')

const showMillionaires = document.getElementById('show-millionaiers');

const sortByRiches = document.getElementById('sort');

const calculateWealth = document.getElementById('calculate-wealth'); 

//Fetch Random User
let data = [];


//Adding new User
async function getRandomUser(){
     const res = await fetch('https://randomuser.me/api')

     const data = await res.json();

     const user = data.results[0];

     const newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000)
     }
       
     
    addData(newUser);
    console.log(newUser);
}

//Double the money function
function doubleTheMoney () {
       //Geting the data from the main array
       data = data.map((user) => {
              
              return {...user, money: user.money * 2};
              
              
       })
       console.log(data)
       
       // Updating the DOM on every change
       updateDOM();
}

// Sort by Richest
function sortByRichest(){
       data.sort((a,b) => b.money - a.money)

       // Updating the DOM on every change
       updateDOM();
       
}

//Show only milionaires
function showMillionairesOnly() {
       data = data.filter(user => user.money > 1000000)

       // Updating the DOM on every change
       updateDOM();
       
}

//Calculate the total wealth
function calculateTotalWealth(){
       const wealth = data.reduce((acc, user) => (acc += user.money), 0)

       const wealthElement = document.createElement('div');
       wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatCurrencyMoney(wealth)}</strong></h3>`;
       main.appendChild(wealthElement);

       
}

// Function adding the data to the data array
function addData(obj) {
       // Random user array
       data.push(obj);

       // When we add a new user we will update the DOM
       
       updateDOM();
       
}

// Function for updating the DOM

function updateDOM(providedData = data){
       // Clear the main div
       main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

       //Looping tru the providedData
       providedData.forEach((item) => {
              const element = document.createElement('div');
              element.classList.add('person');
              element.innerHTML = `
                     <strong>${item.name}</strong> ${formatCurrencyMoney(item.money)}
              `;
              main.appendChild(element)

       })
        

}

//Format number as money currency
https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

function formatCurrencyMoney (number) {
       return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



//Adding event listeners
addUser.addEventListener("click", getRandomUser);
doubleMoney.addEventListener("click", doubleTheMoney);
sortByRiches.addEventListener("click", sortByRichest);
showMillionaires.addEventListener("click", showMillionairesOnly);
calculateWealth.addEventListener("click", calculateTotalWealth)

