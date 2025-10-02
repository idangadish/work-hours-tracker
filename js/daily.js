// קביעת תאריך ויום אוטומטית
const dateInput = document.getElementById("date");
const dayInput = document.getElementById("day");

const today = new Date();
const options = { weekday: 'long' }; 
const dayName = today.toLocaleDateString('he-IL', options);

dateInput.value = today.toISOString().split('T')[0]; 
dayInput.value = dayName;

// השדות לא ניתנים לעריכה
dateInput.readOnly = true;
dayInput.readOnly = true;
