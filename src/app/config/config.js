const ENV = 'dev';
// const DEV_API_URL = 'http://192.168.1.15:3500/';
const DEV_API_URL = 'http://localhost:3500/';
const PROD_API_URL = 'http://api.exptrackerapp.mkinfopoint.com';

export const API_URL = ENV === 'production' ? PROD_API_URL : DEV_API_URL;
