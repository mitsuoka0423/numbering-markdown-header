import fs from 'fs';
import marked from 'marked';
import cheerio from 'cheerio';
import TurndownService from 'turndown';

const filename = 'sample.md';

const input = await fs.promises.readFile(`./input/${filename}`, 'utf-8');

const html = marked(input);

const $ = cheerio.load(html);

const depth = 2;

$(`h${depth}`).each((i, element) => {
  const $element = $(element);

  const text = $element.text();
  $element.text(`${i + 1}. ${text}`);

  const output = $element.text();
  console.log(output);
});

const output = $('body').html();
console.log(output);

const turndownService = new TurndownService();
const markdown = turndownService.turndown(output);

console.log(markdown);

await fs.promises.writeFile(`./${filename}`, markdown);
