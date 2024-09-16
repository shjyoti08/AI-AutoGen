import React,{useState,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col,Accordion } from 'react-bootstrap';
import './ResultPage.css'; // Assuming you have some custom CSS for styling
import QuestionListModal from './QuestionListModal'; 

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showQuestionListModal, setShowQuestionListModal] = useState(false);
  
  // Accessing the response data from navigation state
  const { state } = location;
  const { message, ai_data, actionType, questionList,class_id, subject_id, topic_ids, subtopic } = state || {};
  const { question, ai_explaination, student_answer, question_marks, obtained_marks,concepts } = ai_data || {};

  // console.log('question-list:',questionList)

  const handleBackToDashboard = () => {
    navigate('/student-dash'); // Replace with your actual dashboard route
  };
  useEffect(() => {
    console.log("Class ID:", class_id);
    console.log("Subject ID:", subject_id);
    console.log("Topic IDs:", topic_ids);
    console.log("Subtopic:", subtopic);
  }, [class_id, subject_id, topic_ids, subtopic]);

  const handleShowQuestionList = () => {
    setShowQuestionListModal(true); // Show the question list modal
  };

  const handleCloseQuestionList = () => {
    setShowQuestionListModal(false); // Close the question list modal
  };

  const handleQuestionSelect = (selectedQuestion, index) => {
    navigate('/solvequestion', { state: { question: selectedQuestion, index, questionList, class_id,
      subject_id,
      topic_ids,
      subtopic } });
  };
  // Function to render content based on actionType
  const renderContentBasedOnAction = () => {
    switch (actionType) {
      case 'submit':
        return (
            <>
          <div className="result-explanation">
            <p><strong>Student Answer:</strong> {student_answer}</p>
           </div>
          <div className="result-explanation">
           <p><strong>Score:</strong> {obtained_marks}/{question_marks}</p>
        </div>
        </>
        );
      case 'solve':
        return (
             <>
             <div className="result-explanation">
             <p><strong>AI Solution:</strong> {ai_explaination}</p>
              </div>
             <div className="result-explanation">
              <p><strong>Score:</strong> {obtained_marks}/{question_marks}</p>
           </div>
           </>
        );
      case 'correct':
        return (
            <>
             <div className="result-explanation">
            <p><strong>Student Answer:</strong> {student_answer}</p>
           </div>
            <div className="result-explanation">
            <p><strong>AI Solution:</strong> {ai_explaination}</p>
             </div>
            <div className="result-explanation">
             <p><strong>Score:</strong> {obtained_marks}/{question_marks}</p>
          </div>
          </>
        );
      case 'explain':
        return (
         <>
           {concepts && (
              <Accordion defaultActiveKey="0" className="result-accordion">
                {concepts.map((conceptItem, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index} className="accordion-item">
                    <Accordion.Header><strong>{`Concept ${index + 1}`}</strong></Accordion.Header>
                    <Accordion.Body>
                      <p><strong>{`${conceptItem.concept}`}</strong></p>
                      <p><strong>Example 1:</strong> {conceptItem['example-1']}</p>
                      <p><strong>Example 2:</strong> {conceptItem['example-2']}</p>
                      <p><strong>Explanation:</strong> {conceptItem.explanation}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
         </>
        );
      default:
        return <p>No action type provided. Unable to display results.</p>;
    }
  };

  return (
    <Container className="result-page-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={8} className="result-content">
          <h2 className="result-title">Result</h2>
          <div className="result-question">
            <p><strong>Question:</strong> {question}</p>
          </div>
          {renderContentBasedOnAction()} {/* Render content dynamically based on actionType */}
          <div className="result-buttons mt-4">
            <Button variant="primary" onClick={handleShowQuestionList} className="me-2">
              Next Question
            </Button>
            <Button variant="secondary" onClick={handleBackToDashboard}>
              Back to Dashboard
            </Button>
          </div>
        </Col>
      </Row>

       {/* Question List Modal */}
       <QuestionListModal 
        show={showQuestionListModal} 
        onHide={handleCloseQuestionList} 
        questionList={questionList} 
        onQuestionClick={handleQuestionSelect} 
      />
    </Container>
  );
};

export default ResultPage;
