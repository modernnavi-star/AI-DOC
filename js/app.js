// LetterCraft AI — Main Application (Gemini-style Chat Interface)
let chats = JSON.parse(localStorage.getItem('lc_chats') || '[]');
let currentChatId = null;
let currentTemplate = '';
let currentPlaceholders = [];
let formData = {};
let currentDocType = '';
let currentTheme = 'default';
let isRecording = false;
let recognition = null;
let records = [];

const chatInput = document.getElementById('chatInput');
const messagesArea = document.getElementById('messagesArea');
const welcomeScreen = document.getElementById('welcomeScreen');
const pdfInput = document.getElementById('pdfInput');

// ===========================
// SIDEBAR
// ===========================
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function renderRecentChats() {
    const list = document.getElementById('recentChatsList');
    if (!chats.length) {
        list.innerHTML = '<div style="padding:1rem;text-align:center;color:#94a3b8;font-size:0.8rem;">No chats yet. Start a new one!</div>';
        return;
    }
    list.innerHTML = chats.map((chat, idx) => `
        <div class="sidebar-chat-item ${chat.id === currentChatId ? 'active' : ''}" onclick="loadChat('${chat.id}')">
            <span class="chat-icon">💬</span>
            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${chat.title || 'Untitled'}</span>
        </div>
    `).join('');
}

function newChat() {
    currentChatId = null;
    currentTemplate = '';
    currentPlaceholders = [];
    formData = {};
    currentDocType = '';
    currentTheme = 'default';
    records = [];
    document.getElementById('currentChatTitle').textContent = 'New Chat';
    welcomeScreen.style.display = 'flex';
    messagesArea.innerHTML = '';
    document.getElementById('sidebar').classList.remove('open');
}

function loadChat(id) {
    const chat = chats.find(c => c.id === id);
    if (!chat) return;
    currentChatId = id;
    currentTemplate = chat.template || '';
    currentPlaceholders = chat.placeholders || [];
    formData = chat.formData || {};
    currentDocType = chat.docType || '';
    currentTheme = chat.theme || 'default';
    document.getElementById('currentChatTitle').textContent = chat.title || 'Chat';
    welcomeScreen.style.display = 'none';
    renderMessages(chat.messages || []);
    renderRecentChats();
    document.getElementById('sidebar').classList.remove('open');
}

function saveCurrentChat() {
    if (!currentChatId) return;
    const chat = chats.find(c => c.id === currentChatId);
    if (!chat) return;
    chat.template = currentTemplate;
    chat.placeholders = currentPlaceholders;
    chat.formData = formData;
    chat.docType = currentDocType;
    chat.theme = currentTheme;
    localStorage.setItem('lc_chats', JSON.stringify(chats));
}

function createChat(title) {
    const id = 'chat_' + Date.now();
    const chat = { id, title, messages: [], createdAt: new Date().toISOString(), template: '', placeholders: [], formData: {}, docType: '', theme: 'default' };
    chats.unshift(chat);
    if (chats.length > 50) chats = chats.slice(0, 50);
    localStorage.setItem('lc_chats', JSON.stringify(chats));
    currentChatId = id;
    document.getElementById('currentChatTitle').textContent = title;
    renderRecentChats();
    return chat;
}

function addMessageToChat(role, content, actions) {
    const chat = chats.find(c => c.id === currentChatId);
    if (!chat) return;
    if (!chat.messages) chat.messages = [];
    chat.messages.push({ role, content, actions, time: new Date().toISOString() });
    localStorage.setItem('lc_chats', JSON.stringify(chats));
}

function renderMessages(msgs) {
    messagesArea.innerHTML = '';
    msgs.forEach(m => renderMessage(m.role, m.content, m.actions, false));
}

