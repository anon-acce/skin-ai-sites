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

    // convert to base64
    const reader = new FileReader();

    reader.onload = async function () {
        const base64Image = reader.result;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: [base64Image]
                })
            });

            const data = await response.json();
            console.log(data);

            if (data.data) {
                resultDiv.innerHTML = <pre>${data.data[0]}</pre>;
            } else {
                resultDiv.innerHTML = "⚠️ No result from AI";
            }

        } catch (error) {
            console.error(error);
            resultDiv.innerHTML = "❌ API error";
        }
    };

    reader.readAsDataURL(file);
}