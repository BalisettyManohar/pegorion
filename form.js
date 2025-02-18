const scriptURL =
  "https://script.google.com/macros/s/AKfycbw3n7KjaNeEb00BqbMSSZEb_qFxLqFsUHgtKZpF6jf-yip7gJOJJdIe6D4M96_B4vt2FA/exec";


const modalContactForm = document.getElementById("modalContactForm");
const modalSuccessMessage = document.getElementById("modalSuccessMessage");
const modalErrorMessage = document.getElementById("modalErrorMessage");

function handleFormSubmit(form, successMessage, errorMessage, redirectUrl) {
  if (!form || !successMessage || !errorMessage) {
    console.error("Form or message elements are not found");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    successMessage.innerText = "Please wait while form is submitting...";
    successMessage.style.display = "block";
    errorMessage.style.display = "none";

    fetch(scriptURL, { method: "POST", body: formData })
      .then((response) => {
        if (response.ok) {
          form.reset();
          successMessage.innerText =
            "Thanks for contacting us, we will get back to you soon!";
          successMessage.style.display = "block";
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
        } else {
          throw new Error("Failed to submit form");
        }
      })
      .catch((error) => {
        console.error("Error!", error.message);
        errorMessage.style.display = "block";
        successMessage.style.display = "none";
      });
  });
}

handleFormSubmit(modalContactForm, modalSuccessMessage, modalErrorMessage);

