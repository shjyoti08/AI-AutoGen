import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './QuestionListModal.css'; // Add styles as needed

const QuestionListModal = ({ show, onHide, questionList=[], onQuestionClick }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="question-modal">
      <Modal.Header closeButton>
        <Modal.Title>Question List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="question-list-container">
          {questionList.length > 0 ? (
            <ul className="question-list">
              {questionList.map((question, index) => (
                <li
                  key={index}
                  className="question-item"
                  onClick={() => onQuestionClick(question, index)}
                >
                  <div className="question-number">{index + 1}</div>
                  <div className="question-text">{question}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionListModal;
