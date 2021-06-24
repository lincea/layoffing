window.onload = (event) => {
    let navigator = document.querySelector(".lnx-navigator");
    navigator.addEventListener("click", handleNavigatorClick);

    document.onclick = e => {
        if (e.target.classList.contains('lnx-detail-title')) {
            let next = e.target.nextElementSibling;
            if (getComputedStyle(next).display == 'none') {
                next.style.display = 'block';
                e.target.innerText = '隐藏信息'
            } else {
                next.style.display = 'none'
                e.target.innerText = '显示信息'

            }
        }
    };
};

function handleNavigatorClick(event) {
    let li = event.target.closest("li");
    let anchor = li.querySelector("a");
    let result = anchor.innerText.match(/[^\d]*([\d]+)[^\d]*/);
    if (result.length == 2) {
        let day = result[1];
        let dayDiv = document.querySelector(`#day-${day}`);

        let visibleDay = document.querySelector(".lnx-visible");
        if (visibleDay) {
            visibleDay.classList.remove("lnx-visible");
            visibleDay.classList.add("lnx-gone");
        }
        if (dayDiv) {
            dayDiv.classList.add("lnx-visible");
        }
    }
}
