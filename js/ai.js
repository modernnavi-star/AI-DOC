// ===========================
// LetterCraft AI - AI Integration (with offline fallback)
// ===========================

let aiAction = 'generate';
let aiConfig = {
    endpoint: localStorage.getItem('ai_endpoint') || 'https://api.openai.com/v1/chat/completions',
    apiKey: localStorage.getItem('ai_apikey') || '',
    model: localStorage.getItem('ai_model') || 'gpt-4o-mini'
};

function openAIComposer(action) {
    if (action) setAIAction(action);
    document.getElementById('aiOverlay').classList.add('active');
    document.getElementById('aiPanel').classList.add('open');
    document.getElementById('requirementInput').focus();
}

function closeAIComposer(e) {
    if (e && e.target !== document.getElementById('aiOverlay') && !e.target.classList.contains('backdrop')) return;
    document.getElementById('aiOverlay').classList.remove('active');
    document.getElementById('aiPanel').classList.remove('open');
}

function toggleAISettings() {
    document.getElementById('aiSettingsPanel').classList.toggle('hidden');
}

function saveAISettings() {
    aiConfig.endpoint = document.getElementById('aiEndpoint').value.trim();
    aiConfig.apiKey = document.getElementById('aiApiKey').value.trim();
    aiConfig.model = document.getElementById('aiModel').value.trim();
    localStorage.setItem('ai_endpoint', aiConfig.endpoint);
    localStorage.setItem('ai_apikey', aiConfig.apiKey);
    localStorage.setItem('ai_model', aiConfig.model);
    showToast('AI settings saved');
    document.getElementById('aiSettingsPanel').classList.add('hidden');
}

async function testAIConnection() {
    if (!aiConfig.apiKey) { showToast('Enter API key first', 'error'); return; }
    showToast('Testing connection...');
    try {
        const res = await fetch(aiConfig.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aiConfig.apiKey}` },
            body: JSON.stringify({ model: aiConfig.model, messages: [{ role: 'user', content: 'Say "OK" only.' }], max_tokens: 10 })
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        showToast('Connection successful!');
    } catch (err) { showToast('Failed: ' + err.message, 'error'); }
}

function setAIAction(action) {
    aiAction = action;
    ['generate', 'correct', 'modify'].forEach(a => {
        const btn = document.getElementById('btnMode' + a.charAt(0).toUpperCase() + a.slice(1));
        if (!btn) return;
        if (a === action) { btn.className = 'btn-mode active'; }
        else { btn.className = 'btn-mode'; }
    });
    const placeholders = {
        generate: 'Describe the document you need...',
        correct: 'What to fix? (leave blank for auto-correct)',
        modify: 'What to add, remove, or change?'
    };
    document.getElementById('requirementInput').placeholder = placeholders[action];
}

// ===========================
// LOCAL TEMPLATE MATCHER (No API needed)
// ===========================
function findBestTemplate(text) {
    const lower = text.toLowerCase();
    const allTemplates = { ...ENGLISH_KNOWLEDGE.templates, ...KANNADA_KNOWLEDGE.templates };

    const scores = {};
    Object.entries(allTemplates).forEach(([key, tmpl]) => {
        let score = 0;
        const nameLower = tmpl.name.toLowerCase();
        const templateLower = tmpl.template.toLowerCase();

        // Check keywords in all docTypeKeywords
        const keywords = ENGLISH_KNOWLEDGE.docTypeKeywords[key] || [];
        keywords.forEach(kw => { if (lower.includes(kw)) score += 3; });

        // Check name matches
        if (nameLower.includes(lower.substring(0, 15))) score += 5;

        // Check common words
        const words = lower.split(/\s+/);
        words.forEach(w => {
            if (w.length > 3 && templateLower.includes(w)) score += 1;
        });

        scores[key] = score;
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted[0][1] > 0 ? sorted[0][0] : null;
}

function generateLocalResponse(text, language) {
    const bestKey = findBestTemplate(text);
    if (!bestKey) {
        return {
            reply: `I couldn't find a perfect match for your request. Here are some suggestions:\n\n**Try these templates:**\n- 📚 Open **Template Library** from the main screen\n- 🌸 Try **Kannada Library** for Kannada documents\n- ✨ Or add an **AI API key** in Settings for smarter generation\n\n**Common documents:** Leave application, Experience certificate, Complaint letter, Medical certificate, Rent agreement, Official letter, NOC, Bonafide, Affidavit.`,
            template: null, docType: null, theme: null, fields: []
        };
    }

    const allTemplates = { ...ENGLISH_KNOWLEDGE.templates, ...KANNADA_KNOWLEDGE.templates };
    const tmpl = allTemplates[bestKey];

    // Detect language preference
    const isKannada = /kannada|kannad|ಕನ್ನಡ|shuddha|karnataka/i.test(text) || /[ಅ-ಹ]/i.test(text);
    const isEnglish = !isKannada;

    // Use the appropriate language template
    let source = isKannada && KANNADA_KNOWLEDGE.templates[bestKey] ? KANNADA_KNOWLEDGE.templates : ENGLISH_KNOWLEDGE.templates;
    let finalTmpl = source[bestKey] || allTemplates[bestKey];

    // Extract fields from template
    const matches = [...finalTmpl.template.matchAll(/\{\{([^}]+)\}\}/g)];
    const fields = [...new Set(matches.map(m => m[1].trim()))];

    const docType = bestKey;
    const theme = finalTmpl.theme || 'default';

    const reply = `**Found a matching template!** ✅\n\n**Document Type:** ${finalTmpl.name}\n**Language:** ${finalTmpl.language === 'kannada' ? 'Kannada (ಶುದ್ಧ ಕನ್ನಡ)' : 'English'}\n**Theme:** ${THEMES[theme]?.name || theme}\n**Fields:** ${fields.length} placeholders\n\n[TEMPLATE]${finalTmpl.template}[/TEMPLATE]\n\n[DOCTYPE: ${docType}]\n[THEME: ${theme}]\n[FIELDS: ${fields.join(', ')}]`;

    return { reply, template: finalTmpl.template, docType, theme, fields };
}

