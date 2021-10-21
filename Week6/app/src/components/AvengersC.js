 import { useState} from 'react'
 import AvengersFormHandler from './Avengers-Form';


function AvengersC ({ editAvengers, deleteAvengers, Name,  Gender, Appearances, Death1,  Honorary, Current, _id}) {
//console.log(props);

const [editToggle, setEditToggle] = useState(false)

    return (
        <div className='Avengers-component'>
        {!editToggle ?
        <>
            <h1>Name:{Name}</h1>
            <p> Gender: {Gender}<br/>
                Appearances: {Appearances}<br/>
                Death1: {Death1}<br/>
                Honorary: { Honorary}<br/>
                Current:{Current}<br/>
                {/* Item:{Item[0].money} */}
                </p>
                <button 
                onClick={ () => deleteAvengers(_id)} 
                className='delete-btn'>delete</button>

                <button onClick={() => setEditToggle(prevToggle => !prevToggle)} 
                className='edit-btn'>Edit</button>
            </>
            :
            <>
        <AvengersFormHandler
            FirstName={Name}
            Gender={Gender}
            Appearances={Appearances}
            Death1={Death1}
            Honorary={Honorary}
            Current={Current}
            _id={_id}
            btnText='Submit Edit'
            submit ={(inputs, id) => {
                editAvengers(inputs, id)
                setEditToggle(prevToggle => !prevToggle)
            }}/>
        
            <button onClick={() => setEditToggle(prevToggle => !prevToggle)}>Close</button>
           </> 
        }
        </div>
    );



}

export default AvengersC;