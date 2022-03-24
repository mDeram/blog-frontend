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
  contentShort: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  likeCounter: Scalars['Int'];
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
  createArticle?: Maybe<Article>;
  deleteArticle: Scalars['Boolean'];
  login: Scalars['Boolean'];
  setPublishArticle: Scalars['Boolean'];
  toggleLike: Scalars['Boolean'];
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


export type MutationLoginArgs = {
  authToken: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSetPublishArticleArgs = {
  id: Scalars['Int'];
  published: Scalars['Boolean'];
};


export type MutationToggleLikeArgs = {
  articleId: Scalars['Int'];
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
  articlesPublished: Array<Article>;
  categories: Array<Category>;
  like: Scalars['Boolean'];
};


export type QueryArticleArgs = {
  id: Scalars['Int'];
};


export type QueryArticleBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryLikeArgs = {
  articleId: Scalars['Int'];
};

export type ArticleSnippetFragment = { __typename?: 'Article', id: number, slug: string, title: string, createdAt: any, updatedAt: any, contentShort: string, published: boolean, likeCounter: number };

export type DefaultArticleFragment = { __typename?: 'Article', id: number, author: string, title: string, slug: string, content: string, markdown: string, createdAt: any, updatedAt: any, published: boolean, likeCounter: number };

export type CreateArticleMutationVariables = Exact<{
  author: Scalars['String'];
  title: Scalars['String'];
  markdown: Scalars['String'];
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle?: { __typename?: 'Article', id: number, author: string, title: string, slug: string, content: string, markdown: string, createdAt: any, updatedAt: any, published: boolean, likeCounter: number } | null };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  authToken: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: boolean };

export type SetPublishedArticleMutationVariables = Exact<{
  id: Scalars['Int'];
  published: Scalars['Boolean'];
}>;


export type SetPublishedArticleMutation = { __typename?: 'Mutation', setPublishArticle: boolean };

export type ToggleLikeMutationVariables = Exact<{
  articleId: Scalars['Int'];
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike: boolean };

export type UpdateArticleMutationVariables = Exact<{
  id: Scalars['Int'];
  author: Scalars['String'];
  title: Scalars['String'];
  markdown: Scalars['String'];
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: boolean };

export type ArticleQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: number, author: string, title: string, slug: string, content: string, markdown: string, createdAt: any, updatedAt: any, published: boolean, likeCounter: number } | null };

export type ArticleBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type ArticleBySlugQuery = { __typename?: 'Query', articleBySlug?: { __typename?: 'Article', id: number, author: string, title: string, slug: string, content: string, markdown: string, createdAt: any, updatedAt: any, published: boolean, likeCounter: number } | null };

export type ArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', id: number, slug: string, title: string, createdAt: any, updatedAt: any, contentShort: string, published: boolean, likeCounter: number }> };

export type ArticlesPublishedQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlesPublishedQuery = { __typename?: 'Query', articlesPublished: Array<{ __typename?: 'Article', id: number, slug: string, title: string, createdAt: any, updatedAt: any, contentShort: string, published: boolean, likeCounter: number }> };

export type LikeQueryVariables = Exact<{
  articleId: Scalars['Int'];
}>;


export type LikeQuery = { __typename?: 'Query', like: boolean };

export const ArticleSnippetFragmentDoc = gql`
    fragment ArticleSnippet on Article {
  id
  slug
  title
  createdAt
  updatedAt
  contentShort
  published
  likeCounter
}
    `;
export const DefaultArticleFragmentDoc = gql`
    fragment DefaultArticle on Article {
  id
  author
  title
  slug
  content
  markdown
  createdAt
  updatedAt
  published
  likeCounter
}
    `;
export const CreateArticleDocument = gql`
    mutation CreateArticle($author: String!, $title: String!, $markdown: String!) {
  createArticle(author: $author, title: $title, markdown: $markdown) {
    ...DefaultArticle
  }
}
    ${DefaultArticleFragmentDoc}`;

