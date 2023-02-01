export { getRandomHSL }

function getRandomHSL() {
    return (
        'hsl(' +
        360 * Math.random() +
        ',' +
        (25 + 70 * Math.random()) +
        '%,' +
        (55 + 10 * Math.random()) +
        '%)'
    );
}