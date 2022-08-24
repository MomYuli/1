const prices = {
    'Landing-Page': {
        pm: 700,
        design: 600,
        developer: 1200,
        qa: 500
    },
    'Online-store': {
        pm: 1200,
        design: 900,
        developer: 2500,
        qa: 800,
    },
    'Web-Application': {
        pm: 2000,
        design:1100,
        developer:3000,
        qa: 1000,
    },
    'Mobile-Application': {
        pm: 3000,
        design: 1500,
        developer: 4000,
        qa: 1300,
    },
};

function getFormValues () {

    const websiteTypeElement = document.querySelector('#Project-type');
    const pmEl = document.querySelector('#Project-management');
    const designEl = document.querySelector('#Design');
    const developerEl = document.querySelector('#Developer');
    const qaEl = document.querySelector('#QA')
    
        console.log(websiteTypeElement.value);
        console.log(pmEl.checked);
        console.log(designEl.checked);
        console.log(developerEl.checked);
        console.log(qaEl.checked);

return {
        websiteType: websiteTypeElement.value,
        pm: pmEl.checked,
        design: designEl.checked,
        developer: developerEl.checked,
        qa: qaEl.checked,
    }
}

function calculateWork(){
const values = getFormValues();

let totalPrice = 0;

const workTypes = prices[values.websiteType]

        if (values.pm) {
            totalPrice = workTypes.pm;
        }

        if (values.design) {
            totalPrice = totalPrice + workTypes.design;
        }

        if (values.developer) {
            totalPrice = totalPrice + workTypes.developer;
        }

        if (values.qa) {
            totalPrice = totalPrice + workTypes.qa;
        }

    const totalPriceEl = document.querySelector('#totalPrice');
    totalPriceEl.textContent = totalPrice;

console.log(totalPrice);
}

const formEl = document.querySelector('#project-price-form')
const emailModal = document.querySelector('#modal-email');
const successModal = document.querySelector('#modal-success');

formEl.addEventListener('change', calculateWork);
formEl.addEventListener('submit', function(event){
    event.preventDefault();

    emailModal.classList.add('modal-active');

});

const closeButtons = document.querySelectorAll('.Modal-close-btn');

closeButtons.forEach( function(closeBtn) { 
closeBtn.addEventListener('click', function() { 

    const inputContainer = document.querySelector('#email-input-container');
    inputContainer.classList.remove('email-input-container-error');

    emailModal.classList.remove('modal-active'); 
    successModal.classList.remove('modal-active'); 
});  
});


const modalEmailContainer = document.querySelector('#modal-email-container');

modalEmailContainer.addEventListener('submit', function (event) {
event.preventDefault();

const userEmailInput = document.querySelector('#user-email');

if (userEmailInput.value) {

    const formData = new FormData(formEl);

    formData.append('Email', userEmailInput.value);

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
    
        .then(function(){
            emailModal.classList.remove('modal-active'); 
            successModal.classList.add('modal-active'); 
        })
        .catch(() => alert('Не вдалося надіслатии форму'))

        return;
    }

const inputContainer = document.querySelector('#email-input-container');

inputContainer.classList.add('email-input-container-error');

});


