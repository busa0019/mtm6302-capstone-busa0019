# mtm6302-capstone-busa0019


## Student Information
**Name:** Faoziyyah busari  
**Student Number:** 041-141-018 

 # Capstone Project: QuizAPI Site
This project uses the [QuizAPI](https://quizapi.io) to create a dynamic quiz application where users can select difficulty levels, answer questions, and track their scores.


## Wireframe
The wireframe for this project is stored in the `wireframe` folder. Below is a preview:

![Wireframe](./wireframe/low-fi-wireframe.jpg)

## Wireframe Functionality Summary
The wireframe represents the following functionalities:

1. **Header**:
   - Displays the app’s name and a brief subheader or tagline describing the purpose of the page.

2. **Difficulty Selection Section**:
   - Includes a dropdown for selecting difficulty (Easy, Medium, Hard).
   - A button to fetch a question based on the selected difficulty level.

3. **Question Section**:
   - Displays the fetched question from the API.
   - Provides answer option buttons for user selection.
   - Shows feedback indicating if the selected answer is correct or incorrect.
   - Includes a "Next Question" button to proceed to the next question.

4. **Scoreboard Section**:
   - Tracks and displays the number of correct and incorrect answers.
   - Includes a "Reset Stats" button to reset the scores and clear local storage.

5. **Footer**:
   - Displays credits for the QuizAPI or other related information.

The detailed functionality notes are also embedded below:

![Wireframe Functionality Notes](./wireframe/low-fi-notes.jpg)


---

## Part 2: Mockup
### Purpose
The mockup demonstrates how the application will look and behave on desktop, tablet, and mobile devices. This includes the layout, user actions, colors, fonts, and branding.

### Mockup Features
1. **Desktop View**:
   - Full layout with all sections visible.
   - Optimized for larger screens with ample spacing.

2. **Tablet View**:
   - Compact two-column layout for answer buttons.
   - Touch-friendly interactions and well-aligned components.

3. **Mobile View**:
   - Fully stacked layout for smaller screens.
   - Enlarged buttons and dropdowns for easier tapping.

### Colors, Fonts, and Branding
- **Colors**:
  - Primary color: Blue (#007BFF) for buttons and headers.
  - Feedback color: Green (#DFFFD6) for correct/incorrect feedback.
  - Background color: Light gray (#F9F9F9).
- **Fonts**:
  - Headings: Roboto for a modern and professional look.
  - Body Text: Arial for readability and familiarity.
- **Logo**:
  - The application name, Quiz Me!, serves as a text-based logo.
  - It is styled prominently in the header using a bold font and the primary blue color to enhance brand identity.

### Mockup Files
The mockup images for desktop, tablet, and mobile views are embedded below for reference:

#### Desktop Mockup
![Desktop Mockup](./mockups/desktop-mockup.jpg)

#### Tablet Mockup
![Tablet Mockup](./mockups/tablet-mockup.jpg)

#### Mobile Mockup
![Mobile Mockup](./mockups/mobile-mockup.jpg)

A PDF version of all mockups is available for download: [Download Mockup PDF](./mockups/mockup.pdf)

---

### Changes Based on Prof's Feedback
- The "Next" button now includes a dropdown to select the difficulty level before moving to the next question, addressing suggestions from Part 1.

---

## Part 3: Prototype

### Purpose
The prototype builds on the mockup and brings it to life using **only HTML and CSS** (no JavaScript). This version ensures:
- A structured and interactive quiz experience.
- Users can select difficulty and answer questions with checkboxes.
- The quiz is fully responsive on **mobile, tablet, and desktop**.
- A "Finish Quiz" button displays the **scoreboard**.

### Features Implemented
✅ **Multiple-choice questions** (Easy, Medium, Hard).  
✅ **Checkboxes for multiple correct answers**.  
✅ **Fully responsive design using CSS Grid & Flexbox**.  
✅ **Users can finish  quiz at anytime and see their scores**.  
✅ **Navigation between sections using anchor links (`<a href="#section-id">`).**
✅ **Correct & Incorrect answers are tracked in the scoreboard.**
✅**No JavaScript used – CSS-only interactions.** 

### Technologies Used
- **HTML5** for structure.
- **CSS3** with Grid & Flexbox for layout.
- **Media queries** to ensure responsiveness across devices.

### Responsive Adjustments

| **Device**   | **Changes Applied** |
|-------------|--------------------|
| **Desktop**  | Default layout. |
| **Tablet (1024px)**  | Two-column button layout, scoreboard scores aligned in one row. |
| **Mobile (600px)**  | Hamburger menu, single-column buttons, scoreboard stacked. |



### Challenges & Solutions
| **Challenge** | **Solution** |
|--------------|-------------|
| Making the quiz interactive without JavaScript | Used anchor links (`<a href="#section-id">`)for smooth navigation |
| Ensuring multiple correct answers are supported | Used checkboxes for each answer |
| Aligning UI elements properly on different screen sizes| Used CSS Grid & Flexbox with media queries |

### Changes Based on Prof's Feedback

- **Added checkboxes** to allow multiple correct answers for certain questions.
- **Implemented a "Finish Quiz" button**, enabling users to end the quiz at any time and immediately display the scoreboard.
---

### Resources Used
- [W3C HTML & CSS Validator](https://validator.w3.org/) - To ensure clean and valid code.
- [W3Schools](https://www.w3schools.com/) - For reference on CSS techniques and best practices.
- [IMDAC](https://imdac.github.io/) - For additional learning resources and coding support.


---

## Part 4: Final Functional Application

### ✅ Purpose
This stage transforms the static prototype into a **fully functional web application** using HTML, CSS, and JavaScript. It connects to the **QuizAPI** to dynamically fetch questions, allows users to answer them, and tracks scores with persistent local storage.

---

### ✅ Features Implemented
- **Dynamic Question Loading**: Fetches random questions based on selected difficulty
- **Answer Validation**:
  - Radio buttons for single-answer questions
  - Checkboxes for multiple-answer questions
- **Interactive Feedback**:
  - Instant correct/incorrect indicators
  - Displays correct answers after submission
- **Score Management**:
  - Live score updates (Correct/Incorrect)
  - Persistent storage using localStorage
  - Reset stats functionality
- **Fallback System**: Local questions when API fails
- **Responsive Design**: Optimized for all devices
- **Seamless Navigation**: No page refreshes required

---

### ✅ Technologies Used
- **HTML5** Semantic markup
- **CSS3** with Flexbox/Grid layouts
- **JavaScript**:
  - `fetch()` API for async operations
  - DOM manipulation
  - localStorage with JSON serialization
  - Event listeners only (no inline JS)
- **Media Queries**: 600px (mobile) and 1024px (tablet) breakpoints

---

### ✅ Responsive Design Implementation

| Device       | Layout Features                                                                 |
|--------------|---------------------------------------------------------------------------------|
| **Desktop**  | Full-width layout, visible navigation, grid-based answer buttons               |
| **Tablet**   | Two-column answer layout, optimized touch targets                              |
| **Mobile**   | Hamburger menu, stacked layout, larger tap areas                               |

---

### ✅ Implementation Details

| Feature              | Technical Approach                                                                 |
|----------------------|-----------------------------------------------------------------------------------|
| Dynamic Content      | API calls with `fetch()` + DOM manipulation                                       |
| Answer Validation    | Checks `correct_answers` property from API response                               |
| Score Persistence    | `localStorage` with `JSON.parse()`/`JSON.stringify()`                             |
| Error Handling       | Try/catch blocks with fallback questions                                          |
| Responsive UI        | CSS Grid + media queries                                                          |
|  Input Switching         | Dynamic radio/checkbox based on multiple_correct_answers flag                                                     |
---

### ✅ Challenges & Solutions

| Challenge                                | Solution                                                                          |
|------------------------------------------|-----------------------------------------------------------------------------------|
| API rate limits (429 errors)             | Fallback question object arrays by difficulty                   |
| Score synchronization                    | localStorage integration with JSON serialization                                  |
| Multiple answer handling                 | Dynamic switch between radio/checkbox inputs                                      |
| Feedback and state transitions               | Used conditional DOM rendering and event handlers                |                                |

---

### ✅ Changes from Prototype (Part 3)
- Replaced static content with API-driven questions
- Added dynamic answer validation logic
- Implemented score persistence across sessions
- Introduced loading states during API calls
- Added proper error handling and fallbacks

---

### ✅ Resources Used
- [QuizAPI Documentation](https://quizapi.io/docs)
-  [IMDAC](https://imdac.github.io/)
- Stack Overflow (troubleshooting fetch/localStorage issues)
- [W3C Validator](https://validator.w3.org/) - Code validation
- [W3Schools](https://w3schools.com/)
---

### ✅ Instructor Feedback Addressed
- **Next Button Improvement**: Added difficulty dropdown for next question
- **Multiple Answers**: Implemented checkbox support for multi-answer questions

---

### 🚀 How to Use
1. Select difficulty from dropdown
2. Click "Get Question"
3. Choose answer(s) using radio/checkboxes
4. Click "Submit Answers" for instant feedback
5. Use "Next" for new question or "Finish Quiz" to view scores
6. Reset stats anytime with "Reset Stats" button

---

### Final Features
- 📱 Full mobile responsiveness
- 🔄 API/local question fallback
- 📊 Persistent score tracking
- 🛠️ Configurable difficulty levels
- ✅ Immediate answer feedback

---