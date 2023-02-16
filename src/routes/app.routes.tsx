import Reac from "react"
import {
  Route,
  Routes as Switch,
} from "react-router-dom"
import { Layout } from "../components/Layout"
import { Dashboard } from "../pages/Dashboard"
import { List } from "../pages/List"

export const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list/:type" element={<List />} />
      </Switch>
    </Layout>
  )
}