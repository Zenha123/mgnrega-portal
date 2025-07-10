let notifications = [
  { id: 1, type: "Alert", message: "Water usage nearing limit", date: "2025-07-10", read: false },
  { id: 2, type: "Info", message: "Repair request completed", date: "2025-07-09", read: true },
  { id: 3, type: "Warning", message: "Exceeded maximum runtime", date: "2025-07-08", read: false }
];

function renderNotifications() {
  const tbody = document.getElementById("notificationBody");
  tbody.innerHTML = "";
  notifications.forEach(notif => {
    let row = `<tr class="${notif.read ? '' : 'unread'}">
      <td>${notif.type}</td>
      <td>${notif.message}</td>
      <td>${notif.date}</td>
      <td>
        <button onclick="markRead(${notif.id})">Read</button>
        <button onclick="markUnread(${notif.id})">Unread</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

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
  let rows = document.querySelectorAll("#notificationBody tr");
  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
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
