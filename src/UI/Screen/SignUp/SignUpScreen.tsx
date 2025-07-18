import React, { useState } from "react";
import "../../../Assets/Styles/UI/Login/login.css";
import loginImage from "../../../Assets/Images/Image.svg";
import emailIcon from "../../../Assets/Images/email.svg";
import passwordIcon from "../../../Assets/Images/passwordIcon.svg";
import userIcon from "../../../Assets/Images/user.svg"; // agrega un ícono de usuario
import closeEye from "../../../Assets/Images/close-eye.svg";
import eye from "../../../Assets/Images/eye.svg";
import { FooterCompoent, HeaderComponent } from "../../Components";
import { useNavigate } from "react-router-dom";
import { SignupService } from "../../../service";
import { toast } from "react-toastify";
// import { registerService } from "../../../service"; // servicio que debes implementar

const SignUpScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await SignupService({ name, email, password });
        console.log(response)
      if (!response) {
        throw new Error("No se pudo registrar");
      }
      toast.success(`${name}, tu registro fue exitoso`)
      navigate("/login");
    } catch (err: any) {
      console.error("Error en el registro:", err);
      setError(err.message || "Error en el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeaderComponent Button={true} url="/" />
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-header">
            <h1>Create</h1>
            <h2>Account</h2>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
          {/* <form className="login-form" > */}
            <div className="form-group">
              <label>Name</label>
              <div className="input-container">
                <div className="input-icon">
                  <img src={userIcon} alt="User icon" />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

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
              {isLoading ? "Cargando..." : "Register"}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}

          <div className="register-link">
            <span>Already have an account? </span>
            <a href="/login">Login</a>
          </div>
        </div>

        <div className="login-illustration">
          <img src={loginImage} alt="Register illustration" />
        </div>
      </div>
      <FooterCompoent />
    </>
  );
};

export default SignUpScreen;
