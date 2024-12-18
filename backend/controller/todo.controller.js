import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";
export const TodoListadd = async (req, res) => {
    try {
     const {date,text,completed}=req.body;
     console.log(req.params.id)
     const exitstingUser=await User.findById(req.params.id)
     console.log(exitstingUser)
     if(exitstingUser){
      const todo =new Todo({date,text,completed,user:exitstingUser})
      await todo.save().then(()=>res.status(200).json({todo}))
      exitstingUser.todo.push(todo)
      exitstingUser.save()
     }
    } catch (error) {
     console.log(error)
    }
  };
export const TodoListdel = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
      
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    await Todo.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const TodoListupd = async (req, res) => {
  
  try {
    console.log("enter put")
   const {text,completed,userName}=req.body;
   const exitstingUser=await User.findOne({userName})
   if(exitstingUser){
   const todo= await Todo.findByIdAndUpdate(req.params.id,{text,completed});
   todo.save().then(()=>res.status(200).json({message:'Task updated'}))
   }
  } catch (error) {
   console.log(error)
  }
};
export const fetchTodos = async (req, res) => {
  try {
    const { date, id } = req.params;
    // Check if the user exists
    const existingUser = await User.findById(req.params.id);
    console.log(existingUser)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch todos for the specified date and user
    const todos = await Todo.find({ date, user: existingUser._id }).exec();
    res.status(200).json({ todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
