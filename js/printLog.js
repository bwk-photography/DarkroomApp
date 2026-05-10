// --- printLog.js -------------------------------------------------
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc
} from "[gstatic.com](https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js)";

const db = window.db;     // created in firebase setup script
const auth = window.auth; // firebase auth instance
let currentUser = null;

// --- Initialize print log ---
export function initPrintLog() {
  const saveBtn = document.getElementById("saveLogBtn");
  if (!saveBtn) {
    console.warn("Print log element IDs not found — skipping initialization.");
    return;
  }

  // Handle login state
  auth.onAuthStateChanged(user => {
    currentUser = user;
    renderLogs(); // refresh list whenever user signs in/out
  });

  // --- Save / Update entry ---
  saveBtn.addEventListener("click", async () => {
    const title = document.getElementById("logTitle").value.trim();
    const notes = document.getElementById("logNotes").value.trim();
    if (!title && !notes) return;
    if (!currentUser) return alert("Please sign in.");

    const entry = {
      uid: currentUser.uid,
      title,
      notes,
      date: new Date().toLocaleString()
    };

    await addDoc(collection(db, "printLogs"), entry);

    document.getElementById("logTitle").value = "";
    document.getElementById("logNotes").value = "";

    renderLogs();
  });

  // Initial render
  renderLogs();
}

// --- Render user’s logs from Firestore ---
async function renderLogs() {
  const list = document.getElementById("logList");
  if (!list) return;

  list.innerHTML = "";

  if (!currentUser) {
    list.innerHTML = "<li>Please sign in to view your print logs.</li>";
    return;
  }

  const q = query(collection(db, "printLogs"), where("uid", "==", currentUser.uid));
  const snapshot = await getDocs(q);
  const logs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

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

  // --- Attach handlers ---
  list.querySelectorAll(".delete-btn").forEach(btn =>
    btn.addEventListener("click", () => deleteLog(btn.dataset.id))
  );

  list.querySelectorAll(".edit-btn").forEach(btn =>
    btn.addEventListener("click", () => editLog(btn.dataset.id))
  );
}

// --- Delete a Firestore document ---
async function deleteLog(id) {
  if (!confirm("Delete this entry?")) return;
  if (!currentUser) return alert("Please sign in.");

  await deleteDoc(doc(db, "printLogs", id));
  renderLogs();
}

// --- Edit an entry: load data into form, remove old record ---
async function editLog(id) {
  if (!currentUser) return alert("Please sign in.");

  // Fetch all user logs again (small dataset; fine for now)
  const q = query(collection(db, "printLogs"), where("uid", "==", currentUser.uid));
  const snapshot = await getDocs(q);
  const docSnap = snapshot.docs.find(d => d.id === id);
  if (!docSnap) return;

  const entry = docSnap.data();

  document.getElementById("logTitle").value = entry.title || "";
  document.getElementById("logNotes").value = entry.notes || "";

  // Delete the old doc (new save will insert a revised version)
  await deleteDoc(doc(db, "printLogs", id));

  renderLogs();
  document.getElementById("logTitle").scrollIntoView({ behavior: "smooth" });
}
