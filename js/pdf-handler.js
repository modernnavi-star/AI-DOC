// ===========================
// LetterCraft AI - PDF Handler
// ===========================

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

async function handlePDFUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
        const arrayBuffer = await file.arrayBuffer();
        const text = await extractPDFText(arrayBuffer);
        if (!templateEditor.value.trim()) {
            templateEditor.value = text;
        } else {
            templateEditor.value = text + '\n\n--- Extracted PDF Text ---\n\n' + templateEditor.value;
        }
        updateFromTemplate();
        showToast('PDF extracted! Use AI to convert to a smart template.', 'success');
    } catch (err) {
        console.error('PDF extraction error:', err);
        showToast('Could not read PDF. Try a text-based PDF.', 'error');
    }
}

async function extractPDFText(arrayBuffer) {
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const lineMap = new Map();
        const yThreshold = 3;
        for (const item of textContent.items) {
            const y = Math.round(item.transform[5] / yThreshold) * yThreshold;
            if (!lineMap.has(y)) lineMap.set(y, []);
            lineMap.get(y).push(item);
        }
        const sortedLines = Array.from(lineMap.entries()).sort((a, b) => b[0] - a[0]);
        for (const [y, items] of sortedLines) {
            items.sort((a, b) => a.transform[4] - b.transform[4]);
            const lineText = items.map(item => item.str).join(' ');
            if (lineText.trim()) fullText += lineText + '\n';
        }
        fullText += '\n';
    }
    return fullText.trim();
}

window.handlePDFUpload = handlePDFUpload;
window.extractPDFText = extractPDFText;
