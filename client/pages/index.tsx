import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ROUTES } from '../constants'

export default () => {
  const router = useRouter()

  useEffect(() => {
    router.push(ROUTES.VACATIONS)
  })

  return null
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: ROUTES.VACATIONS,
      permanent: true,
    },
  }
}
