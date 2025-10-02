const yearInput = document.getElementById("yearInput");
const currentYear = new Date().getFullYear();

yearInput.max = currentYear;
yearInput.value = currentYear;

yearInput.addEventListener("input", () => {
    populateMonthsTable(parseInt(yearInput.value));
});

function populateMonthsTable(year) {
    const tbody = document.querySelector("#monthsTable tbody");
    tbody.innerHTML = "";

    const today = new Date();
    const currentYearNow = today.getFullYear();
    let currentMonth = 11;
    if (year === currentYearNow) {
        currentMonth = today.getMonth(); 
    }

    for (let month = 1; month <= currentMonth + 1; month++) {
        const tr = document.createElement("tr");

        const monthTd = document.createElement("td");
        monthTd.textContent = `${month}/${year}`;
        tr.appendChild(monthTd);

        const actionTd = document.createElement("td");
        const btn = document.createElement("button");
        btn.className = "btn btn-primary btn-sm";
        btn.textContent = "צפה בדוח";
        btn.addEventListener("click", () => generateMonthlyReport(year, month));
        actionTd.appendChild(btn);
        tr.appendChild(actionTd);

        tbody.appendChild(tr);
    }
}

document.addEventListener("DOMContentLoaded", () => populateMonthsTable(currentYear));
