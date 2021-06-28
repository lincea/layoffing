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
    initUserListUi();
    initUserInPageUi();
}

function initUserListUi() {
    let createUserListButton = document.querySelector(
        "#create-user-list-button"
    );
    let day3UserList = document.querySelector("#day-3-user-list tbody");

    createUserListButton.addEventListener("click", () => {
        repo.getUsers((user) => {
            if (user == null) {
                return;
            }

            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.gender}</td>
            <td>${user.emailAddress}</td>
            <td>${user.dateOfBirth}</td>
            <td>${user.dateOfDeath}</td>
            <td>${user.homeTelephoneNumber}</td>
            <td>${user.workTelephoneNumber}</td>
            <td>${user.mobilePhoneNumber}</td>
            <td>${user.avatarUrl}</td>
            <td class="lnx-action-hover"><a class="lnx-action-button lnx-action-button--delete" href="#">删除</a></td>
            <td class="lnx-action-hover"><a href="#" class="lnx-action-button lnx-action-button--edit">编辑</a></td>`;
            day3UserList.append(tr);
        });
    });
}

function renderUserPage(rows) {
    let day4UserList = document.querySelector("#day-4-user-list tbody");

    day4UserList.innerHTML = "";

    rows.forEach((user) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.gender}</td>
        <td>${user.emailAddress}</td>
        <td>${user.dateOfBirth}</td>
        <td>${user.dateOfDeath}</td>
        <td>${user.homeTelephoneNumber}</td>
        <td>${user.workTelephoneNumber}</td>
        <td>${user.mobilePhoneNumber}</td>
        <td>${user.avatarUrl}</td>
        <td class="lnx-action-hover"><a class="lnx-action-button lnx-action-button--delete" href="#">删除</a></td>
        <td class="lnx-action-hover"><a href="#" class="lnx-action-button lnx-action-button--edit">编辑</a></td>`;
        day4UserList.append(tr);
    });
}

function renderPageBars(count, pageSize) {
    let pageBars = document.querySelectorAll("#day-4 .lnx-page-bar");
    pageBars.forEach((pageBar) => {
        let innertHtml = "";
        for (let i = 0; i < Math.ceil(count / pageSize); i++) {
            innertHtml += `<a href='#'>${i + 1}</a>`;
        }

        pageBar.innerHTML = innertHtml;
    });
}

function activatePageNum(pageOffset) {
    let pageBars = document.querySelectorAll('.lnx-page-bar');

    pageBars.forEach(pageBar => {
        let activeAnchor = pageBar.querySelector(".lnx-active");
        if (activeAnchor) activeAnchor.classList.remove("lnx-active");
        let anchor = pageBar.querySelector(`a:nth-child(${pageOffset})`);
        anchor.classList.add("lnx-active");

    });

}

function initUserInPageUi() {
    repo.getUserCount()
        .then((row) => {
            renderPageBars(row.count, 5);
        })
        .catch((err) => {});

    let pageBar = document.querySelector(".lnx-page-bar");
    pageBar.addEventListener("click", (e) => {
        let anchor = e.target.closest("a");
        if (!anchor) {
            return;
        }

        let pageNum = parseInt(anchor.innerText);
        repo.getUsersInPage(5, pageNum - 1)
            .then((rows) => {
                renderUserPage(rows);
                activatePageNum(pageNum);
            })
            .catch((err) => {});
    });

    repo.getUsersInPage(5, 0)
        .then((rows) => {
            renderUserPage(rows);
            activatePageNum(1);
        })
        .catch((err) => {});
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
