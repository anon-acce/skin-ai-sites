const API_URL = "https://l0styy-skin-ai-api.hf.space/api/predict";

async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const resultDiv = document.getElementById("result");
    const previewDiv = document.getElementById("preview");

    if (!fileInput.files.length) {
        alert("Upload image first");
        return;
    }

    const file = fileInput.files[0];

    // preview
    previewDiv.innerHTML = <img src="${URL.createObjectURL(file)}">;
    resultDiv.innerHTML = "Analyzing... ⏳";

    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        console.log(data);

        // Красивый вывод
        let text = "";

        if (data.data) {
            data.data.forEach((item, index) => {
                text += <p><b>${index+1}.</b> ${item}</p>;
            });
        } else {
            text = JSON.stringify(data);
        }

        resultDiv.innerHTML = text;

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "❌ Error connecting to AI";
    }
}