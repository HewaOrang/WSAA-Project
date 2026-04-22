# Book DAO 
# This is a demonstration of a data layer that connects to a database
# Author: Hewa Orang
import sqlite3
import dbconfig as cfg
from os import path


class BookDAO:
    connection = ""
    cursor = ''
    database = ''
    
    def __init__(self):
        self.database = cfg.mysql['database']

    def getcursor(self): 
        ROOT = path.dirname(path.realpath(__file__))
        self.connection = sqlite3.connect(path.join(ROOT, self.database))
        self.cursor = self.connection.cursor()
        return self.cursor

    def closeAll(self):
        self.connection.close()
         
    def getAll(self):
        cursor = self.getcursor()
        sql = "select * from book"
        cursor.execute(sql)
        results = cursor.fetchall()
        returnArray = []
        for result in results:
            returnArray.append(self.convertToDictionary(result))
        
        self.closeAll()
        return returnArray

    def findByID(self, id):
        cursor = self.getcursor()
        sql = "select * from book where id = ?"
        
        cursor.execute(sql, (id,))
        result = cursor.fetchone()
        returnvalue = self.convertToDictionary(result)
        self.closeAll()
        return returnvalue

    def create(self, book):
        cursor = self.getcursor()
        sql = "insert into book (title, author, price) values(?, ?, ?)"
        cursor.execute(sql, (book.get('title'), book.get('author'), book.get('price')))

        self.connection.commit()
        newid = cursor.lastrowid
        book["id"] = newid
        self.closeAll()
        return book

    def update(self, id, book):
        cursor = self.getcursor()
        sql = "update book set title = ?, author = ?, price = ? where id = ?"
        cursor.execute(sql, (book.get('title'), book.get('author'), book.get('price'), id))
        self.connection.commit()
        self.closeAll()
        
    def delete(self, id):
        cursor = self.getcursor()
        sql = "delete from book where id = ?"
        
        cursor.execute(sql, (id,))
        self.connection.commit()
        self.closeAll()

    def convertToDictionary(self, resultLine):
        attkeys = ['id', 'title', 'author', "price"]
        book = {}
        currentkey = 0
        for attrib in resultLine:
            book[attkeys[currentkey]] = attrib
            currentkey = currentkey + 1 
        return book

        
bookDAO = BookDAO()
