import { useState } from "react";
import "./App.css";
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';

const App = () => {

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState({show: false});
  const [id, setId] = useState('');
  const [edit, setEdit] = useState(false);

  const [expenses, setExpenses] = useState([
    { id:1, charge: "렌트비", amount: 1000 },
    { id:2, charge: "교통비", amount: 2000 },
    { id:3, charge: "식비", amount: 3000 },
  ])

  const handleCharge = (e) => {
    console.log(e.target.value)
    setCharge(e.target.value)
  }

  const handleAmount = (e) => {    
    setAmount(e.target.valueAsNumber)
  }

  const clearItems = () => {
    setExpenses([])
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (charge !== "" && amount > 0) {
      if(edit) {  
        const newExpenses =expenses.map(item => {
          return item.id === id ? { ...item, charge, amount} : item
        })

        setExpenses(newExpenses);
        setEdit(false)
        handleAlert({type: 'success', text: "아이템이 수정 되었습니다."})

      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount}
        console.log(newExpense)
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses);
        handleAlert({type: "success", text: "아이템이 생성 되었습니다."})  
      }
      setCharge("")
      setAmount(0)            
    } else {
      handleAlert({type: 'danger', text: 'charge는 빈 값 일 수 없으며, amount는 0 보다 작을 수 없습니다.'})
    }
  }


  const handleDelete = (id) => {
    const newExpense = expenses.filter(expense => expense.id !== id)
    console.log(newExpense);
    setExpenses(newExpense);
    handleAlert({ type: 'danger', text: '아이템이 삭제 되었습니다.'})
  }

  const handleAlert = ({ type, text }) => {
    setAlert({show: true, type, text});
    setTimeout(()=>{
      setAlert({ show: false });
    }, 7000)
  }
  
  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id)
    const { charge, amount } = expense;
    setId(id)
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
  }

  return(
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text}/> : null}

      <h1>예산 계산기</h1>
      <div style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '1rem'
        }}>
        <ExpenseForm 
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>
      <div style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '1rem'
        }}>
        <ExpenseList 
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>
      <div style={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: '1rem',
        }}>
        <p style={
          {
            fontSize: '2rem',
          }
        }>
          총지출: 
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
            원
            </span>
        </p>
      </div>
    </main>
  )
}


export default App;