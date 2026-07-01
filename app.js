document.addEventListener("DOMContentLoaded", () => {

const saveBtn =
document.getElementById("saveDraftButton");

const previewBtn =
document.getElementById("previewButton");

const connectBtn =
document.getElementById("connectTikTokButton");

const prepareBtn =
document.getElementById("preparePostButton");

const title =
document.getElementById("title");

const caption =
document.getElementById("caption");

const video =
document.getElementById("videoUpload");

const status =
document.getElementById("statusText");



// LOAD SAVED DRAFT

const saved =
localStorage.getItem("creatorDraft");

if(saved){

const data =
JSON.parse(saved);

title.value =
data.title || "";

caption.value =
data.caption || "";

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

window.location.href =
"./auth/tiktok/callback/";

});




// PREPARE + UPLOAD

prepareBtn.addEventListener("click", async ()=>{

if(!video.files.length){

alert(
"Select a video first."
);

return;

}

status.textContent =
"Uploading…";

const data =
new FormData();

data.append(
"video",
video.files[0]
);

try{

const res =
await fetch(

"http://127.0.0.1:5001/upload",

{

method:"POST",

body:data

}

);

const json =
await res.json();

await fetch(
"http://127.0.0.1:5001/draft",

{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

title:title.value,

caption:caption.value,

schedule:
document
.getElementById(
"schedule"
).value,

video:
json.filename

})

}
);

if(json.success){

status.textContent =
`✓ Uploaded: ${json.filename}`;

}else{

status.textContent =
"Upload failed";

}

}catch(err){

status.textContent =
"Backend unavailable";

}

});

});

const loginForm =
document.getElementById(
"loginForm"
);

if(loginForm){

loginForm.addEventListener(
"submit",

(e)=>{

e.preventDefault();

const email =
document
.getElementById(
"email"
)
.value;

localStorage.setItem(
"user",
email
);

window.location.href =
"./dashboard.html";

}

);

}



const user =
localStorage.getItem(
"user"
);

const heading =
document.getElementById(
"workspace-title"
);

if(
user &&
heading
){

heading.textContent =

`Welcome ${user}`;

}

























// document.addEventListener("DOMContentLoaded", () => {

// const saveBtn =
// document.getElementById("saveDraftButton");

// const previewBtn =
// document.querySelector(".secondary-button");

// const connectBtn =
// document.getElementById("connectTikTokButton");

// const prepareBtn =
// document.querySelector(".primary-button:last-child");

// const title =
// document.getElementById("title");

// const caption =
// document.getElementById("caption");

// const status =
// document.getElementById("statusText");


// // LOAD
// const saved =
// localStorage.getItem("creatorDraft");

// if(saved){

// const data =
// JSON.parse(saved);

// title.value =
// data.title || "";

// caption.value =
// data.caption || "";

// status.textContent =
// "Draft restored.";

// }


// // SAVE
// saveBtn.addEventListener("click",()=>{

// localStorage.setItem(
// "creatorDraft",

// JSON.stringify({

// title:title.value,

// caption:caption.value

// })

// );

// status.className =
// "status-success";

// status.textContent =
// "✓ Draft saved.";

// });


// // PREVIEW
// previewBtn.addEventListener("click",()=>{

// alert(

// `Title:
// ${title.value}

// Caption:
// ${caption.value}`

// );

// });


// // CONNECT
// connectBtn.addEventListener("click",()=>{

// status.className =
// "status-pending";

// status.textContent =
// "Connecting to TikTok...";

// setTimeout(()=>{

// window.location.href =
// "./auth/tiktok/callback/";

// },1200);

// });


// // PREPARE
// prepareBtn.addEventListener("click",()=>{

// if(!title.value.trim()){

// alert(
// "Enter title."
// );

// return;

// }

// status.className =
// "status-success";

// status.textContent =
// "✓ Post prepared.";

// });

// });













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
