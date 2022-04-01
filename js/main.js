/* global data */
/* exported data */

const $inputForm = document.querySelector('#entry-form');
const $imageHolder = document.getElementById('journal-image');
const $entryList = document.getElementById('entry-list');

$inputForm.addEventListener('input', event => {
  if (event.target.getAttribute('id') === 'image-url') {
    $imageHolder.setAttribute('src', event.target.value);
  }
});

$inputForm.addEventListener('submit', event => {
  event.preventDefault();
  const journalEntry = {
    title: event.target[0].value,
    photoUrl: event.target[1].value,
    notes: event.target[2].value,
    entryId: data.nextEntryId++
  };
  data.entries.unshift(journalEntry);
  $imageHolder.setAttribute('src', './images/placeholder-image-square.jpg');
  $inputForm.reset();
});

function populateEntries(entry) {
  const listItem = document.createElement('li');

  const flexRowDiv = document.createElement('div');
  flexRowDiv.className = 'flex row';

  const colHalfDiv = document.createElement('div');
  colHalfDiv.className = 'column-half';

  const journalImage = document.createElement('img');
  journalImage.className = 'journal-image';
  journalImage.setAttribute('id', 'display-image');

  colHalfDiv.appendChild(journalImage);
  flexRowDiv.appendChild(colHalfDiv);

  const colHalfFlexFlexCol = document.createElement('div');
  colHalfFlexFlexCol.className = 'column-half flex flex-col';

  const entryTitleSpan = document.createElement('span');
  entryTitleSpan.className = 'entry-title';

  const entryNotesP = document.createElement('p');
  entryNotesP.className = 'entry-note';

  colHalfFlexFlexCol.appendChild(entryTitleSpan);
  colHalfFlexFlexCol.appendChild(entryNotesP);

  flexRowDiv.appendChild(colHalfFlexFlexCol);
  listItem.appendChild(flexRowDiv);

  journalImage.setAttribute('src', entry.photoUrl);
  entryTitleSpan.textContent = entry.title;
  entryNotesP.textContent = entry.notes;

  return listItem;
}

window.addEventListener('DOMContentLoaded', event => {
  for (const entryIndex in data.entries) {
    $entryList.appendChild(populateEntries(data.entries[entryIndex]));
  }
});
