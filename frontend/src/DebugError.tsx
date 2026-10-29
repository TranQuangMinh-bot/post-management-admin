import type { ErrorInfo } from 'react';

type Props = { error: Error; errorInfo?: ErrorInfo };

export const DebugError = ({ error, errorInfo }: Props) => (
  <div style={{ padding: 24, fontFamily: 'monospace' }}>
    <h2>Application error</h2>
    <pre style={{ whiteSpace: 'pre-wrap', color: 'crimson' }}>
      {error?.message}
    </pre>
    <pre style={{ whiteSpace: 'pre-wrap' }}>{error?.stack}</pre>
    <pre style={{ whiteSpace: 'pre-wrap' }}>{errorInfo?.componentStack}</pre>
  </div>
);