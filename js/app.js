// LetterCraft AI - Main Application
let currentPlaceholders=[];
let formData={};
let currentDocType='';
let currentTheme='default';
let records=[]; // Multi-record support
let currentRecordIndex=0;
let isRecording=false;
let recognition=null;

const templateEditor=document.getElementById('templateEditor');
const formContainer=document.getElementById('formContainer');
const previewContainer=document.getElementById('previewContainer');
const placeholderCount=document.getElementById('placeholderCount');
const uiFont=document.getElementById('uiFont');
const pdfInput=document.getElementById('pdfInput');
const docTypeBadge=document.getElementById('docTypeBadge');
const themeBadge=document.getElementById('themeBadge');
const themeBadgePreview=document.getElementById('themeBadgePreview');

let debounceTimer;
templateEditor.addEventListener('input',()=>{clearTimeout(debounceTimer);debounceTimer=setTimeout(updateFromTemplate,250);});
uiFont.addEventListener('change',()=>{previewContainer.className=`preview-sheet ${uiFont.value} whitespace-pre-wrap`;renderPreview();});
pdfInput.addEventListener('change',handlePDFUpload);

document.getElementById('aiEndpoint').value=aiConfig.endpoint;
document.getElementById('aiApiKey').value=aiConfig.apiKey;
document.getElementById('aiModel').value=aiConfig.model;

// ===========================
// MOBILE TAB SWITCHING
// ===========================
function switchMobileTab(tab) {
    document.querySelectorAll('.mobile-tab').forEach(t=>t.classList.remove('active'));
    document.querySelector(`.mobile-tab[data-tab="${tab}"]`).classList.add('active');
    document.getElementById('panelEditor').classList.remove('active');
    document.getElementById('panelPreview').classList.remove('active');
    if (tab === 'editor') {
        document.getElementById('panelEditor').classList.add('active');
    } else {
        document.getElementById('panelPreview').classList.add('active');
    }
}

// ===========================
// VOICE INPUT
// ===========================
function initVoiceInput() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.log('Speech recognition not supported');
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'kn-IN'; // Default Kannada
}

function toggleVoiceInput(inputId, lang) {
    if (!recognition) {
        showToast('Voice input not supported on this browser', 'error');
        return;
    }
    if (isRecording) {
        recognition.stop();
        isRecording = false;
        updateVoiceButtonState(inputId, false);
        return;
    }
    isRecording = true;
    recognition.lang = lang === 'kannada' ? 'kn-IN' : 'en-IN';
    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        const input = document.getElementById(inputId);
        if (input) {
            input.value = transcript;
            input.dispatchEvent(new Event('input'));
        }
    };
    recognition.onend = () => {
        isRecording = false;
        updateVoiceButtonState(inputId, false);
    };
    recognition.onerror = (event) => {
        isRecording = false;
        updateVoiceButtonState(inputId, false);
        showToast('Voice error: ' + event.error, 'error');
    };
    recognition.start();
    updateVoiceButtonState(inputId, true);
}

function updateVoiceButtonState(inputId, recording) {
    const btn = document.querySelector(`button[data-voice-for="${inputId}"]`);
    if (btn) {
        btn.classList.toggle('recording', recording);
        btn.innerHTML = recording ? '🔴' : '🎙️';
        btn.title = recording ? 'Recording... Tap to stop' : 'Voice Input';
    }
}

// ===========================
// THEME
// ===========================
function toggleThemePicker() {
    document.getElementById('themeOverlay').classList.add('active');
    renderThemeGrid('themeGrid', currentTheme, selectTheme);
}
function closeThemePicker(e) {
    if (e && e.target !== document.getElementById('themeOverlay') && !e.target.classList.contains('backdrop')) return;
    document.getElementById('themeOverlay').classList.remove('active');
}
function selectTheme(key) {
    currentTheme = key;
    renderThemeGrid('themeGrid', currentTheme, selectTheme);
    applyTheme();
    themeBadge.textContent = THEMES[key]?.name || 'Default';
    if (themeBadgePreview) themeBadgePreview.textContent = THEMES[key]?.name || 'Default';
    showToast(`Theme: ${THEMES[key]?.name || 'Default'}`);
}
function applyTheme() {
    renderPreview();
}

