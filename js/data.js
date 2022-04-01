/* exported data */
const savedDataJSON = localStorage.getItem('code-journal-local-storage');

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

if (savedDataJSON !== null) {
  data = JSON.parse(savedDataJSON);
}

window.addEventListener('beforeunload', event => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', dataJSON);
});
