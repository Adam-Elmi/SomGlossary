import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');
const glossaryDir = path.join(projectRoot, 'src/pages/glossary');
const outputFile = path.join(projectRoot, 'src/data/metadata.json');

function getRepoInfo() {
    try {
        const url = execSync('git config --get remote.origin.url', { cwd: projectRoot }).toString().trim();
        // Support HTTPS and SSH URLs
        // https://github.com/owner/repo.git
        // git@github.com:owner/repo.git
        const match = url.match(/github\.com[:/]([^/.]+)\/([^/.]+)/);
        if (match) {
            return { owner: match[1], repo: match[2] };
        }
        return null;
    } catch (e) {
        console.error('Failed to get git remote url:', e.message);
        return null;
    }
}

async function fetchCommitInfo(owner, repo, filePath) {
    const relativePath = path.relative(projectRoot, filePath);
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${encodeURIComponent(relativePath)}&page=1&per_page=1`;

    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Node.js-Script',
            }
        };

        https.get(url, options, (res) => {
            if (res.statusCode === 403 || res.statusCode === 429) {
                // Rate limit hit
                resolve({ rateLimited: true });
                return;
            }
            if (res.statusCode !== 200) {
                console.warn(`Failed to fetch for ${relativePath}: Status ${res.statusCode}`);
                resolve(null);
                return;
            }

            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const commits = JSON.parse(data);
                    if (Array.isArray(commits) && commits.length > 0) {
                        const commit = commits[0];
                        resolve({
                            lastUpdated: commit.commit.committer.date.split('T')[0],
                            lastPersonUpdated: commit.commit.committer.name,
                            hash: commit.sha,
                            commitUrl: commit.html_url
                        });
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    console.error(`Error parsing JSON for ${relativePath}`, e);
                    resolve(null);
                }
            });
        }).on('error', (e) => {
            console.error(`Request error for ${relativePath}`, e);
            resolve(null);
        });
    });
}

function getAllFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            if (file.endsWith('.mdx') || file.endsWith('.md')) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
}

async function main() {
    console.log('Starting metadata fetch...');

    const repoInfo = getRepoInfo();
    if (!repoInfo) {
        console.error('Could not determine GitHub repository info.');
        return;
    }
    console.log(`Repository: ${repoInfo.owner}/${repoInfo.repo}`);

    const files = getAllFiles(glossaryDir);
    console.log(`Found ${files.length} glossary files.`);

    let newMetadata = {};
    let existingMetadata = {};

    if (fs.existsSync(outputFile)) {
        try {
            existingMetadata = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
        } catch (e) {
            console.warn('Could not read existing metadata, starting fresh.');
        }
    }

    let rateLimited = false;

    for (const filePath of files) {
        const key = path.relative(projectRoot, filePath);
        console.log(`Fetching metadata for ${key}...`);

        if (rateLimited) {
            if (existingMetadata[key]) {
                newMetadata[key] = existingMetadata[key];
            }
            continue;
        }

        const info = await fetchCommitInfo(repoInfo.owner, repoInfo.repo, filePath);

        if (info && info.rateLimited) {
            console.warn('GitHub API rate limit hit. Stopping updates and preserving remaining existing data.');
            rateLimited = true;
            if (existingMetadata[key]) {
                newMetadata[key] = existingMetadata[key];
            }
            continue;
        }

        let creationDate = null;
        try {
            const created = execSync(`git log --diff-filter=A --follow --format=%aI -- ${filePath} | tail -n 1`, { cwd: projectRoot }).toString().trim();
            if (created) {
                creationDate = created;
            } else {
                const oldest = execSync(`git log --follow --format=%aI -- ${filePath} | tail -n 1`, { cwd: projectRoot }).toString().trim();
                creationDate = oldest;
            }
        } catch (e) {
        }

        if (info) {
            newMetadata[key] = {
                ...info,
                dateAdded: creationDate || info.lastUpdated
            };
        } else {
            console.log(`File ${key} not found on GitHub commit history (or local only). Skipping metadata.`);
        }

        await new Promise(r => setTimeout(r, 200));
    }

    if (Object.keys(newMetadata).length > 0) {
        fs.writeFileSync(outputFile, JSON.stringify(newMetadata, null, 2));
        console.log(`Metadata saved to ${outputFile}`);
    } else {
        if (files.length > 0 && !rateLimited) {
            fs.writeFileSync(outputFile, JSON.stringify({}, null, 2));
            console.log(`Metadata saved (empty) to ${outputFile}`);
        }
    }

    if (rateLimited) {
        console.log('::warning::GitHub API Rate Limit Hit! updates partial.');
    } else {
        console.log('Metadata update complete.');
    }
}

main().catch(console.error);
