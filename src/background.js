// background.js

// 监听下载创建事件
chrome.downloads.onCreated.addListener((downloadItem) => {
  // 构造下载信息的 URL 参数
  const url = new URL('http://127.0.0.1:13088/download');
  url.searchParams.append('url', encodeURIComponent(downloadItem.url));
  url.searchParams.append('filename', encodeURIComponent(downloadItem.filename));

  // 发送 HTTP 请求到本地服务器
  sendToExternalDownloader(url.toString());

  // 取消默认下载行为
  chrome.downloads.cancel(downloadItem.id);
});

async function sendToExternalDownloader(requestUrl) {
  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      console.error('Failed to send download request:', response.statusText);
    } else {
      console.log('Download request sent successfully.');
    }
  } catch (error) {
    console.error('Error sending download request:', error);
  }
}