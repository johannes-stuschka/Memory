export function initSettings() {
  changePreview();
}

function changePreview() {
  const form = document.querySelector<HTMLFormElement>(".settings__options");
  console.log(form);
  const preview = document.querySelector<HTMLImageElement>(".settings__theme-visual");
  console.log(preview);
}
