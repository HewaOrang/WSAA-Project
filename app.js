// AJAX functions for Book Management System
// All API calls to the backend are handled here

// Show the create form
function showCreate() {
    document.getElementById('showCreateButton').style.display = "none"
    document.getElementById('bookTable').style.display = "none"
    document.getElementById('createUpdateForm').style.display = "block"

    document.getElementById('createLabel').style.display = "inline"
    document.getElementById('updateLabel').style.display = "none"

    document.getElementById('doCreateButton').style.display = "inline-block"
    document.getElementById('doUpdateButton').style.display = "none"
    
    clearForm();
}

// Show the view all books view
function showViewAll() {
    document.getElementById('showCreateButton').style.display = "inline-block"
    document.getElementById('bookTable').style.display = "block"
    document.getElementById('createUpdateForm').style.display = "none"
}

// Show the update form with book data
function showUpdate(buttonElement) {
    document.getElementById('showCreateButton').style.display = "none"
    document.getElementById('bookTable').style.display = "none"
    document.getElementById('createUpdateForm').style.display = "block"

    document.getElementById('createLabel').style.display = "none"
    document.getElementById('updateLabel').style.display = "inline"

    document.getElementById('doCreateButton').style.display = "none"
    document.getElementById('doUpdateButton').style.display = "inline-block"

    var rowElement = buttonElement.parentNode.parentNode
    var book = getBookFromRow(rowElement)
    populateFormWithBook(book)
}

// Handle create button click
function doCreate() {
    var book = getBookFromForm()
    
    if (!book.title || !book.author || !book.price) {
        alert("Please fill in all fields")
        return
    }
    
    console.log(JSON.stringify(book))
    createBookAjax(book)
}

// Handle update button click
function doUpdate() {
    var book = getBookFromForm()
    var rowElement = document.getElementById(book.id)
    updateBookAjax(book)
    setBookInRow(rowElement, book)
    clearForm()
    showViewAll()
}

// Handle delete button click
function doDelete(buttonElement) {
    if (!confirm("Are you sure you want to delete this book?")) {
        return
    }
    
    var tableElement = document.getElementById('bookTable')
    var rowElement = buttonElement.parentNode.parentNode
    var index = rowElement.rowIndex
    var bookId = rowElement.getAttribute("id")
    
    deleteBookAjax(bookId)
    tableElement.deleteRow(index)
}

// Add a book row to the table
function addBookToTable(book) {
    var tableElement = document.getElementById('bookTable')
    var rowElement = tableElement.insertRow(-1)
    rowElement.setAttribute('id', book.id)
    
    var cell1 = rowElement.insertCell(0)
    cell1.innerHTML = book.id
    
    var cell2 = rowElement.insertCell(1)
    cell2.innerHTML = book.title
    
    var cell3 = rowElement.insertCell(2)
    cell3.innerHTML = book.author
    
    var cell4 = rowElement.insertCell(3)
    cell4.innerHTML = "€" + (book.price / 100).toFixed(2)
    
    var cell5 = rowElement.insertCell(4)
    cell5.innerHTML = '<button class="btn btn-sm btn-warning" onclick="showUpdate(this)">Update</button> <button class="btn btn-sm btn-danger" onclick="doDelete(this)">Delete</button>'
}

// Clear the form inputs
function clearForm() {
    document.getElementById('bookForm').reset()
    document.getElementById('id').value = ''
}

// Get book data from a table row
function getBookFromRow(rowElement) {
    var book = {}
    book.id = rowElement.getAttribute('id')
    book.title = rowElement.cells[1].textContent
    book.author = rowElement.cells[2].textContent
    // Remove € and convert back to cents
    var priceText = rowElement.cells[3].textContent
    book.price = parseInt(priceText.replace('€', '') * 100, 10)
    return book
}

// Set book data in a table row
function setBookInRow(rowElement, book) {
    rowElement.cells[0].textContent = book.id  
    rowElement.cells[1].textContent = book.title 
    rowElement.cells[2].textContent = book.author
    rowElement.cells[3].textContent = "€" + (book.price / 100).toFixed(2)
}

// Populate the form with book data
function populateFormWithBook(book) {
    document.getElementById('id').value = book.id
    document.getElementById('title').value = book.title
    document.getElementById('author').value = book.author
    document.getElementById('price').value = book.price
    return book
}

// Get book data from the form
function getBookFromForm() {
    var book = {}
    book.id = document.getElementById('id').value
    book.title = document.getElementById('title').value
    book.author = document.getElementById('author').value
    book.price = parseInt(document.getElementById('price').value, 10)
    console.log(JSON.stringify(book))
    return book
}

// ==================== AJAX CALLS ====================

// GET all books
function getAllAjax() {
    $.ajax({
        url: "/books",
        method: "GET",
        data: "",
        dataType: "JSON",
        success: function(result) {
            console.log("Books retrieved successfully:", result)
            for (let book of result) {
                addBookToTable(book)
            }
        },
        error: function(xhr, status, error) {
            console.log("Error getting books - Status: " + status + " Message: " + error)
            alert("Failed to load books. Please check the server is running.")
        }
    })
}

// POST create a new book
function createBookAjax(book) {
    console.log("Creating book:", JSON.stringify(book))
    $.ajax({
        url: "/books",
        method: "POST",
        data: JSON.stringify(book),
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            console.log("Book created successfully:", result)
            book.id = result.id
            addBookToTable(book)
            clearForm()
            showViewAll()
            alert("Book created successfully!")
        },
        error: function(xhr, status, error) {
            console.log("Error creating book - Status: " + status + " Message: " + error)
            alert("Failed to create book. Please try again.")
        }
    })
}

// PUT update an existing book
function updateBookAjax(book) {
    console.log("Updating book:", JSON.stringify(book))
    $.ajax({
        url: "/books/" + encodeURI(book.id),
        method: "PUT",
        data: JSON.stringify(book),
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            console.log("Book updated successfully:", result)
            alert("Book updated successfully!")
        },
        error: function(xhr, status, error) {
            console.log("Error updating book - Status: " + status + " Message: " + error)
            alert("Failed to update book. Please try again.")
        }
    })
}

// DELETE a book
function deleteBookAjax(id) {
    console.log("Deleting book with id:", id)
    $.ajax({
        url: "/books/" + encodeURI(id),
        method: "DELETE",
        data: "",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            console.log("Book deleted successfully:", result)
            alert("Book deleted successfully!")
        },
        error: function(xhr, status, error) {
            console.log("Error deleting book - Status: " + status + " Message: " + error)
            alert("Failed to delete book. Please try again.")
        }
    })
}

// Load all books when page loads
$(document).ready(function() {
    getAllAjax()
})
