import { Todo, User } from './models';

import {
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLID,
} from 'graphql';

const TodoType = new GraphQLObjectType({
  name: 'TodoItem',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
    user: {
      type: UserType,
      resolve: async function(item) {
        return User.findById(item.user);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoType),
      resolve: async function() {
        return Todo.find();
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async function() {
        return User.find();
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      description: 'Add user',
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, args) => {
        const user = new User({
          name: args.name,
          email: args.email,
        });
        return user.save();
      },
    },
    addTodo: {
      type: TodoType,
      description: 'Add todo',
      args: {
        text: {
          type: new GraphQLNonNull(GraphQLString),
        },
        user: {
          type: new GraphQLNonNull(GraphQLString),
        },
        completed: {
          type: new GraphQLNonNull(GraphQLBoolean),
        },
      },
      resolve: (_, args) => {
        const todo = new Todo({
          text: args.text,
          user: args.user,
          completed: args.completed,
        });
        return todo.save();
      },
    },
  },
});

const AppSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation,
});

export default AppSchema;
