import nodeResolve from 'rollup-plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'

export default {
  entry: 'index.js',
  format: 'cjs',
  plugins: [ nodeResolve(), cleanup({ maxEmptyLines: 1 }) ],
  dest: 'build/index.js'
}
