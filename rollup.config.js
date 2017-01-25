import nodeResolve from 'rollup-plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'index.js',
  format: 'cjs',
  plugins: [ babel(), nodeResolve(), cleanup({ maxEmptyLines: 1 }) ],
  dest: 'build/index.js'
}
