document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("hoursTableBody");
    const monthInput = document.getElementById("monthInput");

    function renderTable(year, month) {
        tbody.innerHTML = "";

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);

            if (date.getDay() === 6) {
                 continue;
            }

            const row = document.createElement("tr");

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


            startInput.addEventListener("input", updateSumDay);
            endInput.addEventListener("input", updateSumDay);

            tbody.appendChild(row);



function updateTotalHours() {
    let total = 0;
    document.querySelectorAll("tbody td:last-child").forEach(td => {
        total += parseFloat(td.textContent) || 0;
    });
    document.getElementById("totalHours").textContent = total.toFixed(2);
}

        }

    }
    

    const today = new Date();
    monthInput.value = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}`;
    renderTable(today.getFullYear(), today.getMonth());

    monthInput.addEventListener("input", () => {
        const [year, month] = monthInput.value.split("-").map(Number);
        renderTable(year, month - 1);
    });
});

 const helloEl = document.querySelector(".welcome");
  const now = new Date();
  const hour = now.getHours(); 

  let greeting = "ברוכים השבים";

  if (hour >= 5 && hour < 12) {
      greeting = "בוקר טוב";
  } else if (hour >= 12 && hour < 17) {
      greeting = "צהריים טובים";
  } else if (hour >= 17 && hour < 21) {
      greeting = "ערב טוב";
  } else {
      greeting = "לילה טוב";
  }

  helloEl.textContent = `${greeting}, ענת`;

  document.getElementById("log-out").onclick = function () {
    window.location.href = "index.html";
};

