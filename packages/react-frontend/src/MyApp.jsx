import React, { useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

/* overall structure of the react app*/

function MyApp() { 
    //keeps track of all the characters involved
    const [characters, setCharacters] = useState([]);

    function fetchUsers(){
      const promise = fetch("http://localhost:8000/users");
      return promise
    }

    //function used by the button in ./Table
    //filters the current characters array to remove the passed index
    function removeOneCharacter(index){
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated); //then sets charactters to that filtered array
    }

    useEffect(() => {
      fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
    }, []);

    function postUser(person){
      const promise = fetch("http://localhost:8000/users", {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
      });
      return promise;
    }

    function updateList(person){ //called whenever the form is submitted
      postUser(person)
      .then(setCharacters([...characters, person])) // appends the new person to the characters array 
      .catch((error) => {
        console.log(error);
      });
  }

    return (
        //classifies the div as a container (properties defined in main.css)
      <div className="container"> 
        <Table // displays whatever Table returns 
            // passed to table as "props"
            characterData={characters}
            removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} /* displays what form returns and passes updateList as "props" *//> 

      </div> 
    );

  }

  export default MyApp;