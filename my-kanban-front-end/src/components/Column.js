import { useState, React, useEffect } from "react";
import axios from 'axios';
import Data from '../dnd_data.json';
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { ItemTypes } from "../utils/items";
import styled from 'styled-components';
import ColumnTarget from "./ColumnTarget";
import ColumnHeader from './ColumnHeader';

export default function Column() {

  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [columns, setColumns] = useState([]);
  const [columnName, setColumnName] = useState('');
  const [boardId, setBoardId] = useState(-1);

  useEffect(() => {
    getColumns();
    getTasks();
  }, []);

  const getColumns = async () => {

    fetch(`http://localhost:3001/column`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        const sortedData = data.sort((a, b) => a.index - b.index)
        setColumns(sortedData)
      })
      .catch(error => console.error('Error', error));
  }

  const getTasks = () => {
    fetch('http://localhost:3001/task')
      .then(res => res.json())
      .then(data => {
        // console.log(data[0]);
        setBoardId(data[0]._id);
        setTasks(data[0].tasks);
      })
      .catch(error => {
        console.error("Error", error)
      })
  }

  // const addColumn = () => {
  //   fetch(`http://localhost:3001/column/add`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: ({
  //       name: columnName,
  //       index: columnIndex,
  //       boardId: -1
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error', error));
  // }

  const addTask = () => {
    fetch(`http://localhost:3001/task/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        boardId: 123,
        title: "test data 2",
        details: "test details 2",
        status: "backlog",
        imageUrl: "",
        tasklist: "test data 2"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error", error);
      })
  }

  const handleTaskChange = (id, body) => {
    if (body) {
      // this will update the tasks and add it to tasks state 
      const task = tasks.filter(task => task._id === id);
      task[0].title = body.title;
      task[0].details = body.details;
      console.log(task);
      console.log(`task updated! ${JSON.stringify(task)}`);
      setTasks(tasks.filter((task) => task._id !== id).concat(task[0]));
    } else {
      // this will remove the deleted task
      const updatedTasks = tasks.filter(task => task._id !== id);
      setTasks(updatedTasks);
      // console.log(`task deleted! ${JSON.stringify(updatedTasks.length)}`);
    }
  }

  const saveData = () => {
    const body = {
      tasks: tasks
    }
    console.log(body);
    fetch(`http://localhost:3001/task/save/${boardId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(rez => console.log(rez))
      .catch(error => console.error("error", error));
  }

  const markStatus = (id, status) => {
    const task = tasks.filter(task => task._id === id);
    task[0].status = status;
    setTasks(tasks.filter((task) => task._id !== id).concat(task[0]));
    // console.log(tasks);
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      console.log(monitor.getDropResult());
      markStatus(item.id, item.status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    })

  })


  console.log(tasks);
  // console.log(columns);
  return (
    // <>
    // <button onClick={saveData}>Save</button>
    <Main className="columns-container" style={{ padding: "1rem 0" }}>
      {/* Refactor code */}
      <>
        {
          columns.map((column, i) => {
            return (
              <Div key={i}>
                <ColumnHeader
                  column={column}
                  index={i}
                  _id={column._id}
                  length={Data.columns.length}
                />
                {/* {canDrop ? 'release to drop' : 'Drag box here'} */}
                <ColumnTarget
                  markStatus={markStatus}
                  status={column.name.toLowerCase()}
                />
                <DroppableDiv>
                  {tasks
                    .filter(task => task.status === column.name.toLowerCase())
                    .map((task, i) => {
                      // console.log('hello2', task);
                      return (
                        <TaskCard
                          title={task.title}
                          details={task.details}
                          _id={task._id}
                          status={task.status}
                          key={i}
                          tasklist={task.tasklist}
                          imageUrl={task.imageUrl}
                          handleTaskChange={handleTaskChange}
                        />
                      )
                    })
                  }
                </DroppableDiv>
                <div onClick={() => setShowTaskModal(true)}>+ ADD TASK</div>
              </Div>
            )
          })
        }
      </>
      <button onClick={saveData}>save Button</button>
    </Main>
    // </>
  );
};

const Main = styled.main`
  display: flex;
`;

const Div = styled.div`
  position: relative;
  width: 280px;
  min-height: 700px;
  // border: 1px solid purple;
  margin-right: 30px;
  // background-color: #FCFEFF;
`;

const DroppableDiv = styled.div`
  width: 280px;
  height: auto;
`;