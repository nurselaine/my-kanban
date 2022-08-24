import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/items';
import styled from 'styled-components';

export default function ColumnTarget(props){

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => props.markStatus(item.id, item.status, props.status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }) 
  })

  return (
    <Div
        ref={drop}
        style={{ backgroundColor: isOver ? 'red' : 'white' }}
        status={props.status}
    >
    </Div> 
  )
}

const Div = styled.div`
  position: absolute;
  width: 300px;
  height: 700px;
  border: 1px solid red;
`;
