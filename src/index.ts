const startButton = document.getElementById("startButton") as HTMLButtonElement;
const endButton = document.getElementById("endButton") as HTMLButtonElement;
const startTimeText = document.getElementById("startTime") as HTMLParagraphElement;
const endTimeText = document.getElementById("endTime") as HTMLParagraphElement;
const durationText = document.getElementById("duration") as HTMLParagraphElement;

let startTime: Date | undefined;
let endTime: Date | undefined;

startButton.addEventListener("click", () => {
    startTime = new Date();
    startTimeText.innerText = `Startzeit: ${formatDate(startTime)}`;
    endTimeText.innerText = `Endzeit: -`;
    durationText.innerText = `Dauer: -`;
});

endButton.addEventListener("click", () => {
    if (startTime && !endTime) {
        endTime = new Date();
        endTimeText.innerText = `Endzeit: ${formatDate(endTime)}`;
        const duration = endTime.getTime() - startTime.getTime();
        durationText.innerText = `Dauer: ${formatDuration(duration)}`;
    }
});

function formatDate(date: Date): string {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function formatDuration(duration: number): string {
    const seconds = Math.round(duration / 1000);
    if (seconds < 60) {
        return `${seconds} Sekunden`;
    } else {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} Minuten ${remainingSeconds} Sekunden`;
    }
}

// Registrierungsformular
const registrationForm = document.getElementById("registration-form") as HTMLFormElement;

if (registrationForm) {
    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Formulardaten abrufen
        const firstnameInput = <HTMLInputElement>document.getElementById("firstname");
        const lastnameInput = <HTMLInputElement>document.getElementById("lastname");
        const emailInput = <HTMLInputElement>document.getElementById("email");
        const passwordInput = <HTMLInputElement>document.getElementById("password");

        // Benutzerobjekt erstellen
        const user = {
            firstname: firstnameInput.value,
            lastname: lastnameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        };

        // Benutzerobjekt im LocalStorage speichern
        localStorage.setItem(emailInput.value, JSON.stringify(user));

        // Formular zurücksetzen
        registrationForm.reset();
    });
}

// Login-Formular
const loginForm = document.getElementById("login-form") as HTMLFormElement;

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Formulardaten abrufen
        const emailInput = <HTMLInputElement>document.getElementById("login-email");
        const passwordInput = <HTMLInputElement>document.getElementById("login-password");

        // Benutzerobjekt aus dem LocalStorage abrufen
        const userJSON = localStorage.getItem(emailInput.value);

        if (userJSON !== null) {
            const user = JSON.parse(userJSON);

            // Überprüfen, ob das Passwort übereinstimmt
            if (user.password === passwordInput.value) {
                alert(`Willkommen ${user.firstname} ${user.lastname}!`);
            } else {
                alert("E-Mail-Adresse oder Passwort ungültig.");
            }
        } else {
            alert("E-Mail-Adresse oder Passwort ungültig.");
        }

        // Formular zurücksetzen
        loginForm.reset();
    });
}
