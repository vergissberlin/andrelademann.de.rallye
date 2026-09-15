import type { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  // Production implementation: query max(sequence_number) from Supabase.
  return { statusCode: 200, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ count: 12483 }) };
};
