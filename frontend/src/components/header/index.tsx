import styles from './header.module.css'

export const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <h1>Грузоперевозки</h1>
        <nav>
          <ul>
            <li><a href="#main">Главная</a></li>
            <li><a href="#services">Услуги</a></li>
            <li><a href="#contacts">Контакты</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}