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

export type FaucetRequest = {
  __typename?: 'FaucetRequest'
  address: Scalars['String']
  amount: Scalars['Float']
  chain: Scalars['String']
  createdAt: Scalars['String']
  id: Scalars['ID']
  isPaid: Scalars['Boolean']
  txid?: Maybe<Scalars['String']>
  updatedAt: Scalars['String']
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
  updatedAt: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createFaucetRequest?: Maybe<FaucetRequest>
  createInvoice?: Maybe<Invoice>
  createPost?: Maybe<Post>
}

export type MutationCreateFaucetRequestArgs = {
  address: Scalars['String']
  chain: Scalars['String']
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
  updatedAt: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  addressByChain: Scalars['String']
  faucetRequest?: Maybe<FaucetRequest>
  invoice?: Maybe<Invoice>
  newsByTopic: Array<NewsItem>
  post?: Maybe<Post>
  topics: Array<Topic>
}

export type QueryAddressByChainArgs = {
  chain: Scalars['String']
}

export type QueryFaucetRequestArgs = {
  id: Scalars['String']
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

export type CreateFaucetRequestMutationVariables = Exact<{
  chain: Scalars['String']
  address: Scalars['String']
}>

export type CreateFaucetRequestMutation = {
  __typename?: 'Mutation'
  createFaucetRequest?:
    | {
        __typename?: 'FaucetRequest'
        id: string
        chain: string
        address: string
        amount: number
        isPaid: boolean
        txid?: string | null | undefined
        createdAt: string
        updatedAt: string
      }
    | null
    | undefined
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
        updatedAt: string
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
        updatedAt: string
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

export type FaucetRequestQueryVariables = Exact<{
  id: Scalars['String']
}>

export type FaucetRequestQuery = {
  __typename?: 'Query'
  faucetRequest?:
    | {
        __typename?: 'FaucetRequest'
        id: string
        chain: string
        address: string
        amount: number
        isPaid: boolean
        txid?: string | null | undefined
        createdAt: string
        updatedAt: string
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
        updatedAt: string
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
        updatedAt: string
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

export const CreateFaucetRequestDocument = gql`
  mutation CreateFaucetRequest($chain: String!, $address: String!) {
    createFaucetRequest(chain: $chain, address: $address) {
      id
      chain
      address
      amount
      isPaid
      txid
      createdAt
      updatedAt
    }
  }
`
export type CreateFaucetRequestMutationFn = Apollo.MutationFunction<
  CreateFaucetRequestMutation,
  CreateFaucetRequestMutationVariables
>

/**
 * __useCreateFaucetRequestMutation__
 *
 * To run a mutation, you first call `useCreateFaucetRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFaucetRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFaucetRequestMutation, { data, loading, error }] = useCreateFaucetRequestMutation({
 *   variables: {
 *      chain: // value for 'chain'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useCreateFaucetRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFaucetRequestMutation,
    CreateFaucetRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateFaucetRequestMutation,
    CreateFaucetRequestMutationVariables
  >(CreateFaucetRequestDocument, options)
}
export type CreateFaucetRequestMutationHookResult = ReturnType<
  typeof useCreateFaucetRequestMutation
>
export type CreateFaucetRequestMutationResult =
  Apollo.MutationResult<CreateFaucetRequestMutation>
export type CreateFaucetRequestMutationOptions = Apollo.BaseMutationOptions<
  CreateFaucetRequestMutation,
  CreateFaucetRequestMutationVariables
>
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
      updatedAt
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
      updatedAt
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
export const FaucetRequestDocument = gql`
  query FaucetRequest($id: String!) {
    faucetRequest(id: $id) {
      id
      chain
      address
      amount
      isPaid
      txid
      createdAt
      updatedAt
    }
  }
`

/**
 * __useFaucetRequestQuery__
 *
 * To run a query within a React component, call `useFaucetRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useFaucetRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFaucetRequestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFaucetRequestQuery(
  baseOptions: Apollo.QueryHookOptions<
    FaucetRequestQuery,
    FaucetRequestQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FaucetRequestQuery, FaucetRequestQueryVariables>(
    FaucetRequestDocument,
    options
  )
}
export function useFaucetRequestLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FaucetRequestQuery,
    FaucetRequestQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FaucetRequestQuery, FaucetRequestQueryVariables>(
    FaucetRequestDocument,
    options
  )
}
export type FaucetRequestQueryHookResult = ReturnType<
  typeof useFaucetRequestQuery
>
export type FaucetRequestLazyQueryHookResult = ReturnType<
  typeof useFaucetRequestLazyQuery
>
export type FaucetRequestQueryResult = Apollo.QueryResult<
  FaucetRequestQuery,
  FaucetRequestQueryVariables
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
      updatedAt
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
      updatedAt
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
