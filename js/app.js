import { state } from "./state.js";
import { readInputs, setupEvents, setActiveToggle } from "./ui.js";
import { generateSteps } from "./calculator.js";
import { render } from "./renderer.js";
import { exportPDF } from "./pdf.js";

/* ============================================================
   CORE UPDATE FUNCTION
   ============================================================ */
function update() {
    readInputs();
    state.results = generateSteps(state.settings);
    render(state.results, state.settings);
}

/* ============================================================
   INITIALIZE CALCULATOR + UI
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       1. SET UP INPUT LISTENERS
       ----------------------------- */
    setupEvents(update);

    /* -----------------------------
       2. CARDS / TABLE TOGGLE
       ----------------------------- */
    const cardBtn  = document.getElementById("cardBtn");
    const tableBtn = document.getElementById("tableBtn");

    cardBtn.addEventListener("click", () => {
        state.settings.viewMode = "cards";
        setActiveToggle("cardBtn");
        update();
    });

    tableBtn.addEventListener("click", () => {
        state.settings.viewMode = "table";
        setActiveToggle("tableBtn");
        update();
    });

    /* -----------------------------
       3. EXPORT PDF
       ----------------------------- */
    document.getElementById("exportBtn").addEventListener("click", exportPDF);

    /* -----------------------------
       4. INITIAL CALCULATION
       ----------------------------- */
    update();

    /* ============================================================
       NAVIGATION + DROPDOWNS (your new UI system)
       ============================================================ */

    /* DESKTOP DROPDOWN */
    const sessionBtn = document.getElementById("printSessionBtn");
    const sessionMenu = document.getElementById("PrintSessionDiv");

    sessionBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sessionMenu.classList.toggle("show");
    });

    document.addEventListener("click", () => {
        sessionMenu.classList.remove("show");
    });

    /* MOBILE MENU */
    const menuBtn = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileNav.style.display =
            mobileNav.style.display === "flex" ? "none" : "flex";
    });

    document.addEventListener("click", () => {
        mobileNav.style.display = "none";
    });

    /* MOBILE DROPDOWN */
    const sessionBtn_m = document.getElementById("printSessionBtn_m");
    const sessionMenu_m = document.getElementById("PrintSessionDiv_m");

    sessionBtn_m.addEventListener("click", (e) => {
        e.stopPropagation();
        sessionMenu_m.classList.toggle("show");
    });
});
