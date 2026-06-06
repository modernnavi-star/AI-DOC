// ===========================
// LetterCraft AI - Kannada Knowledge Base
// ===========================

const KANNADA_KNOWLEDGE = {
    // Formal letter structure rules in Kannada
    formalStructure: {
        date: 'ದಿನಾಂಕ: {{date}}',
        to: 'ಪ್ರತಿ,',
        from: 'ಪ್ರೇಷಕ,',
        subject: 'ವಿಷಯ: {{subject}}',
        salutation: {
            male: 'ಶ್ರೀಮಾನ್ {{name}}',
            female: 'ಶ್ರೀಮತಿ {{name}}',
            general: 'ಪ್ರತಿ ಮಾನ್ಯರು',
            government: 'ಮಾನ್ಯ ಮುಖ್ಯ ಕಾರ್ಯದರ್ಶಿ',
            headmaster: 'ಮಾನ್ಯ ಪ್ರಧಾನೋಪಾಧ್ಯಾಯರು',
            bdo: 'ಮಾನ್ಯ ತಾಲ್ಲೂಕು ಪಂಚಾಯ್ತಿ ಅಧಿಕಾರಿಗಳು',
            beo: 'ಮಾನ್ಯ ಬ್ಲಾಕ್ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳು',
            dc: 'ಮಾನ್ಯ ಜಿಲ್ಲಾಧಿಕಾರಿಗಳು',
            tahsildar: 'ಮಾನ್ಯ ತಹಸೀಲ್ದಾರ್',
            revenu: 'ಮಾನ್ಯ ಗ್ರಾಮ ಕಚೇರಿ',
            medical: 'ಮಾನ್ಯ ವೈದ್ಯಾಧಿಕಾರಿಗಳು',
            panchayat: 'ಮಾನ್ಯ ಪಂಚಾಯತ್ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು',
            president: 'ಮಾನ್ಯ ಅಧ್ಯಕ್ಷರು',
        },
        closing: {
            formal: 'ಧನ್ಯವಾದಗಳೊಂದಿಗೆ,',
            respectful: 'ಆಪ್ತರಾಗಿ,',
            official: 'ವಿಶ್ವಾಸದಿಂದ,',
            humble: 'ವಿನಮ್ರವಾಗಿ,',
            faithfully: 'ವಿಶ್ವಾಸಪಾತ್ರರಾಗಿ,'
        }
    },

    // Common Kannada phrases for formal letters
    phrases: {
        attention: 'ಈ ವಿಷಯಕ್ಕೆ ನಿಮ್ಮ ಗಮನಕ್ಕೆ ಧನ್ಯವಾದಗಳು.',
        contact: 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ದಯವಿಟ್ಟು ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಿ.',
        request: 'ದಯವಿಟ್ಟು ಈ ವಿನಂತಿಯನ್ನು ಪರಿಗಣಿಸಿ.',
        approve: 'ದಯವಿಟ್ಟು ಈ ವಿನಂತಿಯನ್ನು ಅನುಮೋದಿಸಿ.',
        grant: 'ದಯವಿಟ್ಟು ಈ ವಿನಂತಿಯನ್ನು ಮಂಜೂರು ಮಾಡಿ.',
        consideration: 'ಈ ವಿನಂತಿಯನ್ನು ದಯಮಾಡಿ ಪರಿಗಣಿಸಿ.',
        knowledge: 'ನನ್ನ ಜ್ಞಾನ ಮತ್ತು ನಂಬಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ಮೇಲಿನ ವಿವರಣೆ ಸತ್ಯವಾಗಿದೆ.',
        rules: 'ನಿಯಮಗಳು ಮತ್ತು ಕಾನೂನುಗಳ ಪ್ರಕಾರ ಅಗತ್ಯ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಲು ವಿನಂತಿಸುತ್ತೇನೆ.',
        thank: 'ನಿಮ್ಮ ಸಹಕಾರಕ್ಕೆ ಧನ್ಯವಾದಗಳು.',
        sincerely: 'ಸತ್ಯದೃಢವಾಗಿ,',
        faithfully: 'ವಿಶ್ವಾಸಪಾತ್ರರಾಗಿ,'
    },

    // Document types with Kannada templates
    templates: {
        leaveApplication: {
            name: 'Leave Application (ರಜಾ ಅರ್ಜಿ)',
            category: 'Education',
            language: 'kannada',
            theme: 'school',
            template: `ದಿನಾಂಕ: {{date}}

ಪ್ರತಿ,
{{recipient_name}}
{{recipient_designation}}
{{institution_name}}
{{institution_address}}

ವಿಷಯ: ರಜಾ ವಿನಂತಿ — {{leave_type}}

ಮಾನ್ಯ {{recipient_name}},

{{body}}

ನಾನು {{start_date}} ರಿಂದ {{end_date}} ವರೆಗೆ {{leave_days}} ದಿನಗಳ ಕಾಲ ರಜೆ ಕೋರಿದ್ದೇನೆ. ನನ್ನ ಕೆಲಸವನ್ನು {{alternate_person}} ಅವರಿಗೆ ವಹಿಸಿದ್ದೇನೆ.

ದಯವಿಟ್ಟು ಈ ವಿನಂತಿಯನ್ನು ಪರಿಗಣಿಸಿ ಮತ್ತು ಅನುಮೋದಿಸಿ.

ಧನ್ಯವಾದಗಳೊಂದಿಗೆ,
{{applicant_name}}
{{applicant_designation}}
{{department}}
ಅನುಭವಿ ಸಂಖ್ಯೆ: {{employee_id}}
ದೂರವಾಣಿ: {{phone}}`
        },

        justification: {
            name: 'Justification Letter (ಸಮರ್ಥನೆ ಪತ್ರ)',
            category: 'Employment',
            language: 'kannada',
            theme: 'government',
            template: `ದಿನಾಂಕ: {{date}}

ಪ್ರತಿ,
{{authority_name}}
{{authority_designation}}
{{department_name}}
{{organization_address}}

ವಿಷಯ: {{subject}} ಬಗ್ಗೆ ಸಮರ್ಥನೆ ಪತ್ರ

ಮಾನ್ಯ {{authority_name}},

ನಾನು {{employee_name}}, {{employee_designation}}, ಅನುಭವಿ ಸಂಖ್ಯೆ {{employee_id}}, {{department_name}} ವಿಭಾಗದಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದ್ದೇನೆ. {{subject}} ಕಾರಣಕ್ಕಾಗಿ ಈ ಪತ್ರ ಬರೆಯುತ್ತಿದ್ದೇನೆ.

{{body}}

ಮೇಲಿನ ವಿವರಣೆ ನನ್ನ ಜ್ಞಾನ ಮತ್ತು ನಂಬಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ಸತ್ಯವಾಗಿದೆ ಎಂದು ಖಾತರಿ ನೀಡುತ್ತೇನೆ. ನಿಯಮಗಳ ಪ್ರಕಾರ ಅಗತ್ಯ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಲು ವಿನಂತಿಸುತ್ತೇನೆ.

ವಿಶ್ವಾಸದಿಂದ,
{{employee_name}}
{{employee_designation}}
ಅನುಭವಿ ಸಂಖ್ಯೆ: {{employee_id}}
ವಿಭಾಗ: {{department_name}}
ದೂರವಾಣಿ: {{phone}}`
        },

        complaint: {
            name: 'Complaint Letter (ದೂರು ಪತ್ರ)',
            category: 'General',
            language: 'kannada',
            theme: 'government',
            template: `ದಿನಾಂಕ: {{date}}

ಪ್ರತಿ,
{{authority_name}}
{{authority_designation}}
{{department_name}}
{{address}}

ವಿಷಯ: {{subject}} ಬಗ್ಗೆ ದೂರು

ಮಾನ್ಯ {{authority_name}},

{{body}}

ಈ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸಲು ಕೃಪೆ ಮಾಡಿ. ನಿಮ್ಮ ಗಮನಕ್ಕೆ ಧನ್ಯವಾದಗಳು.

ವಿಶ್ವಾಸದಿಂದ,
{{complainant_name}}
{{address}}
ದೂರವಾಣಿ: {{phone}}`
        },

        noc: {
            name: 'No Objection Certificate (ಆಕ್ಷೇಪಣೆ ಇಲ್ಲದ ಪ್ರಮಾಣಪತ್ರ)',
            category: 'Employment',
            language: 'kannada',
            theme: 'corporate',
            template: `ದಿನಾಂಕ: {{date}}

ಪ್ರಮಾಣಪತ್ರ

ಇದನ್ನು ಪ್ರಮಾಣೀಕರಿಸಲಾಗಿದೆ ಎಂದು ತಿಳಿಸಲಾಗುತ್ತಿದೆ.

{{person_name}} ಅವರು ನಮ್ಮ {{institution_name}} ನಲ್ಲಿ {{designation}} ಹುದ್ದೆಯಲ್ಲಿ {{from_date}} ರಿಂದ {{to_date}} ವರೆಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸಿದ್ದಾರೆ. ಅವರು ತಮ್ಮ ಕೆಲಸದಲ್ಲಿ ಉತ್ತಮವಾಗಿ ತೊಡಗಿಸಿಕೊಂಡಿದ್ದಾರೆ.

{{reason}} ಕಾರಣಕ್ಕಾಗಿ ಅವರಿಗೆ ಯಾವುದೇ ಆಕ್ಷೇಪಣೆ ಇಲ್ಲ.

{{body}}

ಇದನ್ನು ಕಾರ್ಯಾಲಯದ ದಾಖಲೆಯ ಪ್ರಕಾರ ನೀಡಲಾಗಿದೆ.

ವಿಶ್ವಾಸದಿಂದ,
{{authority_name}}
{{authority_designation}}
{{institution_name}}
ಮುದ್ರೆ: {{seal}}`
        },

        experience: {
            name: 'Experience Certificate (ಅನುಭವ ಪ್ರಮಾಣಪತ್ರ)',
            category: 'Employment',
            language: 'kannada',
            theme: 'corporate',
            template: `ದಿನಾಂಕ: {{date}}

ಅನುಭವ ಪ್ರಮಾಣಪತ್ರ

ಇದನ್ನು ಪ್ರಮಾಣೀಕರಿಸಲಾಗಿದೆ ಎಂದು ತಿಳಿಸಲಾಗುತ್ತಿದೆ.

{{employee_name}} ಅವರು ನಮ್ಮ {{company_name}} ನಲ್ಲಿ {{designation}} ಹುದ್ದೆಯಲ್ಲಿ {{join_date}} ರಿಂದ {{relieve_date}} ವರೆಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸಿದ್ದಾರೆ.

{{body}}

ಅವರಿಗೆ ಯಶಸ್ಸು ಮತ್ತು ಸಮೃದ್ಧಿ ಬಯಸುತ್ತೇವೆ.

ವಿಶ್ವಾಸದಿಂದ,
{{authority_name}}
{{authority_designation}}
{{company_name}}
ದೂರವಾಣಿ: {{phone}}`
        },

        bonafide: {
            name: 'Bonafide Certificate (ನಿಜವಾದ ವಿದ್ಯಾರ್ಥಿ ಪ್ರಮಾಣಪತ್ರ)',
            category: 'Education',
            language: 'kannada',
            theme: 'school',
            template: `ದಿನಾಂಕ: {{date}}

ನಿಜವಾದ ವಿದ್ಯಾರ್ಥಿ ಪ್ರಮಾಣಪತ್ರ

ಇದನ್ನು ಪ್ರಮಾಣೀಕರಿಸಲಾಗಿದೆ ಎಂದು ತಿಳಿಸಲಾಗುತ್ತಿದೆ.

{{student_name}} ಅವರು {{institution_name}} ನಲ್ಲಿ {{class_name}} ತರಗತಿಯಲ್ಲಿ {{admission_year}} ರಿಂದ {{current_year}} ವರೆಗೆ ಅಧ್ಯಯನ ಮಾಡುತ್ತಿರುವ ನಿಜವಾದ ವಿದ್ಯಾರ್ಥಿ.

{{body}}

ಈ ಪ್ರಮಾಣಪತ್ರವನ್ನು {{purpose}} ಕಾರಣಕ್ಕಾಗಿ ನೀಡಲಾಗಿದೆ.

ವಿಶ್ವಾಸದಿಂದ,
{{principal_name}}
ಪ್ರಧಾನೋಪಾಧ್ಯಾಯರು
{{institution_name}}
ಮುದ್ರೆ: {{seal}}`
        },

        rentAgreement: {
            name: 'Rent Agreement (ಬಾಡಿಗಾ ಒಪ್ಪಂದ)',
            category: 'Legal & Agreements',
            language: 'kannada',
            theme: 'legal',
            template: `ಬಾಡಿಗಾ ಒಪ್ಪಂದ

ಒಪ್ಪಂದದ ದಿನಾಂಕ: {{date}}

ಈ ಒಪ್ಪಂದವು ಕೆಳಕಂಡ ಪಕ್ಷಗಳ ನಡುವೆ ಮಾಡಿಕೊಳ್ಳಲಾಗಿದೆ:

೧. ಮಾಲಿಕರು: {{landlord_name}}
   ವಿಳಾಸ: {{landlord_address}}
   ದೂರವಾಣಿ: {{landlord_phone}}

೨. ಬಾಡಿಗೆದಾರರು: {{tenant_name}}
   ವಿಳಾಸ: {{tenant_address}}
   ದೂರವಾಣಿ: {{tenant_phone}}

ವಿಷಯ: {{property_address}} ನಲ್ಲಿರುವ ಆಸ್ತಿಯ ಬಾಡಿಗೆ ಒಪ್ಪಂದ

{{body}}

ಒಪ್ಪಂದದ ನಿಯಮಗಳು:
೧. ಬಾಡಿಗಾ ಮೊತ್ತ: ₹{{rent_amount}} ಪ್ರತಿ ತಿಂಗಳು
೨. ಠೇವಣಿ: ₹{{deposit}}
೩. ಒಪ್ಪಂದದ ಅವಧಿ: {{start_date}} ರಿಂದ {{end_date}} ವರೆಗೆ
೪. ವಿದ್ಯುತ್ ಮತ್ತು ನೀರಿನ ಬಿಲ್: {{utilities}}

ಈ ಒಪ್ಪಂದವನ್ನು ಎರಡೂ ಪಕ್ಷಗಳ ಒಪ್ಪಿಗೆಯೊಂದಿಗೆ ಮಾಡಿಕೊಳ್ಳಲಾಗಿದೆ.

ಮಾಲಿಕರ ಸಹಿ: _________________         ಬಾಡಿಗೆದಾರರ ಸಹಿ: _________________

ಸಾಕ್ಷಿ ೧: {{witness1_name}}                    ಸಾಕ್ಷಿ ೨: {{witness2_name}}`
        },

        affidavit: {
            name: 'Affidavit (ಪ್ರಮಾಣ ಪತ್ರ)',
            category: 'Legal & Agreements',
            language: 'kannada',
            theme: 'legal',
            template: `ಪ್ರಮಾಣ ಪತ್ರ

ನಾನು {{deponent_name}}, {{age}} ವರ್ಷ ವಯಸ್ಸು, {{occupation}}, {{address}} ನಿವಾಸಿ, ಕೆಳಕಂಡ ಪ್ರಮಾಣ ಪತ್ರವನ್ನು ಸತ್ಯದೃಢವಾಗಿ ತಿಳಿಸುತ್ತೇನೆ:

{{body}}

ಈ ಪ್ರಮಾಣ ಪತ್ರವನ್ನು {{purpose}} ಕಾರಣಕ್ಕಾಗಿ ನೀಡಲಾಗಿದೆ.

ನನ್ನ ಜ್ಞಾನ ಮತ್ತು ನಂಬಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ಮೇಲಿನ ಎಲ್ಲಾ ವಿವರಣೆಗಳು ಸತ್ಯವಾಗಿವೆ.

ಈ ಪ್ರಮಾಣ ಪತ್ರವನ್ನು {{date}} ದಿನಾಂಕದಂದು ಮಾಡಲಾಗಿದೆ.

ಹಿಂದೂ ಕಾನೂನು ಪ್ರಕಾರ ಘೋಷಿಸಲಾಗಿದೆ.

ಹಸ್ತಾಕ್ಷರ: _________________

ಮಾಹಿತಿ: {{deponent_name}}`
        },

        requestLetter: {
            name: 'Request Letter (ವಿನಂತಿ ಪತ್ರ)',
            category: 'General',
            language: 'kannada',
            theme: 'default',
            template: `ದಿನಾಂಕ: {{date}}

ಪ್ರತಿ,
{{recipient_name}}
{{recipient_designation}}
{{organization}}
{{address}}

ವಿಷಯ: {{subject}}

ಮಾನ್ಯ {{recipient_name}},

{{body}}

ದಯವಿಟ್ಟು ಈ ವಿನಂತಿಯನ್ನು ಪರಿಗಣಿಸಿ ಮತ್ತು ಅಗತ್ಯ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ.

ನಿಮ್ಮ ಸಹಕಾರಕ್ಕೆ ಧನ್ಯವಾದಗಳು.

ವಿಶ್ವಾಸದಿಂದ,
{{sender_name}}
{{sender_designation}}
{{sender_address}}
ದೂರವಾಣಿ: {{phone}}`
        },

        notice: {
            name: 'Official Notice / Circular (ಅಧಿಕೃತ ನೋಟಿಸ್ / ಸುತ್ತೋಲೆ)',
            category: 'Official & Government',
            language: 'kannada',
            theme: 'government',
            template: `ದಿನಾಂಕ: {{date}}

ಪ್ರತಿ,
{{recipient_name}}
{{recipient_designation}}
{{department}}
{{organization}}

ವಿಷಯ: {{subject}}

ಮಾನ್ಯ {{recipient_name}},

{{body}}

ಎಲ್ಲಾ ಸಂಬಂಧಪಟ್ಟ ಸಿಬ್ಬಂದಿಗಳು ಈ ನೋಟಿಸ್ ಅನ್ನು ಗಂಭೀರವಾಗಿ ತೆಗೆದುಕೊಂಡು ತಕ್ಷಣ ಅನುಸರಣೆ ಮಾಡಬೇಕೆಂದು ಸೂಚಿಸಲಾಗಿದೆ. ಅನುಸರಣೆ ಇಲ್ಲದಿದ್ದರೆ, ನಿಯಮಗಳ ಪ್ರಕಾರ ಅಗತ್ಯ ಕ್ರಮ ಕೈಗೊಳ್ಳಲಾಗುವುದು.

ಮಾಹಿತಿಗಾಗಿ ಮತ್ತು ಅಗತ್ಯ ಕ್ರಮಕ್ಕಾಗಿ.

ವಿಶ್ವಾಸದಿಂದ,
{{sender_name}}
{{sender_designation}}
{{sender_office}}
{{sender_address}}
ದೂರವಾಣಿ: {{phone}}`
        },

        officialLetter: {
            name: 'Official Government Letter (ಸರ್ಕಾರಿ ಪತ್ರ — ಪಂಚಾಯಿತಿ / PHC)',
            category: 'Official & Government',
            language: 'kannada',
            theme: 'government',
            template: `ಕರ್ನಾಟಕ ಸರ್ಕಾರ
{{department_name}}
{{office_name}}
{{office_address}}

ಸಂಖ್ಯೆ: {{reference_number}}    ದಿನಾಂಕ: {{date}}

ಪ್ರತಿ,
{{recipient_name}}
{{recipient_designation}}
{{recipient_office}}
{{recipient_address}}

ವಿಷಯ: {{subject}}

ಉಲ್ಲೇಖ: {{reference}}

ಮಾನ್ಯ {{recipient_name}},

{{body}}

ಈ ವಿಷಯದ ಬಗ್ಗೆ ಕೃಪೆ ಮಾಡಿ ತಕ್ಷಣ ಕ್ರಮ ಕೈಗೊಳ್ಳಲು ವಿನಂತಿಸುತ್ತೇನೆ.

ವಂದನೆಗಳೊಂದಿಗೆ,
{{sender_name}}
{{sender_designation}}
{{sender_office}}
{{sender_address}}
ದೂರವಾಣಿ: {{phone}}`
        },

        medicalCertificate: {
            name: 'Medical Justification Certificate (ಆರೋಗ್ಯ ಪ್ರಮಾಣಪತ್ರ)',
            category: 'Medical & Health',
            language: 'kannada',
            theme: 'medical',
            template: `ದಿನಾಂಕ: {{date}}

TO WHOMSOEVER IT MAY CONCERN
ಆರೋಗ್ಯ ಪ್ರಮಾಣಪತ್ರ / MEDICAL JUSTIFICATION LETTER

ಇದನ್ನು ಪ್ರಮಾಣೀಕರಿಸಲಾಗಿದೆ ಎಂದು ತಿಳಿಸಲಾಗುತ್ತಿದೆ.
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

ವೈದ್ಯಾಧಿಕಾರಿಗಳು
Medical Officer: {{doctor_name}}
{{hospital_name}}
{{hospital_address}}`
        },

        medicalLabReport: {
            name: 'Medical Laboratory Report (ತಪಾಸಣೆ ವರದಿ)',
            category: 'Medical & Health',
            language: 'kannada',
            theme: 'medical',
            template: `{{hospital_name}}
{{hospital_address}}

Laboratory Report / ತಪಾಸಣೆ ವರದಿ

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

ವೈದ್ಯಾಧಿಕಾರಿಗಳು
Medical Officer: {{doctor_name}}
Signature: __________________
{{hospital_name}}`
        },

        governmentLetterhead: {
            name: 'Government Letterhead (ಸರ್ಕಾರಿ ಲೆಟರ್ ಹೆಡ್)',
            category: 'Official & Government',
            language: 'kannada',
            theme: 'government',
            template: `ಕರ್ನಾಟಕ ಸರ್ಕಾರ
{{department_name}}
{{office_name}}
{{office_address}}

ಸಂಖ್ಯೆ: {{reference_number}}    ದಿನಾಂಕ: {{date}}

ಪ್ರತಿ,
{{recipient_name}}
{{recipient_designation}}
{{recipient_office}}

ವಿಷಯ: {{subject}}

ಉಲ್ಲೇಖ: {{reference}}

{{body}}

ವಂದನೆಗಳೊಂದಿಗೆ,
{{sender_name}}
{{sender_designation}}
{{office_name}}`
        }
    },

    // Grammar rules for Kannada formal writing
    grammar: {
        // Common formal words
        formalWords: {
            'ನಮ್ಮ': 'ನಮ್ಮ', // our
            'ನನ್ನ': 'ನನ್ನ', // my
            'ದಯವಿಟ್ಟು': 'ದಯವಿಟ್ಟು', // please
            'ಧನ್ಯವಾದಗಳು': 'ಧನ್ಯವಾದಗಳು', // thanks
            'ವಿಶ್ವಾಸದಿಂದ': 'ವಿಶ್ವಾಸದಿಂದ', // faithfully
            'ಮಾನ್ಯ': 'ಮಾನ್ಯ', // honorable
            'ಪ್ರತಿ': 'ಪ್ರತಿ', // to
            'ವಿಷಯ': 'ವಿಷಯ', // subject
            'ದಿನಾಂಕ': 'ದಿನಾಂಕ', // date
            'ಸಹಿ': 'ಸಹಿ', // signature
            'ಮುದ್ರೆ': 'ಮುದ್ರೆ', // seal/stamp
        },
        // Common mistakes to avoid
        mistakes: [
            'Use formal "ನಿಮ್ಮ" (nimma) instead of informal "ನೀನು" (nīnu)',
            'Use "ವಿಶ್ವಾಸದಿಂದ" (vishvāsadinda) for official closings, not "ಆಪ್ತರಾಗಿ" for government letters',
            'Write dates in DD-MM-YYYY format: ದಿನಾಂಕ: {{date}}',
            'Use proper salutation: ಶ್ರೀಮಾನ್ for male, ಶ್ರೀಮತಿ for female, ಮಾನ್ಯ for officials',
            'Keep sentences formal. Avoid contractions and colloquialisms.',
            'Use "ಅರ್ಜಿ" for application, "ಪತ್ರ" for letter, "ಪ್ರಮಾಣಪತ್ರ" for certificate',
        ],
        // Tips for formal Kannada
        tips: [
            'Begin with ದಿನಾಂಕ followed by ಪ್ರತಿ',
            'Always end with ವಿಶ್ವಾಸದಿಂದ or ಧನ್ಯವಾದಗಳೊಂದಿಗೆ',
            'Use formal honorifics: ಮಾನ್ಯ, ಶ್ರೀಮಾನ್, ಶ್ರೀಮತಿ',
            'For government: use ಜಿಲ್ಲಾಧಿಕಾರಿ, ತಹಸೀಲ್ದಾರ್, ಬಿಇಒ appropriately',
            'Keep paragraphs short in formal letters',
            'Number lists use Kannada numerals: ೧, ೨, ೩, ೪, ೫',
        ]
    },

    // Common government officer titles in Kannada
    officerTitles: {
        'dc': 'ಜಿಲ್ಲಾಧಿಕಾರಿ',
        'tahsildar': 'ತಹಸೀಲ್ದಾರ್',
        'bdo': 'ತಾಲ್ಲೂಕು ಪಂಚಾಯ್ತಿ ಅಧಿಕಾರಿ',
        'beo': 'ಬ್ಲಾಕ್ ಶಿಕ್ಷಣಾಧಿಕಾರಿ',
        'headmaster': 'ಪ್ರಧಾನೋಪಾಧ್ಯಾಯರು',
        'principal': 'ಪ್ರಧಾನೋಪಾಧ್ಯಾಯರು',
        'ceo': 'ಮುಖ್ಯ ಕಾರ್ಯನಿರ್ವಹಣಾಧಿಕಾರಿ',
        'mla': 'ವಿಧಾನಸಭಾ ಸದಸ್ಯರು',
        'mp': 'ಲೋಕಸಭಾ ಸದಸ್ಯರು',
        'minister': 'ಮಂತ್ರಿಗಳು',
        'cm': 'ಮುಖ್ಯಮಂತ್ರಿಗಳು',
        'police': 'ಪೋಲಿಸ್ ಅಧೀಕ್ಷಕರು',
        'rto': 'ಪ್ರಾದೇಶಿಕ ಸಾರಿಗೆ ಅಧಿಕಾರಿ',
        'bbmp': 'ಬೆಂಗಳೂರು ಮಹಾನಗರ ಪಾಲಿಕೆ',
        'ward': 'ಪ್ರಾದೇಶಿಕ ಅಧಿಕಾರಿ',
        'medical-officer': 'ವೈದ್ಯಾಧಿಕಾರಿ',
        'panchayat-president': 'ಪಂಚಾಯತ್ ಅಧ್ಯಕ್ಷರು',
        'pdo': 'ಪಂಚಾಯತ್ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ',
    }
};

