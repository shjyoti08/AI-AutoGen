import React, { useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import './SolveQuestion.css';
import QuestionListModal from './QuestionListModal';


function SolveQuestion() {
  const location = useLocation();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isSolveEnabled, setIsSolveEnabled] = useState(true);
  const [actionType, setActionType] = useState('');
  const [showQuestionListModal, setShowQuestionListModal] = useState(false);

  // Extract necessary data from location state
  const { question, index, questionList, class_id, subject_id, topic_ids, subtopic } = location.state || {};
  // console.log('question-list:', questionList);

   // State to manage current question data
   const [currentQuestion, setCurrentQuestion] = useState({
    question: location.state?.question,
    index: location.state?.index,
  });

  useEffect(() => {
    // console.log("Updated currentQuestion:", currentQuestion);
  }, [currentQuestion]);
  // Handle image upload and set state
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setIsSolveEnabled(files.length === 0); // Enable Solve button only if no images are uploaded
  };

  // Reusable function to send form data to API with dynamic flags
  const sendFormData = async (flags = {},actionType) => {
    const formData = new FormData();
    formData.append('class_id', class_id);
    formData.append('subject_id', subject_id);
    formData.append('topic_ids', topic_ids);
    formData.append('question', currentQuestion.question);
    formData.append('subtopic', subtopic);

    // Add flags to FormData
    Object.entries(flags).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append images only if required for action
    if (flags.correct || flags.submit) {
      images.forEach((image) => {
        formData.append('ans_img', image);
      });
    }

    try {
      const response = await axiosInstance.post('/anssubmit/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const responseData = response.data; // Handle and differentiate responses
      // console.log('Response:', responseData); // Debugging response output
      
      // Navigate to the ResultPage with API response data
      navigate('/resultpage', { state: {...responseData, actionType, questionList,class_id, subject_id, topic_ids, subtopic,},});
      // console.log('Navigating to result page with questionList:', questionList,class_id, subject_id, topic_ids, subtopic);
    } catch (error) {
      console.error('API Error:', error); // Debugging error output
      alert('Failed to perform the action. Please try again.');
    }
  };

  // Button handlers calling sendFormData with appropriate flags
  const handleSubmit = () => {
    // setActionType('submit');
    sendFormData({ submit: true }, 'submit');
  };

  const handleSolve = () => {
    // setActionType('solve');
    sendFormData({ solve: true },'solve');
  };

  const handleCorrect = () => {
    // setActionType('correct');
    sendFormData({ correct: true, submit: false },'correct'); // Specific flags for Correct
  };

  const handleExplain = () => {
    // setActionType('explain');
    sendFormData({ explain: true },'explain');
  };

  // Cancel individual images from the preview list
  const handleCancelImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setIsSolveEnabled(updatedImages.length === 0);
  };
  const handleShowQuestionList = () => setShowQuestionListModal(true);
  const handleCloseQuestionList = () => setShowQuestionListModal(false);

     // Function to handle question selection from modal
  const handleQuestionSelect = (selectedQuestion, selectedIndex) => {
    // Update currentQuestion with selected question and index
    setCurrentQuestion({ question: selectedQuestion, index: selectedIndex });
    handleCloseQuestionList(); // Close the modal after selection
    // console.log("wwwddd:" ,question,index);
  };

  return (
    <div className="solve-question-wrapper">
      <div className="solve-question-container">
        <div className="question-text-container">
          <span className="solve-question-title">Question {currentQuestion.index}</span>
          <p className="question-text">{currentQuestion.question}</p>
        </div>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="formImage">
            <Form.Label>Upload Images</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              multiple
              // capture="camera"
              onChange={handleImageChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="primary"
              type="button"
              className="btn-submit"
              disabled={images.length === 0}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Form>

        <div className="uploaded-images">
          {images.map((image, index) => (
            <div key={index} className="image-preview-container">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="image-preview"
              />
              <Button
                variant="danger"
                className="btn-cancel"
                onClick={() => handleCancelImage(index)}
              >
                Cancel
              </Button>
            </div>
          ))}
        </div>

        <div className="solve-question-buttons">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="btn-back"
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleShowQuestionList}
            className="btn-question-list"
          >
            Question List
          </Button>

          <div className="solve-correct-container">
            <Button
              variant={isSolveEnabled ? "primary" : "secondary"}
              onClick={handleSolve}
              className={`btn-solve ${!isSolveEnabled ? 'disabled-color' : ''}`}
              disabled={!isSolveEnabled}
            >
              Solve
            </Button>
            <Button
              variant={!isSolveEnabled ? "primary" : "secondary"}
              onClick={handleCorrect}
              className={`btn-correct ${isSolveEnabled ? 'disabled-color' : ''}`}
              disabled={isSolveEnabled}
            >
              Correct
            </Button>
          </div>

          <Button
            variant="primary"
            onClick={handleExplain}
            className="btn-explain"
          >
            Explain
          </Button>
        </div>
      </div>

           {/* Question List Modal */}
           <QuestionListModal 
        show={showQuestionListModal} 
        onHide={handleCloseQuestionList} 
        questionList={questionList} 
        onQuestionClick={handleQuestionSelect} 
      />
    </div>
  );
}

export default SolveQuestion;
