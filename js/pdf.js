import { state } from "./state.js";

export function exportPDF() {
  const { settings } = state;
  const mode = settings.viewMode;

  const source =
    mode === "table"
      ? document.getElementById("tableContainer")
      : document.getElementById("panel");

  if (!source) {
    alert("Nothing to export — render view first.");
    return;
  }

  const clone = source.cloneNode(true);

  // Gather current values directly from the UI
  const baseTime  = document.getElementById("baseTime")?.value || settings.baseTime;
  const increment = document.getElementById("increment")?.value || settings.increment;
  const steps     = document.getElementById("steps")?.value || settings.steps;

  // --- Build a header with all settings ---
  const headerBlock = `
    <header style="background:#fff;color:#000;padding:16px;border:1px solid #333;margin-bottom:20px;">
      <h2 style="margin:0 0 8px 0;text-align:center;">F‑Stop ${mode === "table" ? "Table" : "Card"} View</h2>
      <div style="font-size:16px;line-height:1.5;">
        <b>Print Settings</b><br>
        Base Time: ${baseTime}s<br>
        F‑Stop Increment: ${increment}<br>
        Steps: ${steps}<br>
        Display Mode: ${mode.charAt(0).toUpperCase() + mode.slice(1)}
      </div>
    </header>
  `;

  // Open print window
  const win = window.open("", "", "width=1000,height=800");

  const html = `
    <html>
    <head>
      <title>F‑Stop Darkroom Export</title>
      <link rel="stylesheet" href="css/styles.css">
      <style>
        body {
          background:#111;
          color:#eee;
          font-family:Arial, sans-serif;
          padding:20px;
        }
        header {
          page-break-inside: avoid;
        }
        @media print {
          body { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
        }
      </style>
    </head>
    <body>
      ${headerBlock}
      ${clone.outerHTML}
      <script>window.onload = () => window.print();<\/script>
    </body>
    </html>
  `;

  win.document.open();
  win.document.write(html);
  win.document.close();
}
