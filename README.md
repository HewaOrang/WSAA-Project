# Book Management System - Web Project

A web application for managing books with a Flask backend API and JavaScript frontend using AJAX.

## Project Structure

```
WSAA-Project-New/
├── server.py           # Flask backend server with REST API endpoints
├── BookDAO.py          # Data Access Object for database operations
├── dbconfig.py         # Database configuration settings
├── bookviewer.html     # Main frontend HTML file
├── app.js              # JavaScript file with all AJAX calls and UI logic
├── requirements.txt    # Python dependencies
├── schema.sql          # Database schema and sample data
└── README.md           # This file
```

## File Descriptions

### Backend Files

**server.py**
- Flask application with REST API endpoints
- CORS enabled for cross-origin requests
- Endpoints:
  - `GET /books` - Get all books
  - `GET /books/<id>` - Get book by ID
  - `POST /books` - Create a new book
  - `PUT /books/<id>` - Update a book
  - `DELETE /books/<id>` - Delete a book

**BookDAO.py**
- Data Access Object class for database operations
- Handles all SQLite database interactions
- Methods: getAll(), findByID(), create(), update(), delete()
- Converts database results to dictionary format

**dbconfig.py**
- Database configuration settings
- Specifies SQLite database file name

### Frontend Files

**bookviewer.html**
- Main HTML interface
- Bootstrap styling for responsive design
- Table display for books
- Form for creating/updating books
- Imports jQuery and Bootstrap CSS

**app.js**
- Separated JavaScript file containing:
  - UI control functions (show/hide forms and tables)
  - Form handling (populate, clear, get data)
  - AJAX functions for all API calls:
    - `getAllAjax()` - Fetch all books
    - `createBookAjax()` - Create new book
    - `updateBookAjax()` - Update existing book
    - `deleteBookAjax()` - Delete a book
  - Event listeners and page initialization

### Configuration & Setup Files

**requirements.txt**
- Python package dependencies
- Flask 3.0.0
- flask-cors 5.0.1
- And other required packages

**schema.sql**
- SQLite database schema
- Book table definition with columns: id, title, author, price
- Sample data for testing

## Setup Instructions

### 1. Create Virtual Environment (Optional but Recommended)
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# or
source venv/bin/activate  # On macOS/Linux
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Create Database
```bash
# Using sqlite3 command line
sqlite3 wsaaproject.db < schema.sql

# Or using Python
import sqlite3
conn = sqlite3.connect('wsaaproject.db')
cursor = conn.cursor()
with open('schema.sql', 'r') as f:
    cursor.executescript(f.read())
conn.commit()
conn.close()
```

### 4. Run the Server
```bash
python server.py
```

The server will start at `http://127.0.0.1:5000`

### 5. Access the Application
Open your browser and navigate to:
```
http://127.0.0.1:5000/bookviewer.html
```

## Features

### View Books
- All books are loaded and displayed in a table when the page loads
- Displays: ID, Title, Author, and Price
- Price is stored in cents and displayed with dollar formatting

### Create Book
1. Click "Create New Book" button
2. Fill in Title, Author, and Price
3. Click "Create" button
4. Book is added to database and table

### Update Book
1. Click "Update" button in the Actions column
2. Form populates with current book data
3. Modify the fields
4. Click "Update" button
5. Changes are saved to database and table

### Delete Book
1. Click "Delete" button in the Actions column
2. Confirm deletion in dialog
3. Book is removed from database and table

## API Endpoints

### Get All Books
```
GET /books
Response: [{"id": 1, "title": "...", "author": "...", "price": ...}, ...]
```

### Get Book by ID
```
GET /books/1
Response: {"id": 1, "title": "...", "author": "...", "price": ...}
```

### Create Book
```
POST /books
Content-Type: application/json
Body: {"title": "...", "author": "...", "price": ...}
Response: {"id": 1, "title": "...", "author": "...", "price": ...}
```

### Update Book
```
PUT /books/1
Content-Type: application/json
Body: {"title": "...", "author": "...", "price": ...}
Response: {"id": 1, "title": "...", "author": "...", "price": ...}
```

### Delete Book
```
DELETE /books/1
Response: {"done": true}
```

## Technologies Used

- **Backend**: Python, Flask, Flask-CORS
- **Database**: SQLite3
- **Frontend**: HTML5, CSS3, Bootstrap 4
- **API Communication**: JavaScript, jQuery AJAX

## Notes

- Price is stored in cents in the database (multiply by 100 when storing, divide by 100 when displaying)
- The app uses SQLite for simplicity; can be replaced with MySQL or PostgreSQL by modifying BookDAO.py and dbconfig.py
- CORS is enabled for cross-origin requests
- All AJAX calls include error handling with user-friendly alert messages

## Troubleshooting

**Database not found error:**
- Make sure you've created the database using schema.sql
- Check that wsaaproject.db exists in the project directory

**Server not connecting:**
- Ensure Flask server is running on http://127.0.0.1:5000
- Check browser console (F12) for AJAX error messages

**CORS errors:**
- Verify flask-cors is installed
- Check that CORS is enabled in server.py

## Author
Based on WSAA-Project-Trial refactored with separated frontend JavaScript