async function sendRequirement() {
    const text = document.getElementById('requirementInput').value.trim();
    if (!text && aiAction !== 'correct') { showToast('Describe what you need', 'error'); return; }

    addChatBubble(text || `(${aiAction} current document)`, 'user');
    document.getElementById('requirementInput').value = '';
    document.getElementById('typingIndicator').classList.remove('hidden');
    scrollChat();

    // If no API key, use local template matcher
    if (!aiConfig.apiKey) {
        await new Promise(r => setTimeout(r, 600)); // Fake typing delay
        document.getElementById('typingIndicator').classList.add('hidden');

        const language = document.getElementById('reqLanguage').value;
        const result = generateLocalResponse(text, language);

        addChatBubble(result.reply, 'ai', true);

        if (result.template) {
            addChatAction('✅ Use This Document', () => {
                const editor = document.getElementById('templateEditor');
                editor.value = result.template;
                window.formData = {};
                if (result.docType) {
                    window.currentDocType = result.docType;
                    const badge = document.getElementById('docTypeBadge');
                    badge.textContent = ENGLISH_KNOWLEDGE.templates[result.docType]?.name || KANNADA_KNOWLEDGE.templates[result.docType]?.name || result.docType;
                    badge.classList.remove('hidden');
                }
                if (result.theme && THEMES[result.theme]) {
                    selectTheme(result.theme);
                } else {
                    const suggestedTheme = docTypeToTheme(result.docType);
                    if (suggestedTheme) selectTheme(suggestedTheme);
                }
                updateFromTemplate();
                showToast('Document applied! Fill the fields on the left.');
                closeAIComposer();
            });
            if (result.fields && result.fields.length > 0) {
                addChatInfo(`📋 Fields: ${result.fields.join(', ')}`);
            }
            if (result.docType) {
                addChatInfo(`📄 Type: ${result.docType}`);
            }
            if (result.theme) {
                addChatInfo(`🎨 Theme: ${THEMES[result.theme]?.name || result.theme}`);
            }
        }
        scrollChat();
        return;
    }

    // API mode (with key)
    const currentTemplate = document.getElementById('templateEditor').value;
    const language = document.getElementById('reqLanguage').value;
    const tone = document.getElementById('reqTone').value;
    const prompt = buildRequirementPrompt(aiAction, text, currentTemplate, language, tone);

    try {
        const res = await fetch(aiConfig.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aiConfig.apiKey}` },
            body: JSON.stringify({
                model: aiConfig.model,
                messages: [
                    { role: 'system', content: getComposerSystemPrompt() },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 3500
            })
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content || 'No response.';

        document.getElementById('typingIndicator').classList.add('hidden');
        addChatBubble(reply, 'ai', true);

        const extracted = extractStructuredResponse(reply);
        if (extracted.template) {
            addChatAction('✅ Use This Document', () => {
                const editor = document.getElementById('templateEditor');
                editor.value = extracted.template;
                window.formData = {};
                if (extracted.docType) {
                    window.currentDocType = extracted.docType;
                    const badge = document.getElementById('docTypeBadge');
                    badge.textContent = extracted.docType;
                    badge.classList.remove('hidden');
                }
                if (extracted.theme && THEMES[extracted.theme]) {
                    selectTheme(extracted.theme);
                } else {
                    const detectedType = detectDocType(extracted.docType || '');
                    const suggestedTheme = docTypeToTheme(detectedType);
                    if (suggestedTheme) selectTheme(suggestedTheme);
                }
                updateFromTemplate();
                showToast('Document applied! Fill the fields on the left.');
                closeAIComposer();
            });
            if (extracted.fields && extracted.fields.length > 0) {
                addChatInfo(`📋 Fields: ${extracted.fields.join(', ')}`);
            }
            if (extracted.docType) {
                addChatInfo(`📄 Type: ${extracted.docType}`);
            }
            if (extracted.theme) {
                addChatInfo(`🎨 Theme: ${THEMES[extracted.theme]?.name || extracted.theme}`);
            }
        }
    } catch (err) {
        document.getElementById('typingIndicator').classList.add('hidden');
        addChatBubble('Error: ' + err.message + '\n\nFalling back to local templates...', 'ai', true);
        // Fallback to local on error
        const result = generateLocalResponse(text, language);
        addChatBubble(result.reply, 'ai', true);
        if (result.template) {
            addChatAction('✅ Use This Document', () => {
                document.getElementById('templateEditor').value = result.template;
                window.formData = {};
                updateFromTemplate();
                closeAIComposer();
            });
        }
    }
    scrollChat();
}

function getComposerSystemPrompt() {
    return `You are an intelligent document generation assistant for Indian government, corporate, education, medical, legal, and personal documents in English and Kannada.

CRITICAL RULES:
1. Detect the document type from the user's request and create the appropriate format (letter, application, certificate, memo, notice, agreement, affidavit, report, etc.).
2. Use {{placeholder}} syntax for ALL variable/changing data. Never use real sample data inside {{}}. Examples: {{applicant_name}}, {{date}}, {{subject}}, {{body}}, {{designation}}, {{department}}, {{organization}}.
3. Generate ALL necessary fields based on the document type — don't miss important fields.
4. For government/court documents, use very formal language and proper structure.
5. For Kannada documents, use formal written Kannada (ಶುದ್ಧ ಕನ್ನಡ), not colloquial. Mix English placeholders inside Kannada text freely.
6. Include a THEME suggestion at the end: [THEME: government|corporate|medical|school|legal|personal|minimal|indigo|teal|purple|nature|ocean|sunset|festival|dark|default]
7. Include a DOCUMENT TYPE label: [DOCTYPE: detected_type]
8. Include a FIELD LIST: [FIELDS: field1, field2, field3...]
9. The template itself should be between [TEMPLATE] and [/TEMPLATE] tags.
10. Make the document look complete and professional — include proper headers, salutations, body, and closings appropriate to the document type.
11. If the user asks to modify, intelligently ADD or REMOVE fields and sections based on their request while preserving existing content.
12. For English, use formal connectors: Furthermore, However, Therefore, Consequently, In addition, Moreover.
13. For Kannada, use proper formal honorifics: ಮಾನ್ಯ, ಶ್ರೀಮಾನ್, ಶ್ರೀಮತಿ, ದಯವಿಟ್ಟು, ವಿಶ್ವಾಸದಿಂದ.
14. NEVER use contractions in English formal documents (don't → do not, can't → cannot, won't → will not).`;
}

function buildRequirementPrompt(action, text, currentTemplate, language, tone) {
    const toneDesc = { 'very-formal': 'very formal, government-style', 'formal': 'formal professional', 'semi-formal': 'semi-formal polite', 'personal': 'personal and warm' }[tone] || 'formal';
    const langDesc = language === 'auto' ? 'Detect language from user request. Default to English unless user asks in Kannada or specifies Kannada.' :
        language === 'kannada' ? 'Kannada language only, using formal written Kannada (ಶುದ್ಧ ಕನ್ನಡ)' :
        language === 'kannada-english' ? 'Mixed Kannada and English with English placeholders inside Kannada text' : 'English language only';

    const grammarHint = 'ENGLISH GRAMMAR RULES: Use passive voice where appropriate. No contractions. No exclamation marks. Use formal connectors. Use "Respected" for salutations. Use "Yours faithfully/sincerely" for closings. Use formal sentence structure.';
    const kannadaHint = 'KANNADA RULES: Use formal honorifics (ಮಾನ್ಯ, ಶ್ರೀಮಾನ್, ಶ್ರೀಮತಿ). Use ದಯವಿಟ್ಟು for please. Use ವಿಶ್ವಾಸದಿಂದ for closing. Use ಕೆಳಕಂಡ for following/below. Number lists with Kannada numerals (೧, ೨, ೩). Date format: ದಿನಾಂಕ: {{date}}.';

    const hints = language === 'kannada' ? kannadaHint : language === 'kannada-english' ? kannadaHint + '\n' + grammarHint : grammarHint;

    if (action === 'generate') {
        return `${hints}

Create a professional document based on this request: "${text}"

Requirements:
- Language: ${langDesc}
- Tone: ${toneDesc}
- Detect the correct document type automatically
- Use {{placeholders}} for ALL variable data
- Include complete formal structure with proper salutations, body, and closings
- Choose the most appropriate visual theme for this document type
- Output inside [TEMPLATE]...[/TEMPLATE] tags`;
    }
    if (action === 'correct') {
        return `${hints}

Improve and correct this document. ${text ? 'Specific instructions: ' + text : 'Fix grammar, improve tone, and make it more professional.'}

Current document:
---
${currentTemplate || '(Empty)'}
---

Requirements:
- Preserve all {{placeholders}} exactly
- Fix grammar, spelling, punctuation
- Improve tone to be ${toneDesc}
- Ensure proper document structure
- Output corrected template inside [TEMPLATE]...[/TEMPLATE] tags`;
    }
    if (action === 'modify') {
        return `${hints}

Modify this document based on: "${text}"

Current document:
---
${currentTemplate || '(Empty)'}
---

Requirements:
- Intelligently add or remove fields ({{placeholders}}) as requested
- Adjust structure, sections, and formatting as needed
- Preserve existing content that should remain
- Ensure all new fields use {{placeholder}} syntax
- Output modified template inside [TEMPLATE]...[/TEMPLATE] tags`;
    }
    return text;
}

function extractStructuredResponse(reply) {
    const template = reply.match(/\[TEMPLATE\]([\s\S]*?)\[\/TEMPLATE\]/)?.[1]?.trim() ||
        (reply.includes('{{') ? extractTemplateFromReply(reply) : null);
    const docType = reply.match(/\[DOCTYPE:\s*([^\]]+)\]/)?.[1]?.trim() ||
        reply.match(/Document Type[\s\w]*:\s*(\w+)/i)?.[1]?.trim() || '';
    const theme = reply.match(/\[THEME:\s*([^\]]+)\]/)?.[1]?.trim() || '';
    const fieldsMatch = reply.match(/\[FIELDS:\s*([^\]]+)\]/);
    const fields = fieldsMatch ? fieldsMatch[1].split(',').map(f => f.trim()).filter(Boolean) : [];
    return { template, docType, theme, fields };
}

