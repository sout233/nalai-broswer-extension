// src/background.ts

import { info } from "~configs/info";

// 存储下载项ID到请求头的映射
const downloadHeadersMap: Map<string, Record<string, string>> = new Map();

// 监听所有下载请求的请求头
chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (details.type === 'main_frame' || details.type === 'xmlhttprequest') {
      const headers: Record<string, string> = {};
      for (let header of details.requestHeaders) {
        headers[header.name] = header.value || '';
      }
      // 将请求头存储到映射中，使用URL作为键
      downloadHeadersMap.set(details.url || "unknown", headers);
      console.log("GOT HEADERS: ",details.url, headers);
    }
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders"]
);

async function getRefererForTab(tabId: number): Promise<string | undefined> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      return tab.url;
    }
  } catch (error) {
    console.error('Failed to get referer:', error);
  }
  return undefined;
}

async function constructDownloadData(downloadItem: { url: string, id: number }) {
  const ua = navigator.userAgent;
  const language = navigator.language;

  // 从映射中获取对应的请求头
  let headers: Record<string, string> = {};
  if (downloadHeadersMap.has(downloadItem.url)) {
    headers = downloadHeadersMap.get(downloadItem.url)!;
    console.log("Headers for downloadItem", downloadItem.url, ":", headers);
  }

  const referer = await getRefererForTab(downloadItem.id);

  // 手动添加缺失的请求头
  headers = {
    ...headers,
    "Host": new URL(downloadItem.url).hostname, 
    "Referer": referer || document.referrer,
  };

  // 构建data对象
  const data = {
    version: info.protcolVersion.toString() || 'unknown',
    browser: {
      name: process.env.PLASMO_BROWSER.toLowerCase() || 'unknown',
      headers: {
        "User-Agent": ua,
        "Accept-Language": language,
        ...headers // 包含从请求中获取的所有请求头
      }
    },
    url: downloadItem.url,
  };

  return data;
}
chrome.downloads.onCreated.addListener(async (downloadItem) => {
  console.log("Download attempt blocked:", downloadItem.url);

  chrome.downloads.cancel(downloadItem.id);

  const data = await constructDownloadData({ url: downloadItem.url, id: downloadItem.id });

  console.log("Sending data to server:", data);

  // 发送POST请求到服务器
  fetch("http://localhost:10389/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});