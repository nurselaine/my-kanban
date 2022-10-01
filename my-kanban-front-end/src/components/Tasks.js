import { useState, React } from 'react';
import TaskCard from './TaskCard';
import Data from '../dnd_data.json';

export default function Task() {

    const [tasks, setTasks] = useState(Data.tasks);

    // const markAsDone = id => {
    //   const task = tasks.filter(task => task.taskid === id);
    //   task[0].status = "done";
    //   setTasks(tasks.filter(() => task.taskid !== id)).concat(task[0]);
    // };

  return (
   <>
    {tasks
      .filter(task => tasks.status === 'todo')
      .map((task, i) => {
        <TaskCard
          flare={task.flare}
          title={task.title}
          description={task.details}
          _id={task.taskid}
          status={task.status}
        />
      })
    }
   </>
  )
}

