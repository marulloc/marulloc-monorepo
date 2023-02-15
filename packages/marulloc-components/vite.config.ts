// import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     resolve: {
//         alias: {
//             '@': '/src',
//         },
//     },
//     build: {
//         outDir: 'dist',
//         // sourcemap: true,
//         // emptyOutDir: true,
//         rollupOptions: {
//             output: {
//                 exports: 'auto',
//             },
//         },
//     },
// });

import { defineConfig } from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';
// import ts from 'rollup-plugin-typescript2';
import path from 'path';

export default defineConfig({
    plugins: [
        // reactRefresh(),
        react(),
        // {
        //     ...ts({
        //         tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        //         check: false,
        //         useTsconfigDeclarationDir: true,
        //         tsconfigOverride: {
        //             compilerOptions: {
        //                 declaration: true,
        //                 declarationDir: path.resolve(__dirname, 'dist'),
        //             },
        //             exclude: ['**/__tests__/**', 'test-dts'],
        //         },
        //     }),
        //     apply: 'build',
        // },
    ],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
            },
        },
    },
});
