const { existsSync, readFileSync, writeFileSync } = require('fs');
const { isArray, mergeWith } = require('lodash');

function safeReadJson(path) {
    try {
        return JSON.parse(readFileSync(path, 'utf8'));
    } catch (err) {
        // Avoid crashing dev/watch if a manifest is being written concurrently
        console.warn(`Manifest read warning (${path}): ${err && err.message}`);
        return null;
    }
}

function mergeManifests(outputPath, sourcePathA, sourcePathB) {
    if (!existsSync(sourcePathA) || !existsSync(sourcePathB)) {
        console.warn('Manifest merge skipped: one of the sources does not exist');
        return;
    }

    const manifestA = safeReadJson(sourcePathA);
    const manifestB = safeReadJson(sourcePathB);

    if (!manifestA || !manifestB) {
        // Skip merge this cycle; watcher will try again on next build
        return;
    }

    const result = mergeWith(manifestA, manifestB, (valueA, valueB) => {
        if (!isArray(valueA) || !isArray(valueB)) {
            return undefined;
        }

        return valueA.concat(valueB);
    });

    writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
}

module.exports = mergeManifests;
