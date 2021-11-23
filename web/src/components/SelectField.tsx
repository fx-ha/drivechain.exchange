import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react'
import { useField } from 'formik'

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  name: string
  label: string
  labelSrOnly?: true | 'focusable'
  isRequired?: boolean
}

const SelectField = ({
  label,
  labelSrOnly,
  isRequired,
  size: _,
  ...props
}: SelectFieldProps) => {
  const [field, { error }] = useField(props)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name} srOnly={labelSrOnly}>
        {label}
      </FormLabel>
      <Select
        {...field}
        {...props}
        // id={`${props.id}-${props.name}-select`}
        id={field.name}
        placeholder={props.placeholder}
        isRequired={isRequired}
        fontSize={{ base: 'smaller', sm: 'initial' }}
      >
        {props.children}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export default SelectField
