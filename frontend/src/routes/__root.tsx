import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() { // eslint-disable-line
  return (
    <React.Fragment>
      <div>Hello "__root"!</div>
      <Outlet />
    </React.Fragment>
  )
}
