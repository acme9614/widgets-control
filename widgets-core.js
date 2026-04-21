const API_URL = "https://acme9614.github.io/widgets-control/widgets.json";

async function loadWidgets() {
  try {
    const res = await fetch(API_URL);

    // Cache fix (important for GitHub Pages)
    if (!res.ok) throw new Error("Failed to fetch widgets");

    const data = await res.json();

    const container = document.getElementById("servicesContainer");
    if (!container) {
      console.warn("servicesContainer not found");
      return;
    }

    // Clear old UI
    container.innerHTML = "";

    data.services.forEach(service => {

      // ✅ Skip disabled widgets
      if (service.enabled === false) return;

      // ✅ Check render function
      if (typeof window.renderService !== "function") {
        console.error("renderService() not defined in this page");
        return;
      }

      // ✅ Render widget
      const html = window.renderService(service);
      container.innerHTML += html;

    });

  } catch (error) {
    console.error("Widget Load Error:", error);

    // Optional fallback UI
    const container = document.getElementById("servicesContainer");
    if (container) {
      container.innerHTML = "<p style='text-align:center;'>Failed to load services</p>";
    }
  }
}

// 🚀 Auto load
document.addEventListener("DOMContentLoaded", loadWidgets);