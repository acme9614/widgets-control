const API_URL = "https://acme9614.github.io/widgets-control/widgets.json";

async function loadWidgets() {
  try {
    const res = await fetch(API_URL);

    // Cache fix (important for GitHub Pages)
    if (!res.ok) throw new Error("Failed to fetch widgets");

    const data = await res.json();

    const container = document.getElementById("widgetsContainer");
    const drawerContainer = document.getElementById("drawerContainer");
    if (!container) {
      console.warn("widgetsContainer not found");
      return;
    }

    // Clear old UI
    container.innerHTML = "";

    data.widgets.forEach(widget => {

      // ✅ Skip disabled widgets
      if (widget.enabled === false) return;

      // ✅ Check render function
      if (typeof window.renderWidget !== "function") {
        console.error("renderWidget() not defined in this page");
        return;
      }

      // ✅ Render widget
      const html = window.renderWidget(widget);
      container.innerHTML += html;

       if (drawerContainer) {
        drawerContainer.innerHTML += `
          <a href="#" onclick="${widget.action}()"
             class="block text-lg hover:text-yellow-600">
             ${widget.name}
          </a>
        `;
      }

    });

  } catch (error) {
    console.error("Widget Load Error:", error);

    // Optional fallback UI
    const container = document.getElementById("widgetsContainer");
    if (container) {
      container.innerHTML = "<p style='text-align:center;'>Failed to load widgets</p>";
    }
  }
}

// 🚀 Auto load
document.addEventListener("DOMContentLoaded", loadWidgets);