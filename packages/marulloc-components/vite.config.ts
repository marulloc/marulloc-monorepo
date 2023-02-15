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
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            compilerOptions: {
                jsx: 4,
            },
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            name: 'MyLib',
            formats: ['es', 'umd'],
            fileName: (format) => `my-lib.${format}.js`,
        },
        // outDir: 'dist',
        rollupOptions: {
            // input: {
            //     main: path.resolve(__dirname, 'index.html'),
            // },
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
