export type Topic = {
  id: string
  title: string
  content: Section[]
}

export type Question = {
  q: string
  a: string
}

export type Section = {
  subheading?: string
  heading?: string
  body?: string
  list?: string[]
  table?: { headers: string[]; rows: string[][] }
  note?: string
  tip?: string
  warning?: string
  questions?: Question[]
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
          // ── 1.1.1 ──────────────────────────────────────────────────────────
          {
            subheading: '1.1.1 ISC² Code of Professional Ethics',
          },
          {
            heading: 'What Are Ethics?',
            body: 'Ethics refer to a set of moral principles that guide individuals or groups in determining what is right or wrong, good or bad, in a given situation. They often encompass values such as honesty, fairness, integrity, and respect for others. Many professional bodies like ISC² have established codes of ethics that members must adhere to, ensuring ethical conduct in their respective fields.',
            note: 'All CISSP candidates must understand and integrate these ethics into their professional practice both before and after taking the exam. A code of ethics is designed to provide general direction rather than address specific technical situations. Technical skills build systems — ethics keep them worthy of trust.',
          },
          {
            heading: 'Code of Ethics Preamble',
            body: 'The safety and welfare of society and the common good, duty to our principals, and duty to each other, require that we adhere, and be seen to adhere, to the highest ethical standards of behavior. Therefore, strict adherence to this Code is a condition of certification.',
            note: 'Strict adherence is a condition of certification — not merely a recommendation. ISC² members who intentionally or knowingly violate any provision of the Code will be subject to action by a peer review panel, which may result in revocation of certification.',
          },
          {
            heading: 'Code of Ethics Canons (Priority Order)',
            body: 'Four mandatory canons, listed in descending priority. When canons conflict, the higher-ranked canon takes precedence:',
            list: [
              '1 (Highest) — Protect society, the common good, necessary public trust and confidence, and the infrastructure.',
              '2 — Act honorably, honestly, justly, responsibly, and legally.',
              '3 — Provide diligent and competent service to principals.',
              '4 (Lowest) — Advance and protect the profession.',
            ],
            warning: 'Canon priority is a common exam topic. Society always comes first — even above your employer (principals). In daily professional conduct, ethics canons are adhered to in descending order of importance.',
          },
          {
            heading: 'Ethics Complaint Process',
            list: [
              'Filing — anyone (members of the public, employers, colleagues, or other ISC² members) can file a written, specific complaint; anonymous complaints are generally not accepted.',
              'Initial Review — Ethics Committee checks whether the complaint falls under its jurisdiction and has enough information to proceed; frivolous complaints dismissed.',
              'Notification — the respondent is notified and given a chance to respond (preserving due process).',
              'Investigation and Hearing — evidence gathered; a formal hearing may be convened in complex cases.',
              'Decision and Sanctions — private reprimand, public reprimand, suspension of certification, or revocation of certification.',
              'Appeal — member may appeal the decision within a specified timeframe, reviewed by a separate ISC² committee.',
            ],
            questions: [
              { q: 'What are ethics, and how do they relate to professional organizations like ISC²?', a: 'Ethics are moral principles that guide behavior and define right and wrong. Professional organizations like ISC² establish codes of ethics to ensure ethical conduct among their members.' },
              { q: 'What happens to ISC² members who intentionally violate the Code of Ethics?', a: 'ISC² members who intentionally violate the Code of Ethics may face disciplinary action from a peer review panel, including potential revocation of their certification.' },
              { q: 'Explain the purpose of the ISC² Code of Ethics complaint procedure.', a: 'The complaint procedure allows members to report suspected ethical breaches by other members, ensuring accountability and upholding the integrity of the Code.' },
              { q: 'Why are the four canons in the ISC² Code of Ethics considered high-level guidance?', a: 'The four canons offer broad guidelines that require individual ethical judgment and interpretation to apply to specific situations.' },
              { q: 'Summarize the main idea expressed in the ISC² Code of Ethics Preamble.', a: 'The Preamble emphasizes the importance of ethical behavior for the safety and well-being of society, individuals, and the profession itself.' },
              { q: 'According to the first canon, what are ISC² members obligated to protect?', a: 'ISC² members are obligated to protect society, the common good, public trust and confidence, and critical infrastructure.' },
              { q: 'What values are emphasized in the second canon of the ISC² Code of Ethics?', a: 'The second canon stresses the values of honor, honesty, justice, responsibility, and legality in all professional actions.' },
              { q: 'What responsibility do ISC² members have towards their principals according to the third canon?', a: 'ISC² members must provide diligent and competent service to their principals, demonstrating professionalism and commitment to their clients\' needs.' },
              { q: 'What is the significance of the fourth canon in relation to the information security profession?', a: 'The fourth canon emphasizes the continuous development and protection of the information security profession through knowledge sharing and ethical practice.' },
              { q: 'How does adherence to the ISC² Code of Ethics benefit both individuals and the profession as a whole?', a: 'Adherence to the Code upholds the reputation of the profession, builds trust among stakeholders, and ensures ethical and responsible conduct, ultimately benefiting both individuals and the collective.' },
            ],
          },
          // ── 1.1.2 ──────────────────────────────────────────────────────────
          {
            subheading: '1.1.2 Organizational Code of Ethics',
          },
          {
            heading: 'Ten Commandments of Computer Ethics (Computer Ethics Institute)',
            body: 'The framework for ethical computing practice provided by the Computer Ethics Institute has been extensively employed in formulating acceptable use policies and educating users about the proper utilization of computing resources.',
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
            body: 'The IEEE Code of Ethics guides the ethical behavior of its members, ensuring integrity, accountability, and fairness while promoting the welfare of society. Members commit to:',
            list: [
              'Hold paramount the safety, health, and welfare of the public; strive to comply with ethical design and sustainable development practices.',
              'Improve understanding by individuals and society of the capabilities and societal implications of conventional and emerging technologies.',
              'Avoid real or perceived conflicts of interest whenever possible; disclose them to affected parties when they do exist.',
              'Avoid unlawful conduct in professional activities and reject bribery in all its forms.',
              'Seek, accept, and offer honest criticism of technical work; acknowledge and correct errors; credit properly the contributions of others.',
              'Maintain and improve technical competence; undertake technological tasks only if qualified or after full disclosure of limitations.',
              'Treat all persons fairly and with respect; not engage in discrimination based on race, religion, gender, disability, age, national origin, sexual orientation, gender identity, or gender expression.',
              'Not engage in harassment of any kind, including sexual harassment or bullying behavior.',
              'Avoid injuring others, their property, reputation, or employment by false or malicious actions.',
              'Support colleagues and co-workers in following this code; not retaliate against individuals reporting a violation.',
            ],
          },
          {
            heading: 'RFC 1087 — Ethics and the Internet',
            body: 'RFC 1087 ("Ethics and the Internet") was published when the internet was primarily used for academic, research, and governmental purposes. Its core message: the Internet is a privileged resource built for the advancement of research and education — anyone using it must uphold ethical conduct. RFC 1087 considers the following behaviors unethical:',
            list: [
              'Unauthorized access to network resources.',
              'Disruption of the intended use of the network.',
              'Waste of resources such as bandwidth or processing power.',
              'Destruction or alteration of information.',
              'Compromise of privacy of users.',
            ],
            questions: [
              { q: 'What is the primary function of the Computer Ethics Institute\'s "Ten Commandments of Computer Ethics"?', a: 'The "Ten Commandments of Computer Ethics" serve as guidelines for ethical computer use, helping to establish acceptable use policies and educating individuals on responsible utilization of computing resources.' },
              { q: 'How does the IEEE Code of Ethics promote societal well-being in relation to technological advancements?', a: 'The IEEE Code of Ethics promotes societal well-being by emphasizing ethical design, sustainable development practices, and the consideration of societal implications, ensuring technology benefits humanity.' },
              { q: 'According to the "Ten Commandments of Computer Ethics," what obligation do individuals have regarding software ownership?', a: 'The guidelines state individuals should not copy or use proprietary software without proper payment, respecting intellectual property rights and legal ownership.' },
              { q: 'Explain the concept of "intellectual output" and its protection as outlined in the Computer Ethics Institute\'s guidelines.', a: '"Intellectual output" refers to creative works and ideas generated by individuals. The guidelines emphasize respecting ownership and prohibiting appropriation without permission or proper compensation.' },
              { q: 'Why is it crucial for computer professionals to consider the societal consequences of their work?', a: 'Considering societal consequences is crucial to ensure technology is used responsibly, minimizing negative impacts and maximizing positive contributions to society.' },
              { q: 'What commitment does the IEEE Code of Ethics make regarding the safety and well-being of the public?', a: 'The IEEE Code of Ethics prioritizes the safety, health, and welfare of the public above all else, urging members to consider potential risks and act responsibly.' },
              { q: 'How does the IEEE Code of Ethics address the issue of potential conflicts of interest in professional settings?', a: 'The code mandates disclosing any real or perceived conflicts of interest to affected parties, promoting transparency and ethical decision-making.' },
              { q: 'Explain the importance of honest criticism and acknowledging errors within the framework of the IEEE Code of Ethics.', a: 'Honest criticism and acknowledging errors fosters improvement and knowledge sharing within the profession, contributing to overall progress and accountability.' },
              { q: 'How does the IEEE Code of Ethics promote fairness and inclusivity in professional environments?', a: 'The code explicitly prohibits discrimination and harassment based on various characteristics, ensuring a fair and inclusive environment for all individuals.' },
              { q: 'What responsibility do IEEE members have towards upholding the code of ethics among their colleagues and coworkers?', a: 'IEEE members are obligated to support colleagues in upholding the code and to report any violations without fear of retaliation, fostering a culture of ethical conduct.' },
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
            heading: 'IAAA / IAAAA Framework',
            list: [
              'Identification — claiming an identity (username, ID number).',
              'Authentication — verifying the claimed identity (passwords, biometrics, tokens).',
              'Authorization — determining access rights and permissions.',
              'Accountability — tracking and recording activities; auditing and logging.',
              'Auditing (5th A) — retrospective, periodic review of logs to detect policy violations.',
            ],
            note: 'Auditing is retrospective (periodic log review). Monitoring is real-time observation. Some frameworks extend IAAA to IAAAA by treating Auditing as distinct from Accountability.',
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
            body: 'Security Governance is the framework of practices and processes through which an organization plans, supports, evaluates, and manages its security efforts. Security must be baked into the company: its software, processes, policies, departments, and personnel.',
            list: [
              'Governance — ensuring activities support business goals.',
              'Risk — identification and management of risks.',
              'Compliance — adherence to regulations and policies.',
            ],
            note: 'A top-down approach is most effective — it establishes a culture of security from the highest levels of the organization down to individual employees.',
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
            body: 'Key distinctions: Data Loss (accidental), Data Leak (unintentional exposure), Data Breach (unauthorized access — ultimate breakdown of the CIA triad). A breach triggers legal liabilities, regulatory fines, and long-term erosion of organizational trust. Every breach should be treated as a lessons-learned opportunity to refine Incident Response procedures.',
            note: 'Security measures deter cyber intrusions by making attacks unprofitable, labor-intensive, and cost-prohibitive. Complete invulnerability is impossible — the goal is adequate protection.',
          },
          {
            heading: 'US Federal Cybercrime Laws',
            table: {
              headers: ['Law', 'Year', 'Key Provisions'],
              rows: [
                ['Computer Crime and Abuse Act (CCCA)', '1984', 'Prohibited unauthorized access to classified/financial federal systems; damage threshold $1,000; trafficking computer passwords'],
                ['Computer Fraud and Abuse Act (CFAA)', '1986', 'Extended CCCA; raised damage threshold to $5,000; expanded scope to all "federal interest" computers including financial institutions'],
                ['CFAA Amendments (Computer Abuse Amendments Act)', '1994', 'Prohibited malicious code creation; allowed imprisonment regardless of intent; enabled civil remedies for victims'],
                ['National Information Infrastructure Protection Act', '1996', 'Extended CFAA to international commerce; protected critical infrastructure (railroads, pipelines, power grids, telecom); intentional damage = felony'],
                ['FISMA', '2002', 'Mandated NIST to define security standards; required periodic risk assessments, security policy, training, incident response, and continuity planning'],
                ['Federal Cybersecurity Laws (modernization)', '2014', 'DHS took primary responsibility; NIST tasked with voluntary standards (SP 800 series); created National Cybersecurity and Communications Integration Center'],
              ],
            },
            note: 'Many computer-related crimes cross state lines and fall under federal jurisdiction. Some state laws impose more stringent penalties than federal laws.',
          },
          {
            heading: 'Intellectual Property Types',
            table: {
              headers: ['Symbol', 'Name', 'Duration', 'Applies To', 'Common Attack'],
              rows: [
                ['©', 'Copyright', 'Life + 70 years; work-for-hire: 95 years from publication', 'Literary, musical, dramatic, pictorial, architectural, software works', 'Piracy — unauthorized copying'],
                ['™ / ®', 'Trademark', '10 years, renewable indefinitely', 'Words, slogans, logos identifying a brand', 'Counterfeiting; Dilution (generic use of brand name)'],
                ['(none)', 'Patent', '20 years', 'Processes, machines, manufactured items; must be new, useful, non-obvious', 'Infringement — unauthorized use even if unintentional'],
                ['(none)', 'Trade Secret', 'Indefinite (while kept secret)', 'Confidential business info: formulas, recipes, processes; enforced via NDA/NCA', 'Espionage — theft for competitive advantage'],
              ],
            },
            note: 'A patent is the strongest form of IP protection. The DMCA (1998) criminalizes circumvention of copyright protection measures and provides safe harbors for platforms with a notice-and-takedown procedure. Ownership of works created by employees defaults to the employer (work-for-hire).',
          },
          {
            heading: 'Software Licensing Types',
            table: {
              headers: ['License Type', 'Description'],
              rows: [
                ['Contractual', 'Written contract negotiated between vendor and customer; used for expensive/specialized software'],
                ['Shrink-wrap', 'Terms printed on packaging; opening the shrink-wrap implies acceptance'],
                ['Click-through (Browser Wrap)', 'Terms shown on-screen; user clicks "I agree" during installation'],
                ['Cloud Services', 'Extends click-through; terms displayed on-screen, often without a separate written contract'],
                ['Perpetual', 'One-time purchase granting indefinite use rights; support/updates may expire separately'],
                ['Subscription', 'Recurring payment (monthly/yearly); access ends if subscription lapses'],
                ['Open-Source', 'Source code freely available under conditions (GPL, MIT, Apache, etc.)'],
                ['Freeware', 'Free to use but typically closed-source; restrictions on modification and commercial use'],
                ['Enterprise License Agreement (ELA)', 'Custom agreement for large organizations bundling multiple licenses under negotiated terms'],
                ['EULA (End User License Agreement)', 'Legal contract defining how the end user may use the software'],
                ['Concurrent Use', 'Specific number of simultaneous users permitted regardless of total installs'],
                ['Named User', 'Assigned to a specific individual; usable on multiple devices but non-transferable'],
              ],
            },
            warning: 'In shrink-wrap and click-through agreements the customer\'s only option is to accept or decline — there is no negotiation. This contrasts with contractual agreements where terms can be actively negotiated.',
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
            heading: 'Transborder Data Flow',
            table: {
              headers: ['Concept', 'Definition', 'Key Focus', 'Distinction'],
              rows: [
                ['Data Sovereignty', 'Extent to which data is subject to a country\'s laws, regardless of where it is stored', 'Legal jurisdiction and compliance', 'About who has authority over the data, not where it is stored; distinct from data privacy'],
                ['Data Residency', 'Physical/geographical location where data is stored and processed', 'Location-based legal compliance', 'Focuses on where data lives; supports sovereignty but does not define legal control'],
                ['Data Localization', 'Requirement to store and process data strictly within a country\'s borders', 'National control and security', 'Strict form of data residency; legally enforces that data cannot cross borders'],
              ],
            },
            note: 'CISOs must categorize and chart organizational data, identify its storage/movement, understand sensitivity, location, legal obligations, and third-party involvement.',
          },
          {
            heading: 'International Privacy Frameworks',
            table: {
              headers: ['Framework', 'Description'],
              rows: [
                ['Universal Declaration of Human Rights', 'Everyone is entitled to protection against arbitrary intrusion into their privacy, family life, home, or correspondence'],
                ['OECD Privacy Principles', 'Eight principles: lawful collection, data quality, purpose specification, use limitation, security safeguards, openness, individual participation, accountability — widely adopted in international privacy laws'],
                ['APEC Privacy Framework', 'Emphasizes protection of PII during cross-border transfers; introduces proportionality in data breach penalties and organizational accountability'],
              ],
            },
          },
          {
            heading: 'Major Privacy Laws',
            table: {
              headers: ['Law', 'Jurisdiction', 'Key Points'],
              rows: [
                ['GDPR', 'EU / EEA', 'Consent required; data subject rights; breach notification; fines up to €20M or 4% of global annual turnover'],
                ['CCPA', 'California, USA', 'Rights to access, delete, opt-out of sale; applies to companies with $25M+ revenue or large data volumes'],
                ['PIPL', 'China', 'Explicit consent; data localization; cross-border transfer restrictions; fines up to ¥50M or 5% of annual revenue'],
                ['POPIA', 'South Africa', 'Lawful data processing conditions; breach notification; heavy fines or imprisonment for contraventions'],
              ],
            },
          },
          {
            heading: 'Key Privacy Concepts',
            table: {
              headers: ['Term', 'Definition'],
              rows: [
                ['Data Controller (Data Owner)', 'Determines the purposes and means of processing personal data'],
                ['Data Processor', 'Processes personal data on behalf of the controller'],
                ['Data Protection Officer (DPO)', 'Individual designated to oversee data protection and privacy compliance within an organization'],
                ['Data Custodian', 'Implements and maintains safeguards for data based on data owner instructions'],
                ['Data Subject', 'The individual to whom personal data relates'],
                ['Personal Data', 'Any information relating to an identified or identifiable natural person'],
                ['Processing', 'Any operation performed on personal data: collection, storage, use, disclosure, erasure, etc.'],
              ],
            },
          },
          {
            heading: 'Privacy Impact Assessment (PIA / DPIA)',
            body: 'A PIA is a process conducted by an organization to assess whether personal data is adequately protected and to mitigate potential risks. Steps: identify need → describe processing → evaluate necessity → consult stakeholders → identify risks → implement mitigations → document → monitor.',
            list: [
              'PIA — broad term used globally (US, Canada) for any privacy risk assessment.',
              'DPIA (Data Protection Impact Assessment) — GDPR-specific; mandatory for processing likely to result in high risk to individuals\' rights.',
              'Data Privacy Impact Assessment — hybrid term combining both PIA and DPIA aspects.',
            ],
            tip: 'Remember that a PIA is a process conducted by an organization to assess whether personal data is adequately protected — the exact 8 steps are less important than the concept.',
          },
          {
            heading: 'Contractual, Legal, Industry Standards, and Regulatory Requirements',
            table: {
              headers: ['Type', 'Description', 'Examples'],
              rows: [
                ['Contractual', 'Obligations outlined in agreements between parties', 'SLAs, vendor contracts, NDAs'],
                ['Legal — Criminal Law', 'Regulations against offenses like homicide, assault, theft, arson', 'CFAA, Computer Misuse Act'],
                ['Legal — Civil (Tort) Law', 'Contractual disputes, property, employment, estate matters', 'Breach of contract, negligence claims'],
                ['Legal — Administrative Law', 'Grants government bodies power to establish regulations', 'GDPR enforcement by supervisory authorities'],
                ['Industry Standards', 'Guidelines and best practices from professional bodies', 'ISO 27001, NIST CSF, PCI DSS'],
                ['Regulatory', 'Mandates from government agencies ensuring sector compliance', 'PCI DSS (enforced), SOX, HIPAA'],
              ],
            },
          },
          {
            heading: 'Standards vs Frameworks vs Regulations vs Laws',
            table: {
              headers: ['Feature', 'Standard', 'Framework', 'Regulation', 'Law'],
              rows: [
                ['Examples', 'ISO 27001, NIST SP 800-53', 'NIST CSF, COBIT, CIS Controls', 'GDPR, HIPAA, PCI DSS (enforced)', 'Data Protection Act, CFAA'],
                ['Purpose', 'Define best practices or benchmarks', 'Guide implementation of security', 'Enforce legal compliance, protect data', 'Regulate behavior, ensure national security'],
                ['Compliance', 'Voluntary; leads to certification', 'Voluntary but recommended', 'Legally enforced with penalties', 'Enforced by government; legal penalties'],
                ['Assessment', 'Audits for certification', 'Self-assessment or third-party', 'Regulatory audits by government bodies', 'Legal audits, court orders'],
              ],
            },
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
            heading: 'BCM, BCP, and DRP Relationship',
            list: [
              'BCM (Business Continuity Management) — the management process that covers both BCP and DRP.',
              'BCP — strategically focused at a high level; centers on business processes and operations; active throughout the entire duration of a disruption.',
              'DRP — more tactical; describes technical activities (recovery sites, backups, fault tolerance); carried out while still in emergency.',
            ],
            note: 'The top priority of both BCP and DR is people. Always prioritize people\'s safety before addressing IT recovery.',
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
            table: {
              headers: ['Metric', 'Full Name', 'Definition'],
              rows: [
                ['MTD', 'Maximum Tolerable Downtime', 'Maximum duration a business process can be unavailable before causing severe damage to the company'],
                ['RPO', 'Recovery Point Objective', 'Acceptable amount of data loss in case of disaster; specifies the point in time to which data must be restored'],
                ['RTO', 'Recovery Time Objective', 'Target time for restoring a system, application, or process after a disruption'],
                ['WRT', 'Work Recovery Time', 'Time needed for testing and verifying restored systems before they go live after recovery'],
              ],
            },
            note: 'MTD = RTO + WRT. If RTO is 1 hour and WRT is 30 minutes, MTD must be at least 1.5 hours.',
          },
          {
            heading: 'BIA — Critical Business Functions',
            body: 'The Business Impact Analysis identifies Critical Business Functions (CBFs) — systems and processes whose disruption would most harm the organization. Key elements to consider when identifying CBFs:',
            list: [
              'Personnel — key individuals and their roles in maintaining critical operations.',
              'Business Processes — essential processes that drive revenue or ensure continuity.',
              'Information Systems and Applications — critical IT systems supporting core functions.',
              'Other Assets — physical assets, intellectual property, or resources vital to operations.',
            ],
            note: 'Executive support is crucial for BCP — initiatives may not yield immediate returns but are vital for long-term resilience.',
          },
          {
            heading: 'External Dependencies in BCP',
            body: 'External dependencies directly impact an organization\'s ability to recover during disruptions. Key considerations:',
            list: [
              'Vendors — cloud providers, hardware suppliers, software vendors; contracts must include robust SLAs for crisis support.',
              'Legal and Regulatory Requirements — may mandate specific recovery times or data protection measures in regulated industries.',
              'Client SLA Alignment — BCP must ensure the organization can meet its own SLAs to clients even during disruptions.',
            ],
          },
        ],
      },
      {
        id: 'd1t8',
        title: '1.8 Personnel Security',
        content: [
          {
            heading: 'People as Security Asset and Weakest Link',
            body: 'People are frequently perceived as the weakest link in any security framework — susceptible to phishing, spear phishing, and social engineering. However, with proper training they also serve as a crucial security asset.',
            list: [
              'Phishing — broad scam where attackers pose as trustworthy entities via email, text, or website to trick individuals into revealing sensitive information.',
              'Spear Phishing — highly targeted form of phishing using researched, personalized messages; dramatically increases success rate.',
            ],
            warning: 'Never refer to personnel as "the weakest link" — it demotivates. Instead, empower them by emphasizing that organizational security relies on their vigilance.',
          },
          {
            heading: 'Job Descriptions and Security',
            body: 'Security starts before an employee joins. A well-defined job description helps outline security expectations, support background checks, and reduce insider threats.',
            table: {
              headers: ['Category', 'Component', 'Security Value'],
              rows: [
                ['Why It Matters', 'Security Expectations', 'Candidates understand duty to protect sensitive data from Day 1'],
                ['Why It Matters', 'Background Checks', 'Provides benchmark to verify candidate history against role risk level'],
                ['Why It Matters', 'Threat Mitigation', 'Filters for security-aware, qualified individuals — reduces insider threats'],
                ['Essential Elements', 'Job Title', 'Establishes clear identity and hierarchy'],
                ['Essential Elements', 'Duties & Tasks', 'Defines specific actions with no gray areas'],
                ['Essential Elements', 'Security Responsibilities', 'Explicitly links the role to cybersecurity policies'],
                ['Impact on Operations', 'Access Control', 'Justifies level of access based on defined duties (Least Privilege)'],
              ],
            },
          },
          {
            heading: 'Pre-Employment Screening',
            body: 'Organizations need comprehensive policies covering job descriptions, background checks, reference verification, and security clearances. Screening intensity should match role sensitivity and risk level while respecting legal boundaries.',
            list: [
              'Permitted: background checks, reference checks, education verification, legally required security clearances.',
              'Restricted/Illegal: discriminatory questions (race, religion, gender, marital status), invasive personal data without consent, medical/genetic testing unless legally justified.',
            ],
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
            heading: 'Employment Agreements and Policy Controls',
            body: 'Employment agreements outline job responsibilities, compensation, benefits, and termination details. Comprehensiveness reduces legal risk (e.g., wrongful termination lawsuits). Personnel policies are reinforced by:',
            list: [
              'Non-compete agreements (NCA) — restrict working for competitors after leaving.',
              'Acceptable Use Policy (AUP) — dictates proper use of company resources.',
              'Non-disclosure agreements (NDA) — safeguard confidential information.',
              'Ethical guideline questionnaires and agreements.',
              'Vendor, consultant, and contractor agreements and controls.',
            ],
          },
          {
            heading: 'UBA and UEBA',
            body: 'User Behavior Analytics (UBA) analyzes patterns in user activities to detect anomalous or potentially malicious behavior. User and Entity Behavior Analytics (UEBA) expands on UBA by including system entity behavior (servers, IoT devices, applications).',
            list: [
              'UBA — detects insider threats, compromised accounts, data exfiltration by monitoring how users normally interact with systems.',
              'UEBA — adds entity behavior; can detect threats involving automated systems even without a human trigger.',
              'Benefits: detecting insider threats, preventing data breaches, reducing false positives via ML, improving incident response speed.',
            ],
            note: 'Example: an employee who typically accesses records during business hours suddenly downloading large volumes of data at midnight would be flagged by UBA.',
          },
          {
            heading: 'Third-Party Management',
            body: 'When outsourcing, establish controls for: access, document exchange, maintenance standards, on-site assessments, policy reviews, and Service Level Agreements.',
            list: [
              'Vendor Management System (VMS) — software platform automating vendor selection, onboarding, performance tracking, contract management, and compliance monitoring.',
              'Multiparty Risk — security and operational risks arising when multiple organizations, vendors, or third parties are involved in a shared business process or supply chain.',
            ],
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
          {
            heading: 'Security Control Classification',
            table: {
              headers: ['By Type', 'Description', 'By Function', 'Description'],
              rows: [
                ['Physical', 'Tangible measures protecting physical systems (locks, fences, guards)', 'Preventive', 'Stop unwanted activity before it occurs'],
                ['Technical', 'Technology-based protections (firewalls, encryption, IDS)', 'Detective', 'Identify and alert to unauthorized activity'],
                ['Administrative', 'Policy-based measures and organizational procedures', 'Corrective', 'Repair damage and restore resources after an incident'],
              ],
            },
            note: 'Detective and preventive controls are complementary. Implementing controls in layers creates defense in depth. Security controls must offer measurable benefits to justify their implementation.',
          },
          {
            heading: 'Security Control Assessment (SCA)',
            body: 'A Security Control Assessment formally evaluates infrastructure components against established standards. It assesses control effectiveness, risk management processes, and generates reports identifying strengths and weaknesses. Effectiveness requires monitoring events before and after implementation to measure actual improvement.',
          },
          {
            heading: 'Risk Reporting and Tracking',
            list: [
              'Risk Register — inventory tracking identified risks, their ratings, owners, and mitigation activities.',
              'Risk Matrix / Heat Map — visual representation of likelihood versus impact; helps prioritize risks.',
              'Risk Capacity — maximum risk an organization can absorb before viability is threatened.',
              'Risk Tolerance — acceptable variation from the risk appetite the organization is willing to accept.',
              'Risk Appetite — amount and type of risk an organization is willing to pursue or retain.',
            ],
            note: 'Risk reports should be accurate, timely, and clear, and regularly updated as the risk landscape evolves.',
          },
          {
            heading: 'Risk Maturity Model',
            body: 'Evaluates organizational capability to manage risk across five levels, progressing from reactive to proactive:',
            list: [
              'Level 1 — Ad hoc: no repeatable process; risks addressed reactively.',
              'Level 2 — Preliminary: some processes exist but inconsistently applied.',
              'Level 3 — Defined: documented, standardized risk management processes.',
              'Level 4 — Integrated: risk management embedded across the organization.',
              'Level 5 — Optimized: continuous improvement; risk management drives strategic decisions.',
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
            heading: 'SCRM Risk Mitigation Approaches',
            list: [
              'Third-Party Assessments — on-site visits (physical security and operations) and document reviews (architecture and policies); depth of assessment correlates with closeness of partnership.',
              'Minimum Security Requirements — establish baseline security standards to prevent vulnerabilities from propagating through integrated systems.',
              'Service Level Agreements — align SLAs with organizational expectations and existing partner commitments to ensure operational compatibility.',
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
              'Security champions — designated individuals who advocate for security culture within their teams.',
              'Gamification — interactive elements, scoring, and rewards to increase engagement and knowledge retention.',
              'Microtraining — focused modules under 5 minutes; ideal for reinforcing specific concepts (e.g., password hygiene) within daily workflows.',
              'Standard training — comprehensive multi-hour sessions for foundational learning during onboarding; works best combined with ongoing microtraining.',
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
      {
        id: 'd1t13',
        title: '1.13 AI Governance, Ethics, and Strategic Risk Integration',
        content: [
          {
            heading: 'AI as an Organizational Risk',
            body: 'Organizations must treat AI assets as first-class citizens within existing Enterprise Risk Management frameworks. AI is not just new software — it is a fundamental organizational risk that requires governance, ethics oversight, and supply chain evaluation.',
          },
          {
            heading: 'Key Governance Areas',
            table: {
              headers: ['Control Area', 'Description'],
              rows: [
                ['Right to Audit', 'Organizations must be able to audit AI provider practices and models.'],
                ['Data Usage Rights', 'Clear agreements on how training data is used, stored, and shared.'],
                ['Model Versioning', 'Track model changes to understand how decisions evolve over time.'],
                ['Exit Strategy', 'Plans to migrate away from an AI provider without losing capability.'],
              ],
            },
          },
          {
            heading: 'Ethics and Algorithmic Bias',
            list: [
              'Bias Sources — training data that reflects historical inequalities can perpetuate discrimination.',
              'Transparency and Explainability — AI decisions must be auditable; "black box" outputs create accountability gaps.',
              'Human-in-the-Loop — high-stakes decisions (hiring, credit, medical) require human oversight before action.',
              'Fairness Testing — regularly audit model outputs for disparate impact across protected groups.',
            ],
          },
          {
            heading: 'Privacy and Legal Compliance',
            list: [
              'Data Minimization — only collect and use data strictly necessary for the AI objective.',
              'Differential Privacy — add mathematical noise to datasets to prevent individual re-identification.',
              'Intellectual Property Rights — AI-generated outputs may have unclear ownership; review licensing.',
              'AI Bill of Materials (AIBOM) — inventory of all components, datasets, and models used in an AI system.',
            ],
          },
          {
            heading: 'AI Supply Chain Evaluation',
            list: [
              'Data Sourcing — verify the provenance and integrity of training datasets from third parties.',
              'Provider Resilience — assess vendor financial stability, security posture, and incident history.',
              'Due Diligence Requirements — apply the same third-party risk management rigor to AI providers as to other critical vendors.',
              'Shadow AI — unsanctioned use of AI tools by employees creates uncontrolled data exposure and governance gaps.',
            ],
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
      {
        id: 'd2t7',
        title: '2.7 Asset Security in the Age of AI',
        content: [
          {
            heading: 'AI-Specific Asset Classification',
            body: 'In an AI-driven enterprise, the asset inventory must expand beyond traditional files, databases, and hardware. New asset types require classification and protection:',
            list: [
              'Training Datasets — contain corporate data or PII; must be classified at the highest level of confidentiality and integrity.',
              'Model Weights and Parameters — represent the learned logic and IP of the AI; theft allows adversaries to replicate the model.',
              'Pre-trained Models — third-party models must be treated as untrusted supply-chain assets until integrity is verified.',
            ],
          },
          {
            heading: 'Data Poisoning',
            body: 'Data Poisoning is a strategic attack where an adversary injects "toxic" data into a training set, creating a backdoor trigger that causes the model to fail or behave maliciously on specific inputs.',
            list: [
              'Control: Implement strict Data Provenance — track the origin of every dataset.',
              'Control: Use Digital Signatures for datasets to detect tampering throughout the lifecycle.',
              'Control: Perform statistical outlier detection to identify toxic inputs before training begins.',
            ],
          },
          {
            heading: 'Privacy Controls in AI Environments',
            table: {
              headers: ['Control', 'Description', 'Limitation'],
              rows: [
                ['Data Masking', 'Replaces sensitive fields with placeholder values', 'AI can sometimes re-identify individuals by correlating other data points'],
                ['Differential Privacy', 'Adds mathematical noise to datasets', 'Gold standard; ensures model learns trends without memorizing individuals'],
                ['Data Minimization', 'Collect only attributes required for the AI objective', 'Reduces PII exposure in training pipelines'],
              ],
            },
          },
          {
            heading: 'AI Data Lifecycle',
            list: [
              'Collection — apply data minimization; strip unnecessary PII before training.',
              'Storage — apply classification, access controls, and encryption to training datasets.',
              'Destruction — "Machine Unlearning" is an emerging challenge: removing specific data influence from a trained model without retraining from scratch.',
              'GDPR Right to Erasure — compliance requires a plan for removing individual data influence from deployed AI models.',
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
        id: 'd3t4',
        title: '3.4 Security Capabilities of Information Systems',
        content: [
          {
            heading: 'Memory Protection Mechanisms',
            list: [
              'Segmentation — divides memory into sections with defined access permissions (read, write, execute).',
              'Paging — breaks memory into fixed-size pages; OS controls access via page table.',
              'Virtual Memory — allows applications to use more memory than physically available; prevents process interference.',
              'Data Execution Prevention (DEP) — prevents execution of code stored in data-only memory regions; blocks buffer overflow attacks.',
              'Address Space Layout Randomization (ASLR) — randomizes memory addresses to make injection attacks harder.',
            ],
          },
          {
            heading: 'Trusted Platform Module (TPM)',
            body: 'A dedicated security chip on the motherboard providing hardware-based cryptographic operations, secure key storage, and system integrity verification.',
            table: {
              headers: ['Feature', 'TPM Capability', 'Limitation'],
              rows: [
                ['Boot Integrity', 'Measures boot components; detects unauthorized changes (Measured Boot)', 'Cannot prevent tampering — only detects it'],
                ['Key Protection', 'Stores keys in hardware; resistant to software attacks', 'Keys tied to device — recovery is complex if motherboard fails'],
                ['Disk Encryption', 'Enhances BitLocker/LUKS — keys released only if system integrity is verified', 'Dependent on OS integration; TPM alone does not encrypt data'],
                ['Attestation', 'Cryptographic proof the system booted into a trusted state', 'Remote attestation requires supporting infrastructure'],
              ],
            },
            note: 'TPM 2.0 improves on 1.2 with SHA-256, ECC support, and enhanced authorization mechanisms.',
          },
          {
            heading: 'Hardware Security Module (HSM)',
            body: 'Specialized hardware device for enterprise-scale cryptographic key management. Physically protects keys, processes encryption in an isolated environment, and resists tampering.',
            table: {
              headers: ['Feature', 'TPM', 'HSM'],
              rows: [
                ['Primary Purpose', 'Hardware root of trust for single device', 'Enterprise key management and cryptography'],
                ['Deployment', 'Integrated on motherboard', 'External device, appliance, or network-attached'],
                ['Key Storage', 'Device-level (boot, disk encryption)', 'Enterprise keys, certificates, PKI'],
                ['Scope', 'Single device', 'Organization-wide'],
                ['Use Case', 'Secure Boot, BitLocker', 'Certificate Authority, database encryption, SSL/TLS'],
              ],
            },
          },
          {
            heading: 'Cryptographic Modules',
            list: [
              'FIPS 140-2/140-3 — US government standard defining security levels 1–4 for cryptographic modules.',
              'Common Criteria (ISO 15408) — evaluates cryptographic module security and effectiveness.',
              'Functions: encryption/decryption, hashing (SHA-256), key management, digital signatures.',
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
      {
        id: 'd3t10',
        title: '3.10 Manage the Information System Lifecycle',
        content: [
          {
            heading: 'System Lifecycle Phases',
            table: {
              headers: ['Phase', 'Security Focus'],
              rows: [
                ['Stakeholders\' Needs & Requirements', 'Engage users, business leaders, IT, and regulators to define security expectations.'],
                ['Requirements Analysis', 'Convert needs into actionable security specifications; align with NIST and ISO 27001.'],
                ['Architectural Design', 'Create security frameworks with defense-in-depth: firewalls, IDS, secure communication channels.'],
                ['Development / Implementation', 'Apply secure coding practices, code reviews, and integrate WAFs.'],
                ['Integration', 'Combine components while maintaining security protocols; conduct penetration testing.'],
                ['Verification and Validation', 'Test security features and regulatory compliance; run vulnerability scans.'],
                ['Transition / Deployment', 'Secure configurations, apply patches, prepare rollback plans.'],
                ['Operations and Maintenance', 'Ongoing monitoring, patch management, SIEM platforms, threat intelligence.'],
                ['Retirement / Disposal', 'Secure decommission: data wiping, degaussing, physical destruction; comply with GDPR and HIPAA.'],
              ],
            },
          },
        ],
      },
      {
        id: 'd3t11',
        title: '3.11 Architecting Trust — Engineering Secure AI Environments',
        content: [
          {
            heading: 'Secure Enclaves (Trusted Execution Environments)',
            body: 'AI workloads require GPUs and TPUs handling sensitive data and proprietary models. Secure Enclaves create a "system within a system" where data is encrypted even during processing in CPU/GPU memory. The Hardware Root of Trust verifies infrastructure integrity before execution to prevent rootkits.',
          },
          {
            heading: 'Prompt Injection Defense',
            body: 'Prompt Injection is the AI equivalent of SQL injection — users craft inputs that override the AI\'s safety rules. Every prompt must be treated as untrusted data.',
            list: [
              'Preprocessing layers — strip malicious code and hidden characters from inputs.',
              'Adversarial Training — train models to recognize and ignore jailbreak attempts.',
              'Input validation — analyze semantic intent, not just syntax.',
            ],
          },
          {
            heading: 'Shared Responsibility in Cloud AI',
            table: {
              headers: ['Layer', 'Responsibility', 'Entity'],
              rows: [
                ['Physical Infrastructure', 'Data centers, cooling, hardware security', 'Cloud Provider'],
                ['Base Model (Foundation)', 'Preventing bias and training data leaks', 'Cloud Provider'],
                ['Application & Prompt', 'How the AI is used and what data it accesses', 'Customer'],
                ['Output Monitoring', 'Reviewing AI results for hallucinations or leaks', 'Customer'],
              ],
            },
          },
          {
            heading: 'Explainable AI (XAI)',
            body: 'XAI is the security requirement that forces an AI system to provide a "reasoning path." Without auditability, an AI decision is a security risk — if you can\'t audit it, you can\'t verify it wasn\'t poisoned. XAI turns AI behavior into readable logs for incident response.',
          },
          {
            heading: 'AI Resilience Risks',
            list: [
              'Complexity Attacks — adversarially crafted prompts designed to max out GPU resources and crash the system (DoS).',
              'Neural networks must be architectured to throttle abusive requests.',
              'AI should not be a single point of failure for enterprise operations.',
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
      {
        id: 'd4t4',
        title: '4.4 Securing AI Data in Motion and Intelligent Network Defense',
        content: [
          {
            heading: 'The Challenge of AI Network Traffic',
            body: 'AI workloads continuously move data between training clusters, inference endpoints, and edge devices, creating dynamic and complex traffic patterns that traditional security tools struggle to monitor. The volume, speed, and distributed nature of AI data flows require updated defensive approaches.',
          },
          {
            heading: 'Primary Defense Strategies',
            list: [
              'Micro-Segmentation — breaks networks into isolated zones; if one component is compromised, the attacker cannot easily move to another; contains the blast radius.',
              'Zero Trust Architecture — no entity inside or outside the network is trusted by default; every interaction requires authentication, authorization, and continuous validation.',
              'Encrypted Channels — all AI data in transit must use TLS 1.3 or equivalent; model parameters and training data are high-value IP.',
            ],
          },
          {
            heading: 'AI-Driven Network Detection and Response',
            body: 'AI-driven NDR systems surpass signature-based tools by analyzing behavioral patterns and anomalies rather than relying on known attack signatures. They can identify coordinated multi-stage attacks that would appear as unrelated events to rule-based tools.',
          },
          {
            heading: 'High-Risk Areas for AI Data in Motion',
            list: [
              'Edge Inference Devices — continuously send and receive data; often lack enterprise-grade security controls.',
              'Training Environments — contain both valuable datasets and model weights (intellectual property); high-priority targets.',
              'Model Distribution Pipelines — delivering updated model versions to production is a potential supply chain attack vector.',
            ],
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
      {
        id: 'd5t6',
        title: '5.6 Implement Authentication Systems',
        content: [
          {
            heading: 'OAuth 2.0',
            body: 'Open standard for delegated authorization — allows third-party applications to access user resources without exposing credentials. Uses access tokens scoped by permission and time.',
            list: [
              'Resource Owner (User) — grants authorization to the third-party application.',
              'Authorization Server — authenticates the user and issues access tokens.',
              'Resource Server — validates tokens and serves protected data.',
              'Client — the third-party application requesting access.',
            ],
          },
          {
            heading: 'OpenID Connect (OIDC)',
            body: 'Identity layer built on top of OAuth 2.0 that adds authentication for Single Sign-On (SSO). Issues an ID Token (JWT) containing identity claims (name, email) in addition to the OAuth access token.',
          },
          {
            heading: 'SAML 2.0',
            body: 'XML-based framework for exchanging authentication and authorization data between Identity Provider (IdP) and Service Provider (SP). Core of enterprise SSO. The IdP issues a SAML Assertion; the SP validates it to grant access.',
            table: {
              headers: ['Feature', 'OAuth 2.0 / OIDC', 'SAML 2.0'],
              rows: [
                ['Message Format', 'JSON, JWT', 'XML'],
                ['Token Type', 'Access token, ID token', 'SAML Assertion'],
                ['Transport', 'REST (HTTP, JSON)', 'Browser POST/Redirect'],
                ['Common Use', 'APIs, mobile, web apps', 'Enterprise SSO'],
                ['Identity Layer', 'OIDC (extension)', 'Built-in'],
              ],
            },
          },
          {
            heading: 'Kerberos',
            body: 'Network authentication protocol using symmetric key cryptography and encrypted tickets. Enables SSO across distributed systems without transmitting passwords over the network.',
            list: [
              '1. Client requests Ticket-Granting Ticket (TGT) from Authentication Server (AS/KDC).',
              '2. Client presents TGT to Ticket-Granting Server (TGS) to get a Service Ticket.',
              '3. Client presents Service Ticket to the target service for access.',
            ],
            note: 'Kerberos is widely used in Microsoft Active Directory environments.',
          },
        ],
      },
      {
        id: 'd5t7',
        title: '5.7 Identity as the Last Perimeter',
        content: [
          {
            heading: 'Evolution of the Perimeter',
            body: 'In an AI-driven environment where workloads are distributed and increasingly autonomous, identity becomes the new perimeter. Access decisions must account not only for human users but also for AI agents, service accounts, APIs, and machine-to-machine interactions that operate at scale without direct human oversight.',
          },
          {
            heading: 'Least Privilege and Non-Human Identities',
            list: [
              'Every identity — human or machine — must be granted only the minimum access required to perform its function.',
              'AI agents may dynamically interact with multiple datasets and services; without strict privilege boundaries, they can inadvertently access sensitive data beyond their intended scope.',
              'Service accounts must be dynamically managed, time-bound where possible, and tightly scoped.',
              'Regular auditing and continuous monitoring must extend to non-human identities.',
            ],
            warning: 'Without strict privilege boundaries, an AI system could inadvertently or maliciously access sensitive data beyond its intended scope.',
          },
          {
            heading: 'AI-Enhanced Identity Management',
            list: [
              'Behavioral Biometrics — analyze typing speed, mouse movement, login times, device usage, and geographic location to establish a baseline of normal behavior.',
              'Adaptive Authentication — when anomalies are detected, adjust the verification level required rather than giving a binary grant/deny response.',
              'Anomaly Detection — AI detects dormant accounts, excessive permissions, and unusual access paths at scale.',
              'Scalability — AI-driven IAM handles large volumes of access data that would be impractical to manage manually.',
            ],
          },
          {
            heading: 'Dual Role Challenge',
            body: 'Organizations must secure the identities of AI systems while simultaneously trusting AI to enhance security decisions. AI models used in IAM must be explainable, auditable, and resistant to manipulation.',
            warning: 'If an attacker can influence the behavior of an AI-driven authentication system, they may be able to bypass controls or generate false trust signals.',
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
            heading: 'Internal (First-Party) Evaluations',
            body: 'Performed by an organization\'s own security teams to measure security posture and identify vulnerabilities before external parties discover them.',
            list: [
              'Internal penetration testing — identifies vulnerabilities from within networks.',
              'Phishing simulations — tests user awareness and email filter effectiveness.',
              'Vulnerability scanning — automated tools detect weaknesses.',
              'Tabletop exercises — simulate incident response scenarios without disrupting operations.',
              'Red Team/Blue Team — red teams attack; blue teams defend; measures detection and response.',
              'Internal audits — verify compliance with internal policies, standards, and regulations.',
            ],
            warning: 'Conflict of interest arises when auditors review their own work. Mitigations: independent teams, auditor rotation, direct reporting to leadership, supplementing with external audits.',
          },
          {
            heading: 'Second-Party Evaluations',
            body: 'Conducted by customers or partners to verify security requirements through contractual obligations. Activities include penetration testing, source code reviews, vulnerability scans, and formal on-site audits.',
            list: [
              'Advantages — increased trust, early risk identification, improved accountability.',
              'Considerations — expectations must be clearly defined in contracts to prevent disputes.',
            ],
          },
          {
            heading: 'Third-Party Audits',
            body: 'Independent external organizations provide objective evaluations following structured methodologies: scope definition, document review and interviews, technical testing and verification, and audit report and certification.',
            list: [
              'Benefits — impartiality, credibility with stakeholders, risk reduction, regulatory compliance assurance.',
            ],
          },
          {
            heading: 'SOC Reports',
            list: [
              'SOC 1 — financial reporting controls.',
              'SOC 2 — data security and system reliability (five Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, Privacy).',
              'SOC 3 — public summary version of SOC 2.',
              'Type 1 — controls assessed at a specific point in time.',
              'Type 2 — control effectiveness evaluated over 6–12 months (stronger assurance).',
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
            heading: 'Log Reviews',
            body: 'Log review systematically examines log files to detect abnormal patterns, unauthorized actions, and security incidents. SIEM systems automatically collect, normalize, correlate, and analyze logs from multiple sources in real time.',
            list: [
              'NetFlow — Cisco protocol recording IP traffic flows (source/destination IP, ports, protocols, data volume, timestamps).',
              'Log Management Lifecycle — Generation, collection, centralization, storage, analysis, retention, secure disposal.',
            ],
          },
          {
            heading: 'Synthetic Transactions and Real User Monitoring',
            list: [
              'Synthetic Transactions — fake automated actions simulating legitimate user behavior to detect failures before real users encounter them; provide 24/7 availability testing and baseline monitoring.',
              'Real User Monitoring (RUM) — tracks actual user interactions in real time; detects unusual patterns, bot activity, DDoS attacks, and distinguishes user errors from security breaches.',
            ],
          },
          {
            heading: 'Code Review and Testing',
            list: [
              'Fagan Inspection — formal structured process: Planning → Overview → Preparation → Inspection Meeting → Rework → Follow-up.',
              'Static Testing — reviews code without execution; detects buffer overflows, hardcoded secrets, weak cryptography.',
              'Dynamic Testing — executes applications observing runtime behavior; DAST identifies SQL injection, XSS, authentication bypass.',
            ],
          },
          {
            heading: 'Coverage Analysis Formula',
            body: 'Test Coverage (%) = (Items tested / Total items) × 100',
            table: {
              headers: ['Coverage Type', 'Focus', 'Security Value'],
              rows: [
                ['Statement', 'Each line of code executed', 'Ensures no code goes untested'],
                ['Branch', 'All decision paths tested', 'Detects untested logic paths'],
                ['Condition', 'Individual conditions in decisions', 'Catches edge case failures'],
                ['Function', 'All functions called', 'Identifies unused or risky code'],
                ['Loop', 'Zero, one, multiple iterations', 'Prevents overflow or infinite loops'],
              ],
            },
          },
          {
            heading: 'Interface Testing',
            body: 'Interfaces are potential attack vectors — each must be tested for safety and security.',
            list: [
              'GUI — visible buttons, forms, menus; test input validation and error handling.',
              'CLI — text-based command entry; test for command injection.',
              'REST APIs — use URLs and JSON/XML over HTTP/HTTPS; risks include improper validation and data leakage.',
              'RPC — remote function calls; risk: unauthorized function triggering.',
              'IPC — inter-process communication via shared memory, queues, sockets; risk: hijacking or injection.',
              'Physical Interfaces — USB ports, cables; risk: rogue device connection.',
            ],
          },
          {
            heading: 'Breach and Attack Simulation (BAS)',
            body: 'Continuously simulates realistic cyberattacks in controlled environments to test defense effectiveness. Unlike vulnerability scanning, BAS actively simulates attacker behavior including malware, lateral movement, and data exfiltration.',
            list: [
              'By Target: endpoints, network infrastructure, cloud services, identity systems, web applications, databases.',
              'By Vector: email attacks, web-based attacks, lateral movement, malware execution, data exfiltration.',
              'Value: continuous validation vs. annual assessments; measures detection and response effectiveness.',
            ],
          },
          {
            heading: 'Compliance Checks',
            body: 'Verify systems, processes, and data handling meet rules established by governments, regulators, and industry bodies.',
            list: [
              'Geographic variation — location determines applicable laws (GDPR in Europe, state laws in U.S.).',
              'Industry variation — PCI-DSS for finance, HIPAA for healthcare, NIST for government.',
              'Implementation steps: understand requirements → map to systems → collect evidence → run scans → gap analysis → document and certify.',
            ],
            note: 'Compliance requires both technical controls and documented procedures.',
          },
        ],
      },
      {
        id: 'd6t3',
        title: '6.3 Collect Security Process Data',
        content: [
          {
            heading: 'Account Management',
            body: 'Account management involves creating, monitoring, updating, and deleting user accounts to ensure only authorized personnel have appropriate access. User accounts are primary attack vectors — compromised accounts enable lateral movement, privilege escalation, and data theft.',
            table: {
              headers: ['Category', 'Focus', 'Examples'],
              rows: [
                ['Administrative Process', 'Policy enforcement', 'Account creation criteria, approval workflows, role assignment, review frequency, offboarding procedures'],
                ['Technical Implementation', 'Systems and tools', 'Identity platforms (Active Directory, Azure AD), password policies, RBAC, MFA, activity logging'],
                ['Physical Controls', 'Device and facility protection', 'Building access, server room controls, hardware tokens, screen lockouts, encryption'],
              ],
            },
          },
          {
            heading: 'Account Lifecycle — Join-Move-Leave',
            list: [
              'Join — create account with least-privilege permissions based on job role.',
              'Move — update permissions when roles change; remove old access immediately.',
              'Leave — immediately disable or delete account to prevent unauthorized access.',
            ],
            warning: 'Common issues: orphaned accounts, default or shared passwords, excessive privileges, stale unmonitored accounts, disabled logging.',
          },
          {
            heading: 'Management Review and Approval',
            body: 'Leadership formally reviews and approves security policies, controls, test results, and risk decisions. This ensures cybersecurity aligns with business objectives, receives proper funding, and maintains accountability.',
            list: [
              'ISO 27001 — regular ISMS reviews analyzing audits, metrics, and nonconformities.',
              'NIST SP 800-53 — authorizing officials must approve security assessments before production deployment.',
              'SOC 2 — management must document monitoring and control effectiveness reviews.',
              'COBIT — requires governance oversight, continuous monitoring, and formal risk approvals.',
            ],
          },
          {
            heading: 'KPIs vs KRIs',
            list: [
              'KPIs (Key Performance Indicators) — measure how well security processes meet goals (e.g., patch deployment speed, incident detection/response times).',
              'KRIs (Key Risk Indicators) — warn of rising dangers (e.g., unpatched vulnerabilities, failed login attempts, phishing simulation failure rates, misconfigured cloud storage).',
            ],
            note: 'Strong performance (high KPI) does not guarantee low risk (high KRI), and vice versa. Both perspectives are essential.',
          },
          {
            heading: 'Backup Verification — 3-2-1 Rule',
            list: [
              '3 — maintain three copies of data.',
              '2 — store on two different media types.',
              '1 — keep one copy offsite.',
            ],
            note: 'Test backups regularly through periodic test restores in isolated environments and checksum verification. Automated corruption checks should be enabled in backup systems.',
          },
          {
            heading: 'Training and Awareness',
            body: 'Training provides formal instruction in specific skills; awareness builds a security mindset through messages, posters, reminders, and examples. Security training requires continuous updates as threats evolve — one-time sessions are insufficient.',
            list: [
              'Effectiveness metrics: phishing click rates (pre/post training), employee incident reporting frequency, quiz/test performance, policy compliance rates, reduction in audit findings.',
            ],
          },
          {
            heading: 'Disaster Recovery and Business Continuity Testing',
            list: [
              'DR and BC plans document recovery procedures for major disruptions; plans fail without testing.',
              'Testing approaches: tabletop exercises (scenario discussion), partial failover tests, full system recovery simulations.',
              'Critical metrics: RTO (maximum acceptable restoration time), RPO (maximum tolerable data loss).',
              'Frequency: test at least annually, plus after major changes or incidents.',
            ],
          },
        ],
      },
      {
        id: 'd6t4',
        title: '6.4 Analyze Test Output and Generate Reports',
        content: [
          {
            heading: 'Security Report Structure',
            table: {
              headers: ['Section', 'Purpose', 'Key Content'],
              rows: [
                ['Executive Summary', 'Non-technical overview for leadership', 'Main findings, risk level, next steps — clear and concise'],
                ['Assumptions', 'Lists starting conditions of the test', 'Access level granted, environment tested, exclusions'],
                ['Scope', 'Defines what was and was not tested', 'Systems, applications, and excluded areas'],
                ['Summary of Activities', 'Details actions performed', 'Tools used, tests conducted, effort level'],
                ['Findings', 'Core security problems discovered', 'Description, impact, risk level, evidence'],
                ['Recommendations', 'Fix guidance for each finding', 'Technical steps for IT; policy guidance for management'],
                ['Appendices', 'Supporting material', 'Full scan output, screenshots, tool configurations'],
              ],
            },
          },
          {
            heading: 'Remediation Plans',
            body: 'A remediation plan outlines who is responsible, what action is needed, when it must be done, and how success will be measured. Testing the remediation is as important as the plan itself — re-run original tests to confirm the vulnerability is resolved.',
            list: [
              'Prioritize by risk — critical vulnerabilities first, especially those actively exploited.',
              'Include temporary mitigations (monitoring, firewall rules) when permanent fixes are delayed.',
              'Create closure reports documenting the fix, test evidence, and management approval.',
            ],
            note: 'Regulated environments require documented proof that vulnerabilities were identified, fixed, and validated.',
          },
          {
            heading: 'Exception Handling',
            body: 'When a security control cannot be fully applied, a formal exception process must be followed:',
            list: [
              '1. Identify the need — recognize when a control cannot be applied (legacy system, business constraint).',
              '2. Evaluate the risk — assess the impact on security posture.',
              '3. Define compensating controls — alternative measures (extra monitoring, logging, access controls).',
              '4. Approval process — formal sign-off from system owners and security management.',
              '5. Monitor the exception — regular audits to ensure it does not become a permanent vulnerability.',
              '6. Time-bound — all exceptions must have an expiry date and go through re-approval if extended.',
            ],
          },
          {
            heading: 'Ethical Disclosure',
            list: [
              'Responsible Disclosure — report to the vendor and allow time to fix before public disclosure.',
              'Full Disclosure — immediate public reporting; controversial as it can expose users before patches exist.',
              'Bug Bounty Programs — financial incentives for ethical hackers who responsibly disclose vulnerabilities.',
              'Mandatory Reporting — some jurisdictions require reporting vulnerabilities to authorities or law enforcement.',
              'Nondisclosure — legal or contractual obligations may prevent disclosure in some cases.',
            ],
          },
        ],
      },
      {
        id: 'd6t5',
        title: '6.5 Security Audits',
        content: [
          {
            heading: 'Core Definition',
            body: 'Auditing serves as a formal, structured way to validate that systems are both compliant with standards and protected against threats.',
          },
          {
            heading: 'Audit Types',
            list: [
              'First-Party (Internal) — conducted by the organization itself; verifies compliance with internal policies and identifies gaps before external parties discover them.',
              'Second-Party — conducted by a customer or partner; verifies contractual security requirements.',
              'Third-Party — independent external organizations; most objective; used for ISO 27001, SOC 2, PCI DSS.',
            ],
          },
          {
            heading: 'Location Considerations',
            list: [
              'On-Premises — direct physical inspection of security controls, servers, and infrastructure.',
              'Cloud — assessment focuses on shared responsibility models and provider certifications rather than physical access.',
              'Hybrid — auditors must evaluate both physical and cloud environments plus data flows between them.',
            ],
          },
          {
            heading: 'Sampling Methodology',
            body: 'Organizations often use sampling to reduce audit scope while maintaining representativeness:',
            list: [
              'Random sampling — unbiased selection; every item has an equal chance of being selected.',
              'Stratified sampling — group-based selection; ensures all segments are represented.',
              'Judgmental sampling — risk-focused selection; auditor applies expertise to choose items.',
            ],
          },
          {
            heading: 'Major Audit Frameworks',
            list: [
              'SSAE 18 — American Institute of CPAs standard for SOC reports.',
              'ISO/IEC 15408 — Common Criteria for IT security evaluation.',
              'NIST SP 800-53A — assessment procedures for federal systems.',
              'FedRAMP SAF — security assessment framework for government cloud services.',
            ],
          },
          {
            heading: 'Audit Cycle Phases',
            list: [
              '1. Planning — define scope and objectives.',
              '2. Fieldwork — collect evidence from systems and interviews.',
              '3. Analysis — compare findings against expected controls.',
              '4. Reporting — document gaps and recommendations.',
              '5. Remediation — fix identified issues and verify corrections.',
            ],
          },
          {
            heading: 'Conflict of Interest in Internal Audits',
            body: 'When someone reviews a process they helped design or manage, objectivity is compromised. Mitigations:',
            list: [
              'Use independent teams within the company.',
              'Rotate auditors to avoid familiarity bias.',
              'Report audit results directly to senior leadership or the board.',
              'Supplement with periodic third-party audits.',
            ],
          },
        ],
      },
      {
        id: 'd6t6',
        title: '6.6 Red Teaming and Continuous Security Testing for AI Systems',
        content: [
          {
            heading: 'Why AI Requires Evolved Security Testing',
            body: 'Traditional testing targets software vulnerabilities like buffer overflows and misconfigurations. In AI-driven systems, the attack surface has expanded into the behavior of the model itself. An AI system can be technically secure from a software perspective and still be vulnerable at the model level.',
          },
          {
            heading: 'AI-Specific Attack Types',
            table: {
              headers: ['Attack', 'Description', 'Impact'],
              rows: [
                ['Evasion Attacks', 'Manipulate input data to cause the AI to misclassify or misinterpret it — appears normal to humans', 'Undermines reliability; model produces incorrect or harmful outputs'],
                ['Extraction Attacks', 'Repeatedly query the model to reconstruct it or infer sensitive training data', 'Steals the model\'s intelligence and embedded proprietary information'],
                ['Prompt Injection', 'Craft inputs that override safety rules or cause unauthorized behavior', 'Can bypass access controls or extract confidential information'],
              ],
            },
            note: 'These are "logic flaws" inherent to how the model processes data — not traditional coding errors.',
          },
          {
            heading: 'AI Red Teaming',
            body: 'Red Teaming for AI goes beyond simulating network intrusions — it involves actively challenging the model\'s logic, decision-making boundaries, and resilience against manipulation. The goal is to understand how weaknesses could be exploited and what business impact they would have.',
            list: [
              'Design controlled adversarial exercises that simulate real-world attacks against AI models.',
              'Test monitoring, detection, and response mechanisms, not just the model itself.',
              'Include adversarial input crafting, jailbreak attempts, and data extraction probes.',
            ],
          },
          {
            heading: 'AI-Enhanced Vulnerability Management',
            list: [
              'Continuous Security Assessment — AI-powered scanning analyzes systems in real time, correlating vulnerabilities with current threat intelligence.',
              'Risk-Based Prioritization — vulnerabilities actively exploited in the wild are flagged as critical; others deprioritized.',
              'Pattern Detection — AI identifies hidden dependencies, anomalous configurations, and predicts potential vulnerabilities before exploitation.',
              'Human Expertise Still Required — AI highlights risks but cannot fully understand business context, intent, or organizational priorities.',
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
              'Documentary Evidence — written or recorded materials (logs, emails, configurations, contracts).',
              'Testimonial Evidence — witness statements and expert testimony; often weaker due to bias/memory issues.',
              'Demonstrative Evidence — visual aids explaining other evidence (diagrams, timelines, reconstructions).',
            ],
          },
          {
            heading: 'Evidence Admissibility',
            list: [
              'Relevance — direct connection to the case.',
              'Materiality — significant importance to the investigation outcome.',
              'Competence — legally collected and properly handled; chain of custody maintained.',
            ],
          },
          {
            heading: 'Legal Evidence Acquisition Methods',
            table: {
              headers: ['Method', 'Application'],
              rows: [
                ['Voluntary Surrender', 'Consensual handover of data or hardware'],
                ['Subpoena', 'Court-ordered compulsion to produce evidence'],
                ['Plain View Doctrine', 'Visible evidence discovered during lawful access'],
                ['Search Warrant', 'Court authorization for specific seizure'],
                ['Exigent Circumstances', 'Emergency collection to prevent destruction of evidence'],
              ],
            },
          },
          {
            heading: 'Order of Volatility (Most → Least Volatile)',
            list: [
              '1. CPU registers, cache, RAM.',
              '2. Memory-resident processes, network connections.',
              '3. Swap files, paging files, logs.',
              '4. Hard drive files and system data.',
              '5. Archived backups, offline storage.',
            ],
            note: 'Locard\'s Exchange Principle — "every contact leaves a trace" — all system interactions create detectable artifacts for skilled investigators.',
          },
          {
            heading: 'Investigative Techniques',
            list: [
              'Data Capture — forensic imaging, memory extraction, network traffic capture.',
              'Interviews — non-confrontational fact-gathering from witnesses.',
              'Interrogations — adversarial questioning of suspects.',
              'External Requests — third-party data acquisition via formal legal channels.',
            ],
          },
          {
            heading: 'Digital Forensics Tools',
            list: [
              'Acquisition — write blockers (prevent media modification), Faraday containers (block wireless), recording equipment.',
              'Analysis — network traffic analysis, log parsing, data recovery, virtual machines, code analysis, hashing.',
              'Forensic suites — FTK (Forensic Toolkit), EnCase, Autopsy.',
            ],
          },
          {
            heading: 'Investigation Artifacts by Source',
            list: [
              'Data artifacts — files, metadata, database entries, configuration changes.',
              'Computer artifacts — event logs, process lists, scheduled tasks, registry entries.',
              'Network artifacts — firewall logs, NetFlow records, packet captures, DNS queries.',
              'Mobile artifacts — call/message logs, geolocation data, application data, cache.',
            ],
          },
        ],
      },
      {
        id: 'd7t2',
        title: '7.2 Understand and Support Investigations',
        content: [
          {
            heading: 'Digital Forensics Principles',
            list: [
              'Locard\'s Exchange Principle — every contact leaves a trace; underlies all forensic investigation.',
              'Chain of Custody — documented record of who handled evidence, when, and how; must be unbroken for legal admissibility.',
              'Order of Volatility — collect evidence from most volatile to least: CPU registers → RAM → network state → running processes → disk → backups.',
              'Avoid Evidence Contamination — never work on original media; always create forensic images (bit-for-bit copies).',
            ],
          },
          {
            heading: 'Types of Evidence',
            table: {
              headers: ['Type', 'Description'],
              rows: [
                ['Real Evidence', 'Physical, tangible items (hardware, devices)'],
                ['Documentary Evidence', 'Written records, logs, policies, contracts'],
                ['Testimonial Evidence', 'Witness statements; must be from qualified persons'],
                ['Demonstrative Evidence', 'Visual aids, models, or simulations used to explain findings'],
                ['Digital Evidence', 'Files, logs, metadata, network captures'],
              ],
            },
          },
          {
            heading: 'Investigation Requirements',
            list: [
              'Administrative Investigations — internal HR or policy matters; lower evidentiary standard.',
              'Criminal Investigations — coordinated with law enforcement; highest evidentiary standard; chain of custody critical.',
              'Civil Investigations — legal disputes; discovery process applies.',
              'Regulatory Investigations — industry watchdogs (SEC, HIPAA); specific reporting requirements.',
            ],
          },
        ],
      },
      {
        id: 'd7t3',
        title: '7.3 Logging, Monitoring, and Visibility',
        content: [
          {
            heading: 'Security Monitoring Purpose',
            body: 'Effective monitoring transforms raw events into actionable intelligence. Without visibility, security incidents go undetected. The goal is continuous awareness of the security posture across all systems and networks.',
          },
          {
            heading: 'Log Management',
            list: [
              'Centralized Logging — aggregate logs from all systems into a SIEM for correlation and analysis.',
              'Log Integrity — logs must be tamper-evident; store on separate, write-once media or forward to immutable storage.',
              'Retention — define retention periods based on regulatory requirements (GDPR, HIPAA, PCI-DSS).',
              'Timestamping — all logs must use synchronized NTP-based timestamps for correlation accuracy.',
            ],
          },
          {
            heading: 'SIEM Systems',
            body: 'Security Information and Event Management (SIEM) platforms collect, aggregate, correlate, and analyze log data from across the organization. They enable real-time threat detection, incident response support, and compliance reporting.',
            list: [
              'Correlation Rules — detect multi-step attack patterns that no single log source would reveal alone.',
              'Dashboards and Alerts — provide real-time visibility and notify analysts of threshold violations.',
              'Use Cases: detecting brute force attacks, lateral movement, privilege escalation, data exfiltration.',
            ],
          },
          {
            heading: 'Network Monitoring Tools',
            table: {
              headers: ['Tool', 'Purpose'],
              rows: [
                ['Wireshark', 'Packet capture and analysis; inspect protocol details at the frame level'],
                ['NetFlow', 'Network flow data; who talked to whom, when, and how much data — without payload'],
                ['SNMP', 'Monitor device health, performance metrics, and trap alerts from network devices'],
                ['Syslog', 'Standard protocol for forwarding log messages from devices to a central server'],
              ],
            },
          },
        ],
      },
      {
        id: 'd7t4',
        title: '7.4 Foundational Security Operations Concepts',
        content: [
          {
            heading: 'Need-to-Know and Least Privilege',
            body: 'These two principles work together to create layered defense where users access only what they must have, not what they could want.',
            list: [
              'Need-to-Know — just because you have a badge or clearance doesn\'t mean you get access; access is based on current operational necessity.',
              'Least Privilege — even if you need access, you should only get the minimum level of rights necessary.',
              'Security clearance confirms trustworthiness; it does not automatically grant access to all information at that level.',
              'Need-to-Know is dynamic — it changes based on current roles and projects.',
            ],
          },
          {
            heading: 'Separation of Duties (SoD)',
            body: 'No single individual should have unchecked power or control over critical processes.',
            list: [
              'Two-Person Control — requires two qualified individuals to complete sensitive actions together (e.g., deploying software updates, revoking certificates, accessing cryptographic keys, changing firewall rules).',
              'Job Rotation — prevents individuals from building unassailable control; exposes hidden bad practices; disrupts cover-up ability; distributes knowledge for resilience.',
              'Mandatory Vacations — creates opportunities to review work; disrupts ability to conceal wrongdoing; detects log manipulation, unauthorized access, and configuration drift.',
            ],
          },
          {
            heading: 'Privileged Account Types',
            table: {
              headers: ['Account Type', 'Description'],
              rows: [
                ['Administrator accounts', 'Create/delete users, change configurations, access all data'],
                ['Service accounts', 'Run applications; frequently forgotten and unmanaged'],
                ['Root accounts', 'Unlimited power over a system (Unix/Linux)'],
                ['Domain administrator accounts', 'Control entire Active Directory environment'],
              ],
            },
          },
          {
            heading: 'PAM Solution Features',
            table: {
              headers: ['Feature', 'Purpose', 'Real-World Effect'],
              rows: [
                ['Password Vaulting', 'Secure credential storage', 'No passwords on sticky notes or shared spreadsheets'],
                ['Session Monitoring', 'Watch and record privileged sessions', 'Early detection of bad or unusual behavior'],
                ['Password Rotation', 'Frequently change passwords automatically', 'Limits attacker opportunity window'],
                ['Access Justification', 'Require users to justify access requests', 'Deters unnecessary privileged use'],
              ],
            },
            warning: 'Common PAM failures: password sharing defeats accountability; overprovisioning grants temporary rights that are never removed; service accounts running critical processes are frequently neglected.',
          },
          {
            heading: 'Job Rotation Benefits and Challenges',
            table: {
              headers: ['Benefit', 'Description'],
              rows: [
                ['Fraud Detection and Prevention', 'People less likely to commit fraud knowing others will step into their role; irregularities surface naturally'],
                ['Cross-Training and Redundancy', 'Creates institutional memory; builds agile teams; improves organizational resilience'],
                ['Boosting Policy Compliance', 'Surfaces bad habits and non-compliant behavior; fresh perspectives identify misconfigurations'],
              ],
            },
          },
          {
            heading: 'Service Level Requirements and Agreements',
            body: 'Service Level Requirements (SLRs) are the organizational wishlist for what is expected from a service in terms of security and performance — not legally binding, but set the stage for SLA negotiation.',
            list: [
              'Incident response timeframes — e.g., Severity 1 incidents responded to within 1 hour.',
              'Patch deployment SLAs — e.g., critical vulnerabilities patched within 5 business days.',
              'Uptime and availability — e.g., 99.99% uptime guarantee.',
              'Data retention periods, encryption standards, log delivery times.',
            ],
            note: 'SLA monitoring uses automated dashboards and SIEM tools; tied to KPIs like Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR).',
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
            heading: 'Backup Storage Strategies',
            list: [
              'Onsite Backups — stored within organizational premises; fastest restoration but vulnerable to same threats as primary systems (ransomware, disaster, insider threats).',
              'Offsite Backups — physically separate location (remote facility, secure vault); resilient to localized disasters; requires encryption in transit and at rest; trade-offs: higher costs and longer retrieval times.',
              'Cloud Storage — offers scalability, geo-redundancy, reduced overhead; challenges: bandwidth limitations, egress costs, compliance and data residency concerns.',
            ],
            note: '3-2-1 Strategy: three copies of data, two storage media types, one copy offsite. Use AES-256 encryption and immutable backup formats.',
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
              'Hot Site — fully operational, near real-time data synchronization; recovery time: minutes to seconds; most expensive; requires continuous updates and licensing.',
              'Warm Site — pre-installed systems with delayed data replication; recovery time: hours to one day; moderate cost; requires periodic maintenance.',
              'Cold Site — basic infrastructure only, no pre-installed hardware or data; recovery time: days to weeks; most cost-effective; ideal for non-critical applications.',
            ],
          },
          {
            heading: 'System Resilience and High Availability',
            list: [
              'High Availability (HA) — remains operational for high percentage of time (e.g., 99.9%, 99.999% "five nines").',
              'Fault Tolerance — continues operations without interruption despite component failures; uses redundancy (RAID, mirrored servers, dual power supplies).',
              'Quality of Service (QoS) — prioritizes critical traffic to ensure performance for essential functions.',
              'Network quality factors: bandwidth (capacity), latency (delay), jitter (variation), packet loss, interference.',
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
        id: 'd7t11',
        title: '7.11 Implement Disaster Recovery (DR) Processes',
        content: [
          {
            heading: 'Emergency Response',
            body: 'Emergency response is the first human-led moment in DR — when automated alerts become action, leadership, and containment. It is the execution of plans prepared before the emergency. Speed must be decisive and structured, not panicked.',
            list: [
              'Precise Containment — follow playbooks; overreaction (e.g., unplugging systems incorrectly) can cause more damage.',
              'Coordination — response lead communicates with system owners, legal counsel, and potentially law enforcement.',
              'Predefined Roles — who leads? who can shut down systems? who contacts executives? These must be decided in advance.',
              'Communication Discipline — say what you know, avoid speculation; "We are aware and investigating" is the right tone.',
            ],
          },
          {
            heading: 'Personnel in DR',
            list: [
              'Redundancy — every role must have an alternate; vacations, illness, or disasters may remove key personnel.',
              'Access Pre-Approval — credentials, VPNs, and physical access must be exercised in drills, not discovered during a crisis.',
              'Stress Resilience — tabletop exercises reveal who stays calm under pressure; build balanced teams.',
              'Communication Roles — assign who speaks externally, to executives, and to regulators; train tone and message discipline.',
            ],
          },
          {
            heading: 'Communication During Disaster',
            table: {
              headers: ['Aspect', 'Key Points'],
              rows: [
                ['Audience Definition', 'Internal staff, IT, leadership, customers, regulators, and media need different messages'],
                ['Backup Mediums', 'Plan for system failures: SMS, encrypted apps, satellite phones, radios, or physical runners'],
                ['Risk of Silence', 'Absence of communication fuels speculation; proactive updates prevent reputational damage'],
                ['Security Principles', 'Communication channels must be authenticated, encrypted, logged, and available during outages'],
              ],
            },
          },
          {
            heading: 'Restoration',
            list: [
              'Prioritization — critical systems first; sequence is defined in the BIA during calm planning time.',
              'Validation — every restored system must be tested for malware, secure configuration, and data integrity.',
              'Phased Restoration — bring systems online stage by stage to avoid cascading failures.',
              'Improvement Opportunity — restoration is not just rebuilding; it is an opportunity to improve access controls, segmentation, and hardening.',
            ],
          },
          {
            heading: 'Lessons Learned',
            body: 'Lessons learned is the bridge to organizational maturity. Conduct post-incident reviews, stakeholder debriefs, root cause analysis, and recommend policy/technical improvements. Capture findings in a centralized repository to build institutional memory.',
            tip: 'Security is about resilience. Incidents will happen. What defines a mature organization is how it responds and learns from them.',
          },
        ],
      },
      {
        id: 'd7t12',
        title: '7.12 Test Disaster Recovery Plans (DRP)',
        content: [
          {
            heading: 'DRP Testing Types',
            table: {
              headers: ['Test Type', 'Description', 'Disruption Level'],
              rows: [
                ['Read-Through / Checklist', 'Participants review the plan to identify errors, outdated contacts, or infeasible steps', 'None'],
                ['Tabletop Exercise', 'Team walks through a simulated scenario verbally; no systems activated', 'None'],
                ['Walk-Through Drill', 'Team physically walks through their roles and locations', 'Minimal'],
                ['Simulation', 'Tests specific scenarios without full activation', 'Low'],
                ['Parallel Test', 'Alternate site activated alongside production', 'Moderate'],
                ['Full Interruption Test', 'Production systems shut down; most thorough but most disruptive', 'High'],
              ],
            },
          },
          {
            heading: 'Key DRP Testing Principles',
            list: [
              'An untested DR plan is just a theory — it must be validated before it is needed.',
              'Read-through tests catch outdated contacts, removed systems, or deprecated procedures.',
              'Tabletop exercises reveal decision-making gaps and communication breakdowns.',
              'Full interruption tests provide the highest confidence but require careful scheduling.',
              'Test frequency should be driven by the rate of organizational and infrastructure change.',
            ],
          },
        ],
      },
      {
        id: 'd7t13',
        title: '7.13 Participate in Business Continuity Planning',
        content: [
          {
            heading: 'BCP vs DR',
            body: 'BCP keeps the business running during and after a disruption. DR brings IT systems back online. BCP is broader — it addresses all critical business functions, not just technology.',
          },
          {
            heading: 'BCP Components',
            table: {
              headers: ['Component', 'Description'],
              rows: [
                ['Occupant Emergency Plan (OEP)', 'Facility response procedures for physical emergencies (fire, evacuation, lockdown)'],
                ['Cyber Incident Response Planning (CIRP)', 'Detection and recovery processes for cyber-attacks'],
                ['Information System Contingency Plan (ISCP)', 'System-by-system assessment and recovery procedures'],
                ['Continuity of Operations Plan (COOP)', 'Restoring mission-critical functions at alternate sites'],
              ],
            },
          },
          {
            heading: 'Security Professional\'s Role in BCP',
            list: [
              'Understand system dependencies and authentication mechanisms that business units overlook.',
              'Challenge unrealistic RTOs and RPOs based on threat modeling and technical knowledge.',
              'Validate that backup systems are secure and properly segmented.',
              'Evaluate whether security controls are maintained or bypassed during stress scenarios.',
              'Facilitate communication between technical and business stakeholders.',
            ],
            note: 'COVID-19 demonstrated that theoretical plans require real-world validation and rapid adaptation capabilities — BCP exercises are essential muscle memory.',
          },
        ],
      },
      {
        id: 'd7t14',
        title: '7.14–7.15 Physical Security and Personnel Safety',
        content: [
          {
            heading: 'Perimeter Security Controls',
            body: 'Physical perimeter security prevents attackers from bypassing digital controls through direct access. An attacker with physical access can remove hard drives, insert malicious USB devices, or shut down power supplies.',
            table: {
              headers: ['Layer', 'Purpose', 'Tools'],
              rows: [
                ['Outer Physical Barrier', 'Deter and delay unauthorized entry', 'Fence (min 7 ft with barbed wire), walls, bollards'],
                ['Controlled Entry Points', 'Enforce authorized access and create audit trail', 'Gates, badge readers, mantraps (interlocking doors)'],
                ['Surveillance and Detection', 'Monitor, record, and alert on suspicious activity', 'CCTV with AI analytics, motion sensors, intrusion detectors'],
                ['Lighting', 'Deter and improve visibility', 'Floodlights, motion-activated lighting'],
                ['Human Response', 'Verify, react, and escalate', 'Security guards, roving patrols'],
              ],
            },
            note: 'CPTED (Crime Prevention Through Environmental Design) — landscape design with thorny bushes and strategic walkways naturally discourages unauthorized movement.',
          },
          {
            heading: 'Internal Security Controls',
            list: [
              'Role-Based Access — principle of least privilege ensures individuals access only areas necessary for their job function.',
              'Internal Barriers — locked doors, turnstiles, secure cages, and multi-factor authentication (badge + biometric) create zones and slow unauthorized movement.',
              'Video Surveillance — real-time monitoring with intelligent alerts detects anomalies like after-hours access.',
              'Intrusion Detection — magnetic door contacts, pressure mats, infrared beams, and motion detectors in sensitive spaces.',
              'Escort Policies — visitors and contractors receive accompanied access; escorts act as witnesses and deterrents.',
              'Environmental Controls — fire suppression, humidity sensors, temperature controls, and water leak detectors protect against non-human threats.',
            ],
            note: 'Access systems require continuous review and revocation processes; unrevoked access from terminated employees is a major vulnerability.',
          },
          {
            heading: 'Personnel Safety Concerns',
            list: [
              'Duress — systems or code words (duress codes/PINs) to silently signal security when under coercion.',
              'Travel Security — clean devices, VPN, awareness of jurisdiction-specific device search laws.',
              'Emergency Preparedness — evacuation plans, assembly points, documented emergency communication plans.',
              'Workplace Violence — policies and training for identifying and responding to threats.',
            ],
          },
        ],
      },
    {
        id: 'd7t15',
        title: '7.15 Personnel Safety and Security Concerns',
        content: [
          {
            heading: 'Travel Security',
            body: 'Traveling employees carry network access, credentials, and sensitive data into uncontrolled environments. They are temporary mobile endpoints exposed to physical and digital threats.',
            table: {
              headers: ['Phase', 'Key Action'],
              rows: [
                ['Pre-Travel', 'Issue clean devices, enable full-disk encryption, install VPN, brief employees'],
                ['Transit', 'Disable auto-connect Wi-Fi; use tethering instead of public networks'],
                ['On-Site', 'Avoid sensitive discussions in public; use screen privacy filters; know local surveillance laws'],
                ['Legal Awareness', 'Understand jurisdiction-specific rules on device searches and compelled decryption'],
                ['Post-Travel', 'Quarantine and inspect devices; debrief travelers on suspicious incidents'],
              ],
            },
          },
          {
            heading: 'Security Awareness Topics',
            list: [
              'Insider Threats — both malicious and unintentional; well-meaning employees with poor security awareness are often more dangerous than deliberate attackers.',
              'Social Media — OSINT goldmine for attackers; employees sharing travel plans, project names, or technology stack inadvertently assists targeting.',
              '2FA Fatigue — attackers exploit repeated MFA prompts until the user approves out of frustration; mitigate with number matching and user education.',
              'Training Design — gamified, role-specific, and continuously updated training builds habits rather than just awareness.',
            ],
          },
          {
            heading: 'Emergency Management Phases',
            list: [
              'Mitigation — reduce likelihood/impact: fire-resistant materials, segmenting critical systems.',
              'Preparedness — training, drills, and documented plans so everyone knows what to do.',
              'Response — execute the plan: evacuate, communicate, contain; technology assists but culture makes it work.',
              'Recovery — restore operations AND support people: psychological first aid, clear communication, flexible return plans.',
            ],
          },
          {
            heading: 'Duress',
            body: 'Duress occurs when an employee is coerced into providing access or credentials. Defenses include duress codes (secondary PINs that silently alert security) and environmental design that reduces coercion opportunities.',
            list: [
              'Duress Codes — a secondary access PIN that appears normal but triggers a silent security alert.',
              'Long-term duress (blackmail, financial pressure) can turn employees into insider threats over time.',
              'Behavioral analytics can detect unusual access patterns that indicate an employee under duress.',
              'A culture where employees feel safe reporting concerns is the most effective deterrent.',
            ],
          },
        ],
      },
      {
        id: 'd7t16',
        title: '7.16 AI as the SOC\'s Force Multiplier',
        content: [
          {
            heading: 'The Alert Fatigue Problem',
            body: 'The problem in modern SOCs is not a lack of data — it is an overwhelming excess of it. Traditional rule-based systems generate alerts in isolation without understanding context, causing analysts to miss real signals. AI addresses this by correlating events across multiple data sources to identify coordinated attacks hidden in the noise.',
          },
          {
            heading: 'How AI Transforms SOC Operations',
            list: [
              'Correlation at Scale — connects ten apparently unrelated alerts into a single identified attack pattern.',
              'Contextualized Incidents — analysts receive high-fidelity alerts enriched with context, risk scoring, and probable attack paths.',
              'SOAR Automation — routine tasks (isolating endpoints, blocking IPs) executed automatically at machine speed.',
              'Faster Decision-Making — shifts analyst focus from triaging noise to making strategic response decisions.',
            ],
          },
          {
            heading: 'AI as a Target — Model Drift',
            body: 'Once deployed, AI systems must be continuously monitored and protected. Model drift occurs when the data the AI encounters changes over time, causing performance to degrade — more false positives, missed threats, or misclassifications. If undetected, the SOC may become dependent on a tool that is no longer reliable.',
            list: [
              'Continuous Validation — monitor performance metrics; implement feedback loops and retraining processes.',
              'Adversarial Attacks on AI — attackers may manipulate inputs or poison data to cause the model to hide malicious activity.',
              'AI-specific incident response — security professionals must integrate AI model monitoring into operational processes.',
            ],
            note: 'AI should not be deployed and forgotten — it must be managed as a living component of the security architecture.',
          },
          {
            heading: 'Human-AI Balance',
            body: 'AI provides speed, scale, and intelligence. Humans provide context, judgment, and oversight. Over-reliance on automation leads to blind trust; ignoring it leads to inefficiency. The modern SOC must operate as a hybrid system.',
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
              'Waterfall — sequential phases (requirements → design → implementation → testing → deployment → maintenance); strength: predictability and documentation for regulated environments; weakness: security changes discovered late are very costly.',
              'Agile / Scrum — iterative 2-4 week sprints; strength: responsiveness to change; risk: security becomes secondary to speed; mitigation: embed security champions, integrate threat modeling into sprints.',
              'Scaled Agile (SAFe) — four configuration levels: Essential SAFe, Large Solution SAFe, Portfolio SAFe, Full SAFe; challenge: scaling security governance across multiple Agile Release Trains.',
              'Spiral — hybrid of Waterfall and iteration with risk as the core driver; formal risk assessment at each cycle; best for high-stakes systems (defense, critical infrastructure).',
              'DevOps — continuous integration/delivery via automation; risk: unvetted code moves to production rapidly.',
              'DevSecOps — embeds security scanners and policies directly into CI/CD pipeline; shift-left approach detects vulnerabilities early through SAST, DAST, and IaC scanning.',
            ],
          },
          {
            heading: 'Maturity Models',
            table: {
              headers: ['Model', 'Purpose', 'Structure', 'Use Case'],
              rows: [
                ['CMM', 'General process maturity', '5 levels (Initial → Optimizing)', 'Organizational process improvement'],
                ['SAMM', 'Secure software development', '4 Functions × 3 Practices × 5 Levels', 'Software security posture evaluation'],
                ['IDEAL', 'Change management lifecycle', '5 phases (Initiating → Learning)', 'Security program transformation'],
              ],
            },
          },
          {
            heading: 'CMM Levels',
            list: [
              '1. Initial — ad hoc, unpredictable processes.',
              '2. Repeatable — basic project management in place.',
              '3. Defined — organization-wide standards established.',
              '4. Managed — measured and controlled processes.',
              '5. Optimizing — continuous improvement culture.',
            ],
          },
          {
            heading: 'SAMM Business Functions',
            list: [
              'Governance — Strategy & Metrics, Policy & Compliance, Education & Guidance.',
              'Construction — Threat Assessment, Secure Architecture, Secure Build.',
              'Verification — Security Testing, Code Review, Security Assessment.',
              'Deployment — Environment Hardening, Operational Enablement, Defect Management.',
            ],
          },
          {
            heading: 'Integrated Product Team (IPT)',
            body: 'A multidisciplinary group spanning development, architecture, testing, operations, security, legal, and compliance that collaborates throughout the product lifecycle.',
            list: [
              'Security integrated from day one, not appended later.',
              'Early identification of threats via cross-functional input.',
              'Supports "shift left" by addressing risks during design.',
              'Shared ownership reduces blame and accelerates continuous improvement.',
            ],
          },
          {
            heading: 'Change Management in SDLC',
            list: [
              'Request Control — formal documentation of proposed changes.',
              'Change Control — review, evaluation, and approval/rejection with risk assessment; segregation of duties: requestor ≠ approver ≠ deployer.',
              'Release Control — deployment to live environment with testing and scheduling; every change requires a rollback plan.',
            ],
            note: 'Emergency changes still require streamlined approval and post-change review. Audit trails must document all modifications.',
          },
        ],
      },
      {
        id: 'd8t2',
        title: '8.2 Security Controls in Development Ecosystems',
        content: [
          {
            heading: 'Programming Language Security',
            list: [
              'Memory Safety — C/C++ lack built-in protections, making buffer overflows common; Java/Python use safer runtime sandboxing.',
              'Input Validation — critical for preventing injection attacks across all languages.',
              'Mobile Security — Swift (iOS) and Kotlin (Android) operate in permission-controlled environments.',
              'Supply Chain Risk — dependency hijacking: attackers register package names matching internal private dependencies.',
            ],
          },
          {
            heading: 'Security Tool Categories',
            table: {
              headers: ['Category', 'Purpose', 'Security Relevance'],
              rows: [
                ['Version Control', 'Track code changes', 'Provides accountability and traceability'],
                ['SAST', 'Analyze source code', 'Identifies flaws early in development'],
                ['DAST', 'Test running applications', 'Detects runtime vulnerabilities'],
                ['Dependency Management', 'Manage external packages', 'Prevents supply chain attacks'],
                ['Configuration Management', 'Standardize environments', 'Reduces configuration drift'],
                ['Monitoring/Logging', 'Real-time data collection', 'Enables detection and forensic analysis'],
                ['Test Automation', 'Automate testing', 'Ensures security fixes remain effective'],
                ['Infrastructure-as-Code', 'Define infrastructure', 'Creates auditable, reproducible setups'],
              ],
            },
          },
          {
            heading: 'Application Security Testing Methods',
            table: {
              headers: ['Method', 'Type', 'Key Strength', 'Key Limitation'],
              rows: [
                ['SAST', 'White-box (code)', 'Early detection, deep logic inspection', 'High false positives, no runtime context'],
                ['DAST', 'Black-box (runtime)', 'Realistic external attacker perspective', 'Limited internal insight'],
                ['SCA', 'Dependency analysis', 'Identifies inherited vulnerability risks', 'Only analyzes third-party components'],
                ['IAST', 'Hybrid (code + runtime)', 'Real-time insights with fewer false positives', 'Requires test environment setup'],
              ],
            },
          },
          {
            heading: 'IDE Security Risks',
            list: [
              'Plugin Risks — compromised extensions can leak credentials or source code.',
              'Credential Management — modern IDEs should warn about hardcoded secrets.',
              'Debug Safety — debug modes must be disabled in production to prevent sensitive data exposure.',
              'AI Code Suggestions — may introduce insecure patterns from training data.',
            ],
          },
          {
            heading: 'Runtime Security',
            list: [
              'RASP (Runtime Application Self-Protection) — embeds protection within applications to monitor and block attacks in real-time.',
              'Memory Exploitation — buffer overflows enable arbitrary code execution; use bounds checking.',
              'Resource Management — DoS attacks exploit memory leaks and resource exhaustion.',
              'Least Privilege — applications should only have permissions necessary for their functions.',
            ],
          },
          {
            heading: 'CI/CD Pipeline Security',
            body: 'Treat CI servers as production-level assets due to their access to secrets and deployment pipelines. Automation enables consistent security but can rapidly propagate malicious code.',
            list: [
              'Integrate SAST and SCA into pipeline gates (shift left).',
              'Use secrets management — never hardcode credentials in pipelines.',
              'Enforce RBAC on pipeline systems and audit all actions.',
              'Use SBOMs and trusted registries to prevent compromised components from reaching production.',
            ],
          },
          {
            heading: 'Code Repository Security',
            list: [
              'Role-based access control with branch protections.',
              'Commit signing to cryptographically verify developer identity.',
              'Secret scanning to detect leaked credentials.',
              'Mandatory pull request approval workflows and code reviews.',
              'MFA enforcement on repository access.',
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
        id: 'd8t4',
        title: '8.4 Assess Security Impact of Acquired Software',
        content: [
          {
            heading: 'COTS (Commercial Off-the-Shelf) Software',
            body: 'COTS shifts part of your trust boundary outside your organization. You are trusting not only the product but the vendor\'s entire supply chain. Key assessment areas:',
            table: {
              headers: ['Assessment Area', 'Key Questions'],
              rows: [
                ['Vendor Security', 'Do they follow secure SDLC? Can they provide pentest results and SBOM?'],
                ['Patch Management', 'Average time to patch? Can patches be automated?'],
                ['Configuration', 'Are default settings secure? Can the system be hardened effectively?'],
                ['Access Controls', 'Integrates with IAM? Supports RBAC and MFA?'],
                ['Logging & Monitoring', 'Logs compatible with your SIEM? Alerts for anomalies?'],
                ['Data Protection', 'Encrypted at rest and in transit? Who controls the keys?'],
                ['Contractual Safeguards', 'SLAs, breach notification, audit rights, exit clauses?'],
              ],
            },
            warning: 'Just because a product is commercially supported does not mean it is securely configured out of the box. Default settings are for ease of use, not security.',
          },
          {
            heading: 'Open Source Software (OSS)',
            list: [
              '"Many eyes" myth — code being open does not mean anyone is actively auditing it; Heartbleed lived in OpenSSL for years.',
              'Software Bill of Materials (SBOM) — inventory all OSS components and their versions; track CVEs in dependencies.',
              'Supply Chain Risk — a single compromised NPM/PyPI package can affect thousands of applications.',
              'Maintainership — assess who maintains the project; abandoned projects will not receive security patches.',
              'Licensing — viral licenses (GPL) may require you to open your own source code upon integration.',
              'Configuration — many OSS tools (Elasticsearch, MongoDB) shipped without authentication by default; harden before production.',
            ],
          },
          {
            heading: 'Third-Party Software',
            list: [
              'Shadow IT — departments install tools without security review; asset discovery is the essential first step.',
              'Integration Risk — every API, SSO connector, or file-sharing interface is a potential attack vector.',
              'Patch Dependency — you cannot create your own fixes; you depend entirely on the vendor\'s responsiveness.',
              'Contractual Protections — include breach notification, SLAs, audit rights, and termination clauses in vendor agreements.',
              'Outsourcing ≠ Delegating Responsibility — GDPR, HIPAA, and PCI-DSS make clear that you remain accountable for data handled by third parties.',
            ],
          },
          {
            heading: 'Managed Services and Cloud (SaaS/PaaS/IaaS)',
            table: {
              headers: ['Model', 'Customer Responsibility', 'Common Risk'],
              rows: [
                ['SaaS', 'User access, configurations, data protection, backup strategy', 'MFA not enforced; data retention misconfigured'],
                ['PaaS', 'Application code, configs, data; DevSecOps maturity', 'Vulnerable app deployed on patched platform'],
                ['IaaS', 'OS, applications, network, access controls, firewall rules', 'Misconfigured S3 buckets, open ports, weak IAM roles'],
              ],
            },
            note: 'Outsourcing services to a managed provider does not outsource security responsibility. Shared responsibility models define the boundary — and the customer always retains some obligations.',
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
      {
        id: 'd8t6',
        title: '8.6 Securing AI-Assisted Development in the Modern SDLC',
        content: [
          {
            heading: 'The New Reality: AI as a Coding Collaborator',
            body: 'Developers increasingly rely on AI tools that generate entire functions and suggest architecture patterns. AI models do not truly understand code — they predict it based on patterns. This creates "insecure by suggestion" risk: AI may recommend outdated cryptographic functions, improper input validation, or unsafe dependencies that developers accept without scrutiny.',
          },
          {
            heading: 'Shift-Left for AI-Generated Code',
            list: [
              'Treat AI-generated code as untrusted input requiring the same review as third-party libraries.',
              'Integrate SAST, DAST, and SCA tools into CI/CD pipelines that also analyze AI-generated components.',
              'Every commit, merge, and deployment must pass automated security gates.',
              'AI accelerates development — without automated controls, it also accelerates risk.',
            ],
          },
          {
            heading: 'AI Supply Chain Risks in Development',
            table: {
              headers: ['Risk', 'Description', 'Mitigation'],
              rows: [
                ['Model Hijacking', 'Attacker gains control over a model or manipulates its behavior via compromised dependencies', 'Verify model integrity; use trusted registries; monitor deployment pipelines'],
                ['Inference Attacks', 'Analyzing model outputs to reconstruct sensitive training data', 'Limit query access; implement differential privacy; monitor query patterns'],
                ['Poisoned Dependencies', 'Malicious ML libraries or datasets introduced into the development environment', 'SBOM for all AI components; pin dependency versions; scan before use'],
              ],
            },
          },
          {
            heading: 'Governing AI Tools in Development',
            list: [
              'Evaluate AI coding tools with the same rigor as third-party software — SBOM, vendor security practices, data handling.',
              'Define policies for which AI tools are approved for development use (prevent shadow AI in pipelines).',
              'Foster a culture of skepticism — developers should treat AI suggestions as starting points, not authoritative solutions.',
              'Security must be a continuous process spanning design, development, testing, deployment, and maintenance when AI is involved.',
            ],
          },
        ],
      },
    ],
  },
]
