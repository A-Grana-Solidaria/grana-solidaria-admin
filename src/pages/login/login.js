import "./login.css";
import React from "react";
import Logo from "../../assets/logo.png";
import { useHistory } from "react-router-dom";
import API from "../../utils/fetch";
import { Formik } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

function Login() {
  const history = useHistory();
  const [inputClasses, setInputClasses] = React.useState("none");
  return (
    <div className="Login">
      <div class="Login">
        <div class="login-container">
          <div class="box">
            <img src={Logo} alt="Grana Solidária Logo" />
            <p>dashboard administrativo</p>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={async (formValues) => {
                // console.log(JSON.stringify(formValues, null, 2)); why was it loggin it?

                try {
                  const response = await API.auth(
                    formValues.email,
                    formValues.password
                  );
                  const data = response.data;

                  if (data.dados.token) {
                    API.updateAuthorization(data.dados.token);
                    setInputClasses("none");
                    history.push(`${process.env.PUBLIC_URL}/empresas`);
                  }
                } catch (error) {
                  setInputClasses("input-feedback");
                }
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required("Campo requerido."),
              })}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <input
                      id="email"
                      placeholder="Usuário"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}

                    <input
                      id="password"
                      placeholder="Senha"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <button type="submit" className="submit">
                      Login
                    </button>
                    <div className={inputClasses}>
                      Senha ou email incorretos.
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