// ===========================
// CHAT MESSAGES
// ===========================
function renderMessage(role, content, actions, animate = true) {
    const div = document.createElement('div');
    div.className = `message ${role === 'user' ? 'message-user' : ''} ${animate ? 'fade-in' : ''}`;
    const avatar = role === 'user' ? '👤' : '🤖';
    const avatarBg = role === 'user' ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'var(--surface-alt)';
    const avatarColor = role === 'user' ? 'white' : 'var(--text)';

    div.innerHTML = `
        <div class="message-avatar" style="background:${avatarBg};color:${avatarColor}">${avatar}</div>
        <div class="message-content">${content}</div>
    `;

    if (actions && actions.length) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'message-actions';
        actionsDiv.style.marginLeft = role === 'user' ? 'auto' : '44px';
        actionsDiv.style.maxWidth = '85%';
        actions.forEach(a => {
            const btn = document.createElement('button');
            btn.className = a.primary ? 'message-action-btn primary' : 'message-action-btn';
            btn.innerHTML = a.label;
            btn.onclick = a.onClick;
            actionsDiv.appendChild(btn);
        });
        div.appendChild(actionsDiv);
    }

    messagesArea.appendChild(div);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function showTyping() {
    const div = document.createElement('div');
    div.className = 'message fade-in';
    div.id = 'typingMessage';
    div.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content" style="padding:0.75rem 1rem;">
            <div class="typing-indicator">
                <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
            </div>
        </div>
    `;
    messagesArea.appendChild(div);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function hideTyping() {
    const el = document.getElementById('typingMessage');
    if (el) el.remove();
}

// ===========================
// WELCOME & SUGGESTIONS
// ===========================
function startChat(text) {
    welcomeScreen.style.display = 'none';
    if (!currentChatId) createChat(text.substring(0, 40) + '...');
    chatInput.value = text;
    sendChatMessage();
}

// ===========================
// SEND MESSAGE
// ===========================
function sendChatMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = '';
    chatInput.style.height = 'auto';

    if (!currentChatId) createChat(text.substring(0, 40) + '...');

    welcomeScreen.style.display = 'none';
    renderMessage('user', escapeHtml(text));
    addMessageToChat('user', escapeHtml(text));

    showTyping();

    if (text.toLowerCase().includes('pdf') || text.toLowerCase().includes('upload')) {
        document.getElementById('pdfInput').click();
        hideTyping();
        return;
    }

    // Determine if this is a document generation request or a follow-up
    if (isDocumentRequest(text)) {
        setTimeout(() => generateDocumentResponse(text), 400);
    } else {
        setTimeout(() => generateGeneralResponse(text), 400);
    }
}

function isDocumentRequest(text) {
    const lower = text.toLowerCase();
    const docWords = ['letter', 'certificate', 'notice', 'application', 'complaint', 'agreement', 'affidavit', 'memo', 'circular', 'invitation', 'report', 'form', 'document', 'template', 'create', 'write', 'generate', 'make', 'draft', 'prepared', 'notice', 'official', 'medical', 'leave', 'experience', 'noc', 'bonafide', 'rent', 'resignation', 'justification', 'kannada', 'ಕನ್ನಡ', 'ಪತ್ರ', 'ಪ್ರಮಾಣಪತ್ರ', 'ಅರ್ಜಿ'];
    return docWords.some(w => lower.includes(w));
}

// ===========================
// DOCUMENT GENERATION (Local AI / Offline)
// ===========================
function generateDocumentResponse(text) {
    hideTyping();

    const result = generateLocalResponse(text);
    if (!result.template) {
        const reply = `I couldn't find an exact match for that request. Let me help you find the right template! 🎯<br><br>
**Try these popular options:**<br>
• 📚 **Template Library** — browse all 20+ categorized templates<br>
• 🌸 **Kannada Library** — Kannada documents<br>
• Or rephrase with more keywords like "leave application", "medical certificate", "official notice", "rent agreement", etc.`;
        renderMessage('ai', reply, [
            { label: '📚 Open Template Library', primary: true, onClick: openTemplateLibrary },
            { label: '🌸 Kannada Templates', onClick: openKannadaLibrary }
        ]);
        addMessageToChat('ai', reply, [{ label: 'Open Template Library' }, { label: 'Kannada Templates' }]);
        return;
    }

    currentTemplate = result.template;
    currentPlaceholders = result.fields;
    currentDocType = result.docType;
    currentTheme = result.theme || 'default';

    // Apply theme
    selectTheme(currentTheme);

    const docName = (ENGLISH_KNOWLEDGE.templates[result.docType]?.name || KANNADA_KNOWLEDGE.templates[result.docType]?.name || result.docType);
    const langName = result.language === 'kannada' ? 'Kannada (ಶುದ್ಧ ಕನ್ನಡ)' : 'English';

    const reply = `**✅ Found matching template!**<br><br>
**Document:** ${docName}<br>
**Language:** ${langName}<br>
**Theme:** ${(THEMES[result.theme]?.name || result.theme)}<br>
**Fields:** ${result.fields.length} placeholders to fill<br><br>
I've prepared the template. Now you can:<br>
• **Fill the fields** to customize the document<br>
• **Preview the PDF** to see how it looks<br>
• **Download the PDF** when ready`;

    renderMessage('ai', reply, [
        { label: '✏️ Fill Fields (' + result.fields.length + ')', primary: true, onClick: openFormEditor },
        { label: '📄 Preview', onClick: showPdfPreview },
        { label: '🎨 Theme', onClick: toggleThemePicker }
    ]);

    addMessageToChat('ai', reply, [
        { label: 'Fill Fields' },
        { label: 'Preview' },
        { label: 'Theme' }
    ]);

    saveCurrentChat();
}

function generateGeneralResponse(text) {
    hideTyping();
    const reply = `I can help you generate professional documents! Here are some things I can do:<br><br>
📝 **Letters & Applications** — Leave, complaint, request, resignation<br>
📜 **Certificates** — Experience, bonafide, NOC, medical<br>
📢 **Official Notices** — Circulars, memos, office orders<br>
🏠 **Agreements** — Rent, affidavit, legal<br>
🏥 **Medical Documents** — Certificates, lab reports<br>
🇮🇳 **Kannada & English** — Both languages supported<br><br>
Just describe what you need, like:<br>
*"Write a leave application in Kannada for 3 days"*<br>
*"Medical certificate for enteric fever"*<br>
*"Notice to staff about attendance"*`;
    renderMessage('ai', reply);
    addMessageToChat('ai', reply);
}

// ===========================
// LOCAL TEMPLATE MATCHER
// ===========================
function generateLocalResponse(text) {
    const lower = text.toLowerCase();
    const allTemplates = { ...ENGLISH_KNOWLEDGE.templates, ...KANNADA_KNOWLEDGE.templates };

    const scores = {};
    Object.entries(allTemplates).forEach(([key, tmpl]) => {
        let score = 0;
        const nameLower = tmpl.name.toLowerCase();
        const templateLower = tmpl.template.toLowerCase();

        const keywords = ENGLISH_KNOWLEDGE.docTypeKeywords[key] || [];
        keywords.forEach(kw => { if (lower.includes(kw)) score += 3; });

        const words = lower.split(/\s+/).filter(w => w.length > 3);
        words.forEach(w => {
            if (nameLower.includes(w)) score += 2;
            if (templateLower.includes(w)) score += 1;
        });

        scores[key] = score;
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const bestKey = sorted[0][1] > 0 ? sorted[0][0] : null;

    if (!bestKey) return { template: null, docType: null, theme: null, fields: [], language: 'english' };

    const isKannada = /kannada|kannad|ಕನ್ನಡ|shuddha|karnataka/i.test(text) || /[ಅ-ಹ]/i.test(text);
    const source = isKannada && KANNADA_KNOWLEDGE.templates[bestKey] ? KANNADA_KNOWLEDGE.templates : ENGLISH_KNOWLEDGE.templates;
    const finalTmpl = source[bestKey] || allTemplates[bestKey];

    const matches = [...finalTmpl.template.matchAll(/\{\{([^}]+)\}\}/g)];
    const fields = [...new Set(matches.map(m => m[1].trim()))];

    return {
        template: finalTmpl.template,
        docType: bestKey,
        theme: finalTmpl.theme || 'default',
        fields: fields,
        language: finalTmpl.language || 'english'
    };
}

// ===========================
// FORM EDITOR
// ===========================
function openFormEditor() {
    if (!currentPlaceholders.length) {
        showToast('No fields to fill. Generate a document first!');
        return;
    }
    document.getElementById('formOverlay').classList.add('active');
    renderFormEditor();
}

function closeFormEditor(e) {
    if (e && e.target !== document.getElementById('formOverlay') && !e.target.classList.contains('overlay-backdrop')) return;
    document.getElementById('formOverlay').classList.remove('active');
}

function renderFormEditor() {
    const container = document.getElementById('formEditorBody');
    if (!currentPlaceholders.length) {
        container.innerHTML = '<div class="empty-state">No fields to fill</div>';
        return;
    }
    container.innerHTML = currentPlaceholders.map((ph, idx) => {
        const label = ph.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
        const isMultiline = /body|content|message|address|description|reason|explanation|details|note|paragraph|justification|purpose|remarks|scope|summary|terms|condition|clause|instruction|resolution|declaration|affidavit|opening|narrative|background|context|elaboration|additional|further|supplementary|annexure|appendix|schedule|preamble|whereas|witnesseth/i.test(ph);
        const isDate = /date|day|time|dob|issued_on|expiry|from_date|to_date|start_date|end_date|join_date|relieve_date|return_date|effective_date|termination_date|notice_period|commencement|completion|deadline|due_date|appointment_date|interview_date|meeting_date|event_date|issue_date|expiry_date|renewal_date|review_date|submission_date|last_date|closing_date/i.test(ph) && !/address|birthday|daycare|today|holiday|weekday/i.test(ph);
        const val = formData[ph] || '';

        const isKannadaField = /kannada|kannad|karnataka|shuddha|kannadiga|malyalam|telugu|tamil|hindi/i.test(ph) || /[ಅ-ಹ]/i.test(ph);
        const voiceLang = isKannadaField ? 'kannada' : 'english';
        const voiceBtn = ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
            ? `<button class="btn-voice" data-voice-for="form-${idx}" onclick="toggleVoiceForm('form-${idx}', '${voiceLang}')" title="Voice Input">🎙️</button>`
            : '';

        let input = '';
        if (isMultiline) input = `<textarea id="form-${idx}" data-key="${ph}" rows="3" class="input-sm" placeholder="Enter ${label.toLowerCase()}...">${escapeHtml(val)}</textarea>`;
        else if (isDate) input = `<input type="date" id="form-${idx}" data-key="${ph}" value="${escapeHtml(val)}" class="input-sm">`;
        else input = `<input type="text" id="form-${idx}" data-key="${ph}" value="${escapeHtml(val)}" class="input-sm" placeholder="Enter ${label.toLowerCase()}...">`;

        return `<div class="form-group">
            <label><span class="label-dot"></span>${label}</label>
            <div class="field-wrapper">${input}${voiceBtn}</div>
        </div>`;
    }).join('');
}

function generateFromForm() {
    currentPlaceholders.forEach((ph, idx) => {
        const el = document.getElementById('form-' + idx);
        if (el) formData[ph] = el.value;
    });
    saveCurrentChat();
    closeFormEditor();
    showPdfPreview();
    showToast('Document generated! Click Download PDF to save.');
}

function resetFormData() {
    formData = {};
    renderFormEditor();
}

// ===========================
// PDF PREVIEW
// ===========================
function showPdfPreview() {
    document.getElementById('pdfOverlay').classList.add('active');
    renderPdfPreview();
}

function closePdfPreview(e) {
    if (e && e.target !== document.getElementById('pdfOverlay') && !e.target.classList.contains('overlay-backdrop')) return;
    document.getElementById('pdfOverlay').classList.remove('active');
}

function renderPdfPreview() {
    const container = document.getElementById('pdfPreviewContainer');
    const theme = THEMES[currentTheme] || THEMES.default;
    const header = document.getElementById('customHeader')?.value?.trim() || '';
    const footer = document.getElementById('customFooter')?.value?.trim() || '';

    if (!currentTemplate) {
        container.innerHTML = `<div class="empty-state" style="padding:4rem 1rem;">
            <svg class="icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span style="font-size:1.1rem;">No document generated yet</span>
            <span style="font-size:0.85rem;">Ask me to create a letter, certificate, or notice</span>
        </div>`;
        return;
    }

    let html = escapeHtml(currentTemplate);
    currentPlaceholders.forEach(ph => {
        const val = formData[ph] || '';
        const display = val ? escapeHtml(val) : `<span style="color:#93c5fd;font-style:italic;">[${escapeHtml(ph)}]</span>`;
        html = html.replace(new RegExp('\\{\\{' + escapeRegex(ph) + '\\}\\}', 'g'), display);
    });
    html = html.replace(/\{\{([^}]+)\}\}/g, '<span style="color:#93c5fd;font-style:italic;">[$1]</span>');
    const lines = html.split('\n').map(line => {
        if (!line.trim()) return '<div style="height:10px;"></div>';
        return `<div style="margin-bottom:1px;min-height:1.2em;">${line || '&nbsp;'}</div>`;
    }).join('');

    const watermark = theme.watermark ? `<div class="preview-watermark" style="color:${theme.color};opacity:0.04">${theme.watermark}</div>` : '';
    const headerBar = `<div style="background:${theme.previewHeader};height:5px;border-radius:3px;margin-bottom:18px;"></div>`;
    const headerText = header ? `<div style="font-size:11px;color:${theme.color};font-weight:700;text-align:center;margin-bottom:10px;text-transform:uppercase;letter-spacing:1.5px;border-bottom:2px solid ${theme.colorLight};padding-bottom:8px;">${header}</div>` : '';
    const footerText = footer ? `<div style="font-size:9px;color:#64748b;text-align:center;margin-top:16px;border-top:1px solid ${theme.border};padding-top:10px;">${footer}</div>` : '';

    container.innerHTML = `<div class="pdf-container ${document.getElementById('uiFont')?.value || 'font-mixed'} whitespace-pre-wrap">
        <div style="width:100%;height:100%;position:relative;">${watermark}${headerBar}${headerText}<div>${lines}</div>${footerText}</div>
    </div>`;
}

function changeFont() {
    renderPdfPreview();
}

// ===========================
// EXPORT PDF
// ===========================
function exportPDF() {
    const el = document.querySelector('.pdf-container');
    if (!el || el.textContent.includes('No document generated yet')) {
        showToast('Generate a document first!', 'error');
        return;
    }
    const opt = {
        margin: 0,
        filename: `${currentDocType || 'document'}_${new Date().toISOString().slice(0,10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(el).save().then(() => {
        showToast('PDF downloaded!');
    }).catch(err => {
        showToast('PDF error: ' + err.message, 'error');
    });
}

// ===========================
// THEME
// ===========================
function toggleThemePicker() {
    document.getElementById('themeOverlay').classList.add('active');
    renderThemeGrid('themeGrid', currentTheme, selectTheme);
}
function closeThemePicker(e) {
    if (e && e.target !== document.getElementById('themeOverlay') && !e.target.classList.contains('overlay-backdrop')) return;
    document.getElementById('themeOverlay').classList.remove('active');
}
function selectTheme(key) {
    currentTheme = key;
    renderThemeGrid('themeGrid', currentTheme, selectTheme);
    saveCurrentChat();
    if (document.getElementById('pdfOverlay').classList.contains('active')) {
        renderPdfPreview();
    }
    showToast(`Theme: ${THEMES[key]?.name || 'Default'}`);
}
function applyTheme() { renderPdfPreview(); }

// ===========================
// TEMPLATE LIBRARY
// ===========================
function openTemplateLibrary() {
    document.getElementById('templateLibraryOverlay').classList.add('active');
    renderTemplateLibrary();
}
function closeTemplateLibrary(e) {
    if (e && e.target !== document.getElementById('templateLibraryOverlay') && !e.target.classList.contains('overlay-backdrop')) return;
    document.getElementById('templateLibraryOverlay').classList.remove('active');
}
function renderTemplateLibrary() {
    const container = document.getElementById('templateLibraryContent');
    const all = [];
    Object.entries(KANNADA_KNOWLEDGE.templates).forEach(([key, t]) => { all.push({key, lang:'kannada', ...t}); });
    Object.entries(ENGLISH_KNOWLEDGE.templates).forEach(([key, t]) => { all.push({key, lang:'english', ...t}); });
    const categories = {};
    all.forEach(t => { const cat = t.category || 'General'; if (!categories[cat]) categories[cat] = []; categories[cat].push(t); });
    const catOrder = ['Official & Government', 'Medical & Health', 'Education', 'Legal & Agreements', 'Employment', 'General'];
    const sortedCats = Object.keys(categories).sort((a, b) => {
        const ia = catOrder.indexOf(a); const ib = catOrder.indexOf(b);
        if (ia === -1 && ib === -1) return a.localeCompare(b);
        if (ia === -1) return 1; if (ib === -1) return -1; return ia - ib;
    });
    container.innerHTML = sortedCats.map(cat => {
        const items = categories[cat].map(t => `
            <div class="info-card" onclick="loadTemplateFromLibrary('${t.key}', '${t.lang}')">
                <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:0.35rem;">
                    <h4 style="font-size:0.85rem;font-weight:700;color:#1e293b;flex:1;">${t.name}</h4>
                    <span class="badge-lang" style="background:${t.lang==='kannada'?'#fce7f3;color:#be185d;':'#dbeafe;color:#1e40af;'}">${t.lang==='kannada'?'KN':'EN'}</span>
                </div>
                <div style="font-size:0.75rem;color:#64748b;font-family:monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;">${escapeHtml(t.template.substring(0, 120))}...</div>
                <div class="card-meta">
                    <span class="dot" style="width:8px;height:8px;border-radius:50%;background:${(THEMES[t.theme]||THEMES.default).color}"></span>
                    <span>${(THEMES[t.theme]||THEMES.default).name}</span>
                </div>
            </div>
        `).join('');
        return `<div style="margin-bottom:1rem;">
            <h3 style="font-size:0.75rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.35rem;">
                <span style="width:4px;height:16px;border-radius:4px;background:#4f46e5;"></span>${cat}
            </h3>
            <div style="display:grid;grid-template-columns:1fr;gap:0.5rem;">${items}</div>
        </div>`;
    }).join('');
}
function loadTemplateFromLibrary(key, lang) {
    const source = lang === 'kannada' ? KANNADA_KNOWLEDGE.templates : ENGLISH_KNOWLEDGE.templates;
    const t = source[key];
    if (!t) return;
    currentTemplate = t.template;
    const matches = [...t.template.matchAll(/\{\{([^}]+)\}\}/g)];
    currentPlaceholders = [...new Set(matches.map(m => m[1].trim()))];
    currentDocType = key;
    currentTheme = t.theme || 'default';
    formData = {};
    selectTheme(currentTheme);
    closeTemplateLibrary();
    if (!currentChatId) createChat(t.name);
    welcomeScreen.style.display = 'none';
    const msg = `Loaded **${t.name}** from the library! 🎉<br><br>Ready to fill ${currentPlaceholders.length} fields and generate your PDF.`;
    renderMessage('ai', msg, [
        { label: '✏️ Fill Fields', primary: true, onClick: openFormEditor },
        { label: '📄 Preview', onClick: showPdfPreview }
    ]);
    addMessageToChat('ai', msg, [{ label: 'Fill Fields' }, { label: 'Preview' }]);
    saveCurrentChat();
    showToast(`Loaded: ${t.name}`);
}

// ===========================
// KANNADA LIBRARY
// ===========================
function openKannadaLibrary() {
    openTemplateLibrary();
}

// ===========================
// SETTINGS
// ===========================
function openSettings() {
    document.getElementById('settingsOverlay').classList.add('active');
    document.getElementById('aiEndpoint').value = aiConfig.endpoint;
    document.getElementById('aiApiKey').value = aiConfig.apiKey;
    document.getElementById('aiModel').value = aiConfig.model;
}
function closeSettings(e) {
    if (e && e.target !== document.getElementById('settingsOverlay') && !e.target.classList.contains('overlay-backdrop')) return;
    document.getElementById('settingsOverlay').classList.remove('active');
}
function openHelp() {
    window.open('https://github.com/modernnavi-star/AI-DOC#readme', '_blank');
}

// ===========================
// VOICE INPUT
// ===========================
function initVoice() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
}

