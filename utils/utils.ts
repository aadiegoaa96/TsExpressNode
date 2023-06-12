import { User } from '../models/models';

const transformUser = (user: any): User => ({
  userId: user.id,
  name: user.name,
  email: user.email,
  postId: '',
  title: '',
  body: '',
});

export default transformUser;
