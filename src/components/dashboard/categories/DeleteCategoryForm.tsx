import { Button } from '@nextui-org/react'
import { useCategoryActions } from '../../../hooks/useCategoryActions'
import { type Category } from '../../../models/category'
import { toastWrapper } from '../../../services/api'
import { deleteCategory, getCategories } from '../../../services/api/categories'
import { ExclamationTriangleIcon } from '../../common/Icons'

interface DeleteCategoryFormProps {
  category: Category
  onClose: () => void
}

function DeleteCategoryForm(props: DeleteCategoryFormProps) {
  const { setCategories, setPagination } = useCategoryActions()

  const handleDelete = () => {
    console.group('[DeleteCategoryForm][handleDelete]')
    void toastWrapper(deleteCategory(props.category.id))
      .then((result) => {
        console.log('deleteUser', result)
        void getCategories()
          .then((response) => {
            console.log('getUsers', response)
            const { data, pagination } = response.data
            setCategories(data)
            setPagination(pagination)
          })
        props.onClose()
      })
    console.groupEnd()
  }

  return (
    <div
      className='flex flex-col gap-2 py-4'
    >
      <ExclamationTriangleIcon
        className='text-yellow-500 w-24 h-24 align-middle mx-auto'
      />
      <p
        className='text-center'
      >
        ¿Seguro que quieres eliminar esta categoría?
      </p>

      <span className='text-2xl text-center uppercase'>{props.category.name}</span>

      <div
        className='flex flex-row gap-4 justify-center pt-4 pb-2'
      >
        <Button onPress={props.onClose} color='danger' variant='flat'>Cancelar</Button>
        <Button color='primary' onPress={handleDelete}>Continuar</Button>
      </div>
    </div>
  )
}

export default DeleteCategoryForm
