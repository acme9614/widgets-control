(function () {

  var enableTryOn = true;

  if (!enableTryOn) return;

  // =========================
  // FIND SERVICE CONTAINER
  // =========================
  var containers = document.querySelectorAll("#boxContainer, .grid");

  containers.forEach(function (container) {

    // Prevent duplicate
    if (container.querySelector(".tryon-item")) return;

    // =========================
    // CREATE TRY-ON BOX
    // =========================
    var div = document.createElement("div");
    div.className = "tryon-item cursor-pointer text-center";

    div.innerHTML = `
      <div class="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-black text-white flex items-center justify-center">
        👁️
      </div>
      <p class="mt-2 text-sm font-semibold">Try On</p>
    `;

    // =========================
    // CLICK EVENT
    // =========================
    div.onclick = function () {

      if (document.getElementById("tryon-widget")) return;

      var script = document.createElement("script");
      script.src = "https://your-tryon-widget-url.js"; // 🔁 replace
      script.id = "tryon-widget";

      document.body.appendChild(script);

    };

    // =========================
    // ADD TO UI
    // =========================
    container.appendChild(div);

  });

})();