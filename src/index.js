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
  const sdkButton = configureButton({
    element: button,
  });

  sdkButton.on("upload-complete", async (video) => {
    console.log("upload-complete");
    console.log(video.sharedUrl);

    document.querySelector(
      "#video"
    ).innerHTML = `Thank you! here is the link <a href="${video.sharedUrl}" target="_blank">${video.sharedUrl}</a>`;
  });

  sdkButton.on("insert-click", async (video) => {
    console.log("insert-click");
    console.log(video.sharedUrl);
  });

  sdkButton.on("cancel", async () => {
    console.log("cancel");
  });
}

init();
