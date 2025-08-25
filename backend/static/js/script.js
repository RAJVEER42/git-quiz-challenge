// Application State
let currentScreen = 'quiz-home';
let selectedQuizCategory = '';
let quizResults = null;
let currentQuestionIndex = 0;
let selectedAnswer = null;
let showExplanation = false;
let answers = [];
let timeRemaining = 300; // 5 minutes
let timerInterval = null;

// Quiz Data
const quizData = {
    'getting-started': [
        {
            id: '1',
            question: 'Which command initializes a new Git repository?',
            options: ['git start', 'git init', 'git create', 'git new'],
            correctAnswer: 1,
            explanation: 'git init creates a new Git repository in the current directory, setting up the .git folder with all necessary files.',
            difficulty: 'easy'
        },
        {
            id: '2',
            question: 'What does "git clone" do?',
            options: [
                'Creates a backup of files',
                'Downloads and copies a repository from a remote source',
                'Duplicates the current branch',
                'Clones only the latest commit'
            ],
            correctAnswer: 1,
            explanation: 'git clone downloads a complete copy of a repository from a remote source (like GitHub) to your local machine.',
            difficulty: 'easy'
        },
        {
            id: '3',
            question: 'Which command sets your global Git username?',
            options: [
                'git config --global user.name "Your Name"',
                'git set username "Your Name"',
                'git user --name "Your Name"',
                'git config user.name "Your Name"'
            ],
            correctAnswer: 0,
            explanation: 'git config --global user.name sets your username globally across all repositories on your system.',
            difficulty: 'easy'
        },
        {
            id: '4',
            question: 'What is the purpose of the .git folder?',
            options: [
                'Stores project files',
                'Contains Git configuration and history',
                'Holds temporary files',
                'Stores user preferences'
            ],
            correctAnswer: 1,
            explanation: 'The .git folder contains all Git metadata, including commit history, branches, configuration, and tracking information.',
            difficulty: 'medium'
        },
        {
            id: '5',
            question: 'Which protocol is more secure for Git operations?',
            options: ['HTTP', 'HTTPS', 'SSH', 'FTP'],
            correctAnswer: 2,
            explanation: 'SSH is more secure as it uses key-based authentication and doesn\'t require entering credentials repeatedly.',
            difficulty: 'medium'
        }
    ],
    'commands': [
        {
            id: '1',
            question: 'Which command stages all changes for commit?',
            options: ['git add .', 'git stage all', 'git commit -a', 'git add *'],
            correctAnswer: 0,
            explanation: 'git add . stages all changes in the current directory and subdirectories for the next commit.',
            difficulty: 'easy'
        },
        {
            id: '2',
            question: 'What does "git status" show?',
            options: [
                'Current Git version',
                'Repository size',
                'Status of working directory and staging area',
                'List of all branches'
            ],
            correctAnswer: 2,
            explanation: 'git status shows which files are modified, staged, untracked, or deleted in your working directory.',
            difficulty: 'easy'
        },
        {
            id: '3',
            question: 'How do you commit with a message?',
            options: [
                'git commit "message"',
                'git commit -m "message"',
                'git commit --message "message"',
                'Both B and C are correct'
            ],
            correctAnswer: 3,
            explanation: 'Both -m and --message flags can be used to add a commit message directly from the command line.',
            difficulty: 'easy'
        },
        {
            id: '4',
            question: 'What does "git log --oneline" do?',
            options: [
                'Shows only the latest commit',
                'Displays commit history in condensed format',
                'Shows only one line of each file',
                'Creates a single-line commit'
            ],
            correctAnswer: 1,
            explanation: 'git log --oneline shows the commit history in a condensed format with one line per commit.',
            difficulty: 'medium'
        },
        {
            id: '5',
            question: 'Which command shows differences between working directory and last commit?',
            options: ['git diff', 'git diff HEAD', 'git show', 'git compare'],
            correctAnswer: 1,
            explanation: 'git diff HEAD compares your working directory with the last commit (HEAD).',
            difficulty: 'medium'
        },
        {
  id: '6',
  question: 'Which command is used to clone a remote repository?',
  options: [
    'git copy',
    'git clone',
    'git fork',
    'git download'
  ],
  correctAnswer: 1,
  explanation: 'git clone is used to create a local copy of a remote repository.',
  difficulty: 'easy'
},
{
  id: '7',
  question: 'What does "git branch" do?',
  options: [
    'Deletes a branch',
    'Lists all branches and highlights the current branch',
    'Merges two branches',
    'Pushes a branch to remote'
  ],
  correctAnswer: 1,
  explanation: 'git branch lists all branches and highlights the current branch with an asterisk (*).',
  difficulty: 'easy'
},
{
  id: '8',
  question: 'What is the effect of "git checkout -b new-feature"?',
  options: [
    'Deletes the new-feature branch',
    'Switches to the new-feature branch',
    'Creates and switches to the new-feature branch',
    'Creates a tag named new-feature'
  ],
  correctAnswer: 2,
  explanation: 'git checkout -b creates a new branch and immediately switches to it.',
  difficulty: 'medium'
},
{
  id: '9',
  question: 'What does "git merge" do?',
  options: [
    'Deletes a branch',
    'Creates a new branch',
    'Combines changes from one branch into another',
    'Shows differences between branches'
  ],
  correctAnswer: 2,
  explanation: 'git merge is used to combine the changes from one branch into another, typically into the current branch.',
  difficulty: 'medium'
},
{
  id: '10',
  question: 'Which command discards all local changes in your working directory?',
  options: [
    'git delete',
    'git reset --hard',
    'git undo',
    'git stash pop'
  ],
  correctAnswer: 1,
  explanation: 'git reset --hard resets the working directory and staging area to the last commit, discarding all local changes.',
  difficulty: 'hard'
}
    ],
    'branching': [
        {
            id: '1',
            question: 'How do you create and switch to a new branch?',
            options: [
                'git branch new-branch && git checkout new-branch',
                'git checkout -b new-branch',
                'git switch -c new-branch',
                'All of the above'
            ],
            correctAnswer: 3,
            explanation: 'All these commands create and switch to a new branch, with option B and C being more concise.',
            difficulty: 'medium'
        },
        {
            id: '2',
            question: 'What happens during a fast-forward merge?',
            options: [
                'Creates a merge commit',
                'Conflicts are automatically resolved',
                'Simply moves the branch pointer forward',
                'Requires manual intervention'
            ],
            correctAnswer: 2,
            explanation: 'In a fast-forward merge, Git simply moves the branch pointer forward when there are no divergent commits.',
            difficulty: 'hard'
        },
        {
            id: '3',
            question: 'How do you delete a local branch?',
            options: [
                'git branch -d branch-name',
                'git delete branch-name',
                'git remove branch-name',
                'git branch --delete branch-name'
            ],
            correctAnswer: 0,
            explanation: 'git branch -d safely deletes a merged branch, while -D force deletes any branch.',
            difficulty: 'medium'
        },
        {
            id: '4',
            question: 'What is a merge conflict?',
            options: [
                'When Git runs out of space',
                'When two branches modify the same lines of code',
                'When a branch is corrupted',
                'When pushing fails'
            ],
            correctAnswer: 1,
            explanation: 'A merge conflict occurs when Git cannot automatically merge changes because the same lines were modified in different branches.',
            difficulty: 'medium'
        },
        {
            id: '5',
            question: 'Which command shows all branches including remote ones?',
            options: [
                'git branch',
                'git branch -a',
                'git branch --all',
                'Both B and C'
            ],
            correctAnswer: 3,
            explanation: 'Both -a and --all flags show all branches including remote tracking branches.',
            difficulty: 'easy'
        }
    ],
    'troubleshooting': [
        {
            id: '1',
            question: 'How do you undo the last commit but keep changes?',
            options: [
                'git reset --hard HEAD~1',
                'git reset --soft HEAD~1',
                'git revert HEAD',
                'git undo'
            ],
            correctAnswer: 1,
            explanation: 'git reset --soft HEAD~1 undoes the last commit but keeps all changes staged.',
            difficulty: 'hard'
        },
        {
            id: '2',
            question: 'What does "detached HEAD" mean?',
            options: [
                'Git is corrupted',
                'You\'re not on any branch',
                'HEAD is missing',
                'Repository is broken'
            ],
            correctAnswer: 1,
            explanation: 'Detached HEAD means you\'re not on any branch, typically after checking out a specific commit.',
            difficulty: 'hard'
        },
        {
            id: '3',
            question: 'How do you discard changes to a specific file?',
            options: [
                'git discard filename',
                'git checkout -- filename',
                'git reset filename',
                'git remove filename'
            ],
            correctAnswer: 1,
            explanation: 'git checkout -- filename discards all uncommitted changes to that specific file.',
            difficulty: 'medium'
        },
        {
            id: '4',
            question: 'What should you do when "git push" is rejected?',
            options: [
                'Force push immediately',
                'Pull the latest changes first',
                'Delete the remote repository',
                'Create a new branch'
            ],
            correctAnswer: 1,
            explanation: 'When push is rejected, you should first pull the latest changes to resolve any conflicts.',
            difficulty: 'medium'
        },
        {
            id: '5',
            question: 'How do you remove untracked files?',
            options: [
                'git clean -f',
                'git remove untracked',
                'git delete *',
                'git clear'
            ],
            correctAnswer: 0,
            explanation: 'git clean -f removes untracked files from the working directory. Use -fd to also remove directories.',
            difficulty: 'hard'
        }
    ]
};

