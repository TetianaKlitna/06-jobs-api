import { token } from './index.js';
import { showJobs } from './jobs.js';
import { ERR_MESSAGES, SUCCESS_MESSAGES } from './constants.js';

export const deleteJob = async (jobId) => {
  try {
    const response = await fetch(`/api/v1/jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    await response.json();
    if (response.status === 200) {
      message.textContent = SUCCESS_MESSAGES.RESOURCE_DELETED;
    } else {
      message.textContent = ERR_MESSAGES.NOT_FOUND;
    }
  } catch (err) {
    console.log(err);
    message.textContent = ERR_MESSAGES.COMMUNICATION;
  } finally {
    showJobs();
  }
};
