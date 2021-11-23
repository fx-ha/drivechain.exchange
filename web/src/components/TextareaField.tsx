import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react'
import { useField } from 'formik'

type TextareaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  label: string
  labelSrOnly?: true | 'focusable'
  isRequired?: boolean
}

const TextareaField = ({
  label,
  labelSrOnly,
  isRequired,
  ...props
}: TextareaFieldProps) => {
  const [field, { error }] = useField(props)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name} srOnly={labelSrOnly}>
        {label}
      </FormLabel>
      <Textarea
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        isRequired={isRequired}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export default TextareaField
