'use strict'

const test = require('brittle')
const path = require('path')
const { spawnSync } = require('child_process')

const CHILD = path.join(__dirname, 'fixtures', 'on_exit_child.js')

const runChild = (...args) => spawnSync(process.execPath, [CHILD, ...args], {
  encoding: 'utf8'
})

test('onExit awaits callbacks one by one, by priority, then exits 0', (t) => {
  const { status, stdout } = runChild()

  t.is(stdout, 'high\nlow\n')
  t.is(status, 0)
})

test('onExit stops at a failing callback and exits 1', (t) => {
  const { status, stdout } = runChild('fail')

  t.is(stdout, 'high\n')
  t.is(status, 1)
})
