document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       VIEW SWITCHING (Calculator <-> Print Log)
    ============================================================ */

    const calcView = document.getElementById("calcView");
    const logView  = document.getElementById("logView");

    // Desktop buttons
    const showCalcBtn = document.getElementById("showCalcBtn");
    const showLogBtn  = document.getElementById("showLogBtn");

    // Mobile buttons
    const showCalcBtn_m = document.getElementById("showCalcBtn_m");
    const showLogBtn_m  = document.getElementById("showLogBtn_m");

    function showCalculator() {
        calcView.style.display = "block";
        logView.style.display  = "none";

        if (showCalcBtn) showCalcBtn.classList.add("active");
        if (showLogBtn)  showLogBtn.classList.remove("active");

        if (showCalcBtn_m) showCalcBtn_m.classList.add("active");
        if (showLogBtn_m)  showLogBtn_m.classList.remove("active");
    }

    function showLog() {
        calcView.style.display = "none";
        logView.style.display  = "block";

        if (showCalcBtn) showCalcBtn.classList.remove("active");
        if (showLogBtn)  showLogBtn.classList.add("active");

        if (showCalcBtn_m) showCalcBtn_m.classList.remove("active");
        if (showLogBtn_m)  showLogBtn_m.classList.add("active");
    }

    if (showCalcBtn)   showCalcBtn.addEventListener("click", showCalculator);
    if (showLogBtn)    showLogBtn.addEventListener("click", showLog);
    if (showCalcBtn_m) showCalcBtn_m.addEventListener("click", showCalculator);
    if (showLogBtn_m)  showLogBtn_m.addEventListener("click", showLog);


    /* ============================================================
       DESKTOP DROPDOWN
    ============================================================ */

    const printBtn = document.getElementById("printSessionBtn");
    const printMenu = document.getElementById("PrintSessionDiv");

    if (printBtn && printMenu) {
        printBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            printMenu.classList.toggle("show");
        });
    }


    /* ============================================================
       MOBILE DROPDOWN
    ============================================================ */

    const printBtn_m = document.getElementById("printSessionBtn_m");
    const printMenu_m = document.getElementById("PrintSessionDiv_m");

    if (printBtn_m && printMenu_m) {
        printBtn_m.addEventListener("click", (e) => {
            e.stopPropagation();
            printMenu_m.classList.toggle("show");
        });
    }


    /* ============================================================
       MOBILE MENU TOGGLE (Hamburger)
    ============================================================ */

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav  = document.getElementById("mobileNav");

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileNav.style.display =
                mobileNav.style.display === "flex" ? "none" : "flex";
        });
    }


    /* ============================================================
       CLOSE ALL MENUS WHEN CLICKING OUTSIDE
    ============================================================ */

    document.addEventListener("click", () => {
        if (printMenu)    printMenu.classList.remove("show");
        if (printMenu_m)  printMenu_m.classList.remove("show");
        if (mobileNav)    mobileNav.style.display = "none";
    });

});
