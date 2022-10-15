import { useState, React, useEffect } from "react";
import Data from '../dnd_data.json';
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { ItemTypes } from "../utils/items";
import styled from 'styled-components';
import ColumnTarget from "./ColumnTarget";
import ColumnHeader from './ColumnHeader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import './Column.css';


export default function Column() {

  // const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('');

  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [columns, setColumns] = useState([]);
  const [boardId, setBoardId] = useState(-1);

  const handleClose = () => {
    setShowTaskModal(false);

    addTask();
  };
  const handleShow = () => setShowTaskModal(true);

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
        // console.log(data);
        setBoardId(data[0]._id);
        setTasks(data[0].tasks);
      })
      .catch(error => {
        console.error("Error", error)
      })
  }

  const addTask = () => {

    const body = {
      title: title,
      details: details,
      status: status,
      imageUrl: "",
      tasklist: "test data 2",
      _id: uuidv4(),
      boardId: boardId,
    };
    console.log(body);
    setTasks(tasks.concat(body));
    console.log(tasks);

    setTitle('');
    setDetails('');
    setStatus('');
  }

  const handleTaskChange = (id, body) => {
    if (body) {
      const task = tasks.filter(task => task._id === id);
      task[0].title = body.title;
      task[0].details = body.details;
      setTasks(tasks.filter((task) => task._id !== id).concat(task[0]));
    } else {
      const updatedTasks = tasks.filter(task => task._id !== id);
      setTasks(updatedTasks);
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

  return (
    <div className="columns-container" style={{ padding: "1rem 0" }}>
      <Main>
        {
          columns.map((column, i) => {
            return (
              <article>
                <Div className="column-div" key={i}>
                  <ColumnHeader
                    column={column}
                    index={i}
                    _id={column._id}
                    length={Data.columns.length}
                  />
                  <ColumnTarget
                    markStatus={markStatus}
                    status={column.name.toLowerCase()}
                  />
                  <DroppableDiv>
                    {tasks
                      .filter(task => task.status === column.name.toLowerCase())
                      .map((task, i) => {
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
                </Div>
              </article>
            )
          })
        }

        <Modal show={showTaskModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <input type="title" onChange={(e) => setTitle(e.target.value)} placeholder='Task Title' />
                </Form.Group>
              </Form>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" onChange={(e) => setDetails(e.target.value)} placeholder='Task Details' />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select onChange={(e) => setStatus(e.target.value)}>
                  <option>Open this select menu</option>
                  {columns.map((col, i) => {
                    return (
                      <option value={col.name} >{col.name}</option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Main>
      <article className="main-span">
        <Button id="updateTask-btn-1" variant="secondary" onClick={handleShow}>ADD TASK</Button>
        <Button id="updateTask-btn-2" variant="outline-primary" onClick={saveData}>SAVE</Button>
      </article>
    </div>
    // </>
  );
};

const Main = styled.main`
  display: flex;

`;

const Div = styled.div`
  position: relative;
  height: 700px;
  overflow: scroll;
  overflow-x: hidden;
  width: 280px;
  margin-right: 30px;
  // padding: 15px;
`;

const DroppableDiv = styled.div`
  width: 280px;
  height: auto;
`;