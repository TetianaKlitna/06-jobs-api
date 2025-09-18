import { inputEnabled, setDiv, token, message, enableInput } from './index.js';
import { showJobs } from './jobs.js';

let addEditDiv = null;
let company = null;
let position = null;
let status = null;
let workMode = null;
let jobType = null;
let location = null;
let salaryMin = null;
let salaryMax = null;
let salaryCurrency = null;
let appliedDate = null;
let addingJob = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById('edit-job');
  company = document.getElementById('company');
  position = document.getElementById('position');
  status = document.getElementById('status');
  workMode = document.getElementById('workMode');
  jobType = document.getElementById('jobType');
  location = document.getElementById('location');
  salaryMin = document.getElementById('salaryMin');
  salaryMax = document.getElementById('salaryMax');
  salaryCurrency = document.getElementById('salaryCurrency');
  appliedDate = document.getElementById('appliedDate');
  addingJob = document.getElementById('adding-job');
  const editCancel = document.getElementById('edit-cancel');

  addEditDiv.addEventListener('click', async (e) => {
    if (inputEnabled && e.target.nodeName === 'BUTTON') {
      if (e.target === addingJob) {
        enableInput(false);

        let method = 'POST';
        let url = '/api/v1/jobs';

        if (addingJob.textContent === 'update') {
          method = 'PATCH';
          url = `/api/v1/jobs/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              company: company.value,
              position: position.value,
              status: status.value,
              workMode: workMode.value,
              jobType: jobType.value,
              location: location.value,
              salaryRange: {
                min: Number(salaryMin.value),
                max: Number(salaryMax.value),
                currency: salaryCurrency.value,
              },
              appliedDate: new Date(appliedDate.value).toISOString(),
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = 'The job entry was updated.';
            } else {
              // a 201 is expected for a successful create
              message.textContent = 'The job entry was created.';
            }

            company.value = '';
            position.value = '';
            status.value = 'pending';
            workMode.value = 'onsite';
            jobType.value = 'full-time';
            location.value = 'remote';
            salaryMin.value = '80000';
            salaryMax.value = '120000';
            salaryCurrency.value = 'USD';
            appliedDate.value = new Date().toISOString().split('T')[0];

            showJobs();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = 'A communication error occurred.';
        }
        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = '';
        showJobs();
      }
    }
  });
};

export const showAddEdit = async (jobId) => {
  if (!jobId) {
    company.value = '';
    position.value = '';
    status.value = 'pending';
    workMode.value = 'onsite';
    jobType.value = 'full-time';
    location.value = 'remote';
    salaryMin.value = '80000';
    salaryMax.value = '120000';
    salaryCurrency.value = 'USD';
    appliedDate.value = new Date().toISOString().split('T')[0];
    addingJob.textContent = 'add';
    message.textContent = '';

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/jobs/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        company.value = data.job.company;
        position.value = data.job.position;
        status.value = data.job.status;
        workMode.value = data.job.workMode;
        jobType.value = data.job.jobType;
        location.value = data.job.location;
        salaryMin.value = data.job.salaryRange.min;
        salaryMax.value = data.job.salaryRange.max;
        salaryCurrency.value = data.job.salaryRange.currency;
        appliedDate.value = data.job.appliedDate.split('T')[0];
        addingJob.textContent = 'update';
        message.textContent = '';
        addEditDiv.dataset.id = jobId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = 'The jobs entry was not found';
        showJobs();
      }
    } catch (err) {
      console.log(err);
      message.textContent = 'A communications error has occurred.';
      showJobs();
    }

    enableInput(true);
  }
};
