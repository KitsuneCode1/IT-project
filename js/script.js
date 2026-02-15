// ---------- COURSES ----------
function addCourse() {
    let courseInput = document.getElementById("courseName");
    let course = courseInput.value;

    if (course === "") {
        alert("Please enter a course name");
        return;
    }

    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));

    courseInput.value = "";
    loadCourses();
}

function loadCourses() {
    let courseList = document.getElementById("courseList");
    if (!courseList) return;

    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    courseList.innerHTML = "";

    // Check if admin page by looking for admin input field
    const isAdminPage = document.getElementById("courseName") !== null;

    courses.forEach((course, index) => {
        let li = document.createElement("li");

        if (isAdminPage) {
            li.innerHTML = `
                <span>${course}</span>
                <button onclick="editCourse(${index})">Edit</button>
                <button onclick="deleteCourse(${index})">Delete</button>
            `;
        } else {
            li.textContent = course;
        }

        courseList.appendChild(li);
    });
}


loadCourses();

// ---------- CONTACT FORM ----------
function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    if (name === "" || email === "") {
        alert("Please fill in all required fields");
        return false;
    }

    alert("Message sent successfully");
    return false;
}

function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}

// Highlight current page in nav
const navLinks = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
        link.classList.add("current");
    }
});

// ----- ADMIN PASSWORD -----
const ADMIN_PASSWORD = "mysecret123"; // set your password

// Show login when nav button clicked
function openAdmin() {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("adminPanel").style.display = "none";
}

// Check login
function checkAdminLogin() {
    const input = document.getElementById("adminPassword").value;
    if (input === ADMIN_PASSWORD) {
        alert("Welcome, Admin!");
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        loadCourses(); // show courses
    } else {
        alert("Incorrect password. Access denied.");
    }
}


function logoutAdmin() {
    localStorage.removeItem("isAdminLoggedIn"); // clears login
    alert("You have been logged out.");
    window.location.href = "admin-login.html"; // redirect to login page
}


// Edit a course
function editCourse(index) {
    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    let newCourse = prompt("Edit course name:", courses[index]);
    if (newCourse && newCourse.trim() !== "") {
        courses[index] = newCourse.trim();
        localStorage.setItem("courses", JSON.stringify(courses));
        loadCourses();
    }
}

// Delete a course
function deleteCourse(index) {
    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    if (confirm(`Are you sure you want to delete "${courses[index]}"?`)) {
        courses.splice(index, 1);
        localStorage.setItem("courses", JSON.stringify(courses));
        loadCourses();
    }
}