function toggleVoiceChat() {
    if (!recognition) { showToast('Voice not supported on this browser', 'error'); return; }
    const btn = document.getElementById('voiceBtn');
    if (isRecording) {
        recognition.stop();
        isRecording = false;
        btn.classList.remove('recording');
        btn.style.color = '';
        return;
    }
    isRecording = true;
    btn.classList.add('recording');
    btn.style.color = '#ef4444';
    recognition.lang = 'en-IN';
    recognition.onresult = (e) => {
        let transcript = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
            transcript += e.results[i][0].transcript;
        }
        chatInput.value = transcript;
        chatInput.style.height = 'auto';
        chatInput.style.height = chatInput.scrollHeight + 'px';
    };
    recognition.onend = () => {
        isRecording = false;
        btn.classList.remove('recording');
        btn.style.color = '';
    };
    recognition.onerror = (e) => {
        isRecording = false;
        btn.classList.remove('recording');
        btn.style.color = '';
        showToast('Voice error: ' + e.error, 'error');
    };
    recognition.start();
}

function toggleVoiceForm(inputId, lang) {
    if (!recognition) return;
    const btn = document.querySelector(`button[data-voice-for="${inputId}"]`);
    if (btn.classList.contains('recording')) {
        recognition.stop();
        btn.classList.remove('recording');
        return;
    }
    btn.classList.add('recording');
    recognition.lang = lang === 'kannada' ? 'kn-IN' : 'en-IN';
    recognition.onresult = (e) => {
        let t = '';
        for (let i = e.resultIndex; i < e.results.length; i++) t += e.results[i][0].transcript;
        const input = document.getElementById(inputId);
        if (input) { input.value = t; input.dispatchEvent(new Event('input')); }
    };
    recognition.onend = () => { btn.classList.remove('recording'); };
    recognition.onerror = () => { btn.classList.remove('recording'); };
    recognition.start();
}

