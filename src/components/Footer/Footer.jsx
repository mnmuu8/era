import React from 'react'
import Instagram from '../../assets/img/instagram.png'

const Footer = () => {
  return (
    <footer className='c-footer'>
      <div className='inner'>
        <ul className='sns'>
          <li><a href="https://www.instagram.com/era.hand_made/" target="_blank"><img src={Instagram} alt="instagram" /></a></li>
        </ul>
        <ul className='links'>
          <li><a href="/contact">お問い合わせ</a></li>
          <li><a href="/">特定商取引法に基づく表記</a></li>
          <li><a href="/">プライバシーポリシー</a></li>
        </ul>
        <h1 className='logo'>era</h1>
        <p className='caution'>
          お問合せ受付時間<br />
          平日 10:00～17:00<br />
          ※土日・祝日・年末年始(12月29日～1月3日)は休業とさせていただきます。
        </p>
        <span className='copylight'>&copy; 2023 era</span>
      </div>
    </footer>
  )
}

export default Footer
