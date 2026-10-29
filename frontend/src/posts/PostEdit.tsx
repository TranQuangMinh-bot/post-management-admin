import { Edit } from 'react-admin';
import { PostForm } from './PostForm';

export const PostEdit = () => (
  <Edit mutationMode="pessimistic">
    <PostForm />
  </Edit>
);
