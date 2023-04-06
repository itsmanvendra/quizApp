import { useState, useEffect, useRef } from "react";
import CardList from "./component/CardList";
import axios from "axios";
import './App.css'

function App() {

  
  const categoryEL = useRef();
  const amountEL = useRef();
  const [listitem, setListitem] = useState([]);
  const [categories, setCategory] = useState([]);
  

  useEffect(()=>{
    axios.get(`https://opentdb.com/api_category.php`)
    .then(res =>{ 
      setCategory(res.data.trivia_categories)
    })
  }, [])


  function decode(str){
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    // console.log(textarea.value);
    return textarea.value;
  }

  function handleSubmit(e){
    e.preventDefault();
    axios.get(`https://opentdb.com/api.php?`, {
      params : {
        amount : amountEL.current.value,
        category : categoryEL.current.value
      }

      })
    .then(res => {
      setListitem(res.data.results.map((item, index) => {
        const answer = decode(item.correct_answer);
        // console.log(answer);
        const options = [...item.incorrect_answers.map(a => decode(a)), answer];

        return {
          id : `${index}-${Date.now()}`,
          question : decode(item.question),
          answer : answer,
          options : options.sort(() => Math.random() - .5),
        }
      })
      )
    })
  }
  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEL}>
            {categories.map((cat => {
              return (
                <option value={cat.id} key={cat.id}>{cat.name}</option>
              )
            }))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Question</label>
          <input type="number" step="1" min="1" max="10" ref={amountEL} ></input>
          <button onClick={handleSubmit}>Generate</button>
        </div>
      </form>
      <CardList listitem={listitem} />
    </>
    
  );
}

export default App;
