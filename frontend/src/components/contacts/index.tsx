import styles from './contacts.module.css'


export const Contacts = () => {
  return (
    <section id="contacts" className={styles.contacts}>
      <div className={styles.container}>
        <h2>Контакты</h2>
        <div className={styles.contactsInfo}>
          <p> +375251230987</p>
          <p> perevozki@gruzov.org</p>
          <p> Мадагаскар, ул. Ламборгини, 4</p>
        </div>
      </div>
    </section>
  )
}