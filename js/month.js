document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("hoursTableBody");
    const monthInput = document.getElementById("monthInput");

function renderTable(year, month) {
    tbody.innerHTML = "";

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0,0,0,0);

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        date.setHours(0,0,0,0); 

        if (date.getDay() === 6) continue; 

        const row = document.createElement("tr");

        if (date < today) {
            row.style.backgroundColor = "#e0e0e0";
            row.style.color = "#555";
        }

        const dateCell = document.createElement("td");
        dateCell.textContent = `${day}/${month + 1}`;
        row.appendChild(dateCell);

        const dayCell = document.createElement("td");
        dayCell.textContent = date.toLocaleDateString('he-IL', { weekday: 'long' });
        row.appendChild(dayCell);

        const startCell = document.createElement("td");
        const startInput = document.createElement("input");
        startInput.type = "text";
        startInput.value = "00:00";
        startInput.placeholder = "HH:MM";
        startInput.maxLength = 5;
        startCell.appendChild(startInput);
        row.appendChild(startCell);

        const endCell = document.createElement("td");
        const endInput = document.createElement("input");
        endInput.type = "text";
        endInput.value = "00:00";
        endInput.placeholder = "HH:MM";
        endInput.maxLength = 5;
        endCell.appendChild(endInput);
        row.appendChild(endCell);

        const actionCell = document.createElement("td");
        const startBtn = document.createElement("button");
        startBtn.textContent = "התחל עבודה";
        const endBtn = document.createElement("button");
        endBtn.textContent = "סיים עבודה";
        endBtn.disabled = true;
        actionCell.appendChild(startBtn);
        actionCell.appendChild(endBtn);
        row.appendChild(actionCell);

        const sumCell = document.createElement("td");
        sumCell.textContent = "0";
        row.appendChild(sumCell);

        function calculateHours(start, end) {
            if (!start || !end) return 0;
            const [startH, startM] = start.split(":").map(Number);
            const [endH, endM] = end.split(":").map(Number);
            return ((endH + endM / 60) - (startH + startM / 60)).toFixed(2);
        }

        function updateSumDay() {
            sumCell.textContent = calculateHours(startInput.value, endInput.value);
            updateTotalHours();
        }

        startBtn.addEventListener("click", () => {
            const now = new Date();
            startInput.value = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
            startBtn.disabled = true;
            endBtn.disabled = false;
            updateSumDay();
        });

        endBtn.addEventListener("click", () => {
            const now = new Date();
            endInput.value = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
            endBtn.disabled = true;
            updateSumDay();
        });

        startInput.addEventListener("input", updateSumDay);
        endInput.addEventListener("input", updateSumDay);

        if (date < today) {
            startInput.disabled = true;
            endInput.disabled = true;
            startBtn.disabled = true;
            endBtn.disabled = true;
        }

        tbody.appendChild(row);
    }
}

    
    const today = new Date();
    monthInput.value = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}`;
    monthInput.max = monthInput.value;

    renderTable(today.getFullYear(), today.getMonth());

    monthInput.addEventListener("input", () => {
        const [year, month] = monthInput.value.split("-").map(Number);
        renderTable(year, month - 1);
    });
});

const workData = []; 

function collectData() {
    workData.length = 0;
    document.querySelectorAll("#hoursTableBody tr").forEach(row => {
        const cells = row.querySelectorAll("td");
        const date = cells[0].textContent;
        const start = cells[2].querySelector("input").value;
        const end = cells[3].querySelector("input").value;
        const sum = parseFloat(cells[5].textContent);
        workData.push({ date, start, end, sum });
    });
}
function calculateTotals() {
    collectData();
    let totalHours = 0;
    let overtime = 0;

    workData.forEach(item => {
        totalHours += item.sum;
        if (item.sum > 8) {
            overtime += (item.sum - 8);
        }
    });

    console.log("סה\"כ שעות:", totalHours.toFixed(2));
    console.log("סה\"כ שעות נוספות:", overtime.toFixed(2));
}
function downloadCSV() {
    collectData();
    let csv = "תאריך,שעת התחלה,שעת סיום,סה\"כ שעות\n";
    workData.forEach(item => {
        csv += `${item.date},${item.start},${item.end},${item.sum}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.csv";
    link.click();
}



