import { Admin, Resource } from 'react-admin';
import { LoginPage } from 'ra-supabase';
import { dataProvider } from './supabase';
import { authProvider } from './authProvider';
import { DebugError } from './DebugError';
import { PostList } from './posts/PostList';
import { PostEdit } from './posts/PostEdit';
import { PostCreate } from './posts/PostCreate';
import { PostShow } from './posts/PostShow';

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    error={DebugError}
    title="Post Management"
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      show={PostShow}
      recordRepresentation="title"
    />
    {/* Registered only so author references resolve; no menu entry */}
    <Resource name="profiles" recordRepresentation="email" />
  </Admin>
);