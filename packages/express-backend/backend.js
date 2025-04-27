import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

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


app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userService.getUsers(name, job)
    .then((result) => {
      result = { users_list: result};
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
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
    userService.addUser(userToAdd)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error)=> console.log(error));
});

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    userService.findUserById(id)
    .then((result)=>{
        if (result === undefined){
            res.status(404).send("Resource not found.");
        } else{
            res.send(result);
        }
      }
    )
    .catch((error)=>console.log(error));
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

