import { useState, React } from "react";
import Card from 'react-bootstrap/Card';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { ItemTypes } from "../utils/items";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import './Task.css';
export default function TaskCard(props) {
  // console.log(props._id)

  const [{ isDragging }, drag ] = useDrag({
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

    const deleteTasks = (id) => {
// update the tasks state and filter out the task matching the id passed through

      props.handleTaskChange(id);
      console.log('task list updated with deletion');


      // fetch(`http://localhost:3001/task/${id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // })
      //   .then(res => res.json())
      //   .then(data => console.log(data))
      //   .catch(error => console.error('Error', error))
    }

     // move this to the TaskModal component
  // const updateTask = (id, updatedDetails) => {
  //   fetch(`http://localhost:3001/task/${id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({updatedDetails})
  //   })
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error', error));
  // }

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
              <MdModeEdit className="task-icon"/>
              <MdDelete onClick={() => deleteTasks(props._id)} className="task-icon"/>
            </Icon>
          </Div>
        </Card.Body>
      </Card>
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