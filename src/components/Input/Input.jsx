import React, { useState } from 'react'
import validator from "validator";
import style from './input.module.css'


function Input() {

    const EMPTY_ERRORS = {
        firstName: '',
        lastName: '',
        email: '',
    }

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState(EMPTY_ERRORS)

    function validateFistName() {
        const re = /^[a-z0-9_-]{3,16}$/;
        return re.test(String(firstName).toLowerCase());
    }
    function validateEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    const validate = () => {
        let result = true
        // Check email
        if (!email) {
            debugger;
            setErrors({ ...errors, email: 'Поле не может быть пустым' })
            result = false
        } else {
            if (!validateEmail()) {
                setErrors({ ...errors, email: 'Неверный формат' })
                result = false
            }
        } 
        // if (!firstName) {
        //     setErrors({ ...errors, firstName: 'Введите имя' })
        //     result = false
        // } else {
        //     if (!validateFistName) {
        //         setErrors({ ...errors, firstName: 'Неверный формат' })
        //         result = false
        //     }
        // }
        return result
    }
    const clickSubmit = () => {
        if (validate()) {
            console.log('Send to backend!')
            setErrors(EMPTY_ERRORS)
            setEmail('')
            setFirstName('')
        }
    }






// return (
//     <div id='table'>
//         <input className={errors.email && 'testWrong'} value={email} onChange={(e) => setEmail(e.target.value)} />
//         <label>{errors.email}</label>
//         <button onClick={clickSubmit}>Send!</button>
//     </div>
// )




    return (
        <div className={style.inputWrap}>
            <div>
                <label htmlFor="name" className={style.label}>{ errors.firstName ? errors.firstName : 'Имяцукцу *' }</label>
                <input 
                    className={style.input}
                    type="text" 
                    name="name" 
                    value={firstName} 
                    onChange={ (event) => setFirstName(event.target.value) } 
                    placeholder='Имя'
                />
            </div>
            
            <div>
                <label htmlFor="secondName" className={style.label} >Фамилия *</label>
                <input 
                    className={style.input}
                    type="text" 
                    name="secondName" 
                    value={lastName} 
                    onChange={ (event) => setLastName(event.target.value) }  
                    placeholder='Фамилия'
                />
            </div>
            
            <div>
                <label 
                    htmlFor="email" 
                    className={ errors.email ? style.labelWrong : style.label }>{ errors.email ? errors.email : 'Электронная почта *' }</label>
                <input 
                    className={style.input}
                    name='email'
                    type="text" name="email" 
                    value={email} onChange={ (event) => setEmail(event.target.value) } 
                    placeholder='Электронная почта' 
                />
            </div>

            <div>
                <input type="file" 
                    name="file" id="file" 
                    className={style.inputLoad} 
                    accept="doc, .docx, .xls, .xlsx, .txt, .zip, .7z, .7zip"
                />
                <label for="file" className={style.labelLoad} >
                <p className={style.p}>Загрузить резюме</p></label>
            </div>

            <div>
                <button type='button' className={style.submit} onClick={clickSubmit} ></button>
            </div>
        </div>
    )
}

export default Input
