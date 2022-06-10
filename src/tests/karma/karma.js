window.top.document.body.style.backgroundColor = '#222222';
window.top.document.body.style.color = '#dddddd';
window.top.document.getElementById('banner').style.backgroundColor = '#226644';
window.top.document.getElementById('banner').style.display = 'flex';
window.top.document.getElementById('banner').style.alignItems = 'center';
window.top.document.getElementById('banner').style.justifyContent = 'space-between';
window.top.document.getElementById('banner').style.flexDirection = 'row-reverse';

window.top.document.getElementById('title').style.fontSize = '1em';

window.top.document.body.style.display = 'flex';
window.top.document.body.style.flexDirection = 'column';
window.top.document.body.style.alignItems = 'stretch';

// Code to show warnings in karma
const logError = console.error;
console.error = function (...args) {
  const stack = new Error().stack;
  const componentName = /ng:\/\/\/(.*)\./g.exec(stack)[1];

  const div = document.createElement('div');
  div.classList.add('jasmine-failed');
  div.classList.add('jasmine-spec-detail');
  div.classList.add('jasmine-warning');


  const description = document.createElement('div');
  description.classList.add('jasmine-description');
  description.innerText = `Component > ${componentName}`;

  const message = document.createElement('div');
  message.classList.add('jasmine-message');

  const stackTrace = document.createElement('div');
  stackTrace.classList.add('jasmine-stack-trace');
  stackTrace.innerText = args[0] + stack;

  message.appendChild(stackTrace);

  div.appendChild(description);
  div.appendChild(message);

  document.querySelector('.jasmine-failures').appendChild(div);
  logError(...args);
}
