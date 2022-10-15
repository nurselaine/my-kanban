import { useState, React } from "react";
import Card from 'react-bootstrap/Card';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { ItemTypes } from "../utils/items";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TaskModal from "./TaskModal";
import './Task.css';

export default function TaskCard(props) {
  // console.log(props._id)

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [details, setDetails] = useState(props.details);

  const handleClose = () => {
    updateTask();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      id: props._id,
      status: props.status,
      type: ItemTypes.CARD
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  })

  const cardStyles =
  {
    opacity: isDragging ? 0.5 : 1,
    width: '18rem'
  };

  const deleteTasks = () => {

    props.handleTaskChange(props._id);
    console.log('task list updated with deletion');

  }

  const updateTask = () => {
    const body = {
      details,
      title,
    };
    props.handleTaskChange(props._id, body);
  }

  return (
    <>
      <Card
        ref={drag}
        bg='light'
        key='light'
        text='dark'
        style={cardStyles}
        className="mb-2"
        _id={props._id}
        status={props.status}
      >
        {/* <Card.Header>{props.flare}</Card.Header> */}
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.details}
          </Card.Text>
          <Div>
            <Icon>
              <button onClick={handleShow} ><MdModeEdit className="task-icon" /></button>
              <button onClick={deleteTasks} ><MdDelete className="task-icon" /></button>
            </Icon>
          </Div>
        </Card.Body>
      </Card>

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Input type="title" onChange={(e) => setTitle(e.target.value)} placeholder={props.title} />
              </Form.Group>
            </Form>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" onChange={(e) => setDetails(e.target.value)} placeholder={props.details} />
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
      </>


    </>
  );
};

const Div = styled.div`
  // border: 1px solid red;
  display: flex;
  justify-content: flex-end;
`;

const Icon = styled.div`
  margin-left: auto;
  // border: 1px solid red;
`;

const Input = styled.input`
  // border: 1px red solid;
  border: none;
`;