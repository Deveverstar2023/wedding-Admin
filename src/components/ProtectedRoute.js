import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.auth.user)
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}
export default ProtectedRoute
