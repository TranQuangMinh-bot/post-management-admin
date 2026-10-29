import {
  BulkDeleteButton,
  BulkUpdateButton,
  ChipField,
  Datagrid,
  DateField,
  EditButton,
  FunctionField,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  ShowButton,
  TextField,
  TextInput,
} from 'react-admin';
import { statusChoices } from './constants';

// "title@ilike" is a PostgREST filter; it needs * wildcards around the term.
const postFilters = [
  <TextInput
    key="title"
    source="title@ilike"
    label="Search title"
    alwaysOn
    format={(v?: string) => (v ? v.replace(/^\*|\*$/g, '') : '')}
    parse={(v?: string) => (v ? `*${v}*` : undefined)}
  />,
  <SelectInput key="status" source="status" choices={statusChoices} />,
  <ReferenceInput key="author" source="author_id" reference="profiles" label="Author">
    <SelectInput optionText="email" />
  </ReferenceInput>,
];

const PostBulkActions = () => (
  <>
    <BulkUpdateButton label="Publish" data={{ status: 'published' }} />
    <BulkUpdateButton label="Hide" data={{ status: 'hidden' }} />
    <BulkDeleteButton />
  </>
);

export const PostList = () => (
  <List
    filters={postFilters}
    sort={{ field: 'created_at', order: 'DESC' }}
    perPage={25}
  >
    <Datagrid rowClick="show" bulkActionButtons={<PostBulkActions />}>
      <TextField source="id" />
      <TextField source="title" />
      <ChipField source="status" />
      <ReferenceField source="author_id" reference="profiles" link={false} label="Author">
        <TextField source="email" />
      </ReferenceField>
      <FunctionField
        label="Files"
        render={(r: { attachments?: string[] }) => r.attachments?.length ?? 0}
      />
      <DateField source="created_at" showTime />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);
