import { Button } from '@nextui-org/react'

function Schedule () {
  const hours = [
    { day: 'Lunes', schedule: '10:00 AM - 10:00 PM' },
    { day: 'Martes', schedule: '10:00 AM - 10:00 PM' },
    { day: 'Miércoles', schedule: '10:00 AM - 10:00 PM' },
    { day: 'Jueves', schedule: '10:00 AM - 10:00 PM' },
    { day: 'Viernes', schedule: '10:00 AM - 10:00 PM' },
    { day: 'Sábado', schedule: '10:00 AM - 10:00 PM' },
    { day: 'Domingo', schedule: 'Cerrado' }
  ]

  const currentDay = new Date().toLocaleDateString('es-MX', { weekday: 'long' })

  return (
    <div>
      <h2 className="text-2xl mb-4 text-center">Horario de Atención</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {hours.map((item, index) => (
          <Button
            key={index}
            className={`flex  flex-col h-20 p-4 rounded-xl ${
              item.day === 'Domingo' ? 'sm: col-span-2 md:col-span-3' : ''
            }`}
            color={
              item.schedule === 'Cerrado'
                ? 'danger'
                : item.day.toLowerCase() === currentDay
                  ? 'primary'
                  : 'default'
            }
            variant={
              item.day.toLowerCase() === currentDay
                ? 'flat'
                : 'light'
            }
          >
            <p className="text-lg font-medium">{item.day}</p>
            <p>{item.schedule}</p>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Schedule
