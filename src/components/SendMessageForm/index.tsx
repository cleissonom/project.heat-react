import { useContext } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'
import styles from './styles.module.scss'

export const SendMessageForm = () => {
   const { user } = useContext(AuthContext)

   return (
      <div className={styles.sendMessageFormWrapper}>
         <button className={styles.signOutButton}>
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

         <form className={styles.sendMessageForm} action="">
            <label htmlFor="message">Mensagem</label>
            <textarea name="message" id="message" placeholder="Qual sua expectativa para o evento?" />
            <button type="submit">Enviar Mensagem</button>
         </form>
      </div>
   )
}
