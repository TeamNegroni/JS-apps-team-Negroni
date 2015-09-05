# JS-apps-team-Negroni
#NOTEBOOK Documentation
***
*Name:* Notebook

*Authors:*   

1. Емил Тишинов

2. Огнян Коссов

3. Георги Георгиев

4. Андрей Митев

5. Стефан Стефанов

*Created:* 03/09/2015

*Version:* 1.0.0
***
Thank you for your interest in our project! 

<a href="https://rawgit.com/TeamNegroni/JS-apps-team-Negroni/master/index.html" alt="RawGit-Project-Adress">RawGit of the Project</a>
***
##Table of Contents
1. Project Description
2. HTML Structure
3. CSS Files
4. Javascript Files
5. Browser Compatibility
***
##1. Project Description
A small, easy-to use and free diary like application with limited tools for generating important reminders. In order to use the application users must first register and setup an account for themselves. We currently supports 3 preset types of notes, a content note only (textarea) as well as an image uploader. The main feature of the application is its well designed calendar allowing the user to generate reminders or notes based on the date of the event and viewing them by selecting the date from the calendar. 
***
##2. HTML Structure
The HTML Structure for each page is as follows:
 
* Meta
* Title
* Link to CSS Files
* Header
* Container
	* Background image
	* Login Wrapper
	* UI Wrapper
	* Calendar Blurrer
	* Calendar
* Link to Javascript Files
***

##3. CSS Files

There are 5 css files
* main.css
* calendarStyle.css
* bootstrap-theme.min.css
* bootstrap.min.css
* jquery-ui.min.css
 
#####main.css
This CSS file is the main stylesheet for the theme. It holds all the values for the different elements of theme and the default color scheme.
#####calendar.css
This CSS file generates the styles for the elements of the calendar tool. It allows the calendar to run smoothly and have different effects while the user hovers over its elements or selects them.
#####bootstra-theme.min.css
A CSS file - collection of preset styles for elements that are part of the bootstrap-theme.
#####bootstrap.min.css
A CSS file - collection of all preset styles for the bootstrap elements, including responsive design classes, buttons, form fields, etc.
#####jquery-ui.min.css
Minified CSS file - collection of all preset styles for the jquery-ui.js library.
***
##4. Javascript Files
There are 11 Javascript files in this theme:
 
* AuthCountroller.js
* calendar.js
* facebookPlugin.js
* grid.js
* Notes.js
* systemConfig.js
* uiController.js
* system.js
* jquery.min.js
* jquery-ui.js
* bootstrap.min.js 
 
#####AuthCountroller.js
AuthController.js holds the main logic for the communication between the application and the parse backend service.
#####calendar.js
Provides the necessary features for the calendar.
#####facebookPlugin.js
Allows Facebook's API to be integrated in the applications page. The user can LIKE or SHARE its experience with the application.
#####grid.js
Defines the logic behind the grid system. The grid system itself is a complex system allowing the user to move or resize objects that are its children as well as create new children.**Not all tools are implemented properly.**
#####Notes.js
Holds the constructor module for the different types of note objects.
#####systemConfig.js
This is the proper configuration for system.js. Imports three different modules that depend on each other.
#####uiController.js
Provides the UI with different animations, transitions and functionalities.
#####system.js
Allows the integration of different modules.
#####jquery.min.js
We used jquery to perform most of the operations over the DOM tree.
#####jquery-ui.js
A library used to create the user interface.
#####bootstrap.min.js 
Provides the application with a responsive design through preset object classes.
***
##5. Browser Compatibility
  
**IE 10/11**

**Chrome**  

**Firefox** 
 
**Safari** 

**Opera**

####Project by Team Negroni
Thank you for your interest in our project! 
<a href="https://github.com/TeamNegroni/JS-apps-team-Negroni" alt="Project-Adress">Github for Team Negroni</a>
