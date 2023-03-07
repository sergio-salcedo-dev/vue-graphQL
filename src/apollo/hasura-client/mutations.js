import gql from "graphql-tag";

export const INSERT_TODOS = gql`
  mutation insertToDo($title: String!) {
    insert_todos(objects: { title: $title }) {
      affected_rows
      returning {
        title
        id
        isCompleted: is_completed
        createdAt: created_at
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteToDo($id: Int!) {
    delete_todos(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const DELETE_COMPLETED_TODOS = gql`
  mutation deleteCompletedToDos {
    delete_todos(
      where: { is_public: { _eq: false }, is_completed: { _eq: true } }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateToDo($id: Int!, $isCompleted: Boolean!) {
    update_todos(
      where: { id: { _eq: $id } }
      _set: { is_completed: $isCompleted }
    ) {
      affected_rows
    }
  }
`;
