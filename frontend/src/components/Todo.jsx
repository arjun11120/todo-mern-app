import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ToDo = ({ data, onSave, onDelete }) => {
  const [newItem, setNewItem] = useState("");

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      onSave({ text: newItem });
      setNewItem("");
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center p-4">
        <Col xs={12} sm={6}>
          <InputGroup className="mb-3">
            <Form.Control
              style={{ color: "#777777", background: "#0d0714", border: "1px solid #3E1671" }}
              aria-label="Add Title"
              aria-describedby="basic-addon2"
              value={newItem}
              onChange={handleInputChange}
              placeholder="Add a new todo item"
            />
            <Button
              style={{background: "#9e78cf", color: "white", fontSize: "22px"}}
              id="button-addon2"
              onClick={handleAddItem}
            >
              <FontAwesomeIcon style={{background: "#9e78cf"}} icon={faPlus} /> 
            </Button>
          </InputGroup>
          <div>
            <div style={{ color: "#9E78CF" }}>
            <TransitionGroup>
              {data.map((item, index) => (
                <CSSTransition key={item._id} timeout={500} classNames="todo-item">
                  <div
                    className="todo-item d-flex justify-content-between align-items-center"
                    style={{ padding: "13px 15px", background: "#15101C", margin: "15px 0px", borderRadius: "5px" }}
                  >
                    <span style={{ fontSize: "14px" }}>{item.text}</span>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      onClick={() => onDelete(item._id)}
                      style={{ cursor: 'pointer', color: "#3E1671", fontSize: "18px" }}
                    />
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ToDo;
