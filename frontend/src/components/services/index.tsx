import styles from './services.module.css'

export const Services = () => {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <h2>Наши услуги</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <h3>Автоперевозки</h3>
            <p>Полуприцепы до 20 тонн. Любые грузы.</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Складские услуги</h3>
            <p>Хранение и обработка грузов.</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Документооборот</h3>
            <p>ТТН, путевые листы, отчеты.</p>
          </div>
        </div>
      </div>
    </section>
  )
}