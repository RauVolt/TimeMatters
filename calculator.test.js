import test from 'node:test';
import assert from 'node:assert/strict';
import { hourlyCost, meetingCost, clock } from './calculator.js';
test('combines internal and consultant rates', () => {
  assert.equal(hourlyCost({ internalRate: 60, internalCount: 4, consultantRate: 120, consultantCount: 1 }), 360);
});
test('converts elapsed milliseconds to a monetary cost', () => {
  assert.equal(meetingCost(360, 1800000), 180);
  assert.equal(meetingCost(360, 1000), 0.1);
  assert.equal(meetingCost(0, 3600000), 0);
});
test('formats elapsed time without wrapping hours after a day', () => {
  assert.equal(clock(0), '00:00:00');
  assert.equal(clock(3661000), '01:01:01');
  assert.equal(clock(90000000), '25:00:00');
});
