import gql from "graphql-tag";

export const GET_USERS_AND_TODOS = gql`
  query getUsersAndTodos($offset: Int, $limit: Int) {
    users(offset: $offset, limit: $limit) {
      id
      name
      todos {
        is_completed
        id
        created_at
        is_public
        title
      }
    }
  }
`;

export const GET_MY_TODOS = gql`
  query getMyTodos {
    toDos: todos(
      where: { is_public: { _eq: false } }
      order_by: { created_at: desc }
    ) {
      id
      title
      isCompleted: is_completed
      createdAt: created_at
    }
  }
`;
