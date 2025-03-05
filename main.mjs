let riveCanvases = [];

function addButton(id, button, width, height, target) {
  // Create a new canvas element
  const canvas = document.createElement("canvas");
  const canvasId = "canvas" + id;
  canvas.id = canvasId; // Set the ID

  // Set width and height
  canvas.width = width; // Canvas internal resolution
  canvas.height = height;

  // Set CSS styles to ensure correct display size
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // Append it to the div with ID "buttons"
  const buttonsDiv = document.getElementById(target);
  if (buttonsDiv) {
    buttonsDiv.appendChild(canvas);
  } else {
    console.error(`Div with id "${target}" not found.`);
  }

  const newCanvas = new rive.Rive({
    src: "icons.riv",
    canvas: document.getElementById(canvasId),
    autoplay: true,
    artboard: button,
    stateMachines: "ButtonState",
    onLoad: () => {
      newCanvas.resizeDrawingSurfaceToCanvas();
      // Pass the canvasId to the event handler
      newCanvas.on(rive.EventType.RiveEvent, (event) =>
        onRiveEventReceived(event, canvasId)
      );
    },
  });

  riveCanvases.push(newCanvas);
}

const buttons = [
  {
    name: "cog",
    widthMultiplier: 1,
    heightMultiplier: 1,
  },
  {
    name: "search",
    widthMultiplier: 1,
    heightMultiplier: 1,
  },
  {
    name: "favorite",
    widthMultiplier: 1,
    heightMultiplier: 1,
  },
  {
    name: "arrowBack",
    widthMultiplier: 1,
    heightMultiplier: 1,
  },
  {
    name: "toggle",
    widthMultiplier: 1.2777,
    heightMultiplier: 1,
  },
];

for (let i = 0; i < buttons.length; i++) {
  addButton(
    i + "36px",
    buttons[i].name,
    36 * buttons[i].widthMultiplier,
    36 * buttons[i].heightMultiplier,
    "buttons"
  );
}
for (let i = 0; i < buttons.length; i++) {
  addButton(
    i + "72px",
    buttons[i].name,
    72 * buttons[i].widthMultiplier,
    72 * buttons[i].heightMultiplier,
    "buttons2"
  );
}
for (let i = 0; i < buttons.length; i++) {
  addButton(
    i + "18px",
    buttons[i].name,
    18 * buttons[i].widthMultiplier,
    18 * buttons[i].heightMultiplier,
    "buttons3"
  );
}

addButton("grouped", "Demo", 400, 120, "buttons4");
window.addEventListener(
  "resize",
  () => {
    riveCanvases.forEach((r) => r.resizeDrawingSurfaceToCanvas());
  },
  false
);

function onRiveEventReceived(riveEvent, canvasId) {
  console.log("Rive event received on canvas:", canvasId);

  const eventData = riveEvent.data;
  const eventProperties = eventData.properties;

  if (eventData.type === rive.RiveEventType.General) {
    console.log("Event from:", canvasId);
    console.log("Event name:", eventData.name);
  } else if (eventData.type === rive.RiveEventType.OpenUrl) {
    console.log("OpenUrl event from:", canvasId);
    console.log("Event name:", eventData.name);
  }
}
