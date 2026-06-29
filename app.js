const saveDraftButton = document.querySelector("#saveDraftButton");
const statusText = document.querySelector("#statusText");
const readyCount = document.querySelector("#readyCount");
const checklist = document.querySelectorAll(".checklist input");

function updateReadyCount() {
  const checked = Array.from(checklist).filter((item) => item.checked).length;
  readyCount.textContent = checked >= 3 ? "3" : "2";
}

saveDraftButton?.addEventListener("click", () => {
  statusText.textContent = "Draft saved in this browser preview at " + new Date().toLocaleTimeString() + ".";
});

checklist.forEach((item) => {
  item.addEventListener("change", updateReadyCount);
});
