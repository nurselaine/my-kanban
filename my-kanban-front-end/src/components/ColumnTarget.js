import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/items';
import styled from 'styled-components';

export default function ColumnTarget(props){

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => props.markStatus(item.id, props.status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }) 
  })

  return (
    <Div
        ref={drop}
        style={{ backgroundColor: isOver ? 'grey' : 'transparent' }}
        status={props.status}
    >
    </Div> 
  )
}

const Div = styled.div`
  position: absolute;
  width: 100%;
  height: 600px;
  background-color: #FCFEFF;
`;
