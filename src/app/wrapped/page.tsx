import SignUpButton from '@/components/landing/SignUpButton'
import styles from '../../styles/wrapped.module.scss'
import Header from '@/components/header/Header'

export default function WrappedPage() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>2024 Travel Wrapped</h1>
        <h2>See where you've been this year.</h2>
        <SignUpButton />
      </div>
    </>
  )
}
