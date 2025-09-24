let activeItem = null;
export const setDiv = (newItem) => {
  if (newItem != activeItem) {
    if (activeItem) {
      activeItem.style.display = 'none';
    }
    newItem.style.display = 'block';
    activeItem = newItem;
  }
};

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem('token', value);
  } else {
    localStorage.removeItem('token');
  }
};

export let message = null;

import { showJobs, handleJobs } from './jobs.js';
import { showLoginRegister, handleLoginRegister } from './loginRegister.js';
import { handleLogin } from './login.js';
import { handleAddEdit } from './addEdit.js';
import { handleRegister } from './register.js';

document.addEventListener('DOMContentLoaded', () => {
  token = localStorage.getItem('token');
  message = document.getElementById('message');
  handleLoginRegister();
  handleLogin();
  handleJobs();
  handleRegister();
  handleAddEdit();
  if (token) {
    showJobs();
  } else {
    showLoginRegister();
  }
});
