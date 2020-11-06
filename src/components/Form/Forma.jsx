import React from 'react'


function Form() {

    return (
        <div className={style.wrap}>
            <h2>Анкета соискателя</h2>
            
            <form action="#">
                <h3>Личные данные</h3>
                <Input />
                <h3>Пол *</h3>
            </form>
        </div>
    )
}

export default Forma

