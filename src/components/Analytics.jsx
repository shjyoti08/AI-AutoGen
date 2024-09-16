// src/Analytics.js

import React from 'react';
import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Analytics.css'; // Include your custom CSS for the Analytics page

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  // Static data for the horizontal bar chart
  const data = {
    labels: [
      'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 
      'Chapter 6', 'Chapter 7', 'Chapter 8', 'Chapter 9', 'Chapter 10'
    ], // Chapter labels
    datasets: [
      {
        label: 'Student Progress (%)',
        data: [75, 50, 90, 60, 85, 45, 70, 80, 55, 65], // Sample progress data for 10 chapters
        backgroundColor: '#6f42c1', // Consistent color with theme
        borderColor: '#6f42c1',
        borderWidth: 1,
      },
    ],
  };

  // Options for the horizontal bar chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to adapt better to different screen sizes
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      title: {
        display: true,
        text: 'Student Progress by Chapter', // Title of the chart
      },
    },
    scales: {
      x: {
        type: 'category', // Set x-axis to category type for chapter names
        labels: [
          'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 
          'Chapter 6', 'Chapter 7', 'Chapter 8', 'Chapter 9', 'Chapter 10'
        ], // Ensure labels are set to match data
        ticks: {
          autoSkip: false, // Show all chapter labels
        },
        grid: {
          display: false, // Hide grid lines on x-axis
        },
      },
      y: {
        beginAtZero: true,
        max: 100, // Y-axis range from 0 to 100 for percentage
        ticks: {
          callback: (value) => `${value}%`, // Display percentage symbol on y-axis
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1, // Border width of the bars
        borderRadius: 4, // Rounded corners for bars
      },
    },
    datasets: {
      bar: {
        barPercentage: 0.5, // Adjust this value to change the width of the bars
        categoryPercentage: 0.8, // Adjust this value to change the space between bars
      },
    },
  };

  return (
    <div className="analytics-container">
      <Container className="d-flex justify-content-center align-items-center h-100">
        <div className="analytics-content text-center">
          <h2>Analytics Dashboard</h2>
          <div className="chart-wrapper">
            <Bar data={data} options={options} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Analytics;
