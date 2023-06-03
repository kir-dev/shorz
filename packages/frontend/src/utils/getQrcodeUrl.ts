import { API_BASE_URL } from '../config/environment.config';

export function getQrcodeUrl(data: string, scale = 10) {
  const url = new URL(API_BASE_URL + '/qrcode');
  url.searchParams.append('data', data);
  url.searchParams.append('scale', scale.toString());
  console.log(url);
  return url.toString();
}