function extractTemplateFromReply(reply) {
    const codeMatch = reply.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    if (codeMatch) return codeMatch[1].trim();
    const lines = reply.split('\n');
    let startIdx = -1, endIdx = lines.length;
    for (let i = 0; i < lines.length; i++) {
        if (/^(Date|To,|From,|Subject:|Dear |Respected |To Whom|ದಿನಾಂಕ|ಪ್ರತಿ|ವಿಷಯ|ಮಾನ್ಯ|ಶ್ರೀಮಾನ್|ಆತ್ಮೀಯ)/i.test(lines[i])) {
            if (startIdx === -1) startIdx = i;
        }
        if (startIdx !== -1 && /^(Let me know|I hope|Note:|Disclaimer|If you need|ಹೆಚ್ಚಿನ|ಧನ್ಯವಾದ)/i.test(lines[i])) {
            endIdx = i;
            break;
        }
    }
    if (startIdx !== -1) return lines.slice(startIdx, endIdx).join('\n').trim();
    if (/\{\{[^}]+\}\}/.test(reply)) return reply.trim();
    return null;
}

function addChatBubble(text, sender, isHtml = false) {
    const chatArea = document.getElementById('chatArea');
    const div = document.createElement('div');
    div.className = `chat-bubble ${sender} fade-in`;
    div.innerHTML = isHtml ? renderMarkdown(text) : escapeHtml(text);
    chatArea.appendChild(div);
    scrollChat();
}

