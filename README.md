# Race Time - by up2158902

## Key Features

This app is a race timing solution built for Portsmouth Joggers' Club to support their upcoming "Pub-to-Pub" race. It runs entirely on a local device, supports offline mode (e.g., airplane mode), and allows for accurate race time logging even in challenging outdoor conditions. All code is developed using core web technologies (Node.js with Express, SQLite, vanilla JS/HTML/CSS), following the strict delivery specs.

### 1. Start Race Timer
- Access the start timer from the home screen.
- Pressing the “Start Race” button begins the central race timer. This timer is displayed live and used for finish time calculations.
- Design note: Timer accuracy is maintained by using `Date.now()` for time deltas rather than relying on setInterval drift.

### 2. Record Finish Times
- Users can input bib numbers and hit “Record Finish” to log the current race time against the runner.
- Finishers are logged with millisecond precision, allowing for fair and accurate rankings.
- Design note: This page is fully usable offline and optimized for winter use with large buttons, high-contrast text, and minimal distractions.

### 3. Submit Results
- Results can be submitted to the server when online.
- A batch upload sends the results to the backend SQLite database and clears the local results.
- Design note: Upload works both live and after the race for flexibility in network-constrained environments.

### 4. View Live Results
- Once uploaded, race results are immediately visible on the `/results` page.
- Results include rank, bib number, and finish time.
- Design note: Results are updated dynamically via frontend fetch calls after each submission.

### 5. Clear Local Race
- A “Clear Race” button wipes localStorage so the device can be reused for the next race.
- Design note: Prevents memory bloat and accidental data retention across races.

---

## AI Usage and Reflections

I used generative AI (ChatGPT) as a development partner for idea brainstorming, syntax help, and bug tracing. Below are examples of specific prompts and my reflections on their value.

### Prompts for Backend (Express + SQLite)
> “How do I create a simple REST API with Express and SQLite to handle race result submissions?”

The AI helped scaffold the basic API endpoints (`POST /submit`, `GET /results`) and database schema, but I refined the structure and validation logic myself.

> “How to store time as milliseconds and convert to hh:mm:ss?”

AI offered a conversion formula. I adapted it to ensure consistency across client/server and to support long races up to 24h.

### Prompts for Frontend Usability
> “How can I design a mobile-friendly timer UI for cold outdoor use?”

ChatGPT emphasized contrast, button size, and responsiveness. I used this advice to design with simplicity and large touch targets, optimized for gloves and impaired visibility.

> “How to implement offline logging and sync when online?”

This led me to use localStorage for offline race logs and a conditional upload flow. AI helped clarify how to detect network status changes, but the implementation logic is mine.

### Prompts for Debugging
> “Why is my fetch request returning CORS error locally?”

AI clarified that Express needed appropriate headers and that I should test with correct `Content-Type`. This helped me resolve a silent failure during early testing.

### Additional Note on Database Format for Testing

During testing, I found that the SQLite file format was not human-readable, which made it difficult to debug and verify stored race results. To solve this, I temporarily introduced a readable SQL format for testing purposes only. This allowed me to inspect and validate the data more easily during development. For final deployment and delivery, I returned to using standard SQLite as required by the coursework brief.

---

## Improvements Since Prototype

- Fully implemented offline mode: Local race logs now persist across reloads until cleared or uploaded.
- Enhanced usability: Introduced touch-friendly UI with clean layout and auto-focus behavior.
- Live results page: Viewers can now watch results update immediately after each submission.
- Robust backend: Server-side validation and error handling now included, improving reliability.
- Race result sorting: Added logic to sort results by finish time and handle ties.

---

## Reflection

This project pushed my skills in both frontend and backend JavaScript, and taught me how to build a self-contained, installable web system without third-party tools. I’ve learned to design with real-world conditions in mind, particularly accessibility challenges.

Using AI responsibly allowed me to speed up initial development and overcome knowledge gaps—but every core feature has been implemented and understood by me. Where suggestions failed or conflicted, I adapted or discarded them based on testing.

I’m proud of the balance between simplicity, maintainability, and practical usability in this final app.
