import  Express  from "express";
import  { TodoListadd,TodoListdel, TodoListupd, fetchTodos } from "../controller/todo.controller.js";
const router=Express.Router()
router.post("/todolistadd/:id",TodoListadd);
router.delete("/todolistdel/:id",TodoListdel);
router.put("/todolistupd/:id",TodoListupd);
router.get("/fetchTodos/:date/:id", fetchTodos);

export default router