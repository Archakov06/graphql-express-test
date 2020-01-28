import todos from './todos.json';
import users from './users.json';

import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const TodoItemType = new GraphQLObjectType({
  name: 'TodoItem',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
    user: {
      type: UserType,
      resolve: async function(item) {
        return users.find((obj: any) => obj.id === item.userId);
      },
    },
  }),
});

const QueryRootType = new GraphQLObjectType({
  name: 'AppSchema',
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoItemType),
      resolve: async function() {
        return todos;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async function() {
        return users;
      },
    },
  }),
});

const AppSchema = new GraphQLSchema({
  query: QueryRootType,
});

export default AppSchema;
