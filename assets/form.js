let isSubscribed = JSON.parse(localStorage.getItem("subscribed")) || [];

console.log(isSubscribed);

const contactSubmit = (e) => {
  e.preventDefault();
  const emailSubmitted = e.target[0].value;

  const emailSplitted = emailSubmitted.split("@");

  emailCheck(emailSplitted[0]);
};

const emailCheck = (email) => {
  const suscribedEmail = JSON.parse(localStorage.getItem("subscribed"));

  if (email === suscribedEmail) {
    Toastify({
      text: "Ese email ya está suscrito!",
      duration: 1500,
    }).showToast();
    return;
  } else if (email.length <= 8) {
    // Lanzar error porque no contiene los caracteres suficientes
    Toastify({
      text: "Tu email no puede contener menos de 8 caracteres",
      style: {
        background: "crimson",
        color: "white",
        borderRadius: "50px",
        fontWeight: "600",
      },
      duration: 1500,
    }).showToast();
    return;
  }
  // Suscribir email
  Toastify({
    text: "Te suscribiste correctamente.",
    style: {
      background: "green",
      color: "white",
      borderRadius: "50px",
      fontWeight: "600",
    },
    duration: 1500,
  }).showToast();
  localStorage.setItem("subscribed", JSON.stringify(email));
};

document.addEventListener("submit", contactSubmit);
