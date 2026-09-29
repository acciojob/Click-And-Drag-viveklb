const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Save initial grid positions
const positions = [];

cubes.forEach(cube => {
  const cubeRect = cube.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  positions.push({
    cube: cube,
    left: cubeRect.left - containerRect.left,
    top: cubeRect.top - containerRect.top
  });
});

// Convert grid items into absolute positioned items
positions.forEach(data => {
  data.cube.style.position = "absolute";
  data.cube.style.left = data.left + "px";
  data.cube.style.top = data.top + "px";
});

cubes.forEach(cube => {

  cube.addEventListener("mousedown", function(event) {
    selectedCube = cube;

    const cubeRect = cube.getBoundingClientRect();

    offsetX = event.clientX - cubeRect.left;
    offsetY = event.clientY - cubeRect.top;

    cube.style.zIndex = "1000";

    event.preventDefault();
  });

});

document.addEventListener("mousemove", function(event) {

  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();

  let x = event.clientX - containerRect.left - offsetX;
  let y = event.clientY - containerRect.top - offsetY;

  // Boundary limits
  const maxX =
    container.clientWidth - selectedCube.offsetWidth;

  const maxY =
    container.clientHeight - selectedCube.offsetHeight;

  // Keep cube inside container
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  selectedCube.style.left = x + "px";
  selectedCube.style.top = y + "px";
});

document.addEventListener("mouseup", function() {

  if (selectedCube) {
    selectedCube.style.zIndex = "1";
    selectedCube = null;
  }

});