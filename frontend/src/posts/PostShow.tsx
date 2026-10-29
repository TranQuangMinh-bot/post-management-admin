import {
  ChipField,
  DateField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';
import { AttachmentsField } from './AttachmentsField';

export const PostShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <ChipField source="status" />
      <ReferenceField source="author_id" reference="profiles" link={false}>
        <TextField source="email" />
      </ReferenceField>
      <DateField source="created_at" showTime />
      <DateField source="updated_at" showTime />
      <TextField
        source="content"
        component="pre"
        sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', m: 0 }}
      />
      <AttachmentsField source="attachments" label="Attachments" />
    </SimpleShowLayout>
  </Show>
);
