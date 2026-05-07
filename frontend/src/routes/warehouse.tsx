import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/warehouse")({
  component: RouteComponent,
})

function RouteComponent() { //eslint-disable-line
  return (
    <div style={{ background: 'white', minHeight: '100vh', paddingTop: 100 }}>
      <h1 style={{ color: 'black' }}>WAREHOUSES</h1>
    </div>
  )
}