// src/background.ts

async function constructDownloadData(downloadItem: { url: string }) {
  const ua = navigator.userAgent;
  const language = navigator.language || navigator.language;

  // 使用fetch API获取尽可能多的响应头
  let headers: Record<string, string> = {};
  try {
    const response = await fetch(downloadItem.url, { method: 'HEAD' });
    const allHeaders = response.headers.entries();
    for (let [key, value] of allHeaders) {
      if (value) {
        headers[key] = value;
      }
    }
  } catch (error) {
    console.error('Failed to fetch headers:', error);
  }

  // 构建data对象
  const data = {
    version: process.env.PLASMO_PUBLIC_NALAI_PROTOCOL_VERSION || 'unknown',
    browser: {
      name: process.env.PLASMO_BROWSER.toLowerCase() || 'unknown',
      headers: {
        "User-Agent": ua,
        "Accept-Language": language,
        "headers": headers // 包含从服务器获取的所有响应头
      }
    },
    url: downloadItem.url,
  };

  return data;
}

chrome.downloads.onCreated.addListener(async (downloadItem) => {
  console.log("Download attempt blocked:", downloadItem.url);

  chrome.downloads.cancel(downloadItem.id);

  const data = await constructDownloadData(downloadItem);

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
});