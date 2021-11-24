import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Block = {
  __typename?: 'Block'
  createdAt: Scalars['String']
  hash: Scalars['String']
  height: Scalars['Float']
}

export type Invoice = {
  __typename?: 'Invoice'
  createdAt: Scalars['String']
  depositAddress: Scalars['String']
  depositAmount?: Maybe<Scalars['Float']>
  depositChain: Scalars['String']
  hasDeposited: Scalars['Boolean']
  id: Scalars['ID']
  receiveEstimate?: Maybe<Scalars['Float']>
  updatedat: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createInvoice?: Maybe<Invoice>
  createPost?: Maybe<Post>
}

export type MutationCreateInvoiceArgs = {
  depositChain: Scalars['String']
  receiverData: Array<ReceiverInput>
}

export type MutationCreatePostArgs = {
  depositChain: Scalars['String']
  header: Scalars['String']
  text: Scalars['String']
}

export type NewsItem = {
  __typename?: 'NewsItem'
  block: Block
  content: Scalars['String']
  fee: Scalars['Float']
  topic: Topic
  txid: Scalars['String']
}

export type Post = {
  __typename?: 'Post'
  coinNewsFee?: Maybe<Scalars['Float']>
  createdAt: Scalars['String']
  depositAddress: Scalars['String']
  depositAmount?: Maybe<Scalars['Float']>
  depositChain: Scalars['String']
  hasDeposited: Scalars['Boolean']
  id: Scalars['ID']
  text: Scalars['String']
  topic: Topic
  txid?: Maybe<Scalars['String']>
  updatedat: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  addressByChain: Scalars['String']
  invoice?: Maybe<Invoice>
  newsByTopic: Array<NewsItem>
  post?: Maybe<Post>
  topics: Array<Topic>
}

export type QueryAddressByChainArgs = {
  chain: Scalars['String']
}

export type QueryInvoiceArgs = {
  id: Scalars['String']
}

export type QueryNewsByTopicArgs = {
  topic: Scalars['String']
}

export type QueryPostArgs = {
  id: Scalars['String']
}

export type ReceiverInput = {
  allocation?: Maybe<Scalars['Float']>
  receiveAddress: Scalars['String']
  receiveChain: Scalars['String']
}

export type Topic = {
  __typename?: 'Topic'
  createdAt: Scalars['String']
  hex: Scalars['String']
  name: Scalars['String']
}

export type CreateInvoiceMutationVariables = Exact<{
  depositChain: Scalars['String']
  receiverData: Array<ReceiverInput> | ReceiverInput
}>

export type CreateInvoiceMutation = {
  __typename?: 'Mutation'
  createInvoice?:
    | {
        __typename?: 'Invoice'
        id: string
        depositChain: string
        depositAddress: string
        hasDeposited: boolean
        createdAt: string
        updatedat: string
      }
    | null
    | undefined
}

export type CreatePostMutationVariables = Exact<{
  depositChain: Scalars['String']
  header: Scalars['String']
  text: Scalars['String']
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost?:
    | {
        __typename?: 'Post'
        id: string
        depositChain: string
        depositAddress: string
        hasDeposited: boolean
        depositAmount?: number | null | undefined
        coinNewsFee?: number | null | undefined
        text: string
        txid?: string | null | undefined
        createdAt: string
        updatedat: string
        topic: {
          __typename?: 'Topic'
          hex: string
          name: string
          createdAt: string
        }
      }
    | null
    | undefined
}

export type InvoiceQueryVariables = Exact<{
  id: Scalars['String']
}>

export type InvoiceQuery = {
  __typename?: 'Query'
  invoice?:
    | {
        __typename?: 'Invoice'
        id: string
        depositChain: string
        depositAddress: string
        depositAmount?: number | null | undefined
        hasDeposited: boolean
        receiveEstimate?: number | null | undefined
        createdAt: string
        updatedat: string
      }
    | null
    | undefined
}

export type NewsQueryVariables = Exact<{
  topic: Scalars['String']
}>

export type NewsQuery = {
  __typename?: 'Query'
  newsByTopic: Array<{
    __typename?: 'NewsItem'
    content: string
    fee: number
    txid: string
    block: {
      __typename?: 'Block'
      createdAt: string
      hash: string
      height: number
    }
    topic: {
      __typename?: 'Topic'
      name: string
      hex: string
      createdAt: string
    }
  }>
}

export type PostQueryVariables = Exact<{
  id: Scalars['String']
}>

export type PostQuery = {
  __typename?: 'Query'
  post?:
    | {
        __typename?: 'Post'
        id: string
        depositChain: string
        depositAddress: string
        hasDeposited: boolean
        depositAmount?: number | null | undefined
        coinNewsFee?: number | null | undefined
        text: string
        txid?: string | null | undefined
        createdAt: string
        updatedat: string
        topic: {
          __typename?: 'Topic'
          hex: string
          name: string
          createdAt: string
        }
      }
    | null
    | undefined
}

export type TopicsQueryVariables = Exact<{ [key: string]: never }>

export type TopicsQuery = {
  __typename?: 'Query'
  topics: Array<{ __typename?: 'Topic'; hex: string; name: string }>
}

