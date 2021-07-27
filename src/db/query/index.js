export const githubQuery = (
  pageCount,
  queryString,
  paginationKeywork,
  paginationString
) => {
  return {
    query: `
  {
    viewer {
      name
    }
    search(type: REPOSITORY, query: "user:ajayaj2001 sort:updated-desc ${queryString}" ${paginationKeywork}:${pageCount}, ${paginationString}) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            name
            description
            createdAt
            url
            viewerSubscription
            licenseInfo {
              spdxId
            }
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
  `,
  };
};
