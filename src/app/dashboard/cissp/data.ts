export type Topic = {
  id: string
  title: string
  content: Section[]
}

export type Section = {
  heading?: string
  body: string
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
  {
    id: 'd1',
    number: 1,
    title: 'Security and Risk Management',
    summary: 'Covers ethics, security concepts, governance, legal compliance, personnel security, risk management, threat modeling, and supply chain risk.',
    topics: [
      {
        id: 'd1t1',
        title: '1.1 Professional Ethics',
        content: [
          {
            heading: 'ISC² Code of Professional Ethics',
            body: 'Ethics refer to a set of moral principles that guide individuals or groups in determining what is right or wrong, good or bad, in a given situation. All CISSP candidates must understand and integrate these ethics into their professional practice both before and after taking the exam.',
            note: 'All ISC² members are required to commit to fully support the Code of Ethics. Members who intentionally violate any provision may face revocation of certification.',
          },
          {
            heading: 'Code of Ethics Canons',
            body: 'There are four mandatory canons:',
            list: [
              'Protect society, the common good, necessary public trust and confidence, and the infrastructure.',
              'Act honorably, honestly, justly, responsibly, and legally.',
              'Provide diligent and competent service to principals.',
              'Advance and protect the profession.',
            ],
          },
          {
            heading: 'Ethics Complaint Process',
            body: 'ISC² has a formal process for handling complaints:',
            list: [
              'Filing — anyone can file a written, specific complaint (anonymous complaints generally not accepted).',
              'Initial Review — Ethics Committee checks jurisdiction and merit; frivolous complaints dismissed.',
              'Notification — the respondent is notified and given a chance to respond.',
              'Investigation and Hearing — evidence is gathered; formal hearing may be convened.',
              'Decision and Sanctions — private reprimand, public reprimand, suspension, or revocation.',
              'Appeal — member may appeal within a specified timeframe.',
            ],
          },
          {
            heading: 'Ten Commandments of Computer Ethics (Computer Ethics Institute)',
            body: 'A widely used framework for ethical computing:',
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
            body: 'The IEEE Code of Ethics ensures integrity, accountability, and fairness in professional activities. Key commitments include: uphold the highest standards of integrity; hold paramount the safety, health, and welfare of the public; avoid real or perceived conflicts of interest; seek and offer honest criticism; treat all persons fairly and with respect; avoid harassment or discrimination; support colleagues in following the code.',
          },
          {
            heading: 'RFC 1087 — Ethics and the Internet',
            body: 'RFC 1087 defines unethical Internet behavior. The Internet is a privileged resource built for research and education. The following behaviors are considered unethical:',
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
            body: 'The five pillars guide the design, implementation, and management of secure systems:',
            list: [
              'Confidentiality — information is accessible only to those authorized to access it. Techniques: encryption, access controls, user authentication.',
              'Integrity — maintaining accuracy, reliability, and completeness of data over its entire lifecycle. Techniques: data validation, checksums, digital signatures.',
              'Availability — information and resources are accessible to authorized users when needed. Techniques: redundancy, fault tolerance, disaster recovery planning.',
              'Authenticity — verifies the identity of users and ensures data originates from a trusted source. Techniques: passwords, biometrics, digital certificates.',
              'Nonrepudiation — ensures individuals cannot deny their actions. Techniques: digital signatures, audit trails, transaction logs.',
            ],
            warning: 'Information Security is often confused solely with Confidentiality. Integrity ensures accuracy; Availability ensures access when needed — all three are equally important.',
          },
          {
            heading: 'CIA Triad vs DAD Threats',
            body: 'The DAD triad represents threats to each CIA pillar:',
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
            body: 'Donn Parker extended the CIA Triad with three additional attributes:',
            list: [
              'Confidentiality — information only accessible to authorized users.',
              'Integrity — protecting data from unauthorized modification.',
              'Availability — systems and data accessible when needed.',
              'Possession/Control — ownership and control of data, preventing unauthorized possession.',
              'Authenticity — verifying that data, communications, and identities are genuine.',
              'Utility — ensuring data is useful and in a functional format for its intended purpose.',
            ],
          },
          {
            heading: 'IAAA Framework',
            body: 'The IAAA framework provides four essential steps in access control and accountability:',
            list: [
              'Identification — claiming an identity (username, ID number).',
              'Authentication — verifying the claimed identity (passwords, biometrics, tokens).',
              'Authorization — determining the access rights and permissions granted.',
              'Accountability — tracking and recording activities; auditing and logging for investigation and compliance.',
            ],
            note: 'Auditing is retrospective (periodic review of logs). Monitoring is real-time observation of systems and activities.',
          },
          {
            heading: 'Identity and Authenticator Assurance Levels',
            body: 'Identity Assurance Levels (IAL) define the degree of certainty regarding a user\'s claimed identity:',
            list: [
              'IAL1 — self-assertion only; no external verification required.',
              'IAL2 — evidence-based verification (e.g., scanned government documents).',
              'IAL3 — in-person validation with photo ID and government database cross-check.',
            ],
          },
          {
            heading: 'Authenticator Assurance Levels (AAL)',
            body: 'AALs define the strength of the authentication mechanism:',
            list: [
              'AAL1 — moderate confidence; single factor (password).',
              'AAL2 — elevated confidence; at least two factors.',
              'AAL3 — highest confidence; two factors plus a cryptographic key and physical device.',
            ],
          },
          {
            heading: 'Defense in Depth',
            body: 'Defense in depth emphasizes multiple layers of security controls. If one control fails, others mitigate the risk. Three key layers:',
            list: [
              'Physical Controls — locks, access badges, surveillance systems.',
              'Technical Controls — firewalls, intrusion detection systems, encryption.',
              'Administrative Controls — policies, procedures, training programs.',
            ],
          },
          {
            heading: 'Abstraction, Data Hiding, and Security Through Obscurity',
            body: 'Abstraction simplifies complex systems by exposing only necessary details, hiding underlying complexity. Data hiding conceals specific data details to limit access and reduce exposure to unauthorized parties.',
            warning: 'Security through obscurity (relying on hidden design to provide security) is generally discouraged. It may deter unsophisticated attackers temporarily but fails against determined adversaries who can uncover hidden elements through reverse engineering.',
          },
        ],
      },
      {
        id: 'd1t3',
        title: '1.3 Security Governance',
        content: [
          {
            heading: 'GRC — Governance, Risk, Compliance',
            body: 'Security Governance is the framework of practices and processes through which an organization plans, supports, evaluates, and manages its security efforts. GRC integrates:',
            list: [
              'Governance — ensuring activities support business goals.',
              'Risk — identification and management of risks.',
              'Compliance — adherence to regulations and policies.',
            ],
          },
          {
            heading: 'Planning Hierarchy',
            body: 'Three planning levels align security with organizational goals:',
            list: [
              'Strategic Plan — 5-year blueprint aligning security with organizational mission.',
              'Tactical Plan — 1-year mid-term execution strategy.',
              'Operational Plan — monthly/quarterly short-term actions.',
            ],
          },
          {
            heading: 'Security Control Frameworks',
            body: 'Major frameworks used in information security:',
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
            body: 'Key security roles and responsibilities:',
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
            body: 'Two essential governance concepts:',
            table: {
              headers: ['Aspect', 'Due Care', 'Due Diligence'],
              rows: [
                ['Timing', 'Immediate rectification', 'Comprehensive investigation'],
                ['Principle', 'Prudent man rule', 'Experienced man rule'],
                ['Focus', 'Action (Do Control)', 'Knowledge (Do Detect)'],
                ['Timeframe', 'Short-term', 'Long-term'],
              ],
            },
            note: 'Due diligence establishes the security framework (policies, standards, baselines); due care implements and maintains it.',
          },
          {
            heading: 'SOC Reports',
            body: 'System and Organization Controls (SOC) reports provide independent verification of security:',
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
        id: 'd1t9',
        title: '1.9 Risk Management',
        content: [
          {
            heading: 'Risk-Based Approach',
            body: 'A risk-based approach turns abstract fears into clear, manageable tasks. You assess what could go wrong, then respond smartly — by mitigating, transferring, accepting, or avoiding the risk based on priorities and resources.',
          },
          {
            heading: 'Core Risk Concepts',
            body: 'Fundamental concepts:',
            list: [
              'Asset — the things you care about and need to protect (data, systems, brand reputation).',
              'Vulnerability — a weakness (outdated software, poor passwords) that could be exploited.',
              'Threat / Threat Agent — the potential danger (hacker, natural event, insider) and the actor behind it.',
              'Attack Vector — the route used (phishing emails, open ports) to launch the attack.',
              'Risk — the chance that a threat will exploit a vulnerability and harm assets.',
              'Control / Safeguard — what you do to reduce vulnerabilities or block threats.',
              'Exposure — how much of your asset is actually open to threats given its vulnerabilities.',
              'Attack Event — when someone actually hits you; theory becomes real harm.',
            ],
          },
          {
            heading: 'Risk Treatment Options',
            body: 'Four ways to respond to identified risk:',
            list: [
              'Mitigate — implement controls to reduce the likelihood or impact.',
              'Transfer — shift the risk to a third party (e.g., insurance, outsourcing).',
              'Accept — acknowledge and document the risk without action (residual risk).',
              'Avoid — eliminate the activity that causes the risk.',
            ],
          },
        ],
      },
    ],
  },
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
            heading: 'Data Classification',
            body: 'Data classification organizes information into categories reflecting sensitivity and value. Organizations benefit by prioritizing protection efforts, making informed decisions, meeting compliance requirements, reducing risk, and streamlining data management.',
          },
          {
            heading: 'Commercial Classification Levels',
            body: 'Standard commercial tiers:',
            list: [
              'Confidential — most sensitive (trade secrets, strategic plans).',
              'Private — requires extra protection (employee/medical records).',
              'Sensitive — special handling needed (financial reports, marketing strategies).',
              'Public — generally available information.',
            ],
          },
          {
            heading: 'Military / Government Classification Levels',
            body: 'Government classification tiers:',
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
            body: 'Asset classification identifies and assigns value to physical and digital systems based on sensitivity and criticality. Organizations use tiered approaches (Tier 0 mission-critical through Tier 2 general use). Asset classification should match the highest classification level of data it processes.',
          },
          {
            heading: 'Data Lifecycle',
            body: 'Effective data programs require classifying all assets by criticality and sensitivity while establishing procedures for data handling across three states:',
            list: [
              'Data at Rest — stored data (databases, files, backups).',
              'Data in Transit — data moving across networks.',
              'Data in Use — data being actively processed.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'd3',
    number: 3,
    title: 'Security Architecture and Engineering',
    summary: 'Covers secure design principles, security models, cryptography, site design, and system lifecycle management.',
    topics: [
      {
        id: 'd3t1',
        title: '3.1 Secure Design Principles',
        content: [
          {
            heading: 'Design-Phase Priority',
            body: 'Security should be considered at every stage: design, development, testing, implementation, maintenance, and decommissioning. The most critical stage is the design phase. If security is not integrated from the beginning, retrofitting it later is costly and ineffective.',
            tip: 'Security professionals must align security architecture with business goals, ensuring compliance with governance initiatives in an efficient and cost-effective manner.',
          },
          {
            heading: 'ISO/IEC 19249 — Five Architectural Principles',
            body: 'ISO/IEC 19249 outlines five principles for secure system design:',
            list: [
              'Domain Separation — grouping components with similar security attributes; communication between domains is strictly controlled.',
              'Layering — structuring a system into levels, each enforcing its own security policies.',
              'Encapsulation — restricting direct access to components; all interactions occur through defined interfaces.',
              'Redundancy — duplicating critical components to ensure availability and integrity (e.g., RAID, high-availability clusters).',
              'Virtualization — abstracting physical resources to enhance security, scalability, and efficiency.',
            ],
          },
          {
            heading: 'Core Secure Design Principles',
            body: 'Essential principles every security architect applies:',
            list: [
              'Least Privilege — grant only the minimum access necessary to perform a function.',
              'Separation of Duties — split critical tasks across multiple individuals to prevent fraud.',
              'Defense in Depth — multiple security layers so if one fails, others compensate.',
              'Fail Secure / Fail Safe — systems default to a secure state on failure.',
              'Economy of Mechanism — keep security designs simple to reduce attack surface.',
              'Complete Mediation — every access to every resource must be checked.',
              'Open Design — security should not depend on secrecy of the design.',
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
            heading: 'Bell-LaPadula Model',
            body: 'Focuses on confidentiality. Rules:',
            list: [
              'Simple Security Property (No Read Up) — a subject cannot read data at a higher classification.',
              'Star Property (No Write Down) — a subject cannot write data to a lower classification.',
              'Strong Star Property — a subject can only read and write at their own classification level.',
            ],
          },
          {
            heading: 'Biba Model',
            body: 'Focuses on integrity (opposite of Bell-LaPadula). Rules:',
            list: [
              'Simple Integrity Axiom (No Read Down) — a subject cannot read data at a lower integrity level.',
              'Star Integrity Axiom (No Write Up) — a subject cannot write data to a higher integrity level.',
            ],
          },
        ],
      },
      {
        id: 'd3t6',
        title: '3.6 Cryptographic Solutions',
        content: [
          {
            heading: 'Symmetric Encryption',
            body: 'Uses the same key for encryption and decryption. Fast but requires secure key exchange.',
            list: [
              'AES (Advanced Encryption Standard) — 128, 192, or 256-bit keys; current gold standard.',
              'DES — 56-bit key; deprecated, considered insecure.',
              '3DES — applies DES three times; transitionally used but being phased out.',
              'Blowfish / Twofish — flexible block ciphers.',
            ],
          },
          {
            heading: 'Asymmetric Encryption',
            body: 'Uses a public key to encrypt and a private key to decrypt. Solves key distribution but slower than symmetric.',
            list: [
              'RSA — widely used; security based on factoring large prime numbers.',
              'ECC (Elliptic Curve Cryptography) — shorter keys with equivalent strength; efficient for mobile.',
              'Diffie-Hellman — key exchange protocol; does not provide encryption itself.',
            ],
          },
          {
            heading: 'Hashing',
            body: 'One-way function producing a fixed-length digest. Used for integrity verification:',
            list: [
              'MD5 — 128-bit; deprecated (collision vulnerabilities).',
              'SHA-1 — 160-bit; deprecated.',
              'SHA-256 / SHA-3 — current standards.',
            ],
          },
          {
            heading: 'PKI — Public Key Infrastructure',
            body: 'PKI is the system that manages digital certificates and public key encryption:',
            list: [
              'Certificate Authority (CA) — trusted entity that issues certificates.',
              'Registration Authority (RA) — verifies identity before certificate issuance.',
              'Certificate Revocation List (CRL) — list of revoked certificates.',
              'OCSP (Online Certificate Status Protocol) — real-time certificate status check.',
            ],
          },
        ],
      },
    ],
  },
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
            heading: 'OSI Model (7 Layers)',
            body: 'The Open Systems Interconnection model provides a reference framework for network communication:',
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
            body: 'Dividing a network into segments reduces the attack surface:',
            list: [
              'DMZ (Demilitarized Zone) — a buffer network between the internet and internal network hosting public-facing services.',
              'VLANs (Virtual LANs) — logical segmentation within the same physical infrastructure.',
              'Air Gaps — physical isolation from untrusted networks.',
              'Microsegmentation — fine-grained policies per workload or application.',
            ],
          },
          {
            heading: 'Firewalls',
            body: 'Firewalls control traffic based on rules:',
            list: [
              'Packet Filtering — checks source/destination IP and port; stateless.',
              'Stateful Inspection — tracks connection state; more intelligent.',
              'Application Layer / Proxy Firewall — inspects content at layer 7.',
              'Next-Generation Firewall (NGFW) — deep packet inspection, IDS/IPS, application awareness.',
            ],
          },
          {
            heading: 'VPN and Secure Channels',
            body: 'Virtual Private Networks create encrypted tunnels over untrusted networks:',
            list: [
              'IPSec — operates at Layer 3; two modes: Tunnel (full packet encrypted) and Transport (payload only).',
              'SSL/TLS VPN — operates at Layer 7; browser-based access.',
              'SSH (Secure Shell) — encrypted remote access for command-line operations.',
              'HTTPS — HTTP over TLS; encrypts web traffic.',
            ],
          },
        ],
      },
    ],
  },
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
            body: 'Three fundamental principles of access control:',
            list: [
              'Need-to-Know — restricts access to information strictly based on necessity to perform the job.',
              'Least Privilege — users or systems are granted the minimum level of access necessary for assigned duties.',
              'Separation of Duties — divides responsibilities among multiple individuals to prevent conflicts of interest or misuse of power.',
            ],
            warning: 'These controls apply across all organizational levels and to all asset types. Managers and C-levels are not exempt.',
          },
          {
            heading: 'Access Control Models',
            body: 'Common access control frameworks:',
            list: [
              'DAC (Discretionary Access Control) — resource owners control access; most flexible but least secure.',
              'MAC (Mandatory Access Control) — system-enforced labels and clearances; used in government/military.',
              'RBAC (Role-Based Access Control) — access based on job role; most common in enterprises.',
              'ABAC (Attribute-Based Access Control) — access based on attributes of subject, object, and environment; most flexible.',
              'Rule-Based Access Control — access governed by fixed rules (e.g., firewall ACLs).',
            ],
          },
          {
            heading: 'IAM Approaches',
            body: 'Three approaches to managing identity and access:',
            list: [
              'Centralized IAM — dedicated team oversees all access; rigorous oversight but single point of failure.',
              'Decentralized IAM — access decisions distributed to system/information owners; flexible but inconsistent.',
              'Hybrid IAM — combines both; balances oversight with flexibility.',
            ],
          },
        ],
      },
      {
        id: 'd5t2',
        title: '5.2 Authentication Strategies',
        content: [
          {
            heading: 'Authentication Factors',
            body: 'Three fundamental authentication factor types:',
            list: [
              'Something You Know — passwords, PINs, security questions.',
              'Something You Have — smart cards, hardware tokens, OTP devices.',
              'Something You Are — biometrics (fingerprint, retina, voice).',
            ],
            note: 'Multi-Factor Authentication (MFA) combines two or more factors. Two-Factor Authentication (2FA) uses exactly two factors.',
          },
          {
            heading: 'Password Best Practices',
            body: 'Key password security controls:',
            list: [
              'Minimum length of 12+ characters.',
              'Complexity requirements (uppercase, lowercase, numbers, symbols).',
              'Password history enforcement to prevent reuse.',
              'Account lockout after failed attempts.',
              'Salted hashing for password storage — never store plaintext.',
            ],
          },
          {
            heading: 'Biometrics',
            body: 'Key metrics for evaluating biometric systems:',
            list: [
              'FAR (False Acceptance Rate) — percentage of unauthorized users accepted; lower is better.',
              'FRR (False Rejection Rate) — percentage of authorized users rejected; lower is better.',
              'CER/EER (Crossover Error Rate) — point where FAR = FRR; the lower the CER, the better the system.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'd6',
    number: 6,
    title: 'Security Assessment and Testing',
    summary: 'Covers design of test and audit strategies, security controls testing, data collection, reporting, and security audits.',
    topics: [
      {
        id: 'd6t1',
        title: '6.1 Assessment, Test, and Audit Strategy',
        content: [
          {
            heading: 'Testing vs Assessment vs Audit',
            body: 'Three distinct but complementary activities:',
            list: [
              'Testing — like doing a fire drill. Penetration tests, vulnerability scans, and security functional tests simulate attacks and check what works.',
              'Assessments — broader and more strategic. Evaluate overall security posture, policy adherence, and risk identification. Examples: risk assessments, gap analyses.',
              'Audits — formal and tied to compliance. Check if you\'re actually doing what you say you\'re doing. Follow structured processes to verify controls are in place.',
            ],
            tip: 'We don\'t secure systems by installing firewalls and crossing fingers. We need a feedback loop — a cycle of testing, evaluating, and adjusting.',
          },
          {
            heading: 'Types of Security Testing',
            body: 'Common internal testing methods:',
            list: [
              'Internal Penetration Testing — simulates an attack from someone with internal network access.',
              'Phishing Simulations — tests user awareness and email filter effectiveness.',
              'Vulnerability Scanning — automated tools scan for known weaknesses; less intrusive than pentest.',
              'Tabletop Exercises — simulated incident response discussions; low-tech but high-impact.',
              'Red Team / Blue Team Exercises — red teams attack; blue teams defend in real time.',
            ],
          },
          {
            heading: 'SOC Reports',
            body: 'SOC (System and Organization Controls) reports provide formal security assurance:',
            list: [
              'SOC 1 — financial reporting controls.',
              'SOC 2 — data security and system reliability (five Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, Privacy).',
              'SOC 3 — public summary of SOC 2 findings.',
              'Type 1 — controls in place at a specific point in time.',
              'Type 2 — controls operated effectively over 6–12 months.',
            ],
          },
          {
            heading: 'ISO 27001 Audit',
            body: 'An ISO 27001 audit is a formal review by an independent auditor checking if an organization\'s ISMS meets ISO/IEC 27001 requirements. It involves:',
            list: [
              'Document Review — policies, risk assessments, and security controls against the framework.',
              'Interviews — employees questioned to confirm real-world practices match written processes.',
              'Evidence Check — logs, reports, incident response cases, training activities.',
              'Site Inspection — physical security checks.',
            ],
          },
        ],
      },
      {
        id: 'd6t2',
        title: '6.2 Penetration Testing',
        content: [
          {
            heading: 'Penetration Testing Phases',
            body: 'A structured penetration test follows these phases:',
            list: [
              'Planning and Reconnaissance — define scope, gather OSINT (open source intelligence).',
              'Scanning — active probing with tools like Nmap, Nessus.',
              'Exploitation — attempting to breach identified vulnerabilities.',
              'Post-Exploitation — determine what an attacker could do with access.',
              'Reporting — document findings, risk ratings, and remediation recommendations.',
            ],
          },
          {
            heading: 'Penetration Testing Types',
            body: 'Three approaches based on information provided to the tester:',
            list: [
              'Black Box — no prior knowledge of the target; simulates external attacker.',
              'White Box — full knowledge (architecture, source code); most thorough.',
              'Gray Box — partial knowledge; simulates insider or partner threat.',
            ],
          },
          {
            heading: 'Vulnerability Scanning vs Penetration Testing',
            body: 'Key differences:',
            list: [
              'Vulnerability scanning is automated, identifies known weaknesses, non-exploitative.',
              'Penetration testing simulates real attacks, verifies exploitability, requires skilled human testers.',
              'Scanning is frequent (daily/weekly); pen testing is periodic (annual/bi-annual).',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'd7',
    number: 7,
    title: 'Security Operations',
    summary: 'Covers investigations, logging, monitoring, incident management, patch management, disaster recovery, business continuity, and physical security.',
    topics: [
      {
        id: 'd7t1',
        title: '7.1 Investigations and Digital Forensics',
        content: [
          {
            heading: 'Investigation Types',
            body: 'Four main investigation categories:',
            list: [
              'Administrative / Operational — internal investigations enforcing organizational policies; handled by security teams and HR.',
              'Criminal — law enforcement-led; strict evidence standards; "beyond a reasonable doubt" burden of proof.',
              'Civil — dispute resolution seeking compensation; lower burden of proof ("preponderance of the evidence").',
              'Regulatory — initiated by regulatory bodies to verify compliance.',
            ],
          },
          {
            heading: 'Evidence Types',
            body: 'Four evidence categories:',
            list: [
              'Real Evidence — physical objects (drives, devices, documents).',
              'Documentary Evidence — written or recorded materials (logs, emails, configurations).',
              'Testimonial Evidence — witness statements and expert testimony.',
              'Demonstrative Evidence — visual aids explaining other evidence (diagrams, timelines).',
            ],
          },
          {
            heading: 'Evidence Admissibility Requirements',
            body: 'For evidence to be admissible, it must meet three criteria:',
            list: [
              'Relevance — directly related to the case.',
              'Materiality — significant to the outcome.',
              'Competence — properly collected and handled (chain of custody maintained).',
            ],
          },
          {
            heading: 'Order of Volatility',
            body: 'Digital forensics collects data from most volatile to least volatile:',
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
            note: 'Locard\'s Exchange Principle — "every contact leaves a trace" — underlies all forensic investigation philosophy.',
          },
        ],
      },
      {
        id: 'd7t6',
        title: '7.6 Incident Management',
        content: [
          {
            heading: 'Incident Response Lifecycle',
            body: 'A structured incident response process (NIST SP 800-61):',
            list: [
              'Preparation — establish IR policy, team, tools, and communication plans.',
              'Detection and Analysis — identify and validate incidents; determine scope and severity.',
              'Containment — short-term containment to stop spreading; long-term containment to maintain operations.',
              'Eradication — remove root cause (malware, vulnerabilities, attacker persistence).',
              'Recovery — restore systems; verify normal operation; monitor for re-infection.',
              'Post-Incident Activity — lessons learned; documentation; update controls.',
            ],
          },
          {
            heading: 'Incident Categories',
            body: 'Common incident types:',
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
        id: 'd7t10',
        title: '7.10 – 7.13 Disaster Recovery and Business Continuity',
        content: [
          {
            heading: 'BCP vs DRP',
            body: 'Two complementary but distinct plans:',
            list: [
              'Business Continuity Plan (BCP) — focuses on maintaining critical business functions during and after a disruption. Strategic level.',
              'Disaster Recovery Plan (DRP) — focuses on restoring IT systems and infrastructure after a disaster. Tactical/technical level.',
            ],
          },
          {
            heading: 'Recovery Metrics',
            body: 'Key recovery objectives:',
            list: [
              'RTO (Recovery Time Objective) — the maximum acceptable downtime before restoration must occur.',
              'RPO (Recovery Point Objective) — the maximum acceptable amount of data loss measured in time.',
              'MTD (Maximum Tolerable Downtime) — the longest a business can survive without a critical system.',
            ],
          },
          {
            heading: 'Backup Strategies',
            body: 'Three backup types:',
            list: [
              'Full Backup — complete copy of all data; longest to create, fastest to restore.',
              'Incremental Backup — only data changed since the last backup; fastest to create, slowest to restore (needs all incrementals).',
              'Differential Backup — data changed since the last full backup; balance between speed and restore time.',
            ],
          },
          {
            heading: 'Recovery Sites',
            body: 'Alternative processing site options:',
            list: [
              'Hot Site — fully operational duplicate; immediate failover; most expensive.',
              'Warm Site — partially configured; hours to days to bring online; moderate cost.',
              'Cold Site — empty facility with infrastructure; days to weeks to activate; cheapest.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'd8',
    number: 8,
    title: 'Software Development Security',
    summary: 'Covers SDLC integration, security controls in development ecosystems, software effectiveness, acquired software security, and secure coding.',
    topics: [
      {
        id: 'd8t1',
        title: '8.1 Security in the SDLC',
        content: [
          {
            heading: 'Development Methodologies',
            body: 'Different development approaches have different security implications:',
            list: [
              'Waterfall — sequential phases; security flaws discovered late are expensive to fix. Security requirements must be defined upfront.',
              'Agile / Scrum — iterative sprints; risk that security becomes an afterthought. Mitigation: embed security champions, integrate threat modeling into sprints.',
              'Spiral — hybrid of Waterfall and iterative with risk focus; each cycle includes risk analysis. Ideal for high-stakes systems.',
              'DevOps — continuous integration/delivery; insecure code can rapidly reach production.',
              'DevSecOps — embeds security at every pipeline stage; "shift left" philosophy.',
            ],
          },
          {
            heading: 'Maturity Models',
            body: 'Frameworks for measuring security process maturity:',
            list: [
              'CMM (Capability Maturity Model) — 5 levels from Initial (ad hoc) to Optimizing (continuous improvement).',
              'SAMM (Software Assurance Maturity Model) — OWASP model organized into Governance, Construction, Verification, and Deployment.',
              'IDEAL Model — lifecycle model: Initiating, Diagnosing, Establishing, Acting, Learning.',
            ],
          },
          {
            heading: 'Change Management in SDLC',
            body: 'Structured change management prevents uncontrolled modifications:',
            list: [
              'Request Control — formal documentation of proposed changes.',
              'Change Control — review, evaluation, and approval/rejection with risk assessment.',
              'Release Control — deployment to live environment with testing and scheduling.',
            ],
          },
          {
            heading: 'Secure Coding Principles',
            body: 'Key secure coding guidelines:',
            list: [
              'Input Validation — validate and sanitize all user input to prevent injection attacks.',
              'Output Encoding — encode output to prevent XSS.',
              'Error Handling — never expose stack traces or sensitive info in error messages.',
              'Least Privilege in Code — applications run with only necessary permissions.',
              'Use Parameterized Queries — prevent SQL injection.',
              'Secure Dependency Management — regularly audit and update third-party libraries.',
            ],
          },
          {
            heading: 'Common Application Vulnerabilities (OWASP Top 10)',
            body: 'Most common web application security risks:',
            list: [
              'Broken Access Control — users acting outside intended permissions.',
              'Cryptographic Failures — weak encryption or unencrypted sensitive data.',
              'Injection (SQL, LDAP, OS) — untrusted data sent to interpreters.',
              'Insecure Design — missing or ineffective security controls at design level.',
              'Security Misconfiguration — insecure default configurations.',
              'Vulnerable and Outdated Components — using libraries with known vulnerabilities.',
              'Identification and Authentication Failures — weak session management or passwords.',
              'Software and Data Integrity Failures — insecure deserialization, CI/CD tampering.',
              'Security Logging and Monitoring Failures — inability to detect breaches.',
              'Server-Side Request Forgery (SSRF) — server making requests to unintended locations.',
            ],
          },
        ],
      },
    ],
  },
]
