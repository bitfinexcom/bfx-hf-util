'use strict'

const test = require('brittle')
const path = require('path')
const { spawnSync } = require('child_process')

const CHILD = path.join(__dirname, 'fixtures', 'catch_uncaught_child.js')

test('catchUncaughtErrors logs the callsites and the failing source line', (t) => {
  const { stderr } = spawnSync(process.execPath, [CHILD], { encoding: 'utf8' })

  t.ok(stderr.includes('Uncaught exception: boom'))
  t.ok(stderr.includes(`! fail -> null (${CHILD}) [7:`))
  t.ok(stderr.includes(`source from ${CHILD}:7`))
  t.ok(stderr.includes("!!!\n  throw new Error('boom')\n!!!"))
})
