import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
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

export type FieldError = {
  __typename?: 'FieldError'
  field: Scalars['String']
  message: Scalars['String']
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
  login: UserResponse
  logout: Scalars['Boolean']
  register: UserResponse
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

export type MutationLoginArgs = {
  password: Scalars['String']
  username: Scalars['String']
}

export type MutationRegisterArgs = {
  password: Scalars['String']
  username: Scalars['String']
}

export type NewsItem = {
  __typename?: 'NewsItem'
  block: Block
  content: Scalars['String']
  createdAt: Scalars['String']
  fee: Scalars['Float']
  topic: Topic
  txid: Scalars['String']
}

export type PaginatedBlocks = {
  __typename?: 'PaginatedBlocks'
  blocks: Array<Block>
  hasMore: Scalars['Boolean']
  total: Scalars['Float']
}

export type PaginatedFaucetRequests = {
  __typename?: 'PaginatedFaucetRequests'
  faucetRequests: Array<FaucetRequest>
  hasMore: Scalars['Boolean']
  total: Scalars['Float']
}

export type PaginatedInvoices = {
  __typename?: 'PaginatedInvoices'
  hasMore: Scalars['Boolean']
  invoices: Array<Invoice>
  total: Scalars['Float']
}

export type PaginatedNewsItems = {
  __typename?: 'PaginatedNewsItems'
  hasMore: Scalars['Boolean']
  news: Array<NewsItem>
  total: Scalars['Float']
}

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts'
  hasMore: Scalars['Boolean']
  posts: Array<Post>
  total: Scalars['Float']
}

export type PaginatedTopics = {
  __typename?: 'PaginatedTopics'
  hasMore: Scalars['Boolean']
  topics: Array<Topic>
  total: Scalars['Float']
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
  blocks: PaginatedBlocks
  faucetRequest?: Maybe<FaucetRequest>
  faucetRequests: PaginatedFaucetRequests
  invoice?: Maybe<Invoice>
  invoices: PaginatedInvoices
  me?: Maybe<User>
  newsByTopic: Array<NewsItem>
  newsItems: PaginatedNewsItems
  post?: Maybe<Post>
  posts: PaginatedPosts
  topics: Array<Topic>
  topicsAdmin: PaginatedTopics
}

export type QueryAddressByChainArgs = {
  chain: Scalars['String']
}

export type QueryBlocksArgs = {
  cursor?: InputMaybe<Scalars['Int']>
  limit: Scalars['Int']
}

export type QueryFaucetRequestArgs = {
  id: Scalars['String']
}

export type QueryFaucetRequestsArgs = {
  cursor?: InputMaybe<Scalars['String']>
  limit: Scalars['Int']
}

export type QueryInvoiceArgs = {
  id: Scalars['String']
}

export type QueryInvoicesArgs = {
  cursor?: InputMaybe<Scalars['String']>
  limit: Scalars['Int']
}

export type QueryNewsByTopicArgs = {
  topic: Scalars['String']
}

export type QueryNewsItemsArgs = {
  cursor?: InputMaybe<Scalars['String']>
  limit: Scalars['Int']
}

export type QueryPostArgs = {
  id: Scalars['String']
}

export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>
  limit: Scalars['Int']
}

export type QueryTopicsAdminArgs = {
  cursor?: InputMaybe<Scalars['String']>
  limit: Scalars['Int']
}

export type ReceiverInput = {
  allocation?: InputMaybe<Scalars['Float']>
  receiveAddress: Scalars['String']
  receiveChain: Scalars['String']
}

export type Topic = {
  __typename?: 'Topic'
  createdAt: Scalars['String']
  hex: Scalars['String']
  name: Scalars['String']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['String']
  id: Scalars['ID']
  role: Scalars['String']
  updatedAt: Scalars['String']
  username: Scalars['String']
}

