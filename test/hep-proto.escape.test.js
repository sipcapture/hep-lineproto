import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  escapeLineProtocolFieldValue,
  escapeLineProtocolKeyOrTagValue,
} from '../hep-line-protocol-escape.js';

describe('Influx line protocol escaping', () => {
  it('escapes backslashes before commas, spaces, and equals in tag keys and values', () => {
    assert.equal(escapeLineProtocolKeyOrTagValue('a\\b,c'), 'a\\\\b\\,c');
    assert.equal(escapeLineProtocolKeyOrTagValue('x y=z'), 'x\\ y\\=z');
    assert.equal(escapeLineProtocolKeyOrTagValue('trail\\'), 'trail\\\\');
  });

  it('escapes backslashes and quotes before newline sequences in field values', () => {
    assert.equal(escapeLineProtocolFieldValue('say "hi"'), 'say \\"hi\\"');
    assert.equal(escapeLineProtocolFieldValue('a\\b'), 'a\\\\b');
    assert.equal(escapeLineProtocolFieldValue('line1\nline2'), 'line1\\nline2');
    assert.equal(escapeLineProtocolFieldValue('cr\r\nlf'), 'cr\\r\\nlf');
  });

  it('produces quoted field fragments safe for hostile tag and field content', () => {
    const tag = `src_ip=${escapeLineProtocolKeyOrTagValue('10.0.0.1,evil=1')}`;
    const field = `payload="${escapeLineProtocolFieldValue('payload with "quotes" and \\ backslash')}"`;

    assert.equal(tag, 'src_ip=10.0.0.1\\,evil\\=1');
    assert.equal(field, 'payload="payload with \\"quotes\\" and \\\\ backslash"');
  });
});
