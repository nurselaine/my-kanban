import { useState, React } from 'react';
import Form from 'react-bootstrap';
import styled from 'styled-components';
import Column from './Column';
import {MdEdit} from 'react-icons/md';
import {IoMdTrash} from 'react-icons/io';
import {FcCheckmark} from 'react-icons/fc';

const ColumnHeader = (props) => {

  const [showForm, setShowForm] = useState(false);
  const [columnName, setColumnName] = useState('');

  // console.log(props.column);

  const updateColumn = (id) => {
    const columnData = {
      name: columnName,
      index: props.column.index,
      _id: props._id
    };
    fetch(`http://localhost:3001/column/update/${id}`, {
      method: 'PATCH',
      header: {
        'Content-Type': 'application/json',
      },
      body: (columnData)
    })
      .then(res => res.json())
      .then(data => console.log('success', data))
      .catch(error => console.error('error', error));
    console.log('updated column');
    setShowForm(false);
  }

  const deleteColumn = (id) => {
    fetch(`http://localhost:3001/column/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error', error))
  }

// console.log(showForm);
  return (
    <Header>
      {
        showForm ?
          <>
            <form>
              <Input onChange={(e) => setColumnName(e.target.value.toUpperCase())} type='columnName' placeholder={props.column.name.toUpperCase()} />
            </form>
            <button onClick={() => updateColumn(props.column._id)} type='submit'>done</button>
          </>

          :
          <>
            <H2>{props.column.name.toUpperCase()}</H2>
            <P>{props.length} items</P>
            <Button onClick={() => setShowForm(true)}><MdEdit/></Button>
            <Button onClick={deleteColumn(props.index)} ><IoMdTrash/></Button>
          </>
      }
    </Header>
  )
}

const Button = styled.button`
  border: none;
  background-color: transparent;
`;

const Input = styled.input`
  border-style: none;
  background-color: transparent;
  cursor: pointer;
`;

const Header = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: flex-start;
  padding: 10px 0px;
`;
const H2 = styled.h2`
  font-weight: 400;
`;
const P = styled.p`
  border: 1px solid red;
  margin: auto;
  margin-left: 1.5em;
  font-size: 0.75em;
  font-weight: lighter;
`;

export default ColumnHeader;