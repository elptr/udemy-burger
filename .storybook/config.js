// import { configure } from '@storybook/react';
//
// function loadStories() {
//     require('../src/stories/index.js');
//     // You can require as many stories as you need.
// }
//
// configure(loadStories, module);




import { configure } from '@storybook/react';

const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);