function addChatAction(label, onClick) {
    const chatArea = document.getElementById('chatArea');
    const div = document.createElement('div');
    div.className = 'flex gap-2 mt-1 ml-1 fade-in';
    const btn = document.createElement('button');
    btn.className = 'chat-action-btn';
    btn.textContent = label;
    btn.onclick = onClick;
    div.appendChild(btn);
    chatArea.appendChild(div);
    scrollChat();
}

function addChatInfo(text) {
    const chatArea = document.getElementById('chatArea');
    const div = document.createElement('div');
    div.className = 'flex gap-2 mt-1 ml-1 fade-in';
    div.innerHTML = `<span class="chat-badge">${text}</span>`;
    chatArea.appendChild(div);
    scrollChat();
}

function renderMarkdown(text) {
    let html = escapeHtml(text)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.split('\n').map(line => line.trim() === '' ? '<br>' : line).join('\n');
    return html;
}

function scrollChat() {
    const chatArea = document.getElementById('chatArea');
    chatArea.scrollTop = chatArea.scrollHeight;
}

function detectDocType(text) {
    const lower = text.toLowerCase();
    const keywords = {
        leave: ['leave', 'vacation', 'holiday', 'absence', 'sick', 'medical', 'casual', 'earned', 'maternity', 'otp', 'ರಜಾ'],
        justification: ['justification', 'explanation', 'late', 'delay', 'clarification', 'defense', 'samardhane'],
        complaint: ['complaint', 'grievance', 'problem', 'issue', 'defect', 'repair', 'duru'],
        noc: ['noc', 'no objection', 'clearance', 'release'],
        experience: ['experience', 'service certificate', 'employment', 'relieving', 'anubhava'],
        bonafide: ['bonafide', 'student', 'study', 'enrollment', 'admission', 'nidhavada'],
        rent: ['rent', 'rental', 'lease', 'tenancy', 'landlord', 'tenant', 'badike', 'bhaada'],
        affidavit: ['affidavit', 'declaration', 'sworn', 'oath', 'pramana', 'halafnama'],
        request: ['request', 'permission', 'approval', 'sanction', 'permit', 'vinanti'],
        resignation: ['resign', 'resignation', 'quit', 'notice', 'relieving', 'separation'],
        notice: ['notice', 'circular', 'staff notice', 'memo', 'office order', 'instruction', 'attendance', 'kams', 'mark attendance', 'seriously', 'staff memo', 'disciplinary', 'warning', 'all staff'],
        medicalCertificate: ['medical certificate', 'justification', 'admission', 'discharge', 'diagnosis', 'hospital', 'enteric', 'fever', 'patient'],
        medicalLabReport: ['lab report', 'laboratory', 'investigation', 'blood test', 'fbs', 'ppbs', 'haemoglobin', 'widal', 'dengue'],
        officialLetter: ['official letter', 'government letter', 'panchayat', 'demolition', 'memo', 'phc', 'department letter', 'gram panchayat'],
        governmentLetterhead: ['letterhead', 'memo head', 'reference number', 'official header'],
    };
    const scores = {};
    for (const [type, words] of Object.entries(keywords)) {
        scores[type] = words.reduce((acc, w) => acc + (lower.includes(w) ? 1 : 0), 0);
    }
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted[0][1] > 0 ? sorted[0][0] : 'request';
}

