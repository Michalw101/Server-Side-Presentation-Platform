# **Server-Side Presentation Platform**

A server-side application designed to manage presentations and slides for an online platform. This project provides functionality for creating, updating, and deleting presentations and slides, as well as managing their relationships.

## **Features**

- **Create Presentation:** Add new presentations with a title, list of authors, and initial slides.
- **Delete Presentation:** Remove a presentation from the platform.
- **Add Slide:** Add new slides to a presentation or update existing ones.
- **Remove Slide:** Remove slides from a presentation.
- **Manage Authors:** Update the list of authors for a presentation.
- **Handle Slide Data:** Ensure slide IDs are unique and manage slide content.

## **Technologies**

- **Node.js:** Server-side JavaScript runtime.
- **Express:** Web framework for Node.js.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB.
- **MongoDB:** NoSQL database for storing presentations and slides data.

## **Installation**

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Michalw101/Server-Side-Presentation-Platform.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd Server-Side-Presentation-Platform
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the root directory and add necessary configuration.

5. **Start the server:**

    ```bash
    npm start
    ```

   or use nodemon:

    ```bash
    npm run devStart
    ```

   The server will run on `http://localhost:PORT` (replace `PORT` with the port specified in your `.env` file).

## **API**

### **Presentations**

- **`GET /presentations/:title`**
  
  Get a presentation by title.

  - **Parameters:**
    - `title` (in path): The title of the presentation.

- **`GET /presentations`**

  Get all presentations.

- **`POST /presentations`**

  Create a new presentation.

  - **Request Body:**
    - `title` (String): The title of the presentation.
    - `authors` (Array of Strings): List of authors.
    - `slides` (Array of Numbers): IDs of slides.

- **`DELETE /presentations/:title`**

  Delete a presentation by title.

  - **Parameters:**
    - `title` (in path): The title of the presentation.

- **`PUT /presentations/:title`**

  Add or update a slide in a presentation.

  - **Request Body:**
    - `content` (String): Content of the slide (if creating a new slide).
    - `authors` (Array of Strings): List of authors (if updating).
    - `slide_id` (Number): ID of the slide (if adding or removing).

### **Slides**

- **`GET /slides/:id`**

  Get a slide by ID.

  - **Parameters:**
    - `id` (in path): The ID of the slide.

- **`POST /slides`**

  Create a new slide.

  - **Request Body:**
    - `content` (String): Content of the slide.

- **`DELETE /slides/:id`**

  Delete a slide by ID.

  - **Parameters:**
    - `id` (in path): The ID of the slide.

- **`PUT /slides/:id`**

  Update an existing slide.

  - **Request Body:**
    - `content` (String): New content for the slide.
