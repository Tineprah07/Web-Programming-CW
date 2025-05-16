# Race Time – by up2158902

## Overview

**Race Time** is a web-based race timing application developed for the Portsmouth Joggers' Club in support of their upcoming “Pub-to-Pub” race. The system works both online and offline (e.g. in airplane mode) and works seamlessly in outdoor, winter conditions, including use by individuals wearing gloves.

Built using only core web technologies—**Node.js with Express, SQLite, JavaScript, HTML, and CSS**—this app meets the strict delivery requirements outlined in the coursework brief. No external libraries or frameworks were used (other than Express and SQLite).

---

## Key Features

### 1. Start Race Timer
- From the home screen, users can start the central race timer.
- Timing uses `Date.now()` for accurate delta calculation, avoiding drift from `setInterval`.
- Timer updates live and forms the foundation for finish-time capture.

### 2. Record Finish Times
- When a runner finishes, their time is recorded along with a manually entered Runner ID (bib number).
- Finish times are stored with millisecond precision.
- Designed for usability in outdoor settings: large, accessible buttons and clean layout.

### 3. Submit Results to Server
- Results can be submitted in bulk after the race or live during the event.
- Submitted data is saved to a local SQLite database on the server.
- Once upload is confirmed, local results are cleared automatically.

### 4. View Race Results
- The `/results` page displays all uploaded results.
- Includes runner position, ID, and finish time.
- Results load dynamically using `fetch()` and update immediately after submission.

### 5. Clear Race Data
- A "Clear Race" button allows users to wipe all stored data from the device.
- Ensures the system is ready for the next event without leftover data.

### 6. Night Mode for Accessibility

- A toggle in the Settings panel allows users to switch between Light and Night Mode.
- Night Mode improves visibility in low-light or night-time environments, reducing eye strain for race officials working early or late in the day.
- The toggle is fully custom-styled to resemble a modern slider switch and preserves its state using `localStorage`.
- All elements—including background colors, text, buttons, and modal popups—adapt instantly to the selected theme for a consistent experience.

**Design Note**: This feature enhances accessibility and provides a professional, polished look suitable for use in real races.

## Additional Considerations
- Large buttons and bold text for older users with vision limitations.
- Audio feedback included to help volunteers confirm button presses.
- Basic CSS used to ensure compliance with the "no frameworks" rule.


---

## AI Usage and Reflection

Generative AI (ChatGPT) was used as a tool to accelerate development, troubleshoot bugs, and clarify implementation logic. All code was written and tested by me; AI suggestions were interpreted, revised, and contextualized before inclusion.

### Backend Prompts Used

> “How do I build API using Express and SQLite?”  
Helped structure routes (`/results` GET and POST) and understand best practices for SQLite interactions.

> "What’s the best way to store timestamps for race finish times?"
Led to using Date.now() for millisecond precision.

> “How to convert milliseconds to HH:MM:SS format in JS?”  
AI provided logic, which I customized for 24-hour race scenarios.

> “How to use parameterized queries with SQLite in Node.js?”  
Led to safe insertion methods using `db.run` with placeholders.

---

### Frontend/UI Prompts Used

> “How to make a UI accessible for gloves and low visibility?”  
Encouraged larger buttons, high contrast, and simplified touch zones.

> “Toggle dark mode using JavaScript and localStorage?”  
Informed my implementation of the themed toggle and persistent styling.

> “Fetch and display JSON data without libraries?”  
Guided me in building dynamic DOM updates for the results page.

---

### Offline Sync and Debugging

> “Detect offline mode in a web app?”  
Helped implement `navigator.onLine` checks.

> “Store unsent data and send when reconnected?”  
Inspired the caching strategy using `localStorage` with retry-on-sync logic.

### Debugging and Testing

> "Why isn't localStorage saving my race results after page reload?"
Led me to confirm JSON.stringify() and JSON.parse() usage around arrays and objects.

---

## Setup and Usage

1. Extract the `.zip` file and open a terminal in the root folder.
2. Run: `npm install`
3. Run: `npm run setup` to initialize the SQLite database.
4. Run: `npm start`

---

## Additional Note on Database Format for Testing

During development, I encountered difficulty debugging the SQLite `.db` file due to its binary format, which is not human-readable. To make testing and verification easier, I introduced an optional export to a `.sql` file. This readable format allowed me to inspect the database structure and race result content during development.

Although this `.sql` export is not part of the running application’s core functionality, I chose to keep it in the codebase strictly for future testing and debugging purposes. The application does not rely on it, and all key functionality runs entirely on the standard SQLite `.db` file, fully in line with coursework requirements.

### Optional SQL Export Feature

This feature exports data from `results.db` into a human-readable file called `results.sql` using the `sqlite3` command-line tool. It is intended for:

- Manual inspection of race results
- Verifying data integrity
- Debugging during development

If the `sqlite3` tool is not installed on the system, the export is silently skipped without affecting the app’s performance or correctness.

### How to Enable SQL Export

To enable this optional feature, install the `sqlite3` CLI tool on your server or development environment:

```bash
sudo apt update && sudo apt install sqlite3 -y
```

If `sqlite3` is not present, the application will skip this step gracefully without affecting core functionality.

## Development Improvements Since Prototype

| Area | Improvements |
|------|--------------|
| **Frontend** | Rewritten UI for better visibility, accessibility, and glove usability. |
| **Offline Sync** | Implemented `navigator.onLine` with `localStorage` caching for seamless syncing. |
| **Dark Mode** | Added full light/dark theme with toggle switch and styling persistence. |
| **Audio UX** | Added sound cue on race start for enhanced user awareness. |
| **Result Sorting** | Developed tie-aware sorting logic for accurate placement. |
| **Dynamic DOM** | Converted results to load dynamically using `fetch()` instead of full-page refresh. |
| **Backend Resilience** | Improved Express routes with try/catch handling and input sanitization. |


---

## Attribution

- **Sound Effect**: Pop sound at race start to give audio confirmation.  
  Source: [Mixkit – Free Pop Sound](https://mixkit.co/free-sound-effects/pop/)

## Icon Attribution
- **Icons**
- Most icons used were sourced from [Icons8](https://icons8.com) under their free license for educational use.
- Some additional icons are from the [Font Awesome Free Icon Set](https://fontawesome.com/) and used under the Creative Commons Attribution 4.0 license.

- `chronometer.png` used as the title icon was downloaded from [Flaticon](https://www.flaticon.com/free-icon/chronometer_7529281?term=race+chronometer&page=1&position=75&origin=search&related_id=7529281).  
    Icon by [Freepik](https://www.flaticon.com/authors/freepik) on Flaticon — used under the Flaticon Free License for personal and educational use.
    
---

## Final Reflection

Working on this project pushed my skills in both frontend and backend development. I had to carefully design a usable system under real-world constraints—offline use, visibility issues, performance, and data integrity.

While AI provided inspiration and assistance during planning and debugging, I made all technical decisions and handled implementation myself. The result is a self-contained, scalable race timing solution that meets all coursework requirements while also being genuinely useful in practical settings.

I’m proud of the balance between simplicity, reliability, and accessibility that I’ve achieved in this final build.

---