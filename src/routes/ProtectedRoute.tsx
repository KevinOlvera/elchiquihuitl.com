import { Navigate } from 'react-router-dom'
import { type AuthenticatedUser } from '../models/users'

interface ProtectedRouteProps {
  user: AuthenticatedUser
  redirectPath?: string
  children: React.ReactNode
}

function ProtectedRoute (props: ProtectedRouteProps) {
  console.group('[ProtectedRoute]')
  console.log('user', props.user)
  if (props.user.user === null) {
    console.log('user is null, redirecting to /')
    console.groupEnd()
    return <Navigate to={props.redirectPath ?? '/'} replace />
  }
  console.groupEnd()
  return props.children
};

export default ProtectedRoute
