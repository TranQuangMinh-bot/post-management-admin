import { useState, type ChangeEvent } from 'react';
import { useInput, useNotify } from 'react-admin';
import { Box, Button, IconButton, Link, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { BUCKET, publicUrl, supabaseClient } from '../supabase';

// Strips the "<timestamp>-<8 hex>-" prefix added at upload time.
export const displayName = (path: string): string =>
  path.replace(/^\d+-[0-9a-f]{8}-/, '');

type Props = { source: string; label?: string };

export const AttachmentsInput = ({ source, label = 'Attachments' }: Props) => {
  const { field } = useInput({ source, defaultValue: [] });
  const notify = useNotify();
  const [uploading, setUploading] = useState(false);

  const value: string[] = Array.isArray(field.value) ? field.value : [];

  const handleFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (!files.length) return;

    setUploading(true);
    const uploaded: string[] = [];

    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}`;
      const { error } = await supabaseClient.storage
        .from(BUCKET)
        .upload(path, file);

      if (error) {
        notify(`Upload failed for ${file.name}: ${error.message}`, {
          type: 'error',
        });
      } else {
        uploaded.push(path);
      }
    }

    setUploading(false);
    if (uploaded.length) field.onChange([...value, ...uploaded]);
  };

  const handleRemove = (path: string) =>
    field.onChange(value.filter((p) => p !== path));

  return (
    <Box sx={{ mb: 2, width: '100%' }}>
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>

      <Button
        component="label"
        variant="outlined"
        size="small"
        startIcon={<UploadFileIcon />}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Add files'}
        <input
          hidden
          multiple
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp,application/pdf"
          onChange={handleFiles}
        />
      </Button>

      <Stack spacing={0.5} sx={{ mt: 1 }}>
        {value.map((path) => (
          <Stack key={path} direction="row" alignItems="center" spacing={1}>
            <Link href={publicUrl(path)} target="_blank" rel="noopener noreferrer">
              {displayName(path)}
            </Link>
            <IconButton
              size="small"
              aria-label="Remove"
              onClick={() => handleRemove(path)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
