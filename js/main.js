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
const $deleteEntry = document.getElementById('delete-entry');
const $deleteCancel = document.getElementById('delete-cancel');
const $deleteConfirm = document.getElementById('delete-confirm');
const $deleteModal = document.getElementById('delete-modal');

$inputForm.addEventListener('input', event => {
  if (event.target.getAttribute('id') === 'image-url') {
    $imageHolder.setAttribute('src', event.target.value);
  }
});

$inputForm.addEventListener('submit', event => {
  event.preventDefault();
  if (data.editing === null) {
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
  } else if (data.editing) {
    for (const entryIndex of data.entries) {
      if (entryIndex.entryId === data.editing.entryId) {
        entryIndex.title = $inputForm[0].value;
        entryIndex.photoUrl = $inputForm[1].value;
        entryIndex.notes = $inputForm[2].value;
      }
    }
    data.editing = null;
    $imageHolder.setAttribute('src', './images/placeholder-image-square.jpg');
    $inputForm.reset();
    viewEntries();
  }
});

$deleteCancel.addEventListener('click', event => {
  $deleteModal.className = 'delete-modal hidden';
});

$deleteConfirm.addEventListener('click', event => {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
      data.editing = null;
      $deleteModal.className = 'delete-modal hidden';
      viewEntries();
      return;
    }
  }
});

$deleteEntry.addEventListener('click', event => {
  $deleteModal.className = 'delete-modal';
});

$viewEntries.addEventListener('click', viewEntries);

$viewForm.addEventListener('click', viewForm);

$entryList.addEventListener('click', event => {
  if (event.target.className !== 'fas fa-edit entry-edit') {
    return;
  } else if (event.target.className === 'fas fa-edit entry-edit') {
    const dataEntryId = parseInt(event.target.getAttribute('data-entry-id'));
    viewForm();
    $titleText.textContent = 'Edit Entry';
    for (const entryIndex of data.entries) {
      if (entryIndex.entryId === dataEntryId) {
        data.editing = entryIndex;
      }
    }
  }
  $inputForm[0].value = data.editing.title;
  $inputForm[1].value = data.editing.photoUrl;
  $inputForm[2].value = data.editing.notes;
  $imageHolder.setAttribute('src', data.editing.photoUrl);
  $deleteEntry.textContent = 'Delete Entry';
});

function viewEntries() {
  data.view = 'entries';
  $dataView.setAttribute('data-view', 'entries');
  $swapView[0].className = 'swap-view hidden';
  $swapView[1].className = 'swap-view';
  $titleText.textContent = 'Entries';
  $viewForm.className = 'submit-entry';
  $entryList.innerHTML = '';
  for (const entryIndex of data.entries) {
    $entryList.appendChild(populateEntries(entryIndex));
  }
}

function viewForm() {
  data.view = 'entry-form';
  $dataView.setAttribute('data-view', 'entry-form');
  $swapView[0].className = 'swap-view';
  $swapView[1].className = 'swap-view hidden';
  $titleText.textContent = 'New Entry';
  $viewForm.className = 'submit-entry hidden';
  $deleteEntry.textContent = '';
  $inputForm.reset();
}

window.addEventListener('DOMContentLoaded', event => {
  if (data.view === 'entries') {
    viewEntries();
  } else if (data.view === 'entry-form') {
    viewForm();
  }
  $deleteModal.className = 'delete-modal hidden';
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
  flexRowDiv2.className = 'space-between';

  const entryTitleSpan = document.createElement('span');
  entryTitleSpan.className = 'entry-title';

  const entryEditSpan = document.createElement('span');
  const editIcon = document.createElement('i');
  editIcon.className = 'fas fa-edit entry-edit';
  editIcon.setAttribute('data-entry-id', entry.entryId);

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
