const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

let startX = 0;
let startY = 0;

let baseLeft = 0;
let baseTop = 0;

cubes.forEach((cube) => {
  // Store each cube's dragged position
  cube.dataset.x = "0";
  cube.dataset.y = "0";

  cube.addEventListener("mousedown", function (event) {
    selectedCube = cube;

    const cubeRect = cube.getBoundingClientRect();

    startX = parseFloat(cube.dataset.x) || 0;
    startY = parseFloat(cube.dataset.y) || 0;

    // Mouse position inside cube
    offsetX = event.clientX - cubeRect.left;
    offsetY = event.clientY - cubeRect.top;

    // Original grid position without transform
    baseLeft = cubeRect.left - startX;
    baseTop = cubeRect.top - startY;

    cube.style.zIndex = "1000";
    cube.style.cursor = "grabbing";

    event.preventDefault();
  });
});

document.addEventListener("mousemove", function (event) {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeWidth = selectedCube.offsetWidth;
  const cubeHeight = selectedCube.offsetHeight;

  // Desired absolute position of cube
  let desiredLeft = event.clientX - offsetX;
  let desiredTop = event.clientY - offsetY;

  // Keep cube inside container
  const minLeft = containerRect.left + container.clientLeft;
  const minTop = containerRect.top + container.clientTop;

  const maxLeft =
    containerRect.right -
    container.clientLeft -
    cubeWidth;

  const maxTop =
    containerRect.bottom -
    container.clientTop -
    cubeHeight;

  desiredLeft = Math.max(minLeft, Math.min(desiredLeft, maxLeft));
  desiredTop = Math.max(minTop, Math.min(desiredTop, maxTop));

  // Calculate translation from original grid position
  const x = desiredLeft - baseLeft;
  const y = desiredTop - baseTop;

  selectedCube.dataset.x = x;
  selectedCube.dataset.y = y;

  selectedCube.style.transform = `translate(${x}px, ${y}px)`;
});

document.addEventListener("mouseup", function () {
  if (!selectedCube) return;

  selectedCube.style.zIndex = "";
  selectedCube.style.cursor = "grab";

  selectedCube = null;
});