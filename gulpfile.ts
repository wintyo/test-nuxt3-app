import pathUtil from 'path';
import gulp from 'gulp';
import modifyFile from 'gulp-modify-file';
import rename from 'gulp-rename';
import ts from 'gulp-typescript';

const tsProject = ts.createProject('tsconfig.json', {
  declaration: true,
  noEmit: false,
});

const ROOT_DIR = process.cwd() + '/src';

gulp.task('types', () => {
  /** 型ファイル出力対象のファイルパス一覧 */
  const targetFilePaths = [];
  return (
    gulp
      .src(['./src/components/*.vue', './src/pages/*.vue'], {
        base: ROOT_DIR,
      })
      // scriptブロックだけ抽出する
      .pipe(
        modifyFile((content, path) => {
          const targetFilePath =
            '~/' + pathUtil.relative(ROOT_DIR, path.replace('.vue', ''));

          {
            // tsブロックの場合
            const match = content.match(
              /<script lang="ts">\n((.|\n)+)<\/script>/
            );
            if (match) {
              const srcTs = match[1];
              // importパスの.vueを取り除いてTSとしてimportされるようにする
              const replacedSrc = srcTs.replace(/\.vue'/g, `'`);
              return replacedSrc;
            }
          }

          {
            // setup tsブロックの場合
            const match = content.match(
              /<script setup lang="ts">\n((.|\n)+)<\/script>/
            );
            if (match) {
              const srcTs = match[1];
              // importパスの.vueを取り除いてTSとしてimportされるようにする
              const replacedSrc = srcTs.replace(/\.vue'/g, `'`);

              const exposeMatch = replacedSrc.match(
                /defineExpose\({([^}]+)}\)/
              );
              const exposeText = exposeMatch ? exposeMatch[1] : '';
              return [
                `import { defineComponent } from 'vue';`,
                replacedSrc,
                'export default defineComponent({',
                '  setup() {',
                `    return {${exposeText}}`,
                '  }',
                '});',
              ].join('\n');
            }
          }

          return content;
        })
      )
      // 拡張子を.vue → .tsに変える
      .pipe(
        rename((path) => {
          // パス情報を保存する
          targetFilePaths.push('~/' + path.dirname + '/' + path.basename);
          path.extname = '.ts';
        })
      )
      // コンパイルをする
      .pipe(tsProject())
      // 型ファイルの方を操作する
      .dts.pipe(
        rename((path) => {
          // .d.ts → .vue.d.tsにする
          path.basename = path.basename.replace(/\.d$/, '.vue.d');
        })
      )
      .pipe(
        modifyFile((content, path) => {
          // .d.tsを取り除く
          const renamedPath = path.replace(/\.d\.ts$/, '');
          const relativePath = '~/' + pathUtil.relative(ROOT_DIR, renamedPath);
          // コンテンツの内容を書き換える
          const replacedContent = (() => {
            // declare moduleで括るため、content内のdeclare句は不要になる
            let replacedContent = content.replace(/declare/g, '');
            // ファイルパスを.vueに戻す
            targetFilePaths.forEach((targetFilePath) => {
              replacedContent = replacedContent.replace(
                new RegExp(targetFilePath),
                `${targetFilePath}.vue`
              );
            });
            return replacedContent;
          })();
          return [
            `declare module '${relativePath}' {`,
            replacedContent,
            '}',
          ].join('\n');
        })
      )
      .pipe(gulp.dest('src/@types/generate'))
  );
});
