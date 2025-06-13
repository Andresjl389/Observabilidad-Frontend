import React, { useState } from "react";
import "../../../Assets/Styles/UI/Login/login.css";
import loginImage from "../../../Assets/Images/login.svg";
import emailIcon from "../../../Assets/Images/email.svg";
import passwordIcon from "../../../Assets/Images/passwordIcon.svg";
import closeEye from "../../../Assets/Images/close-eye.svg";
import eye from "../../../Assets/Images/eye.svg";
import { FooterCompoent, HeaderComponent } from "../../Components";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../../service";
import { useAuth } from "../../../Context/Auth/AuthContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Obtener la ruta a la que redirigir después del login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Intentar login
      console.log("Iniciando proceso de login...");
      const response = await loginService({ email, password });
      if (!response || !response.access_token) {
        throw new Error("Error en la autenticación");
      }
      login(response.access_token);
      navigate("/main");
    } catch (err: any) {
      console.error("Error de login:", err);
      setError(err.message || "Error en el inicio de sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeaderComponent Button={true} url="/" />
      <div className="login-container">
        <div className="login-illustration">
          <img src={loginImage} alt="Login illustration" />
        </div>

        <div className="login-form-container">
          <div className="login-header">
            <h1>Welcome</h1>
            <h2>Back</h2>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <div className="input-container">
                <div className="input-icon">
                  <img src={emailIcon} alt="Email icon" />
                </div>
                <input
                  type="email"
                  placeholder="example@davivienda.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-container">
                <div className="input-icon">
                  <img src={passwordIcon} alt="Password icon" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="***********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <img src={eye} alt="Show password" />
                  ) : (
                    <img src={closeEye} alt="Hide password" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Login"}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}

          <div className="register-link">
            <span>Don't have an account? </span>
            <a href="/register">Register</a>
          </div>
        </div>
      </div>
      <FooterCompoent />
    </>
  );
};

export default LoginPage;