// ===========================
// KANNADA LIBRARY
// ===========================
function openKannadaLibrary() {
    document.getElementById('kannadaOverlay').classList.add('active');
    renderKannadaLibrary();
}
function closeKannadaLibrary(e) {
    if (e && e.target !== document.getElementById('kannadaOverlay') && !e.target.classList.contains('backdrop')) return;
    document.getElementById('kannadaOverlay').classList.remove('active');
}
function renderKannadaLibrary() {
    const container = document.getElementById('kannadaLibraryContent');
    const templates = KANNADA_KNOWLEDGE.templates;
    container.innerHTML = Object.entries(templates).map(([key, t]) => `
        <div class="info-card" onclick="loadKannadaTemplate('${key}')">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:0.35rem;">
                <h4 style="font-size:0.85rem;font-weight:700;color:#1e293b;flex:1;">${t.name}</h4>
                <span class="badge-lang" style="background:#fce7f3;color:#be185d;">KN</span>
            </div>
            <div style="font-size:0.75rem;color:#64748b;font-family:monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;">${escapeHtml(t.template.substring(0, 120))}...</div>
            <div class="card-meta">
                <span class="dot" style="background:${(THEMES[t.theme]||THEMES.default).color}"></span>
                <span>${(THEMES[t.theme]||THEMES.default).name}</span>
            </div>
        </div>
    `).join('');
}
function loadKannadaTemplate(key) {
    const t = KANNADA_KNOWLEDGE.templates[key];
    if (t) {
        templateEditor.value = t.template;
        formData = {};
        currentDocType = key;
        docTypeBadge.textContent = t.name;
        docTypeBadge.classList.remove('hidden');
        selectTheme(t.theme || 'default');
        updateFromTemplate();
        closeKannadaLibrary();
        showToast(`Loaded: ${t.name}`);
    }
}

