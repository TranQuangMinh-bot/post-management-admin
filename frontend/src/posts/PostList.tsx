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
  WithRecord,
  usePermissions,
} from 'react-admin';
import { statusChoices } from './constants';
import { StatusButtons } from './StatusButtons';

// "title@ilike" is a PostgREST filter; it needs * wildcards around the term.
const titleFilter = (
  <TextInput
    key="title"
    source="title@ilike"
    label="Search title"
    alwaysOn
    format={(v?: string) => (v ? v.replace(/^\*|\*$/g, '') : '')}
    parse={(v?: string) => (v ? `*${v}*` : undefined)}
  />
);

const statusFilter = (
  <SelectInput key="status" source="status" choices={statusChoices} alwaysOn />
);

const authorFilter = (
  <ReferenceInput key="author" source="author_id" reference="profiles" label="Author">
    <SelectInput optionText="email" />
  </ReferenceInput>
);

const AdminBulkActions = () => (
  <>
    <BulkUpdateButton label="Approve" data={{ status: 'published' }} />
    <BulkUpdateButton label="Reject" data={{ status: 'rejected' }} />
    <BulkUpdateButton label="Hide" data={{ status: 'hidden' }} />
    <BulkDeleteButton />
  </>
);

export const PostList = () => {
  const { permissions, isPending } = usePermissions();
  if (isPending) return null;

  const isAdmin = permissions === 'admin';

  return (
    <List
      filters={isAdmin ? [titleFilter, statusFilter, authorFilter] : [titleFilter, statusFilter]}
      // Admins open the inbox on posts waiting for review
      filterDefaultValues={isAdmin ? { status: 'pending' } : undefined}
      sort={{ field: 'created_at', order: 'DESC' }}
      perPage={25}
    >
      {isAdmin ? (
        <Datagrid rowClick="show" bulkActionButtons={<AdminBulkActions />}>
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
          <StatusButtons statuses={['published', 'rejected']} />
          <ShowButton />
        </Datagrid>
      ) : (
        <Datagrid rowClick="show" bulkActionButtons={false}>
          <TextField source="title" />
          <ChipField source="status" />
          <FunctionField
            label="Files"
            render={(r: { attachments?: string[] }) => r.attachments?.length ?? 0}
          />
          <DateField source="created_at" showTime />
          <ShowButton />
          {/* Users can only edit a post while it is still pending review */}
          <WithRecord
            render={(r: { status?: string }) =>
              r.status === 'pending' ? <EditButton /> : null
            }
          />
        </Datagrid>
      )}
    </List>
  );
};
