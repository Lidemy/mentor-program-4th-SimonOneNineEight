/* eslint indent: 0 */
const request = require('request');
const process = require('process');

const apiUrl = 'https://restcountries.eu/rest/v2/name/';
const nationName = process.argv[2];


request(`${apiUrl}${nationName}`, (error, response, body) => {
    if (error) {
        console.log('error');
        return;
    }
    const data = JSON.parse(body);

    if (data.status >= 400 && data.status < 500) {
        console.log('「找不到國家資訊」');
        return;
    }
    if (!nationName) {
        console.log('請輸入國家名稱');
        return;
      }
    for (let i = 0; i < data.length; i += 1) {
    console.log('========================');
    console.log(`國家: ${data[i].name}`);
    console.log(`首都: ${data[i].capital}`);
    console.log(`貨幣: ${data[i].currencies[0].code}`);
    console.log(`國碼: ${data[i].callingCodes[0]}`);
    }
});
