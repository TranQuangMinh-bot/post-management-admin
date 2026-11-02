import type { MouseEvent } from 'react';
import {
  Button,
  useNotify,
  useRecordContext,
  useRefresh,
  useUpdate,
} from 'react-admin';

type Status = 'published' | 'rejected' | 'hidden';

const labels: Record<Status, string> = {
  published: 'Approve',
  rejected: 'Reject',
  hidden: 'Hide',
};

type Props = { statuses?: Status[] };

// Admin-only buttons that change the status of the current post.
export const StatusButtons = ({ statuses = ['published', 'rejected'] }: Props) => {
  const record = useRecordContext();
  const [update, { isPending }] = useUpdate();
  const notify = useNotify();
  const refresh = useRefresh();

  if (!record) return null;

  const setStatus = (status: Status) => (event: MouseEvent) => {
    event.stopPropagation(); // do not open the Show page when clicking in a list row
    update(
      'posts',
      { id: record.id, data: { status }, previousData: record },
      {
        mutationMode: 'pessimistic',
        onSuccess: () => {
          notify(`Post updated: ${labels[status]}`, { type: 'success' });
          refresh();
        },
        onError: (error) =>
          notify(`Update failed: ${(error as Error).message}`, { type: 'error' }),
      }
    );
  };

  return (
    <>
      {statuses
        .filter((status) => status !== record.status)
        .map((status) => (
          <Button
            key={status}
            label={labels[status]}
            color={status === 'rejected' ? 'error' : 'primary'}
            disabled={isPending}
            onClick={setStatus(status)}
          />
        ))}
    </>
  );
};