export const CreateInvoiceDocument = gql`
  mutation CreateInvoice(
    $depositChain: String!
    $receiverData: [ReceiverInput!]!
  ) {
    createInvoice(depositChain: $depositChain, receiverData: $receiverData) {
      id
      depositChain
      depositAddress
      hasDeposited
      createdAt
      updatedat
    }
  }
`
export type CreateInvoiceMutationFn = Apollo.MutationFunction<
  CreateInvoiceMutation,
  CreateInvoiceMutationVariables
>

/**
 * __useCreateInvoiceMutation__
 *
 * To run a mutation, you first call `useCreateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvoiceMutation, { data, loading, error }] = useCreateInvoiceMutation({
 *   variables: {
 *      depositChain: // value for 'depositChain'
 *      receiverData: // value for 'receiverData'
 *   },
 * });
 */
export function useCreateInvoiceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateInvoiceMutation,
    CreateInvoiceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateInvoiceMutation,
    CreateInvoiceMutationVariables
  >(CreateInvoiceDocument, options)
}
export type CreateInvoiceMutationHookResult = ReturnType<
  typeof useCreateInvoiceMutation
>
export type CreateInvoiceMutationResult =
  Apollo.MutationResult<CreateInvoiceMutation>
export type CreateInvoiceMutationOptions = Apollo.BaseMutationOptions<
  CreateInvoiceMutation,
  CreateInvoiceMutationVariables
>
export const CreatePostDocument = gql`
  mutation CreatePost(
    $depositChain: String!
    $header: String!
    $text: String!
  ) {
    createPost(depositChain: $depositChain, header: $header, text: $text) {
      id
      depositChain
      depositAddress
      hasDeposited
      depositAmount
      coinNewsFee
      text
      txid
      topic {
        hex
        name
        createdAt
      }
      createdAt
      updatedat
    }
  }
`
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      depositChain: // value for 'depositChain'
 *      header: // value for 'header'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options
  )
}
export type CreatePostMutationHookResult = ReturnType<
  typeof useCreatePostMutation
>
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>
export const InvoiceDocument = gql`
  query Invoice($id: String!) {
    invoice(id: $id) {
      id
      depositChain
      depositAddress
      depositAmount
      hasDeposited
      receiveEstimate
      createdAt
      updatedat
    }
  }
`

/**
 * __useInvoiceQuery__
 *
 * To run a query within a React component, call `useInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInvoiceQuery(
  baseOptions: Apollo.QueryHookOptions<InvoiceQuery, InvoiceQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<InvoiceQuery, InvoiceQueryVariables>(
    InvoiceDocument,
    options
  )
}
export function useInvoiceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvoiceQuery, InvoiceQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<InvoiceQuery, InvoiceQueryVariables>(
    InvoiceDocument,
    options
  )
}
export type InvoiceQueryHookResult = ReturnType<typeof useInvoiceQuery>
export type InvoiceLazyQueryHookResult = ReturnType<typeof useInvoiceLazyQuery>
export type InvoiceQueryResult = Apollo.QueryResult<
  InvoiceQuery,
  InvoiceQueryVariables
>
export const NewsDocument = gql`
  query News($topic: String!) {
    newsByTopic(topic: $topic) {
      content
      fee
      txid
      block {
        createdAt
        hash
        height
      }
      topic {
        name
        hex
        createdAt
      }
    }
  }
`

/**
 * __useNewsQuery__
 *
 * To run a query within a React component, call `useNewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsQuery({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useNewsQuery(
  baseOptions: Apollo.QueryHookOptions<NewsQuery, NewsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<NewsQuery, NewsQueryVariables>(NewsDocument, options)
}
export function useNewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NewsQuery, NewsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<NewsQuery, NewsQueryVariables>(
    NewsDocument,
    options
  )
}
export type NewsQueryHookResult = ReturnType<typeof useNewsQuery>
export type NewsLazyQueryHookResult = ReturnType<typeof useNewsLazyQuery>
export type NewsQueryResult = Apollo.QueryResult<NewsQuery, NewsQueryVariables>
export const PostDocument = gql`
  query Post($id: String!) {
    post(id: $id) {
      id
      depositChain
      depositAddress
      hasDeposited
      depositAmount
      coinNewsFee
      text
      txid
      topic {
        hex
        name
        createdAt
      }
      createdAt
      updatedat
    }
  }
`

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(
  baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options)
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(
    PostDocument,
    options
  )
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>
export const TopicsDocument = gql`
  query Topics {
    topics {
      hex
      name
    }
  }
`

/**
 * __useTopicsQuery__
 *
 * To run a query within a React component, call `useTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopicsQuery(
  baseOptions?: Apollo.QueryHookOptions<TopicsQuery, TopicsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TopicsQuery, TopicsQueryVariables>(
    TopicsDocument,
    options
  )
}
export function useTopicsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TopicsQuery, TopicsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TopicsQuery, TopicsQueryVariables>(
    TopicsDocument,
    options
  )
}
export type TopicsQueryHookResult = ReturnType<typeof useTopicsQuery>
export type TopicsLazyQueryHookResult = ReturnType<typeof useTopicsLazyQuery>
export type TopicsQueryResult = Apollo.QueryResult<
  TopicsQuery,
  TopicsQueryVariables
>
