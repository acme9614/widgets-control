const API_URL = "https://acme9614.github.io/widgets-control/widgets.json";

async function loadWidgets() {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error("Failed to fetch widgets");

        const data = await res.json();

        const gridContainer = document.getElementById("widgetsContainer");
        const drawerContainer = document.getElementById("drawerContainer");

        if (!gridContainer) {
            console.warn("widgetsContainer not found");
            return;
        }

        let gridHTML = "";
        let drawerHTML = "";

        data.widgets.forEach(widget => {

            //  skip disabled
            if (widget.enabled === false) return;

            
            // GRID (cards)
            if (typeof window.renderWidget === "function") {
                gridHTML += window.renderWidget(widget);
            }

        
            // DRAWER (simple text)
            if (drawerContainer && typeof window.renderDrawerItem === "function") {
                drawerHTML += window.renderDrawerItem(widget);
            }

        });

        gridContainer.innerHTML = gridHTML;
        if (drawerContainer) drawerContainer.innerHTML = drawerHTML;

    } catch (error) {
        console.error("Widget Load Error:", error);

        const container = document.getElementById("widgetsContainer");
        if (container) {
            container.innerHTML = "<p style='text-align:center;'>Failed to load widgets</p>";
        }
    }
}

//  Auto load
document.addEventListener("DOMContentLoaded", loadWidgets);