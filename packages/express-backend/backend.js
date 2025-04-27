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

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userService.addUser(userToAdd)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error)=> console.log(error));
});

app.get("/users/:id/:job", (req, res) => {
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
    userService.deleteUserById(id)
    .then((result) => {
      if (result === undefined){
          res.status(404).send("result not found");
      }
      else{
          res.status(204).send()
      }
    })
    .catch((error)=>console.log(error));
})


