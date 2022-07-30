export async function myFetch(url, method = 'GET', data = null) {
  try {
    const options = {
      headers: { 'Content-Type': 'application/json' },
    };
    options.method = method === 'POST' ? 'POST' : 'GET';
    options.body = data ? JSON.stringify(data) : null;
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetch error', error);
  }
}
//-------------------------------------------------------post
export async function myFetchAuth(url, token, newAddObj) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAddObj),
    };
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetchAuth error', error);
  }
}
//-----------------------------------------------------get
export async function getFetchAuth(url, token) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('getFetchAuth error', error);
  }
}
//---------------------------------------------------del
export async function deleteFetchAuth(url, token) {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('deleteFetchAuth error', error);
  }
}
//---------------------------------------------------Like-dislike
export async function fetchLikes(url, token, newAddObj) {
  try {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAddObj),
    };
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('fetchLikes error', error);
  }
}
//-------------------------------------------------------

export const baseUrl = process.env.REACT_APP_BACKEND_URL;

if (!baseUrl) throw new Error('baseUrl nerastas');
