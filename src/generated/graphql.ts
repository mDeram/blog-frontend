import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Article = {
  __typename?: 'Article';
  author: Scalars['String'];
  categories: Array<Category>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  markdown: Scalars['String'];
  published: Scalars['Boolean'];
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Category = {
  __typename?: 'Category';
  articles: Array<Article>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: Article;
  deleteArticle: Scalars['Boolean'];
  setPublishArticle: Scalars['Boolean'];
  updateArticle: Scalars['Boolean'];
};


export type MutationCreateArticleArgs = {
  author: Scalars['String'];
  markdown: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['Int'];
};


export type MutationSetPublishArticleArgs = {
  id: Scalars['Int'];
  published: Scalars['Boolean'];
};


export type MutationUpdateArticleArgs = {
  author: Scalars['String'];
  id: Scalars['Int'];
  markdown: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articleBySlug?: Maybe<Article>;
  articles: Array<Article>;
  categories: Array<Category>;
};


export type QueryArticleArgs = {
  id: Scalars['Int'];
};


export type QueryArticleBySlugArgs = {
  slug: Scalars['String'];
};

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: boolean };

export type SetPublishedArticleMutationVariables = Exact<{
  id: Scalars['Int'];
  published: Scalars['Boolean'];
}>;


export type SetPublishedArticleMutation = { __typename?: 'Mutation', setPublishArticle: boolean };

export type ArticleQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: number, author: string, title: string, slug: string, content: string, markdown: string, createdAt: any, updatedAt: any, published: boolean } | null };

export type ArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', id: number, author: string, title: string, content: string, markdown: string, createdAt: any, updatedAt: any, published: boolean }> };


export const DeleteArticleDocument = gql`
    mutation DeleteArticle($id: Int!) {
  deleteArticle(id: $id)
}
    `;

export function useDeleteArticleMutation() {
  return Urql.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument);
};
export const SetPublishedArticleDocument = gql`
    mutation SetPublishedArticle($id: Int!, $published: Boolean!) {
  setPublishArticle(id: $id, published: $published)
}
    `;

export function useSetPublishedArticleMutation() {
  return Urql.useMutation<SetPublishedArticleMutation, SetPublishedArticleMutationVariables>(SetPublishedArticleDocument);
};
export const ArticleDocument = gql`
    query Article($id: Int!) {
  article(id: $id) {
    id
    author
    title
    slug
    content
    markdown
    createdAt
    updatedAt
    published
  }
}
    `;

export function useArticleQuery(options: Omit<Urql.UseQueryArgs<ArticleQueryVariables>, 'query'>) {
  return Urql.useQuery<ArticleQuery>({ query: ArticleDocument, ...options });
};
export const ArticlesDocument = gql`
    query Articles {
  articles {
    id
    author
    title
    content
    markdown
    createdAt
    updatedAt
    published
  }
}
    `;

export function useArticlesQuery(options?: Omit<Urql.UseQueryArgs<ArticlesQueryVariables>, 'query'>) {
  return Urql.useQuery<ArticlesQuery>({ query: ArticlesDocument, ...options });
};