import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './StudentDash.css'; // Import the updated CSS file
import axiosInstance from '../api/axiosInstance'; 
import QuestionListModal from './QuestionListModal';
import Select from 'react-select';

function StudentDash() {
  const navigate = useNavigate();

//  // if api is calling then 
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState([]);
  const [questionType, setQuestionType] = useState('');
  const [questionLevel, setQuestionLevel] = useState('');
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [questionList, setQuestionList] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch classes
        const classResponse = await axiosInstance.get('/classes/');
        
        // Access the `data` property in the response
        const classesData = classResponse.data.data;
        setClasses(classesData);  // Update state with the array of classes

        // console.log(classesData);  // Verify the correct data is being logged
      } catch (error) {
        console.error('Error fetching classes', error);
      }
    }
    fetchData();
  }, []);

    // Fetch subjects when selectedClass changes
    useEffect(() => {
      async function fetchSubjects() {
        if (selectedClass) {
          try {
            const subjectResponse = await  axiosInstance.get('/subjects/');
            setSubjects(subjectResponse.data.data); // Ensure `data` is used
            // console.log( subjectResponse.data.data);
          } catch (error) {
            console.error('Error fetching subjects', error);
          }
        }
      }
      fetchSubjects();
    }, [selectedClass]);
  
    // Fetch chapters when selectedSubject changes
    useEffect(() => {
      async function fetchChapters() {
        if (selectedSubject) {
          try {
            const chapterResponse = await axiosInstance.get(`/chapters/${selectedSubject}/`);
            setChapters(chapterResponse.data.data); // Ensure `data` is used
          } catch (error) {
            console.error('Error fetching chapters', error);
          }
        }
      }
      fetchChapters();
    }, [selectedSubject]);
  
    // Fetch subtopics when selectedChapters changes
    useEffect(() => {
      async function fetchSubtopics() {
        if (selectedChapters.length > 0) {
          try {
            const subtopicResponse = await axiosInstance.get(`/topics/${selectedChapters}/`);
            setSubtopics(subtopicResponse.data.data); // Ensure `data` is used
          } catch (error) {
            console.error('Error fetching subtopics', error);
          }
        }
      }
      fetchSubtopics();
    }, [selectedChapters]);
  

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };
  const handleQuestionClick = (question, index) => {
    console.log('Selected Values before navigate:', {
      class_id: selectedClass,
      subject_id: selectedSubject,
      topic_ids: selectedChapters,
      subtopic: selectedSubtopic
    });
  
    navigate('/solvequestion', { state: { 
      questionList,
      question,
       questionNumber: index + 1, 
      class_id: selectedClass,
      subject_id: selectedSubject,
      topic_ids: selectedChapters,
      subtopic: selectedSubtopic} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      classid: Number(selectedClass),
      subjectid: Number(selectedSubject),
      topicid: selectedChapters,
      subtopicid: selectedSubtopic,
      solved: questionType === 'solved',
      exercise: questionType === 'exercise',
      external: questionType === 'external' ? questionLevel : null // Set level if type is external
    };
    // console.log('Request Data:', requestData);
    try {
      const response = await axiosInstance.post('/aiquestions/', requestData);
      setQuestionList(response.data.questions);
      setShowQuestionList(true);
    } catch (error) {
      console.error('Error generating question list', error);
      setShowQuestionList(true); // Show the modal even if no questions are found
    }
  };
 
 const handleClose = () => {
    setShowQuestionList(false);
  };
 
  return (
    <div className="d-flex flex-column min-vh-100">
      

      <main className="flex-fill d-flex justify-content-center align-items-center">
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="formClass">
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Class</option>
                    {classes && classes.length > 0 && classes.map((cls) => (
                       <option key={cls.id} value={cls.id}>
                            {cls.class_name}
                              </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.subject_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
              <Form.Group controlId="formChapters">
                    <Form.Label>Chapters</Form.Label>
                       {/* <Form.Control
                        as="select"
                        isMulti
                       value={selectedChapters}
                         onChange={(e) => {
                         const options = e.target.options;
                           const selected = Array.from(options)
                          .filter(option => option.selected)
                         .map(option => Number(option.value)); // Convert to number
                       setSelectedChapters(selected);
                          }}
                         className="form-control"
                          >
                         <option value="">Select Chapters</option>
                           {chapters.map((chapter) => (
                           <option key={chapter.id} value={chapter.id}>
                                   {chapter.name}
                            </option>
                          ))}
                         </Form.Control> */}
                         <Form.Group controlId="formChapters">
    
                         <Select
                           isMulti
                          options={chapters.map((chapter) => ({
                         value: chapter.id,
                          label: chapter.name
                           }))}
                           value={selectedChapters.map((id) => ({
                           value: id,
                           label: chapters.find((chapter) => chapter.id === id)?.name
                          }))}
                          onChange={(selectedOptions) => {
                          setSelectedChapters(selectedOptions.map(option => option.value));
                            }}
                            classNamePrefix="react-select"
                          placeholder="Select Chapters"
                          />
                       </Form.Group>
                      </Form.Group>
                   </Col>
              
                {/* <Col xs={12} md={6}>
                <Form.Group controlId="formSubtopics">
                   <Form.Label>Subtopics</Form.Label>
                   <Form.Control
                     as="select"
                     
                      value={selectedSubtopic}
                      onChange={(e) => {
                       const options = e.target.options;
                       const selected = Array.from(options)
                     .filter(option => option.selected)
                        .map(option => Number(option.value)); // Convert to number
                       setSelectedSubtopic(selected);
                              }}
                      className="form-control"
                     >
                     <option value="">Select Subtopics</option>
                        {subtopics.map((subtopic) => (
                             <option key={subtopic.id} value={subtopic.id}>
                                 {subtopic.name}
                                         </option>
                                   ))}
                     </Form.Control>
                    </Form.Group>

                </Col> */}

                <Col xs={12} md={6}>
                <Form.Group controlId="formQuestionType">
                  <Form.Label>Question Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Question Type</option>
                    <option value="solved">Solved</option>
                    <option value="exercise">Exercise</option>
                    <option value="external">External</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              {questionType === 'external' && (
                <Col xs={12} md={6}>
                  <Form.Group controlId="formQuestionLevel">
                    <Form.Label>Question Level</Form.Label>
                    <Form.Control
                      as="select"
                      value={questionLevel}
                      onChange={(e) => setQuestionLevel(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select Level</option>
                      <option value="level-1">Level 1</option>
                      {/* <option value="level-2">Level 2</option>
                      <option value="level-3">Level 3</option> */}
                    </Form.Control>
                  </Form.Group>
                </Col>
              )}
         
            </Row>

            {/* <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="formQuestionType">
                  <Form.Label>Question Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Question Type</option>
                    <option value="solved">Solved</option>
                    <option value="exercise">Exercise</option>
                    <option value="external">External</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              {questionType === 'external' && (
                <Col xs={12} md={6}>
                  <Form.Group controlId="formQuestionLevel">
                    <Form.Label>Question Level</Form.Label>
                    <Form.Control
                      as="select"
                      value={questionLevel}
                      onChange={(e) => setQuestionLevel(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select Level</option>
                      <option value="level-1">Level 1</option>
                      <option value="level-2">Level 2</option>
                      <option value="level-3">Level 3</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              )}
            </Row> */}

            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit" className="btn-generate mt-3">
                Generate Questions
              </Button>
            </div>
          </Form>
        </div>
      </main>

     
  <QuestionListModal
        show={showQuestionList}
        onHide={handleClose}
        questionList={questionList}
        onQuestionClick={handleQuestionClick}
      />
    </div>
  );
}

export default StudentDash;
