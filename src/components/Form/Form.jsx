import React from 'react'
import style from './form.module.css'
import { Formik, FieldArray } from 'formik'
import * as yup from 'yup'

function Form() { 
    // 
    const validationsSchema = yup.object().shape({
        firstName: yup.string()
        .matches(/[^\s0-9`~!@#№$%^&*()_=+\\|\[\]{};:',.<>\/?]$/, 'некоректное имя')
        .matches(/^[а-я\w-]{3,99}$/i, 'Имя слишком короткое')
        .matches(/^[а-я\w-]{0,12}$/i, 'Имя слишком длинное')
        .required("Поле должно быть заполненным"),

        secondName: yup.string()
        .matches(/[^\s0-9`~!@#№$%^&*()_=+\\|\[\]{};:',.<>\/?]$/, 'некоректное имя')
        .matches(/^[а-я\w-]{3,99}$/i, 'Фамилия слишком короткое')
        .matches(/^[а-я\w-]{0,12}$/i, 'Фамилия слишком длинное')
        .required("Поле должно быть заполненным"),

        email: yup.string().email('Некорректный email').required('Введите email'),
        file: undefined,
    })

    return (
        <div>
            <Formik
                initialValues={{
                firstName: '',
                secondName: '',
                email: '',
                load: '',
                }}
                validateOnBlur
                onSubmit={(values) => { console.log(values) }}
                validationSchema={validationsSchema}
            >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (

                <div className={style.wrap}>

                    <div className={style.item}>
                        <label className={ style.label } htmlFor='firstName'>
                            Имя *
                        </label>
                        <input
                            className={style.input}
                            type={'text'}
                            name={'firstName'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                        />
                        { touched.firstName && errors.firstName && <div className={style.error}>{errors.firstName}</div> }
                    </div>



                    <div className={style.item}>
                        <label className={ style.label } htmlFor='secondName'>
                            Фамилия *
                        </label>
                        <input
                            className={style.input}
                            type={'text'}
                            name={'secondName'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.secondName}
                        />
                        { touched.secondName && errors.secondName && <div className={style.error}>{errors.secondName}</div> }
                    </div>



                    <div className={style.item}>
                        <label className={ style.label } htmlFor='email'>Электронная почта *</label>
                        <input
                            className={style.input}
                            type={'text'}
                            name={'email'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {touched.email && errors.email && <div className={style.error}>{errors.email}</div>}
                    </div>
                    

                    <div>
                        <label className={ style.labelLoad } htmlFor='load'>Загрузите резюме</label>
                        <input
                            className={style.inputLoad}
                            type={'file'}
                            name={'file'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // value={values.load}
                        />
                        {touched.file && errors.file && <p className={style.error}>{errors.file}</p>}
                    </div>


                <button
                    // disabled={!isValid || !dirty}
                    onClick={handleSubmit}
                    type={<code>submit</code>}
                    >Отправить</button>
                </div>
                )}
            </Formik>
        </div>
    );
}

export default Form