// Common Kannada letter opening phrases by context
const KANNADA_OPENINGS = {
    leave: 'ರಜೆ ವಿನಂತಿ ಮಾಡುತ್ತಿರುವುದಾಗಿ ಈ ಪತ್ರ ಬರೆಯುತ್ತಿದ್ದೇನೆ.',
    justification: 'ಮೇಲ್ಕಂಡ ವಿಷಯದ ಬಗ್ಗೆ ಸಮರ್ಥನೆ ನೀಡುತ್ತಿರುವುದಾಗಿ ಈ ಪತ್ರ ಬರೆಯುತ್ತಿದ್ದೇನೆ.',
    complaint: 'ಮೇಲ್ಕಂಡ ಸಮಸ್ಯೆಯ ಬಗ್ಗೆ ದೂರು ನೀಡುತ್ತಿರುವುದಾಗಿ ಈ ಪತ್ರ ಬರೆಯುತ್ತಿದ್ದೇನೆ.',
    request: 'ಮೇಲ್ಕಂಡ ವಿಷಯದ ಬಗ್ಗೆ ವಿನಂತಿಸುತ್ತಿರುವುದಾಗಿ ಈ ಪತ್ರ ಬರೆಯುತ್ತಿದ್ದೇನೆ.',
    application: 'ಮೇಲ್ಕಂಡ ಹುದ್ದೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುತ್ತಿರುವುದಾಗಿ ಈ ಪತ್ರ ಬರೆಯುತ್ತಿದ್ದೇನೆ.',
    thank: 'ನೀಡಿದ ಸಹಕಾರಕ್ಕಾಗಿ ಧನ್ಯವಾದ ತಿಳಿಸುತ್ತಿರುವುದಾಗಿ ಈ ಪತ್ರ ಬರೆಯುತ್ತಿದ್ದೇನೆ.',
    official: 'ಮೇಲ್ಕಂಡ ವಿಷಯದ ಬಗ್ಗೆ ಅಧಿಕೃತ ಪತ್ರ ಬರೆಯುತ್ತಿದ್ದೇನೆ.',
    medical: 'ವೈದ್ಯಕೀಯ ಪ್ರಮಾಣಪತ್ರ ನೀಡುತ್ತಿರುವುದಾಗಿ ಈ ದಾಖಲೆ ತಯಾರಿಸಲಾಗಿದೆ.',
    lab: 'ತಪಾಸಣೆ ವರದಿ ನೀಡುತ್ತಿರುವುದಾಗಿ ಈ ದಾಖಲೆ ತಯಾರಿಸಲಾಗಿದೆ.',
};