// ===========================
// TEMPLATE LIBRARY
// ===========================
function openTemplateLibrary() {
    document.getElementById('templateLibraryOverlay').classList.add('active');
    renderTemplateLibrary();
}
function closeTemplateLibrary(e) {
    if (e && e.target !== document.getElementById('templateLibraryOverlay') && !e.target.classList.contains('backdrop')) return;
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
            <div class="info-card" onclick="loadTemplate('${t.key}', '${t.lang}')">
                <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:0.35rem;">
                    <h4 style="font-size:0.85rem;font-weight:700;color:#1e293b;flex:1;">${t.name}</h4>
                    <span class="badge-lang" style="background:${t.lang==='kannada'?'#fce7f3;color:#be185d;':'#dbeafe;color:#1e40af;'}">${t.lang==='kannada'?'KN':'EN'}</span>
                </div>
                <div style="font-size:0.75rem;color:#64748b;font-family:monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;">${escapeHtml(t.template.substring(0, 120))}...</div>
                <div class="card-meta">
                    <span class="dot" style="background:${(THEMES[t.theme]||THEMES.default).color}"></span>
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
function loadTemplate(key, lang) {
    const source = lang === 'kannada' ? KANNADA_KNOWLEDGE.templates : ENGLISH_KNOWLEDGE.templates;
    const t = source[key];
    if (t) {
        templateEditor.value = t.template;
        formData = {};
        currentDocType = key;
        docTypeBadge.textContent = t.name;
        docTypeBadge.classList.remove('hidden');
        selectTheme(t.theme || 'default');
        updateFromTemplate();
        closeTemplateLibrary();
        showToast(`Loaded: ${t.name}`);
    }
}

// ===========================
// GRAMMAR HELP
// ===========================
function openGrammarHelp() {
    document.getElementById('grammarOverlay').classList.add('active');
    renderGrammarHelp();
}
function closeGrammarHelp(e) {
    if (e && e.target !== document.getElementById('grammarOverlay') && !e.target.classList.contains('backdrop')) return;
    document.getElementById('grammarOverlay').classList.remove('active');
}
function renderGrammarHelp() {
    const container = document.getElementById('grammarContent');
    const englishCorrections = ENGLISH_KNOWLEDGE.grammar.corrections;
    const englishConnectors = ENGLISH_KNOWLEDGE.grammar.connectors;
    const kannadaMistakes = KANNADA_KNOWLEDGE.grammar.mistakes;
    const kannadaTips = KANNADA_KNOWLEDGE.grammar.tips;
    container.innerHTML = `<div style="display:flex;flex-direction:column;gap:0.75rem;">
        <div class="info-card">
            <h4>English Grammar for Formal Documents</h4>
            <p style="font-size:0.75rem;color:#64748b;margin-bottom:0.5rem;">Common corrections:</p>
            <div style="display:flex;flex-direction:column;gap:0.35rem;">
                ${englishCorrections.map(c => `<div style="font-size:0.75rem;padding:0.35rem 0.5rem;background:white;border:1px solid #e2e8f0;border-radius:0.375rem;"><span style="color:#dc2626;font-weight:600;">Avoid:</span> <code style="font-family:monospace;font-size:0.7rem;background:#f1f5f9;padding:1px 4px;border-radius:3px;">${escapeHtml(c)}</code></div>`).join('')}
            </div>
        </div>
        <div class="info-card">
            <h4>English Connectors</h4>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.35rem;">
                ${Object.entries(englishConnectors).map(([cat, words]) => `<div style="font-size:0.75rem;padding:0.35rem 0.5rem;background:white;border:1px solid #e2e8f0;border-radius:0.375rem;"><strong style="text-transform:capitalize;">${cat}:</strong> ${words.join(', ')}</div>`).join('')}
            </div>
        </div>
        <div class="info-card">
            <h4>Kannada Formal Writing (ಶುದ್ಧ ಕನ್ನಡ)</h4>
            <p style="font-size:0.75rem;color:#64748b;margin-bottom:0.5rem;">Mistakes to avoid:</p>
            <div style="display:flex;flex-direction:column;gap:0.35rem;">
                ${kannadaMistakes.map(m => `<div style="font-size:0.75rem;padding:0.35rem 0.5rem;background:white;border:1px solid #e2e8f0;border-radius:0.375rem;">${escapeHtml(m)}</div>`).join('')}
            </div>
        </div>
        <div class="info-card">
            <h4>Kannada Tips</h4>
            <div style="display:flex;flex-direction:column;gap:0.35rem;">
                ${kannadaTips.map(t => `<div style="font-size:0.75rem;padding:0.35rem 0.5rem;background:white;border:1px solid #e2e8f0;border-radius:0.375rem;">${escapeHtml(t)}</div>`).join('')}
            </div>
        </div>
    </div>`;
}

// ===========================
// TEMPLATE & FORM
// ===========================
function updateFromTemplate() {
    const template = templateEditor.value;
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [...template.matchAll(regex)];
    const placeholders = [...new Set(matches.map(m => m[1].trim()))];
    currentPlaceholders = placeholders;
    placeholderCount.textContent = `${placeholders.length} field${placeholders.length !== 1 ? 's' : ''}`;
    rebuildForm();
    renderPreview();
}

function rebuildForm() {
    if (currentPlaceholders.length === 0) {
        formContainer.innerHTML = `<div class="empty-state">
            <svg class="icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            <span class="title">No fields yet</span>
            <span class="hint">Use AI Compose or add {{placeholders}} in the template</span>
        </div>`;
        return;
    }
    formContainer.innerHTML = '';
    currentPlaceholders.forEach((ph, idx) => {
        const label = ph.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
        const wrapper = document.createElement('div');
        wrapper.className = 'form-group';
        const inputId = `field-${idx}`;
        const currentValue = formData[ph] || '';
        const isMultiline = /body|content|message|address|description|reason|explanation|details|note|paragraph|justification|purpose|remarks|scope|summary|terms|condition|clause|instruction|resolution|declaration|affidavit|opening|narrative|explanation|background|context|elaboration|additional|further|supplementary|annexure|appendix|schedule|preamble|whereas|witnesseth/i.test(ph);
        const isDate = /date|day|time|dob|issued_on|expiry|from_date|to_date|start_date|end_date|join_date|relieve_date|return_date|effective_date|termination_date|notice_period|commencement|completion|deadline|due_date|appointment_date|interview_date|meeting_date|event_date|issue_date|expiry_date|renewal_date|review_date|submission_date|last_date|closing_date/i.test(ph) && !/address|birthday|daycare|today|holiday|weekday/i.test(ph);

        const isKannadaField = /kannada|kannad|karnataka|shuddha|kannadiga|malyalam|telugu|tamil|hindi/i.test(ph) || /ಪ|ಆ|ಇ|ಉ|ಎ|ಒ|ಕ|ಖ|ಗ|ಘ|ಙ|ಚ|ಛ|ಜ|ಝ|ಞ|ಟ|ಠ|ಡ|ಢ|ಣ|ತ|ಥ|ದ|ಧ|ನ|ಪ|ಫ|ಬ|ಭ|ಮ|ಯ|ರ|ಲ|ವ|ಶ|ಷ|ಸ|ಹ|ಳ|ಕ|ಱ/i.test(ph);
        const voiceLang = isKannadaField ? 'kannada' : 'english';

        let inputHTML = '';
        if (isMultiline) {
            inputHTML = `<textarea id="${inputId}" data-key="${ph}" rows="2" class="input-sm" style="resize:none;flex:1;min-height:60px;" placeholder="Enter ${label.toLowerCase()}...">${escapeHtml(currentValue)}</textarea>`;
        } else if (isDate) {
            inputHTML = `<input type="date" id="${inputId}" data-key="${ph}" value="${escapeHtml(currentValue)}" class="input-sm" style="flex:1;">`;
        } else {
            inputHTML = `<input type="text" id="${inputId}" data-key="${ph}" value="${escapeHtml(currentValue)}" class="input-sm" style="flex:1;" placeholder="Enter ${label.toLowerCase()}...">`;
        }

        const voiceBtn = ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
            ? `<button class="btn-voice" data-voice-for="${inputId}" onclick="toggleVoiceInput('${inputId}', '${voiceLang}')" title="Voice Input">🎙️</button>`
            : '';

        wrapper.innerHTML = `<label style="display:flex;align-items:center;gap:0.35rem;" for="${inputId}">
            <span class="label-dot"></span>
            <span>${label}</span>
            <span style="font-size:0.65rem;color:#94a3b8;font-family:monospace;margin-left:auto;">{{${ph}}}</span>
        </label>
        <div class="field-wrapper">
            ${inputHTML}
            ${voiceBtn}
        </div>`;

        const inputEl = wrapper.querySelector('input, textarea');
        inputEl.addEventListener('input', (e) => { formData[ph] = e.target.value; renderPreview(); });
        formContainer.appendChild(wrapper);
    });
}

function renderPreview() {
    const theme = THEMES[currentTheme] || THEMES.default;
    const header = document.getElementById('customHeader').value.trim();
    const footer = document.getElementById('customFooter').value.trim();
    let html = escapeHtml(templateEditor.value);
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
    previewContainer.innerHTML = `<div style="width:100%;height:100%;position:relative;">${watermark}${headerBar}${headerText}<div>${lines}</div>${footerText}</div>`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ===========================
// RECORDS / BATCH
// ===========================
function addNewRecord() {
    const newRecord = { ...formData, id: Date.now() };
    records.push(newRecord);
    renderRecordsList();
    showToast(`Record ${records.length} added`);
}

function renderRecordsList() {
    const container = document.getElementById('recordsList');
    if (!container) return;
    container.innerHTML = records.map((r, i) => `
        <div class="record-item">
            <div class="record-number">${i + 1}</div>
            <div class="record-name">${r.name || r.applicant_name || r.employee_name || r.patient_name || r.sender_name || r.person_name || `Record ${i + 1}`}</div>
            <div class="record-actions">
                <button onclick="editRecord(${i})" title="Edit">✏️</button>
                <button onclick="deleteRecord(${i})" title="Delete">🗑️</button>
            </div>
        </div>
    `).join('');
}

function editRecord(index) {
    formData = { ...records[index] };
    delete formData.id;
    rebuildForm();
    renderPreview();
    showToast(`Loaded record ${index + 1} for editing`);
}

function deleteRecord(index) {
    records.splice(index, 1);
    renderRecordsList();
    showToast('Record deleted');
}

async function generateAllRecordsPDF() {
    if (records.length === 0) { showToast('No records to generate', 'error'); return; }
    const originalFormData = { ...formData };
    for (let i = 0; i < records.length; i++) {
        formData = { ...records[i] };
        delete formData.id;
        renderPreview();
        await new Promise(r => setTimeout(r, 300));
        const element = document.getElementById('previewContainer');
        const opt = {
            margin: 0,
            filename: `${currentDocType || 'document'}_record_${i + 1}_${new Date().toISOString().slice(0, 10)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        await html2pdf().set(opt).from(element).save();
    }
    formData = originalFormData;
    renderPreview();
    showToast(`Generated ${records.length} PDFs!`);
}

function openRecordsModal() {
    document.getElementById('recordsOverlay').classList.add('active');
    renderRecordsList();
}
function closeRecordsModal(e) {
    if (e && e.target !== document.getElementById('recordsOverlay') && !e.target.classList.contains('backdrop')) return;
    document.getElementById('recordsOverlay').classList.remove('active');
}

// ===========================
// ACTIONS
// ===========================
function resetForm() {
    formData = {};
    rebuildForm();
    renderPreview();
    showToast('Form fields reset');
}
function clearAll() {
    templateEditor.value = '';
    formData = {};
    currentDocType = '';
    docTypeBadge.classList.add('hidden');
    updateFromTemplate();
    pdfInput.value = '';
    showToast('Everything cleared');
}
function saveTemplate() {
    localStorage.setItem('letter_template', templateEditor.value);
    showToast('Template saved');
}
function loadSavedTemplate() {
    const saved = localStorage.getItem('letter_template');
    if (saved) {
        templateEditor.value = saved;
        updateFromTemplate();
        showToast('Saved template loaded');
    } else {
        showToast('No saved template found', 'error');
    }
}
function exportPDF() {
    const element = document.getElementById('previewContainer');
    const opt = {
        margin: 0,
        filename: `${currentDocType || 'document'}_${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    const btn = document.querySelector('button[onclick="exportPDF()"]');
    const original = btn.innerHTML;
    btn.innerHTML = '...';
    btn.disabled = true;
    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        showToast('PDF downloaded!');
    }).catch(err => {
        btn.innerHTML = original;
        btn.disabled = false;
        showToast('PDF error: ' + err.message, 'error');
    });
}
function showToast(msg, type = 'success') {
    const existing = document.querySelector('.toast-message');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `toast-message ${type === 'error' ? 'bg-red-600' : 'bg-slate-900'}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// ===========================
// MODAL OVERRIDES (AI)
// ===========================
const originalOpenAI = window.openAIComposer;
window.openAIComposer = function(action) {
    if (action) setAIAction(action);
    document.getElementById('aiOverlay').classList.add('active');
    document.getElementById('aiPanel').classList.add('open');
    document.getElementById('requirementInput').focus();
};

const originalCloseAI = window.closeAIComposer;
window.closeAIComposer = function(e) {
    if (e && e.target !== document.getElementById('aiOverlay') && !e.target.classList.contains('backdrop')) return;
    document.getElementById('aiOverlay').classList.remove('active');
    document.getElementById('aiPanel').classList.remove('open');
};

// ===========================
// INIT
// ===========================
const savedTemplate = localStorage.getItem('letter_template') || '';
if (savedTemplate) {
    templateEditor.value = savedTemplate;
    updateFromTemplate();
} else {
    templateEditor.value = `Welcome! Click "AI Compose" and describe what document you need.\n\nExamples:\n• Leave application for 3 days in Kannada\n• Justification letter for late attendance\n• Experience certificate for a teacher\n• Complaint letter to municipality about roads\n• Rent agreement for house in Bangalore\n• Medical certificate for enteric fever\n• PHC official letter to Panchayat for demolition\n\nOr click 📚 Templates to browse categorized documents.\nAI will auto-generate the format, fields, and theme.\nYou can also upload any PDF and convert it to a fillable template.`;
    updateFromTemplate();
}

initVoiceInput();
