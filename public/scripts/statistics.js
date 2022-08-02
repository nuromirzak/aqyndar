const authorsNum = document.querySelector('#statistics #authorsNum');
const poemsNum = document.querySelector('#statistics #poemsNum');
const linesNum = document.querySelector('#statistics #linesNum');
const annotationsNum = document.querySelector('#statistics #annotationsNum');
// const usersNum = document.querySelector('#statistics #usersNum');

const refreshStatistics = async () => {
    const response = await fetch('/api/statistics');

    const data = await response.json();

    authorsNum.innerHTML = `${data.authorsNum}`;
    poemsNum.innerHTML = `${data.poemsNum}`;
    linesNum.innerHTML = `${data.linesNum}`;
    annotationsNum.innerHTML = `${data.annotationsNum}`;
    // usersNum.innerHTML = `${data.usersNum} пайдаланушы тіркелді`;
};

refreshStatistics().then(r => console.log('Statistics refreshed')).catch(e => console.log(e));

// Removed for now
// const interval = setInterval(() => {
//     refreshStatistics().then(r => console.log('Statistics refreshed')).catch(e => console.log(e));
// }, 5000);