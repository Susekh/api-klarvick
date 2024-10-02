export default function generatePasswords() {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
  
    // Ensuring one character from each required category
    const getRandom = (chars : string) : string => chars[Math.floor(Math.random() * chars.length)];
  
    const randomLower = getRandom(lowerCase);
    const randomUpper = getRandom(upperCase);
    const randomNumber = getRandom(numbers);
    const randomSpecial = getRandom(specialChars);
  
    // Generate remaining random characters (at least 4 more to meet the minimum 8-character length)
    const remainingLength = 4; // We already have 4 characters (1 from each category)
    const allChars = lowerCase + upperCase + numbers + specialChars;
    
    let remainingChars = '';
    for (let i = 0; i < remainingLength; i++) {
      remainingChars += getRandom(allChars);
    }
  
    // Combine all characters and shuffle the result to avoid predictable patterns
    const password = randomLower + randomUpper + randomNumber + randomSpecial + remainingChars;
  
    // Shuffle the characters to randomize the order
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  }
  