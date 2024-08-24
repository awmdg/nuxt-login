import { randomBytes } from 'crypto';

// Function to generate a session secret
function generateSessionSecret(): string {
  return randomBytes(64).toString('hex');
}

// Generate the session secret and print it to the console
const sessionSecret = generateSessionSecret();
console.log(`Your session secret: ${sessionSecret}`);
