document.addEventListener("DOMContentLoaded", () => {

const saveBtn =
document.getElementById("saveDraftButton");

const previewBtn =
document.querySelector(".secondary-button");

const connectBtn =
document.getElementById("connectTikTokButton");

const prepareBtn =
document.querySelector(".primary-button:last-child");

const title =
document.getElementById("title");

const caption =
document.getElementById("caption");

const status =
document.getElementById("statusText");


// LOAD
const saved =
localStorage.getItem("creatorDraft");

if(saved){

const data =
JSON.parse(saved);

title.value =
data.title || "";

caption.value =
data.caption || "";

status.textContent =
"Draft restored.";

}


// SAVE
saveBtn.addEventListener("click",()=>{

localStorage.setItem(
"creatorDraft",

JSON.stringify({

title:title.value,

caption:caption.value

})

);

status.className =
"status-success";

status.textContent =
"✓ Draft saved.";

});


// PREVIEW
previewBtn.addEventListener("click",()=>{

alert(

`Title:
${title.value}

Caption:
${caption.value}`

);

});


// CONNECT
connectBtn.addEventListener("click",()=>{

status.className =
"status-pending";

status.textContent =
"Connecting to TikTok...";

setTimeout(()=>{

window.location.href =
"./auth/tiktok/callback/";

},1200);

});


// PREPARE
prepareBtn.addEventListener("click",()=>{

if(!title.value.trim()){

alert(
"Enter title."
);

return;

}

status.className =
"status-success";

status.textContent =
"✓ Post prepared.";

});

});













// const saveDraftButton = document.querySelector("#saveDraftButton");
// const statusText = document.querySelector("#statusText");
// const readyCount = document.querySelector("#readyCount");
// const checklist = document.querySelectorAll(".checklist input");

// function updateReadyCount() {
//   const checked = Array.from(checklist).filter((item) => item.checked).length;
//   readyCount.textContent = checked >= 3 ? "3" : "2";
// }

// saveDraftButton?.addEventListener("click", () => {
//   statusText.textContent = "Draft saved in this browser preview at " + new Date().toLocaleTimeString() + ".";
// });

// checklist.forEach((item) => {
//   item.addEventListener("change", updateReadyCount);
// });
