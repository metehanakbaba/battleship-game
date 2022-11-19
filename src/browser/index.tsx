import React, { StrictMode } from 'react';
import { render } from 'react-dom';

console.log('test');

render(
  <StrictMode>
    <div>
      <span>Test</span>
    </div>
  </StrictMode>,
  document.getElementById('root'),
);
