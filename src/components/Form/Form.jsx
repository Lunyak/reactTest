import React from 'react'
import Input from '../Input/Input'
import style from './form.module.css'

function Form() {

    // const [errors, setErrors] = useState({ 'email': false });
    
    return (
        <div className={style.wrap}>
            <h2>Анкета соискателя</h2>
            
            <form action="#">
                <h3>Личные данные</h3>
                <Input />
                <h3>Пол *</h3>
                {/* <RadioInput> */}
            </form>
        </div>
    )
}

export default Form
