import { useState, React } from 'react';
import TaskCard from './TaskCard';
import Data from '../dnd_data.json';

export default function Task() {

    const [tasks, setTasks] = useState(Data.tasks);

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

