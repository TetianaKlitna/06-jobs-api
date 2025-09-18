import { token } from './index.js';
import { showJobs } from './jobs.js';

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
      message.textContent = 'The Job is deleted';
    } else {
      message.textContent = 'The jobs entry was not found';
    }
  } catch (err) {
    console.log(err);
    message.textContent = 'A communications error has occurred.';
  } finally {
    showJobs();
  }
};
