/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Adding Variables that store the DOM elements to reference and/or manipulate

const page = document.querySelector('.page'); // Selects the div with the class .page

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

// Adding functionality to the pagination buttons
const pagination = document.querySelector('.pagination'); // Selecting the Pagination div

const pageLinks = document.querySelectorAll('.pagination a');

pagination.addEventListener('click', e => {
  if (e.target.tagName == 'A') {
    for (let i = 0; i < pageLinks.length; i++) {
      if (pageLinks[i].classList.contains('active')) {
        pageLinks[i].classList.remove('active');
      }
    }
    e.target.className = 'active';
    for (let i = 0; i < pageLinks.length; i++) {
      if (pageLinks[i].classList.contains('active')) {
        const showPage = tenStudentsPerPage[i];
        for (let i = 0; i < showPage.length; i++) {
          showPage[i].style.display = 'block';
          if (typeof showPage[i] == undefined) {
            return 'Undefined Value';
          }
        }
      }
    }
    // for (let i = 0; i < pageLinks.length; i++) {
    //   if (!pageLinks[i].classList.contains('active')) {
    //     const showPage = tenStudentsPerPage[i];
    //     for (let i = 0; i < showPage.length; i++) {
    //       showPage.style.display = 'none';
    //     }
    //   }
    // }
  }
});

// Tip: If you created a function above to show/hide list items, it could be helpful here






