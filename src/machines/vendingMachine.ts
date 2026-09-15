import { setup, assign } from 'xstate';

export const vendingMachine = setup({
  types: {
    context: {} as { count: number; voteId?: string; error?: string },
    events: {} as
      | { type: 'INSERT_COIN' } | { type: 'COIN_REACHED_SLOT' } | { type: 'ICE_DROPPED' }
      | { type: 'API_SUCCESS'; count: number; voteId: string }
      | { type: 'API_ERROR'; error?: string } | { type: 'SHARE' } | { type: 'RESET' } | { type: 'RETRY' }
  }
}).createMachine({
  id: 'rallyeVendingMachine', initial: 'idle', context: { count: 12483 },
  states: {
    idle: { on: { INSERT_COIN: 'coinMoving' } },
    coinMoving: { on: { COIN_REACHED_SLOT: 'coinInserted' } },
    coinInserted: { after: { 200: 'machineStarting' } },
    machineStarting: { after: { 600: 'dispensing' } },
    dispensing: { on: { ICE_DROPPED: 'registeringVote' } },
    registeringVote: { on: { API_SUCCESS: { target: 'completed', actions: assign(({ event }) => ({ count: event.count, voteId: event.voteId })) }, API_ERROR: { target: 'error', actions: assign(({ event }) => ({ error: event.error })) } } },
    completed: { on: { SHARE: 'shareOpen', RESET: 'idle' } }, shareOpen: { on: { RESET: 'idle' } },
    error: { on: { RETRY: 'registeringVote', RESET: 'idle' } }
  }
});
