// preload.js
const repo = require("./repo.js");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const dependency of ["chrome", "node", "electron"]) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }

    initUi();
});

function initUi() {
  initUserCreateUi();
}

function initUserCreateUi() {
    let btn = document.querySelector("#user-create-button");

    btn.addEventListener("click", () => {
        let userNameInput = document.querySelector("#user-name");
        let dateOfBirthInput = document.querySelector("#user-date-of-birth");
        let dateOfDeathInput = document.querySelector("#user-date-of-death");
        let genderSelect = document.querySelector("#user-gender");
        let passwordInput = document.querySelector("#user-password");
        let emailAddressInput = document.querySelector("#user-password");
        let homeTelephoneNumber = document.querySelector(
            "#user-home-telephone-number"
        );
        let workTelephoneNumber = document.querySelector(
            "#user-work-telephone-number"
        );
        let mobilePhoneNumber = document.querySelector(
            "#user-mobile-phone-number"
        );
        let avatarUrl = document.querySelector("#user-avatar-url");

        let user = {};
        user.name = userNameInput.value;
        user.dateOfBirth = dateOfBirthInput.value;
        user.dateOfDeath = dateOfDeathInput.value;
        user.gender = genderSelect.value;
        user.password = passwordInput.value;
        user.emailAddress = emailAddressInput.value;
        user.homeTelephoneNumber = homeTelephoneNumber.value;
        user.workTelephoneNumber = workTelephoneNumber.value;
        user.mobilePhoneNumber = mobilePhoneNumber.value;
        user.avatarUrl = avatarUrl.value;

        repo.createUser(user);
    });
}
