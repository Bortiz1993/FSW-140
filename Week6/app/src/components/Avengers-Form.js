import {useState} from 'react'

function AvengersFormHandler({submit, btnText, Name, Gender, Appearances, Death1, Honorary, Current, _id}) {
const initialInputs = {Name: Name || "", Gender: Gender || "", Appearances:Appearances || "", Death1:Death1 || "", Honorary:Honorary || "", Current:Current || "", _id:_id || ""};
const [inputs, setInputs] = useState(initialInputs);

const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs(prevInputs => ({...prevInputs, [name]: value}))

}

const handleSubmit = (e) => {
    e.preventDefault();
    submit(inputs, _id);

setInputs(initialInputs);
}

return (
    <form onSubmit={handleSubmit}>
        <input
        required
        type='text'
        name='Name'
        value={inputs.Name}
        onChange={handleChange}
        placeholder='Name'/>
        <input
        required
        type='text'
        name='Gender'
        value={inputs.Gender}
        onChange={handleChange}
        placeholder='Gender'/>
        <input
        required
        type='number'
        name='Appearances'
        min= '1'
        max='5000'
        value={inputs.Appearances}
        onChange={handleChange}
        placeholder='Appearances'/>
        <input
        required
        type='boolean'
        name='Death1'
        value={inputs.Death1}
        onChange={handleChange}
        placeholder={'Death1'}/>
    <input
        required
        type='text'
        name='Honorary'
        value={inputs.Honorary}
        onChange={handleChange}
        placeholder='Honorary'/>
        <input
        required
        type='text'
        name="Current"
        value={inputs.Current}
        onChange={handleChange}
        placeholder='Current'/>

        <button className='addAvenger-btn'>{btnText}</button>
    </form>
)
}

export default AvengersFormHandler;