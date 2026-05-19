import { state } from "./state.js";
import { readInputs, setupEvents, setActiveToggle } from "./ui.js";
import { generateSteps } from "./calculator.js";
import { render } from "./renderer.js";
import { exportPDF } from "./pdf.js";

/* ============================================================
   CORE UPDATE
   ============================================================ */
function update() {
    readInputs();
    state.results = generateSteps(state.settings);
    render(state.results, state.settings);
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    /* INPUT LISTENERS */
    setupEvents(update);

    /* CARDS / TABLE TOGGLE */
    document.getElementById("cardBtn").addEventListener("click", () => {
        state.settings.viewMode = "cards";
        setActiveToggle("cardBtn");
        update();
    });

    document.getElementById("tableBtn").addEventListener("click", () => {
        state.settings.viewMode = "table";
        setActiveToggle("tableBtn");
        update();
    });

    /* EXPORT PDF */
    document.getElementById("exportBtn").addEventListener("click", exportPDF);

    /* INITIAL RENDER */
    update();

    /* ============================================================
       VIEW SWITCHING (CALC <-> LOG)
       ============================================================ */
    const calcView = document.getElementById("calcView");
    const logView  = document.getElementById("logView");

    function setActiveView(btnId) {
        document.querySelectorAll("#showCalcBtn, #showLogBtn").forEach(btn =>
            btn.classList.remove("active")
        );
        document.getElementById(btnId).classList.add("active");
    }

    // Desktop
    document.getElementById("showCalcBtn").addEventListener("click", () => {
        calcView.style.display = "block";
        logView.style.display = "none";
        setActiveView("showCalcBtn");
    });

    document.getElementById("showLogBtn").addEventListener("click", () => {
        calcView.style.display = "none";
        logView.style.display = "block";
        setActiveView("showLogBtn");
    });

    // Mobile
    document.getElementById("showCalcBtn_m").addEventListener("click", () => {
        calcView.style.display = "block";
        logView.style.display = "none";
        setActiveView("showCalcBtn");
    });

    document.getElementById("showLogBtn_m").addEventListener("click", () => {
        calcView.style.display = "none";
        logView.style.display = "block";
        setActiveView("showLogBtn");
    });

    /* ============================================================
       DESKTOP DROPDOWN (ANIMATED)
       ============================================================ */
    const sessionBtn = document.getElementById("printSessionBtn");
    const sessionMenu = document.getElementById("PrintSessionDiv");

    sessionBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sessionMenu.classList.toggle("show");
    });

    document.addEventListener("click", () => {
        sessionMenu.classList.remove("show");
    });

    /* ============================================================
       MOBILE MENU (ANIMATED)
       ============================================================ */
    const menuBtn = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileNav.classList.toggle("show");
    });

    document.addEventListener("click", () => {
        mobileNav.classList.remove("show");
    });

    /* ============================================================
       MOBILE DROPDOWN (ANIMATED)
       ============================================================ */
    const sessionBtn_m = document.getElementById("printSessionBtn_m");
    const sessionMenu_m = document.getElementById("PrintSessionDiv_m");

    sessionBtn_m.addEventListener("click", (e) => {
        e.stopPropagation();
        sessionMenu_m.classList.toggle("show");
    });
});
