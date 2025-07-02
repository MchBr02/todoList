// src/api/apiClient.js

import { getToken } from '../utils/authToken';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

export const apiClient = async (endpoint, { method = 'GET', headers = {}, body } = {}) => {
  const tokenData = getToken();
  const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  const url = `${API_BASE}${endpoint}`;
  console.log('[API CLIENT] Preparing request');
  console.log('[API REQUEST]', method, url);
  if (token) console.log('[API TOKEN]', token);
  if (body) console.log('[API BODY]', body);

  try {
    const res = await fetch(url, config);
    const contentType = res.headers.get('Content-Type') || '';

    let data;
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      console.warn('[API ERROR]', res.status, data);
      throw new Error(data.message || data || 'API error');
    }

    console.log('[API RESPONSE]', data);
    return data;
  } catch (err) {
    console.error('[API EXCEPTION]', err);
    throw err;
  }
};