// Quiz Categories Configuration
const categories = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        description: 'Git basics, initialization, and configuration',
        color: 'var(--gradient-blue)',
        questions: 5,
        difficulty: 'Beginner',
        time: '5 min',
        topics: ['git init', 'git config', 'git clone', 'Basic workflow'],
        icon: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`
    },
    {
        id: 'commands',
        title: 'Essential Commands',
        description: 'Working with files, commits, and repositories',
        color: 'var(--gradient-green)',
        questions: 10,
        difficulty: 'Intermediate',
        time: '5 min',
        topics: ['git add', 'git commit', 'git push', 'git pull'],
        icon: `<circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>`
    },
    {
        id: 'branching',
        title: 'Branching & Merging',
        description: 'Advanced Git workflows and collaboration',
        color: 'var(--gradient-purple)',
        questions: 5,
        difficulty: 'Advanced',
        time: '5 min',
        topics: ['Branches', 'Merging', 'Conflicts', 'Workflows'],
        icon: `<polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>`
    },
    {
        id: 'troubleshooting',
        title: 'Error Handling',
        description: 'Common Git errors and how to fix them',
        color: 'var(--gradient-red)',
        questions: 5,
        difficulty: 'Expert',
        time: '5 min',
        topics: ['Error fixes', 'Reset', 'Revert', 'Troubleshooting'],
        icon: `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`
    }
];

// Utility Functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getDifficultyBadgeClass(difficulty) {
    switch (difficulty) {
        case 'Beginner': return 'badge-beginner';
        case 'Intermediate': return 'badge-intermediate';
        case 'Advanced': return 'badge-advanced';
        case 'Expert': return 'badge-expert';
        default: return 'badge-beginner';
    }
}

function getCategoryTitle(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.title : 'Quiz';
}

// Theme Management
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light';
        localStorage.setItem('theme', 'light');
    }
}


function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        document.getElementById('theme-icon').textContent = '☀️';
        document.getElementById('theme-text').textContent = 'Light';
    }
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(`${screenId}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    currentScreen = screenId;
}

