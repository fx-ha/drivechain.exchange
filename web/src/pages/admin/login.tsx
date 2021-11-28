import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'
import { Box, Button } from '@chakra-ui/react'
import { InputField, Layout } from '../../components'
import { MeDocument, MeQuery, useLoginMutation } from '../../generated/graphql'
import { apolloClient as client } from '../../utils'

const LoginAdmin = () => {
  const router = useRouter()

  const [login] = useLoginMutation({ client })

  return (
    <Layout title="Login | Admin | Drivechain Exchange">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async ({ username, password }) => {
          const { data, errors } = await login({
            variables: { username, password },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.login.user,
                },
              })
            },
          })

          if (data?.login.errors) {
            console.error(errors)
          } else if (data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              if (data.login.user.role === 'admin') {
                router.push('/admin')
              }
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box maxW="375px">
              <Box mb="6">
                <InputField
                  label="username"
                  name="username"
                  placeholder="username"
                  isRequired
                />
              </Box>

              <Box mb="6">
                <InputField
                  label="password"
                  name="password"
                  placeholder="password"
                  type="password"
                  isRequired
                />
              </Box>

              <Button type="submit" isLoading={isSubmitting}>
                login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default LoginAdmin
