import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useField } from 'formik'

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  labelSrOnly?: true | 'focusable'
  isRequired?: boolean
}

const InputField = ({
  label,
  type,
  labelSrOnly,
  isRequired,
  size: _,
  ...props
}: InputFieldProps) => {
  const [field, { error }] = useField(props)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name} srOnly={labelSrOnly}>
        {label}
      </FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        isRequired={isRequired}
        type={type}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export default InputField
