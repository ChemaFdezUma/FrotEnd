import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";
import axios from "axios";
import useAuth from "./hooks/useAuth";
import CryptoJS from "crypto-js";
const Login = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const URIUsuario = `http://localhost:8000/usuario/email/${username}`;
  const { auth, setAuth } = useAuth();
  function decryptData(encryptedData, key) {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
  useEffect(() => {
    console.log(auth)
    if (auth.valido==1) {
      Swal({
        title: "Ya estas logeado",
        text: "No puedes iniciar sesión si ya estas logeado",
        icon: "error",
      });
      navigate("/")
    }
  }, [navigate])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/usuario/login/`,
        {
          email: username,
          password: password,
        }, { withCredentials: true } // Incluir esta opción para enviar las cookies
      );
      const accessToken = response?.data?.encryptedAccessToken;
      const decryptedData = decryptData(accessToken, "2f39e0e1a84904c8f6edfd1bc9721d3d");
      setAuth({ username, password, accessToken, valido: 1 });
      if (decryptedData) {
        Swal({
          title: "¡Inicio de sesión exitoso!",
          text: "Bienvenido",
          icon: "success",
        });
        const d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = "TOKENWST=" + response.data.encryptedRefreshToken + ";" + expires + ";path=/";
        navigate("/ropa")
      } else {
        Swal({
          title: "Error",
          text: "La contraseña es incorrecta",
          icon: "error",
        });
      }

      /*if (usuario) {
        const passwordMatch = await bcrypt.compare(password, usuario.contrasena);

        if (passwordMatch) {
          // Contraseña correcta, realizar acciones adicionales si es necesario
          Swal({
            title: "¡Inicio de sesión exitoso!",
            text: "Bienvenido",
            icon: "success",
          });

          // Redirigir a la página de inicio después del inicio de sesión exitoso
          navigate("/");
        } else {
          // Contraseña incorrecta
          Swal({
            title: "Error",
            text: "La contraseña es incorrecta",
            icon: "error",
          });
        }
      } else {
        // No se encontró el usuario
        Swal({
          title: "Error",
          text: "El correo electrónico no está registrado",
          icon: "error",
        });
      }*/
    } catch (err) {

      if (!err?.response) {
        Swal({
          title: "Error",
          text: "Estamos teniendo problemas con el servidor, intenta más tarde",
          icon: "error",
        });
      } else if (err.response?.status === 400) {
        Swal({
          title: "Error",
          text: "Faltan datos para iniciar sesión",
          icon: "error",
        });
      } else if (err.response?.status === 401) {
        Swal({
          title: "Error",
          text: "No autorizado",
          icon: "error",
        });
      } else {
        Swal({
          title: "Error",
          text: "Inicio de sesión fallido",
          icon: "error",
        });
      }

      Swal({
        title: "Error",
        text: "Datos incorrectos",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-8">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Correo"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input border mt-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input mt-4 w-full"
          required
        />

        <button type="submit" className="w-full mt-4 beautiful-button">
          Iniciar sesión
        </button>
      </form>
      <button
        className="link-btn negro"
        onClick={() => props.onFormSwitch("register")}
      >
        ¿No tienes una cuenta? Regístrate aquí.
      </button>
    </div>
  );
};

export default Login;
