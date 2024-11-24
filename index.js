const getPoemBtn = document.getElementById('get-poem');
const poemEl = document.getElementById('poem');
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json';

const getJSON = (url) => fetch(url).then((res) => res.json());

const pipe = (...fns) => (firstArg) => fns.reduce((returnValue, fn) => fn(returnValue), firstArg);

const makeTag = (tag) => (str) => `<${tag}>${str}</${tag}>`;

// Complete this function
const makePoemHTML = (poem) => {
  const { title, author, lines } = poem[0];

  // Create tag helpers
  const makeH2 = makeTag('h2');
  const makeH3 = makeTag('h3');
  const makeEm = makeTag('em');
  const makeP = makeTag('p');
  const makeBr = () => '<br>';

  // Create title and author
  const titleHTML = makeH2(title);
  const authorHTML = makeH3(makeEm(`by ${author}`));

  // Create stanza HTML
  const stanzasHTML = lines
    .join('\n') // Join lines to handle empty strings for stanza separation
    .split('\n\n') // Split into stanzas
    .map((stanza) =>
      makeP(
        stanza
          .split('\n') // Split stanza into lines
          .map((line, idx, arr) =>
            idx < arr.length - 1 ? `${line}${makeBr()}` : line // Add <br> to all but the last line
          )
          .join('') // Join all lines in the stanza
      )
    )
    .join(''); // Join all stanzas into a single string

  // Combine all parts into the final HTML
  return pipe(() => titleHTML + authorHTML + stanzasHTML)();
};

// Attach a click event to #get-poem
getPoemBtn.onclick = async function () {
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL));
};

