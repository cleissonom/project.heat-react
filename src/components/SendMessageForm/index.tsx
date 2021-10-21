import { FormEvent, useContext, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api'
import styles from './styles.module.scss'

export const SendMessageForm = () => {
   const { user, signOut } = useContext(AuthContext)
   const [message, setMessage] = useState(" ")

   async function handleSendMessage(event: FormEvent) {
      event.preventDefault()

      if (!message.trim()) {
         return;
      }

      api.post('messages', { message })

      setMessage('');
   }

   return (
      <div className={styles.sendMessageFormWrapper}>
         <button onClick={signOut} className={styles.signOutButton}>
            <VscSignOut size="32" />
         </button>

         <header className={styles.userInformation}>
            <div className={styles.userImage}>
               <img src={user?.avatar_url} alt={user?.name} />
            </div>
            <strong className={styles.userName}>{user?.name}</strong>
            <a href={`https://github.com/${user?.login}`} className={styles.userGithub}>
               <VscGithubInverted size="16" />
               {user?.login}
            </a>
         </header>

         <form onSubmit={handleSendMessage} className={styles.sendMessageForm} action="">
            <label htmlFor="message">Mensagem</label>
            <textarea
               name="message"
               id="message"
               placeholder="Qual sua expectativa para o evento?"
               onChange={event => { setMessage(event.target.value) }}
            />
            <button type="submit">Enviar Mensagem</button>
         </form>
      </div>
   )
}