// Quiz Home Screen Functions
function renderQuizCategories() {
    const container = document.getElementById('quiz-categories');
    container.innerHTML = '';

    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category-card';
        categoryElement.onclick = () => startQuiz(category.id);

        categoryElement.innerHTML = `
            <div class="category-header">
                <div class="category-icon" style="background: ${category.color};">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${category.icon}
                    </svg>
                </div>
                
                <div class="category-info">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                        <h3 class="category-title">${category.title}</h3>
                        <span class="badge ${getDifficultyBadgeClass(category.difficulty)}">${category.difficulty}</span>
                    </div>
                    <p class="category-description">${category.description}</p>
                </div>
            </div>
            
            <div class="category-meta">
                <div class="meta-item">
                    <div class="meta-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        <span>${category.questions}</span>
                    </div>
                    <div class="meta-label">Questions</div>
                </div>
                <div class="meta-item">
                    <div class="meta-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        <span>${category.time}</span>
                    </div>
                    <div class="meta-label">Duration</div>
                </div>
                <div class="meta-item">
                    <div class="meta-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9.5 2A7.5 7.5 0 0 0 4 10c0 6 3.5 9 6.5 9a7.5 7.5 0 0 0 0-15Z"/>
                            <path d="M15.5 2c3.5 0 6.5 4 6.5 9s-3 9-6.5 9a7.5 7.5 0 0 1 0-15Z"/>
                        </svg>
                        <span>Quiz</span>
                    </div>
                    <div class="meta-label">Format</div>
                </div>
            </div>
            
            <div class="category-topics">
                <h4 class="topics-title">Topics Covered:</h4>
                <div class="topics-list">
                    ${category.topics.map(topic => 
                        `<span class="topic-tag">${topic}</span>`
                    ).join('')}
                </div>
            </div>
            
            <button class="category-action" style="background: ${category.color};">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                Start ${category.title} Quiz
            </button>
        `;

        container.appendChild(categoryElement);
    });
}

