import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AvengersC from './components/AvengersC'
import AvengersFormHandler from './components/Avengers-Form';
// import { response } from 'express';



function App() {

  //declaring state, [basically placeholders for a variable, a function and a default value. Also a new useState for the search input.
  const [avengers, setAvengers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

//axios get.
  const getAvengers = () => {
    axios.get('/avengers', {
      params: {
        _limit: 10
      }
    })
    .then(res =>{ setAvengers(res.data)
    console.log(res.data)
    })
  
    .catch(err => console.log(err.response.data.errMsg))
  
  };

//another get request for /avengers/endpoint, received a parameter: value of the input as a params
//get request/ setState, get request and if statement to check for erros.

//axios post.
  const submitAvengers = (newAvenger) => {
    var body = {...newAvenger}
    
axios.post('/avengers', body)
.then(res => {
  console.log(res.data)
  setAvengers(prevavengers => [...prevavengers, res.data])
})
.catch(err => console.log(err.response.data.errMsg))
  };

  //axios delete.
const deleteAvenger = (URL) => {

  console.log('URL: ', URL)

  axios.delete(`/avengers/${URL}`)
  .then(res => 
    setAvengers(prevavengers => prevavengers.filter(avenger => avenger._id !== URL)))
  .catch(err => console.log(err.response.data.errMsg))
}

//axios put. conditional rendering

const editAvenger = (updates, URL) => {
  axios.put(`/avengers/${URL}`, updates)
  .then(res => {
    console.log(res)
    console.log(URL)
    setAvengers(prevavengers => prevavengers.map(avenger => avenger._id !== URL? avenger: res.data ))
  })
  .catch(err => console.log(err.response.data.errMsg))
}
//useEffect.It tells react to do something after render.
  useEffect(() =>{
    getAvengers();
  },  []);

  //used map to iterate through the array and pass it down to the AvengersC component, copy array to new one with the spread operator.
const avengersList = avengers.map(avenger => <AvengersC {...avenger} 



//pass down props, is the same as passing down data to child components.
deleteAvenger={deleteAvenger} 
editAvenger={editAvenger}
Name={avenger.Name} 
Gender={avenger.Gender} 
Appearances={avenger.Appearances}
Death1 ={avenger.Death1} 
Honorary={avenger.Honorary} 
Current={avenger.Current}
 _id={avenger._id} 
/>)


  return (
    <div className="Avengers-container">
    <h2> Avengers Table</h2>
    <AvengersFormHandler 
    btnText='Add Avenger' 
    submit={submitAvengers}/>
    {avengersList}

{/* search input for a Avengers by accessing the first name */}
    <input type="search" placeholder="search" onChange={event => {setSearchTerm(event.target.value)}}/>
  {avengers.filter((val) => {
    if (searchTerm === val.Name){
      return val.Name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    } else if (val) {

    }
  
  }).map((val, key) => {
    return <div className="user" key={key}>
    <p>Name: {val.Name}<br/> 
    Gender: {val.Gender}<br/>
    Appearances: {val.Appearances}<br/>
    Death1: {val.Death1}<br/>
    Honorary: {val.Honorary}<br/>
    Current: {val.Current}<br/>
    {/* Item: {val.Item[0].money} */}
    
  
    </p></div>
  })}

    
    </div>
  );
 
}

export default App;
