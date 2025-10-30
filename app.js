// Application State
const AppState = {
  users: [
    {
      username: 'eco_warrior123',
      email: 'john.doe@gmail.com',
      password: 'Password123!',
      totalFootprint: 15.2,
      reductionGoal: 10,
      hasOnboarded: true
    },
    {
      username: 'green_jane#1',
      email: 'jane.smith@gmail.com',
      password: 'SecurePass1@',
      totalFootprint: 12.8,
      reductionGoal: 15,
      hasOnboarded: true
    }
  ],
  currentUser: null,
  carbonCategories: [
    { name: 'Travel', percentage: 40, monthlyCo2: 6.08, color: '#FF6B6B' },
    { name: 'Food', percentage: 30, monthlyCo2: 4.56, color: '#4ECDC4' },
    { name: 'Energy', percentage: 20, monthlyCo2: 3.04, color: '#45B7D1' },
    { name: 'Shopping', percentage: 10, monthlyCo2: 1.52, color: '#96CEB4' }
  ],
  transportModes: [
    { mode: 'Walking', co2PerKm: 0, icon: '🚶' },
    { mode: 'Cycling', co2PerKm: 0, icon: '🚴' },
    { mode: 'Public Transport', co2PerKm: 0.05, icon: '🚌' },
    { mode: 'Car', co2PerKm: 0.2, icon: '🚗' },
    { mode: 'Flight', co2PerKm: 0.25, icon: '✈️' }
  ],
  weeklyChallenges: [
    {
      name: 'Meat-Free Monday',
      description: 'Avoid meat products for the entire Monday',
      reward: 'Green Eater Badge',
      co2Saved: 2.1,
      active: false
    },
    {
      name: 'No-Car Weekend',
      description: 'Use only walking, cycling, or public transport',
      reward: 'Clean Commuter Badge',
      co2Saved: 5.3,
      active: false
    },
    {
      name: 'Energy Saver Week',
      description: 'Reduce energy consumption by 20%',
      reward: 'Power Saver Badge',
      co2Saved: 3.8,
      active: true
    }
  ],
  achievements: [
    { name: 'First Steps', description: 'Complete your first day of tracking', icon: '🌱', unlocked: true },
    { name: '100km Cyclist', description: 'Cycle 100km in total', icon: '🚴‍♀️', unlocked: false },
    { name: 'Public Transport Champion', description: 'Use public transport for 30 consecutive days', icon: '🚊', unlocked: true },
    { name: 'Carbon Cutter', description: 'Reduce monthly footprint by 15%', icon: '✂️', unlocked: false },
    { name: 'Green Warrior', description: 'Complete 10 challenges', icon: '⚔️', unlocked: false },
    { name: 'Eco Leader', description: 'Reach top 10 in leaderboard', icon: '👑', unlocked: true }
  ],
  recommendations: [
    {
      category: 'Travel',
      currentHabit: 'Daily 15km car commute',
      suggestion: 'Switch to Metro Line 3 - reduce footprint by 85%',
      potentialSaving: 4.2
    },
    {
      category: 'Food',
      currentHabit: 'Regular beef consumption',
      suggestion: 'Replace beef with chicken twice a week',
      potentialSaving: 1.8
    },
    {
      category: 'Energy',
      currentHabit: 'High electricity usage',
      suggestion: 'Install smart thermostat - save 20% energy',
      potentialSaving: 0.9
    }
  ],
  communityStats: {
    totalUsersCity: 500,
    collectiveCo2Saved: 1250,
    equivalentHomesPowered: 10,
    treesPlantedEquivalent: 85
  },
  recentActivities: [
    { icon: '🚗', title: 'Car commute - 15km', time: '2 hours ago', co2: 3.0 },
    { icon: '🍽️', title: 'Grocery shopping', time: '5 hours ago', co2: 2.1 },
    { icon: '⚡', title: 'Energy usage', time: 'Yesterday', co2: 1.5 },
    { icon: '🚶', title: 'Walking - 3km', time: 'Yesterday', co2: 0 }
  ],
  autoTrackedToday: [
    { mode: 'Walking', distance: '2.5 km', co2: 0, icon: '🚶' },
    { mode: 'Public Transport', distance: '12 km', co2: 0.6, icon: '🚌' },
    { mode: 'Car', distance: '8 km', co2: 1.6, icon: '🚗' }
  ],
  leaderboardData: [
    { rank: 1, username: 'eco_warrior123', reduction: '18%' },
    { rank: 2, username: 'green_jane#1', reduction: '15%' },
    { rank: 3, username: 'carbon_zero', reduction: '14%' },
    { rank: 4, username: 'planet_hero', reduction: '12%' },
    { rank: 5, username: 'sustainable_sam', reduction: '11%' }
  ]
};

// Validation Functions
const Validators = {
  username: (username) => {
    if (!username || username.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    // Must contain at least one number OR special character
    const hasNumberOrSpecial = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username);
    if (!hasNumberOrSpecial) {
      return 'Username must contain at least one number or special character';
    }
    return null;
  },
  
  email: (email) => {
    if (!email) {
      return 'Email is required';
    }
    // Must end with @gmail.com
    if (!email.endsWith('@gmail.com')) {
      return 'Email must be a Gmail address (@gmail.com)';
    }
    return null;
  },
  
  password: (password) => {
    if (!password || password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    // Must contain uppercase
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    // Must contain number 0-9
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number (0-9)';
    }
    // Must contain special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return null;
  },
  
  confirmPassword: (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  },
  
  isUsernameTaken: (username) => {
    return AppState.users.some(user => user.username === username);
  },
  
  isEmailTaken: (email) => {
    return AppState.users.some(user => user.email === email);
  }
};

