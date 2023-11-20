import cheerio from 'cheerio';
//fetch https://github.com/ekrenzin

const res = await fetch("https://github.com/ekrenzin");
const body = await res.text();

const $ = cheerio.load(body);
console.log(body)