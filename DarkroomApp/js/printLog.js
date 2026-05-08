// --- printLog.js -------------------------------------------------
export function initPrintLog() {
  // --- Save new entry ---
  const saveBtn = document.getElementById("saveLogBtn");
  if (!saveBtn) {
    console.warn("Print log element IDs not found — skipping initialization.");
    return;
  }

  saveBtn.addEventListener("click", () => {
    const title = document.getElementById("logTitle").value.trim();
    const notes = document.getElementById("logNotes").value.trim();

    if (!title && !notes) return;

    const entry = {
      id: Date.now(),
      title,
      notes,
      date: new Date().toLocaleString(),
    };

    const logs = getLogs();
    logs.push(entry);
    localStorage.setItem("printLogs", JSON.stringify(logs));

    // Reset form
    document.getElementById("logTitle").value = "";
    document.getElementById("logNotes").value = "";

    renderLogs();
  });

  // Initial render
  renderLogs();
}

// --- Helpers ---
function getLogs() {
  return JSON.parse(localStorage.getItem("printLogs") || "[]");
}

function renderLogs() {
  const list = document.getElementById("logList");
  if (!list) return;

  list.innerHTML = "";
  const logs = getLogs().sort((a, b) => b.id - a.id);

  logs.forEach(log => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${log.title || "(untitled)"}</b><br>
      <small>${log.date}</small><br>
      ${log.notes.replace(/\n/g, "<br>")}
      <div class="log-actions" style="margin-top:6px;">
        <button class="edit-btn" data-id="${log.id}">Edit</button>
        <button class="delete-btn" data-id="${log.id}">Delete</button>
      </div>
      <hr>
    `;
    list.appendChild(li);
  });

  // Attach event handlers
  list.querySelectorAll(".delete-btn").forEach(btn =>
    btn.addEventListener("click", () => deleteLog(btn.dataset.id))
  );

  list.querySelectorAll(".edit-btn").forEach(btn =>
    btn.addEventListener("click", () => editLog(btn.dataset.id))
  );
}

function deleteLog(id) {

  if (!confirm("Delete this entry?")) return;

  const logs = getLogs().filter(entry => entry.id !== Number(id));
  localStorage.setItem("printLogs", JSON.stringify(logs));
  renderLogs();
}

function editLog(id) {
  const logs = getLogs();
  const entry = logs.find(e => e.id === Number(id));
  if (!entry) return;

  // Fill form fields for editing
  document.getElementById("logTitle").value = entry.title;
  document.getElementById("logNotes").value = entry.notes;

  // Remove old version so when user saves, it adds the revised version
  const remaining = logs.filter(e => e.id !== Number(id));
  localStorage.setItem("printLogs", JSON.stringify(remaining));

  renderLogs();

  // Scroll to form for convenience
  document.getElementById("logTitle").scrollIntoView({ behavior: "smooth" });
}

