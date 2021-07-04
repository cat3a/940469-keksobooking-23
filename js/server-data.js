//TODO: Модуль для обмена данными по сети.

const createFetch = (onSuccess, onError) => () => fetch(
  'https://23.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((json) => {
    onSuccess(json);
  })
  .catch((error) => {
    onError(error);
  });

export {createFetch};
