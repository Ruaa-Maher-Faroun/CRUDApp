
const displayCourse = () => {
  let res = courses.map((course, i) => {
    return `<tr>
        <td>${i}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        <td><button class='btn btn-primary' onclick='updateCourse(${i})'>Update</button></td>
        <td><button class='btn btn-danger' onclick='deleteCourse(${i})'>Delete</button></td>
        </tr>`;

  }).join('');

  document.querySelector('#data').innerHTML = res;
}
function deleteCourse(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(index, 1);
      localStorage.setItem('courses', JSON.stringify(courses));
      displayCourse();

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });

}
async function updateCourse(index) {
  const { value: formValues } =  await Swal.fire({
    title: "Update Course",
    html: `
    <div>
      <label>Course Name</label>
      <br>
      <input id="Name" class="swal2-input" value="${courses[index].name}">
    </div>
    <div>
      <label>Course Category</label>
      <br>
      <input id="Category" class="swal2-input" value="${courses[index].category}">
    </div>
    <div>
      <label>Course Price</label>
      <br>
      <input type="number" id="Price" class="swal2-input" value="${courses[index].price}">
      </div>
    <div>
      <label>Course Description</label>
      <br>
      <input id="Description" class="swal2-input" value="${courses[index].description}">
    </div>
    <div>
      <label>Course Capacity</label>
      <br>
      <input type="number" id="Capacity" class="swal2-input" value="${courses[index].capacity}">
    </div>
    `,
    focusConfirm: false,
    preConfirm: () => {
      
      return [
        document.getElementById("Name").value,
        document.getElementById("Category").value,
        document.getElementById("Price").value,
        document.getElementById("Description").value,
        document.getElementById("Capacity").value
      ];
    }
  });
  if (formValues) {
    courses[index].name=formValues[0];
    courses[index].category=formValues[1];
    courses[index].price=formValues[2];
    courses[index].description=formValues[3];
    courses[index].capacity=formValues[4];
    localStorage.setItem('courses', JSON.stringify(courses));
    displayCourse();
      Swal.fire({
        title: "Updated!",
        text: "You clicked the button!",
        icon: "success"
      });
    }



}

let courses = [];
const coursename = document.querySelector('#courseName');
const courseCategory = document.querySelector('#courseCategory');
const coursePrice = document.querySelector('#coursePrice');
const courseDescription = document.querySelector('#courseDescription');
const courseCapacity = document.querySelector('#courseCapacity');
const courseaddition = document.querySelector('.courseaddition');
const addBtn = document.querySelector('#click');
const deleteBtn = document.querySelector('#deleteBtn');
const search = document.querySelector('#search');
if (JSON.parse(localStorage.getItem('courses')) !== null) {
  courses = JSON.parse(localStorage.getItem('courses'));
  
  displayCourse();
}

const validate = (value, pattern,msg) => {

  if (!pattern.test(document.querySelector(`#${value}`).value)) {
    document.querySelector(`#${value}`).classList.add('is-invalid');
    document.querySelector(`.${value + 'Paragraph'}`).innerHTML = msg;
    return false;
  } else {

    document.querySelector(`#${value}`).classList.remove('is-invalid');
    document.querySelector(`.${value + 'Paragraph'}`).innerHTML = "";
    return true;

  }
}


addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  isValidated = validate('courseName', /^[A-Z][a-z]{2,10}$/,"Start with Capital and use from 2- 10 letters") &&
    validate('courseCategory', /^[A-Z][a-z]{2,6}$/,"Start with Capital and use from 2-6 letters") &&
    validate('coursePrice', /^[0-9]{1,3}$/,"Use only numbers and use from 1-3 numbers") &&
    validate('courseDescription', /^[a-zA-Z0-9 .,!?'"()-]{10,200}$/,"Start with Capital and use from 10-200 letters") &&
    validate('courseCapacity', /^[0-9]{1,3}$/,"Use only numbers and use from 1-3 numbers");
  if (isValidated) {
    const course = {
      name: coursename.value,
      category: courseCategory.value,
      price: coursePrice.value,
      description: courseDescription.value,
      capacity: courseCapacity.value
    };


    courses.push(course);


    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "New Course Added successfully"
    });

    displayCourse();

    localStorage.setItem('courses', JSON.stringify(courses));
    courseaddition.reset();
  }
});

deleteBtn.addEventListener('click', () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('courses');
      courses = [];
      displayCourse();

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });


});


search.addEventListener('input', (e) => {
  const keyword = search.value;
  let resCourses = courses.filter((course) => {
    return course.name.toLowerCase().includes(keyword.toLowerCase());
  });


  let res = resCourses.map((course, i) => {
    return `<tr>
        <td>${i}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
         <td><button class='btn btn-primary' onclick='updateCourse(${i})'>Update</button></td>
        <td><button class='btn btn-danger' onclick='deleteCourse(${i})'>Delete</button></td>
        </tr>`;
 

  }).join('');

  document.querySelector('#data').innerHTML = res;
});