Okay, let's dive into the UI requirements for the "Side-Notes" feature with high detail, focusing on making it intuitive and seamlessly integrated into your existing Bible reading experience. We'll leverage your **Tailwind CSS** and **Shadcn/ui** stack for a modern, clean look.

The core idea is **contextual access** and a **non-disruptive workflow**.

---

## UI Requirements: Side-Notes Feature

### **1. Note Indicators within Chapter View**

*   **Goal:** Visually communicate that a note exists for a verse without cluttering the reading experience.
*   **Location:** Directly within the `PassageDisplay` component, alongside the rendered verse text.
*   **Appearance:**
    *   **Subtle Highlight:** The text of the verse(s) covered by a note should have a very subtle background highlight color (e.g., `bg-yellow-100` or a light tint of your accent color). This should be a distinct color from any highlighting used for selected text or search results.
    *   **Note Icon:** A small, unobtrusive icon (e.g., `NotebookText` or `PencilLine` from Lucide React) should appear immediately after the verse number.
        *   **Size:** Small, perhaps `h-3 w-3` or `h-4 w-4`.
        *   **Color:** A muted color, perhaps `text-gray-500` or `text-blue-500`.
        *   **Hover Effect:** On hover, the icon could slightly lighten or show a small tooltip "View Note".
*   **Interaction:**
    *   **Clicking Highlight/Icon:** Clicking anywhere on the highlighted verse text or the note icon should open the Note Editor (described below). If a note covers multiple verses, clicking any of those highlighted verses should open the same note.
    *   **Cursor:** The cursor should change to `pointer` when hovering over a note-indicated verse.

---

### **2. Note Editor (Modal / Sheet)**

*   **Goal:** Provide a focused, uncluttered space for users to create, view, and edit notes. The modal/sheet approach ensures the user remains on the chapter page for context.
*   **Component Choice:** `Shadcn/ui Dialog` (modal) or `Shadcn/ui Sheet` (sidebar). A `Sheet` (e.g., from the right) is often preferred for notes as it feels more "side-panel-like" and less disruptive than a central modal, allowing the user to still glimpse the chapter.
*   **Trigger:** Activated by clicking a note indicator in the chapter view, or an "Add Note" button (see below).

#### **2.1. Note Editor Header:**

*   **Title:**
    *   For a new note: "New Note for [Book Name] [Chapter]:[Verse]" (e.g., "New Note for Genesis 1:3").
    *   For an existing note: "Note for [Book Name] [Chapter]:[Verse(s)]" (e.g., "Note for Genesis 1:1-3").
    *   Use bold text or a slightly larger font for clarity.
*   **Verse Reference Display:** Below the title, clearly state the full verse reference(s) the note is attached to. This should be concise.
*   **Close Button:** A standard `Shadcn/ui Button` (icon-only, e.g., `X` from Lucide React) in the top right corner to close the editor.

#### **2.2. Note Editor Body (Content Area):**

*   **Textarea:**
    *   Use a `Shadcn/ui Textarea` component.
    *   **Placeholder:** "Write your note here..."
    *   **Size:** Sufficiently large (e.g., `rows={8}` or `min-h-[200px]`) to accommodate longer notes without excessive scrolling.
    *   **Resizing:** Allow vertical resizing if possible.
    *   **Initial Content:** If editing an existing note, pre-fill with the note's current content. If a new note, it should be empty.
    *   **Focus:** The textarea should auto-focus when the editor opens.
*   **Rich Text Editor (Future/Enhanced):** While MVP can be a simple textarea, consider a lightweight rich text editor (e.g., `TipTap`, `Quill.js`) if bolding, italics, or lists within notes become desired features. This would be a Phase 2 or 3 enhancement.

#### **2.3. Note Editor Footer (Actions):**

*   **"Save" Button:**
    *   A primary `Shadcn/ui Button` (e.g., `variant="default"`).
    *   **Text:** "Save Note".
    *   **State:** Should be disabled if the note content is empty or unchanged from its initial state (for existing notes).
    *   **Loading Indicator:** Show a `Shadcn/ui Spinner` or text "Saving..." when the save mutation is in progress.
*   **"Delete" Button:**
    *   A secondary `Shadcn/ui Button` (e.g., `variant="destructive"` or `variant="ghost"` with red text).
    *   **Text:** "Delete Note".
    *   **Confirmation:** Clicking this button should trigger a `Shadcn/ui AlertDialog` for confirmation ("Are you sure you want to delete this note? This action cannot be undone."). This prevents accidental deletion.
    *   **State:** Only visible if the note being edited *already exists*. Not shown for new notes.
*   **"Cancel" Button:**
    *   A `Shadcn/ui Button` (`variant="ghost"` or `variant="outline"`).
    *   **Text:** "Cancel" or "Close".
    *   Closes the modal/sheet without saving (or prompts to save if changes are unsaved).

---

### **3. Overall User Flow & Integration Points:**

*   **Chapter View (`PassageDisplay.tsx`):**
    *   Loads `notes` data for the current chapter (using TanStack Query).
    *   Renders the HTML content for the chapter, dynamically applying highlight/icon based on fetched notes.
    *   Manages the state for `isNoteEditorOpen` and `currentNoteToEdit` (or `currentVerseForNewNote`).
*   **Selecting Verses for New Notes (MVP vs. V2):**
    *   **MVP:** Clicking *anywhere* on a verse (even if not explicitly highlighted for an existing note) will open the editor for that single verse. If a note exists, it's opened. If not, a new note is started for that specific verse.
    *   **V2 (Advanced Selection):** Implementing a robust system where users can click and drag to select a range of verses, and then a floating "Add Note" popover appears, is a more complex feature that often requires managing browser `Selection` APIs. This can be deferred.
*   **Contextual Save:** When a note is saved (created or updated), the TanStack Query for `notes` for the current chapter should be **invalidated** to force a refetch, ensuring the UI (highlights/icons) immediately reflects the change.
*   **Global Access (Future/Enhanced):** Consider a separate "My Notes" page (similar to "My Collections") where users can browse all their notes regardless of chapter, search notes, or filter them. This is typically a separate feature built on top of the chapter-level notes.
```

---

This detailed UI breakdown should give you a clear roadmap for implementing a user-friendly and highly functional side-notes feature! Remember to focus on the core user flow for MVP, and then iterate.