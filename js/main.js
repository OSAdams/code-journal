/* global data */
/* exported data */

const $inputForm = document.querySelector('#entry-form');
const $imageHolder = document.getElementById('journal-image');
const $entryList = document.getElementById('entry-list');
const $swapView = document.querySelectorAll('.swap-view');
const $viewEntries = document.querySelector('.view-entries');
const $titleText = document.querySelector('.title-text');
const $viewForm = document.getElementById('new-entry');
const $dataView = document.getElementById('data-view');

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

$viewEntries.addEventListener('click', viewEntries);

$viewForm.addEventListener('click', viewForm);

$entryList.addEventListener('click', event => {
  if (event.target.className === 'fas fa-edit') {
    // eslint-disable-next-line no-console
    console.log(event.target);
    data.view = 'entry-form';
    $dataView.setAttribute('data-view', 'entry-form');
    $swapView[0].className = 'swap-view';
    $swapView[1].className = 'swap-view hidden';
    $titleText.textContent = 'Edit Entry';
    $viewForm.className = 'submit-entry hidden';
  }
});

function viewEntries() {
  data.view = 'entries';
  $dataView.setAttribute('data-view', 'entries');
  $swapView[0].className = 'swap-view hidden';
  $swapView[1].className = 'swap-view';
  $titleText.textContent = 'Entries';
  $viewForm.className = 'submit-entry';
  $entryList.innerHTML = '';
  for (const entryIndex in data.entries) {
    $entryList.appendChild(populateEntries(data.entries[entryIndex]));
  }
}

function viewForm() {
  data.view = 'entry-form';
  $dataView.setAttribute('data-view', 'entry-form');
  $swapView[0].className = 'swap-view';
  $swapView[1].className = 'swap-view hidden';
  $titleText.textContent = 'New Entry';
  $viewForm.className = 'submit-entry hidden';
}

window.addEventListener('DOMContentLoaded', event => {
  if (data.view === 'entries') {
    viewEntries();
  } else if (data.view === 'entry-form') {
    viewForm();
  }
});

function populateEntries(entry) {
  if (entry.length < 1) {
    const noEntries = document.createElement('div');
    noEntries.className = 'p-center';
    const pNoEntries = document.createElement('p');
    pNoEntries.textContent = 'No entries have been recorded';
    noEntries.appendChild(pNoEntries);
    return noEntries;
  }
  const listItem = document.createElement('li');
  listItem.setAttribute('data-entry-id', entry.entryId);

  const flexRowDiv = document.createElement('div');
  flexRowDiv.className = 'flex row';

  const colHalfDiv = document.createElement('div');
  colHalfDiv.className = 'column-half';

  const journalImage = document.createElement('img');
  journalImage.className = 'journal-image';
  journalImage.setAttribute('id', 'display-image');

  colHalfDiv.appendChild(journalImage);
  flexRowDiv.appendChild(colHalfDiv);

  const colHalfFlexColDiv = document.createElement('div');
  colHalfFlexColDiv.className = 'column-half flex flex-col';

  const flexRowDiv2 = document.createElement('div');
  flexRowDiv2.className = 'flex row space-between';

  const entryTitleSpan = document.createElement('span');
  entryTitleSpan.className = 'entry-title';

  const entryEditSpan = document.createElement('span');
  const editIcon = document.createElement('i');
  editIcon.className = 'fas fa-edit';

  entryEditSpan.appendChild(editIcon);
  flexRowDiv2.appendChild(entryTitleSpan);
  flexRowDiv2.appendChild(entryEditSpan);

  const entryNotesP = document.createElement('p');
  entryNotesP.className = 'entry-note';

  colHalfFlexColDiv.appendChild(flexRowDiv2);
  colHalfFlexColDiv.appendChild(entryNotesP);

  flexRowDiv.appendChild(colHalfFlexColDiv);
  listItem.appendChild(flexRowDiv);

  journalImage.setAttribute('src', entry.photoUrl);
  entryTitleSpan.textContent = entry.title;
  entryNotesP.textContent = entry.notes;

  return listItem;
}
