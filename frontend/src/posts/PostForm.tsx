import { SelectInput, SimpleForm, TextInput, required } from 'react-admin';
import { AttachmentsInput } from './AttachmentsInput';
import { statusChoices } from './constants';

// Shared by PostCreate and PostEdit
export const PostForm = () => (
  <SimpleForm>
    <TextInput source="title" validate={required()} fullWidth />
    <SelectInput
      source="status"
      choices={statusChoices}
      defaultValue="draft"
      validate={required()}
    />
    <TextInput source="content" multiline minRows={8} fullWidth />
    <AttachmentsInput source="attachments" />
  </SimpleForm>
);
