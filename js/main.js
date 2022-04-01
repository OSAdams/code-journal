/* global data */
/* exported data */

const $inputForm = document.querySelector('#entry-form');
const $imageHolder = document.getElementById('journal-image');
const $entryList = document.getElementById('entry-list');
const $swapView = document.querySelectorAll('.swap-view');
const $viewEntries = document.querySelector('.view-entries');
const $titleText = document.querySelector('.title-text');
const $viewForm = document.getElementById('new-entry');

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
  viewEntries();
});

$viewEntries.addEventListener('click', event => {
  data.view = 'entries';
  viewEntries();
});

$viewForm.addEventListener('click', event => {
  data.view = 'entry-form';
  $viewForm.className = 'submit-entry hidden';
  viewForm();
});

function viewEntries() {
  $swapView[0].className = 'swap-view hidden';
  $swapView[1].className = 'swap-view';
  $titleText.textContent = 'Entries';
  $entryList.innerHTML = '';
  $viewForm.className = 'submit-entry';
  for (const entryIndex in data.entries) {
    $entryList.appendChild(populateEntries(data.entries[entryIndex]));
  }
}

function viewForm() {
  $swapView[0].className = 'swap-view';
  $swapView[1].className = 'swap-view hidden';
  $titleText.textContent = 'New Entry';
  $viewForm.className = 'submit-entry hidden';
}

window.addEventListener('DOMContentLoaded', event => {
  if (data.view === 'entries') {
    $titleText.textContent = 'Entries';
    viewEntries();
  } else if (data.view === 'entry-form') {
    $titleText.textContent = 'New Entry';
    $viewForm.className += ' hidden';
    viewForm();
  }
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
