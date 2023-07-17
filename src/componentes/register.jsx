import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";
import bcrypt from "bcryptjs";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// Add the following line to include the polyfill
const Register = (props) => {
  const USER_TEST = /^[A-Za-z]{4,24}$/;
  const PASSWORD_TEST = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[(),!#])[a-zA-Z\d(),!#]{8,23}$/;

  const [username, setUsername] = useState("");
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);

  const [password2, setPassword2] = useState("");
  const [matchFocus, setMatchFocus] = useState(false);

  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const URIUsuario = "http://localhost:8000/usuario/";
  const [validName, setValidName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    setValidName(USER_TEST.test(nombre));
  }, [nombre]);

  useEffect(() => {
    setValidPassword(PASSWORD_TEST.test(password));
  }, [password]);

  useEffect(() => {
    setValidMatch(password === password2);
  }, [password2, password]);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setPwdFocus(true);
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const usuario = await axios.get(URIUsuario + "/email/" + username)
      console.log(usuario)
      if(usuario.data.email===username){
        Swal({
          title: "¡Error!",
          text: "El correo ya está registrado",
          icon: "error",
        });
      }else{
        if (validName && validPassword && validMatch) {

      // Hash the password
       const hashedPassword = await bcrypt.hash(password, 10);
 
       // Perform login logic here with username and hashed password

       await axios.post(URIUsuario, {
         nombre: nombre,
         contrasena: hashedPassword,
         email: username,
       });
              Swal({
         title: "¡Correo enviado!",
         text: "Ahora revisa tu correo para verificar",
         icon: "success",
       });
           navigate("/verificar");}

    }} catch (error) {
      if (error.response.status === 409) {
        Swal({
          title: "¡Error!",
          text: "El correo ya está registrado",
          icon: "error",
        });
      }
    }}


    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-8">Registrarte</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input mt-4 w-full"
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p id="uidnote" className={nombre && !validName ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            De 4 a 24 caracteres<br />
            Tiene que emepzar con una letra<br />
            No se aceptan caracteres especiales
          </p>
          <input
            type="email"
            placeholder="Correo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input border mt-4 w-full"
            required
          />
          <input
            type={showPassword ? "text" : "password"}

            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input mt-4 w-full"
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />


          <p id="pwdnote" className={!validPassword && password ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            De 8 a 24 caracteres<br />
            Debe incluir una mayuscula y una minuscula, un numero y un caracter especial<br />
            Los caracteres especiales son: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="input mt-4 w-full"
            required
          />
          <p id="pwd2note" className={!validMatch && password2? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Las contraseñas deben coincidir
          </p>

          <button className="w-full mt-4 beautiful-button" disabled={!validName || !validPassword || !validMatch ? true : false}>Registrate</button>
        </form>
        <button
          className="link-btn negro"
          onClick={() => props.onFormSwitch("login")}
        >
          ¿Ya tienes una cuenta? Inicia sesión aquí.
        </button>
      </div>
    );
  };

  export default Register;
