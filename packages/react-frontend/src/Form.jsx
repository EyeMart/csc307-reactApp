import React, { useState } from "react";

/* This file deals inputs to update the table */

function Form(props){
    //state details 
    const [person, setPerson] = useState({
        name: "",
        job: ""
    });

    // when called, the name and value passed are called with setPerson
    function handleChange(event){
        const {name, value} = event.target;
        // if the event name is "job", set the 
        if(name === "job") setPerson({name: person["name"], job: value});

        else setPerson({name: value, job: person["job"]});
    }

    function submitForm(){
        props.handleSubmit(person);
        setPerson({name: "", job: ""});
    }

    return (
        <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={person.name}
                onChange={handleChange}
            />
            <label htmlFor="job"/*label adds a label to the next input*/>Job</label>
            <input
                type="text"
                name="job"
                id="job"
                value={person.job}
                onChange={handleChange}
            />
            <input type="button" value ="Submit" onClick={submitForm}/>
        </form>
    );
}

export default Form;