// Chart instances
let categoryChart = null;
let weeklyChart = null;

// Application Core
const app = {
  init() {
    this.setupEventListeners();
    this.showScreen('login-screen');
  },
  
  setupEventListeners() {
    // Auth forms
    document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
    document.getElementById('signup-form').addEventListener('submit', (e) => this.handleSignup(e));
    document.getElementById('show-signup').addEventListener('click', (e) => {
      e.preventDefault();
      this.showScreen('signup-screen');
    });
    document.getElementById('show-login').addEventListener('click', (e) => {
      e.preventDefault();
      this.showScreen('login-screen');
    });
    
    // Real-time validation
    document.getElementById('signup-username').addEventListener('input', (e) => this.validateField('username', e.target.value));
    document.getElementById('signup-email').addEventListener('input', (e) => this.validateField('email', e.target.value));
    document.getElementById('signup-password').addEventListener('input', (e) => this.validateField('password', e.target.value));
    document.getElementById('signup-confirm-password').addEventListener('input', (e) => {
      const password = document.getElementById('signup-password').value;
      this.validateField('confirm-password', e.target.value, password);
    });
    
    // Onboarding
    document.getElementById('start-journey').addEventListener('click', () => this.startApp());
    
    // Bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => this.switchView(e.currentTarget.dataset.view));
    });
    
    // Period selector
    document.querySelectorAll('.period-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.changePeriod(e.target));
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => this.logout());
  },
  
  validateField(field, value, additionalValue = null) {
    let error = null;
    let errorElement = null;
    
    switch(field) {
      case 'username':
        error = Validators.username(value);
        errorElement = document.getElementById('username-error');
        break;
      case 'email':
        error = Validators.email(value);
        errorElement = document.getElementById('email-error');
        break;
      case 'password':
        error = Validators.password(value);
        errorElement = document.getElementById('password-error');
        break;
      case 'confirm-password':
        error = Validators.confirmPassword(additionalValue, value);
        errorElement = document.getElementById('confirm-password-error');
        break;
    }
    
    if (errorElement) {
      errorElement.textContent = error || '';
    }
    
    return error === null;
  },
  
  handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');
    
    const user = AppState.users.find(u => 
      (u.username === username || u.email === username) && u.password === password
    );
    
    if (user) {
      AppState.currentUser = user;
      if (user.hasOnboarded) {
        this.startApp();
      } else {
        this.showScreen('onboarding-screen');
      }
    } else {
      errorElement.textContent = 'Invalid username/email or password';
    }
  },
  
  handleSignup(e) {
    e.preventDefault();
    
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const errorElement = document.getElementById('signup-error');
    
    // Validate all fields
    const isUsernameValid = this.validateField('username', username);
    const isEmailValid = this.validateField('email', email);
    const isPasswordValid = this.validateField('password', password);
    const isConfirmPasswordValid = this.validateField('confirm-password', confirmPassword, password);
    
    if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      errorElement.textContent = 'Please fix the errors above';
      return;
    }
    
    // Check if username is taken
    if (Validators.isUsernameTaken(username)) {
      document.getElementById('username-error').textContent = 'Username is already taken';
      errorElement.textContent = 'Username is already taken';
      return;
    }
    
    // Check if email is taken
    if (Validators.isEmailTaken(email)) {
      document.getElementById('email-error').textContent = 'Email is already registered';
      errorElement.textContent = 'Email is already registered';
      return;
    }
    
    // Create new user
    const newUser = {
      username,
      email,
      password,
      totalFootprint: 15.2,
      reductionGoal: 10,
      hasOnboarded: false
    };
    
    AppState.users.push(newUser);
    AppState.currentUser = newUser;
    
    // Clear form
    document.getElementById('signup-form').reset();
    
    // Show onboarding
    this.showScreen('onboarding-screen');
  },
  
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
  },
  
  startApp() {
    if (AppState.currentUser) {
      AppState.currentUser.hasOnboarded = true;
    }
    this.showScreen('app-container');
    this.loadDashboard();
    this.initCharts();
  },
  
  switchView(viewName) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Update views
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });
    document.getElementById(`${viewName}-view`).classList.add('active');
    
    // Load specific view data
    switch(viewName) {
      case 'dashboard':
        this.loadDashboard();
        break;
      case 'track':
        this.loadTrackView();
        break;
      case 'insights':
        this.loadInsightsView();
        break;
      case 'challenges':
        this.loadChallengesView();
        break;
      case 'profile':
        this.loadProfileView();
        break;
    }
  },
  
  // Override switchView for automated tracking
  switchToAutomatedTracking() {
    this.showAutomatedTracking();
  },
  
  loadDashboard() {
    // Update total footprint
    document.getElementById('total-footprint').textContent = AppState.currentUser.totalFootprint.toFixed(1);
    document.getElementById('goal-target').textContent = AppState.currentUser.reductionGoal;
    
    // Update goal progress
    const currentReduction = 12; // Example
    const goalProgress = (currentReduction / AppState.currentUser.reductionGoal) * 100;
    document.getElementById('goal-progress').style.width = Math.min(goalProgress, 100) + '%';
    document.getElementById('goal-percentage').textContent = currentReduction + '%';
    
    // Load category list
    this.loadCategoryList();
    
    // Load recent activities
    this.loadRecentActivities();
    
    // Update charts
    if (categoryChart) {
      categoryChart.update();
    }
  },
  
  loadCategoryList() {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = AppState.carbonCategories.map(cat => `
      <div class="category-item">
        <div class="category-info">
          <div class="category-color" style="background-color: ${cat.color}"></div>
          <span class="category-name">${cat.name}</span>
        </div>
        <div class="category-value">
          <span class="category-co2">${cat.monthlyCo2.toFixed(2)} kg</span>
          <span class="category-percentage">${cat.percentage}%</span>
        </div>
      </div>
    `).join('');
  },
  
  loadRecentActivities() {
    const activitiesList = document.getElementById('recent-activities');
    activitiesList.innerHTML = AppState.recentActivities.map(activity => `
      <div class="activity-item">
        <div class="activity-icon">${activity.icon}</div>
        <div class="activity-details">
          <div class="activity-title">${activity.title}</div>
          <div class="activity-meta">${activity.time}</div>
        </div>
        <div class="activity-co2">${activity.co2.toFixed(1)} kg</div>
      </div>
    `).join('');
  },
  
  loadTrackView() {
    // Load auto-tracked activities
    const autoTrackedList = document.getElementById('auto-tracked-list');
    autoTrackedList.innerHTML = AppState.autoTrackedToday.map(activity => `
      <div class="activity-item">
        <div class="activity-icon">${activity.icon}</div>
        <div class="activity-details">
          <div class="activity-title">${activity.mode}</div>
          <div class="activity-meta">${activity.distance}</div>
        </div>
        <div class="activity-co2">${activity.co2.toFixed(1)} kg</div>
      </div>
    `).join('');
    
    // Update weekly chart
    this.updateWeeklyChart();
  },
  
  loadInsightsView() {
    // Load hotspots
    const hotspotList = document.getElementById('hotspot-list');
    const topCategories = [...AppState.carbonCategories].sort((a, b) => b.percentage - a.percentage).slice(0, 2);
    hotspotList.innerHTML = topCategories.map(cat => `
      <div class="hotspot-item">
        <div class="hotspot-category">${cat.name}</div>
        <div class="hotspot-description">Accounts for ${cat.percentage}% of your total emissions (${cat.monthlyCo2.toFixed(2)} kg CO₂)</div>
      </div>
    `).join('');
    
    // Load recommendations
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = AppState.recommendations.map(rec => `
      <div class="recommendation-item">
        <div class="recommendation-header">
          <span class="recommendation-category">${rec.category}</span>
          <span class="recommendation-saving">-${rec.potentialSaving.toFixed(1)} kg CO₂</span>
        </div>
        <div class="recommendation-current">Current: ${rec.currentHabit}</div>
        <div class="recommendation-suggestion">${rec.suggestion}</div>
      </div>
    `).join('');
  },
  
  loadChallengesView() {
    // Load challenges
    const challengesList = document.getElementById('challenges-list');
    challengesList.innerHTML = AppState.weeklyChallenges.map(challenge => `
      <div class="challenge-item">
        <div class="challenge-header">
          <div class="challenge-name">${challenge.name}</div>
          <div class="challenge-reward">${challenge.reward}</div>
        </div>
        <div class="challenge-description">${challenge.description}</div>
        <div class="challenge-footer">
          <div class="challenge-savings">Save ${challenge.co2Saved} kg CO₂</div>
          <button class="challenge-btn" onclick="app.joinChallenge('${challenge.name}')">
            ${challenge.active ? 'Active' : 'Join'}
          </button>
        </div>
      </div>
    `).join('');
    
    // Load achievements
    const achievementsGrid = document.getElementById('achievements-grid');
    achievementsGrid.innerHTML = AppState.achievements.map(achievement => `
      <div class="achievement-item ${achievement.unlocked ? 'unlocked' : ''}">
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-description">${achievement.description}</div>
      </div>
    `).join('');
    
    // Load leaderboard
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = AppState.leaderboardData.map(item => `
      <div class="leaderboard-item">
        <div class="leaderboard-rank">${item.rank}</div>
        <div class="leaderboard-user">${item.username}</div>
        <div class="leaderboard-value">${item.reduction}</div>
      </div>
    `).join('');
    
    // Load community impact
    const impactStats = document.getElementById('impact-stats');
    impactStats.innerHTML = `
      <div class="impact-stat">
        <div class="impact-icon">👥</div>
        <div class="impact-value">${AppState.communityStats.totalUsersCity}</div>
        <div class="impact-label">Users in your city</div>
      </div>
      <div class="impact-stat">
        <div class="impact-icon">🌍</div>
        <div class="impact-value">${AppState.communityStats.collectiveCo2Saved}</div>
        <div class="impact-label">kg CO₂ saved</div>
      </div>
      <div class="impact-stat">
        <div class="impact-icon">⚡</div>
        <div class="impact-value">${AppState.communityStats.equivalentHomesPowered}</div>
        <div class="impact-label">Homes powered</div>
      </div>
      <div class="impact-stat">
        <div class="impact-icon">🌳</div>
        <div class="impact-value">${AppState.communityStats.treesPlantedEquivalent}</div>
        <div class="impact-label">Trees equivalent</div>
      </div>
    `;
  },
  
  loadProfileView() {
    if (AppState.currentUser) {
      document.getElementById('profile-username').textContent = AppState.currentUser.username;
      document.getElementById('profile-email').textContent = AppState.currentUser.email;
      document.getElementById('profile-footprint').textContent = AppState.currentUser.totalFootprint.toFixed(1);
      document.getElementById('profile-reduction').textContent = '12%';
      const unlockedCount = AppState.achievements.filter(a => a.unlocked).length;
      document.getElementById('profile-badges').textContent = unlockedCount;
    }
  },
  
  initCharts() {
    // Category Doughnut Chart
    const categoryCtx = document.getElementById('category-chart');
    if (categoryCtx) {
      categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
          labels: AppState.carbonCategories.map(c => c.name),
          datasets: [{
            data: AppState.carbonCategories.map(c => c.percentage),
            backgroundColor: AppState.carbonCategories.map(c => c.color),
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          cutout: '70%'
        }
      });
    }
    
    // Weekly Chart
    this.updateWeeklyChart();
  },
  
  updateWeeklyChart() {
    const weeklyCtx = document.getElementById('weekly-chart');
    if (weeklyCtx) {
      if (weeklyChart) {
        weeklyChart.destroy();
      }
      
      weeklyChart = new Chart(weeklyCtx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'CO₂ Emissions (kg)',
            data: [2.1, 2.5, 1.8, 2.3, 2.0, 1.5, 1.2],
            backgroundColor: '#33808D',
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return value + ' kg';
                }
              }
            }
          }
        }
      });
    }
  },
  
  changePeriod(button) {
    document.querySelectorAll('.period-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  },
  
  showTrackingModal(type) {
    const modal = document.getElementById('tracking-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    let content = '';
    
    switch(type) {
      case 'mobility':
        modalTitle.textContent = 'Log Trip';
        content = `
          <div class="form-group">
            <label class="form-label">Transport Mode</label>
            <select class="form-control">
              ${AppState.transportModes.map(m => `<option value="${m.mode}">${m.icon} ${m.mode}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Distance (km)</label>
            <input type="number" class="form-control" placeholder="Enter distance" value="10">
          </div>
          <button class="btn btn--primary btn--full-width" onclick="app.logActivity('mobility')">Log Trip</button>
        `;
        break;
      case 'food':
        modalTitle.textContent = 'Scan Receipt';
        content = `
          <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 64px; margin-bottom: 20px;">📷</div>
            <p style="color: var(--color-text-secondary); margin-bottom: 20px;">Position your receipt in the camera frame</p>
            <button class="btn btn--primary btn--full-width" onclick="app.logActivity('food')">Simulate Scan</button>
          </div>
        `;
        break;
      case 'energy':
        modalTitle.textContent = 'Log Energy Usage';
        content = `
          <div class="form-group">
            <label class="form-label">Electricity (kWh)</label>
            <input type="number" class="form-control" placeholder="Enter usage" value="150">
          </div>
          <div class="form-group">
            <label class="form-label">Gas (m³)</label>
            <input type="number" class="form-control" placeholder="Enter usage" value="50">
          </div>
          <button class="btn btn--primary btn--full-width" onclick="app.logActivity('energy')">Log Energy</button>
        `;
        break;
      case 'shopping':
        modalTitle.textContent = 'Log Purchase';
        content = `
          <div class="form-group">
            <label class="form-label">Item Category</label>
            <select class="form-control">
              <option>Clothing</option>
              <option>Electronics</option>
              <option>Home Goods</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Estimated Cost ($)</label>
            <input type="number" class="form-control" placeholder="Enter amount" value="50">
          </div>
          <button class="btn btn--primary btn--full-width" onclick="app.logActivity('shopping')">Log Purchase</button>
        `;
        break;
    }
    
    modalBody.innerHTML = content;
    modal.classList.add('show');
  },
  
  closeModal() {
    document.getElementById('tracking-modal').classList.remove('show');
    document.getElementById('simulation-result').classList.remove('show');
  },
  
  logActivity(type) {
    // Simulate activity logging
    alert(`✅ ${type.charAt(0).toUpperCase() + type.slice(1)} activity logged successfully!`);
    this.closeModal();
    this.loadDashboard();
  },
  
  runSimulation(type) {
    const resultDiv = document.getElementById('simulation-result');
    let title = '';
    let co2Reduction = 0;
    let costImpact = '';
    
    switch(type) {
      case 'ev':
        title = 'Switch to Electric Vehicle';
        co2Reduction = 4.5;
        costImpact = 'Save $800/year on fuel';
        break;
      case 'solar':
        title = 'Install Solar Panels';
        co2Reduction = 2.8;
        costImpact = 'Save $1,200/year on electricity';
        break;
      case 'vegan':
        title = 'Go Fully Plant-Based';
        co2Reduction = 3.2;
        costImpact = 'Save $600/year on groceries';
        break;
      case 'public':
        title = 'Use Only Public Transport';
        co2Reduction = 5.1;
        costImpact = 'Save $1,500/year on transport';
        break;
    }
    
    const newFootprint = (AppState.currentUser.totalFootprint - co2Reduction).toFixed(1);
    const reductionPercent = ((co2Reduction / AppState.currentUser.totalFootprint) * 100).toFixed(0);
    
    resultDiv.innerHTML = `
      <div class="simulation-title">${title}</div>
      <div class="simulation-stats">
        <div class="simulation-stat">
          <div class="simulation-label">New Monthly Footprint</div>
          <div class="simulation-value">${newFootprint} kg CO₂</div>
        </div>
        <div class="simulation-stat">
          <div class="simulation-label">Reduction</div>
          <div class="simulation-value">-${reductionPercent}%</div>
        </div>
      </div>
      <p style="text-align: center; margin-top: 16px; color: var(--color-text-secondary);">${costImpact}</p>
    `;
    resultDiv.classList.add('show');
  },
  
  joinChallenge(challengeName) {
    const challenge = AppState.weeklyChallenges.find(c => c.name === challengeName);
    if (challenge) {
      challenge.active = !challenge.active;
      this.loadChallengesView();
      if (challenge.active) {
        alert(`🎯 Joined ${challengeName}! Good luck!`);
      }
    }
  },
  
  logout() {
    if (confirm('Are you sure you want to logout?')) {
      AppState.currentUser = null;
      this.showScreen('login-screen');
      document.getElementById('login-form').reset();
    }
  },
  
  // GPS Tracking State
  trackingState: {
    isTracking: false,
    watchId: null,
    lastPosition: null,
    currentTrip: null,
    tripHistory: [],
    dailyTotal: 0
  },
  
  transportModes: [
    { mode: 'Walking', speedMin: 0, speedMax: 5, co2PerKm: 0, icon: '🚶', color: '#4CAF50' },
    { mode: 'Cycling', speedMin: 5, speedMax: 15, co2PerKm: 0, icon: '🚴', color: '#8BC34A' },
    { mode: 'Car', speedMin: 15, speedMax: 50, co2PerKm: 0.2, icon: '🚗', color: '#FF9800' },
    { mode: 'Public Transport', speedMin: 50, speedMax: 100, co2PerKm: 0.05, icon: '🚌', color: '#2196F3' },
    { mode: 'Flight', speedMin: 100, speedMax: 1000, co2PerKm: 0.25, icon: '✈️', color: '#F44336' }
  ],
  
  // Automated Tracking Functions
  showAutomatedTracking() {
    console.log('🚀 showAutomatedTracking called - navigating to tracking page');
    
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });
    
    // Show automated tracking view
    const trackingView = document.getElementById('automated-tracking-view');
    if (trackingView) {
      trackingView.classList.add('active');
      console.log('✅ Tracking view activated');
    } else {
      console.error('❌ Tracking view not found!');
    }
    
    // Load trip history
    this.loadTripHistory();
    
    // Update navigation - deactivate all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    console.log('📍 Navigation complete - tracking page should be visible');
  },
  
  backToDashboard() {
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });
    document.getElementById('dashboard-view').classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelector('[data-view="dashboard"]').classList.add('active');
  },
  
  requestLocationPermission() {
    console.log('📍 Requesting location permission...');
    
    if (!navigator.geolocation) {
      alert('❌ Geolocation is not supported by your browser');
      console.error('❌ Geolocation not supported');
      return;
    }
    
    // Hide all states
    document.getElementById('permission-state').style.display = 'none';
    document.getElementById('tracking-ready').style.display = 'none';
    document.getElementById('tracking-active').style.display = 'none';
    document.getElementById('permission-denied').style.display = 'none';
    
    // Show loading
    document.getElementById('permission-state').style.display = 'block';
    document.getElementById('permission-state').innerHTML = '<div class="permission-request"><div class="permission-icon">⏳</div><h4>Requesting Permission...</h4><p>Please allow location access in your browser</p></div>';
    
    // Request geolocation permission
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Permission granted
        console.log('✅ Location permission granted', position);
        document.getElementById('permission-state').style.display = 'none';
        document.getElementById('tracking-ready').style.display = 'block';
      },
      (error) => {
        // Permission denied or error
        console.error('❌ Geolocation error:', error);
        document.getElementById('permission-state').style.display = 'none';
        document.getElementById('permission-denied').style.display = 'block';
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  },
  
  startTracking() {
    console.log('🚀 Starting GPS tracking...');
    
    if (!navigator.geolocation) {
      alert('❌ Geolocation is not supported by your browser');
      console.error('❌ Geolocation not supported');
      return;
    }
    
    // Hide ready state, show active state
    document.getElementById('tracking-ready').style.display = 'none';
    document.getElementById('tracking-active').style.display = 'block';
    
    // Initialize trip
    this.trackingState.currentTrip = {
      startTime: new Date(),
      distance: 0,
      co2: 0,
      mode: 'Walking',
      positions: []
    };
    
    this.trackingState.isTracking = true;
    console.log('✅ Tracking state initialized');
    
    // Start watching position
    this.trackingState.watchId = navigator.geolocation.watchPosition(
      (position) => this.handlePositionUpdate(position),
      (error) => this.handlePositionError(error),
      { 
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 0 
      }
    );
    
    console.log('📍 Position watch started with ID:', this.trackingState.watchId);
  },
  
  handlePositionUpdate(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const speed = position.coords.speed || 0; // meters per second
    const speedKmh = Math.max(0, speed * 3.6); // convert to km/h
    
    // Update coordinate display
    document.getElementById('current-lat').textContent = lat.toFixed(6);
    document.getElementById('current-lng').textContent = lng.toFixed(6);
    document.getElementById('current-speed').textContent = speedKmh.toFixed(1);
    
    // Detect transport mode based on speed
    const detectedMode = this.detectTransportMode(speedKmh);
    
    // Update mode display
    document.getElementById('mode-icon').textContent = detectedMode.icon;
    document.getElementById('mode-name').textContent = detectedMode.mode;
    document.getElementById('mode-emission').textContent = detectedMode.co2PerKm.toFixed(2) + ' kg CO₂/km';
    
    // Calculate distance if we have a previous position
    if (this.trackingState.lastPosition) {
      const distance = this.calculateDistance(
        this.trackingState.lastPosition.coords.latitude,
        this.trackingState.lastPosition.coords.longitude,
        lat,
        lng
      );
      
      // Add to trip distance (only if moving significantly)
      if (distance > 0.001) { // More than 1 meter
        this.trackingState.currentTrip.distance += distance;
        
        // Calculate CO2 for this segment
        const segmentCo2 = distance * detectedMode.co2PerKm;
        this.trackingState.currentTrip.co2 += segmentCo2;
        
        // Update mode (use the one with highest emissions for the trip)
        if (detectedMode.co2PerKm > 0) {
          this.trackingState.currentTrip.mode = detectedMode.mode;
        }
      }
    }
    
    // Store position
    this.trackingState.lastPosition = position;
    this.trackingState.currentTrip.positions.push({
      lat, lng, speed: speedKmh, timestamp: Date.now()
    });
    
    // Update UI
    document.getElementById('trip-distance').textContent = this.trackingState.currentTrip.distance.toFixed(2);
    document.getElementById('trip-co2').textContent = this.trackingState.currentTrip.co2.toFixed(3);
    document.getElementById('daily-co2').textContent = (this.trackingState.dailyTotal + this.trackingState.currentTrip.co2).toFixed(2) + ' kg';
  },
  
  handlePositionError(error) {
    console.error('Position error:', error);
    let message = 'Unable to get location';
    
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = 'Location permission denied';
        break;
      case error.POSITION_UNAVAILABLE:
        message = 'Location information unavailable';
        break;
      case error.TIMEOUT:
        message = 'Location request timed out';
        break;
    }
    
    // Show error in UI but keep tracking active
    console.log(message);
  },
  
  detectTransportMode(speedKmh) {
    for (const mode of this.transportModes) {
      if (speedKmh >= mode.speedMin && speedKmh < mode.speedMax) {
        return mode;
      }
    }
    // Default to last mode if speed exceeds all ranges
    return this.transportModes[this.transportModes.length - 1];
  },
  
  calculateDistance(lat1, lon1, lat2, lon2) {
    // Haversine formula to calculate distance between two points
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
  },
  
  toRad(degrees) {
    return degrees * (Math.PI / 180);
  },
  
  stopTracking() {
    if (!this.trackingState.isTracking) return;
    
    // Stop watching position
    if (this.trackingState.watchId) {
      navigator.geolocation.clearWatch(this.trackingState.watchId);
      this.trackingState.watchId = null;
    }
    
    this.trackingState.isTracking = false;
    
    // Finalize trip
    const trip = this.trackingState.currentTrip;
    trip.endTime = new Date();
    trip.duration = Math.round((trip.endTime - trip.startTime) / 1000 / 60); // minutes
    
    // Add to history if distance > 0
    if (trip.distance > 0.01) {
      this.trackingState.tripHistory.unshift(trip);
      this.trackingState.dailyTotal += trip.co2;
      
      // Show summary
      alert(`🏁 Trip Complete!\n\nMode: ${trip.mode}\nDistance: ${trip.distance.toFixed(2)} km\nDuration: ${trip.duration} min\nCO₂ Emissions: ${trip.co2.toFixed(3)} kg\n\nTrip saved to history.`);
    }
    
    // Reset state
    this.trackingState.lastPosition = null;
    this.trackingState.currentTrip = null;
    
    // Show ready state again
    document.getElementById('tracking-active').style.display = 'none';
    document.getElementById('tracking-ready').style.display = 'block';
    
    // Reload trip history
    this.loadTripHistory();
  },
  
  loadTripHistory() {
    const historyContainer = document.getElementById('trip-history');
    
    if (this.trackingState.tripHistory.length === 0) {
      historyContainer.innerHTML = `
        <div class="empty-history">
          <div class="empty-history-icon">📍</div>
          <p>No trips recorded yet.<br>Start tracking to see your trip history.</p>
        </div>
      `;
      return;
    }
    
    historyContainer.innerHTML = this.trackingState.tripHistory.map(trip => {
      const modeData = this.transportModes.find(m => m.mode === trip.mode) || this.transportModes[0];
      const time = new Date(trip.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
      return `
        <div class="trip-history-item">
          <div class="trip-history-header">
            <div class="trip-mode">
              <span class="trip-mode-icon">${modeData.icon}</span>
              <span>${trip.mode}</span>
            </div>
            <div class="trip-time">${time}</div>
          </div>
          <div class="trip-metrics">
            <div class="trip-metric">
              <div class="trip-metric-label">Distance</div>
              <div class="trip-metric-value">${trip.distance.toFixed(2)} km</div>
            </div>
            <div class="trip-metric">
              <div class="trip-metric-label">Duration</div>
              <div class="trip-metric-value">${trip.duration} min</div>
            </div>
            <div class="trip-metric">
              <div class="trip-metric-label">CO₂</div>
              <div class="trip-metric-value" style="color: var(--color-error);">${trip.co2.toFixed(2)} kg</div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },
  
  startMobilityTracking() {
    // Simulate real-time tracking
    const modes = [
      { mode: 'Walking', icon: '🚶', speed: 5, co2PerKm: 0, altitude: 120 },
      { mode: 'Cycling', icon: '🚴', speed: 18, co2PerKm: 0, altitude: 125 },
      { mode: 'Public Transport', icon: '🚌', speed: 35, co2PerKm: 0.05, altitude: 130 },
      { mode: 'Car', icon: '🚗', speed: 55, co2PerKm: 0.2, altitude: 135 },
      { mode: 'Flight', icon: '✈️', speed: 550, co2PerKm: 0.25, altitude: 10000 }
    ];
    
    // Detect mode based on speed and altitude (simulated)
    const currentMode = modes[Math.floor(Math.random() * 4)]; // Exclude flight for now
    const distance = (Math.random() * 15 + 5).toFixed(1); // 5-20 km
    const tripCo2 = (distance * currentMode.co2PerKm).toFixed(2);
    const dailyTotal = (Math.random() * 5 + 2).toFixed(1);
    const weeklyTotal = (Math.random() * 30 + 15).toFixed(1);
    
    const content = document.getElementById('mobility-tracking-content');
    content.innerHTML = `
      <div class="mobility-active">
        <div class="location-status">
          <div class="status-indicator"></div>
          <span>Location tracking active</span>
        </div>
        
        <div class="current-mode">
          <div class="mode-icon">${currentMode.icon}</div>
          <div class="mode-name">${currentMode.mode}</div>
          <div class="mode-emission">${tripCo2} kg CO₂ this trip</div>
        </div>
        
        <div class="trip-stats">
          <div class="trip-stat">
            <div class="trip-stat-label">Speed</div>
            <div class="trip-stat-value">${currentMode.speed}</div>
            <div class="trip-stat-label">km/h</div>
          </div>
          <div class="trip-stat">
            <div class="trip-stat-label">Distance</div>
            <div class="trip-stat-value">${distance}</div>
            <div class="trip-stat-label">km</div>
          </div>
          <div class="trip-stat">
            <div class="trip-stat-label">Altitude</div>
            <div class="trip-stat-value">${currentMode.altitude}</div>
            <div class="trip-stat-label">m</div>
          </div>
        </div>
        
        <div class="cumulative-emissions">
          <div class="cumulative-title">Cumulative Emissions</div>
          <div class="emission-periods">
            <div class="emission-period">
              <div class="emission-period-label">Today</div>
              <div class="emission-period-value">${dailyTotal} kg</div>
            </div>
            <div class="emission-period">
              <div class="emission-period-label">This Week</div>
              <div class="emission-period-value">${weeklyTotal} kg</div>
            </div>
          </div>
        </div>
        
        <button class="btn btn--secondary btn--full-width" style="margin-top: 16px;" onclick="app.refreshMobilityTracking()">Refresh Location</button>
      </div>
    `;
  },
  
  refreshMobilityTracking() {
    // This is the old simulated function - keeping for backward compatibility
  },
  
  simulateReceiptScan() {
    const resultsDiv = document.getElementById('receipt-results');
    const sampleItems = [
      { name: 'Beef (500g)', co2: 13.5 },
      { name: 'Chicken (1kg)', co2: 6.9 },
      { name: 'Tomatoes (500g)', co2: 0.9 },
      { name: 'Bread', co2: 0.5 },
      { name: 'Milk (1L)', co2: 1.9 },
      { name: 'Cheese (200g)', co2: 2.4 }
    ];
    
    const selectedItems = [];
    const numItems = Math.floor(Math.random() * 3) + 4; // 4-6 items
    for (let i = 0; i < numItems; i++) {
      const item = sampleItems[Math.floor(Math.random() * sampleItems.length)];
      selectedItems.push(item);
    }
    
    const totalCo2 = selectedItems.reduce((sum, item) => sum + item.co2, 0).toFixed(2);
    
    resultsDiv.innerHTML = `
      <div class="receipt-preview">
        <div class="receipt-preview-icon">🧾</div>
        <div>Receipt scanned successfully!</div>
      </div>
      
      <div class="receipt-items">
        <h4 style="margin-bottom: 12px; font-size: 16px;">Extracted Items</h4>
        ${selectedItems.map(item => `
          <div class="receipt-item">
            <span class="receipt-item-name">${item.name}</span>
            <span class="receipt-item-co2">${item.co2.toFixed(2)} kg CO₂</span>
          </div>
        `).join('')}
      </div>
      
      <div class="receipt-total">
        <div class="receipt-total-label">Total Carbon Footprint</div>
        <div class="receipt-total-value">${totalCo2} kg CO₂</div>
      </div>
    `;
    
    resultsDiv.style.display = 'block';
  },
  
  switchEnergyMode(mode) {
    document.querySelectorAll('.toggle-option').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    if (mode === 'smart') {
      document.getElementById('energy-smart').style.display = 'block';
      document.getElementById('energy-manual').style.display = 'none';
    } else {
      document.getElementById('energy-smart').style.display = 'none';
      document.getElementById('energy-manual').style.display = 'block';
    }
  },
  
  simulateSmartHome() {
    const dataDiv = document.getElementById('smart-home-data');
    const electricity = (Math.random() * 300 + 200).toFixed(1); // 200-500 kWh
    const gas = (Math.random() * 100 + 50).toFixed(1); // 50-150 m³
    const waterHeater = (Math.random() * 50 + 30).toFixed(1); // 30-80 kWh
    const hvac = (Math.random() * 150 + 100).toFixed(1); // 100-250 kWh
    
    const totalCo2 = (electricity * 0.5 + gas * 2.0).toFixed(2);
    
    dataDiv.innerHTML = `
      <div class="energy-data-card">
        <h4 style="margin-bottom: 16px; font-size: 16px;">Live Power Consumption</h4>
        <div class="energy-metrics">
          <div class="energy-metric">
            <div class="energy-metric-label">Electricity</div>
            <div class="energy-metric-value">${electricity} kWh</div>
          </div>
          <div class="energy-metric">
            <div class="energy-metric-label">Gas</div>
            <div class="energy-metric-value">${gas} m³</div>
          </div>
          <div class="energy-metric">
            <div class="energy-metric-label">Water Heater</div>
            <div class="energy-metric-value">${waterHeater} kWh</div>
          </div>
          <div class="energy-metric">
            <div class="energy-metric-label">HVAC</div>
            <div class="energy-metric-value">${hvac} kWh</div>
          </div>
        </div>
        
        <div class="energy-carbon-result">
          <div class="carbon-label">Monthly Carbon Footprint</div>
          <div class="carbon-value">${totalCo2} kg CO₂</div>
        </div>
      </div>
    `;
    
    dataDiv.style.display = 'block';
  },
  
  simulateBillUpload() {
    alert('📸 Bill photo uploaded successfully!');
  },
  
  calculateManualEnergy() {
    const householdSize = parseInt(document.getElementById('household-size').value);
    const location = document.getElementById('location').value;
    
    // Estimate based on household size
    const baseElectricity = householdSize * 250; // kWh
    const baseGas = householdSize * 40; // m³
    
    const totalCo2 = (baseElectricity * 0.5 + baseGas * 2.0).toFixed(2);
    
    const resultsDiv = document.getElementById('manual-energy-results');
    resultsDiv.innerHTML = `
      <div class="energy-data-card" style="margin-top: 16px;">
        <h4 style="margin-bottom: 16px; font-size: 16px;">Estimated Usage (${location})</h4>
        <div class="energy-metrics">
          <div class="energy-metric">
            <div class="energy-metric-label">Est. Electricity</div>
            <div class="energy-metric-value">${baseElectricity} kWh</div>
          </div>
          <div class="energy-metric">
            <div class="energy-metric-label">Est. Gas</div>
            <div class="energy-metric-value">${baseGas} m³</div>
          </div>
        </div>
        
        <div class="energy-carbon-result">
          <div class="carbon-label">Estimated Carbon Footprint</div>
          <div class="carbon-value">${totalCo2} kg CO₂</div>
        </div>
      </div>
    `;
    
    resultsDiv.style.display = 'block';
  },
  
  simulateBankImport() {
    const categories = [
      { name: 'Gas & Fuel', icon: '⛽', amount: 450, co2: 85.5 },
      { name: 'Groceries', icon: '🛒', amount: 680, co2: 42.3 },
      { name: 'Airline Tickets', icon: '✈️', amount: 1200, co2: 320.0 },
      { name: 'Shopping', icon: '🛍️', amount: 320, co2: 28.6 },
      { name: 'Restaurants', icon: '🍽️', amount: 540, co2: 35.2 },
      { name: 'Utilities', icon: '💡', amount: 180, co2: 45.0 }
    ];
    
    const totalCo2 = categories.reduce((sum, cat) => sum + cat.co2, 0).toFixed(2);
    
    const resultsDiv = document.getElementById('financial-results');
    resultsDiv.innerHTML = `
      <div class="transaction-summary">
        <div class="summary-title">Transaction Analysis - Last Month</div>
        <div class="category-breakdown">
          ${categories.map(cat => `
            <div class="transaction-category">
              <div class="transaction-category-info">
                <div class="transaction-icon">${cat.icon}</div>
                <div>
                  <div class="transaction-category-name">${cat.name}</div>
                  <div class="transaction-category-amount">$${cat.amount}</div>
                </div>
              </div>
              <div class="transaction-co2">${cat.co2.toFixed(1)} kg CO₂</div>
            </div>
          `).join('')}
        </div>
        
        <div class="receipt-total" style="margin-top: 16px;">
          <div class="receipt-total-label">Total Carbon from Spending</div>
          <div class="receipt-total-value">${totalCo2} kg CO₂</div>
        </div>
      </div>
      
      <div class="financial-chart-container">
        <div class="chart-title">Carbon by Category</div>
        <canvas id="financial-chart" style="max-height: 250px;"></canvas>
      </div>
    `;
    
    resultsDiv.style.display = 'block';
    
    // Create chart
    setTimeout(() => {
      const ctx = document.getElementById('financial-chart');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: categories.map(c => c.name),
            datasets: [{
              label: 'CO₂ (kg)',
              data: categories.map(c => c.co2),
              backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return value + ' kg';
                  }
                }
              }
            }
          }
        });
      }
    }, 100);
  }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

// Enhanced click handler setup for automated tracking
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔧 Setting up click handlers for automated tracking...');
  
  // Handle the automated tracking card on dashboard
  const trackingCard = document.querySelector('.automated-tracking-card');
  if (trackingCard) {
    console.log('✅ Found automated tracking card');
    trackingCard.addEventListener('click', (e) => {
      console.log('🖱️ Automated tracking card clicked!');
      e.stopPropagation();
      app.showAutomatedTracking();
    });
    
    // Also handle the button inside the card
    const button = trackingCard.querySelector('button');
    if (button) {
      console.log('✅ Found button inside tracking card');
      button.addEventListener('click', (e) => {
        console.log('🖱️ Start GPS Tracking button clicked!');
        e.stopPropagation();
        app.showAutomatedTracking();
      });
    }
  } else {
    console.warn('⚠️ Automated tracking card not found on page load');
  }
  
  // Also set up handler for the track view GPS card
  setTimeout(() => {
    const trackViewCard = document.querySelector('#track-view .card[onclick*="showAutomatedTracking"]');
    if (trackViewCard) {
      console.log('✅ Found GPS tracking card in track view');
    }
  }, 500);
});