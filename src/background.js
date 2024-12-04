chrome.downloads.onCreated.addListener(function(downloadItem) {
    console.log('Download started:', downloadItem.url);
    // 在这里可以处理下载事件，例如阻止下载
    if (shouldBlockDownload(downloadItem.url)) {
      chrome.downloads.cancel(downloadItem.id);
    }
  });
  
  function shouldBlockDownload(url) {
    // 定义应该拦截的URL规则
    return url.includes('example.com');
  }