import "./single-supporter.css";
import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Profile from "../../assets/profile.png";
import { Formik } from "formik";
import * as Yup from "yup";
import API from "../../utils/fetch";
import { useRouteMatch } from "react-router-dom";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import ModalDreamer from "../../components/modal-dreamer/modal";

export default function SingleSupporter() {
  const [data, setData] = React.useState();
  const [birth, setBirth] = React.useState();
  const { params } = useRouteMatch();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = React.useState(false);
  const [photoModalIsOpen, setPhotoModalIsOpen] = React.useState(false);
  const [ photosrc, setphotosrc ] = React.useState('')
  const history = useHistory();

  const showModal = () => {
    setModalIsOpen(true);
  };

  const hideModal = () => {
    setModalIsOpen(false);
  };

  const showPhotoModal = () => {
    setPhotoModalIsOpen(true);
  };

  const hidePhotoModal = () => {
    setPhotoModalIsOpen(false);
  };

  const showSaveModal = () => {
    setSaveModalIsOpen(true);
  };

  const hideSaveModal = () => {
    setSaveModalIsOpen(false);
    window.location.reload();
  };

  React.useEffect(() => {
    const getSupporter = async () => {
      const response = await API.getSupporter(params.id);
      const data = response.data;
      console.log(data);
      setData({
        supporterData: data.dados.supporterData,
        dreamsData: data.dados.dreamsData,
      });
      setBirth(data.dados.supporterData.birthdate.split("T", 1).toString());
    };
    getSupporter();
  }, []);
  return data ? (
    <div class="SingleSupporter">
      <Sidebar dreamers={false} supporters={true} interests={false} />
      {console.log("p´perra", data)}
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: data.supporterData.name,
          birthdate: birth,
          cpf: data.supporterData.cpf,
          cep: data.supporterData.cep,
          phonenumber: data.supporterData.phonenumber,
          email: data.supporterData.email,
          picture: data.supporterData.picture,
        }}
        onSubmit={async (formValues) => {
          console.log(JSON.stringify(formValues, null, 2));
          showSaveModal();

          let formData = new FormData();

          formData.append("name", formValues.name);
          formData.append("birthdate", formValues.birthdate);
          formData.append("cpf", formValues.cpf);
          formData.append("cep", formValues.cep);
          formData.append("phonenumber", formValues.phonenumber);
          formData.append("email", formValues.email);
          formData.append("picture", formValues.picture);

          const response = await API.attSupporter(params.id, formData);
          const data = response.data;
          console.log(data);
          showSaveModal();
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Campo requerido"),
          birthdate: Yup.string().required("Campo requerido"),
          phonenumber: Yup.string().required("Campo requerido"),
          cep: Yup.string().required("Campo requerido"),
          cpf: Yup.string().required("Campo requerido"),
          email: Yup.string().email().required("Campo requerido"),
        })}
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
              <div className="supporters-container">
                <Header owner="financiadores" single={true} />
                <div className="supporters-content">
                  <div className="header">
                    <img
                      src={
                        data.supporterData.picture
                          ? data.supporterData.picture
                          : Profile
                      }
                      alt="imagem de perfil"
                    />
                    <h2>{data.supporterData.name}</h2>
                  </div>

                  <div className="supporter-profile">
                    <div className="supporter-profile-content">
                      <div className="left">
                        <div className="profile-header">
                          <h4>Informações de Cadastro</h4>
                        </div>
                        <div className="profile">
                          <label>
                            <p>Nome Completo</p>
                            <input
                              type="text"
                              id="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </label>
                          {errors.name && touched.name && (
                            <div className="input-feedback">{errors.name}</div>
                          )}
                          <label>
                            <p>Data de Nascimento</p>
                            <input
                              type="date"
                              id="birthdate"
                              value={values.birthdate}
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
                            <p>CPF</p>
                            <input
                              type="text"
                              id="cpf"
                              value={values.cpf}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </label>
                          {errors.cpf && touched.cpf && (
                            <div className="input-feedback">{errors.cpf}</div>
                          )}
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
                          {errors.cep && touched.cep && (
                            <div className="input-feedback">{errors.cep}</div>
                          )}
                          <label>
                            <p>Telefone</p>
                            <input
                              type="tel"
                              id="phone"
                              value={values.phonenumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </label>
                          {errors.phoneNumber && touched.phoneNumber && (
                            <div className="input-feedback">
                              {errors.phoneNumber}
                            </div>
                          )}
                          <label>
                            <p>E-Mail</p>
                            <input
                              type="text"
                              id="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </label>
                          {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                          )}
                          <label>
                            <p>Editar foto</p>
                            <div class="file">
                              <p>Carregar foto</p>
                              <input
                                type="file"
                                id="picture"
								onChange={(event) => {
									console.log(event.currentTarget.files[0]);
									let reader = new FileReader()
									reader.onloadend = () => {
										setphotosrc(reader.result)
									}
									reader.readAsDataURL(event.target.files[0])
									setFieldValue("picture", event.target.files[0]);
								  }}
                                onBlur={handleBlur}
                              />
							 <Modal
                                isOpen={photoModalIsOpen}
                                className="Modal"
                                overlayClassName="Overlay"
                              >
                                <div className="close">
                                  <button onClick={hidePhotoModal}>x</button>
                                </div>
                                <ModalDreamer state="photo" />
                              </Modal>
                            </div>
                          </label>
						  {photosrc ? (<div className="input-feedback"> Foto Alterada! </div>) : (<div></div>) }
                          {errors.picture && touched.picture && (
                            <div className="input-feedback">
                              {errors.picture}
                            </div>
                          )}
                          <hr />

                          <div className="question">
                            <p>Quanto deseja investir?</p>
                            <span>{data.supporterData.investingbudget}</span>
                          </div>
                          <div className="question">
                            <p>Modalidade de investimento</p>
                            <span>
                              {data.supporterData.investingtype === 0
                                ? "Pontual"
                                : "Recorrente"}
                            </span>
                          </div>
                          <div className="question">
                            <p>Possui experiência?</p>
                            <span>
                              {data.supporterData.hasinvestingexperience
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="right">
                        <div className="profile-header-right">
                          <h5>Projetos apoiados</h5>
                        </div>

                        <div className="profile">
                          <table>
                            <thead>
                              <tr>
                                <th>Nome</th>
                                <th>Cotas</th>
                                <th>Risco</th>
                              </tr>
                            </thead>
                            {data.dreamsData.map((element) => {
                              return (
                                <tbody
                                  onClick={() => {
                                    history.push(
                                      `${process.env.PUBLIC_URL}/sonhador/${element.dreamid}`
                                    );
                                  }}
                                >
                                  <td>{element.name}</td>
                                  <td>{element.count}</td>
                                  <td>
                                    {element.risk === 0
                                      ? "Alto"
                                      : element.risk === 1
                                      ? "Médio"
                                      : "Baixo"}
                                  </td>
                                </tbody>
                              );
                            })}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  <ModalDreamer
                    state="delete"
                    id={data.supporterData.id}
                    type="supporter"
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
                  <ModalDreamer state="save" hideModal={hideSaveModal} />
                </Modal>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  ) : (
    <div></div>
  );
}
