import { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';




function App() {
const [Name, setName] = useState("")
const [Gender, setGender] = useState("")
// const [searchTerm, setSearchTerm] = useState("")
const [NameGenderList, setList] = useState([])

useEffect(() => {
  Axios.get('/avengers').then((response) =>{
  setList(response.data)  
  console.log(response.data)
  })

}, [])

const submitAvengers = () =>{
Axios.post("/insert", {
  Name: Name, 
  Gender: Gender,
}).then(() => {
  console.log("It worked!")
})
}

// const deleteAvenger = (URL) => {

//   console.log('avengers: ', URL)

//   Axios.delete(`/delete/${URL}`)
//   .then(res => 
//     setList(prevAvengers => prevAvengers.filter(avenger => avenger.URL !== URL)))
//   .catch(err => console.log(err.response.data.errMsg))
// }

return(
  <div>
    <h1>Avengers Data</h1>

    <div className="Avengers-component">
  <label>Name</label>
  <input type="text" name="Name" onChange={(e) => {
    setName(e.target.value)
  }}/>
  <label>Gender</label>
  <input type="text" name="Gender" onChange={(e)=>{
    setGender(e.target.value)
  }}/>

  <button onClick={submitAvengers}>Submit</button>
  {NameGenderList.map((val) => {
    return <div><h1>Name: {val.Name} | Gender: {val.Gender}</h1> </div>
  })}
    </div>
  </div>
);

}
export default App;

