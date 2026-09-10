export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const BusinessPartsFragmentDoc = gql`
    fragment BusinessParts on Business {
  __typename
  legalName
  phoneDisplay
  phoneDial
  whatsapp
  whatsappMessage
  address {
    __typename
    line1
    town
    city
    county
    postcode
  }
  accessHours
  accessHoursConfirmed
  companyNumber
  minimumTerm
  pricesIndicative
}
    `;
export const PricingPartsFragmentDoc = gql`
    fragment PricingParts on Pricing {
  __typename
  name
  priceFrom
  priceUnit
  priceNote
  whatFits
  available
  order
}
    `;
export const PageHomePartsFragmentDoc = gql`
    fragment PageHomeParts on PageHome {
  __typename
  hero {
    __typename
    image {
      __typename
      src
      alt
      objectPosition
    }
    heading
    leadBefore
    leadAfter
  }
  pricing {
    __typename
    heading
    lead
  }
  security {
    __typename
    heading
    lead
    facts {
      __typename
      title
      text
    }
  }
  finding {
    __typename
    heading
    directions {
      __typename
      heading
      body
    }
    areas
  }
  enquiry {
    __typename
    heading
    lead
  }
}
    `;
export const PageContainerPartsFragmentDoc = gql`
    fragment PageContainerParts on PageContainer {
  __typename
  intro {
    __typename
    heading
    leadBefore
    leadAfter
    body
    image {
      __typename
      src
      alt
      objectPosition
    }
  }
  pricing {
    __typename
    heading
  }
}
    `;
export const PageYardPartsFragmentDoc = gql`
    fragment PageYardParts on PageYard {
  __typename
  intro {
    __typename
    heading
    lead
    body
    image {
      __typename
      src
      alt
      objectPosition
    }
  }
  second {
    __typename
    heading
    image {
      __typename
      src
      alt
      objectPosition
    }
    body1
  }
}
    `;
export const PageContactPartsFragmentDoc = gql`
    fragment PageContactParts on PageContact {
  __typename
  intro {
    __typename
    heading
    lead
  }
  formHeading
}
    `;
export const BusinessDocument = gql`
    query business($relativePath: String!) {
  business(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BusinessParts
  }
}
    ${BusinessPartsFragmentDoc}`;
export const BusinessConnectionDocument = gql`
    query businessConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BusinessFilter) {
  businessConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BusinessParts
      }
    }
  }
}
    ${BusinessPartsFragmentDoc}`;
export const PricingDocument = gql`
    query pricing($relativePath: String!) {
  pricing(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PricingParts
  }
}
    ${PricingPartsFragmentDoc}`;
export const PricingConnectionDocument = gql`
    query pricingConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PricingFilter) {
  pricingConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PricingParts
      }
    }
  }
}
    ${PricingPartsFragmentDoc}`;
export const PageHomeDocument = gql`
    query pageHome($relativePath: String!) {
  pageHome(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageHomeParts
  }
}
    ${PageHomePartsFragmentDoc}`;
export const PageHomeConnectionDocument = gql`
    query pageHomeConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageHomeFilter) {
  pageHomeConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageHomeParts
      }
    }
  }
}
    ${PageHomePartsFragmentDoc}`;
export const PageContainerDocument = gql`
    query pageContainer($relativePath: String!) {
  pageContainer(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageContainerParts
  }
}
    ${PageContainerPartsFragmentDoc}`;
export const PageContainerConnectionDocument = gql`
    query pageContainerConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageContainerFilter) {
  pageContainerConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageContainerParts
      }
    }
  }
}
    ${PageContainerPartsFragmentDoc}`;
export const PageYardDocument = gql`
    query pageYard($relativePath: String!) {
  pageYard(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageYardParts
  }
}
    ${PageYardPartsFragmentDoc}`;
export const PageYardConnectionDocument = gql`
    query pageYardConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageYardFilter) {
  pageYardConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageYardParts
      }
    }
  }
}
    ${PageYardPartsFragmentDoc}`;
export const PageContactDocument = gql`
    query pageContact($relativePath: String!) {
  pageContact(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageContactParts
  }
}
    ${PageContactPartsFragmentDoc}`;
export const PageContactConnectionDocument = gql`
    query pageContactConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageContactFilter) {
  pageContactConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageContactParts
      }
    }
  }
}
    ${PageContactPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    business(variables, options) {
      return requester(BusinessDocument, variables, options);
    },
    businessConnection(variables, options) {
      return requester(BusinessConnectionDocument, variables, options);
    },
    pricing(variables, options) {
      return requester(PricingDocument, variables, options);
    },
    pricingConnection(variables, options) {
      return requester(PricingConnectionDocument, variables, options);
    },
    pageHome(variables, options) {
      return requester(PageHomeDocument, variables, options);
    },
    pageHomeConnection(variables, options) {
      return requester(PageHomeConnectionDocument, variables, options);
    },
    pageContainer(variables, options) {
      return requester(PageContainerDocument, variables, options);
    },
    pageContainerConnection(variables, options) {
      return requester(PageContainerConnectionDocument, variables, options);
    },
    pageYard(variables, options) {
      return requester(PageYardDocument, variables, options);
    },
    pageYardConnection(variables, options) {
      return requester(PageYardConnectionDocument, variables, options);
    },
    pageContact(variables, options) {
      return requester(PageContactDocument, variables, options);
    },
    pageContactConnection(variables, options) {
      return requester(PageContactConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
