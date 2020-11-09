import React, { useState } from "react";
import style from "./form.module.css";
import { Formik, FieldArray, Field } from "formik";
import * as yup from "yup";
import Icon from "../../image/File";
import PopupSubmit from "../PopupSubmit/PopupSubmit";
import PopupRules from "../PopupRules/PopupRules";
import Chest from "../../image/Chest";

function Form() {
  const [popupSubmit, setPopupSubmit] = useState(false);
  const [popupRules, setPopupRules] = useState(false);
  const [name, setName] = useState('');
  const [file, setFile] = useState('');

  const getError = (touched, error) => {
    return (
      touched &&
      error && (
        <div key={error} className={style.error}>
          {" "}
          {error}{" "}
        </div>
      )
    );
  };

  const validationsSchema = yup.object().shape({
    firstName: yup

      .string()
      .matches(
        /[^\s0-9`~!@#№$%^&*()_=+\\|\[\]{};:',.<>\/?]$/,
        "В имени могут быть только буквы"
      )
      .matches(/^[а-я\w-]{3,99}$/i, "Имя слишком короткое")
      .matches(/^[а-я\w-]{0,12}$/i, "Имя слишком длинное")
      .required("Поле должно быть заполненным"),

    secondName: yup
      .string()
      .matches(
        /[^\s0-9`~!@#№$%^&*()_=+\\|\[\]{};:',.<>\/?]$/,
        "В фамилии могут быть только буквы"
      )
      .matches(/^[а-я\w-]{3,99}$/i, "Фамилия слишком короткая")
      .matches(/^[а-я\w-]{0,12}$/i, "Фамилия слишком длинная")
      .required("Поле должно быть заполненным"),

    email: yup.string().email("Некорректный email").required("Введите email"),

    file: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            file: yup
              .mixed()
              .test("fileSize", "Размер файла больше 16 байт", (value) => {
                if (!value) return false;
                return value.size < 16000000;
              })
              .required(),
            type: yup
              .string()
              .oneOf(
                [
                  `application/vnd.ms-publisher`,
                  `application/pdf`,
                  `application/msword`,
                  `text/plain`,
                  `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
                ],
                " "
              )
              .required(""),
            name: yup.string().required(""),
          })
          .typeError("Добавьте файл")
      )
      .required("Добавьте файл"),

    gender: yup.string().required("укажите пол"),
    link: yup.string().url("неверный формат"),
    toggle: yup.boolean(),
  });

  const getFileSchema = (file) =>
    file && {
      file: file,
      type: file.type,
      name: file.name,
    };

  const getArrErrorsMessages = (errors) => {
    const result = [];
    errors &&
      Array.isArray(errors) &&
      errors.forEach((value) => {
        if (typeof value === "string") {
          result.push(value);
        } else {
          Object.values(value).forEach((error) => {
            result.push(error);
          });
        }
      });
    return result;
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            firstName: "",
            secondName: "",
            email: "",
            file: undefined,
            gender: "",
            link: "",
            toggle: false,
          }}
          validateOnBlur
          
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            setPopupSubmit(true);
            setName(values.firstName)
            resetForm({ values: "" });
          }}
          validationSchema={validationsSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            dirty,
          }) => (
            <div className={style.wrap}>
              <h2>Анкета соискателя</h2>
              <h3>Личные данные</h3>
              <div className={style.personal}>
              
                <div className={style.item}>
                  
                  <label className={style.label} htmlFor="firstName">
                    Имя *
                  </label>
                  <input
                    className={
                      errors.firstName ? style.inputError : style.input
                    }
                    type={"text"}
                    name={"firstName"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName || ""}
                  />
                  {touched.firstName && errors.firstName && (
                    <div className={style.error}>{errors.firstName}</div>
                  )}
                </div>

                <div className={style.item}>
                  <label className={style.label} htmlFor="secondName">
                    Фамилия *
                  </label>
                  <input
                    className={
                      errors.secondName ? style.inputError : style.input
                    }
                    type={"text"}
                    name={"secondName"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.secondName || ""}
                  />
                  {touched.secondName && errors.secondName && (
                    <div className={style.error}>{errors.secondName}</div>
                  )}
                </div>

                <div className={style.item}>
                  <label className={style.label} htmlFor="email">
                    Электронная почта *
                  </label>
                  <input
                    className={errors.email ? style.inputError : style.input}
                    type={"text"}
                    name={"email"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email || ""}
                  />
                  {touched.email && errors.email && (
                    <div className={style.error}>{errors.email}</div>
                  )}
                </div>

                <FieldArray name={"file"}>
                  {(arryHelper) => (
                    <div className={style.fileWrap}>
                      {!values.file ? (
                        <label className={style.fileLabel} htmlFor={"file"}>
                          {values.file
                            ? <div className={style.namefile}>{values.file[0].name}</div> 
                            : "Загрузите резюме"}
                        </label>
                      ) : (
                        <label
                          className={
                            errors.file && values.file
                              ? style.fileError
                              : style.fileLoad
                          }
                          htmlFor={"file"}
                        >
                          <Icon />
                          {values.file
                            ? <div className={style.namefile}>{values.file[0].name}
                                <button 
                                    type='reset'
                                    onClick={ ()=> {arryHelper.remove(0)} }
                                    > 
                                  <Chest />
                                </button>
                              </div> 
                            : "Загрузите резюме"}
                        </label>
                      )}

                      <input
                        className={style.inputLoad}
                        type={"file"}
                        name={"file"}
                        id={"file"}
                        // onBlur={handleBlur}
                        onChange={(event) => {
                          const { files } = event.target;
                          const file = getFileSchema(files.item(0));
                          if (!file) {
                            arryHelper.remove(0);
                          }
                          if (Array.isArray(values.file)) {
                            arryHelper.replace(0, file);
                          } else {
                            arryHelper.push(file);
                          }
                        }}
                      />
                      {errors.file && values.file === undefined && (
                        <div className={style.error}>{errors.file}</div>
                      )}
                      {getArrErrorsMessages(errors.file).map((error) =>
                        getError(true, error)
                      )}
                    </div>
                  )}
                </FieldArray>
              </div>

              <div className={style.gender}>
                <div className={style.titleWrap}>
                  <h3>Пол *</h3>
                  {touched.gender && errors.gender && (
                    <div className={style.errorGender}>{errors.gender}</div>
                  )}
                </div>
                <div className={style.radioButonsWrap}>
                  <div className={style.radioButton}>
                    <input
                      id="male"
                      type="radio"
                      value="male"
                      name="gender"
                      onChange={handleChange}
                      defaultChecked={values.gender === "male"}
                    />
                    <label className="labelRadioButton" htmlFor="male">
                      Мужской
                    </label>
                  </div>
                  <div className={style.radioButton}>
                    <input
                      id="female"
                      type="radio"
                      value="female"
                      name="gender"
                      onChange={handleChange}
                      defaultChecked={values.gender === "female"}
                    />
                    <label className="labelRadioButton" htmlFor="female">
                      Женский
                    </label>
                  </div>
                </div>
              </div>

              <div className={style.link}>
                <div className={style.item}>
                  <h3>GitHub</h3>
                  <label className={style.label} htmlFor="link">
                    Вставьте ссылку на Github
                  </label>
                  <input
                    className={style.linkInput}
                    type={"url"}
                    name={"link"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.link}
                    placeholder={`Вставьте ссылку на Github`}
                  />

                  {touched.link && errors.link && (
                    <div className={style.error}>{errors.link}</div>
                  )}
                </div>
              </div>

              <div className={style.checkboxWrap}>
                <Field type="checkbox" name="toggle" />
                <p>
                  * Я согласен с{" "}
                  <div
                    onClick={() => {
                      setPopupRules(true);
                    }}
                    className={style.rules}
                  >
                    политикой конфиденциальности
                  </div>
                </p>
              </div>

              <button
                disabled={(!values.toggle && !isValid) || !dirty}
                className={style.submit}
                onClick={handleSubmit}
                type={`submit`}
              >
                Отправить
              </button>
            </div>
          )}
        </Formik>
      </div>

      <PopupSubmit popup={popupSubmit} setPopup={setPopupSubmit} name={name}/>
      <PopupRules popup={popupRules} setPopup={setPopupRules} />
    </>
  );
}

export default Form;
