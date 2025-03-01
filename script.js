document.addEventListener("DOMContentLoaded", () => {
    const passwordModal = document.querySelector(".password-modal");
    const passwordInput = document.querySelector("#password");
    const unlockButton = document.querySelector("#unlock");
    const passwordError = document.querySelector("#password-error");
    const mainContainer = document.querySelector(".main-container");

    const PASSWORD = "1234";

    unlockButton.addEventListener("click", () => {
        if (passwordInput.value === PASSWORD) {
            passwordModal.style.display = "none";
            mainContainer.classList.add("visible");
        } else {
            passwordError.textContent = "Incorrect password. Try again.";
        }
    });

    passwordInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") unlockButton.click();
    });

    const invInput = document.querySelector("#initial-investment");
    const stepInput = document.querySelector("#step-
