import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const getNameAndJob = (name, job) =>{
    return users["users_list"].filter(
        (user) => (user.name === name) && (user.job) === job
    );
}

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = users;
    if (name != undefined && job != undefined){
        result = getNameAndJob(name, job);
        result = { users_list: result};
    }
    else if (name != undefined){
        result = findUserByName(name);
        result = { users_list: result};
    }
    res.send(result);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const addUser = (user) => {
    let id = Math.floor(Math.random() * 1000000);
    user.id = `${id}`; //gives the user a 6 digit id before adding them

    users["users_list"].push(user);

    return user;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    //ensures that the person added had both a name and job 
    if (userToAdd.name && userToAdd.job){
        addUser(userToAdd);
        res.status(201).send(userToAdd);
    }
    else{
        res.status(400).send();
    }

});

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined){
        res.status(404).send("Resource not found.");
    } else{
        res.send(result);
    }
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined){
        res.status(404).send("result not found");
    }
    else{
        const updated = deleteUser(req.params["id"]);
        users["users_list"] = updated;
        res.status(204).send()
    }
})

const deleteUser = (id) => {
    return users["users_list"].filter(
        (user) => user["id"] !== id
    );
}

