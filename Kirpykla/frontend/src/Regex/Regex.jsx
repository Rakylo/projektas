export const validEmail = new RegExp(
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
);

export const validDate = new RegExp(/^(?=.*[0-9])\d{4}-\d{2}-\d{2}$/);

export const validName = new RegExp(/^[a-zA-Z]+$/);

export const validSurname = new RegExp(/^[a-zA-Z]+$/);
