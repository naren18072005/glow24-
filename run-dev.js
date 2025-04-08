
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if server directory exists
if (!fs.existsSync(path.join(__dirname, 'server'))) {
  console.error('Server directory not found. Please make sure it exists.');
  process.exit(1);
}

// Start backend server
const serverProcess = spawn('npm', ['run', 'start'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true
});

// Start frontend
const frontendProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
const cleanupAndExit = () => {
  console.log('Shutting down both processes...');
  serverProcess.kill();
  frontendProcess.kill();
  process.exit(0);
};

// Listen for termination signals
process.on('SIGINT', cleanupAndExit);
process.on('SIGTERM', cleanupAndExit);

// Handle child process exit
serverProcess.on('close', (code) => {
  if (code !== 0) {
    console.log(`Server process exited with code ${code}`);
  }
  frontendProcess.kill();
  process.exit(code);
});

frontendProcess.on('close', (code) => {
  if (code !== 0) {
    console.log(`Frontend process exited with code ${code}`);
  }
  serverProcess.kill();
  process.exit(code);
});
