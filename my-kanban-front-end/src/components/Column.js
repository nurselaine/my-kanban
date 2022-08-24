import { useState, React } from "react";
import Data from '../dnd_data.json';
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { ItemTypes } from "../utils/items";
import styled from 'styled-components';
import ColumnTarget from "./ColumnTarget";

export default function Column() {

  const [tasks, setTasks] = useState(Data.tasks);
  // const [updateStatus, setUpdateStatus] = useState(Data.columns[0]);
  const [refStatus, setRefStatus] = useState('');

  const markStatus = (id, status, updateStatus) => {
    const task = tasks.filter(task => task.taskid === id);
    task[0].status = updateStatus;
    // console.log('heelo');
    setTasks(tasks.filter((task) => task.taskid !== id).concat(task[0]));
    console.log(tasks);
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => markStatus(item.id, item.status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    })
  })


  // console.log(tasks);
  return (
    <Main className="columns-container" style={{ padding: "1rem 0" }}>
      {/* Refactor code */}
      <>
        {
        Data.columns.map((column, i) => {
          return (
            <Div key={i}>
              <h2>{column.name.toUpperCase()}</h2>
              {canDrop ? 'release to drop' : 'Drag box here'}
              {console.log('hello1')}
              <ColumnTarget
                markStatus={markStatus}
                status={column.name.toLowerCase()}
              />
              <DroppableDiv>
                {tasks
                  .filter(task => task.status === column.name.toLowerCase())
                  .map((task, i) => {
                    console.log('hello2', task);
                    return (
                      <TaskCard
                        flare={task.flare}
                        title={task.title}
                        description={task.description}
                        _id={task.taskid}
                        status={task.status}
                        key={i}
                      />
                    )
                  })
                }
              </DroppableDiv>
            </Div>
          )
        })
        }
      </>

      {/* <Div>
        <h2>BACKLOG</h2>
        {canDrop ? 'release to drop' : 'Drag box here'}
        <ColumnTarget
          markStatus={markStatus}
          status={'backlog'}
        />
        <DroppableDiv>
          {tasks
            .filter(task => task.status === 'backlog')
            .map((task, i) => {
              return (
                <TaskCard
                  flare={task.flare}
                  title={task.title}
                  description={task.description}
                  _id={task.taskid}
                  status={task.status}
                  key={i}
                />
              )
            })
          }
        </DroppableDiv>
      </Div>
      <Div>
        <h2>TODO</h2>
        {canDrop ? 'release to drop' : 'Drag box here'}
        <ColumnTarget
          markStatus={markStatus}
          status={'todo'}
        />
        <DroppableDiv>
          {tasks
            .filter(task => task.status === 'todo')
            .map((task, i) => {
              return (
                <TaskCard
                  flare={task.flare}
                  title={task.title}
                  description={task.description}
                  _id={task.taskid}
                  status={task.status}
                  key={i}
                />
              )
            })
          }
        </DroppableDiv>
      </Div>

      <Div>
        <h2>IN PROGRESS</h2>
        {canDrop ? 'release to drop' : 'Drag box here'}
        <ColumnTarget
          markStatus={markStatus}
          status={'in progress'}
        />
        <DroppableDiv>
          {tasks
            .filter(task => task.status === 'in progress')
            .map((task, i) => {
              return (
                <TaskCard
                  flare={task.flare}
                  title={task.title}
                  description={task.description}
                  _id={task.taskid}
                  status={task.status}
                  key={i}
                />
              )
            })
          }
        </DroppableDiv>
      </Div>

      <Div>
        <h2>DONE</h2>
        {canDrop ? 'release to drop' : 'Drag box here'}
        <ColumnTarget
          markStatus={markStatus}
          status={'done'}
        />
        <DroppableDiv>
          {tasks
            .filter(task => task.status === 'done')
            .map((task, i) => {
              return (
                <TaskCard
                  flare={task.flare}
                  title={task.title}
                  description={task.description}
                  _id={task.taskid}
                  status={task.status}
                  key={i}
                />
              )
            })
          }
        </DroppableDiv>
      </Div> */}
    </Main>
  );
};

const Main = styled.main`
  display: flex;
`;

const Div = styled.div`
  position: relative;
  width: 300px;
  min-height: 700px;
  border: 1px solid red;
  margin-right: 30px;
`;

const DroppableDiv = styled.div`
  width: 280px;
  height: auto;
`;