import { useState } from 'react'
import s from './PAGE.module.css'

type Status = 'idle' | 'sent'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')

  if (status === 'sent') {
    return (
      <div className={s.successWrapper}>
        <div className={s.successIcon}>✅</div>
        <h2 className={s.successTitle}>Message sent!</h2>
        <p className={s.successSub}>Thanks for reaching out. We'll get back to you soon.</p>
        <button onClick={() => setStatus('idle')} className={s.btn}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Contact</h1>
      <p className={s.sub}>Found a bug or have a question? Reach out.</p>
      <form onSubmit={(e) => { e.preventDefault(); setStatus('sent') }} className={s.form}>
        <label className={s.label}>
          Name
          <input className={s.input} placeholder="Your name" required />
        </label>
        <label className={s.label}>
          Email
          <input type="email" className={s.input} placeholder="you@example.com" required />
        </label>
        <label className={s.label}>
          Message
          <textarea className={s.input} rows={5} placeholder="Write your message…" required />
        </label>
        <button type="submit" className={s.btn}>Send message</button>
      </form>
    </div>
  )
}
