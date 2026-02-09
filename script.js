
        let skills = JSON.parse(localStorage.getItem('skills')) || [
            { name: 'JavaScript', level: 45 }
        ];
        
        let goals = JSON.parse(localStorage.getItem('goals')) || [
            { title: 'Learn JavaScript Fundamentals', description: 'Complete Codecademy course by Dec 31', progress: 45, completed: false }
        ];
        
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [
            { text: 'Complete JS Functions module', completed: false },
            { text: 'Practice coding challenges (30min)', completed: false }
        ];
        
        let studyTime = parseInt(localStorage.getItem('studyTime')) || 0;
        let streakData = JSON.parse(localStorage.getItem('streak')) || {};
        
        // DOM Elements
        const timerDisplay = document.getElementById('study-timer');
        const timerBtn = document.getElementById('timer-btn');
        const streakTracker = document.getElementById('streak-tracker');
        const currentStreakEl = document.getElementById('current-streak');
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            updateStats();
            renderSkills();
            renderGoals();
            renderTasks();
            setupStreakTracker();
            updateStreak();
            
            // Animate progress bars
            setTimeout(() => {
                document.querySelectorAll('.progress-bar').forEach(bar => {
                    const progress = bar.getAttribute('data-progress') || bar.style.width;
                    bar.style.width = progress.includes('%') ? progress : progress + '%';
                });
            }, 500);
        });
        
        // Timer Functions
        let timerInterval;
        let seconds = 0;
        
        function startTimer() {
            if (timerBtn.textContent === 'Start Studying') {
                timerBtn.textContent = 'Stop Timer';
                timerBtn.style.background = '#dc3545';
                
                timerInterval = setInterval(() => {
                    seconds++;
                    updateTimerDisplay();
                }, 1000);
                
                // Record study session
                const today = new Date().toDateString();
                if (!streakData[today]) {
                    streakData[today] = { studied: true };
                    localStorage.setItem('streak', JSON.stringify(streakData));
                    updateStreak();
                    renderStreakDays();
                }
            } else {
                stopTimer();
            }
        }
        
        function stopTimer() {
            clearInterval(timerInterval);
            timerBtn.textContent = 'Start Studying';
            timerBtn.style.background = 'var(--primary)';
            
            // Save study time
            studyTime += seconds;
            localStorage.setItem('studyTime', studyTime);
            updateStats();
            
            // Reset
            seconds = 0;
            updateTimerDisplay();
        }
        
        function updateTimerDisplay() {
            const hrs = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            timerDisplay.textContent = 
                `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        
        // Skill Management
        function addSkillModal() {
            document.getElementById('skill-modal').style.display = 'flex';
        }
        
        function closeModal() {
            document.getElementById('skill-modal').style.display = 'none';
        }
        
        function saveSkill() {
            const name = document.getElementById('skill-name').value;
            const level = document.getElementById('skill-level').value;
            
            if (name) {
                skills.push({ name, level: parseInt(level) });
                localStorage.setItem('skills', JSON.stringify(skills));
                renderSkills();
                updateStats();
                closeModal();
                
                // Clear form
                document.getElementById('skill-name').value = '';
                document.getElementById('skill-level').value = 0;
                document.getElementById('level-display').textContent = '0%';
            }
        }
        
        function renderSkills() {
            const container = document.getElementById('skills-container');
            container.innerHTML = skills.map(skill => `
                <div class="skill-card">
                    <h3>${skill.name}</h3>
                    <p>${skill.level}% Complete</p>
                    <div class="skill-progress">
                        <div class="progress-bar" data-progress="${skill.level}"></div>
                    </div>
                </div>
            `).join('');
        }
        
        // Goal Management
        function addNewGoal() {
            const input = document.getElementById('new-goal');
            if (input.value) {
                goals.push({
                    title: input.value,
                    description: '',
                    progress: 0,
                    completed: false
                });
                localStorage.setItem('goals', JSON.stringify(goals));
                renderGoals();
                input.value = '';
                updateStats();
            }
        }
        
        function markGoalComplete(button) {
            const goalItem = button.parentElement;
            const goalText = goalItem.querySelector('strong').textContent;
            
            goals = goals.map(goal => {
                if (goal.title === goalText) {
                    goal.completed = true;
                    goal.progress = 100;
                }
                return goal;
            });
            
            localStorage.setItem('goals', JSON.stringify(goals));
            renderGoals();
            updateStats();
        }
        
        function renderGoals() {
            const container = document.getElementById('goals-list');
            container.innerHTML = goals.filter(g => !g.completed).map(goal => `
                <div class="task-item">
                    <div>
                        <strong>${goal.title}</strong>
                        <p>${goal.description}</p>
                        <div class="skill-progress">
                            <div class="progress-bar" style="width: ${goal.progress}%"></div>
                        </div>
                    </div>
                    <button onclick="markGoalComplete(this)">✓</button>
                </div>
            `).join('');
        }
        
        // Task Management
        function addTask() {
            const input = document.getElementById('new-task');
            if (input.value) {
                tasks.push({
                    text: input.value,
                    completed: false
                });
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
                input.value = '';
                updateStats();
            }
        }
        
        function renderTasks() {
            const container = document.getElementById('today-tasks');
            container.innerHTML = tasks.map((task, index) => `
                <li class="task-item ${task.completed ? 'completed' : ''}">
                    <span>${task.text}</span>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} 
                           onclick="toggleTask(${index})">
                </li>
            `).join('');
        }
        
        function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            updateStats();
        }
        
        function updateCompletedTasks() {
            const completed = tasks.filter(t => t.completed).length;
            document.getElementById('completed-tasks').textContent = completed;
        }
        
        // Streak Tracker
        function setupStreakTracker() {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const today = new Date();
            
            streakTracker.innerHTML = '';
            
            for (let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const dateStr = date.toDateString();
                const dayName = days[date.getDay()];
                
                const studied = streakData[dateStr]?.studied || false;
                
                streakTracker.innerHTML += `
                    <div class="habit-day ${studied ? 'completed' : ''}" 
                         title="${date.toLocaleDateString()}">
                        ${dayName.charAt(0)}
                    </div>
                `;
            }
        }
        
        function updateStreak() {
            const dates = Object.keys(streakData).sort();
            let currentStreak = 0;
            let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday = yesterday.toDateString();
            
            // Check if studied today or yesterday
            const today = new Date().toDateString();
            if (streakData[today]?.studied) {
                currentStreak = 1;
                // Count backwards
                for (let i = 1; i < dates.length; i++) {
                    const date = new Date(today);
                    date.setDate(date.getDate() - i);
                    const dateStr = date.toDateString();
                    if (streakData[dateStr]?.studied) {
                        currentStreak++;
                    } else {
                        break;
                    }
                }
            }
            
            currentStreakEl.textContent = currentStreak;
            document.getElementById('streak-days').textContent = currentStreak;
        }
        
        // Stats Update
        function updateStats() {
            document.getElementById('total-hours').textContent = 
                Math.floor(studyTime / 3600);
            document.getElementById('skills-count').textContent = skills.length;
            updateCompletedTasks();
            updateStreak();
        }
        
        // Skill level slider
        document.getElementById('skill-level').addEventListener('input', function() {
            document.getElementById('level-display').textContent = this.value + '%';
        });