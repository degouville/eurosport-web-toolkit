/* eslint-disable */
const axios = require('axios');
const { version } = require('../package.json');

(function() {
  return axios
    .post('https://hooks.slack.com/services/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', {
      username: 'Deployment notification',
      icon_url:
        'https://www.beyondanxietyanddepression.com/sites/beyondanxietyanddepression.com/files/styles/large/public/how-stop-panic-attacks-step-step.jpg',
      text: `[Web-Toolkit] Version ${version} deployed !`,
    })
    .catch(console.error);
})();
