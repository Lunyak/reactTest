import React from 'react'
import style from './form.module.css'
import { Formik, FieldArray } from 'formik'
import * as yup from 'yup'

function Form() { 
    
    const getError = (touched, error) => {
        return touched && error && <div key={error} className={style.label}>{error}</div>
    }

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

        file: yup.array().of(yup.object().shape({
            file: yup.mixed().test('fileSize', 'Размер файла больше 16 Мбайт', (value) => {
                if (!value) return false
                return value.size < 15000000
            }).required(),
            type: yup.string().oneOf([], 'Неверный формат').required(),
            name: yup.string().required()
            }).typeError('Добавьте файл')).required('')
        })

    const getFileShema = (file) => file && {
        file: file,
        type: file.type,
        name: file.name
    }

    const getArrErrorsMessage = (errors) => { 
        const result = []
        errors && Array.isArray(errors) && errors.forEach((value) => { 
            if (typeof value === 'string') {
                result.push(value)
            } else {
                Object.values(value).forEach((error) => {result.push(error)})
            }
        })
        return result
    } 

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
                    


                    <FieldArray name={ 'file' }>
                        {( arryHelper ) => (
                            <div>
                            <label className={ style.labelLoad } htmlFor={'file'}>Загрузите резюме</label>
                            <input
                                className={style.inputLoad}
                                type={'file'}
                                name={'file'}
                                id={'file'}
                                onChange={(event) => {
                                    const { files } = event.target
                                    const file = getFileShema(files.item(0))
                                    if (!file) {
                                        arryHelper.remove(0)
                                    }
                                    if (Array.isArray(values.file)) {
                                        arryHelper.replace(0, file)
                                    } else { 
                                        arryHelper.push(file)
                                    }
                                }}
                            />
                            {touched.file && errors.file && <div className={style.error}>{errors.file}</div>}
                            {touched.file && errors.file && <p className={style.error}>{errors.file}</p>}
                            {getArrErrorsMessage(errors.file).map((error) => getError(true, error))}
                        </div>
                        )}
                    </FieldArray>

                <button
                    // disabled={!isValid || !dirty}
                    onClick={handleSubmit}
                    type={`submit`}
                    >Отправить
                </button>
                </div>
                )}
            </Formik>
        </div>
    );
}

export default Form
