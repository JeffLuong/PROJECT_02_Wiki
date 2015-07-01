# PROJECT_02_Wiki - WikiArticles
##Project 2 Full stack wiki 

###Technologies Used:
1. Javascript along with Node.js, Express.js and EJS for server side of application.
2. JQuery (for front end manipulation of DOM...including fade-ins, menu animation and autoscroller.
3. MongoDB and Mongoose for data storage and queries.
4. HTML5 and CSS3 for formatting and styling.
5. Markdown Node package that allows users to write articles in markdown format.
6. Sessions were implemented using the sessions node package to store local cookies onto a user's browser.

###User Stories:
1. The user must be able to view any article available on the website.
2. The user has the ability to read a random article with the "random article" option.
3. Should the user choose to write an article, he/she must be logged in to do so.
4. If the user does not have an account, he/she must first create one in order to write an article.
5. The user must also be logged in to be able to edit any article.
6. After writing or editing an article, the user is able to publish it for everyone to see.
7. The articles will display the last modified time as well as the date of creation.
8. The articles will display categories it is associated with and these tags are clickable links that lead to similar articles in that category.
9. Should the user choose, he/she is free to log out or delete their account.


###Approach:
This project was approached in a minimalist standpoint. It is a more stylized wiki that focuses primarily on the text content of the articles with no other extra items on the page to distract the reader. The concept is to create a simple but slick feeling wiki that is fairly intuitive with a touch of animation to make the user feel good about using the application.

###Problems Encountered & Solved:
1. How to dynamically insert and display user's markdown content in HTML format. (Solved: store content in markdown format and use node's marked package to convert to HTML when rendering article page.)
2. How to dynamically pass in messages to the user regarding the need to log in, errors while logging in and create a new account. (Solved: included a footer and passed into the EJS file a "message" property with a string stating the error the user encountered.)
3. How to implement categories into the application. (Solved: implemented a dynamic route using the category selected as a query variable for the server to search for all items with that category.)
4. How to implement random article feature. (Solved: included a backend code that gets the "count" of the number of articles in the database, generate a random number from 1 to the count and use that number to choose an article right after that number.)

###Potential Features to Add:
1. Store and be able to show previous iterations of an article.
2. Implement Bcrypt to user password creation.
3. Allow users to add their own categories into the database.
4. Implement more responsive design to the application.
5. ALlow articles to be printable in a nice pre-formatted fashion.
