import fs from 'fs/promises';
import path from 'path';
import { transpile } from 'sommark';
import somglossaryMapper from '../mappers/somglossaryMapper.js';

const contentDir = path.resolve('content');
const outputDir = path.resolve('src/pages/glossary');

async function compile() {
    try {
        await fs.mkdir(outputDir, { recursive: true });

        const files = await fs.readdir(contentDir);
        const smarkFiles = files.filter(file => file.endsWith('.smark'));

        if (smarkFiles.length === 0) {
            console.log('No .smark files found in content directory.');
            return;
        }

        console.log(`Found ${smarkFiles.length} .smark files. Compiling...`);

        for (const file of smarkFiles) {
            const inputPath = path.join(contentDir, file);
            const source = await fs.readFile(inputPath, 'utf-8');
            const name = path.parse(file).name;
            const outputPath = path.join(outputDir, `${name}.mdx`);

            console.log(`Compiling ${file}...`);

            try {
                const output = transpile({
                    src: source,
                    format: 'mdx',
                    mapperFile: somglossaryMapper,
                    includeDocument: false
                });

                await fs.writeFile(outputPath, output);
                console.log(`Generated ${outputPath}`);
            } catch (err) {
                console.error(`Failed to compile ${file}:`, err);
                process.exit(1);
            }
        }

        console.log('Compilation complete.');

    } catch (error) {
        console.error('Compilation failed:', error);
        process.exit(1);
    }
}

compile();
