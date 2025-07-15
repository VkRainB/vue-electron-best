import { session } from 'electron';
// { urls: ['https://api.example.com/*', 'https://cdn.example.com/*'] }

export function setWebRequestListener(_win) {
  session.defaultSession.webRequest.onErrorOccurred(
    { urls: ['*://*/*'] }, // 匹配所有协议、所有域名、所有路径
    (details) => {
      // console.log('details', details);
      if (details.error === 'net::ERR_INTERNET_DISCONNECTED') {
        _win.webContents.send('net:disconnect', false);
      }
      // 网络无法联通：'net::ERR_CONNECTION_CLOSED
    }
  );
}
