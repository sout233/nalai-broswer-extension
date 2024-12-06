// src/background.ts

chrome.downloads.onCreated.addListener(async (downloadItem) => {
  console.log("Download attempt blocked:", downloadItem.url);

  const ua = navigator.userAgent;

  const data = {
    browser: {
      browser: "Chrome",
      version: ua
    },
    userAgent: ua,
    downloadUrl: downloadItem.url
  };

  console.log("Sending data to server:", JSON.stringify(data));

  // 发送POST请求到服务器
  fetch("http://localhost:10389/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response)
    .then(data => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // 取消下载
  chrome.downloads.cancel(downloadItem.id);
});