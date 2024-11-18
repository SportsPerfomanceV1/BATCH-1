import React from 'react';
import './PasswordStrengthMeter.css';

const PasswordStrengthMeter = ({ password }) => {
  const calculateStrength = (password) => {
    let strength = 0;

    if (password.length === 0) return strength; //Password not entered
    if (password.length > 0 && password.length < 5 ) strength = 1; // Weak
    if (password.length >= 5 && /\d{0,2}/.test(password)) strength = 2; // Good
    if (password.length >= 5 && /\d{3,}/.test(password)) strength = 3; // Strong

    return strength;
  };

  const strength = calculateStrength(password);

  const getBarColor = () => {
    switch (strength) {
      case 1:
        return 'red';
      case 2:
        return 'yellow';
      case 3:
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <div className="password-strength-meter">
      <div className="strength-bar-container">
        <div
          className={`strength-bar ${strength >= 1 ? 'filled' : ''}`}
          style={{ backgroundColor: strength >= 1 ? getBarColor() : 'gray' }}
        ></div>
        <div
          className={`strength-bar ${strength >= 2 ? 'filled' : ''}`}
          style={{ backgroundColor: strength >= 2 ? getBarColor() : 'gray' }}
        ></div>
        <div
          className={`strength-bar ${strength === 3 ? 'filled' : ''}`}
          style={{ backgroundColor: strength === 3 ? getBarColor() : 'gray' }}
        ></div>
      </div>
      <div className="strength-label">
        {strength === 1 && <span>Weak</span>}
        {strength === 2 && <span>Good</span>}
        {strength === 3 && <span>Strong</span>}
        {strength === 0 && <span>Enter password</span>}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
