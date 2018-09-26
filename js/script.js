/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Adding Variables that store the DOM elements to reference and/or manipulate

const page = document.querySelector('.page'); // Selects the div with the class .page

const studentListUl = document.querySelector('.student-list'); // Selects the student list

const totalStudents = document.querySelectorAll('.student-item'); // Selects elements that has the class .student-item

const pagesForStudents = Math.ceil(totalStudents.length / 10); // Calculating pages per 10 students

const tenStudentsPerPage = []; // Stores every 10 student as arrays in an array

/*
  Start and limit variables
  below keep track of the index
  values from 1st to 10th 
  student each page
*/

let start = 0;
let limit = 10;

/*
  The for loop below makes sure that each page
  has only 10 students. It runs according to the
  number of pages and each time makes arrays consisting 10
  students.
*/

for (let i = 0; i < pagesForStudents; i++) {
  const students = []; // Creates a variable with an empty array
  
  // The for loop pushes 10 students to the students array
  for (let i = start; i < limit; i++) {
    students.push(totalStudents[i]);
  }

  start += 10; // It will count from the 11th student next time
  limit += 10; // It will end at the 20th student next time
  tenStudentsPerPage.push(students); // Pushes the first 10 students
}

// The function below hides all the students from the DOM

const hideStudents = () => {
  const students = document.querySelectorAll('.student-item');
  for (let i = 0; i < students.length; i++) {
    students[i].style.display = 'none';
  }
}

hideStudents(); // Hiding the students lists

// Creating and appending pagination links

// Function to create pagination
function createPagination () {
  const div = document.createElement('div'); // Creating the div element
  const ul = document.createElement('ul'); // Creating the ul element
  div.className = 'pagination'; // Giving the div a class name
  /*
    for loop to create the buttons according to
    the number of pages
  */
  for (let i = 1; i <= pagesForStudents; i++) {
    const li = document.createElement('li'); // Creating the li
    const a = document.createElement('a');  // Creating the anchor
    a.setAttribute('href', '#'); // Setting href to the a
    a.textContent = i; // Giving the a text content
    li.appendChild(a); // Appending the a to the li
    ul.appendChild(li); // Appending the li to the ul
  }
  div.appendChild(ul); // Appending the ul to the div
  return div; // Returning the div
}

const paginationDiv = createPagination(); // Storing the result to a variable

page.appendChild(paginationDiv); // Appending the variable to the DOM

// Selecting the first a element inside the .pagination div

const firstPageButton = document.querySelector('.pagination a');

// Giving the button .active class as default

firstPageButton.className = 'active';

// Showing the first 10 students as default

if (firstPageButton.classList.contains('active')) {
  const firstTenStudents = tenStudentsPerPage[0];
  for (let i = 0; i < firstTenStudents.length; i++) {
    firstTenStudents[i].style.display = 'block';
  }
}

/* 
  Adding functionality to the pagination buttons
*/

const pagination = document.querySelector('.pagination'); // Selecting the Pagination div

// Selecting all the pagination links
const pageLinks = document.querySelectorAll('.pagination a');

// Listener Event - whenever the user clicks a button
pagination.addEventListener('click', e => {
  if (e.target.tagName == 'A') { // Checks if the target is an anchor
    // The loop below removes active class from all other anchors
    for (let i = 0; i < pageLinks.length; i++) {
      if (pageLinks[i].classList.contains('active')) {
        pageLinks[i].classList.remove('active');
      }
    }
    e.target.className = 'active'; // Sets the active class only to the element the user clicks

    /*
      The two Loops below matches the indexes of the arrays
      in the tenStudentPerPage array we created before with the
      indexes of our page links and show or hide the students array
    */
    // The loop below iterates through the array of page links
    for (let i = 0; i < pageLinks.length; i++) {
      // Checks to see if the link has the active class
      if (pageLinks[i].classList.contains('active')) {
        // Stores the array that matches the index of link in a variable
        const showPage = tenStudentsPerPage[i];
        // Iterates through the array and shows it
        for (let i = 0; i < showPage.length; i++) {
          // Checks to see if any item inside the array is undefined
          if (showPage[i] !== undefined) {
            showPage[i].style.display = 'block'; // Display the items
          }
        }
      }
    }
    // The loop below iterates through the array of page links
    for (let i = 0; i < pageLinks.length; i++) {
      // Checks to see if the link does not have the active class
      if (!pageLinks[i].classList.contains('active')) {
        // Stores the array that matches the index of link in a variable
        const showPage = tenStudentsPerPage[i];
        // Iterates through the array and hides it
        for (let i = 0; i < showPage.length; i++) {
          // Checks to see if any item inside the array is undefined
          if (showPage[i] !== undefined) {
            showPage[i].style.display = 'none'; // Hide the items
          }
        }
      }
    }
  } // End of Conditional Statement
}); // End of the Event Listener

/*
  The Search Bar
*/

const pageHeader = document.querySelector('.page-header'); // Selects the page header and inserts it into a variable

const searchDiv = document.createElement('div'); // Creates a div
searchDiv.className = 'student-search'; // Sets a classname
const input = document.createElement('input'); // Creates an input
input.setAttribute('placeholder', 'Search for students...'); // Setting a placeholder attribute to the input
const searchButton = document.createElement('button'); // Creating the button element
searchButton.textContent = 'Search'; // Setting the button's text content
searchDiv.appendChild(input); // Appending the input to the div
searchDiv.appendChild(searchButton); // Appending the button to the div
pageHeader.appendChild(searchDiv); // Appending the div to html document

const h2 = document.createElement('h2'); // Creates a new h2 element
h2.textContent = 'No other students found :('; // Setting its text content
studentListUl.appendChild(h2); // Appending the h2 to the ul
h2.style.display = 'none'; // Hiding as default

const query = document.querySelector('.student-search input'); // Selecting the search box

const searchBtn = document.querySelector('.student-search button'); // Selects the search button

// The event listener below listens for any keyups
query.addEventListener('keyup', e => {
  let h3;
  const filter = query.value.toUpperCase(); // Stores the search value and makes it uppercase
  for (let i = 0; i < totalStudents.length; i++) {
    h3 = totalStudents[i].querySelector('.student-details h3'); // Selects each student's name and assign them into a variable
    // Checks to see if the student's name matches the search input
    if (h3.textContent.toUpperCase().indexOf(filter) > -1) {
      totalStudents[i].style.display = 'block';
      h2.style.display = 'none';
    } else {
      totalStudents[i].style.display = 'none';
      h2.style.display = 'block';
    }
  }
});
// The event listener below listens for clicks in the search button
searchBtn.addEventListener('click', e => {
  hideStudents();
  let h3;
  const filter = query.value.toUpperCase();  // Stores the search value and makes it uppercase
  for (let i = 0; i < totalStudents.length; i++) {
    h3 = totalStudents[i].querySelector('.student-details h3');  // Selects each student's name and assign them into a variable
    // Checks to see if the student's name matches the search input
    if (h3.textContent.toUpperCase().indexOf(filter) > -1) {
      totalStudents[i].style.display = 'block';
      h2.style.display = 'none';
    } else {
      totalStudents[i].style.display = 'none';
      h2.style.display = 'block';
    }
  }
  query.value = '';
});