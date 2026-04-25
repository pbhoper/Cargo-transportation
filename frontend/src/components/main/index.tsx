import React, {useState} from 'react';
import styles from './main.module.css';

interface FormData {
  fullName: string;
  fromAddress: string;
  toAddress: string;
  phone: string;
  email: string;
}

export const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    fromAddress: '',
    toAddress: '',
    phone: '',
    email: '',
  });

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);

    setFormData({
      fullName: '',
      fromAddress: '',
      toAddress: '',
      phone: '',
      email: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name as keyof FormData]: value}));
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = () => {

    console.log('Данные заказа:', formData);
    closeModal();
  };

  return (
    <>
      <main>
        <section id="main" className={styles.hero}>
          <div className={styles.container}>
            <h2>Ненадежные грузоперевозки по всей стране</h2>
            <p>Медленно, Небезопасно, Невыгодно. Автопарк из 1+ машин.</p>
            <button className={`${styles.ctaBtn} ${styles.ctaBtnn}`} onClick={openModal}>
              Заказать перевозку
            </button>
          </div>
        </section>

        <section className={`${styles.services} ${styles.servicesSection}`}>
          <div className={styles.container}>
            <h2 className={styles.servicesH2}>Наши услуги</h2>
            <div className={styles.servicesGrid}>
              <div className={`${styles.serviceCard} ${styles.serviceCardH} ${styles.serviceCardHover}`}>
                <h3>Автоперевозки</h3>
                <p>Полуприцепы до 20 тонн. Любые грузы.</p>
              </div>
              <div className={`${styles.serviceCard} ${styles.serviceCardH} ${styles.serviceCardHover}`}>
                <h3>Складские услуги</h3>
                <p>Хранение и обработка грузов.</p>
              </div>
              <div className={`${styles.serviceCard} ${styles.serviceCardH} ${styles.serviceCardHover}`}>
                <h3>Документооборот</h3>
                <p>ТТН, путевые листы, отчеты.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className={styles.contacts}>
          <div className={styles.container}>
            <h2>Контакты</h2>
            <div className={styles.contactInfo}>
              <p>+375251230987</p>
              <p>perevozki@gruzov.org</p>
              <p>Мадагаскар, ул. Ламборгини, 4</p>
            </div>
          </div>
        </section>
      </main>

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h3>Заказать перевозку</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName">ФИО:</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="fromAddress">Адрес откуда:</label>
                <input
                  id="fromAddress"
                  type="text"
                  name="fromAddress"
                  value={formData.fromAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="toAddress">Адрес куда:</label>
                <input
                  id="toAddress"
                  type="text"
                  name="toAddress"
                  value={formData.toAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Номер телефона:</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Почта:</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.modalButtons}>
                <button type="submit">Отправить</button>
                <button type="button" onClick={closeModal}>Закрыть</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};