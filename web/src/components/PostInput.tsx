import React, { useState } from 'react'
import { Box, Collapse, HStack, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { TopicsQuery, useCreatePostMutation } from '../generated/graphql'
import { apolloClient as client } from '../utils'
import { InputField, SelectField, TextareaField } from '.'

const PostInput = ({ topics }: { topics: TopicsQuery | undefined }) => {
  const [showPostOptions, setShowPostOptions] = useState(false)

  const [createPost] = useCreatePostMutation({
    client,
  })

  const router = useRouter()

  return (
    <Box mx={{ md: '10' }} mb="9">
      <Formik
        initialValues={{ depositChain: '', header: '', headline: '', body: '' }}
        onSubmit={async ({ depositChain, header, headline, body }) => {
          const text =
            body === undefined || body === ''
              ? headline
              : `${headline}\n${body}`

          const { data, errors } = await createPost({
            variables: { depositChain, header, text },
          })

          if (!errors && data && data?.createPost !== null) {
            router.push(`/post/${data?.createPost?.id}`)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              mb="3"
              onFocus={() => {
                setShowPostOptions(true)
              }}
            >
              <InputField
                label="Headline"
                name="headline"
                labelSrOnly
                placeholder={
                  showPostOptions ? 'Headline (max 64 chars)' : "What's new?"
                }
                maxLength={64}
                isRequired
              />
            </Box>

            <Collapse in={showPostOptions} animateOpacity>
              <Box>
                <Box mb="3">
                  <TextareaField
                    label="Body"
                    name="body"
                    labelSrOnly
                    placeholder="Body"
                  />
                </Box>

                <HStack spacing="3">
                  <SelectField
                    label="Header"
                    name="header"
                    labelSrOnly
                    placeholder="Select topic"
                    isRequired
                  >
                    {topics?.topics.map((topic, index) => (
                      <option key={index} value={topic.hex}>
                        {topic.name}
                      </option>
                    ))}
                  </SelectField>

                  <SelectField
                    label="Pay with"
                    name="depositChain"
                    labelSrOnly
                    placeholder="Pay with"
                    isRequired
                  >
                    <option value="drivenet">Drivenet</option>
                    <option value="testchain">Testchain</option>
                    <option value="thunder">Thunder</option>
                    <option value="trainchain">Trainchain</option>
                    <option value="zside">Zside</option>
                    <option value="lightning">Lightning</option>
                  </SelectField>

                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    px={{ base: '8', sm: '12' }}
                  >
                    Post
                  </Button>
                </HStack>
              </Box>
            </Collapse>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default PostInput
