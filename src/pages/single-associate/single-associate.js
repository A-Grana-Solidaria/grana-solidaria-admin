import "./single-associate.css";
import React from "react";
import API from "../../utils/fetch";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Associates from "../../components/associates/associates";
import { Formik } from "formik";
import { useHistory,useRouteMatch } from "react-router-dom";

export default function SingleAssociate()  {
  const history = useHistory();
  const { params } = useRouteMatch();
  const [data, setData] = React.useState();
  React.useEffect(() => {
    const getAssociate = async () => {
      const response = await API.getAssociate(params.id);
      console.log(response.data.dados);
      const data = response.data.dados;
      setData({
        id: data.id,
        name: data.name,
        cpf: data.cpf,
        mothersname: data.mothersname,
        politicallyexposed: data.politicallyexposed,
        companyadm: data.companyadm,
        signsforcompany: data.signsforcompany,
        cep:data.cep,
        number:data.numero,
        address:data.address,
        complement:data.complement,
        city:data.city,
        neighborhood:data.neighborhood,
        state:data.state,
        country:data.country,
      });
    }
    getAssociate();
  },[]);
  return data ? (
    <div className="SingleCompany">
      <Sidebar dreamers={false} companies={true} interests={false} />
      {/*data.status*/1 === 1 ? (
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: data.id,
          name: data.name,
          cpf: data.cpf,
          mothersname: data.mothersname,
          politicallyexposed: data.politicallyexposed,
          companyadm: data.companyadm,
          signsforcompany: data.signsforcompany,
          
        }}
        onSubmit={async (formValues) => {
          
        }}
        >
          {(props) => {
            const {
              values,
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <div className="companies-container">
              <Header owner="sócio" single={true} />
                  <div className="companies-content">
                    <div className="dreamer-profile">
                      <h3>Perfil do Sócio</h3>
                      <div className="dreamer-profile-content">
                        <div className="left">
                          <div className="profile-header">
                            <h4>Informações</h4>
                          </div>
                          <div className="profile">
                            <label>
                              <p>Nome</p>
                              <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.name && touched.name && (
                              <div className="input-feedback">
                                {errors.name}
                              </div>
                            )}
                            <label>
                              <p>CPF</p>
                              <input
                                type="text"
                                id="birthdate"
                                value={data.cpf}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.birthdate && touched.birthdate && (
                              <div className="input-feedback">
                                {errors.birthdate}
                              </div>
                            )}
                            <label>
                              <p>Nome da mãe</p>
                              <input
                                type="text"
                                id="cpf"
                                value={data.mothersname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.cpf && touched.cpf && (
                              <div className="input-feedback">{errors.cpf}</div>
                            )}
                            <label>
                              <p>Sócio Administrador?</p>
                              <input
                                type="text"
                                id="phone"
                                value={data.companyadm === '1' ? "Sim" : "Não"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.phonenumber && touched.phonenumber && (
                              <div className="input-feedback">
                                {errors.phonenumber}
                              </div>
                            )}
                             <label>
                              <p>Assina pela empresa?</p>
                              <input
                                type="text"
                                id="signsforcompany"
                                value={data.signsforcompany === '1' ? "Sim" : "Não"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.cep && touched.cep && (
                              <div className="input-feedback">{errors.cep}</div>
                            )}
                          </div>
                        </div>
                        <div className="right">
                          <div className="profile-header">
                            <h4>Endereço</h4>
                          </div>
                          <div className="profile">
                            <label>
                              <p>CEP</p>
                              <input
                                type="text"
                                id="cep"
                                value={data.cep}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.email && touched.email && (
                              <div className="input-feedback">
                                {errors.email}
                              </div>
                            )}
                            <label>
                              <p>Número</p>
                              <input
                                type="text"
                                id="email"
                                value={data.number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.email && touched.email && (
                              <div className="input-feedback">
                                {errors.email}
                              </div>
                            )}
                            <label>
                              <p>Endereço</p>
                              <input
                                type="text"
                                id="email"
                                value={data.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.email && touched.email && (
                              <div className="input-feedback">
                                {errors.email}
                              </div>
                            )}
                            <label>
                              <p>Complemento</p>
                              <input
                                type="text"
                                id="email"
                                value={data.complement}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.email && touched.email && (
                              <div className="input-feedback">
                                {errors.email}
                              </div>
                            )}
                            <label>
                              <p>Bairro</p>
                              <input
                                type="text"
                                id="email"
                                value={data.neighborhood}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.email && touched.email && (
                              <div className="input-feedback">
                                {errors.email}
                              </div>
                            )}
                            <label>
                              <p>Cidade</p>
                              <input
                                type="text"
                                id="email"
                                value={data.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.email && touched.email && (
                              <div className="input-feedback">
                                {errors.email}
                              </div>
                            )}
                            <label>
                              <p>Estado</p>
                              <input
                                type="text"
                                id="email"
                                value={data.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.email && touched.email && (
                              <div className="input-feedback">
                                {errors.email}
                              </div>
                            )}
                            <label>
                              <p>País</p>
                              <input
                                type="text"
                                id="email"
                                value={data.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.email && touched.email && (
                              <div className="input-feedback">
                                {errors.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>                             
            </form>
          )
        }}
        </Formik>  
      ):(<div></div>)}
    </div>
    
  ) : (<div></div>);
}