import React from 'react'
import style from './popupSubmit.module.css'

function PopupSubmit( { popup, setPopup, name} ) {
  return (
    <>
    <div className= {popup ? style.popupOpen : style.popupClose }>
      <div className={style.wrap}>
          <h2 className={style.title}>Спасибо {name}!</h2>
          <p className={style.subtitle} >Мы скоро свяжемся с вами</p>
          <button 
            onClick={ () => { setPopup(false) } }
            className={style.submit}>Понятно</button>
        </div>
    </div>
    </> 
  )
}

export default PopupSubmit
