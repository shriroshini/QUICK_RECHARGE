import React from 'react';

function AppSimple() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Day 13 Integration Test</h1>
      <p>If you see this, the basic setup is working!</p>
      <button onClick={() => alert('Button works!')}>Test Button</button>
    </div>
  );
}

export default AppSimple;