function docTypeToTheme(docType) {
    const map = {
        leave: 'school', justification: 'government', complaint: 'government',
        noc: 'corporate', experience: 'corporate', bonafide: 'school',
        rent: 'legal', affidavit: 'legal', request: 'default',
        notice: 'government', resignation: 'corporate', offer: 'corporate', application: 'default',
        medical: 'medical', school: 'school', government: 'government',
        medicalCertificate: 'medical', medicalLabReport: 'medical',
        officialLetter: 'government', governmentLetterhead: 'government',
    };
    return map[docType] || 'default';
}

window.aiAction = aiAction;
window.aiConfig = aiConfig;
window.openAIComposer = openAIComposer;
window.closeAIComposer = closeAIComposer;
window.toggleAISettings = toggleAISettings;
window.saveAISettings = saveAISettings;
window.testAIConnection = testAIConnection;
window.setAIAction = setAIAction;
window.sendRequirement = sendRequirement;
window.getComposerSystemPrompt = getComposerSystemPrompt;
window.buildRequirementPrompt = buildRequirementPrompt;
window.extractStructuredResponse = extractStructuredResponse;
window.extractTemplateFromReply = extractTemplateFromReply;
window.addChatBubble = addChatBubble;
window.addChatAction = addChatAction;
window.addChatInfo = addChatInfo;
window.renderMarkdown = renderMarkdown;
window.scrollChat = scrollChat;
window.detectDocType = detectDocType;
window.docTypeToTheme = docTypeToTheme;
window.findBestTemplate = findBestTemplate;
window.generateLocalResponse = generateLocalResponse;
