import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() { //eslint-disable-line
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}