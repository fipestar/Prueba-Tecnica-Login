document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".login__form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.querySelector(".login__button");

    verificarSesion();

    function verificarSesion() {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            alert(`✅ ¡Bienvenido de nuevo, ${usuarioGuardado}!`);
            mostrarBotonCerrarSesion();
        }
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        limpiarErrores();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!validarFormulario(email, password)) return;

        // Mostrar efecto de carga
        loginButton.disabled = true;
        loginButton.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Cargando...`;

        try {
            const response = await fetchLogin(email, password);
            if (response.success) {
                localStorage.setItem("usuario", email);
                alert("✅ Inicio de sesión exitoso. ¡Bienvenido!");
                location.reload();
            } else {
                throw new Error("❌ Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            alert(error.message);
            loginButton.disabled = false;
            loginButton.innerHTML = "Iniciar sesión";
        }
    });

    function validarFormulario(email, password) {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isValid = true;

        if (!emailRegex.test(email)) {
            mostrarError(emailInput, "⚠️ El correo electrónico no es válido.");
            isValid = false;
        }
        if (password.length < 6) {
            mostrarError(passwordInput, "⚠️ La contraseña debe tener al menos 6 caracteres.");
            isValid = false;
        }
        return isValid;
    }

    function mostrarError(input, mensaje) {
        let errorElement = document.createElement("p");
        errorElement.classList.add("error-message");
        errorElement.textContent = mensaje;
        input.parentNode.appendChild(errorElement);
    }

    function limpiarErrores() {
        document.querySelectorAll(".error-message").forEach(e => e.remove());
    }

    function mostrarBotonCerrarSesion() {
        const logoutBtn = document.createElement("button");
        logoutBtn.textContent = "Cerrar sesión";
        logoutBtn.classList.add("login__button");
        document.body.appendChild(logoutBtn);

        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("usuario");
            alert("👋 Sesión cerrada.");
            location.reload();
        });
    }

    async function fetchLogin(email, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const validUser = "usuario@correo.com";
                const validPassword = "123456";

                if (email === validUser && password === validPassword) {
                    resolve({ success: true });
                } else {
                    resolve({ success: false });
                }
            }, 2000); // Simulación de delay de API
        });
    }
});

/**=============== Mostrar / Ocultar Contraseña ==================**/
function passwordAccess(loginPass, loginEye) {
    const input = document.getElementById(loginPass),
          iconEye = document.getElementById(loginEye);
    
    iconEye.addEventListener("click", () => {
        input.type = input.type === "password" ? "text" : "password";
        iconEye.classList.toggle("ri-eye-fill");
        iconEye.classList.toggle("ri-eye-off-fill");
    });
}
passwordAccess("password", "loginPassword");
