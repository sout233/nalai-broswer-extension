// import type { PlasmoCSConfig } from "plasmo"

// export const config: PlasmoCSConfig = {
//    matches: ["<all_urls>"]
// }

// chrome.downloads.onCreated.addListener(async (downloadItem) => {
//     console.log("Download attempt blocked:", downloadItem.url);

//     const ua = navigator.userAgent;

//     const data = {
//         browser: "Firefox",
//         userAgent: ua,
//         downloadUrl: downloadItem.url
//     };

//     // 发送POST请求到服务器
//     fetch("https://127.0.0.1:10389/download", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log("Success:", data);
//         })
//         .catch((error) => {
//             console.error("Error:", error);
//         });

//     // 取消下载
//     chrome.downloads.cancel(downloadItem.id);
// });