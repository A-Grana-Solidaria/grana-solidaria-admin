import "./single-company.css";
import React from "react";
import API from "../../utils/fetch";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Modal from "react-modal";
import ModalCompany from "../../components/modal-company/modal-company";
import Associates from "../../components/associates/associates";
import { Formik } from "formik";
import { useHistory,useRouteMatch } from "react-router-dom";

export default function SingleCompany()  {
  const history = useHistory();
  const { params } = useRouteMatch();
  const [data, setData] = React.useState();
  const [openingDate, setOpeningDate] = React.useState();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = React.useState(false);

  const showModal = () => {
    setModalIsOpen(true);
  };

  const hideModal = () => {
    setModalIsOpen(false);
  };

  const showSaveModal = () => {
    setSaveModalIsOpen(true);
  };

  const hideSaveModal = () => {
    setSaveModalIsOpen(false);
    window.location.reload();
  };

  React.useEffect(() => {
    const getCompany = async () => {
      const response = await API.getCompany(params.id);
      const data = response.data.dados;
      setData({
        id: data.id,
        cnpj: data.cnpj,
        razaosocial: data.razaosocial,
        nomefantasia: data.nomefantasia,
        cellphone: data.cellphone,
        tellphone: data.tellphone,
        inscricaoestadual: data.inscricaoestadual,
        instagram: data.instagram,
        website: data.website,
        openingdate: data.openingdate,
        cep: data.cep,
        numero: data.numero,
        complemento: data.complemento,
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        pais: data.pais
      });
      setOpeningDate(data.openingdate.split(" ", 1).toString());
    }
    getCompany();
  },[]);
  
  return data ? (
    <div className="SingleCompany">
      <Sidebar dreamers={false} companies={true} interests={false} />
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: data.id,
          cnpj: data.cnpj,
          razaosocial: data.razaosocial,
          nomefantasia: data.nomefantasia,
          cellphone: data.cellphone,
          tellphone: data.tellphone,
          inscricaoestadual: data.inscricaoestadual,
          instagram: data.instagram,
          website: data.website,
          openingdate: openingDate,
          cep: data.cep,
          numero: data.numero,
          complemento: data.complemento,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
          pais: data.pais
        }}
        onSubmit={async (formValues) => {
          showSaveModal();
          let formData = new FormData();
          formData.append("cnpj", formValues.cnpj);
          formData.append("razaosocial", formValues.razaosocial);
          formData.append("nomefantasia", formValues.nomefantasia);
          formData.append("cellphone", formValues.cellphone);
          formData.append("tellphone", formValues.tellphone);
          formData.append("inscricaoestadual", formValues.inscricaoestadual);
          formData.append("instagram", formValues.instagram);
          formData.append("website", formValues.website);
          formData.append("openingdate", formValues.openingdate);
          formData.append("cep", formValues.cep);
          formData.append("numero", formValues.numero);
          formData.append("complemento", formValues.complemento);
          formData.append("logradouro", formValues.logradouro);
          formData.append("bairro", formValues.bairro);
          formData.append("cidade", formValues.cidade);
          formData.append("estado", formValues.estado);
          formData.append("pais", formValues.pais);
          const response = await API.updateCompany(params.id, formData);
          showSaveModal();
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
              <Header owner="empresa" single={true} />
                  <div className="companies-content">
                    <div className="header">
                      <h2>{data.razaosocial}</h2>
                    </div>
                    <div className="dreamer-profile">
                      <h3>Perfil da empresa</h3>
                      <div className="dreamer-profile-content">
                        <div className="left">
                          <div className="profile-header">
                            <h4>Informações</h4>
                          </div>
                          <div className="profile">
                            <label>
                              <p>Razão Social</p>
                              <input
                                type="text"
                                id="razaosocial"
                                value={values.razaosocial}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            <label>
                              <p>Nome Fantasia</p>
                              <input
                                type="text"
                                id="nomefantasia"
                                value={values.nomefantasia}
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
                              <p>CNPJ</p>
                              <input
                                type="text"
                                id="cnpj"
                                value={values.cnpj}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.cpf && touched.cpf && (
                              <div className="input-feedback">{errors.cpf}</div>
                            )}
                            <label>
                              {/* ToDo: fix data picker not being populated */}
                              <p>Data de Abertura/Constituição</p>
                              <input
                                type="date"
                                id="openingdate"
                                value={values.openingdate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.cep && touched.cep && (
                              <div className="input-feedback">{errors.cep}</div>
                            )}
                            <label>
                              <p>Número de Telefone Principal</p>
                              <input
                                type="tel"
                                id="tellphone"
                                value={values.tellphone}
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
                              <p>Número de Telefone Celular</p>
                              <input
                                type="text"
                                id="cellphone"
                                value={values.cellphone}
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
                              <p>Inscrião Estadual</p>
                              <input
                                type="text"
                                id="inscricaoestadual"
                                value={values.inscricaoestadual}
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
                              <p>Instagram</p>
                              <input
                                type="text"
                                id="instagram"
                                value={values.instagram}
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
                              <p>Site da empresa</p>
                              <input
                                type="text"
                                id="website"
                                value={values.website}
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
                                value={values.cep}
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
                                id="numero"
                                value={values.numero}
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
                                id="complemento"
                                value={values.complemento}
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
                              <p>Logradouro</p>
                              <input
                                type="text"
                                id="logradouro"
                                value={values.logradouro}
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
                                id="bairro"
                                value={values.bairro}
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
                                id="cidade"
                                value={values.cidade}
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
                                id="estado"
                                value={values.estado}
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
                                id="pais"
                                value={values.pais}
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
              <div className="companies-content">
                <div className="companies-container">
                  <div className="dreamer-profile">
                    <h3>Sócios</h3>
                  </div>
                </div>
              </div>
              <div className="companies-container">
                    <div className="socios">
                      <Associates companyId={data.id}/>
                    </div>
              </div>
              
              <div className="footer">
              <button
                    type="button"
                    onClick={() => {
                      showModal();
                    }}
                  >
                    Deletar perfil
                  </button>
                  <Modal
                    isOpen={modalIsOpen}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <ModalCompany
                      state="delete"
                      id={data.id}
                      type="company"
                      hideModal={hideModal}
                    />
                  </Modal>

                  <button type="submit" className="submit">
                    Salvar
                  </button>
                  <Modal
                    isOpen={saveModalIsOpen}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <ModalCompany state="save" hideModal={hideSaveModal} />
                  </Modal>
              </div>                              
            </form>
          )
        }}
        </Formik>  
    </div>
  ) : (<div></div>);
}