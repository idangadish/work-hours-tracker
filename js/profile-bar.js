fetch('/work-hours-tracker/components/profile-bar.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('profile-bar').innerHTML = data;

    const helloEl = document.querySelector(".welcome");
    const now = new Date();
    const hour = now.getHours(); 

    let greeting = "ברוכים השבים";
    if (hour >= 5 && hour < 12) greeting = "בוקר טוב";
    else if (hour >= 12 && hour < 17) greeting = "צהריים טובים";
    else if (hour >= 17 && hour < 21) greeting = "ערב טוב";
    else greeting = "לילה טוב";

    helloEl.textContent = `${greeting}, ענת`;

    document.getElementById("log-out").onclick = () => {
      window.location.href = "index.html";
    };

    const welcomeDiv = helloEl.parentElement;
    const sidebarContainer = document.getElementById("sidebar-container");

    welcomeDiv.addEventListener("click", () => {
        if (!sidebarContainer.innerHTML.trim()) {
            fetch('sidebar.html')
                .then(res => res.text())
                .then(data => {
                    sidebarContainer.innerHTML = data;
                    sidebarContainer.style.display = 'block'; 
                });
        } else {
            sidebarContainer.style.display = sidebarContainer.style.display === 'block' ? 'none' : 'block';
        }
    });
});
