import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/warehouse")({
  component: RouteComponent,
})

function RouteComponent() {  // eslint-disable-line
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <h1>WAREHOUSES</h1>
    </div>
  )
}