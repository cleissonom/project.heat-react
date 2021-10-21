import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import styles from "./styles.module.scss"

import logoImg from '../../assets/logo.svg'

interface Message {
   created_at: string,
   id: string,
   text: string,
   user: {
      name: string,
      avatar_url: string
   }
}

const messagesQueue: Message[] = []

const socket = io('http://localhost:4000')

socket.on('new_message', (newMessage: Message) => {
   messagesQueue.push(newMessage)
})

export const MessageList = () => {
   const [messages, setMessages] = useState<Message[]>([])

   useEffect(() => {
      const timer = setInterval(() => {
         if (messagesQueue.length > 0) {
            setMessages(prevState => [
               messagesQueue[0],
               prevState[0],
               prevState[1],
            ].filter(Boolean));

            messagesQueue.shift();
         }
      }, 3000);

      return () => clearInterval(timer);
   }, []);

   useEffect(() => {
      api.get<Message[]>('messages/last3').then(response => {
         setMessages(response.data)
      })
   }, [])

   return (
      <div className={styles.messageListWrapper}>
         <img src={logoImg} alt="Logo DoWhile 2021" />

         <ul className={styles.messageList}>
            {messages.map((message) => {
               return (
                  <li key={message.id} className={styles.message}>
                     <p className={styles.messageContent}>{message.text}</p>
                     <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                           <img src={message.user.avatar_url} alt={message.user.name} />
                        </div>
                        <span>{message.user.name}</span>
                     </div>
                     <div className={styles.messageDate}>
                        {new Date(message.created_at).toLocaleDateString()}
                     </div>
                  </li>
               )
            })}
         </ul>
      </div>
   )
}
