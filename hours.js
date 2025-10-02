
document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("hoursTableBody"); 

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); 

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month + 1, day);

        const row = document.createElement("tr");

        // עמודת תאריך
        const dateCell = document.createElement("td");
        dateCell.textContent = `${day}/${month}`;
        row.appendChild(dateCell);

        // עמודת יום בשבוע
        const dayCell = document.createElement("td");
        dayCell.textContent = date.toLocaleDateString('he-IL', { weekday: 'long' });
        row.appendChild(dayCell);

        // עמודת שעת התחלה
        const startCell = document.createElement("td");
        const startInput = document.createElement("input");
        startInput.type = "time";
        startCell.appendChild(startInput);
        row.appendChild(startCell);

        // עמודת שעת סיום
        const endCell = document.createElement("td");
        const endInput = document.createElement("input");
        endInput.type = "time";
        endCell.appendChild(endInput);
        row.appendChild(endCell);

        tbody.appendChild(row);
    }
});
