const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
    const formControl = input.parentElement;
    const smallMessage = formControl.querySelector('small');
    formControl.classList = 'form-control error ';
    smallMessage.innerText = message;
};

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList = 'form-control success';
};

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid');
    }
};

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(
                input,
                `${getFieldName(input)} is required`
            );
        } else {
            showSuccess(input);
        }

    });
};
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);

    } else {
        showSuccess(input);
    }
};
function checkPasswordMatch(pas1, pass2) {
    if (pas1.value !== pass2.value) {
        showError(pas2, 'Password do not match')
    }
};
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};
form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkRequired([userName, email, password, password2]);
    checkLength(userName, 3, 15);
    checkLength(password, 6, 30);
    checkEmail(email);
    checkPasswordMatch(password, password2)
});