export function useCreateArticleMutation() {
  return Urql.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument);
};
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($id: Int!) {
  deleteArticle(id: $id)
}
    `;

export function useDeleteArticleMutation() {
  return Urql.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!, $authToken: String!) {
  login(username: $username, password: $password, authToken: $authToken)
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const SetPublishedArticleDocument = gql`
    mutation SetPublishedArticle($id: Int!, $published: Boolean!) {
  setPublishArticle(id: $id, published: $published)
}
    `;

export function useSetPublishedArticleMutation() {
  return Urql.useMutation<SetPublishedArticleMutation, SetPublishedArticleMutationVariables>(SetPublishedArticleDocument);
};
export const ToggleLikeDocument = gql`
    mutation ToggleLike($articleId: Int!) {
  toggleLike(articleId: $articleId)
}
    `;

export function useToggleLikeMutation() {
  return Urql.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument);
};
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($id: Int!, $author: String!, $title: String!, $markdown: String!) {
  updateArticle(id: $id, author: $author, title: $title, markdown: $markdown)
}
    `;

export function useUpdateArticleMutation() {
  return Urql.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument);
};
export const ArticleDocument = gql`
    query Article($id: Int!) {
  article(id: $id) {
    ...DefaultArticle
  }
}
    ${DefaultArticleFragmentDoc}`;

export function useArticleQuery(options: Omit<Urql.UseQueryArgs<ArticleQueryVariables>, 'query'>) {
  return Urql.useQuery<ArticleQuery>({ query: ArticleDocument, ...options });
};
export const ArticleBySlugDocument = gql`
    query ArticleBySlug($slug: String!) {
  articleBySlug(slug: $slug) {
    ...DefaultArticle
  }
}
    ${DefaultArticleFragmentDoc}`;

export function useArticleBySlugQuery(options: Omit<Urql.UseQueryArgs<ArticleBySlugQueryVariables>, 'query'>) {
  return Urql.useQuery<ArticleBySlugQuery>({ query: ArticleBySlugDocument, ...options });
};
export const ArticlesDocument = gql`
    query Articles {
  articles {
    ...ArticleSnippet
  }
}
    ${ArticleSnippetFragmentDoc}`;

export function useArticlesQuery(options?: Omit<Urql.UseQueryArgs<ArticlesQueryVariables>, 'query'>) {
  return Urql.useQuery<ArticlesQuery>({ query: ArticlesDocument, ...options });
};
export const ArticlesPublishedDocument = gql`
    query ArticlesPublished {
  articlesPublished {
    ...ArticleSnippet
  }
}
    ${ArticleSnippetFragmentDoc}`;

export function useArticlesPublishedQuery(options?: Omit<Urql.UseQueryArgs<ArticlesPublishedQueryVariables>, 'query'>) {
  return Urql.useQuery<ArticlesPublishedQuery>({ query: ArticlesPublishedDocument, ...options });
};
export const LikeDocument = gql`
    query Like($articleId: Int!) {
  like(articleId: $articleId)
}
    `;

export function useLikeQuery(options: Omit<Urql.UseQueryArgs<LikeQueryVariables>, 'query'>) {
  return Urql.useQuery<LikeQuery>({ query: LikeDocument, ...options });
};
import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "Article",
        "fields": [
          {
            "name": "author",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "categories",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Category",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "content",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "contentShort",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "likeCounter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "markdown",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "published",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "slug",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Category",
        "fields": [
          {
            "name": "articles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Article",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "createArticle",
            "type": {
              "kind": "OBJECT",
              "name": "Article",
              "ofType": null
            },
            "args": [
              {
                "name": "author",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "markdown",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "title",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "deleteArticle",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "login",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "authToken",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "username",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "setPublishArticle",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "published",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "toggleLike",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "articleId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updateArticle",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "author",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "markdown",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "title",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "article",
            "type": {
              "kind": "OBJECT",
              "name": "Article",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "articleBySlug",
            "type": {
              "kind": "OBJECT",
              "name": "Article",
              "ofType": null
            },
            "args": [
              {
                "name": "slug",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "articles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Article",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "articlesPublished",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Article",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "categories",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Category",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "like",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "articleId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;