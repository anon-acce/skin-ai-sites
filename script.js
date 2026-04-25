import { Client, handle_file } from "https://cdn.jsdelivr.net/npm/@gradio/client/+esm";

const HF_SPACE = "l0styy/skin_ai_api";

document.getElementById("analyzeBtn").addEventListener("click", uploadImage);

async function uploadImage() {
  const fileInput = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");
  const previewDiv = document.getElementById("preview");

  if (!fileInput.files.length) {
    alert("Upload image first");
    return;
  }

  const file = fileInput.files[0];

  previewDiv.innerHTML = '<img src="${URL.createObjectURL(file)}">';
  resultDiv.innerHTML = "Analyzing... ⏳";

  try {
    const app = await Client.connect(HF_SPACE);

    const result = await app.predict("/predict", [
      handle_file(file)
    ]);

    console.log(result);

    const output = result.data[0];

    resultDiv.innerHTML = <pre>${JSON.stringify(output, null, 2)}</pre>;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "❌ Error connecting to AI. Open Console for details.";
  }
}
