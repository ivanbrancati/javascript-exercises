import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import {ExamScores, ExamForm} from './ExamComponents.js';
import AppTitle from './AppTitle.js';
import { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const fakeExams = [
  {coursecode: '01TYMOV', score: 28, date: '2021-03-01'},
  {coursecode: '01SQJOV', score: 29, date: '2021-06-03'},
  {coursecode: '04GSPOV', score: 18, date: '2021-05-24'},
  {coursecode: '01TXYOV', score: 24, date: '2021-06-21'},
];

const fakeCourses = [
  {coursecode: '01TYMOV', name: 'Information systems security'},
  {coursecode: '02LSEOV', name: 'Computer architectures'},
  {coursecode: '01SQJOV', name: 'Data Science and Database Technology'},
  {coursecode: '01OTWOV', name: 'Computer network technologies and services'},
  {coursecode: '04GSPOV', name: 'Software Engineering'},
  {coursecode: '01TXYOV', name: 'Web Applications I'},
  {coursecode: '01NYHOV', name: 'System and device programming'},
  {coursecode: '01TYDOV', name: 'Cloud Computing'},
  {coursecode: '01SQPOV', name: 'Software Networking'},
];

function App() {
  const [exams, setExams] = useState([...fakeExams]);
  
  const examCodes = exams.map(exam => exam.coursecode) ;

  const deleteExam = (coursecode) => {
    setExams((exs) => exs.filter(ex => ex.coursecode !== coursecode))
  }

  const addExam = (exam) => {
    setExams(oldExams => [...oldExams, exam]);
  }

  const updateExam = (exam) => {
    setExams(oldExams => {
      return oldExams.map(ex => {
        if (ex.coursecode === exam.coursecode)
          return {coursecode: exam.coursecode, score: exam.score, date: exam.date};
        else
          return ex;
      });
    });
  }
  console.log(exams);
  return (<Router>
    <Container className="App">
      <Row>
        <AppTitle />
      </Row>

      <Switch>
        <Route path="/add" render={() => 
          <ExamForm courses={fakeCourses.filter(course => !examCodes.includes(course.coursecode))} addOrUpdateExam={addExam}></ExamForm>
        }/>

        {/* without useLocation():
        <Route path="/update" render={(routeProps) => 
          <ExamForm courses={fakeCourses} exam={routeProps.location.state.exam} examDate={routeProps.location.state.examDate} addOrUpdateExam={updateExam}></ExamForm>
        }/>
        */}
        {/* with useLocation() in ExamForm */}
        <Route path="/update" render={() => 
          <ExamForm courses={fakeCourses} addOrUpdateExam={updateExam}></ExamForm>
        }/>

        <Route path="/" render={() => 
          <Row>
            <ExamScores exams={exams} courses={fakeCourses} deleteExam={deleteExam}/>
          </Row>
        } />
        
      </Switch>
    </Container>
  </Router>);
}

export default App;