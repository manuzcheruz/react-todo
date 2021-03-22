import React, {useState} from 'react';
import './App.css';

const Aux = props => props.children;

function App() {
  const[todos, setTodos] = useState([]);
  const[single, setSingle] = useState('');
  const onInputChange = event => {
    setSingle(event.target.value);
  }

  const onFormSubmit = event => {
    event.preventDefault();
    try {
        const newData = {
      name: single,
      status: 'pending'
    }
    setTodos([...todos, newData]);
    setSingle('');
    } catch (error) {
      alert(error.message);
    }
  
  } 

  const onDelete = name => {
    const newTodos = todos.filter(item => item.name !== name);
    console.log(newTodos);
    setTodos(newTodos);
  }

  const onCompleteTask = ({item, index}) => {
    item.status = 'complete'
    let newTodos = [...todos]
    newTodos[index] = item
    setTodos(newTodos)
    // const newTodos = todos.filter(stuff => stuff.name !== item.name);
    // const otherNew = [...newTodos, item];
    // setTodos(otherNew);
  }

  return (
    <div className="App">
      <div>
        <ol>
          {todos.map((item, i) => {
            return (
              <Aux key={i}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 0.5fr 0.5fr', textAlign: 'left'}}>
                  <li>{item.name} - {item.status}</li>
                  <button onClick={() => onDelete(item.name)}>delete</button>
                  <button onClick={() => onCompleteTask({item, index:i})}>complete</button>
                </div>
              </Aux>
            )
          })}
        </ol>
      </div>
      <div>
        <form onSubmit={event => onFormSubmit(event)}>
          <input onChange={event => onInputChange(event)} value={single}/>
          <button style={{marginTop: '10px'}} type='submit' disabled={!single.trim()}>add</button>
        </form>
      </div>
    </div>
  );
}

export default App;
