import { Admin, Resource, localStorageStore } from 'react-admin';
import { LoginPage } from 'ra-supabase';
import { dataProvider, portal } from './supabase';
import { authProvider } from './authProvider';
import { DebugError } from './DebugError';
import { PostList } from './posts/PostList';
import { PostEdit } from './posts/PostEdit';
import { PostCreate } from './posts/PostCreate';
import { PostShow } from './posts/PostShow';

// Separate UI preferences (list filters, sorting...) per portal.
const store = localStorageStore(undefined, portal);

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    error={DebugError}
    store={store}
    title={portal === 'admin' ? 'Post Management - Admin' : 'Post Management'}
  >
    {(permissions: string | null) => [
      // Admins receive and manage posts; they never create or edit content.
      // Regular users write posts and edit them while still pending.
      <Resource
        key="posts"
        name="posts"
        list={PostList}
        show={PostShow}
        create={permissions === 'admin' ? undefined : PostCreate}
        edit={permissions === 'admin' ? undefined : PostEdit}
        recordRepresentation="title"
      />,
      // Registered only so author references resolve; no menu entry
      <Resource key="profiles" name="profiles" recordRepresentation="email" />,
    ]}
  </Admin>
);
