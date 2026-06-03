export type Topic = {
  id: string
  title: string
  content: Section[]
}

export type Section = {
  heading?: string
  body?: string
  list?: string[]
  table?: { headers: string[]; rows: string[][] }
  note?: string
  tip?: string
  warning?: string
}

export type Domain = {
  id: string
  number: number
  title: string
  summary: string
  topics: Topic[]
}

export const domains: Domain[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // DOMAIN 1
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'd1',
    number: 1,
    title: 'Security and Risk Management',
    summary: 'Covers ethics, security concepts, governance, legal compliance, investigation types, security policy, business continuity, personnel security, risk management, threat modeling, supply chain risk, and security awareness.',
    topics: [
      {
        id: 'd1t1',
        title: '1.1 Professional Ethics',
        content: [
          {
            heading: 'ISC² Code of Professional Ethics',
            body: 'Ethics are moral principles guiding individuals in determining right from wrong. All CISSP candidates must understand and integrate these ethics. ISC² members who intentionally violate the Code may face revocation of certification.',
            note: 'A code of ethics is designed to provide general direction rather than address specific technical situations. Technical skills build systems — ethics keep them worthy of trust.',
          },
          {
            heading: 'Code of Ethics Canons',
            body: 'Four mandatory canons:',
            list: [
              'Protect society, the common good, necessary public trust and confidence, and the infrastructure.',
              'Act honorably, honestly, justly, responsibly, and legally.',
              'Provide diligent and competent service to principals.',
              'Advance and protect the profession.',
            ],
          },
          {
            heading: 'Ethics Complaint Process',
            list: [
              'Filing — anyone can file a written, specific complaint; anonymous complaints generally not accepted.',
              'Initial Review — Ethics Committee checks jurisdiction and merit; frivolous complaints dismissed.',
              'Notification — respondent is notified and given a chance to respond.',
              'Investigation and Hearing — evidence gathered; formal hearing may be convened.',
              'Decision and Sanctions — private reprimand, public reprimand, suspension, or revocation.',
              'Appeal — member may appeal within a specified timeframe.',
            ],
          },
          {
            heading: 'Ten Commandments of Computer Ethics (Computer Ethics Institute)',
            list: [
              'Thou shalt not use a computer to harm other people.',
              'Thou shalt not interfere with other people\'s computer work.',
              'Thou shalt not snoop around in other people\'s computer files.',
              'Thou shalt not use a computer to steal.',
              'Thou shalt not use a computer to bear false witness.',
              'Thou shalt not copy or use proprietary software for which you have not paid.',
              'Thou shalt not use other people\'s computer resources without authorization or proper compensation.',
              'Thou shalt not appropriate other people\'s intellectual output.',
              'Thou shalt think about the social consequences of the program you are writing or the system you are designing.',
              'Thou shalt always use a computer in ways that ensure consideration and respect for your fellow humans.',
            ],
          },
          {
            heading: 'IEEE Code of Ethics',
            body: 'Key IEEE commitments: uphold highest standards of integrity; hold paramount safety, health, and welfare of the public; avoid real or perceived conflicts of interest; seek and offer honest criticism; treat all persons fairly; avoid harassment or discrimination; support colleagues in following the code.',
          },
          {
            heading: 'RFC 1087 — Ethics and the Internet',
            body: 'RFC 1087 defines unethical Internet behavior. The following are considered unethical:',
            list: [
              'Unauthorized access to network resources.',
              'Disruption of the intended use of the network.',
              'Waste of resources such as bandwidth or processing power.',
              'Destruction or alteration of information.',
              'Compromise of privacy of users.',
            ],
          },
        ],
      },
      {
        id: 'd1t2',
        title: '1.2 Security Concepts',
        content: [
          {
            heading: 'Five Pillars of Information Security',
            list: [
              'Confidentiality — information accessible only to authorized users. Techniques: encryption, access controls, authentication.',
              'Integrity — accuracy, reliability, and completeness of data over its lifecycle. Techniques: checksums, digital signatures, data validation.',
              'Availability — information accessible to authorized users when needed. Techniques: redundancy, fault tolerance, DR planning.',
              'Authenticity — verifies identity of users and source of data. Techniques: passwords, biometrics, digital certificates.',
              'Nonrepudiation — individuals cannot deny their actions. Techniques: digital signatures, audit trails, transaction logs.',
            ],
            warning: 'Information Security is often confused solely with Confidentiality. All five pillars are equally important.',
          },
          {
            heading: 'CIA Triad vs DAD Threats',
            table: {
              headers: ['CIA Pillar', 'Definition', 'DAD Threat', 'Threat Definition'],
              rows: [
                ['Confidentiality', 'Access only for authorized users', 'Disclosure', 'Unauthorized access to information'],
                ['Integrity', 'Data remains accurate and unaltered', 'Alteration', 'Unauthorized modification of data'],
                ['Availability', 'Resources accessible when needed', 'Destruction', 'Unauthorized deletion or damage'],
              ],
            },
          },
          {
            heading: 'Parkerian Hexad',
            body: 'Donn Parker extended CIA with three additional attributes:',
            list: [
              'Possession/Control — ownership and control of data, preventing unauthorized possession.',
              'Authenticity — verifying data, communications, and identities are genuine.',
              'Utility — ensuring data is useful and in a functional format.',
            ],
          },
          {
            heading: 'IAAA Framework',
            list: [
              'Identification — claiming an identity (username, ID number).',
              'Authentication — verifying the claimed identity (passwords, biometrics, tokens).',
              'Authorization — determining access rights and permissions.',
              'Accountability — tracking and recording activities; auditing and logging.',
            ],
            note: 'Auditing is retrospective (periodic log review). Monitoring is real-time observation.',
          },
          {
            heading: 'Identity Assurance Levels (IAL)',
            list: [
              'IAL1 — self-assertion only; no external verification.',
              'IAL2 — evidence-based verification (e.g., scanned government documents).',
              'IAL3 — in-person validation with photo ID and government database cross-check.',
            ],
          },
          {
            heading: 'Authenticator Assurance Levels (AAL)',
            list: [
              'AAL1 — moderate confidence; single factor (password).',
              'AAL2 — elevated confidence; at least two factors.',
              'AAL3 — highest confidence; two factors plus a cryptographic key and physical device.',
            ],
          },
          {
            heading: 'Defense in Depth',
            body: 'Multiple layers of security controls so if one fails, others compensate. Three key layers:',
            list: [
              'Physical Controls — locks, access badges, surveillance.',
              'Technical Controls — firewalls, intrusion detection, encryption.',
              'Administrative Controls — policies, procedures, training.',
            ],
          },
          {
            heading: 'Abstraction and Data Hiding',
            body: 'Abstraction simplifies complex systems by exposing only necessary details. Data hiding conceals specific data to limit access.',
            warning: 'Security through obscurity (relying on hidden design) is discouraged — it fails against determined adversaries using reverse engineering.',
          },
        ],
      },
      {
        id: 'd1t3',
        title: '1.3 Security Governance',
        content: [
          {
            heading: 'GRC — Governance, Risk, Compliance',
            body: 'Security Governance is the framework of practices and processes through which an organization plans, supports, evaluates, and manages its security efforts.',
            list: [
              'Governance — ensuring activities support business goals.',
              'Risk — identification and management of risks.',
              'Compliance — adherence to regulations and policies.',
            ],
          },
          {
            heading: 'Planning Hierarchy',
            list: [
              'Strategic Plan — 5-year blueprint aligning security with organizational mission.',
              'Tactical Plan — 1-year mid-term execution strategy.',
              'Operational Plan — monthly/quarterly short-term actions.',
            ],
          },
          {
            heading: 'Scoping vs Tailoring',
            list: [
              'Scoping — selects applicable baseline controls and eliminates redundant ones.',
              'Tailoring — modifies controls via parameter adjustments or compensating controls to fit organizational context.',
            ],
          },
          {
            heading: 'Organizational Processes',
            list: [
              'Acquisition — one company purchases another\'s assets.',
              'Merger — two companies combine to create a new entity.',
              'Divestiture — selling off business units or product lines.',
            ],
          },
          {
            heading: 'Security Control Frameworks',
            table: {
              headers: ['Framework', 'Focus', 'Scope'],
              rows: [
                ['ISO 27001', 'ISMS with 94 controls across 4 categories', 'Global, any industry'],
                ['NIST SP 800-53', 'Detailed security/privacy controls', 'US federal agencies'],
                ['NIST RMF', '7-step risk management process', 'Federal agencies and adaptable'],
                ['COBIT', 'IT control objectives for audit', 'Audit and assurance work'],
                ['ITIL', 'IT service management best practices', 'Service delivery alignment'],
                ['HIPAA', 'Healthcare information protection', 'Healthcare industry'],
                ['SOX', 'Financial accuracy certification', 'Public companies'],
                ['FedRAMP', 'Cloud service security assessment', 'US federal cloud adoption'],
                ['PCI DSS', 'Payment card transaction security', 'Finance and retail'],
              ],
            },
          },
          {
            heading: 'Organizational Roles',
            table: {
              headers: ['Role', 'Responsibility'],
              rows: [
                ['Senior Manager/Owner', 'Ultimate accountability for organizational security'],
                ['Security Professional', 'Implements security policies and solutions'],
                ['Custodian', 'Executes prescribed protection measures'],
                ['User', 'Follows procedures within defined parameters'],
                ['Auditor', 'Verifies implementation and produces compliance reports'],
                ['Data Owner', 'Classifies data and defines access rights'],
                ['Data Custodian', 'Maintains and protects data through controls'],
                ['System Owner', 'Ensures security throughout system lifecycle'],
              ],
            },
          },
          {
            heading: 'Due Care vs Due Diligence',
            table: {
              headers: ['Aspect', 'Due Care', 'Due Diligence'],
              rows: [
                ['Timing', 'Immediate rectification', 'Comprehensive investigation'],
                ['Principle', 'Prudent man rule', 'Experienced man rule'],
                ['Focus', 'Action (Do Control)', 'Knowledge (Do Detect)'],
                ['Timeframe', 'Short-term', 'Long-term'],
              ],
            },
            note: 'Due diligence establishes the security framework; due care implements and maintains it.',
          },
          {
            heading: 'SOC Reports',
            list: [
              'SOC 1 — financial reporting controls.',
              'SOC 2 Type I — security design effectiveness at a point in time.',
              'SOC 2 Type II — operational effectiveness over 3–12 months.',
              'SOC 3 — public summary of SOC 2 findings.',
            ],
          },
        ],
      },
      {
        id: 'd1t4',
        title: '1.4 Legal, Regulatory, and Compliance',
        content: [
          {
            heading: 'Cybercrimes and Data Breaches',
            body: 'Key distinctions: Data Loss (accidental), Data Leak (unintentional exposure), Data Breach (unauthorized access). Major US federal laws include the Computer Fraud and Abuse Act (CFAA), FISMA, and the National Information Infrastructure Protection Act.',
          },
          {
            heading: 'Intellectual Property Types',
            list: [
              'Copyright (©) — protects original creative works; automatic upon creation.',
              'Trademark (™/®) — protects brand identifiers (names, logos, slogans).',
              'Patent — protects inventions for a limited period (20 years).',
              'Trade Secret — confidential business information providing competitive advantage.',
            ],
          },
          {
            heading: 'Software Licensing Types',
            list: [
              'Contractual — signed agreement between parties.',
              'Shrink-wrap — terms accepted by opening product packaging.',
              'Click-through — terms accepted by clicking "I Agree" online.',
              'Perpetual — one-time purchase; use forever.',
              'Subscription — periodic payment for continued access.',
              'Open-Source — source code freely available under specific terms.',
              'EULA (End User License Agreement) — defines permitted use.',
              'Concurrent Use — limited number of simultaneous users.',
            ],
          },
          {
            heading: 'Import/Export Controls',
            list: [
              'Wassenaar Arrangement — multilateral export control regime covering dual-use goods.',
              'ITAR (International Traffic in Arms Regulations) — controls export of defense-related items.',
              'EAR (Export Administration Regulations) — controls export of commercial items with potential military use.',
              'Deemed Export — sharing controlled technology with a foreign national within the US counts as an export.',
            ],
          },
          {
            heading: 'Privacy Frameworks',
            list: [
              'GDPR (EU) — General Data Protection Regulation; governs processing of EU residents\' personal data.',
              'CCPA (California) — California Consumer Privacy Act; rights for California residents.',
              'PIPL (China) — Personal Information Protection Law.',
              'POPIA (South Africa) — Protection of Personal Information Act.',
            ],
          },
          {
            heading: 'Key Privacy Concepts',
            list: [
              'Data Controller — determines how and why personal data is processed.',
              'Data Processor — processes data on behalf of the controller.',
              'Data Subject — the individual whose personal data is processed.',
              'DPO (Data Protection Officer) — oversees GDPR compliance.',
              'PIA (Privacy Impact Assessment) — evaluates privacy risks of new projects.',
              'Data Sovereignty — data subject to the laws of the country where it is stored.',
              'Data Residency — physical location of data storage.',
              'Data Localization — laws mandating data stored within a specific country.',
            ],
          },
        ],
      },
      {
        id: 'd1t5',
        title: '1.5 Investigation Types',
        content: [
          {
            heading: 'Five Investigation Types',
            list: [
              'Administrative/Operational — internal; enforces organizational policies; handled by security teams and HR.',
              'Criminal — law enforcement-led; "beyond a reasonable doubt" burden of proof.',
              'Civil — dispute resolution seeking monetary damages; "preponderance of evidence" standard.',
              'Industry Standards — determines adherence to best practices (e.g., logging protocols).',
              'Regulatory — government bodies (SEC, FINRA) investigate suspected violations; organizations must comply fully.',
            ],
            warning: 'Never initiate an administrative investigation if criminal activity is suspected. Improper handling can render evidence inadmissible in court.',
          },
        ],
      },
      {
        id: 'd1t6',
        title: '1.6 Security Policy, Standards, Procedures, and Guidelines',
        content: [
          {
            heading: 'Policy Hierarchy',
            table: {
              headers: ['Document', 'Purpose', 'Compliance'],
              rows: [
                ['Policy', 'Defines scope of security and strategic objectives', 'Mandatory — high-level direction'],
                ['Standards', 'Prescriptive requirements for hardware, software, controls', 'Mandatory — specific requirements'],
                ['Procedures (SOPs)', 'Step-by-step instructions for implementing security mechanisms', 'Mandatory — strict compliance'],
                ['Baselines', 'Minimum security level all systems must meet', 'Mandatory — deviations require approval'],
                ['Guidelines', 'Recommendations and best practices', 'Advisory — flexible'],
              ],
            },
            note: 'Policies should avoid excessive detail to maintain adaptability. Standards and procedures demand compliance; guidelines foster flexibility.',
          },
        ],
      },
      {
        id: 'd1t7',
        title: '1.7 Business Continuity Planning',
        content: [
          {
            heading: 'BCP vs Disaster Recovery',
            table: {
              headers: ['Aspect', 'BCP', 'DRP'],
              rows: [
                ['Focus', 'Maintains business operations during disruption', 'Restores IT systems and infrastructure'],
                ['Scope', 'Business processes and human resources', 'IT systems, backups, recovery sites'],
                ['Level', 'Strategic', 'Tactical / Technical'],
              ],
            },
          },
          {
            heading: 'Three Primary BCP Facets',
            list: [
              'Resilience — system capability to withstand disruptions.',
              'Recovery — swift restoration of unavailable services.',
              'Contingency — last-resort procedures when resilience and recovery fail.',
            ],
          },
          {
            heading: 'Four-Step BCP Process',
            list: [
              'Project Scope and Planning — gain management support; form cross-functional team.',
              'Business Impact Analysis (BIA) — identify critical systems; establish RTO, RPO, MTD metrics.',
              'Continuity Planning — develop recovery strategies and Continuity of Operations Plan (COOP).',
              'Approval and Implementation — secure executive endorsement; provide personnel training.',
            ],
          },
          {
            heading: 'Key Recovery Metrics',
            list: [
              'RTO (Recovery Time Objective) — maximum acceptable downtime before restoration must occur.',
              'RPO (Recovery Point Objective) — maximum acceptable amount of data loss measured in time.',
              'MTD (Maximum Tolerable Downtime) — longest a business can survive without a critical system.',
              'WRT (Work Recovery Time) — time needed for testing before systems go live after recovery.',
            ],
          },
        ],
      },
      {
        id: 'd1t8',
        title: '1.8 Personnel Security',
        content: [
          {
            heading: 'Pre-Employment Screening',
            body: 'Organizations need comprehensive policies covering job descriptions, background checks, reference verification, and security clearances. Screening intensity should match role sensitivity and risk level while respecting legal boundaries.',
          },
          {
            heading: 'Key Personnel Security Controls',
            list: [
              'Separation of Duties — prevents single-person control over critical processes.',
              'Job Rotation — moves personnel through roles; helps detect fraud.',
              'Least Privilege — minimum necessary access for each role.',
              'Need-to-Know — access restricted to information required for job function.',
              'Mandatory Vacations — forced absences help detect long-running misconduct.',
            ],
          },
          {
            heading: 'Identity Lifecycle (Join-Move-Leave)',
            list: [
              'Join (Onboarding) — new employee integrates; accounts provisioned based on role.',
              'Move (Transfer) — role changes require access privilege updates.',
              'Leave (Offboarding) — system access and physical access removed immediately upon departure.',
            ],
          },
          {
            heading: 'UBA and UEBA',
            body: 'User Behavior Analytics (UBA) and User and Entity Behavior Analytics (UEBA) monitor patterns to detect insider threats and data exfiltration attempts.',
          },
          {
            heading: 'Third-Party Management',
            body: 'When outsourcing, establish controls for: access, document exchange, maintenance standards, on-site assessments, policy reviews, and Service Level Agreements. Vendor Management Systems automate oversight and compliance tracking.',
          },
        ],
      },
      {
        id: 'd1t9',
        title: '1.9 Risk Management',
        content: [
          {
            heading: 'Core Risk Concepts',
            list: [
              'Asset — things you care about and need to protect (data, systems, brand reputation).',
              'Vulnerability — a weakness (outdated software, poor passwords) that could be exploited.',
              'Threat / Threat Agent — potential danger (hacker, natural event, insider) and the actor behind it.',
              'Attack Vector — the route used (phishing, open ports) to launch the attack.',
              'Risk — chance that a threat will exploit a vulnerability and harm assets.',
              'Control / Safeguard — what you do to reduce vulnerabilities or block threats.',
              'Exposure — how much of your asset is open to threats given vulnerabilities.',
              'Attack Event — when theory becomes real harm.',
            ],
          },
          {
            heading: 'Risk Treatment Options',
            list: [
              'Mitigate — implement controls to reduce likelihood or impact.',
              'Transfer — shift risk to a third party (insurance, outsourcing).',
              'Accept — acknowledge and document risk without action (residual risk).',
              'Avoid — eliminate the activity that causes the risk.',
            ],
          },
          {
            heading: 'Risk Assessment Methods',
            list: [
              'Quantitative — assigns monetary values; calculates ALE (Annualized Loss Expectancy) = SLE × ARO.',
              'Qualitative — uses subjective rankings (High/Medium/Low) based on experience and judgment.',
              'SLE (Single Loss Expectancy) = Asset Value × Exposure Factor.',
              'ARO (Annualized Rate of Occurrence) — expected frequency of threat per year.',
              'ALE = SLE × ARO — expected annual loss from a threat.',
            ],
          },
        ],
      },
      {
        id: 'd1t10',
        title: '1.10 Threat Modeling',
        content: [
          {
            heading: 'What is Threat Modeling?',
            body: 'A security process focused on identifying, categorizing, and analyzing potential threats. Can occur proactively during design phases or reactively post-deployment. Assesses harm potential, occurrence probability, and mitigation strategies.',
          },
          {
            heading: 'Three Primary Approaches',
            list: [
              'Asset-Based — identifies valuable assets and threats targeting them.',
              'Attacker-Based — analyzes adversary motivations and capabilities.',
              'Software-Based — examines architectural vulnerabilities.',
            ],
            note: 'The most robust security posture combines all three perspectives.',
          },
          {
            heading: 'Common Threat Models',
            list: [
              'STRIDE (Microsoft) — Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.',
              'PASTA — 7-stage risk-centric methodology aligning threat modeling with business objectives.',
              'VAST — Agile-integrated threat modeling for continuous development environments.',
              'DREAD — quantitative rating: Damage, Reproducibility, Exploitability, Affected users, Discoverability.',
              'TRIKE — open-source risk-based approach using stakeholder requirements and data flow diagrams.',
            ],
          },
          {
            heading: 'Attack Surface Reduction Components',
            list: [
              'Trust Boundaries — separate differing trust levels (e.g., internet to internal database).',
              'Dataflow Paths — track data movement between components.',
              'Input Points — external interaction locations like login forms and APIs.',
              'Privileged Operations — require elevated permissions; attract attackers targeting system configuration.',
            ],
          },
        ],
      },
      {
        id: 'd1t11',
        title: '1.11 Supply Chain Risk Management',
        content: [
          {
            heading: 'SCRM Focus Areas',
            body: 'SCRM ensures the reliability, trustworthiness, and integrity of all vendors or links in the supply chain. Three primary risk areas:',
            list: [
              'Hardware — physical components from manufacturers and distributors.',
              'Software — third-party code, libraries, and SaaS platforms.',
              'Services — managed services, cloud providers, outsourced functions.',
            ],
          },
          {
            heading: 'Technical Security Features',
            list: [
              'Silicon Root of Trust — hardware-based security anchor that verifies integrity of firmware and software during boot process; resists tampering better than software alternatives.',
              'Physically Unclonable Functions (PUFs) — hardware features leveraging manufacturing variances to create unique, non-reproducible identifiers for device authentication.',
              'Software Bill of Materials (SBOM) — inventory of all components (libraries, frameworks, modules) in a piece of software; enables vulnerability tracking across dependencies.',
            ],
          },
          {
            heading: 'Third-Party Assessment Methods',
            list: [
              'On-site assessments examining physical security and operations.',
              'Document reviews evaluating architecture, policies, and procedures.',
              'Independent third-party auditor engagement.',
            ],
            note: 'Trust alone is insufficient — verification at each supply chain stage is essential since even trusted sources can become compromised.',
          },
        ],
      },
      {
        id: 'd1t12',
        title: '1.12 Security Awareness and Training',
        content: [
          {
            heading: 'Three-Stage Learning Framework',
            list: [
              'Awareness — establish a security mindset before formal training; help employees understand why security matters and recognize threats.',
              'Training — task-specific instruction on job-related security practices and policy compliance; mandatory for all new employees; conducted at least annually.',
              'Education — deeper, role- or certification-based learning for career advancement and technical expertise.',
            ],
          },
          {
            heading: 'Training Methods',
            list: [
              'Phishing simulations, tailgating exercises, and social engineering scenarios.',
              'Security champions who advocate for security within teams.',
              'Gamification with interactive elements, scoring, and rewards.',
              'Microtraining (under 5 minutes) for ongoing reinforcement.',
              'Videos, e-learning modules, and internal social media platforms.',
            ],
          },
          {
            heading: 'Measuring Effectiveness',
            table: {
              headers: ['Focus Area', 'Method'],
              rows: [
                ['Knowledge Gain', 'Pre- and post-training quizzes'],
                ['Behavior Change', 'Phishing simulation metrics (click rate, report rate)'],
                ['Engagement & Reach', 'Completion and participation rates'],
                ['Feedback & Perception', 'Surveys and feedback forms'],
                ['Incident & Compliance Trends', 'Security incident metrics over time'],
              ],
            },
            tip: 'The final target of awareness, training, and education is a change in user behaviour.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DOMAIN 2
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'd2',
    number: 2,
    title: 'Asset Security',
    summary: 'Covers data classification, asset handling, provisioning, lifecycle management, retention, and compliance requirements.',
    topics: [
      {
        id: 'd2t1',
        title: '2.1 Identify and Classify Information and Assets',
        content: [
          {
            heading: 'Commercial Classification Levels',
            list: [
              'Confidential — most sensitive (trade secrets, strategic plans).',
              'Private — requires extra protection (employee/medical records).',
              'Sensitive — special handling needed (financial reports, marketing strategies).',
              'Public — generally available information.',
            ],
          },
          {
            heading: 'Military/Government Classification Levels',
            list: [
              'Top Secret — exceptionally grave damage to national security.',
              'Secret — serious damage to national security.',
              'Confidential — potential damage to national security.',
              'Unclassified — does not meet classified criteria.',
              'Controlled Unclassified Information (CUI) — sensitive but unclassified.',
            ],
          },
          {
            heading: 'Asset Classification',
            body: 'Asset classification identifies and assigns value to physical and digital systems based on sensitivity and criticality. Uses tiered approaches (Tier 0 mission-critical through Tier 2 general use). Asset classification should match the highest classification level of data it processes.',
          },
        ],
      },
      {
        id: 'd2t2',
        title: '2.2 Information and Asset Handling',
        content: [
          {
            heading: 'Labeling vs Marking',
            list: [
              'Labeling — assigns classifications automatically through system metadata; stronger system-based enforcement.',
              'Marking — places human-readable indicators on assets; manual process.',
            ],
          },
          {
            heading: 'Data Loss Prevention (DLP)',
            body: 'DLP systems detect and block unauthorized data exfiltration:',
            list: [
              'Network-based DLP — scans outgoing network data.',
              'Endpoint-based DLP — monitors specific devices.',
            ],
          },
          {
            heading: 'Data Sanitization Methods',
            list: [
              'Clearing — overwriting for internal reuse of non-sensitive data.',
              'Purging — multi-pass overwrites or degaussing magnetic media.',
              'Destruction — physical obliteration (crushing, shredding, incinerating) for classified data leaving organizational control.',
            ],
            note: 'NIST SP 800-88 Rev. 1 provides recommended sanitization guidance.',
          },
          {
            heading: 'Data Declassification',
            body: 'Lowers an asset\'s sensitivity level when protection needs decrease. Requires documentation and approvals before reclassification.',
          },
        ],
      },
      {
        id: 'd2t3',
        title: '2.3 Provision Information and Assets Securely',
        content: [
          {
            heading: 'Information and Asset Ownership',
            body: 'Data owners bear ultimate responsibility for classification and security controls. Key data owner responsibilities:',
            list: [
              'Maintaining current information asset inventories.',
              'Classifying assets by sensitivity levels.',
              'Implementing safeguards for confidentiality, integrity, and availability.',
              'Authorizing and revoking access based on business need.',
            ],
          },
          {
            heading: 'Asset Inventory Tracking Methods',
            table: {
              headers: ['Method', 'Capacity', 'Line-of-Sight', 'Cost'],
              rows: [
                ['Barcodes', '20–25 characters', 'Required', 'Very low'],
                ['QR Codes', '4,000–7,000 characters', 'Required', 'Low'],
                ['RFID', 'Moderate–High', 'Not required; reads from distance', 'Higher'],
              ],
            },
            note: 'Complete asset inventory is the top priority in the CIS 18 Controls list.',
          },
          {
            heading: 'Configuration Management',
            body: 'Documents and controls system configurations using baselines and security checklists. The Security Content Automation Protocol (SCAP) automates configuration verification against established baselines.',
          },
        ],
      },
      {
        id: 'd2t4',
        title: '2.4 Manage Data Lifecycle',
        content: [
          {
            heading: 'Data Lifecycle Stages',
            list: [
              'Create/Collect — establish security from inception.',
              'Store — commit data to repositories.',
              'Use — process data actively.',
              'Share — make information accessible.',
              'Archive — transition to long-term storage.',
              'Destroy — eliminate data physically or digitally.',
            ],
          },
          {
            heading: 'Data Minimization',
            body: 'Collect only necessary data to reduce breach risk. Organizations should reject "keeping data just in case" approaches.',
          },
          {
            heading: 'Data Retention',
            body: 'Retention policies must answer: what data to keep, how long, and where. Regulation examples:',
            list: [
              'HIPAA — requires minimum 6 years retention for health records.',
              'FISMA — mandates 3 years for federal agencies.',
            ],
          },
          {
            heading: 'Data Remanence',
            body: 'Residual data persists after deletion. Mitigation techniques: overwriting, degaussing, encryption, or physical destruction.',
          },
          {
            heading: 'Key Data Management Roles',
            table: {
              headers: ['Role', 'Responsibility'],
              rows: [
                ['Data Owner', 'Ultimate responsibility for classification and security controls'],
                ['Data Controller', 'Determines how personal data is processed'],
                ['Data Custodian', 'Technical implementation — storage and backups'],
                ['Data Processor', 'Manages data operations under controller direction'],
                ['Data User', 'Consumes data for specific purposes'],
                ['Data Subject', 'Individual whose personal information is processed'],
              ],
            },
          },
        ],
      },
      {
        id: 'd2t5',
        title: '2.5 Asset Retention',
        content: [
          {
            heading: 'Retention Policy Components',
            list: [
              'Purpose and scope — objectives and covered systems.',
              'Legal alignment — ensuring regulatory compliance.',
              'Data categorization — specific retention schedules by data type.',
              'Secure handling procedures — management and destruction.',
              'Litigation exception processes — legal holds and e-discovery.',
              'Clear roles and responsibilities for staff.',
              'Employee training on policy adherence.',
              'Regular reviews adapting to evolving business needs.',
            ],
            warning: 'Indiscriminate data retention creates liability. Extended storage increases breach risks and costs. Hardware beyond end-of-support (EOS) leaves organizations vulnerable to unpatched exploits.',
          },
        ],
      },
      {
        id: 'd2t6',
        title: '2.6 Data Security Controls and Compliance',
        content: [
          {
            heading: 'Data States and Protection',
            table: {
              headers: ['State', 'Description', 'Protection Methods'],
              rows: [
                ['At Rest', 'Stored data on persistent media', 'Full-disk encryption, file-level encryption, access controls'],
                ['In Transit', 'Data moving across networks', 'TLS/HTTPS, IPSec, VPNs'],
                ['In Use', 'Actively processed data', 'Secure enclaves, late-moment decryption, homomorphic encryption'],
              ],
            },
          },
          {
            heading: 'NIST Cybersecurity Framework Five Functions',
            list: [
              'Identify — asset management, risk assessment, governance.',
              'Protect — access control, awareness training, data security.',
              'Detect — anomaly detection, continuous monitoring.',
              'Respond — response planning, communications, improvements.',
              'Recover — recovery planning, improvements, communications.',
            ],
          },
          {
            heading: 'Data Protection Technologies',
            list: [
              'DLP (Data Loss Prevention) — detects and blocks unauthorized data exfiltration.',
              'DRM (Digital Rights Management) — controls usage and distribution of digital content.',
              'IRM (Information Rights Management) — enterprise-focused rights management for documents.',
              'CASB (Cloud Access Security Broker) — enforces security policies between cloud users and cloud services.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DOMAIN 3
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'd3',
    number: 3,
    title: 'Security Architecture and Engineering',
    summary: 'Covers secure design principles, security models, control selection, cryptography, cryptanalytic attacks, site and facility design, and system lifecycle management.',
    topics: [
      {
        id: 'd3t1',
        title: '3.1 Secure Design Principles',
        content: [
          {
            heading: 'Design-Phase Priority',
            body: 'Security must be considered at every stage: design, development, testing, implementation, maintenance, and decommissioning. The most critical stage is the design phase — retrofitting security later is costly and ineffective.',
            tip: 'Security professionals must align security architecture with business goals, ensuring compliance with governance initiatives in an efficient and cost-effective manner.',
          },
          {
            heading: 'ISO/IEC 19249 — Five Architectural Principles',
            list: [
              'Domain Separation — grouping components with similar security attributes; communication between domains strictly controlled.',
              'Layering — structuring a system into levels, each enforcing its own security policies.',
              'Encapsulation — restricting direct access; all interactions through defined interfaces.',
              'Redundancy — duplicating critical components for availability and integrity (RAID, HA clusters).',
              'Virtualization — abstracting physical resources for security, scalability, and efficiency.',
            ],
          },
          {
            heading: 'Core Secure Design Principles',
            list: [
              'Least Privilege — grant only the minimum access necessary.',
              'Separation of Duties — split critical tasks to prevent fraud.',
              'Defense in Depth — multiple security layers.',
              'Fail Secure / Fail Safe — systems default to a secure state on failure.',
              'Economy of Mechanism — keep designs simple to reduce attack surface.',
              'Complete Mediation — every access to every resource must be checked.',
              'Open Design — security should not depend on secrecy of the design (Kerckhoffs\'s Principle).',
              'Psychological Acceptability — security mechanisms should be easy for users to use correctly.',
            ],
          },
        ],
      },
      {
        id: 'd3t2',
        title: '3.2 Security Models',
        content: [
          {
            heading: 'Trusted Computing Base (TCB)',
            body: 'The TCB comprises the operating system kernel, security mechanisms, and hardware components that enforce security. Compromise of the TCB puts the entire system at risk.',
          },
          {
            heading: 'Bell-LaPadula Model (Confidentiality)',
            list: [
              'Simple Security Property (No Read Up) — a subject cannot read data at a higher classification.',
              'Star Property (No Write Down) — a subject cannot write data to a lower classification.',
              'Strong Star Property — a subject can only read and write at their own classification level.',
            ],
          },
          {
            heading: 'Biba Model (Integrity)',
            body: 'Focuses on integrity — the opposite of Bell-LaPadula:',
            list: [
              'Simple Integrity Axiom (No Read Down) — a subject cannot read data at a lower integrity level.',
              'Star Integrity Axiom (No Write Up) — a subject cannot write data to a higher integrity level.',
            ],
          },
          {
            heading: 'Other Security Models',
            list: [
              'Clark-Wilson — enforces integrity via well-formed transactions and separation of duties.',
              'Brewer-Nash (Chinese Wall) — prevents conflicts of interest through dynamic access control.',
              'Take-Grant — manages permission delegation through take and grant operations.',
              'Harrison-Ruzzo-Ullman (HRU) — extends Graham-Denning with security decidability analysis.',
              'Lattice-Based — implements multi-level security using hierarchical classifications.',
            ],
          },
        ],
      },
      {
        id: 'd3t3',
        title: '3.3 Select Controls Based on System Security Requirements',
        content: [
          {
            heading: 'Common Criteria (CC) — ISO/IEC 15408',
            body: 'Current international standard unifying previous approaches through:',
            list: [
              'Protection Profiles (PPs) — implementation-independent security requirements.',
              'Security Targets (STs) — vendor-specific security claims.',
              'Security Functional Requirements (SFRs) — specific security functions.',
              'Security Assurance Requirements (SARs) — measures to assure correct implementation.',
              'Evaluation Assurance Levels (EAL1–EAL7) — increasing levels of assurance.',
            ],
          },
          {
            heading: 'Historical Evaluation Standards',
            list: [
              'TCSEC (Orange Book) — 1980s DoD standard; focused on confidentiality; fixed classes D, C1, C2, B1, B2, B3, A1.',
              'ITSEC — European improvement on TCSEC; evaluates CIA together; separates functionality from assurance.',
            ],
          },
          {
            heading: 'Continuous Improvement — Deming Cycle (PDCA)',
            list: [
              'Plan — identify risks and select controls.',
              'Do — implement controls.',
              'Check — monitor effectiveness.',
              'Act — adjust based on findings.',
            ],
          },
        ],
      },
      {
        id: 'd3t5',
        title: '3.5 Assess and Mitigate Security Architecture Vulnerabilities',
        content: [
          {
            heading: 'Core Vulnerability Types',
            list: [
              'SPOFs (Single Points of Failure) — components whose failure causes system-wide outages; mitigated with redundancy and failover.',
              'Race Conditions — multiple processes try to access the same resource simultaneously; mitigated with atomic operations and locking.',
              'Emanations — unintentional signals from electronic devices; mitigated with Faraday cages and encryption.',
            ],
          },
          {
            heading: 'System-Specific Security Considerations',
            list: [
              'Client-Based — attackers can manipulate commands before encryption; server-side validation required.',
              'Server-Based — implement IAM, input validation, rate-limiting, and least privilege.',
              'Database Systems — disable optional features, separate data from system files, use TLS, implement RBAC.',
              'Cryptographic Systems — watch for outdated algorithms (DES, MD5, SHA-1), poor random number generation, and key management issues.',
              'OT/ICS/SCADA — legacy systems lack security-by-design; use network segmentation.',
              'Cloud (SaaS/IaaS/PaaS) — each model distributes responsibility differently; understand shared responsibility model.',
              'IoT — weak authentication, unencrypted transmission, long lifecycles without updates; segment networks.',
              'Microservices — multiple attack surfaces; use API security, centralized authentication, TLS between services.',
              'Containers — risk of container escape; use trusted registries and regular vulnerability scans.',
            ],
          },
        ],
      },
      {
        id: 'd3t6',
        title: '3.6 Cryptographic Solutions',
        content: [
          {
            heading: 'Four Primary Cryptographic Objectives',
            list: [
              'Confidentiality — makes information accessible only to authorized individuals.',
              'Integrity — guarantees data hasn\'t been altered using hash functions (SHA-256).',
              'Authenticity — confirms identities via digital signatures and PKI.',
              'Non-repudiation — prevents senders from denying message transmission.',
            ],
          },
          {
            heading: 'Symmetric vs Asymmetric Encryption',
            table: {
              headers: ['Feature', 'Symmetric', 'Asymmetric'],
              rows: [
                ['Keys', 'Same key for encryption and decryption', 'Public key encrypts; private key decrypts'],
                ['Speed', 'Fast and efficient', 'Slower; computationally expensive'],
                ['Key Problem', 'Requires secure key exchange', 'Solves key distribution problem'],
                ['Examples', 'AES, 3DES, ChaCha20', 'RSA, ECC, Diffie-Hellman'],
                ['Use', 'Bulk data encryption', 'Key exchange, digital signatures'],
              ],
            },
            note: 'Many systems use asymmetric encryption to exchange symmetric keys — combining the benefits of both (hybrid approach).',
          },
          {
            heading: 'Block Cipher Modes of Operation',
            table: {
              headers: ['Mode', 'Description'],
              rows: [
                ['ECB (Electronic Codebook)', 'Simplest but insecure; identical plaintext blocks produce identical ciphertext'],
                ['CBC (Cipher Block Chaining)', 'Uses initialization vector; improves security over ECB'],
                ['CTR (Counter Mode)', 'Converts block cipher to stream cipher; enables parallel encryption'],
                ['GCM (Galois/Counter Mode)', 'Provides encryption and authentication; used in TLS and VPNs'],
              ],
            },
          },
          {
            heading: 'Hashing Algorithms',
            list: [
              'MD5 — 128-bit; deprecated due to collision vulnerabilities.',
              'SHA-1 — 160-bit; deprecated.',
              'SHA-256 / SHA-3 — current standards.',
              'BLAKE2 — modern high-performance hash function.',
            ],
          },
          {
            heading: 'PKI — Public Key Infrastructure',
            list: [
              'Certificate Authority (CA) — trusted entity that issues digital certificates.',
              'Registration Authority (RA) — verifies identity before certificate issuance.',
              'Certificate Revocation List (CRL) — list of revoked certificates maintained by CA.',
              'OCSP (Online Certificate Status Protocol) — real-time certificate status check; faster than CRL.',
            ],
          },
          {
            heading: 'Key Management Practices',
            list: [
              'Generate keys using cryptographically secure random number generators (CSPRNG).',
              'Store keys in Hardware Security Modules (HSMs), secure enclaves, or KMS.',
              'Never hardcode keys in software or store in plaintext files.',
              'Rotate keys periodically; change keys immediately if compromise suspected.',
              'Separation of Duties — no single individual has complete control over keys.',
              'Dual Control — requires two authorized individuals for critical key operations.',
              'Secure destruction — overwrite multiple times or physically destroy storage.',
            ],
          },
          {
            heading: 'Digital Signatures Process',
            list: [
              '1. Sender generates a hash from the message.',
              '2. Hash encrypted using sender\'s private key — this is the digital signature.',
              '3. Recipient decrypts signature using sender\'s public key.',
              '4. Recipient generates new hash from received message and compares.',
              '5. Match = message unaltered and sender authenticated.',
            ],
          },
          {
            heading: 'Perfect Forward Secrecy (PFS)',
            body: 'Ensures that even if a session key is compromised, it cannot be used to decrypt past communications. TLS uses ephemeral session keys refreshed regularly.',
          },
        ],
      },
      {
        id: 'd3t7',
        title: '3.7 Cryptanalytic Attacks',
        content: [
          {
            heading: '13 Main Attack Types',
            list: [
              'Brute Force — systematically checks all possible keys until correct one found.',
              'Ciphertext Only — attacker has encrypted data but lacks plaintext; uses statistical analysis.',
              'Known Plaintext — attacker has both plaintext and corresponding ciphertext pairs.',
              'Frequency Analysis — exploits language patterns by analyzing letter occurrence rates; effective against substitution ciphers.',
              'Chosen Ciphertext — attacker selects specific ciphertexts for decryption and analyzes results.',
              'Implementation Attacks — targets flaws in how algorithms are deployed (bugs, poor randomness).',
              'Side-Channel — exploits physical characteristics (power consumption, electromagnetic radiation, timing).',
              'Fault Injection — deliberately introduces hardware or environmental errors.',
              'Timing — analyzes operation duration variations to extract key information.',
              'Man-in-the-Middle (MITM) — intercepts communications and manipulates cryptographic keys.',
              'Pass the Hash — uses captured password hashes directly for authentication.',
              'Kerberos Exploitation — attacks Kerberos protocol through ticket theft or forgery.',
              'Ransomware — uses strong encryption to lock files; demands payment for decryption keys.',
            ],
          },
        ],
      },
      {
        id: 'd3t8',
        title: '3.8 Site and Facility Design Principles',
        content: [
          {
            heading: 'Security Facility Plan Components',
            list: [
              'Risk Assessment — identify potential threats and vulnerabilities specific to the site.',
              'Access Control — define access points and barriers to limit unauthorized entry.',
              'Emergency Response Plans — evacuation plans, fire safety protocols, communication systems.',
              'Security Personnel — staffing needs for physical security including guards and surveillance.',
            ],
            note: 'Standards like ISO 27001, NIST 800-53, HIPAA, and PCI DSS require these facility-level protections.',
          },
          {
            heading: 'Site Selection Factors',
            table: {
              headers: ['Factor', 'Description'],
              rows: [
                ['Proximity to Threats', 'Minimize exposure to crime, natural disasters, or industrial hazards'],
                ['Accessibility', 'Accessible for personnel while restricting unauthorized access'],
                ['Environmental Considerations', 'Assess flooding, earthquake, or other disaster risks'],
                ['Community & Regulatory', 'Consider local laws, regulations, and community relations'],
              ],
            },
          },
          {
            heading: 'CPTED — Crime Prevention Through Environmental Design',
            body: 'Designing places to naturally reduce crime. Two generations:',
            list: [
              'First Generation — focuses on physical environment (lighting, fences, visibility).',
              'Second Generation — focuses on social environment (community trust, culture, connections).',
            ],
          },
          {
            heading: 'CPTED Principles',
            table: {
              headers: ['Principle', 'Description'],
              rows: [
                ['Access Control', 'Use barriers (fences, gates, badges) to keep out intruders'],
                ['Natural Surveillance', 'Make areas visible with lighting and open sight lines'],
                ['Image & Milieu', 'Keep area clean and cared for to discourage crime'],
                ['Territorial Control', 'Mark what belongs to whom with signs, paths, or landscaping'],
              ],
            },
          },
        ],
      },
      {
        id: 'd3t9',
        title: '3.9 Facility Security Controls',
        content: [
          {
            heading: 'Data Center / Server Room Security',
            list: [
              'Multi-layered access control (biometric, badge, surveillance, alarms).',
              'Redundant cooling systems and environmental monitoring.',
              'UPS backup power and generators.',
              'Fire suppression systems (gas-based for electronics — Halon alternatives).',
              'Raised floors for cable management and airflow.',
            ],
          },
          {
            heading: 'Fire Prevention, Detection, and Suppression',
            list: [
              'Detection — smoke detectors, heat sensors, flame detectors.',
              'Suppression — water sprinklers (Class A fires), CO2 (Class B/C fires), Halon alternatives (FM-200) for electronics.',
              'Prevention — fire-resistant materials, hazard management, regular inspections.',
            ],
          },
          {
            heading: 'Power Redundancy',
            list: [
              'UPS (Uninterruptible Power Supply) — immediate backup: Standby, Line-Interactive, Online.',
              'Diesel Generators — for extended outages.',
              'Redundant power grids — dual utility feeds from separate substations.',
              'Regular load testing to verify generator reliability.',
            ],
          },
          {
            heading: 'HVAC and Environmental Controls',
            list: [
              'Temperature and humidity monitoring with automated alerts.',
              'Secure access to HVAC systems.',
              'Regular maintenance programs.',
              'Protection against natural disasters and system failures.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DOMAIN 4
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'd4',
    number: 4,
    title: 'Communication and Network Security',
    summary: 'Covers secure network architecture, network components, secure communication channels, and defending data in motion.',
    topics: [
      {
        id: 'd4t1',
        title: '4.1 Secure Network Architecture',
        content: [
          {
            heading: 'OSI Model — 7 Layers',
            table: {
              headers: ['Layer', 'Name', 'Key Protocols / Functions'],
              rows: [
                ['7', 'Application', 'HTTP, HTTPS, FTP, SMTP, DNS'],
                ['6', 'Presentation', 'SSL/TLS, encryption, data formatting'],
                ['5', 'Session', 'Session establishment, NetBIOS, RPC'],
                ['4', 'Transport', 'TCP, UDP — segmentation and flow control'],
                ['3', 'Network', 'IP, ICMP, routing'],
                ['2', 'Data Link', 'Ethernet, MAC addresses, switches'],
                ['1', 'Physical', 'Cables, hubs, physical signals'],
              ],
            },
          },
          {
            heading: 'Network Segmentation',
            list: [
              'DMZ (Demilitarized Zone) — buffer network between internet and internal network; hosts public-facing services.',
              'VLANs (Virtual LANs) — logical segmentation within same physical infrastructure.',
              'Air Gaps — physical isolation from untrusted networks.',
              'Microsegmentation — fine-grained policies per workload or application.',
            ],
          },
          {
            heading: 'Firewall Types',
            list: [
              'Packet Filtering — checks source/destination IP and port; stateless.',
              'Stateful Inspection — tracks connection state; more intelligent.',
              'Application Layer / Proxy Firewall — inspects content at Layer 7.',
              'Next-Generation Firewall (NGFW) — deep packet inspection, IDS/IPS, application awareness.',
            ],
          },
        ],
      },
      {
        id: 'd4t2',
        title: '4.2 Secure Network Components',
        content: [
          {
            heading: 'Network Devices by OSI Layer',
            list: [
              'Repeaters (Layer 1) — amplify signals; extend cable reach.',
              'Hubs (Layer 1) — broadcast to all ports; no intelligence.',
              'Bridges (Layer 2) — connect network segments; learn MAC addresses.',
              'Switches (Layer 2) — forward frames to specific ports based on MAC addresses.',
              'Routers (Layer 3) — forward packets based on IP addresses between networks.',
              'Gateways (Layer 4–7) — translate between different network protocols.',
              'Proxies — intermediaries between clients and servers; can provide content filtering.',
            ],
          },
          {
            heading: 'Network Access Control (NAC)',
            list: [
              '802.1X — IEEE standard for port-based NAC; ensures only authorized devices connect by requiring credential or certificate validation.',
              'Virtual NAC — cloud-based; identity-based access control with micro-segmentation.',
            ],
          },
          {
            heading: 'Endpoint Security',
            list: [
              'EPP (Endpoint Protection Platform) — real-time signature-based detection.',
              'EDR (Endpoint Detection and Response) — behavioral analysis and response.',
              'XDR (Extended Detection and Response) — integrated multi-layer detection across endpoints, network, and cloud.',
            ],
          },
          {
            heading: 'Cable Categories',
            table: {
              headers: ['Category', 'Max Speed', 'Use'],
              rows: [
                ['Cat5e', '1 Gbps', 'Standard office networking'],
                ['Cat6/6a', '10 Gbps', 'High-performance office networking'],
                ['Cat8', '25–40 Gbps', 'Data center use'],
              ],
            },
            note: 'Standard cable length limit is 100 meters. Fiber optic preferred for high-speed backbone connections.',
          },
        ],
      },
      {
        id: 'd4t3',
        title: '4.3 Secure Communication Channels',
        content: [
          {
            heading: 'VPN Technologies',
            list: [
              'IPSec — Layer 3; two modes: Tunnel (full packet encrypted) and Transport (payload only).',
              'SSL/TLS VPN — Layer 7; browser-based access.',
              'WireGuard — modern VPN protocol; fast and secure.',
              'SSH (Secure Shell) — encrypted remote access for command-line operations.',
            ],
          },
          {
            heading: 'Email Security',
            list: [
              'SPF (Sender Policy Framework) — specifies authorized mail servers for a domain.',
              'DKIM (DomainKeys Identified Mail) — digitally signs outgoing email.',
              'DMARC — policy for handling emails that fail SPF/DKIM checks.',
              'Email Threat Protection Gateways — filter spam, phishing, and malware.',
            ],
          },
          {
            heading: 'Remote Access Authentication',
            list: [
              'MFA (Multi-Factor Authentication) — combining multiple verification factors.',
              'RADIUS — centralized authentication for remote access; uses UDP.',
              'TACACS+ — Cisco alternative to RADIUS; uses TCP; separates authentication, authorization, accounting.',
              'Zero Trust Network Access (ZTNA) — verifies every access request regardless of location.',
            ],
          },
          {
            heading: 'Third-Party and Satellite Connectivity',
            body: 'Organizations use telecom providers for leased lines, broadband, and cloud interconnects. Satellite types: GEO, MEO, and LEO orbits. Key risks: data interception and supply chain vulnerabilities — mitigated through encrypted VPNs and zero-trust architecture.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DOMAIN 5
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'd5',
    number: 5,
    title: 'Identity and Access Management (IAM)',
    summary: 'Covers access control principles, authentication strategies, federated identity, authorization mechanisms, and identity lifecycle management.',
    topics: [
      {
        id: 'd5t1',
        title: '5.1 Physical and Logical Access to Assets',
        content: [
          {
            heading: 'Core Access Control Principles',
            list: [
              'Need-to-Know — restricts access based on necessity to perform the job.',
              'Least Privilege — minimum level of access necessary for assigned duties.',
              'Separation of Duties — divides responsibilities to prevent conflicts of interest or misuse.',
            ],
            warning: 'These controls apply at all organizational levels. Managers and C-levels are NOT exempt.',
          },
          {
            heading: 'Access Control Models',
            table: {
              headers: ['Model', 'Decision Maker', 'Key Characteristic'],
              rows: [
                ['DAC (Discretionary)', 'User/Owner', 'Flexible but risky; owner controls access'],
                ['MAC (Mandatory)', 'System', 'Strict, label-based; used in government/military'],
                ['RBAC (Role-Based)', 'Role', 'Groups users by job function; most common in enterprises'],
                ['ABAC (Attribute-Based)', 'Attributes', 'Dynamic decisions based on multiple factors; most flexible'],
                ['Rule-Based', 'Rules/ACLs', 'Uses explicit allow/deny conditions'],
                ['Risk-Based', 'Real-time assessment', 'Adjusts access based on threat intelligence'],
              ],
            },
          },
          {
            heading: 'IAM Approaches',
            list: [
              'Centralized IAM — dedicated team oversees all access; rigorous oversight but single point of failure.',
              'Decentralized IAM — distributed to system owners; flexible but inconsistent.',
              'Hybrid IAM — combines both; balances oversight with flexibility.',
            ],
          },
        ],
      },
      {
        id: 'd5t2',
        title: '5.2 Identification and Authentication Strategy',
        content: [
          {
            heading: 'Authentication Factors',
            list: [
              'Something You Know — passwords, PINs, security questions.',
              'Something You Have — smart cards, hardware tokens, OTP devices.',
              'Something You Are — biometrics (fingerprint, retina, voice).',
              'Somewhere You Are — geolocation-based authentication.',
              'Something You Do — behavioral biometrics (typing patterns, gait).',
            ],
            note: 'MFA combines two or more different factor types. Two-factor authentication (2FA) uses exactly two factors.',
          },
          {
            heading: 'Biometric Evaluation Metrics',
            list: [
              'FAR (False Acceptance Rate) — percentage of unauthorized users accepted; lower is better.',
              'FRR (False Rejection Rate) — percentage of authorized users rejected; lower is better.',
              'CER/EER (Crossover Error Rate) — point where FAR = FRR; the lower the CER, the better the system.',
            ],
          },
          {
            heading: 'Advanced Authentication Methods',
            list: [
              'Passwordless Authentication — uses biometrics, magic links, or hardware keys.',
              'Context-Aware Authentication — evaluates device health, network, and behavioral patterns.',
              'Just-In-Time Access — grants temporary privileges using broker-and-remove or ephemeral accounts.',
              'SSO (Single Sign-On) — uses SAML and OAuth to reduce password fatigue.',
            ],
          },
        ],
      },
      {
        id: 'd5t3',
        title: '5.3 Federated Identity with Third-Party Services',
        content: [
          {
            heading: 'IDaaS — Identity as a Service',
            body: 'Cloud-based extension of IAM that centralizes authentication, authorization, and access control. Integrates SSO, MFA, and federated protocols like SAML and OAuth.',
            warning: 'IDaaS reduces administrative complexity but introduces a single point of failure and requires strict third-party risk assessment.',
          },
          {
            heading: 'Three Deployment Models',
            list: [
              'On-Premises — full control through systems like Active Directory or LDAP; higher maintenance costs.',
              'Cloud — pure IDaaS; automation, scalability, cost efficiency; Just-in-Time provisioning creates accounts on first login.',
              'Hybrid — combines both (e.g., Active Directory + Azure AD); gradual cloud migration; requires synchronization management.',
            ],
          },
          {
            heading: 'Critical Risks',
            list: [
              'Availability — provider downtime blocks all authentication.',
              'Data Exposure — breaches affect all linked credentials.',
              'Integration Complexity — legacy systems need bridging tools.',
              'Synchronization Vulnerability — compromised cloud identity could expose on-premise resources.',
            ],
          },
        ],
      },
      {
        id: 'd5t4',
        title: '5.4 Authorization Mechanisms',
        content: [
          {
            heading: 'Key Authorization Concepts',
            list: [
              'Permissions — define what a user or system can do with a specific resource.',
              'Rights — system-level actions that a user or process can perform.',
              'Privileges — encompass both permissions and rights but are broader in scope.',
              'Implicit Deny — unless access is explicitly granted, it is denied by default.',
              'Privilege Creep — users accumulate excess permissions over time; mitigated by regular access reviews.',
            ],
          },
          {
            heading: 'Policy Enforcement Architecture',
            list: [
              'PEP (Policy Enforcement Point) — intercepts access requests and forwards for evaluation.',
              'PDP (Policy Decision Point) — evaluates requests against policies; returns allow/deny decisions.',
            ],
          },
        ],
      },
      {
        id: 'd5t5',
        title: '5.5 Identity and Access Provisioning Lifecycle',
        content: [
          {
            heading: 'Core Lifecycle Processes',
            list: [
              'Provisioning — creates and grants user access during onboarding; involves identity verification, access request approval, and account configuration.',
              'Deprovisioning — removes or adjusts access when no longer needed (role change, termination, system retirement).',
              'Account Access Review — regular audits to identify excessive permissions and inactive accounts; non-admin accounts annually, admin accounts quarterly.',
              'Role Definition and Transition — predefined role sets enforce least privilege and separation of duties across systems.',
              'Privilege Escalation — temporary elevation (sudo, "Run as"); PAM systems enforce strict controls with MFA and session recording.',
              'Service Accounts — specialized accounts for applications; require minimal privileges, regular monitoring, and human oversight.',
            ],
          },
          {
            heading: 'Best Practices',
            list: [
              'Implement automation to reduce errors and administrative burden.',
              'Apply least privilege consistently.',
              'Enforce separation of duties between provisioning and auditing roles.',
              'Maintain detailed audit trails.',
              'Document all access decisions with accountability measures.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DOMAIN 6
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'd6',
    number: 6,
    title: 'Security Assessment and Testing',
    summary: 'Covers assessment/test/audit strategy design, security controls testing, data collection, report analysis, and security audits.',
    topics: [
      {
        id: 'd6t1',
        title: '6.1 Assessment, Test, and Audit Strategy',
        content: [
          {
            heading: 'Testing vs Assessment vs Audit',
            list: [
              'Testing — like a fire drill; penetration tests, vulnerability scans, and functional tests simulate attacks and check what works.',
              'Assessments — broader and strategic; evaluate overall security posture, policy adherence, and risk identification.',
              'Audits — formal and tied to compliance; check if you\'re actually doing what you say you\'re doing.',
            ],
            tip: 'We don\'t secure systems by installing firewalls and crossing fingers. We need a cycle of testing, evaluating, and adjusting.',
          },
          {
            heading: 'NIST SP 800-53A Assessment Framework',
            body: 'Four types of Assessment Objects (what can be assessed):',
            list: [
              'Specifications — documents such as policies, plans, and system security plans.',
              'Mechanisms — security functions or features (encryption, access control).',
              'Activities — operations performed by people or systems (monitoring, backups).',
              'Individuals — people performing roles (security officers, admins).',
            ],
          },
          {
            heading: 'Types of Security Testing',
            list: [
              'Internal Penetration Testing — simulates attack from internal network access.',
              'Phishing Simulations — tests user awareness and email filter effectiveness.',
              'Vulnerability Scanning — automated tools scan for known weaknesses.',
              'Tabletop Exercises — simulated incident response discussions; low-tech but high-impact.',
              'Red Team / Blue Team — red teams attack; blue teams defend in real time.',
            ],
          },
          {
            heading: 'SOC Reports',
            list: [
              'SOC 1 — financial reporting controls.',
              'SOC 2 — data security and system reliability (Security, Availability, Processing Integrity, Confidentiality, Privacy).',
              'SOC 3 — public summary of SOC 2 findings.',
              'Type 1 — controls in place at a specific point in time.',
              'Type 2 — controls operated effectively over 6–12 months.',
            ],
          },
        ],
      },
      {
        id: 'd6t2',
        title: '6.2 Conduct Security Controls Testing',
        content: [
          {
            heading: 'Vulnerability Assessment Standards',
            list: [
              'CVE (Common Vulnerabilities and Exposures) — standardized naming for vulnerabilities.',
              'CVSS (Common Vulnerability Scoring System) — standardized severity scores (0–10).',
              'SCAP (Security Content Automation Protocol) — automates vulnerability management.',
              'CPE (Common Platform Enumeration) — standardized naming for platforms.',
            ],
          },
          {
            heading: 'Penetration Testing Methodologies',
            list: [
              'Black Box — no prior knowledge; simulates external attacker.',
              'White Box — full knowledge (architecture, source code); most thorough.',
              'Gray Box — partial knowledge; simulates insider or partner threat.',
            ],
          },
          {
            heading: 'Penetration Testing Five Phases',
            list: [
              '1. Planning and Reconnaissance — define scope; gather OSINT.',
              '2. Scanning — active probing with Nmap, Nessus.',
              '3. Exploitation — attempting to breach identified vulnerabilities.',
              '4. Post-Exploitation — determine what an attacker could achieve with access.',
              '5. Reporting — document findings, risk ratings, and remediation recommendations.',
            ],
          },
          {
            heading: 'Other Testing Methods',
            list: [
              'Log Reviews — SIEM analysis; NetFlow; detect incidents and maintain compliance.',
              'Synthetic Transactions — automated tests simulating user behavior 24/7.',
              'Code Review — manual/automated; Fagan inspections; static and dynamic analysis.',
              'Misuse Case Testing — design attack scenarios using UML diagrams.',
              'Coverage Analysis — statement, branch, condition, function, and loop coverage metrics.',
              'Interface Testing — GUI, CLI, REST API, RPC, IPC, and physical interfaces as attack vectors.',
              'Breach Attack Simulation — automated continuous simulation of realistic attack chains.',
            ],
          },
        ],
      },
      {
        id: 'd6t3',
        title: '6.3 Collect Security Process Data',
        content: [
          {
            heading: 'KPIs vs KRIs',
            list: [
              'KPIs (Key Performance Indicators) — measure performance against goals (e.g., patch deployment speed).',
              'KRIs (Key Risk Indicators) — identify emerging risks (e.g., unpatched vulnerability count, phishing failure rates).',
            ],
          },
          {
            heading: 'Backup Verification — 3-2-1 Rule',
            list: [
              '3 — maintain three copies of data.',
              '2 — store on two different media types.',
              '1 — keep one copy offsite.',
            ],
            note: 'Test backups regularly through test restores and checksums to ensure data integrity.',
          },
          {
            heading: 'Security Process Data Categories',
            list: [
              'Account Management — Join-Move-Leave lifecycle tracking.',
              'Management Review and Approval — ISO 27001, NIST SP 800-53, SOC 2, COBIT all require formal leadership oversight.',
              'Training and Awareness — phishing click rates, incident reporting rates, quiz results, policy compliance.',
              'DR/BC Testing — tabletop exercises or full simulations validate RTO and RPO before actual incidents.',
            ],
          },
        ],
      },
      {
        id: 'd6t5',
        title: '6.5 Security Audits',
        content: [
          {
            heading: 'Audit Types',
            list: [
              'First-Party (Internal) — conducted by the organization itself; verifies compliance with internal policies.',
              'Second-Party — conducted by a customer or partner; verifies contractual security requirements.',
              'Third-Party — independent external organizations; most objective; used for ISO 27001, SOC 2, PCI DSS.',
            ],
          },
          {
            heading: 'Conflict of Interest in Internal Audits',
            body: 'When someone reviews a process they helped design or manage, it\'s difficult to be objective. Mitigations:',
            list: [
              'Use independent teams within the company.',
              'Rotate auditors to avoid familiarity bias.',
              'Report audit results directly to senior leadership or the board.',
              'Supplement with periodic third-party audits.',
            ],
          },
          {
            heading: 'ISO 27001 Audit Outcomes',
            list: [
              'Certification Granted — meets requirements; minor observations acceptable.',
              'Certification Delayed — major non-conformities found; must fix before certification.',
              'Certification Denied — ISMS not aligned; must restart preparation.',
              'Surveillance Audits — annual lighter checks after initial certification; full recertification every 3 years.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DOMAIN 7
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'd7',
    number: 7,
    title: 'Security Operations',
    summary: 'Covers investigations, digital forensics, security operations concepts, resource protection, incident management, detection measures, patch management, change management, disaster recovery, business continuity, and physical security.',
    topics: [
      {
        id: 'd7t1',
        title: '7.1 Investigations and Digital Forensics',
        content: [
          {
            heading: 'Investigation Types',
            list: [
              'Administrative/Operational — internal; enforces organizational policies; handled by security teams and HR.',
              'Criminal — law enforcement-led; "beyond a reasonable doubt" burden of proof.',
              'Civil — dispute resolution; "preponderance of evidence" standard (lower threshold).',
              'Regulatory — government bodies investigate suspected violations; organizations must fully comply.',
            ],
          },
          {
            heading: 'Evidence Types',
            list: [
              'Real Evidence — physical objects (drives, devices, documents).',
              'Documentary Evidence — written or recorded materials (logs, emails, configurations).',
              'Testimonial Evidence — witness statements and expert testimony.',
              'Demonstrative Evidence — visual aids explaining other evidence (diagrams, timelines).',
            ],
          },
          {
            heading: 'Evidence Admissibility',
            list: [
              'Relevance — directly related to the case.',
              'Materiality — significant to the outcome.',
              'Competence — properly collected and handled; chain of custody maintained.',
            ],
          },
          {
            heading: 'Order of Volatility (Most → Least Volatile)',
            list: [
              '1. CPU registers and cache.',
              '2. RAM (Random Access Memory).',
              '3. Network connections and routing tables.',
              '4. Running processes.',
              '5. Disk storage.',
              '6. Remote logging and monitoring data.',
              '7. Physical configuration and network topology.',
              '8. Offline backups and archival media.',
            ],
            note: 'Locard\'s Exchange Principle — "every contact leaves a trace" — underlies all forensic investigation.',
          },
        ],
      },
      {
        id: 'd7t4',
        title: '7.4 Foundational Security Operations Concepts',
        content: [
          {
            heading: 'Core Principles',
            list: [
              'Need-to-Know — restricts information access based on operational necessity.',
              'Least Privilege — limits permissions granted to users.',
              'Separation of Duties — prevents single individual from having unchecked control.',
              'Two-Person Control (Dual Authorization) — dual approval required for sensitive actions.',
              'Job Rotation — moves personnel through roles; detects long-running fraud.',
              'Mandatory Vacations — forced absences detect misconduct during absence.',
            ],
          },
          {
            heading: 'Privileged Account Management (PAM)',
            body: 'Strategies and tools for controlling, monitoring, securing, and auditing high-value accounts (administrators, service accounts, root, domain admins). Core PAM features:',
            list: [
              'Password vaulting — secure storage and retrieval of privileged credentials.',
              'Session monitoring — recording of privileged user sessions.',
              'Automated password rotation — regular credential changes without human intervention.',
              'Just-in-time access — temporary elevation only when needed.',
            ],
            warning: 'Common PAM failures: password sharing, overprovisioning, and neglected service accounts.',
          },
          {
            heading: 'Service Level Agreements (SLAs)',
            body: 'Formal contracts specifying service performance metrics. Security-specific clauses address: incident response times, patch deployment windows, uptime guarantees, and data handling standards.',
          },
        ],
      },
      {
        id: 'd7t5',
        title: '7.5 Resource Protection',
        content: [
          {
            heading: 'Media Management',
            body: 'Media encompasses both physical forms (tapes, USB drives, printed documents) and digital forms (VMs, cloud backups, SSDs). Media\'s inherent mobility creates vulnerability windows requiring protection controls.',
          },
          {
            heading: 'Labeling vs Marking',
            list: [
              'Label — the classification level itself (e.g., Confidential, Secret).',
              'Marking — additional context (retention periods, jurisdictional constraints, handling instructions).',
            ],
          },
          {
            heading: 'Media Sanitization Methods',
            list: [
              'Clearing — overwriting with random data; for internal reuse of non-sensitive media.',
              'Purging — multi-pass overwrites or degaussing; enhanced recovery prevention.',
              'Destruction — physical obliteration (crushing, shredding, incinerating); for classified data leaving organizational control.',
            ],
            note: 'NIST SP 800-88 Rev. 1 provides recommended sanitization guidance.',
          },
          {
            heading: 'Media Reliability Metrics',
            list: [
              'MTBF (Mean Time Between Failures) — for repairable systems.',
              'MTTF (Mean Time To Failure) — for non-repairable items like SSDs.',
            ],
          },
        ],
      },
      {
        id: 'd7t6',
        title: '7.6 Incident Management',
        content: [
          {
            heading: 'Incident Response Lifecycle (NIST SP 800-61)',
            list: [
              'Preparation — establish IR policy, team, tools, and communication plans.',
              'Detection and Analysis — identify and validate incidents; determine scope and severity.',
              'Containment — short-term to stop spreading; long-term to maintain operations.',
              'Eradication — remove root cause (malware, vulnerabilities, attacker persistence).',
              'Recovery — restore systems; verify normal operation; monitor for re-infection.',
              'Post-Incident Activity — lessons learned; documentation; update controls.',
            ],
          },
          {
            heading: 'Common Incident Categories',
            list: [
              'Malware — viruses, ransomware, trojans, spyware.',
              'Unauthorized Access — account compromise, privilege escalation.',
              'Denial of Service (DoS/DDoS) — overwhelming resources to deny legitimate access.',
              'Data Breach — unauthorized disclosure of sensitive data.',
              'Insider Threat — malicious or negligent actions by employees.',
            ],
          },
        ],
      },
      {
        id: 'd7t7',
        title: '7.7 Detection and Preventative Measures',
        content: [
          {
            heading: 'IDS vs IPS',
            list: [
              'IDS (Intrusion Detection System) — monitors and alerts; does not block.',
              'IPS (Intrusion Prevention System) — monitors and actively blocks threats.',
            ],
          },
          {
            heading: 'Detection Methods',
            list: [
              'Signature-Based — compares against known threat patterns; fast but misses zero-days.',
              'Anomaly-Based — establishes baseline; alerts on deviations; detects novel threats but higher false positives.',
              'Stateful Protocol Analysis — tracks protocol state; detects protocol-specific attacks.',
            ],
          },
          {
            heading: 'Whitelisting vs Blacklisting',
            list: [
              'Whitelisting — default deny; only explicitly approved items allowed; high security in controlled environments.',
              'Blacklisting — blocks known threats; allows everything else; better for dynamic environments.',
            ],
          },
          {
            heading: 'Deception Technologies',
            list: [
              'Honeypots — decoy systems designed to attract attackers and gather intelligence on tactics.',
              'Honeynets — network of honeypots; more realistic environment for attacker analysis.',
            ],
          },
          {
            heading: 'Anti-Malware Layers',
            list: [
              'Signature detection — known malware patterns.',
              'Heuristics — behavior-based detection.',
              'Behavioral analysis — runtime monitoring.',
              'Sandboxing — isolated execution to observe behavior.',
              'Cloud intelligence — shared threat intelligence.',
            ],
          },
        ],
      },
      {
        id: 'd7t8',
        title: '7.8 Patch and Vulnerability Management',
        content: [
          {
            heading: 'Patch vs Vulnerability Management',
            list: [
              'Patch Management — identifying, acquiring, testing, and deploying software updates.',
              'Vulnerability Management — broader discipline of identifying, classifying, remediating, and mitigating weaknesses, whether patches exist or not.',
            ],
          },
          {
            heading: 'Lifecycle Stages',
            list: [
              '1. Asset Discovery — complete inventory using CMDB, NMAP, Active Directory, cloud scanners.',
              '2. Vulnerability Scanning — authenticated scans regularly (weekly/monthly for critical); tools: Qualys, Nessus, OpenVAS.',
              '3. Risk Assessment and Prioritization — evaluate based on internet exposure, business criticality, active exploitation (check CISA KEV list).',
              '4. Patch Deployment — test in staging; obtain change control approval; schedule maintenance windows; establish rollback procedures.',
              '5. Exception Handling — for unpatched systems: VLAN isolation, IDS/IPS monitoring, firewall restrictions.',
              '6. Continuous Monitoring — threat intelligence feeds, zero-day alerts, KPI dashboards.',
            ],
            note: 'Risk = Threat × Vulnerability × Impact. Not all vulnerabilities demand immediate patching, but all require visibility and documented risk treatment.',
          },
        ],
      },
      {
        id: 'd7t9',
        title: '7.9 Change Management',
        content: [
          {
            heading: 'Why Change Management Matters',
            body: 'Unreviewed changes are a threat vector. Each modification can affect confidentiality, integrity, or availability through: misconfigurations, disabled security controls, logging conflicts, or undocumented non-compliant states.',
          },
          {
            heading: 'ITIL Change Management Phases',
            list: [
              '1. Request for Change (RFC) — justification, risk analysis, rollback plan.',
              '2. Change Assessment — risk evaluation by Change Advisory Board (CAB).',
              '3. Change Authorization — stakeholder approval.',
              '4. Implementation — planned, controlled execution.',
              '5. Review and Close — post-implementation verification.',
            ],
          },
          {
            heading: 'Change vs Configuration Management',
            table: {
              headers: ['Aspect', 'Change Management', 'Configuration Management'],
              rows: [
                ['Purpose', 'Control the change process', 'Track and maintain system state'],
                ['Focus', 'Who, when, why, how', 'What the system currently looks like'],
                ['Example', 'Approval workflow for patches', 'Documentation of live patch versions'],
              ],
            },
          },
        ],
      },
      {
        id: 'd7t10',
        title: '7.10–7.13 Disaster Recovery and Business Continuity',
        content: [
          {
            heading: 'Recovery Metrics',
            list: [
              'RTO (Recovery Time Objective) — maximum acceptable downtime.',
              'RPO (Recovery Point Objective) — maximum acceptable data loss measured in time.',
              'MTD (Maximum Tolerable Downtime) — longest a business can survive without a critical system.',
              'WRT (Work Recovery Time) — time needed for testing before systems go live.',
            ],
          },
          {
            heading: 'Backup Types',
            table: {
              headers: ['Type', 'What is backed up', 'Create time', 'Restore time'],
              rows: [
                ['Full', 'All data', 'Longest', 'Fastest'],
                ['Incremental', 'Changes since last backup', 'Fastest', 'Slowest (needs all incrementals)'],
                ['Differential', 'Changes since last full', 'Moderate', 'Moderate (only last full + one diff)'],
              ],
            },
          },
          {
            heading: 'Recovery Sites',
            list: [
              'Hot Site — fully operational duplicate; immediate failover; most expensive.',
              'Warm Site — partially configured; hours to days to bring online; moderate cost.',
              'Cold Site — empty facility with infrastructure; days to weeks to activate; cheapest.',
            ],
          },
          {
            heading: 'DR Plan Testing Types',
            list: [
              'Read-Through (Checklist) — team reviews the plan for accuracy.',
              'Walkthrough (Tabletop) — team talks through steps without disrupting operations.',
              'Simulation — tests specific scenarios without full activation.',
              'Parallel Test — alternate site activated alongside production.',
              'Full Interruption — production systems shut down; most thorough but most disruptive.',
            ],
          },
        ],
      },
      {
        id: 'd7t14',
        title: '7.14–7.15 Physical Security and Personnel Safety',
        content: [
          {
            heading: 'Perimeter Security Controls',
            list: [
              'Barriers and Fencing — 7-foot fencing with razor ribbon and bollards; deter and delay unauthorized entry.',
              'Mantraps — controlled entry points that force verification and prevent tailgating.',
              'Lighting — proper illumination as deterrent and detection aid.',
              'Surveillance (CCTV) — real-time monitoring; alerts must be configured properly.',
              'Intrusion Detection — pressure sensors, vibration detectors, infrared systems.',
              'Security Guards — human presence adds flexibility, judgment, and deterrence.',
            ],
          },
          {
            heading: 'Internal Security Controls',
            list: [
              'Role-Based Access — restricting movement based on job function (least privilege).',
              'Internal Barriers — locked doors, turnstiles, and secure zones.',
              'Video Monitoring — real-time surveillance with intelligent anomaly alerts.',
              'Escort Policies — authorized personnel must accompany visitors.',
              'Environmental Protection — fire suppression, temperature control, leak detection.',
            ],
            note: 'Access must be treated as a living system — continuously reviewed, not a one-time setup.',
          },
          {
            heading: 'Personnel Safety Concerns',
            list: [
              'Duress — systems or code words to silently signal security when under threat.',
              'Travel Security — awareness of physical risks when traveling with devices.',
              'Emergency Preparedness — evacuation plans, assembly points, emergency communication.',
              'Workplace Violence — policies and training for identifying and responding to threats.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DOMAIN 8
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'd8',
    number: 8,
    title: 'Software Development Security',
    summary: 'Covers SDLC security integration, development ecosystem controls, software security assessment, acquired software security, secure coding, and API security.',
    topics: [
      {
        id: 'd8t1',
        title: '8.1 Security in the SDLC',
        content: [
          {
            heading: 'Development Methodologies',
            list: [
              'Waterfall — sequential phases; security flaws discovered late are expensive; define security requirements upfront.',
              'Agile / Scrum — iterative sprints; risk of security becoming afterthought; embed security champions, integrate threat modeling into sprints.',
              'Spiral — hybrid with risk focus; each cycle includes risk analysis; ideal for high-stakes systems.',
              'DevOps — continuous integration/delivery; insecure code can rapidly reach production.',
              'DevSecOps — embeds security at every pipeline stage; "shift left" philosophy.',
            ],
          },
          {
            heading: 'Maturity Models',
            table: {
              headers: ['Model', 'Focus', 'Structure', 'Best Used For'],
              rows: [
                ['CMM', 'General process maturity', '5 levels (Initial → Optimizing)', 'Organizational process improvement'],
                ['SAMM', 'Secure software development', '4 Functions × 3 Practices × 5 Levels', 'Software security improvement programs'],
                ['IDEAL', 'Organizational change lifecycle', '5 Phases (Initiating → Learning)', 'Implementing security program changes'],
              ],
            },
          },
          {
            heading: 'Change Management in SDLC',
            list: [
              'Request Control — formal documentation of proposed changes.',
              'Change Control — review, evaluation, and approval/rejection with risk assessment.',
              'Release Control — deployment to live environment with testing and scheduling.',
            ],
          },
        ],
      },
      {
        id: 'd8t2',
        title: '8.2 Security Controls in Development Ecosystems',
        content: [
          {
            heading: 'Application Security Testing Methods',
            table: {
              headers: ['Method', 'Focus', 'Runs App?', 'Best For'],
              rows: [
                ['SAST (Static)', 'Source code analysis', 'No', 'Early detection, logic flaws'],
                ['DAST (Dynamic)', 'Runtime behavior', 'Yes', 'External attack simulation'],
                ['SCA (Composition)', 'Third-party dependencies', 'No', 'Inherited vulnerability discovery'],
                ['IAST (Interactive)', 'Code + runtime hybrid', 'Yes', 'Contextual findings, fewer false positives'],
              ],
            },
          },
          {
            heading: 'CI/CD Pipeline Security',
            body: 'Automation enables consistent security enforcement but can rapidly propagate malicious code. Key controls:',
            list: [
              'Integrate SAST and SCA into pipeline gates.',
              'Use secrets management (never hardcode credentials in pipelines).',
              'Enforce RBAC on pipeline systems.',
              'Maintain detailed audit logs of all pipeline actions.',
              'Secure CI servers like production systems.',
            ],
          },
          {
            heading: 'Code Repository Security',
            list: [
              'Role-based access control with branch protections.',
              'Commit signing and code review requirements.',
              'Secret scanning to detect leaked credentials.',
              'Pull request approval workflows.',
            ],
          },
        ],
      },
      {
        id: 'd8t3',
        title: '8.3 Assess Software Security Effectiveness',
        content: [
          {
            heading: 'Logging vs Auditing',
            table: {
              headers: ['Aspect', 'Logging', 'Auditing'],
              rows: [
                ['Purpose', 'Record events and activities', 'Analyze logs to verify controls and detect anomalies'],
                ['Timing', 'Continuous, real-time', 'Periodic, on-demand, scheduled'],
                ['Tools', 'Syslog, CloudWatch, ELK stack', 'SIEMs, log analyzers, compliance tools'],
                ['Focus', 'Visibility and traceability', 'Accountability, verification, investigation'],
              ],
            },
            note: 'If it\'s not logged, it never happened. Logs must be immutable, timestamped, signed, and monitored.',
          },
          {
            heading: 'Risk Analysis Process',
            list: [
              '1. Identify assets (customer data, credentials, financial records).',
              '2. Examine threats (unauthorized access, data leakage, privilege escalation).',
              '3. Assess vulnerabilities (weak validation, missing rate-limiting, hardcoded credentials).',
              '4. Evaluate potential impact and likelihood of exploitation.',
              '5. Apply mitigation strategies — patch, rewrite, add authentication, or deprecate.',
            ],
            note: 'Risk is never eliminated, only managed. Even after mitigation, residual risk remains.',
          },
        ],
      },
      {
        id: 'd8t5',
        title: '8.5 Secure Coding Guidelines and Standards',
        content: [
          {
            heading: 'Common Source-Code Vulnerabilities',
            table: {
              headers: ['Risk Category', 'Description', 'Mitigation'],
              rows: [
                ['Buffer Overflows', 'Fails to validate input length; enables code execution', 'Use safe functions; bounds checking; memory-safe languages'],
                ['Input Validation Failures', 'Unsanitized input enables SQL injection, XSS', 'Parameterized queries; allow-lists; output encoding'],
                ['Insecure Error Handling', 'Detailed errors expose system internals', 'Log internally; show generic messages to users'],
                ['Hardcoded Secrets', 'Credentials embedded in code', 'Environment variables; secrets managers; pre-commit hooks'],
                ['Logic Flaws', 'Business rules incorrectly implemented', 'Threat modeling; manual code review'],
                ['Race Conditions', 'Multiple threads accessing shared resources simultaneously', 'Atomic operations; strong locking mechanisms'],
              ],
            },
          },
          {
            heading: 'API Security Principles',
            list: [
              'Broken Object Level Authorization — validate authorization for every object access; "never trust the client."',
              'Authentication on Every Endpoint — use OAuth 2.0 with proper scope; do not assume logged-in sessions suffice.',
              'Input Validation — sanitize all JSON, XML, and query parameter inputs.',
              'Minimal Data Exposure — return only the minimum necessary; least privilege in responses.',
              'Rate Limiting and Throttling — protect against brute force, scraping, and DoS.',
              'Error Handling — opaque responses to users; detailed logs internally.',
              'API Lifecycle Management — deprecate old versions; keep documentation current.',
            ],
          },
          {
            heading: 'Secure Coding Core Practices',
            list: [
              'Input Validation — validate type, length, format, and range; prefer allow-lists over deny-lists.',
              'Output Encoding — encode user input before display to prevent XSS.',
              'Authentication and Session Management — use proven libraries; strong password policies; session invalidation on logout.',
              'Error Handling — log errors internally; display generic messages to users.',
              'Least Privilege in Code — applications run with only necessary permissions.',
              'Code Reuse and Dependencies — vet third-party libraries; use OWASP Dependency-Check and Snyk.',
            ],
          },
          {
            heading: 'OWASP Top 10 Web Application Risks',
            list: [
              '1. Broken Access Control — users acting outside intended permissions.',
              '2. Cryptographic Failures — weak encryption or unencrypted sensitive data.',
              '3. Injection (SQL, LDAP, OS) — untrusted data sent to interpreters.',
              '4. Insecure Design — missing or ineffective security controls at design level.',
              '5. Security Misconfiguration — insecure default configurations.',
              '6. Vulnerable and Outdated Components — libraries with known vulnerabilities.',
              '7. Identification and Authentication Failures — weak session management or passwords.',
              '8. Software and Data Integrity Failures — insecure deserialization, CI/CD tampering.',
              '9. Security Logging and Monitoring Failures — inability to detect breaches.',
              '10. Server-Side Request Forgery (SSRF) — server making requests to unintended locations.',
            ],
          },
        ],
      },
    ],
  },
]
