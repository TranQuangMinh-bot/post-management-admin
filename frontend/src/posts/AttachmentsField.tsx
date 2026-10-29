import { useRecordContext } from 'react-admin';
import { Link, Stack } from '@mui/material';
import { publicUrl } from '../supabase';
import { displayName } from './AttachmentsInput';

type Props = { source: string; label?: string };

export const AttachmentsField = ({ source }: Props) => {
  const record = useRecordContext();
  const value: string[] = Array.isArray(record?.[source]) ? record![source] : [];

  if (!value.length) return null;

  return (
    <Stack spacing={0.5}>
      {value.map((path) => (
        <Link
          key={path}
          href={publicUrl(path)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {displayName(path)}
        </Link>
      ))}
    </Stack>
  );
};
