import { Create } from 'react-admin';
import { PostForm } from './PostForm';

export const PostCreate = () => (
  <Create redirect="list">
    <PostForm />
  </Create>
);
