const inputName = document.querySelector('#text')
const inputAmountValue = document.querySelector('#amount')
const buttonSubmit = document.querySelector('#btn')
const form = document.querySelector('#form')
const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')



const localStorageTransanctions = JSON.parse(localStorage
  .getItem('transactions'))
let transactions = localStorage
  .getItem('transactions') !== null ? localStorageTransanctions : []
const removeTransaction = ID => {
  transactions = transactions
    .filter(transaction => transaction.id != ID)
  init()
  updateLocalStorage()
}

const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const CCSClass = transaction.amount < 0 ? 'minus' : 'plus'
  const amountWidthouOperator = Math.abs(transaction.amount)
  const li = document.createElement('li')


  li.classList.add(CCSClass)
  li.innerHTML = `
  ${transaction.name}
  <span> ${operator} R$ ${amountWidthouOperator}
  </span><button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
  `
  
  transactionsUl.prepend(li)
}

const updateBalanceValues = () => {
  const transactionsAmount = transactions
  .map(transaction => transaction.amount)

  const total = transactionsAmount
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

  const income = transactionsAmount
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

  const expense = Math.abs(transactionsAmount
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

  balanceDisplay.textContent = `${total}`
  incomeDisplay.textContent = `+ ${income}`
  expenseDisplay.textContent = `- ${expense}`
}

const init = () => {
  transactionsUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDOM)
  updateBalanceValues()
}

init()

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const handleFormSubmit = event => {
  event.preventDefault()

  const inputRadioValue = document.querySelector('input[name="tipo"]:checked').value

  if(inputName.value.trim() === '' || inputAmountValue.value.trim() === ''){
    erro.textContent = 'Preencha todos os dados'
    $('#erro').fadeIn(1000)
    return
  }else{
    $('#erro').fadeOut(1000)
  }
  
  inputAmountValue.value = inputAmountValue.value.replaceAll(',', '.')

  const transaction = {
    id: generateID(),
    name: inputName.value,
    amount: Number(`${inputRadioValue}${inputAmountValue.value}`)
  }
  
  transactions.push(transaction)
  init()
  updateLocalStorage()

  inputName.value = ''
  inputAmountValue.value = ''
  inputRadioValue.value = ''

}

const generateID = () => Math.round(Math.random() * 1000)
buttonSubmit.addEventListener('click', handleFormSubmit )


$('.showTransactions').click(() => {
  const li = document.createElement('li')
  const erro = document.querySelector('#erro')
  if(transactions == ''){
    erro.textContent = 'Nenhuma Transção realizada ainda'
    $('#erro').fadeIn(1000)
    return
  }


  $(transactionsUl).toggle(400, "linear")
})

$('.addTransaction').click(() => {
  $('#form').toggle(400, "linear")
  $('#erro').fadeOut()
})

