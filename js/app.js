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
   INITIALIZE APP
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       1. INPUT LISTENERS
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
       5. VIEW SWITCHING (CALCULATOR <-> PRINT LOG)
       ============================================================ */
    const calcView = document.getElementById("calcView");
    const logView  = document.getElementById("logView");

    // Desktop
    document.getElementById("showCalcBtn").addEventListener("click", () => {
        calcView.style.display = "block";
        logView.style.display = "none";
    });

    document.getElementById("showLogBtn").addEventListener("click", () => {
        calcView.style.display = "none";
        logView.style.display = "block";
    });

    // Mobile
    document.getElementById("showCalcBtn_m").addEventListener("click", () => {
        calcView.style.display = "block";
        logView.style.display = "none";
    });

    document.getElementById("showLogBtn_m").addEventListener("click", () => {
        calcView.style.display = "none";
        logView.style.display = "block";
    });

    /* ============================================================
       6. NAVIGATION + DROPDOWNS (ANIMATED)
       ============================================================ */

    /* DESKTOP DROPDOWN (animated) */
    const sessionBtn = document.getElementById("printSessionBtn");
    const sessionMenu = document.getElementById("PrintSessionDiv");

    sessionBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sessionMenu.classList.toggle("show");
    });

    document.addEventListener("click", () => {
        sessionMenu.classList.remove("show");
    });

    /* MOBILE MENU (animated) */
    const menuBtn = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileNav.classList.toggle("show");
    });

    document.addEventListener("click", () => {
        mobileNav.classList.remove("show");
    });

    /* MOBILE DROPDOWN (animated) */
    const sessionBtn_m = document.getElementById("printSessionBtn_m");
    const sessionMenu_m = document.getElementById("PrintSessionDiv_m");

    sessionBtn_m.addEventListener("click", (e) => {
        e.stopPropagation();
        sessionMenu_m.classList.toggle("show");
    });
});
