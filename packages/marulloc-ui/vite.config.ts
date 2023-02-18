import react from '@vitejs/plugin-react';
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
                declaration: true,
                // declarationDir: './dist/types',
            },
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            name: 'marulloc-ui',
            formats: ['es', 'umd'],
            fileName: (format) => `marulloc-ui.${format}.js`,
        },
        rollupOptions: {
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
