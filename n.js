let notifications = [
  { id: 1, type: "Alert", message: "Water usage nearing limit", date: "2025-07-10", read: false },
  { id: 2, type: "Info", message: "Repair request completed", date: "2025-07-09", read: true },
  { id: 3, type: "Warning", message: "Exceeded maximum runtime", date: "2025-07-08", read: false }
];

function renderNotifications() {
  const body = document.getElementById("notificationBody");
  body.innerHTML = "";
  notifications.forEach(notif => {
    let card = document.createElement("div");
    card.className = `notification-card ${notif.read ? '' : 'unread'}`;
    card.innerHTML = `
      <div class="notification-header">
        <span class="badge ${notif.type}">${notif.type}</span>
        <strong>${notif.message}</strong>
      </div>
      <div class="notification-footer">
        <span class="date">${notif.date}</span>
        <div class="action-buttons">
          <button onclick="markRead(${notif.id})">Read</button>
          <button onclick="markUnread(${notif.id})">Unread</button>
        </div>
      </div>
    `;
    body.appendChild(card);
  });
}






 const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");

sidebarToggle.onclick = function (e) {
  e.stopPropagation();
  if (window.innerWidth < 992) {
    sidebar.classList.toggle("active");
  }
};

document.addEventListener("click", function (e) {
  if (window.innerWidth < 992) {
    if (sidebar.classList.contains("active")) {
      if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
        sidebar.classList.remove("active");
      }
    }
  }
});













function markRead(id) {
  notifications.find(n => n.id === id).read = true;
  renderNotifications();
}

function markUnread(id) {
  notifications.find(n => n.id === id).read = false;
  renderNotifications();
}

function markAllRead() {
  notifications.forEach(n => n.read = true);
  renderNotifications();
}

function sortByDate() {
  notifications.sort((a, b) => new Date(b.date) - new Date(a.date));
  renderNotifications();
}

function searchNotifications() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".notification-card");
  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(input) ? "" : "none";
  });
}

function loadMore() {
  let newId = notifications.length + 1;
  notifications.push({
    id: newId,
    type: "Info",
    message: `New event logged`,
    date: new Date().toISOString().split('T')[0],
    read: false
  });
  renderNotifications();
}

function validateForm() {
  const threshold = document.getElementById("threshold").value;
  if (threshold < 1) {
    alert("Threshold must be at least 1.");
    return false;
  }
  alert("Threshold updated.");
  return true;
}

// Auto-refresh every 30 seconds
setInterval(() => {
  console.log("Auto-refreshing notifications...");
  renderNotifications();
}, 30000);

renderNotifications();
