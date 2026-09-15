import { describe, expect, it } from 'vitest';
import { createActor } from 'xstate';
import { vendingMachine } from '../../src/machines/vendingMachine';

describe('Rallye vending machine', () => {
  it('moves through the physical dispensing flow', () => {
    const actor = createActor(vendingMachine).start();
    actor.send({ type: 'INSERT_COIN' });
    expect(actor.getSnapshot().value).toBe('coinMoving');
    actor.send({ type: 'COIN_REACHED_SLOT' });
    expect(actor.getSnapshot().value).toBe('coinInserted');
    actor.stop();
  });

  it('ignores a second coin while the first flow is active', () => {
    const actor = createActor(vendingMachine).start();
    actor.send({ type: 'INSERT_COIN' });
    actor.send({ type: 'INSERT_COIN' });
    expect(actor.getSnapshot().value).toBe('coinMoving');
    actor.stop();
  });
});
