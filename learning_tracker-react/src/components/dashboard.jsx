// src/components/Dashboard.jsx - COPY THIS EXACTLY
import React from 'react';

function Dashboard() {
  return (
    <div className="container">
      <header>
        <div className="header-content">
          <h1>📚 My Learning Tracker</h1>
          <p>Track your progress, stay motivated, achieve your goals</p>
          
          <div className="stats">
            <div className="stat-card">
              <h3>0</h3>
              <p>Total Hours</p>
            </div>
            <div className="stat-card">
              <h3>0</h3>
              <p>Skills</p>
            </div>
            <div className="stat-card">
              <h3>0</h3>
              <p>Day Streak</p>
            </div>
            <div className="stat-card">
              <h3>0</h3>
              <p>Tasks Done</p>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard">
        <div className="main-content">
          {/* Goals Section */}
          <div className="card">
            <h2>🎯 Active Learning Goals</h2>
            <div className="task-item">
              <div>
                <strong>Learn JavaScript Fundamentals</strong>
                <p>Complete Codecademy course by Dec 31</p>
                <div className="skill-progress">
                  <div className="progress-bar" style={{ width: '45%' }}></div>
                </div>
              </div>
              <button>✓</button>
            </div>
          </div>

          {/* Skills Section */}
          <div className="card">
            <h2>📊 Skills Progress</h2>
            <div className="skills-container">
              <div className="skill-card">
                <h3>JavaScript</h3>
                <p>45% Complete</p>
                <div className="skill-progress">
                  <div className="progress-bar" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
            <button style={{ marginTop: '1rem' }}>+ Add Skill</button>
          </div>
        </div>

        <div className="sidebar">
          {/* Today's Tasks */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2>✅ Today's Tasks</h2>
            <ul className="task-list">
              <li className="task-item">
                <span>Complete JS Functions module</span>
                <input type="checkbox" />
              </li>
            </ul>
            <div className="form-group">
              <input type="text" placeholder="Add task for today..." />
              <button>Add Task</button>
            </div>
          </div>

          {/* Streak Tracker */}
          <div className="card">
            <h2>🔥 Learning Streak</h2>
            <div className="habit-grid">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="habit-day">
                  {day}
                </div>
              ))}
            </div>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
              Current streak: <strong>0</strong> days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;