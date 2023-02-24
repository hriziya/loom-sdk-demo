import "./styles.css";
import { isSupported, setup } from "@loomhq/loom-sdk";

const BUTTON_ID = "loom-record-btn";

async function init() {
  const root = document.getElementById("app");

  root.innerHTML = `
    <div className="loom-record-btn-wrapper">
      <div className="loom-record-btn-inner-wrapper">
        <button id="${BUTTON_ID}">Record</button>
      </div>
    </div>
`;

  const button = root.querySelector(`#${BUTTON_ID}`);

  if (button == null || !isSupported()) {
    return;
  }

  const { configureButton } = await setup({
    apiKey: "7909b65c-8629-4e2b-8d83-d3c0993a4858",
  });

  configureButton({
    element: button,
    hooks: {
      onInsertClicked: (obj) => {
        console.log("clicked insert");
        console.log(obj.sharedUrl);
      },
      onStart: () => console.log("start"),
      onCancel: () => console.log("cancelled"),
      onComplete: () => console.log("complete"),
    },
  });
}

init();
