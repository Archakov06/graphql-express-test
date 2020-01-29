import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/cart_gql_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

export default mongoose;