export type UserResponse = {
  __typename?: 'UserResponse'
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
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

export type LoginMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'UserResponse'
    errors?:
      | Array<{ __typename?: 'FieldError'; field: string; message: string }>
      | null
      | undefined
    user?:
      | {
          __typename?: 'User'
          id: string
          username: string
          role: string
          createdAt: string
          updatedAt: string
        }
      | null
      | undefined
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type BlocksQueryVariables = Exact<{
  limit: Scalars['Int']
  cursor?: InputMaybe<Scalars['Int']>
}>

export type BlocksQuery = {
  __typename?: 'Query'
  blocks: {
    __typename?: 'PaginatedBlocks'
    hasMore: boolean
    total: number
    blocks: Array<{
      __typename?: 'Block'
      hash: string
      height: number
      createdAt: string
    }>
  }
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

export type FaucetRequestsQueryVariables = Exact<{
  limit: Scalars['Int']
  cursor?: InputMaybe<Scalars['String']>
}>

export type FaucetRequestsQuery = {
  __typename?: 'Query'
  faucetRequests: {
    __typename?: 'PaginatedFaucetRequests'
    hasMore: boolean
    total: number
    faucetRequests: Array<{
      __typename?: 'FaucetRequest'
      id: string
      chain: string
      address: string
      amount: number
      isPaid: boolean
      txid?: string | null | undefined
      createdAt: string
      updatedAt: string
    }>
  }
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

export type InvoicesQueryVariables = Exact<{
  limit: Scalars['Int']
  cursor?: InputMaybe<Scalars['String']>
}>

export type InvoicesQuery = {
  __typename?: 'Query'
  invoices: {
    __typename?: 'PaginatedInvoices'
    hasMore: boolean
    total: number
    invoices: Array<{
      __typename?: 'Invoice'
      id: string
      depositChain: string
      depositAddress: string
      depositAmount?: number | null | undefined
      hasDeposited: boolean
      receiveEstimate?: number | null | undefined
      createdAt: string
      updatedAt: string
    }>
  }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?:
    | {
        __typename?: 'User'
        id: string
        username: string
        createdAt: string
        updatedAt: string
        role: string
      }
    | null
    | undefined
}

export type NewsQueryVariables = Exact<{
  limit: Scalars['Int']
  cursor?: InputMaybe<Scalars['String']>
}>

export type NewsQuery = {
  __typename?: 'Query'
  newsItems: {
    __typename?: 'PaginatedNewsItems'
    hasMore: boolean
    total: number
    news: Array<{
      __typename?: 'NewsItem'
      content: string
      fee: number
      txid: string
      createdAt: string
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
}

export type NewsByTopicQueryVariables = Exact<{
  topic: Scalars['String']
}>

export type NewsByTopicQuery = {
  __typename?: 'Query'
  newsByTopic: Array<{
    __typename?: 'NewsItem'
    content: string
    fee: number
    txid: string
    createdAt: string
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

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int']
  cursor?: InputMaybe<Scalars['String']>
}>

export type PostsQuery = {
  __typename?: 'Query'
  posts: {
    __typename?: 'PaginatedPosts'
    hasMore: boolean
    total: number
    posts: Array<{
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
    }>
  }
}

export type TopicsQueryVariables = Exact<{ [key: string]: never }>

export type TopicsQuery = {
  __typename?: 'Query'
  topics: Array<{ __typename?: 'Topic'; hex: string; name: string }>
}

export type TopicsAdminQueryVariables = Exact<{
  limit: Scalars['Int']
  cursor?: InputMaybe<Scalars['String']>
}>

export type TopicsAdminQuery = {
  __typename?: 'Query'
  topicsAdmin: {
    __typename?: 'PaginatedTopics'
    hasMore: boolean
    total: number
    topics: Array<{
      __typename?: 'Topic'
      hex: string
      name: string
      createdAt: string
    }>
  }
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
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        username
        role
        createdAt
        updatedAt
      }
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const BlocksDocument = gql`
  query Blocks($limit: Int!, $cursor: Int) {
    blocks(limit: $limit, cursor: $cursor) {
      blocks {
        hash
        height
        createdAt
      }
      hasMore
      total
    }
  }
`

/**
 * __useBlocksQuery__
 *
 * To run a query within a React component, call `useBlocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlocksQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useBlocksQuery(
  baseOptions: Apollo.QueryHookOptions<BlocksQuery, BlocksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<BlocksQuery, BlocksQueryVariables>(
    BlocksDocument,
    options
  )
}
export function useBlocksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BlocksQuery, BlocksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<BlocksQuery, BlocksQueryVariables>(
    BlocksDocument,
    options
  )
}
export type BlocksQueryHookResult = ReturnType<typeof useBlocksQuery>
export type BlocksLazyQueryHookResult = ReturnType<typeof useBlocksLazyQuery>
export type BlocksQueryResult = Apollo.QueryResult<
  BlocksQuery,
  BlocksQueryVariables
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
export const FaucetRequestsDocument = gql`
  query FaucetRequests($limit: Int!, $cursor: String) {
    faucetRequests(limit: $limit, cursor: $cursor) {
      faucetRequests {
        id
        chain
        address
        amount
        isPaid
        txid
        createdAt
        updatedAt
      }
      hasMore
      total
    }
  }
`

/**
 * __useFaucetRequestsQuery__
 *
 * To run a query within a React component, call `useFaucetRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFaucetRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFaucetRequestsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFaucetRequestsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FaucetRequestsQuery,
    FaucetRequestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FaucetRequestsQuery, FaucetRequestsQueryVariables>(
    FaucetRequestsDocument,
    options
  )
}
export function useFaucetRequestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FaucetRequestsQuery,
    FaucetRequestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FaucetRequestsQuery, FaucetRequestsQueryVariables>(
    FaucetRequestsDocument,
    options
  )
}
export type FaucetRequestsQueryHookResult = ReturnType<
  typeof useFaucetRequestsQuery
>
export type FaucetRequestsLazyQueryHookResult = ReturnType<
  typeof useFaucetRequestsLazyQuery
>
export type FaucetRequestsQueryResult = Apollo.QueryResult<
  FaucetRequestsQuery,
  FaucetRequestsQueryVariables
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
export const InvoicesDocument = gql`
  query Invoices($limit: Int!, $cursor: String) {
    invoices(limit: $limit, cursor: $cursor) {
      invoices {
        id
        depositChain
        depositAddress
        depositAmount
        hasDeposited
        receiveEstimate
        createdAt
        updatedAt
      }
      hasMore
      total
    }
  }
`

/**
 * __useInvoicesQuery__
 *
 * To run a query within a React component, call `useInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoicesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useInvoicesQuery(
  baseOptions: Apollo.QueryHookOptions<InvoicesQuery, InvoicesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<InvoicesQuery, InvoicesQueryVariables>(
    InvoicesDocument,
    options
  )
}
export function useInvoicesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    InvoicesQuery,
    InvoicesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<InvoicesQuery, InvoicesQueryVariables>(
    InvoicesDocument,
    options
  )
}
export type InvoicesQueryHookResult = ReturnType<typeof useInvoicesQuery>
export type InvoicesLazyQueryHookResult = ReturnType<
  typeof useInvoicesLazyQuery
>
export type InvoicesQueryResult = Apollo.QueryResult<
  InvoicesQuery,
  InvoicesQueryVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      username
      createdAt
      updatedAt
      role
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const NewsDocument = gql`
  query News($limit: Int!, $cursor: String) {
    newsItems(limit: $limit, cursor: $cursor) {
      news {
        content
        fee
        txid
        createdAt
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
      hasMore
      total
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
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
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
export const NewsByTopicDocument = gql`
  query NewsByTopic($topic: String!) {
    newsByTopic(topic: $topic) {
      content
      fee
      txid
      createdAt
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
 * __useNewsByTopicQuery__
 *
 * To run a query within a React component, call `useNewsByTopicQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsByTopicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsByTopicQuery({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useNewsByTopicQuery(
  baseOptions: Apollo.QueryHookOptions<
    NewsByTopicQuery,
    NewsByTopicQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<NewsByTopicQuery, NewsByTopicQueryVariables>(
    NewsByTopicDocument,
    options
  )
}
export function useNewsByTopicLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NewsByTopicQuery,
    NewsByTopicQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<NewsByTopicQuery, NewsByTopicQueryVariables>(
    NewsByTopicDocument,
    options
  )
}
export type NewsByTopicQueryHookResult = ReturnType<typeof useNewsByTopicQuery>
export type NewsByTopicLazyQueryHookResult = ReturnType<
  typeof useNewsByTopicLazyQuery
>
export type NewsByTopicQueryResult = Apollo.QueryResult<
  NewsByTopicQuery,
  NewsByTopicQueryVariables
>
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
export const PostsDocument = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      posts {
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
      hasMore
      total
    }
  }
`

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    options
  )
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    options
  )
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>
export type PostsQueryResult = Apollo.QueryResult<
  PostsQuery,
  PostsQueryVariables
>
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
export const TopicsAdminDocument = gql`
  query TopicsAdmin($limit: Int!, $cursor: String) {
    topicsAdmin(limit: $limit, cursor: $cursor) {
      topics {
        hex
        name
        createdAt
      }
      hasMore
      total
    }
  }
`

/**
 * __useTopicsAdminQuery__
 *
 * To run a query within a React component, call `useTopicsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicsAdminQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useTopicsAdminQuery(
  baseOptions: Apollo.QueryHookOptions<
    TopicsAdminQuery,
    TopicsAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TopicsAdminQuery, TopicsAdminQueryVariables>(
    TopicsAdminDocument,
    options
  )
}
export function useTopicsAdminLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TopicsAdminQuery,
    TopicsAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TopicsAdminQuery, TopicsAdminQueryVariables>(
    TopicsAdminDocument,
    options
  )
}
export type TopicsAdminQueryHookResult = ReturnType<typeof useTopicsAdminQuery>
export type TopicsAdminLazyQueryHookResult = ReturnType<
  typeof useTopicsAdminLazyQuery
>
export type TopicsAdminQueryResult = Apollo.QueryResult<
  TopicsAdminQuery,
  TopicsAdminQueryVariables
>
