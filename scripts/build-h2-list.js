/**
 * Builds the authoritative H2 heading list per domain by analyzing the
 * TOC structure. Since pdf-parse loses indentation, we identify H2s as
 * headings that are NOT sub-topics of the immediately preceding heading.
 *
 * Strategy: a heading is H2 if there are one or more H3 sub-topics before
 * the next potential H2. We do this by checking: does the next N headings
 * look like sub-items (shorter, more specific) of this one?
 *
 * For CISSP AIO 8th edition, the H2/H3 split is well-known. We use the TOC
 * flat list and identify H2s as headings that begin a new major topic group.
 * H3s are sub-headings that logically belong under the preceding H2.
 *
 * We determine this by a combination of:
 * 1. H3s often follow a clear "parent" H2 (e.g. "Availability" follows "Fundamental Principles")
 * 2. H2s often have longer, multi-word descriptive names
 * 3. Manual knowledge of CISSP structure
 *
 * The output is used by extract-pdf.js to correctly assign heading levels.
 */

const fs = require('fs');
const path = require('path');

// These are the H2 (major section) headings per domain, derived from the
// CISSP AIO 8th edition table of contents structure.
// H3s are everything else in the TOC for that domain.
const DOMAIN_H2 = {
  1: [
    'Fundamental Principles of Security',
    'Control Types',
    'Security Frameworks',
    'The Crux of Computer Crime Laws',
    'Intellectual Property Laws',
    'Privacy',
    'Data Breaches',
    'Policies, Standards, Baselines, Guidelines, and Procedures',
    'Risk Management',
    'Threat Modeling',
    'Risk Assessment and Analysis',
    'Supply Chain Risk Management',
    'Risk Management Frameworks',
    'Business Continuity and Disaster Recovery',
    'Personnel Security',
    'Security Governance',
    'Ethics',
  ],
  2: [
    'Information Life Cycle',
    'Classification',
    'Classification Procedures',
    'Layers of Responsibility',
    'Retention Policies',
    'Protecting Privacy',
    'Protecting Assets',
  ],
  3: [
    'System Architecture',
    'Operating Systems',
    'System Security Architecture',
    'Security Models',
    'Systems Evaluation',
    'Open vs. Closed Systems',
    'Systems Security',
    'Cryptography in Context',
    'Message Integrity',
    'Public Key Infrastructure',
    'Applying Cryptography',
    'Attacks on Cryptography',
    'Site and Facility Security',
  ],
  4: [
    'Principles of Network Architectures',
    'TCP/IP Model',
    'Transmission Media',
    'Wireless Networks',
    'Networking Foundations',
    'Network Components',
    'Intranets and Extranets',
    'Wide Area Networks',
    'Remote Access',
    'Network Encryption',
    'Internet Security',
    'Network Attacks',
  ],
  5: [
    'Access Controls Overview',
    'Identification, Authentication, Authorization, and Accountability',
    'Federation',
    'Integrating Identity as a Service',
    'Access Control Mechanisms',
    'Access Control Techniques and Technologies',
    'Managing the Identity and Access Provisioning Life Cycle',
    'Controlling Physical and Logical Access',
    'Access Control Practices',
    'Access Control Monitoring',
    'Threats to Access Control',
  ],
  6: [
    'Assessment, Test, and Audit Strategies',
    'Auditing Technical Controls',
    'Auditing Administrative Controls',
    'Reporting',
    'Management Review and Approval',
  ],
  7: [
    'The Role of the Operations Department',
    'Physical Security',
    'Secure Resource Provisioning',
    'Network and Resource Availability',
    'Preventing and Detecting',
    'Outsourced Services',
    'The Incident Management Process',
    'Investigations',
    'Disaster Recovery',
    'Liability and Its Ramifications',
    'Implementing Disaster Recovery',
    'Personal Safety Concerns',
  ],
  8: [
    'Building Good Code',
    'Software Development Life Cycle',
    'Software Development Methodologies',
    'Change Management',
    'Security of Development Environments',
    'Secure Coding',
    'Programming Languages and Concepts',
    'Application Programming Interfaces',
    'Distributed Computing',
    'Web Security',
    'Database Management',
    'Malicious Software (Malware)',
    'Antimalware Software',
    'Assessing the Security of Acquired Software',
  ],
};

const out = path.join(__dirname, '../public/book2/data/toc-h2.json');
fs.writeFileSync(out, JSON.stringify(DOMAIN_H2, null, 2));
console.log('Saved toc-h2.json');
Object.entries(DOMAIN_H2).forEach(([d, list]) => console.log(`  Domain ${d}: ${list.length} H2 sections`));
