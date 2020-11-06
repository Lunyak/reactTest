import React from 'react'
import Input from '../Input/Input'
import style from './form.module.css'
import { Formik } from 'formik'
import * as yup from 'yup'

function Form() {

    const validationsSchema = yup.object().shape({
        firstName: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        secondName: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        email: yup.string().email('Введите верный email').required('Обязательно'),
        load: '',
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
                    <div>
                        <label className={ style.label } htmlFor='firstName'>
                            {touched.firstName && errors.firstName ? errors.firstName : 'текст' }
                        </label>
                        <input
                            className={style.input}
                            type={'text'}
                            name={'firstName'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                    </div>
                    {touched.firstName && errors.firstName && <div className={'error'}>{errors.firstName}</div>}


                    <div>
                        <label className={ style.label } htmlFor='secondName'>Фамилия *</label>
                        <input
                            className={style.input}
                            type={'text'}
                            name={'secondName'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.secondName}
                        />
                    </div>
                    {touched.secondName && errors.secondName && <div className={'error'}>{errors.secondName}</div>}

                    <div>
                        <label className={ style.label } htmlFor='email'>Электронная почта *</label>
                        <input
                            className={style.input}
                            type={'text'}
                            name={'email'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                    </div>
                    {touched.load && errors.load && <p className={'error'}>{errors.load}</p>}

                    <div>
                        <label className={ style.labelLoad } htmlFor='load'>Загрузите резюме</label>
                        <input
                            className={style.inputLoad}
                            type={'file'}
                            name={'load'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.load}
                        />
                    </div>
                    {touched.load && errors.load && <p className={'error'}>{errors.load}</p>}

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
