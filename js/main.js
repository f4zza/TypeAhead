const endpoint =`https://gist.githubusercontent.com/emnsen/a2364b401d1cb02ac09a850a57017994/raw/bada9a4dcc6ac20428d0abfde4204bbce3f0c3f1/country-codes.json`


const capitals = []
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => capitals.push(...data))

function findMatches(wordToMatch, cities) {
  return capitals.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi')
    return place.capital.match(regex) || place.languages.match(regex)
  })
}


function displayMatches() {
  const matchArray = findMatches(this.value, capitals)
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi')
    const cityName = place.capital.replace(regex, `<span class="hl">${this.value}</span>`)
    const currencyName = place.currency.replace(regex, `<span class="hl">${this.value}</span>`)
    return `
      <li>
        <span class="name">${cityName}, ${currencyName}</span>
        <span class="languages">${place.languages}</span>
      </li>
    `
  }).join('')
  suggestions.innerHTML = html
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)