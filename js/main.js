/* global data */
/* exported data */

const $inputForm = document.querySelector('#entry-form');
const $imageHolder = document.querySelector('#journal-image');

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