// Common Kannada letter body starters by document type
const KANNADA_BODY_STARTERS = {
    leave: 'ನನಗೆ {{leave_days}} ದಿನಗಳ ರಜೆ ಬೇಕಾಗಿದೆ. ನನ್ನ ರಜೆಯ ಕಾರಣ ಕೆಳಕಂಡಂತಿದೆ:',
    late: 'ನಾನು {{date}} ದಿನಾಂಕದಂದು ಕೆಲಸಕ್ಕೆ ತಡವಾಗಿ ಬಂದಿದ್ದಕ್ಕಾಗಿ ನನ್ನ ಸಮರ್ಥನೆ ಈ ಕೆಳಕಂಡಂತಿದೆ:',
    medical: 'ನನಗೆ {{medical_condition}} ರೋಗದಿಂದ ಬಳಲುತ್ತಿದ್ದು, ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆಗಾಗಿ ರಜೆ ಬೇಕಾಗಿದೆ.',
    family: 'ನನ್ನ ಕುಟುಂಬದಲ್ಲಿ {{family_event}} ಸಂಭವಿಸಿದ್ದರಿಂದ ನನಗೆ ರಜೆ ಬೇಕಾಗಿದೆ.',
    travel: 'ನನಗೆ {{destination}} ಗೆ ಪ್ರಯಾಣಿಸಬೇಕಾಗಿದ್ದರಿಂದ ನನ್ನ ರಜೆಯನ್ನು ಅನುಮೋದಿಸಬೇಕೆಂದು ವಿನಂತಿಸುತ್ತೇನೆ.',
    official: 'ಮೇಲ್ಕಂಡ ವಿಷಯದ ಬಗ್ಗೆ ಕೆಳಕಂಡ ವಿವರಣೆ ನೀಡುತ್ತಿದ್ದೇನೆ:',
    demolition: 'ಸದರಿ ಕಟ್ಟಡವು ಶಿಥಿಲವಸ್ಥೆಯಲ್ಲಿರುವುದರಿಂದ ಕೆಳಕಂಡ ಸಮಸ್ಯೆಗಳಿವೆ:',
    diagnosis: 'ರೋಗಿಯ ಲಕ್ಷಣಗಳು ಮತ್ತು ತಪಾಸಣಾ ಫಲಿತಾಂಶಗಳು ಕೆಳಕಂಡಂತಿವೆ:',
};

// Export for app use
window.KANNADA_KNOWLEDGE = KANNADA_KNOWLEDGE;
window.KANNADA_OPENINGS = KANNADA_OPENINGS;
window.KANNADA_BODY_STARTERS = KANNADA_BODY_STARTERS;
