// src/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import StudentDash from '../components/StudentDash';
import SolveQuestion from '../components/SolveQuestion';
import ResultPage from '../components/ResultPage';
import SignupPage from '../components/SignupPage';
import PrivateRoute from '../components/PrivateRoute'; // Custom PrivateRoute component
import Layout from '../components/Layout';
import QuestionListModal from '../components/QuestionListModal';
import Analytics from '../components/Analytics';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} /> {/* Default route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      <Route
        path="/student-dash"
        element={
          <PrivateRoute>
            <Layout>
              <StudentDash />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/solvequestion"
        element={
          <PrivateRoute>
            <Layout>
              <SolveQuestion />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/questionlistmodal"
        element={
          <PrivateRoute>
            <Layout>
              <QuestionListModal />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/resultpage"
        element={
          <PrivateRoute>
            <Layout>
              <ResultPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <Layout>
              <Analytics />
            </Layout>
          </PrivateRoute>
        }
      />
      
      {/* Fallback route for undefined paths */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