// Quiz Functions
function startQuiz(categoryId) {
    selectedQuizCategory = categoryId;
    currentQuestionIndex = 0;
    selectedAnswer = null;
    showExplanation = false;
    answers = new Array(quizData[categoryId].length).fill(null);
    timeRemaining = 300; // 5 minutes
    
    showScreen('quiz');
    renderQuizScreen();
    startTimer();
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('quiz-timer');
    if (timerElement) {
        timerElement.textContent = formatTime(timeRemaining);
        if (timeRemaining < 60) {
            timerElement.classList.add('warning');
        }
    }
}

function renderQuizScreen() {
    const questions = quizData[selectedQuizCategory];
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    // Update header
    document.getElementById('quiz-header').innerHTML = `
        <div class="quiz-header-content">
            <div class="quiz-nav">
                <button class="back-button" onclick="goBackToHome()" title="Back to Quiz Home">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                </button>
                <div class="quiz-title-section">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9.5 2A7.5 7.5 0 0 0 4 10c0 6 3.5 9 6.5 9a7.5 7.5 0 0 0 0-15Z"/>
                        <path d="M15.5 2c3.5 0 6.5 4 6.5 9s-3 9-6.5 9a7.5 7.5 0 0 1 0-15Z"/>
                    </svg>
                    <h1 class="quiz-title">${getCategoryTitle(selectedQuizCategory)}</h1>
                </div>
            </div>
            
            <div class="quiz-timer" id="quiz-timer-container">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                </svg>
                <span id="quiz-timer">${formatTime(timeRemaining)}</span>
            </div>
        </div>
        
        <div class="progress-section">
            <div class="progress-info">
                <span>Question ${currentQuestionIndex + 1} of ${questions.length}</span>
                <span>${Math.round(progress)}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        </div>
    `;

    // Update content
    document.getElementById('quiz-content').innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <div class="question-number">
                    ${currentQuestionIndex + 1}
                </div>
                <h2 class="question-text">
                    ${currentQuestion.question}
                </h2>
            </div>

            <div class="options-list" id="quiz-options">
                ${currentQuestion.options.map((option, index) => `
                    <button class="quiz-option ${selectedAnswer === index ? 'selected' : ''}" 
                            onclick="selectAnswer(${index})" 
                            ${showExplanation ? 'disabled' : ''}
                            id="option-${index}">
                        <div class="option-content">
                            <div class="option-indicator ${selectedAnswer === index ? 'selected' : ''}" id="indicator-${index}">
                                ${selectedAnswer === index && !showExplanation ? '<div class="option-dot"></div>' : ''}
                            </div>
                            <span class="option-text">${option}</span>
                        </div>
                    </button>
                `).join('')}
            </div>

            <div id="explanation-section" class="explanation-section hidden">
                <div class="explanation-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    <h4 class="explanation-title">Explanation</h4>
                </div>
                <p class="explanation-text">${currentQuestion.explanation}</p>
            </div>
        </div>

        <div class="quiz-actions" id="quiz-actions">
            ${!showExplanation ? `
                <button class="btn btn-secondary" onclick="showAnswerExplanation()" ${selectedAnswer === null ? 'disabled' : ''}>
                    Show Answer
                </button>
                <button class="btn btn-primary" onclick="nextQuestion()" ${selectedAnswer === null ? 'disabled' : ''}>
                    ${currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"/>
                    </svg>
                </button>
            ` : `
                <div></div>
                <button class="btn btn-primary" onclick="nextQuestion()">
                    ${currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"/>
                    </svg>
                </button>
            `}
        </div>
    `;

    updateTimerDisplay();
}

function selectAnswer(answerIndex) {
    if (showExplanation) return;
    selectedAnswer = answerIndex;
    renderQuizScreen();
}

function showAnswerExplanation() {
    if (selectedAnswer === null) return;
    
    showExplanation = true;
    const questions = quizData[selectedQuizCategory];
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update option styling to show correct/incorrect
    for (let i = 0; i < currentQuestion.options.length; i++) {
        const option = document.getElementById(`option-${i}`);
        const indicator = document.getElementById(`indicator-${i}`);
        
        if (i === currentQuestion.correctAnswer) {
            option.classList.add('correct');
            indicator.classList.add('correct');
            indicator.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                </svg>
            `;
        } else if (i === selectedAnswer) {
            option.classList.add('incorrect');
            indicator.classList.add('incorrect');
            indicator.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            `;
        }
        
        option.disabled = true;
    }
    
    // Show explanation
    document.getElementById('explanation-section').classList.remove('hidden');
    
    // Update action buttons
    document.getElementById('quiz-actions').innerHTML = `
        <div></div>
        <button class="btn btn-primary" onclick="nextQuestion()">
            ${currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9,18 15,12 9,6"/>
            </svg>
        </button>
    `;
}

function nextQuestion() {
    if (selectedAnswer !== null) {
        answers[currentQuestionIndex] = selectedAnswer;
        
        if (currentQuestionIndex < quizData[selectedQuizCategory].length - 1) {
            currentQuestionIndex++;
            selectedAnswer = null;
            showExplanation = false;
            renderQuizScreen();
        } else {
            finishQuiz();
        }
    }
}

function finishQuiz() {
    clearInterval(timerInterval);
    
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
        finalAnswers[currentQuestionIndex] = selectedAnswer;
    }

    const questions = quizData[selectedQuizCategory];
    const correctAnswers = finalAnswers.filter((answer, index) => 
        answer === questions[index].correctAnswer
    ).length;

    quizResults = {
        category: selectedQuizCategory,
        totalQuestions: questions.length,
        correctAnswers,
        incorrectAnswers: questions.length - correctAnswers,
        score: Math.round((correctAnswers / questions.length) * 100),
        timeSpent: (300 - timeRemaining),
        answers: finalAnswers,
        questions
    };

    showScreen('quiz-results');
    renderResultsScreen();
}

// Results Screen Functions
function renderResultsScreen() {
    const { category, totalQuestions, correctAnswers, incorrectAnswers, score, timeSpent } = quizResults;

    function getScoreColor(score) {
        if (score >= 90) return 'var(--retweet-green)';
        if (score >= 70) return 'var(--bookmark-yellow)';
        if (score >= 50) return 'var(--primary)';
        return 'var(--destructive)';
    }

    function getScoreGrade(score) {
        if (score >= 90) return 'A+';
        if (score >= 80) return 'A';
        if (score >= 70) return 'B+';
        if (score >= 60) return 'B';
        if (score >= 50) return 'C+';
        return 'C';
    }

    function getPerformanceMessage(score) {
        if (score >= 90) return { message: 'Outstanding! 🎉', subtitle: 'You\'re a Git master!' };
        if (score >= 80) return { message: 'Excellent work! 🌟', subtitle: 'You know your Git commands well!' };
        if (score >= 70) return { message: 'Good job! 👍', subtitle: 'Solid understanding of Git basics!' };
        if (score >= 60) return { message: 'Not bad! 📚', subtitle: 'Keep practicing to improve!' };
        if (score >= 50) return { message: 'Keep going! 💪', subtitle: 'Review the basics and try again!' };
        return { message: 'Don\'t give up! 🚀', subtitle: 'Practice makes perfect!' };
    }

    const performance = getPerformanceMessage(score);

    document.getElementById('results-content').innerHTML = `
        <div class="results-header">
            <div class="results-header-content">
                <div class="results-nav">
                    <button class="back-button" onclick="goBackToHome()" title="Back to Quiz Home">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                    </button>
                    <div class="quiz-title-section">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                            <path d="M4 22h16l-8-9-8 9Z"/>
                        </svg>
                        <h1 class="results-title">Quiz Results</h1>
                    </div>
                </div>
            </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2rem;">
            <!-- Score Card -->
            <div class="score-card">
                <div class="score-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                        <path d="M4 22h16l-8-9-8 9Z"/>
                    </svg>
                </div>
                
                <h2 class="score-message">
                    ${performance.message}
                </h2>
                <p class="score-subtitle">${performance.subtitle}</p>
                
                <div class="score-display">
                    <div class="score-stat">
                        <div class="score-value" style="color: ${getScoreColor(score)};">${score}%</div>
                        <div class="score-label">Score</div>
                    </div>
                    <div class="score-stat">
                        <div class="score-value text-warning">${getScoreGrade(score)}</div>
                        <div class="score-label">Grade</div>
                    </div>
                </div>
                
                <div class="score-info">
                    <span class="score-category">${getCategoryTitle(category)}</span> • ${totalQuestions} Questions
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-content">
                        <div class="stat-icon bg-correct">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20,6 9,17 4,12"/>
                            </svg>
                        </div>
                        <div class="stat-data">
                            <div class="stat-number">${correctAnswers}</div>
                            <div class="stat-name">Correct</div>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-content">
                        <div class="stat-icon bg-incorrect">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </div>
                        <div class="stat-data">
                            <div class="stat-number">${incorrectAnswers}</div>
                            <div class="stat-name">Incorrect</div>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-content">
                        <div class="stat-icon bg-primary">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                        </div>
                        <div class="stat-data">
                            <div class="stat-number">${formatTime(timeSpent)}</div>
                            <div class="stat-name">Time Spent</div>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-content">
                        <div class="stat-icon bg-warning">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                        </div>
                        <div class="stat-data">
                            <div class="stat-number">${Math.round((correctAnswers / totalQuestions) * 100)}%</div>
                            <div class="stat-name">Accuracy</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Progress Breakdown -->
            <div class="progress-breakdown">
                <div class="breakdown-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
                        <polyline points="17,6 23,6 23,12"/>
                    </svg>
                    <h3 class="breakdown-title">Progress Breakdown</h3>
                </div>
                
                <div class="breakdown-items">
                    <div class="breakdown-item">
                        <div class="breakdown-info">
                            <span class="breakdown-label">Correct Answers</span>
                            <span class="breakdown-value text-correct">${correctAnswers}/${totalQuestions}</span>
                        </div>
                        <div class="progress-bar-lg">
                            <div class="progress-fill-lg" style="width: ${(correctAnswers / totalQuestions) * 100}%; background: var(--retweet-green);"></div>
                        </div>
                    </div>
                    
                    <div class="breakdown-item">
                        <div class="breakdown-info">
                            <span class="breakdown-label">Time Efficiency</span>
                            <span class="breakdown-value text-primary-color">
                                ${Math.round((1 - timeSpent / 300) * 100)}%
                            </span>
                        </div>
                        <div class="progress-bar-lg">
                            <div class="progress-fill-lg" style="width: ${Math.max(0, (1 - timeSpent / 300) * 100)}%;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Question Review -->
            <div class="question-review">
                <div class="review-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9.5 2A7.5 7.5 0 0 0 4 10c0 6 3.5 9 6.5 9a7.5 7.5 0 0 0 0-15Z"/>
                        <path d="M15.5 2c3.5 0 6.5 4 6.5 9s-3 9-6.5 9a7.5 7.5 0 0 1 0-15Z"/>
                    </svg>
                    <h3 class="review-title">Question Review</h3>
                </div>
                
                <div class="review-items">
                    ${quizResults.questions.map((question, index) => {
                        const userAnswer = quizResults.answers[index];
                        const isCorrect = userAnswer === question.correctAnswer;
                        
                        return `
                            <div class="review-item">
                                <div class="review-content">
                                    <div class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
                                        ${isCorrect ? `
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <polyline points="20,6 9,17 4,12"/>
                                            </svg>
                                        ` : `
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <line x1="18" y1="6" x2="6" y2="18"/>
                                                <line x1="6" y1="6" x2="18" y2="18"/>
                                            </svg>
                                        `}
                                    </div>
                                    <span class="review-question">Question ${index + 1}</span>
                                </div>
                                
                                <span class="badge ${getDifficultyBadgeClass(question.difficulty)}">
                                    ${question.difficulty}
                                </span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="actions-section">
                <button class="btn btn-primary" onclick="retryQuiz()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="1,4 1,10 7,10"/>
                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                    </svg>
                    Try Again
                </button>
                
                <div class="actions-grid">
                    <button class="btn btn-secondary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                            <polyline points="16,6 12,2 8,6"/>
                            <line x1="12" y1="2" x2="12" y2="15"/>
                        </svg>
                        Share Results
                    </button>
                    <button class="btn btn-secondary" onclick="saveResultsAsPNG()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7,10 12,15 17,10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Save Progress
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Navigation Functions
function goBackToHome() {
    clearInterval(timerInterval);
    currentScreen = 'quiz-home';
    selectedQuizCategory = '';
    quizResults = null;
    currentQuestionIndex = 0;
    selectedAnswer = null;
    showExplanation = false;
    answers = [];
    showScreen('quiz-home');
}

function retryQuiz() {
    startQuiz(selectedQuizCategory);
}

// Initialize the application
function init() {
    initializeTheme();
    renderQuizCategories();
    showScreen('quiz-home');
    
    // Add theme toggle event listener
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Back to Top Button Functionality
document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.createElement("button");
  backToTopBtn.id = "backToTopBtn";
  backToTopBtn.title = "Go to top";
  backToTopBtn.textContent = "↑";
  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
function saveResultsAsPNG() {
    const resultsContent = document.getElementById('results-content');
    if (!resultsContent) return;

    html2canvas(resultsContent, { backgroundColor: null }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'quiz-results.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}