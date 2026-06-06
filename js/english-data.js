// ===========================
// LetterCraft AI - English Knowledge Base
// ===========================

const ENGLISH_KNOWLEDGE = {
    // Formal letter structure rules
    formalStructure: {
        date: 'Date: {{date}}',
        to: 'To,',
        from: 'From,',
        subject: 'Subject: {{subject}}',
        salutation: {
            sir: 'Respected Sir,',
            madam: 'Respected Madam,',
            sirMadam: 'Respected Sir/Madam,',
            dear: 'Dear {{name}},',
            dearSir: 'Dear Sir,',
            dearMadam: 'Dear Madam,',
            toWhom: 'To Whom It May Concern,',
        },
        closing: {
            formal: 'Yours faithfully,',
            sincerely: 'Yours sincerely,',
            respectfully: 'Respectfully yours,',
            regards: 'Kind regards,',
            best: 'Best regards,',
        },
        signatureBlock: [
            '{{name}}',
            '{{designation}}',
            '{{department}}',
            '{{organization}}',
            'Contact: {{phone}}',
            'Email: {{email}}',
        ]
    },

    // Grammar rules for formal English writing
    grammar: {
        // Active vs passive voice guidance
        voice: {
            formal: 'Use passive voice for official documents: "The application was submitted" rather than "I submitted the application"',
            semi: 'Mix active and passive voice appropriately.',
        },
        // Tense rules
        tenses: {
            past: 'Use past tense for completed actions in experience certificates.',
            present: 'Use present continuous for ongoing situations in leave applications.',
            future: 'Use future tense for commitments and promises.',
        },
        // Common corrections
        corrections: [
            'Replace "I want" with "I request" or "I would like to request"',
            'Replace "Please give me" with "I kindly request" or "I seek your approval"',
            'Replace "Because" with "Due to the fact that" or "On account of" in formal docs',
            'Replace "But" with "However" or "Nevertheless"',
            'Replace "So" with "Therefore" or "Consequently"',
            'Replace "Also" with "Furthermore" or "In addition"',
            'Replace "And" at start of sentences with the preceding sentence',
            'Avoid contractions: "don\'t" → "do not", "can\'t" → "cannot", "won\'t" → "will not"',
            'Avoid "I think" → use "I believe" or "It is my understanding"',
            'Avoid "very" → use stronger adjectives',
            'Avoid "things" → use specific nouns',
            'Avoid "stuff" → use precise terms',
        ],
        // Formal connectors
        connectors: {
            addition: ['Furthermore', 'In addition', 'Moreover', 'Additionally'],
            contrast: ['However', 'Nevertheless', 'On the other hand', 'Conversely'],
            cause: ['Therefore', 'Consequently', 'As a result', 'Thus', 'Hence'],
            example: ['For instance', 'For example', 'To illustrate'],
            emphasis: ['Indeed', 'In fact', 'Certainly', 'Undoubtedly'],
            conclusion: ['In conclusion', 'To summarize', 'In summary', 'Finally'],
        },
        // Punctuation rules
        punctuation: [
            'Always use a colon after "Subject:"',
            'Use commas to separate items in a list',
            'Use semicolons to separate closely related independent clauses',
            'Do not use exclamation marks in formal letters',
            'Use full stops (periods) consistently',
            'Enclose dates in parentheses when inline',
        ],
    },

    // Document types with English templates
    templates: {
        leaveApplication: {
            name: 'Leave Application',
            category: 'Education',
            language: 'english',
            theme: 'school',
            template: `Date: {{date}}

To,
{{recipient_name}}
{{recipient_designation}}
{{institution_name}}
{{institution_address}}

Subject: Application for {{leave_type}} Leave — {{days}} Days

Respected {{recipient_name}},

I am writing to formally request leave for {{leave_days}} days, commencing from {{start_date}} and ending on {{end_date}}, due to {{reason}}.

{{body}}

During my absence, my responsibilities will be delegated to {{alternate_person}}. I have ensured that all pending tasks are completed and handed over appropriately.

I kindly request your approval for this leave application. I assure you that I will resume my duties promptly on {{return_date}} and ensure minimal disruption to the workflow.

Thank you for your understanding and consideration.

Yours sincerely,
{{applicant_name}}
{{applicant_designation}}
{{department}}
Employee ID: {{employee_id}}
Contact: {{phone}}
Email: {{email}}`
        },

        justification: {
            name: 'Justification Letter',
            category: 'Employment',
            language: 'english',
            theme: 'government',
            template: `Date: {{date}}

To,
{{authority_name}}
{{authority_designation}}
{{department_name}}
{{organization_address}}

Subject: Justification Letter Regarding {{subject}}

Respected Sir/Madam,

I, {{employee_name}}, {{employee_designation}}, holding Employee ID {{employee_id}}, currently serving in the {{department_name}} department, am writing this letter to provide my formal justification in response to {{subject}}.

{{body}}

I hereby solemnly affirm that the foregoing explanation is true and accurate to the best of my knowledge and belief. I sincerely request that my justification be duly considered and that appropriate action be taken in accordance with the established rules and regulations.

I remain available for any further clarification or documentation that may be required.

Thank you for your kind cooperation and understanding.

Yours faithfully,
{{employee_name}}
{{employee_designation}}
Employee ID: {{employee_id}}
Department: {{department_name}}
Contact: {{phone}}
Email: {{email}}`
        },

        complaint: {
            name: 'Complaint Letter',
            category: 'General',
            language: 'english',
            theme: 'government',
            template: `Date: {{date}}

To,
{{authority_name}}
{{authority_designation}}
{{department_name}}
{{address}}

Subject: Formal Complaint Regarding {{subject}}

Respected {{authority_name}},

{{body}}

I have previously attempted to resolve this matter through {{previous_action}}, but no satisfactory resolution has been achieved. I therefore kindly request your immediate intervention to address this issue at the earliest.

I trust that appropriate action will be taken promptly. I shall be happy to provide any additional information required to facilitate the resolution of this matter.

Thank you for your attention to this complaint.

Yours sincerely,
{{complainant_name}}
{{address}}
Contact: {{phone}}
Email: {{email}}`
        },

        noc: {
            name: 'No Objection Certificate (NOC)',
            category: 'Employment',
            language: 'english',
            theme: 'corporate',
            template: `Date: {{date}}

NO OBJECTION CERTIFICATE

This is to certify that {{person_name}} has been employed with {{institution_name}} as a {{designation}} from {{from_date}} to {{to_date}}.

{{body}}

During the tenure, {{person_name}} has demonstrated professional conduct and dedication to assigned responsibilities. The organization has no objection to {{person_name}} pursuing {{reason}}.

This certificate is issued upon the request of {{person_name}} for official purposes.

{{authority_name}}
{{authority_designation}}
{{institution_name}}
Official Seal: {{seal}}`
        },

        experience: {
            name: 'Experience Certificate',
            category: 'Employment',
            language: 'english',
            theme: 'corporate',
            template: `Date: {{date}}

EXPERIENCE CERTIFICATE

This is to certify that {{employee_name}} has been employed with {{company_name}} as a {{designation}} from {{join_date}} to {{relieve_date}}.

{{body}}

During the tenure, {{employee_name}} has demonstrated exemplary professional skills, dedication, and commitment to assigned responsibilities. The employee has successfully completed all assigned tasks and projects.

We wish {{employee_name}} all success in future endeavors.

For {{company_name}}

{{authority_name}}
{{authority_designation}}
Official Seal: {{seal}}`
        },

        bonafide: {
            name: 'Bonafide Certificate',
            category: 'Education',
            language: 'english',
            theme: 'school',
            template: `Date: {{date}}

BONAFIDE CERTIFICATE

This is to certify that {{student_name}}, bearing Roll Number {{roll_number}}, is a bonafide student of {{institution_name}}.

{{student_name}} is currently enrolled in {{class_name}} for the academic year {{academic_year}}.

{{body}}

This certificate is issued upon the request of {{student_name}} for the purpose of {{purpose}}.

{{principal_name}}
Principal
{{institution_name}}
Official Seal: {{seal}}`
        },

        rentAgreement: {
            name: 'Rent Agreement',
            category: 'Legal & Agreements',
            language: 'english',
            theme: 'legal',
            template: `RENT AGREEMENT

Date: {{date}}

This Rent Agreement is made and entered into between:

1. LANDLORD:
   Name: {{landlord_name}}
   Address: {{landlord_address}}
   Phone: {{landlord_phone}}

2. TENANT:
   Name: {{tenant_name}}
   Address: {{tenant_address}}
   Phone: {{tenant_phone}}

Property Address: {{property_address}}

{{body}}

Terms and Conditions:
1. Monthly Rent: ₹{{rent_amount}} (Rupees {{rent_amount_words}} Only)
2. Security Deposit: ₹{{deposit}} (Rupees {{deposit_words}} Only)
3. Agreement Period: {{start_date}} to {{end_date}}
4. Utilities: {{utilities}}
5. Maintenance: {{maintenance}}

Both parties agree to abide by the terms stated above.

Landlord's Signature: _________________
Date: {{date}}

Tenant's Signature: _________________
Date: {{date}}

Witness 1: {{witness1_name}}                    Witness 2: {{witness2_name}}`
        },

        affidavit: {
            name: 'Affidavit',
            category: 'Legal & Agreements',
            language: 'english',
            theme: 'legal',
            template: `AFFIDAVIT

I, {{deponent_name}}, aged {{age}} years, by occupation {{occupation}}, residing at {{address}}, do hereby solemnly affirm and state as follows:

{{body}}

That the contents of this affidavit are true and correct to the best of my knowledge and belief, and nothing material has been concealed therefrom.

That this affidavit is made for the purpose of {{purpose}}.

That I am aware that making a false statement in this affidavit is punishable under the provisions of the Indian Penal Code.

Signature: _________________

DEPONENT
{{deponent_name}}

Date: {{date}}

Place: {{place}}`
        },

        requestLetter: {
            name: 'Request Letter',
            category: 'General',
            language: 'english',
            theme: 'default',
            template: `Date: {{date}}

To,
{{recipient_name}}
{{recipient_designation}}
{{organization}}
{{address}}

Subject: {{subject}}

Respected {{recipient_name}},

{{body}}

I kindly request that the above-mentioned matter be considered at the earliest and necessary action be taken accordingly.

I shall remain grateful for your favorable consideration of this request.

Thank you for your time and cooperation.

Yours sincerely,
{{sender_name}}
{{sender_designation}}
{{sender_address}}
Contact: {{phone}}
Email: {{email}}`
        },

        officialLetter: {
            name: 'Official Government Letter (PHC / Panchayat)',
            category: 'Official & Government',
            language: 'english',
            theme: 'government',
            template: `Date: {{date}}

To,
{{recipient_name}}
{{recipient_designation}}
{{recipient_office}}
{{recipient_address}}

Subject: {{subject}}

Reference: {{reference}}

Respected {{recipient_name}},

{{body}}

Thank you for your kind cooperation and immediate action in this matter.

Yours faithfully,
{{sender_name}}
{{sender_designation}}
{{sender_office}}
{{sender_address}}
Contact: {{phone}}`
        },

        medicalCertificate: {
            name: 'Medical Justification Certificate',
            category: 'Medical & Health',
            language: 'english',
            theme: 'medical',
            template: `Date: {{date}}

TO WHOMSOEVER IT MAY CONCERN
MEDICAL JUSTIFICATION LETTER

This is to certify that Mr/Mrs/Ms {{patient_name}}, aged about {{age}} years, was admitted to our hospital on {{admission_date}} and discharged on {{discharge_date}}.

Provisional Diagnosis: {{diagnosis}}

{{patient_name}} was suffering from {{symptoms}} occurring randomly for {{duration}} days. Consequently, she underwent treatment from {{admission_date}} to {{discharge_date}}.

Associated simple symptoms included {{additional_symptoms}}.

General ward charges: {{ward_charges}}
Lab investigation charges: {{lab_charges}}
Treatment charges: {{treatment_charges}}
Consultation charges: {{consultation_charges}}

No fees have been charged to the patient.

MEDICAL OFFICER SIGN WITH SEAL

Medical Officer: {{doctor_name}}
{{hospital_name}}
{{hospital_address}}`
        },

        medicalLabReport: {
            name: 'Medical Laboratory Report',
            category: 'Medical & Health',
            language: 'english',
            theme: 'medical',
            template: `{{hospital_name}}
{{hospital_address}}

Laboratory Report / INVESTIGATIONS

Patient Name: {{patient_name}}    Age / Sex: {{age_sex}}    Date: {{date}}

INVESTIGATION                        RESULT          NORMAL VALUE
FBS                                  {{fbs}}           70-110 mg/dl
PPBS                                 {{ppbs}}          80-150 mg/dl
Haemoglobin %                        {{haemoglobin}}    M: 14-18, F: 12-16 gm%
Bs for MP                            {{bs_mp}}         Negative
NS1 Rapid Test for Dengue            {{ns1}}           Negative
Blood for Widal
    S.typhi O                        {{typhi_o}}
    S.typhi H                        {{typhi_h}}
    S.Paratyphi AH                   {{paratyphi_ah}}
    S.Paratyphi BH                   {{paratyphi_bh}}
Blood Grouping & Rh Typing           {{blood_group}}
Urine Sugar                          {{urine_sugar}}    Absent
Urine Albumin                        {{urine_albumin}}  Negative
HBsAg                                {{hbsag}}          Negative
HCV                                  {{hcv}}            Negative
Syphilis                             {{syphilis}}       Negative
Sputum for AFB                       {{sputum_afb}}
Urine Pregnancy Test                 {{urine_pregnancy}}
Urine Routine (Microscopic)
    Pus Cells                        {{pus_cells}}       2-3 /hpf
    Epithelial Cells                 {{epithelial_cells}} 1-2 /hpf
    Crystals                         {{crystals}}
    RBC                              {{rbc}}

Medical Officer: {{doctor_name}}
Signature: __________________
{{hospital_name}}`
        },

        governmentLetterhead: {
            name: 'Government Letterhead (Memo Format)',
            category: 'Official & Government',
            language: 'english',
            theme: 'government',
            template: `{{government_name}}
{{department_name}}
{{office_name}}
{{office_address}}

Reference No: {{reference_number}}    Date: {{date}}

To,
{{recipient_name}}
{{recipient_designation}}
{{recipient_office}}

Subject: {{subject}}

Reference: {{reference}}

{{body}}

Yours faithfully,
{{sender_name}}
{{sender_designation}}
{{office_name}}`
        }
    },

    // Grammar check rules
    grammarRules: [
        {
            pattern: /\bi want\b/gi,
            suggestion: 'I would like to request',
            severity: 'high',
            reason: 'Too informal for official documents'
        },
        {
            pattern: /\bplease give me\b/gi,
            suggestion: 'I kindly request',
            severity: 'high',
            reason: 'Too direct and informal'
        },
        {
            pattern: /\bbecause\b/gi,
            suggestion: 'Due to the fact that / On account of',
            severity: 'medium',
            reason: 'Too casual for formal writing'
        },
        {
            pattern: /\bbut\b/gi,
            suggestion: 'However / Nevertheless',
            severity: 'medium',
            reason: 'Use formal connectors'
        },
        {
            pattern: /\bso\b/gi,
            suggestion: 'Therefore / Consequently',
            severity: 'medium',
            reason: 'Too informal'
        },
        {
            pattern: /\balso\b/gi,
            suggestion: 'Furthermore / In addition',
            severity: 'low',
            reason: 'Can be more formal'
        },
        {
            pattern: /\bcan\'t\b/gi,
            suggestion: 'cannot',
            severity: 'high',
            reason: 'Avoid contractions in formal documents'
        },
        {
            pattern: /\bwon\'t\b/gi,
            suggestion: 'will not',
            severity: 'high',
            reason: 'Avoid contractions'
        },
        {
            pattern: /\bdon\'t\b/gi,
            suggestion: 'do not',
            severity: 'high',
            reason: 'Avoid contractions'
        },
        {
            pattern: /\bi think\b/gi,
            suggestion: 'I believe / It is my understanding',
            severity: 'medium',
            reason: 'More formal alternatives'
        },
        {
            pattern: /\bvery good\b/gi,
            suggestion: 'excellent / outstanding',
            severity: 'low',
            reason: 'Use stronger adjectives'
        },
        {
            pattern: /\bthings\b/gi,
            suggestion: 'items / matters / subjects',
            severity: 'low',
            reason: 'Be specific'
        },
        {
            pattern: /\bstuff\b/gi,
            suggestion: 'materials / equipment / documents',
            severity: 'medium',
            reason: 'Too informal'
        },
        {
            pattern: /\b!\b/g,
            suggestion: 'use a period instead',
            severity: 'high',
            reason: 'No exclamation marks in formal letters'
        },
    ],

    // Document type detection keywords
    docTypeKeywords: {
        leave: ['leave', 'vacation', 'holiday', 'absence', 'off', 'sick', 'medical', 'casual', 'earned', 'maternity', 'paternity', 'রজা', 'otp', 'छुट्टी'],
        justification: ['justification', 'explanation', 'late', 'delay', 'absent', 'reason', 'clarification', 'defense', 'defence', 'excuse', 'missing', 'samardhane', 'स्पष्टीकरण'],
        complaint: ['complaint', 'grievance', 'problem', 'issue', 'defect', 'repair', 'damage', 'duru', 'शिकायत'],
        noc: ['noc', 'no objection', 'objection', 'clearance', 'release', 'no objection certificate', 'release letter'],
        experience: ['experience', 'service certificate', 'work certificate', 'employment certificate', 'relieving', 'experience letter', 'anubhava'],
        bonafide: ['bonafide', 'student', 'study certificate', 'genuine', 'enrollment', 'admission', 'nidhavada', 'bonafide certificate'],
        rent: ['rent', 'rental', 'lease', 'tenancy', 'landlord', 'tenant', 'agreement', 'badike', 'bhaada', 'भाड़ा'],
        affidavit: ['affidavit', 'declaration', 'sworn', 'deponent', 'oath', 'affirmation', 'pramana patra', 'हलफनामा'],
        request: ['request', 'permission', 'approval', 'sanction', 'approval letter', 'permit', 'vinanti', 'अनुरोध'],
        application: ['application', 'apply', 'request form', 'job application', 'admission', 'college application'],
        resignation: ['resign', 'resignation', 'quit', 'notice', 'relieving', 'separation', 'ರಾಜಿನಾಮೆ'],
        offer: ['offer', 'appointment', 'joining', 'employment offer', 'job offer', 'hiring'],
        officialLetter: ['official letter', 'government letter', 'panchayat', 'demolition', 'department letter', 'memo', 'official correspondence', 'secretariat', 'order', 'circular', 'phc', 'primary health centre', 'bdo', 'tahsildar', 'dc office', 'gram panchayat', 'health department'],
        medicalCertificate: ['medical certificate', 'justification letter', 'admission', 'discharge', 'diagnosis', 'hospital', 'enteric', 'fever', 'patient', 'medical justification', 'health certificate', 'doctor', 'provisional diagnosis', 'medical', 'suffering', 'symptoms', 'ward charges', 'treatment'],
        medicalLabReport: ['lab report', 'laboratory', 'investigation', 'blood test', 'diagnostic', 'fbs', 'ppbs', 'haemoglobin', 'widal', 'dengue', 'urine routine', 'sputum', 'afb', 'blood group', 'urine sugar', 'pus cells', 'epithelial', 'ns1', 'hb', 'hcv', 'hbsag'],
        governmentLetterhead: ['letterhead', 'memo head', 'reference number', 'header', 'official header', 'reference no'],
    }
};

// Grammar check function
function checkGrammar(text) {
    const issues = [];
    ENGLISH_KNOWLEDGE.grammarRules.forEach(rule => {
        const matches = text.match(rule.pattern);
        if (matches) {
            issues.push({
                ...rule,
                count: matches.length,
                matches: matches
            });
        }
    });
    return issues;
}

function detectDocumentType(text) {
    const lower = text.toLowerCase();
    const scores = {};
    for (const [type, keywords] of Object.entries(ENGLISH_KNOWLEDGE.docTypeKeywords)) {
        scores[type] = keywords.reduce((acc, kw) => acc + (lower.includes(kw) ? 1 : 0), 0);
    }
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted[0][1] > 0 ? sorted[0][0] : 'request';
}

window.ENGLISH_KNOWLEDGE = ENGLISH_KNOWLEDGE;
window.checkGrammar = checkGrammar;
window.detectDocumentType = detectDocumentType;