// ===========================
// PDF UPLOAD
// ===========================
function handlePDFUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    showToast('Reading PDF...');
    const reader = new FileReader();
    reader.onload = async function() {
        const typedarray = new Uint8Array(this.result);
        try {
            const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
            let text = '';
            for (let i = 1; i <= Math.min(pdf.numPages, 5); i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                text += content.items.map(item => item.str).join(' ') + '\n\n';
            }
            processExtractedText(text, file.name);
        } catch (err) {
            showToast('PDF error: ' + err.message, 'error');
        }
    };
    reader.readAsArrayBuffer(file);
}

function processExtractedText(text, filename) {
    const lower = text.toLowerCase();
    const result = generateLocalResponse(text);
    if (result.template) {
        currentTemplate = result.template;
        currentPlaceholders = result.fields;
        currentDocType = result.docType;
        currentTheme = result.theme || 'default';
        selectTheme(currentTheme);
        const msg = `PDF uploaded: **${filename}** 📄<br><br>I detected a **${ENGLISH_KNOWLEDGE.templates[result.docType]?.name || result.docType}** template from the PDF. You can now fill in the fields and generate your PDF.`;
        renderMessage('ai', msg, [
            { label: '✏️ Fill Fields', primary: true, onClick: openFormEditor },
            { label: '📄 Preview', onClick: showPdfPreview }
        ]);
        addMessageToChat('ai', msg, [{ label: 'Fill Fields' }, { label: 'Preview' }]);
    } else {
        const lines = text.split('\n').slice(0, 30).join('\n');
        const msg = `PDF uploaded: **${filename}** 📄<br><br>I extracted the text but couldn't auto-match a template. Here's a preview:<br><pre style="font-size:0.75rem;max-height:200px;overflow-y:auto;background:#f8fafc;padding:0.5rem;border-radius:8px;">${escapeHtml(lines)}</pre><br>You can use this as a starting point or try the Template Library.`;
        renderMessage('ai', msg, [
            { label: '📚 Template Library', primary: true, onClick: openTemplateLibrary },
            { label: '✨ AI Generate', onClick: () => { chatInput.value = 'Create a document from this PDF content: ' + text.substring(0, 200); } }
        ]);
    }
    saveCurrentChat();
}

pdfInput.addEventListener('change', handlePDFUpload);

// ===========================
// INPUT AUTO-RESIZE
// ===========================
chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
    }
});

// ===========================
// UTILITIES
// ===========================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function showToast(msg, type = 'success') {
    const existing = document.querySelector('.toast-message');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `toast-message ${type === 'error' ? 'bg-red-600' : 'bg-slate-900'}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(10px)'; setTimeout(() => toast.remove(), 300); }, 2800);
}

// ===========================
// INIT
// ===========================
initVoice();
renderRecentChats();
if (chats.length > 0) loadChat(chats[0].id);
