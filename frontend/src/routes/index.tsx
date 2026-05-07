import { createFileRoute } from '@tanstack/react-router'
import {Main} from "../components/main";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() { //eslint-disable-line
  return <Main />
}
