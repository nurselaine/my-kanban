import { useState, React } from "react";
import Card from 'react-bootstrap/Card';
import { ItemTypes } from "../utils/items";
import { useDrag } from "react-dnd";

export default function TaskCard(props) {

  const [{ isDragging }, drag ] = useDrag({

    type: ItemTypes.CARD,
    item: {
      id: props._id,
      status: props.status,
      type: ItemTypes.CARD},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  })

  const cardStyles =
    {
      opacity: isDragging ? 0.5 : 1,
      width: '18rem'
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
        _id={props.taskid}
        status={props.status}
      >
        <Card.Header>{props.flare}</Card.Header>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};