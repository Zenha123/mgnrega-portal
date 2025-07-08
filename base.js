document.addEventListener("DOMContentLoaded", function () {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const wrapper = document.getElementById("wrapper");

  sidebarToggle.addEventListener("click", function () {
    wrapper.classList.toggle("toggled");
  });
});
