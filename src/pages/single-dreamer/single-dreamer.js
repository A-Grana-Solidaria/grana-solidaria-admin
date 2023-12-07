import "./single-dreamer.css";
import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Profile from "../../assets/profile.png";
import { Formik } from "formik";
import API from "../../utils/fetch";
import { useHistory, useRouteMatch } from "react-router-dom";
import Modal from "react-modal";
import ModalDreamer from "../../components/modal-dreamer/modal";
import ModalSupporter from "../../components/modal-supporter/modal-supporter";
import More from "../../assets/more.png";
import * as Yup from "yup";
import Quotas from "../../components/quotas/quotas";
import APISocinal from "../../utils/fetchSocinal";
import Associates from "../../components/associates/associates";

export default function SingleDreamer() {
  const history = useHistory();
  const [data, setData] = React.useState();
  const [birth, setBirth] = React.useState();
  const [status, setStatus] = React.useState("0");
  const [risk, setRisk] = React.useState(null);
  const { params } = useRouteMatch();
  const [approvalBtn, setApprovalBtn] = React.useState("");
  const [reprovalBtn, setReprovalBtn] = React.useState("");
  const [low, setLow] = React.useState("");
  const [medium, setMedium] = React.useState("");
  const [high, setHigh] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = React.useState(false);
  const [supporterModalIsOpen, setSupporterModalIsOpen] = React.useState(false);

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

  const showSupportersModal = () => {
    setSupporterModalIsOpen(true);
  };

  const hideSupportersModal = () => {
    setSupporterModalIsOpen(false);
  };
  React.useEffect(() => {
    const getCompany = async () => {
      const response = await API.getCompany(params.id);
      const data = response.data.dados;
    }
    getCompany();
  })
  React.useEffect(() => {
    const getDreamer = async () => {
      const response = await API.getDreamer(params.id);
      const data = response.data.dados;
      setData({
        user: data.user,
        dream: data.dream,
        supporters: data.allSupporters,
      });
      setBirth(data.user.birthdate.split("T", 1).toString());
      if (data.dream.status === 0) {
        setApprovalBtn("");
        setStatus(0);
        setReprovalBtn("orange");
      } else {
        setApprovalBtn("active-btn");
        setReprovalBtn("");
        setStatus(1);
      }

      if (data.dream.risk === 0) {
        setHigh("orange");
        setLow("");
        setMedium("");
        setRisk(0);
      } else if (data.dream.risk === 1) {
        setHigh("");
        setLow("");
        setMedium("orange");
        setRisk(1);
      } else if (data.dream.risk === 2) {
        setHigh("");
        setLow("orange");
        setMedium("");
        setRisk(2);
      } else {
        setHigh("");
        setLow("");
        setMedium("");
      }
    };
    getDreamer();
  }, []);
  return data ? (
    <div className="SingleDreamer">
      <Sidebar dreamers={true} supporters={false} interests={false} />
      {data.dream.status === 1 ? (
        <Formik
          enableReinitialize={true}
          initialValues={{
            description: data.dream.description,
            progress: data.progress,
            cashgoal: data.dream.cashgoal,
            quotasquantity: data.dream.quotasquantity,
            status: data.dream.status,
            risk: data.dream.risk,
            name: data.user.name,
            birthdate: birth,
            cpf: data.user.cpf,
            cep: data.user.cep,
            phonenumber: data.user.phonenumber,
            email: data.user.email,
            picture: data.user.picture,
          }}
          onSubmit={async (formValues) => {
            formValues.status = status;
            formValues.risk = risk;
            console.log(JSON.stringify(formValues, null, 2));
            showSaveModal();

            let formData = new FormData();

            formData.append("description", formValues.description);
            formData.append("cashgoal", formValues.cashgoal);
            formData.append("quotasquantity", formValues.quotasquantity);
            formData.append("status", formValues.status);
            formData.append("risk", formValues.risk);
            formData.append("name", formValues.name);
            formData.append("birthdate", formValues.birthdate);
            formData.append("cpf", formValues.cpf);
            formData.append("cep", formValues.cep);
            formData.append("phonenumber", formValues.phonenumber);
            formData.append("email", formValues.email);
            formData.append("picture", formValues.picture);

            const response = await API.attDreamer(params.id, formData);
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
            description: Yup.string().required("Campo requerido"),
            cashgoal: Yup.number().required("Campo requerido"),
            quotasquantity: Yup.number().required("Campo requerido"),
            risk: Yup.number().required("Campo requerido"),
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
                <div className="dreamers-container">
                  <Header owner="Empreendedores" single={true} />
                  <div className="dreamers-content">
                    <div className="header">
                      {/* <img
                        src={data.user.picture ? data.user.picture : Profile}
                        alt="imagem de perfil"
                      /> */}
                      <h2>{data.user.name}</h2>
                    </div>

                    <div className="content">
                      <div className="left">
                        <span>Descrição</span>
                        <textarea
                          id="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          readOnly
                        />

                        {errors.description && touched.description && (
                          <div className="input-feedback">
                            {errors.description}
                          </div>
                        )}
                      </div>
                      <div className="right">
                        {/* <div className="progress">
                          <span>Progresso</span>
                          <div className="quotas">
                            <Quotas
                              quotas={data.dream.quotas}
                              total={data.dream.quotasquantity}
                            />
                          </div>
                        </div>

                        {errors.progress && touched.progress && (
                          <div className="input-feedback">
                            {errors.progress}
                          </div>
                        )} */}

                        <div className="numbers">
                          <div className="goal">
                            <span>Valor Solicitado</span>
                            <input
                              type="number"
                              id="cashgoal"
                              value={values.cashgoal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              className="gray"
                            />
                          </div>
                          <div className="goal">
                            <span>Valor Aprovado</span>
                            <input
                              type="number"
                              id="cashgoal"
                              value={values.cashgoal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              className="gray"
                            />
                          </div>
                          <div className="goal">
                            <span>Tx. abertura de relacionamento</span>
                            <input
                              type="number"
                              id="cashgoal"
                              value={values.cashgoal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              className="gray"
                            />
                          </div>
                        </div>
                        <div className="numbers">
                          <div className="goal">
                            <span>Tx. de juros efetiva</span>
                            <input
                              type="number"
                              id="cashgoal"
                              value={values.cashgoal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              className="gray"
                            />
                          </div>
                          <div className="goal">
                            <span>CET</span>
                            <input
                              type="number"
                              id="cashgoal"
                              value={values.cashgoal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              className="gray"
                            />
                          </div>
                          <div className="goal">
                            <span>CET ao ano</span>
                            <input
                              type="number"
                              id="cashgoal"
                              value={values.cashgoal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              className="gray"
                            />
                          </div>
                        </div>
                        <div className="numbers">
                          <div className="goal">
                            <span>Prazo</span>
                            <input
                              type="number"
                              id="cashgoal"
                              value={values.cashgoal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              className="gray"
                            />
                          </div>
                          <div className="goal">
                            <span>Parcelas</span>
                            <input
                              type="number"
                              id="cashgoal"
                              value={values.cashgoal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              className="gray"
                            />
                          </div>
                          <div className="goal">
                            <span>Valor de cada parcela</span>
                            <input
                              type="number"
                              id="cashgoal"
                              value={values.cashgoal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              className="gray"
                            />
                          </div>
                        </div>
                        <div className="numbers">
                          <div className="goal">
                            <span>Valor Total a pagar</span>
                            <input
                              type="number"
                              id="cashgoal"
                              value={values.cashgoal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              className="gray"
                            />
                          </div>
                        </div>






                        {/* <div className="supporters">
                          <div className="supporters-preview">
                            {data.supporters.map((supporter, i) => {
                              if (i <= 8) {
                                return (
                                  <img data-toggle="tooltip" title={supporter.name}
                                    onClick={() => {
                                      history.push(
                                        `${process.env.PUBLIC_URL}/apoiador/${supporter.id}`
                                      );
                                    }}
                                    src={supporter.picture ? supporter.picture : Profile}
                                    alt="foto financiador"
                                  />
                                );
                              } else {
                                return "";
                              }
                            })}

                            {data.supporters.length > 8 ? (
                              <div
                                className="more"
                                onClick={() => {
                                  showSupportersModal();
                                }}
                              >
                                {" "}
                                <img src={More} alt="mais financiadores" />
                                <span>{data.supporters.length - 8}+</span>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div> */}
                        <Modal
                          isOpen={supporterModalIsOpen}
                          className="Modal-supporter-container"
                          overlayClassName="Overlay"
                        >
                          <ModalSupporter
                            hideModal={hideSupportersModal}
                            supporters={data.supporters}
                          />
                        </Modal>
                      </div>
                    </div>
                    <div className="content">

                    </div>

                    <div className="dreamer-profile">
                      <h3>Perfil da empresa</h3>
                      <div className="dreamer-profile-content">
                        {/*<div className="left">
                           <div className="profile-header">
                            <h4>Questionário</h4>
                            <span>
                              Score: <span>{data.dream.total_score}</span>
                            </span>
                          </div>

                          <div className="profile">
                            <div className="question">
                              <p>
                                Você planeja complementar a renda ou quer
                                trabalhar pra você mesmo?
                              </p>
                              <span>
                                {data.dream.question1_status === 0
                                  ? "Complementar a renda"
                                  : "Trabalhar para mim"}
                              </span>
                            </div>
                            <div className="question">
                              <p>
                                Você está trabalhando ou está desempregado?  
                              </p>
                              <span>
                                {data.dream.question2_status === 0
                                  ? "Trabalhando"
                                  : "Desempregado"}
                              </span>
                            </div>
                            <div className="question">
                              <p>
                                Você quer mudar de ramo ou continuar com a
                                profissão que tem?
                              </p>
                              <span>
                                {data.dream.question3_status === 0
                                  ? "Mudar"
                                  : "Continuar"}
                              </span>
                            </div>
                            <div className="question">
                              <p>
                                O negócio que quer montar é fixo, uma banca de
                                lanches por exemplo, ou ambulante como um carro
                                de lanches?
                              </p>
                              <span>
                                {data.dream.question4_status === 0
                                  ? "Fixo"
                                  : "Ambulante"}
                              </span>
                            </div>
                            <div className="question">
                              <p>Vai ser no seu bairro mesmo?</p>
                              <span>
                                {data.dream.question5_status === 0
                                  ? "No meu bairro"
                                  : "Outra Região"}
                              </span>
                            </div>
                            <div className="question">
                              <p>
                                Já fez ou está fazendo algum curso de
                                empreendedorismo ou de investimento pessoal?
                              </p>
                              <span>
                                {data.dream.question6_status === 0
                                  ? "Sim"
                                  : "Não"}
                              </span>
                            </div>
                            <div className="question">
                              <p>Valor estimado</p>
                              <span>{data.dream.estimatedcashgoal}</span>
                            </div>
                          </div>
                        </div> */}
                        {/* 
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
                              <div className="input-feedback">
                                {errors.name}
                              </div>
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
                            {errors.phonenumber && touched.phonenumber && (
                              <div className="input-feedback">
                                {errors.phonenumber}
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
                              <div className="input-feedback">
                                {errors.email}
                              </div>
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
                                    setFieldValue(
                                      "picture",
                                      event.target.files[0]
                                    );
                                  }}
                                  onBlur={handleBlur}
                                />
                              </div>
                            </label>

                            {photosrc ? (
                              <div className="input-feedback">
                                {" "}
                                Foto Alterada!{" "}
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {errors.picture && touched.picture && (
                              <div className="input-feedback">
                                {errors.picture}
                              </div>
                            )}
                          </div>
                        </div> */}
                        <div className="left">
                          <div className="profile-header">
                            <h4>Informações</h4>
                          </div>
                          <div className="profile">
                            <label>
                              <p>Razão Social</p>
                              <input
                                type="text"
                                id="name"
                                value={values.name}
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
                              <p>Nome Fantasia</p>
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
                              <p>CNPJ</p>
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
                              <p>Data de Abertura/Constituição</p>
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
                              <p>Número de Telefone Principal</p>
                              <input
                                type="tel"
                                id="phone"
                                value={values.phonenumber}
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
                                id="email"
                                value={values.email}
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
                                id="email"
                                value={values.email}
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
                                id="email"
                                value={values.email}
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
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </label>
                            {errors.email && touched.email && (
                              <div className="input-feedback">
                                {errors.email}
                              </div>
                            )}
                            {/* <label>
                              <p>Editar foto</p>
                              <div class="file">
                                <p>Carregar foto</p>
                                <input
                                  type="file"
                                  id="picture"
                                  onChange={(event) => {
                                    console.log(event.currentTarget.files[0]);
                                    setFieldValue(
                                      "picture",
                                      event.target.files[0]
                                    );
                                  }}
                                  onBlur={handleBlur}
                                />
                              </div>
                            </label> */}
                            {/* 
                            {photosrc ? (
                              <div className="input-feedback">
                                {" "}
                                Foto Alterada!{" "}
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {errors.picture && touched.picture && (
                              <div className="input-feedback">
                                {errors.picture}
                              </div>
                            )} */}
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
                                id="email"
                                value={values.email}
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
                                value={values.email}
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
                                value={values.email}
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
                                id="email"
                                value={values.email}
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
                                value={values.email}
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
                                value={values.email}
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
                                value={values.email}
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
                                value={values.email}
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
                    <div className="left">
                      <div className="socios">
                        <h3>Sócios</h3>
                        <Associates />
                      </div>
                    </div>
                    <div className="integrations">
                      <span>Socinal</span>
                      <div className="buttons">
                        <button onClick={() => { APISocinal.getTokenSocinal() }}
                          className={approvalBtn} type="button">Token</button>
                      </div>
                      <span>Documentação</span>
                      <div className="buttons">
                        <button onClick={() => { APISocinal.EnviarDocumentoGeral() }}
                          className={approvalBtn} type="button">Enviar documento geral</button>
                        <div className="buttons">
                          <button onClick={() => { APISocinal.EnviarDocumentoProposta() }}
                            className={approvalBtn} type="button">Enviar documento de proposta</button>
                        </div>
                        <div className="buttons">
                          <button onClick={() => { APISocinal.EnviarDocumentoCliente() }}
                            className={approvalBtn} type="button">Enviar documento do cliente</button>
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
                      id={data.user.id}
                      type="dreamer"
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
      ) : (
        <Formik
          enableReinitialize={true}
          initialValues={{
            description: data.dream.description,
            progress: data.progress,
            cashgoal: data.dream.cashgoal,
            quotasquantity: data.dream.quotasquantity,
            status: data.dream.status,
            risk: data.dream.risk,
            name: data.user.name,
            birthdate: birth,
            cpf: data.user.cpf,
            cep: data.user.cep,
            phonenumber: data.user.phonenumber,
            email: data.user.email,
            picture: data.user.picture,
          }}
          onSubmit={async (formValues) => {
            formValues.status = status;
            formValues.risk = risk;
            console.log(JSON.stringify(formValues, null, 2));
            console.log(formValues.picture);

            let data = new FormData();

            data.append("description", formValues.description);
            data.append("cashgoal", formValues.cashgoal);
            data.append("quotasquantity", formValues.quotasquantity);
            data.append("status", formValues.status);
            data.append("risk", formValues.risk);
            data.append("name", formValues.name);
            data.append("birthdate", formValues.birthdate);
            data.append("cpf", formValues.cpf);
            data.append("cep", formValues.cep);
            data.append("phonenumber", formValues.phonenumber);
            data.append("email", formValues.email);
            data.append("picture", formValues.picture);

            showSaveModal();
            const response = await API.attDreamer(params.id, data);
            console.log(response);
            showSaveModal();
          }}
          validationSchema={Yup.object().shape(
            status == 1
              ? {
                name: Yup.string().required("Campo requerido"),
                birthdate: Yup.string().required("Campo requerido"),
                phonenumber: Yup.string().required("Campo requerido"),
                cep: Yup.string().required("Campo requerido"),
                cpf: Yup.string().required("Campo requerido"),
                email: Yup.string().email().required("Campo requerido"),
                description: Yup.string().required("Campo requerido"),
                cashgoal: Yup.number()
                  .typeError("Não pode ser 0")
                  .required("Campo requerido"),
                quotasquantity: Yup.number()
                  .typeError("Não pode ser 0")
                  .required("Campo requerido"),
                // risk: Yup.number.typeError('Selecione alguma opção').required("Campo requerido"),
              }
              : {
                name: Yup.string().required("Campo requerido"),
                birthdate: Yup.string().required("Campo requerido"),
                phonenumber: Yup.string().required("Campo requerido"),
                cep: Yup.string().required("Campo requerido"),
                cpf: Yup.string().required("Campo requerido"),
                email: Yup.string().email().required("Campo requerido"),
                description: Yup.string().required("Campo requerido"),
              }
          )}
        >
          {(props) => {
            const {
              values,
              errors,
              touched,
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div className="dreamers-container">
                  <Header owner="Empreendedores" single={true} />
                  <div className="dreamers-content">
                    <div className="header">
                      <img
                        src={data.user.picture && data.user.picture !== 'null' ? data.user.picture : Profile}
                        alt="imagem de perfil"
                      />
                      <h2>{data.user.name}</h2>
                    </div>

                    <div className="content">
                      <div className="left">
                        <span>Descrição</span>
                        <textarea
                          id="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="right">
                        <div className="progress">
                          <span>Progresso</span>
                          <div className="quotas">
                            <Quotas
                              quotas={data.dream.quotas}
                              total={data.dream.quotasquantity}
                            />
                          </div>
                        </div>

                        <div className="numbers">
                          <div className="goal">
                            <span>Valor da Meta</span>
                            <input
                              type="number"
                              id="cashgoal"
                              placeholder="0"
                              value={values.cashgoal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>

                          <div className="dreamer-quotas">
                            <span>Cotas</span>
                            <input
                              type="number"
                              id="quotasquantity"
                              value={values.quotasquantity}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="0"
                            />
                          </div>
                        </div>
                        {errors.cashgoal && touched.cashgoal && (
                          <div className="input-feedback">
                            {errors.cashgoal}
                          </div>
                        )}

                        {errors.quotasquantity && touched.quotasquantity && (
                          <div className="input-feedback">
                            {errors.quotasquantity}
                          </div>
                        )}
                        <div className="risk">
                          <span>Risco de Investimento</span>
                          <div className="buttons">
                            <button
                              className={high}
                              type="button"
                              onClick={() => {
                                setRisk(0);
                                setHigh("orange");
                                setLow("");
                                setMedium("");
                              }}
                            >
                              Alto
                            </button>
                            <button
                              className={medium}
                              type="button"
                              onClick={() => {
                                setRisk(1);
                                setHigh("");
                                setLow("");
                                setMedium("orange");
                              }}
                            >
                              Médio
                            </button>
                            <button
                              className={low}
                              type="button"
                              onClick={() => {
                                setRisk(2);
                                setHigh("");
                                setLow("orange");
                                setMedium("");
                              }}
                            >
                              Baixo
                            </button>
                          </div>
                        </div>
                        {errors.risk && touched.risk && (
                          <div className="input-feedback">{errors.risk}</div>
                        )}
                        <div className="supporters">
                          <span>
                            Financiadores{" "}
                            <span>
                              {data.supporters
                                ? `${data.supporters.length} financiadores`
                                : ""}
                            </span>
                          </span>

                          {data.supporters.length === 0 ? (
                            <p>Sem financiadores até o momento</p>
                          ) : (
                            ""
                          )}

                          <div className="supporters-preview">
                            {data.supporters.map((supporter, i) => {
                              if (i <= 8) {
                                return (
                                  <img
                                    onClick={() => {
                                      history.push(
                                        `${process.env.PUBLIC_URL}/apoiador/${supporter.id}`
                                      );
                                    }}
                                    src={supporter.picture}
                                    alt="foto financiador"
                                  />
                                );
                              } else {
                                return "";
                              }
                            })}
                            {data.supporters.length > 8 ? (
                              <div
                                className="more"
                                onClick={() => {
                                  showSupportersModal();
                                }}
                              >
                                {" "}
                                <img src={More} alt="mais financiadores" />
                                <span>{data.supporters.length - 8}+</span>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                        <Modal
                          isOpen={supporterModalIsOpen}
                          className="Modal-supporter-container"
                          overlayClassName="Overlay"
                        >
                          <ModalSupporter
                            hideModal={hideSupportersModal}
                            supporters={data.supporters}
                          />
                        </Modal>
                        <div className="status">
                          <span>Status</span>
                          <div className="buttons">
                            <button
                              className={reprovalBtn}
                              type="button"
                              onClick={() => {
                                setStatus(0);
                                setReprovalBtn("orange");
                                setApprovalBtn("");
                              }}
                            >
                              Reprovar
                            </button>
                            <button
                              className={approvalBtn}
                              type="button"
                              onClick={() => {
                                setStatus(1);
                                setReprovalBtn("");
                                setApprovalBtn("active-btn");
                              }}
                            >
                              Aprovar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="dreamer-profile">
                      <h3>Perfil do empreendedor</h3>
                      <div className="dreamer-profile-content">
                        <div className="left">
                          <div className="profile-header">
                            <h4>Questionário</h4>
                            <span>
                              Score: <span>{data.dream.total_score}</span>
                            </span>
                          </div>

                          <div className="profile">
                            <div className="question">
                              <p>
                                Você planeja complementar a renda ou quer
                                trabalhar pra você mesmo?
                              </p>
                              <span>
                                {data.dream.question1_status === 0
                                  ? "Complementar a renda"
                                  : "Trabalhar para mim"}
                              </span>
                            </div>
                            <div className="question">
                              <p>
                                Você está trabalhando ou está desempregado?
                              </p>
                              <span>
                                {data.dream.question2_status === 0
                                  ? "Trabalhando"
                                  : "Desempregado"}
                              </span>
                            </div>
                            <div className="question">
                              <p>
                                Você quer mudar de ramo ou continuar com a
                                profissão que tem?
                              </p>
                              <span>
                                {data.dream.question3_status === 0
                                  ? "Mudar"
                                  : "Continuar"}
                              </span>
                            </div>
                            <div className="question">
                              <p>
                                O negócio que quer montar é fixo, uma banca de
                                lanches por exemplo, ou ambulante como um carro
                                de lanches?
                              </p>
                              <span>
                                {data.dream.question4_status === 0
                                  ? "Fixo"
                                  : "Ambulante"}
                              </span>
                            </div>
                            <div className="question">
                              <p>Vai ser no seu bairro mesmo?</p>
                              <span>
                                {data.dream.question5_status === 0
                                  ? "No meu bairro"
                                  : "Outra Região"}
                              </span>
                            </div>
                            <div className="question">
                              <p>
                                Já fez ou está fazendo algum curso de
                                empreendedorismo ou de investimento pessoal?
                              </p>
                              <span>
                                {data.dream.question6_status === 0
                                  ? "Sim"
                                  : "Não"}
                              </span>
                            </div>
                            <div className="question">
                              <p>Valor estimado</p>
                              <span>{data.dream.estimatedcashgoal}</span>
                            </div>
                          </div>
                        </div>

                        {/* <div className="right">
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
                            <label>
                              <p>Editar foto</p>
                              <div class="file">
                                <p>Carregar foto</p>
                                <input
                                  type="file"
                                  id="picture"
                                  onChange={(event) => {
                                    console.log(event.currentTarget.files[0]);
                                    let reader = new FileReader();
                                    reader.onloadend = () => {
                                      setphotosrc(reader.result);
                                    };
                                    reader.readAsDataURL(event.target.files[0]);
                                    setFieldValue(
                                      "picture",
                                      event.target.files[0]
                                    );
                                  }}
                                  onBlur={handleBlur}
                                />
                              </div>
                            </label>
                            {photosrc ? (
                              <div className="input-feedback">
                                {" "}
                                Foto Alterada!{" "}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div> */}
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
                      id={data.user.id}
                      type="dreamer"
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
      )}
    </div>
  ) : (
    <div></div>
  );
}
