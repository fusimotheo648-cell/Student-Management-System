# Campus Desk — Student Management System

A student-level React project for the DIWA2110 Web Application Development individual assignment. It manages student records using JavaScript and React, with a responsive dashboard and modal forms.

## Features

- View student ID, full name, age, email, course and enrollment status.
- Add a student, edit a saved record and confirm before deleting a record.
- Validate required fields, age, email format and duplicate student IDs.
- Search by student name, ID, email or course, and filter by status.
- Update the dashboard immediately using React state.
- Save records in the browser with `localStorage` so they remain after a refresh on the same browser.
- Responsive layout using the colours from the supplied palette: dark burgundy, dusty berry, cream and sage green.

The first launch includes sample records so the dashboard is not empty. You can edit or delete these records and add your own. Data is stored locally in the browser, not in a shared online database.

## Requirements

- Node.js (current LTS recommended)
- npm

## Run locally

1. Download and extract the project folder.
2. Open a terminal inside the `student-management-system` folder.
3. Install the packages:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal, usually `http://localhost:5173`.

To check the production build:

```bash
npm run build
npm run preview
```

## GitHub submission

1. Create a GitHub repository, for example `student-management-system`.
2. Upload the project source files and folders.
3. Do not upload `node_modules` or the generated `dist` folder. The repository includes `package.json`, so the dependencies can be installed using `npm install`.
4. Copy the public repository URL for submission.

## Deploy to Netlify

1. Push the project to GitHub.
2. In Netlify, choose **Add new site / Import an existing project** and connect the repository.
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. Deploy the site and open the public URL.
5. Test adding, editing, deleting and validating records on the deployed site.

You can also deploy using Vercel by importing the GitHub repository and using the Vite defaults (`npm run build`, output directory `dist`).

## JavaScript concepts shown

- Strings, numbers, booleans, arrays and objects.
- `const` and `let` declarations.
- User-defined functions and arrow functions.
- Conditional statements, parameters, return values and array methods (`filter`, `map`, `some`).
- React functional components, JSX, props, `useState`, `useEffect` and event handlers.
- Form validation, reusable modal components and state updates.

`var` is not needed for the application logic because `const` and `let` are safer modern defaults. If your lecturer expects a direct `var` demonstration, add a small, clearly commented example and be prepared to explain its function scope and redeclaration behaviour.

## Testing checklist

- [ ] Add a valid student.
- [ ] Try submitting empty required fields.
- [ ] Enter an invalid age and email.
- [ ] Try to use a duplicate student ID.
- [ ] Edit an existing student and confirm only that record changes.
- [ ] Cancel an add/edit form without saving.
- [ ] Delete a student and test cancelling the confirmation.
- [ ] Search and filter the records.
- [ ] Refresh the browser and confirm local records remain.
- [ ] Test the public deployment on desktop and mobile widths.

## Limitations

This is a front-end assignment project. `localStorage` data is specific to the browser and device; it is not a database shared by different users. No login system or backend API is included because these are not specified as requirements in the assignment brief.
