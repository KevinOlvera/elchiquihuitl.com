import { Button, Checkbox, Input, Link } from '@nextui-org/react'
import { toast } from 'sonner'

import { EnvelopeIcon, LockClosedIcon } from '../common/Icons'
import { useAuthenticationActions } from '../../hooks/useAuthenticationActions'
import { type AuthenticatedUser } from '../../models/users'
import { login } from '../../services/api/authentication'

interface LoginFormProps {
  onClose: () => void
}

function LoginForm(props: LoginFormProps) {
  const { setAuthenticatedUser } = useAuthenticationActions()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)

    const data: Record<string, string> = {}

    form.forEach((value, key) => {
      if (typeof value === 'string') {
        data[key] = value
      }
    })

    if (data.email === '' || data.password === '') {
      toast.error('Todos los campos son requeridos')
      return
    }

    const { email, password } = data

    const result = login(email, password)
      .then((result) => {
        const { data } = result
        const authenticatedUser: AuthenticatedUser = {
          token: data.token,
          user: data.user,
          iat: data.iat,
          exp: data.exp
        }
        setAuthenticatedUser(authenticatedUser)
        props.onClose()
      })

    toast.promise(result, {
      loading: 'Loading...',
      success: () => {
        return 'Usuario autenticado correctamente'
      },
      error: 'Ocurrió un error al autenticar el usuario'
    })
  }

  return (
    <div
      className='flex flex-col gap-4'
    >
      <h1
        className='text-2xl font-bold'
      >
        Login
      </h1>
      <form
        action='submit'
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <Input
          autoFocus
          endContent={
            <EnvelopeIcon className='w-6 h-6 text-default-400 pointer-events-none flex-shrink-0'/>
          }
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
          name='email'
          isRequired
        />
        <Input
          endContent={
            <LockClosedIcon className='w-6 h-6 text-default-400 pointer-events-none flex-shrink-0'/>
          }
          label="Password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
          name='password'
          isRequired
        />
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: 'text-small'
            }}
            name='remember'
          >
            Remember me
          </Checkbox>
          <Link color='primary' size='sm'>
            Forgot password?
          </Link>
        </div>

        <div
          className='flex flex-row gap-2 justify-end'
        >
          <Button color="danger" variant="flat" onPress={props.onClose}>
          Cerrar
          </Button>
          <Button
            color="primary"
            type='submit'
          >
            Enviar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
