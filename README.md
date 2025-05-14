# Race Time – by up2158902

## Overview

**Race Time** is a web-based race timing application developed for the Portsmouth Joggers' Club in support of their upcoming “Pub-to-Pub” race. The system is designed to be used entirely offline (e.g. in airplane mode) and works seamlessly in outdoor, winter conditions, including use by individuals wearing gloves.

Built using only core web technologies—**Node.js with Express, SQLite, vanilla JavaScript, HTML, and CSS**—this app meets the strict delivery requirements outlined in the coursework brief. No external libraries or frameworks were used (other than Express and SQLite).

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


---

## AI Usage & Reflection

Generative AI (ChatGPT) was used during development to assist with brainstorming, syntax questions, and troubleshooting issues. Every AI-assisted step was interpreted, tested, and adapted by me to fit the real-world context of this application.

### Backend Development
- **Prompt**: _"How do I build a REST API in Express with SQLite?"_
  - Helped scaffold API routes (`POST /results`, `GET /results`) and inspired the DB schema.
  - Final structure, validation, and data handling were built independently.

- **Prompt**: _"How to store time as milliseconds and convert to HH:MM:SS?"_
  - Provided a formula. I refined it to support long-duration races and ensure frontend/backend consistency.

### Frontend & UX
- **Prompt**: _"How can I design a mobile-friendly UI for use with gloves?"_
  - AI emphasized large targets and clean contrast. I implemented this in my layout and button sizing.

- **Prompt**: _"How to detect offline mode and sync when back online?"_
  - Guided my use of `navigator.onLine`, `localStorage`, and fallback strategies for result submission.

### Debugging Help
- **Prompt**: _"Why is my fetch request failing with a CORS error?"_
  - AI helped me add appropriate headers and check for correct server-side response handling.

---

## Asset Attribution

A subtle "pop" sound effect is played when the race timer starts, enhancing the user experience with audio feedback that reinforces the action. This is especially useful in outdoor race settings where users may rely on more than visual cues.

- **Source**: [Mixkit Pop Sound Effect – Free License](https://mixkit.co/free-sound-effects/pop/)


---

## Development Improvements Since Prototype

- Added persistent offline race data logging via localStorage.
- Redesigned the interface for outdoor usability and winter gloves.
- Live result updates using frontend fetch and dynamic rendering.
- Backend now includes server-side error handling and input validation.
- Improved sorting logic for results, including tie handling and display formatting.

---

## Final Reflection

Working on this project pushed my skills in both frontend and backend development. I had to carefully design a usable system under real-world constraints—offline use, visibility issues, performance, and data integrity.

While AI provided inspiration and assistance during planning and debugging, I made all technical decisions and handled implementation myself. The result is a self-contained, scalable race timing solution that meets all coursework requirements while also being genuinely useful in practical settings.

I’m proud of the balance between simplicity, reliability, and accessibility that I’ve achieved in this final build.
