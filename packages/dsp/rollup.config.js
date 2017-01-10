import nodeResolve from 'rollup-plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'index.js',
  format: 'cjs',
  plugins: [ nodeResolve(), cleanup({ maxEmptyLines: 1 }), babel() ],
  dest: 'build/index.js'
}
