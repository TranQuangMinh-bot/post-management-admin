import { SimpleForm, TextInput, required } from 'react-admin';
import { AttachmentsInput } from './AttachmentsInput';

// Used by regular users (PostCreate and PostEdit).
// There is no status field: new posts always start as 'pending'.
export const PostForm = () => (
  <SimpleForm>
    <TextInput source="title" validate={required()} fullWidth />
    <TextInput source="content" multiline minRows={8} fullWidth />
    <AttachmentsInput source="attachments" />
  </SimpleForm>
);
