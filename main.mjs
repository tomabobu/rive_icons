console.log("Loaded");
let riveCanvases = [];

function addButton(id, button) {
  // Create a new canvas element
  const canvas = document.createElement("canvas");
  const canvasId = "canvas" + id;
  canvas.id = canvasId; // Set the ID

  // Set width and height
  canvas.width = 36; // Canvas internal resolution
  canvas.height = 36;

  // Set CSS styles to ensure correct display size
  canvas.style.width = "36px";
  canvas.style.height = "36px";

  // Append it to the div with ID "buttons"
  const buttonsDiv = document.getElementById("buttons");
  if (buttonsDiv) {
    buttonsDiv.appendChild(canvas);
  } else {
    console.error('Div with id "buttons" not found.');
  }

  const newCanvas = new rive.Rive({
    src: "icons.riv",
    canvas: document.getElementById(canvasId),
    autoplay: true,
    artboard: button, // Optional. If not supplied the default is selected
    stateMachines: "ButtonState",
    onLoad: () => {
      newCanvas.resizeDrawingSurfaceToCanvas();
      newCanvas.on(rive.EventType.RiveEvent, onRiveEventReceived, canvasId);
    },
  });
  riveCanvases.push(newCanvas);
}
addButton(1, "cog");
addButton(2, "search");
addButton(3, "cog");

// Redraw surface on window scale
window.addEventListener(
  "resize",
  () => {
    r.resizeDrawingSurfaceToCanvas();
  },
  false
);

function onRiveEventReceived(riveEvent) {
  console.log("Rive event");
  const eventData = riveEvent.data;
  const eventProperties = eventData.properties;

  if (eventData.type === rive.RiveEventType.General) {
    console.log("Event", eventData);
    console.log("Event name:", eventData.name);
    // console.log("Rating:", eventProperties.rating);
    // console.log("Message:", eventProperties.message);
  } else if (eventData.type === rive.RiveEventType.OpenUrl) {
    console.log("Event name:", eventData.name);
    // Manually handle OpenUrl events
    // window.location.href = eventData.url;
  }
}
