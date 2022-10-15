// import { useState, React } from 'react';
// import { Modal, Form, Button } from 'react-bootstrap';
// import styled from "styled-components";

// export default function TaskModal(props){

//   const [title, setTitle] = useState(props.title);
//   const [details, setDetails] = useState(props.details);
  
//   // const handleClose = () => {
//   //   updateTask();
//   // };

//   // const deleteTasks = () => {

//   //   props.handleTaskChange(props._id);
//   //   console.log('task list updated with deletion');

//   // }

//   const updateTask = (id, updatedDetails) => {
//     const body = {
//       details,
//       title,
//     };
//     props.handleTaskChange(props._id, body);
//     props.handleClose();
//   }




//   return (
//     <Modal show={props.show} onHide={props.handleClose}>
//     <Modal.Header closeButton>
//       <Modal.Title>
//       <Form>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Input type="title" onChange={(e) => setTitle(e.target.value)} placeholder={props.title} />
//         </Form.Group>
//       </Form>
//       </Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <Form>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Control type="email" onChange={(e) => setDetails(e.target.value)} placeholder={props.details} />
//         </Form.Group>
//       </Form>
//     </Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={props.handleClose}>
//         Close
//       </Button>
//       <Button variant="primary" onClick={props.updateTask}>
//         Save Changes
//       </Button>
//     </Modal.Footer>
//   </Modal>
//   )
// }

// const Input = styled.input`
//   border: 1px red solid;
// `;