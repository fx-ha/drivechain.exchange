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

export type NewsItem = {
  __typename?: 'NewsItem'
  block: Block
  content: Scalars['String']
  fee: Scalars['Float']
  topic: Topic
  txid: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  newsByTopic: Array<NewsItem>
  topics: Array<Topic>
}

export type QueryNewsByTopicArgs = {
  topic: Scalars['String']
}

export type Topic = {
  __typename?: 'Topic'
  createdAt: Scalars['String']
  hex: Scalars['String']
  name: Scalars['String']
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

export type TopicsQueryVariables = Exact<{ [key: string]: never }>

export type TopicsQuery = {
  __typename?: 'Query'
  topics: Array<{ __typename?: 'Topic'; hex: string; name: string }>
}

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
