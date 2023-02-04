import { writeFileSync } from 'fs';

const proxyConfig = {
  '/api': {
    target: process.env.API_URL,
    secure: process.env.CLIENT_PROXY_SECURITY === 'true',
    changeOrigin: true,
    ws: true,
    wss: true,
  },
};

writeFileSync('proxy.conf.json', JSON.stringify(proxyConfig, null, 2));
