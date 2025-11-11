// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const messageBox = document.getElementById("formMessage");
  const API_URL = "https://webfrancais-backend.onrender.com/api/auth/register"; // ✅ URL de Render

  // Mostrar mensajes en pantalla
  const showMessage = (msg, type = "info") => {
    messageBox.textContent = msg;
    messageBox.className =
      type === "success"
        ? "text-green-600 font-medium"
        : type === "error"
        ? "text-red-600 font-medium"
        : "text-gray-600";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const submitBtn = form.querySelector("button[type='submit']");

    // Validaciones básicas
    if (!name || !email || !password) {
      showMessage("⚠️ Por favor completa todos los campos.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("📧 El correo no tiene un formato válido.", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("🔑 La contraseña debe tener al menos 6 caracteres.", "error");
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Registrando...";

      // ✅ Llamada al backend en Render
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage(`✅ Registro exitoso. Bienvenido, ${data.user?.name || name}!`, "success");
        form.reset();
        // Puedes redirigir al index si quieres:
        // window.location.href = "index.html";
      } else {
        showMessage(`❌ ${data.message || "Error al registrar el usuario."}`, "error");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      showMessage("⚠️ No se pudo conectar con el servidor.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Registrarme";
    }
  });
});
