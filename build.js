#!/usr/bin/env node
const {build} = require('estrella')

const options = {
  entry: 'src/index.js',
  target: 'node14',
  bundle: true,
  external: ['react'],
}

build({
  ...options,
  outfile: 'dist/index.mjs',
  format: 'esm',
})
build({
  ...options,
  outfile: 'dist/index.js',
  format: 'cjs',
})
