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
      // ── 1.2 ──────────────────────────────────────────────────────────────
      {
        id: 'd1t2',
        title: '1.2 Understand and apply security concepts',
        content: [
          {
            subheading: '1.2.1 Confidentiality, integrity, and availability, authenticity, and nonrepudiation',
          },
          {
            body: 'The five pillars of information security are the principles that guide the design, implementation, and management of secure systems. Each one of the 5 pillars addresses an aspect of information security, ensuring that data and systems remain protected from various threats.',
            list: [
              'Confidentiality ensures that information is accessible only to those authorized to access it. This means protecting data from unauthorized disclosure or access, whether intentional or accidental. Techniques such as encryption, access controls, and user authentication help maintain confidentiality by ensuring that sensitive information remains secure and inaccessible to unauthorized users.',
              'Integrity refers to maintaining the accuracy, reliability and completeness of data over its entire lifecycle. It involves protecting data from unauthorized modification, deletion, or tampering. Integrity safeguards data from both intentional and unintentional undesired modifications. Ensuring data integrity involves implementing controls such as data validation, checksums, and digital signatures to detect and prevent unauthorized changes to data.',
              'Availability ensures that information and resources are accessible to authorized users when needed. This third pillar focuses on ensuring timely access to data and services. Measures such as redundancy, fault tolerance, and disaster recovery planning help maintain availability by ensuring continuous access to systems and resources.',
              'Authenticity verifies the identity of users and ensures that data or communications originate from a trusted source. It involves confirming the legitimacy of individuals, devices, or processes involved in accessing or transmitting information. Authentication mechanisms such as passwords, biometrics, and digital certificates help in establishing the authenticity of users and entities.',
              'Nonrepudiation ensures that individuals cannot deny their actions or transactions. It provides evidence to prove that a specific action occurred and that the parties involved cannot refute their involvement. Nonrepudiation mechanisms such as digital signatures, audit trails, and transaction logs help establish accountability and provide a means to trace actions back to their originators.',
            ],
            warning: 'Every cybersecurity expert should retain knowledge of the five pillars of information security, comprehend their significance, and demonstrate the capability to correctly associate practical examples with the respective pillar.',
          },
          {
            body: 'The five pillars theory represents an extension of the former CIA (Confidentiality, Integrity, Availability) triad concept.',
            warning: 'Information Security is often confused solely with Confidentiality, but it is important to know that while confidentiality protects data from unauthorized access, integrity ensures its accuracy and reliability, and availability ensures that information is accessible when needed.',
          },
          {
            body: 'The three "old" pillars (Confidentiality, Integrity and Availability), making the CIA triad, are interrelated, with availability being essential for upholding the other two. Therefore, to achieve comprehensive security, organizations must prioritize all three pillars of the CIA triad.',
          },
          {
            body: 'DAD (Disclosure, Alteration, Destruction) represents the opposite of the CIA triad (Confidentiality, Integrity, and Availability). Disclosure refers to unauthorized access to information, Alteration involves unauthorized modifications, and Destruction is the unauthorized deletion or damage of data. DAD is useful because it helps security professionals understand the potential threats to the system and data.',
            table: {
              headers: ['CIA Triad', 'Definition', 'DAD Threats', 'Definition'],
              rows: [
                ['Confidentiality', 'Access only for authorized users', 'Disclosure', 'Unauthorized access to information'],
                ['Integrity', 'Data remains accurate and unaltered', 'Alteration', 'Unauthorized modification of data'],
                ['Availability', 'Resources accessible when needed', 'Destruction', 'Unauthorized deletion or damage'],
              ],
            },
            warning: 'Excessive focus on security can sometimes lead to its own set of challenges. Emphasizing confidentiality too much may inadvertently limit availability, while an excessive focus on integrity can also restrict availability. Similarly, prioritizing availability excessively may compromise both confidentiality and integrity.',
          },
          {
            table: {
              headers: ['Concept', 'ISO 27001 Definition', 'NIST Definition', 'Synthetic Definition', 'Related Terms', 'Opposite', 'Protected By'],
              rows: [
                ['Confidentiality', 'Property that information is not made available or disclosed to unauthorized individuals.', 'The property that data or information is not made available or disclosed to unauthorized persons or processes.', 'Information is available only to authorized users.', 'Sensitivity, Discretion, Criticality, Concealment, Privacy', 'Disclosure', 'Encryption, Access Control'],
                ['Integrity', 'Property of accuracy and completeness.', 'The property that data or information have not been altered or destroyed in an unauthorized manner.', 'Information is accurate and complete.', 'Accuracy, Truthfulness, Validity, Accountability', 'Alteration', 'Hashing, Configuration Management, Change Management'],
                ['Availability', 'Property of being accessible and usable on demand by an authorized entity.', 'The property that data or information is accessible and usable upon demand by an authorized person.', 'Authorized users have access to information when needed.', 'Accessibility, Reliability, Uptime, Continuity, Responsiveness', 'Destruction', 'Access Control, RAID, Clustering, Load Balancing, Backups'],
                ['Authenticity', 'Property that an entity is what it claims to be.', 'The property of being genuine and able to be verified and trusted; confidence in validity of message originator.', 'Information is authentic and originates from its source.', 'Genuineness, Truthfulness, Originality, Trustworthiness', 'Inauthenticity', 'Digital Signatures, Chain of Custody, Blockchain, Watermarking'],
                ['Non-repudiation', 'Ability to prove the occurrence of a claimed event or action and its originating entities.', 'Assurance the sender is provided with proof of delivery and the recipient with proof of sender\'s identity.', 'A subject cannot deny performing an action or event.', 'Accountability, Traceability, Assurance, Immutability', 'Repudiation', 'MFA, 3rd party witnessing'],
              ],
            },
          },
          {
            body: 'While the CIA Triad (Confidentiality, Integrity, Availability) is the foundation of information security, Donn Parker introduced the Parkerian Hexad, which expands on these principles by adding three more security attributes:',
            list: [
              'Confidentiality – Ensuring information is only accessible to authorized users.',
              'Integrity – Protecting data from unauthorized modification.',
              'Availability – Ensuring systems and data are accessible when needed.',
              'Possession (or Control) – Ensuring ownership and control of data, preventing unauthorized possession even if confidentiality is intact.',
              'Authenticity – Verifying that data, communications, and identities are genuine.',
              'Utility – Ensuring that data is useful and in a functional format for its intended purpose.',
            ],
            note: 'The Hexad provides a broader, more nuanced view of information security, especially in modern environments where data ownership, authenticity, and usability are just as critical as confidentiality and integrity.',
          },
          {
            body: 'Having explored the 5 Pillars of Information Security and their foundational role in protecting information, it\'s essential to understand how these principles are enforced in practice. This is where the IAAA Framework comes into play, providing the mechanisms to implement and uphold the pillars effectively.',
          },
          {
            heading: 'The IAAA framework',
            body: 'The IAAA framework consists of four essential steps in access control and accountability:',
            list: [
              'Identification: This step involves individuals claiming an identity when attempting to access a secured system or resource. Identification typically involves providing a username, ID number, or other unique identifier.',
              'Authentication: After identification, authentication verifies the claimed identity to ensure it is legitimate. Authentication methods can include passwords, biometrics, security tokens, or other means to confirm the identity of the user.',
              'Authorization: Once authentication is successful, authorization determines the access rights and permissions granted to the authenticated identity. Authorization specifies what actions the user is allowed or denied regarding the system or resource based on their identity and role.',
              'Accountability: Accountability (or accounting) involves tracking and recording activities and events related to system access and usage. This step includes auditing and logging actions taken by users to maintain a record of who accessed what, when, and for what purpose. Accountability helps enforce security policies, investigate incidents, and hold individuals responsible for their actions.',
            ],
          },
          {
            body: 'Together, these four steps—Identification, Authentication, Authorization, and Accountability—form the foundation of access control and ensure secure and accountable usage of information systems and resources.',
          },
          {
            body: 'You may also come across the IAAAA framework, where the key distinction is the Auditing component. This focuses on monitoring and reviewing activities to ensure compliance and security. As a result, IAAAA offers a more comprehensive approach, enhancing accountability through regular checks and balances.',
          },
          {
            body: 'Historically, the AAA framework (Authentication, Authorization, Accountability) was the predecessor to IAAA and IAAAA. Interestingly, when searching IAAA in IETF documents, no results are found, whereas searching for AAA returns five pages of results.',
            note: 'Auditing vs Monitoring. Auditing is a systematic and retrospective process. It involves reviewing logs, records, and activities to ensure compliance with security policies, detect anomalies, and verify that processes are working as intended. Auditing typically occurs periodically (e.g., weekly, monthly) and focuses on accountability and long-term security improvements. Monitoring is a real-time or near-real-time process. It involves actively observing systems, networks, and activities to detect and respond to potential threats or unusual behavior as they occur. Monitoring is proactive and is used to identify and mitigate issues before they escalate.',
          },
          {
            body: 'Identity Assurance pertains to the degree of certainty a system possesses regarding a user\'s claimed identity, ensuring that they are indeed who they profess to be.',
            list: [
              'At Identity Assurance Level 1 (IAL1), users rely solely on self-assertion. While there is no external verification, users\' asserted identities are accepted, allowing for the entry of fictitious information during registration.',
              'Moving up to Identity Assurance Level 2 (IAL2), verification becomes mandatory. Users must substantiate their claimed identities by providing evidence, such as scanned government documents like a driver\'s license or confirming their address with a mailed verification code.',
              'Identity Assurance Level 3 (IAL3) demands in-person validation. This necessitates a physical visit, where users present their photo ID to a clerk, complete paperwork, which is then cross-checked against government or public databases, often requiring additional supporting documentation.',
            ],
          },
          {
            heading: 'Authenticator Assurance Levels (AAL)',
            body: 'Authenticator Assurance Levels (AAL) denote the extent to which users manage authenticators, such as passwords.',
            list: [
              'AAL1 offers moderate confidence, typically involving a single factor like a password, allowing for one or two-factor authentication.',
              'AAL2 ensures elevated confidence, mandating the provision of at least two factors.',
              'AAL3 delivers the utmost confidence, necessitating two factors alongside a cryptographic key and a physical device. This comprehensive approach, when coupled with a username/password combination, yields the highest level of authentication certainty.',
            ],
            note: 'The Identity Assurance Level (IAL) and Authenticator Assurance Level (AAL) levels 1, 2, and 3 are defined in the NIST Special Publication (SP) 800-63-3: Digital Identity Guidelines.',
          },
          {
            body: 'Other important concepts such as defense in depth, abstraction, data hiding, and obfuscation form the foundation of secure architectures. These principles are part of authoritative standards like ISO/IEC 27001 and NIST guidelines.',
          },
          {
            heading: 'Defense in depth',
            body: 'Defense in depth is a concept that emphasizes the use of multiple layers of security controls and mechanisms to protect data and systems. Rather than relying on a single line of defense, this approach states that if one control fails, others must be in place to mitigate the risk. This concept aligns with the principle of layered security. The implementation of defense in depth usually spans three key layers:',
            list: [
              'Physical Controls: that are tangible security measures such as locks, access badges, and surveillance systems to restrict unauthorized physical access to facilities and resources.',
              'Technical Controls: involving the use of technology, such as firewalls, intrusion detection systems (IDS), and encryption, to protect digital assets from cyber threats.',
              'Administrative Controls: such as policies, procedures, and training programs designed to manage personnel behavior and ensure compliance with security protocols.',
            ],
            note: 'According to NIST, the defense in depth strategy improves resilience by ensuring that multiple barriers must be overcome by an attacker to compromise a system. It also supports the principle of least privilege and the secure management of vulnerabilities.',
          },
          {
            heading: 'Abstraction',
            body: 'Abstraction refers to the process of simplifying complex systems by exposing only the necessary and relevant details to users or systems, while hiding the underlying complexity. This principle is commonly employed in access control and system design to reduce complexity and minimize security risks. For example, users interact with an operating system through high-level commands without needing direct access to its kernel-level functions. By abstracting these interactions, the system can enforce security controls more effectively, preventing unauthorized access to critical components. Abstraction is also used in data structures and object-oriented programming to encapsulate details and reduce attack surfaces. ISO/IEC 27001 highlights abstraction as a means to streamline operations while maintaining security.',
          },
          {
            heading: 'Data hiding',
            body: 'Data hiding focuses on concealing specific details of data or processes to limit access and reduce the risk of exposure to unauthorized parties. This principle ensures that only authorized users or systems have access to sensitive information, adhering to the principle of "need-to-know." Examples of data hiding include:',
            list: [
              'Masking sensitive information, such as Social Security numbers, in user interfaces.',
              'Segregating network traffic to isolate sensitive data.',
              'Using access control mechanisms to restrict visibility into database schemas or records.',
              'Data hiding is focused on security by minimizing the exposure of sensitive information.',
            ],
            warning: 'Data hiding is a concept different from security through obscurity that is a practice in which the security of a system or component relies on keeping its design, implementation, or flaws hidden from potential attackers. Security through obscurity is generally discouraged because it does not provide true security. While it may temporarily deter unsophisticated attackers, it fails against determined adversaries who can uncover hidden elements through reverse engineering, analysis, or brute force.',
          },
          {
            body: 'Examples of security through obscurity are: Hidden URLs: Using obscure or unlinked URLs to restrict access to sensitive resources without implementing proper authentication controls. Renaming Admin Accounts: Changing the default administrator username without implementing additional access controls. Proprietary Protocols: Relying on a custom, undocumented communication protocol to secure data transmission without encryption.',
            tip: 'Whatever your approach to cybersecurity, always remember the importance of measuring security. Security should deliver measurable benefits, and these benefits must be tracked using clear metrics.',
            questions: [
              { q: 'What are the five pillars of information security and what do they represent?', a: 'The five pillars are: Confidentiality, ensuring information is accessible only to authorized individuals; Integrity, maintaining the accuracy and completeness of data; Availability, ensuring authorized users have timely access to information; Authenticity, verifying the identity of users and the source of data; and Non-repudiation, proving actions or transactions and preventing denial of involvement.' },
              { q: 'Differentiate between the CIA triad and the DAD triad in information security.', a: 'The CIA triad stands for Confidentiality, Integrity, and Availability, representing the core principles of information security. The DAD triad represents the opposite: Disclosure, Alteration, and Destruction, highlighting potential threats to information systems.' },
              { q: 'Explain the concept of defense in depth and provide examples of its implementation across different layers.', a: 'Defense in depth employs multiple layers of security controls to protect data. Examples include physical controls like locks and surveillance, technical controls like firewalls and encryption, and administrative controls such as policies and training.' },
              { q: 'How do abstraction and data hiding contribute to enhancing security in information systems?', a: 'Abstraction simplifies complex systems by hiding unnecessary details, reducing complexity and minimizing security risks. Data hiding conceals specific data details, limiting access to sensitive information and adhering to the need-to-know principle.' },
              { q: 'What is the purpose of the IAAA framework and what are its four key steps?', a: 'The IAAA framework provides mechanisms for access control and accountability. Its four steps are Identification, claiming an identity; Authentication, verifying the claimed identity; Authorization, determining access rights; and Accountability, tracking and recording user activities.' },
              { q: 'Describe the differences between Identity Assurance Levels (IAL) 1, 2, and 3.', a: 'IAL1 relies on self-assertion without external verification. IAL2 requires evidence to support the claimed identity. IAL3 necessitates in-person validation with government or public databases.' },
              { q: 'Explain the significance of Authenticator Assurance Levels (AAL) and their role in authentication.', a: 'AALs denote the level of control users have over authenticators. AAL1 uses single-factor authentication. AAL2 mandates at least two factors. AAL3 requires two factors and a cryptographic key with a physical device for the highest authentication confidence.' },
              { q: 'Differentiate between auditing and monitoring in the context of information security.', a: 'Auditing is a retrospective review of logs and activities to ensure compliance and detect anomalies. Monitoring is a real-time observation of systems to identify and respond to potential threats.' },
              { q: 'Why is "security through obscurity" generally discouraged as a reliable security practice?', a: 'Security through obscurity relies on hiding system details, which is unreliable as determined adversaries can uncover these details. It fails to provide true security and is discouraged in favor of robust security practices.' },
              { q: 'Why is it important to measure the effectiveness of security measures, and how can this be achieved?', a: 'Measuring security effectiveness allows for demonstrating its value and identifying areas for improvement. This can be achieved through metrics such as the number of prevented incidents, mean time to detect and remediate threats, and compliance with security standards.' },
            ],
          },
        ],
      },
      // ── 1.3 ──────────────────────────────────────────────────────────────
      {
        id: 'd1t3-0',
        title: '1.3.0 Preface',
        content: [
          {
            body: 'Security governance is the name commonly given to the framework of practices and processes through which an organization plans, supports, evaluates, and manages its security efforts. Closely aligned with corporate and IT governance, it ensures that security initiatives are integrated into the broader goals of the organization. Effective security governance requires a holistic approach, embedding security into every aspect of the organization\'s operations and aligning it with legislative, regulatory, and compliance requirements.',
            tip: 'Security must be baked in your company: in its software, processes, policies, departments and personnel.',
          },
          {
            heading: 'GRC',
            body: 'GRC is the integrated collection of capabilities that enable an organization to reliably achieve objectives, address uncertainty, and act with integrity. GRC includes:',
            list: [
              'Governance: Ensuring that organizational activities support the business goals.',
              'Risk: Identifying, analyzing, and addressing risks that could interfere with operations.',
              'Compliance: Adhering to laws, regulations, and internal policies.',
            ],
          },
          {
            heading: 'Third-party governance',
            body: 'Third-party governance refers to the oversight and management of external entities that interact with an organization. This includes vendors, contractors, partners, and service providers who access or handle sensitive data or systems. Third-party governance is critical because these entities often introduce additional risks that can impact the organization\'s security.',
          },
          {
            body: 'Key aspects of third-party governance include:',
            list: [
              'Risk Assessments: Evaluating the security measures and risks associated with third-party entities.',
              'Service Level Agreements (SLAs): Clearly defining security expectations and responsibilities.',
              'Continuous Monitoring: Ensuring that third-party compliance with security requirements is maintained over time.',
            ],
          },
          {
            body: 'Without robust third-party governance, an organization\'s security can be undermined by vulnerabilities in its external partnerships.',
          },
          {
            heading: 'Documentation review',
            body: 'Documentation review is a critical component of security governance, especially in the context of obtaining an Authority to Operate (ATO). An ATO is a formal declaration that an information system is approved to operate within a specific environment, often required in government or highly regulated industries. Documentation review usually ensures:',
            list: [
              'Accuracy and Completeness: Policies, procedures, and system configurations must be thoroughly documented to demonstrate compliance.',
              'Risk Identification: Gaps or inconsistencies in documentation can reveal potential vulnerabilities.',
              'Audit Readiness: Comprehensive documentation facilitates audits and inspections by regulatory bodies.',
            ],
            tip: 'By conducting regular documentation reviews, organizations can validate that their security measures are effective and aligned with compliance requirements.',
            questions: [
              { q: 'How does security governance relate to an organization\'s overall goals?', a: 'Security governance aligns security initiatives with broader organizational goals, ensuring security efforts contribute to overall success.' },
              { q: 'Why is it crucial to integrate security into various aspects of a company, including software, processes, and personnel?', a: 'Integrating security into various facets creates a comprehensive and robust security posture, minimizing vulnerabilities across different areas.' },
              { q: 'Provide an example of how external factors influence an organization\'s security governance.', a: 'Laws like GDPR or industry-specific regulations like HIPAA directly shape security governance by mandating specific security practices and controls.' },
              { q: 'What is the significance of third-party governance in maintaining an organization\'s security posture?', a: 'Third-party governance addresses the risks introduced by external entities, ensuring they meet the organization\'s security standards and don\'t compromise its security.' },
              { q: 'Explain the purpose of conducting risk assessments in the context of third-party governance.', a: 'Risk assessments in third-party governance identify potential vulnerabilities and security gaps associated with third-party entities, informing mitigation strategies.' },
              { q: 'What role do Service Level Agreements (SLAs) play in third-party governance?', a: 'SLAs define clear security expectations and responsibilities for both the organization and the third party, establishing a contractual framework for security management.' },
              { q: 'Why is continuous monitoring of third parties essential for effective security governance?', a: 'Continuous monitoring ensures that third parties consistently adhere to security requirements, even as circumstances and risks evolve over time.' },
              { q: 'What is an Authority to Operate (ATO), and in what situations is it typically required?', a: 'An ATO is a formal authorization to operate an information system within a defined environment, typically required in government and highly regulated sectors to ensure security compliance.' },
              { q: 'How does documentation review contribute to ensuring the effectiveness of security measures?', a: 'Documentation review verifies the accuracy and completeness of security policies, procedures, and configurations, identifying potential gaps or inconsistencies.' },
              { q: 'Why is audit readiness an important consideration in security governance?', a: 'Audit readiness ensures an organization can readily demonstrate compliance with security regulations and standards during audits and inspections.' },
            ],
          },
        ],
      },
      {
        id: 'd1t3-1',
        title: '1.3.1 Alignment of the security function to business strategy, goals, mission, and objectives',
        content: [
          {
            body: 'Security management planning ensures the proper development, implementation, and enforcement of a security policy, aligning security functions with the organization\'s strategy, goals, mission, and objectives. This process involves crafting and deploying security measures based on factors such as business cases, budget constraints, and resource availability. Employing a top-down approach is often the most effective method for security management planning, with upper management taking the lead in initiating and defining organizational policies.',
            tip: 'Policies serve as guiding principles for all levels of the organizational hierarchy.',
          },
          {
            body: 'Middle management is tasked with refining the security policy into standards, baselines, guidelines, and procedures. Operational managers or security professionals then execute the configurations outlined in the security management documentation, while end users are responsible for adhering to all organizational security policies.',
            note: 'A top-down approach in information security helps establish a culture of security from the highest levels of the organization down to individual employees, fostering a comprehensive and proactive approach to safeguarding sensitive information and assets.',
          },
          {
            body: 'Effective security governance relies on a tiered planning structure, categorizing initiatives into Strategic, Tactical, and Operational horizons to ensure that daily activities directly support long-term organizational goals.',
          },
          {
            body: 'The Strategic Plan serves as a durable, long-term blueprint that articulates the organization\'s security purpose, aligning it with the overarching goals, mission, and objectives. With a typical lifespan of approximately five years, contingent upon annual maintenance and updates, it remains a crucial framework for guiding security initiatives and includes a comprehensive risk assessment.',
          },
          {
            body: 'In contrast, the Tactical Plan, a mid-term strategy, furnishes details on achieving the objectives outlined in the Strategic Plan or can be formulated ad hoc in response to unforeseen circumstances. Typically viable for about a year, it provides a focused approach to executing the broader strategic vision.',
          },
          {
            body: 'The Operational Plan, on the other hand, constitutes a short-term, meticulously delineated strategy derived from the Strategic and Tactical Plans. Although its relevance is fleeting, necessitating frequent updates (monthly or quarterly), it serves as the cornerstone for operational activities, ensuring alignment with tactical objectives.',
            note: 'Hierarchies play a crucial role in the CISSP approach, remember that plans, roles, documentation, and clearance levels must be appropriately structured and aligned within the organization chart.',
          },
          {
            body: 'Scoping and tailoring are employed to align security objectives with organizational goals: Scoping is a process review of a list of security baseline controls and selecting only those controls that apply to the IT system you\'re trying to protect. Tailoring refers to modifying the list of security controls within a baseline to align with the organization mission.',
            questions: [
              { q: 'Describe the key difference between the Strategic Plan and the Tactical Plan in security management.', a: 'The Strategic Plan is a long-term blueprint outlining the organization\'s overall security goals, while the Tactical Plan focuses on the mid-term and provides specific details on how to achieve the objectives set forth in the Strategic Plan.' },
              { q: 'Explain the role of middle management in the top-down approach to security management.', a: 'Middle management translates the high-level security policy set by upper management into specific standards, baselines, guidelines, and procedures that can be implemented by operational staff.' },
              { q: 'What is the purpose of scoping and tailoring in information security?', a: 'Scoping and tailoring ensure that security controls are relevant and efficient. Scoping selects only necessary controls, while tailoring modifies them to align with the organization\'s specific mission and risk profile.' },
              { q: 'How does the Operational Plan relate to the Strategic and Tactical Plans?', a: 'The Operational Plan is a short-term, actionable plan derived from the Strategic and Tactical Plans. It focuses on the day-to-day operations necessary to achieve the objectives outlined in the higher-level plans.' },
              { q: 'Why is a top-down approach considered effective in establishing a culture of security within an organization?', a: 'A top-down approach ensures that security is a priority for leadership, which sets a clear tone and expectation for the entire organization. This fosters a proactive security culture where everyone understands their role in protecting sensitive information.' },
              { q: 'Who is ultimately responsible for adhering to organizational security policies in a top-down approach?', a: 'Ultimately, all members of the organization, including end-users, are responsible for adhering to the established security policies in a top-down approach.' },
              { q: 'Why are hierarchies considered crucial in the CISSP approach to security management?', a: 'Hierarchies ensure clear lines of responsibility and accountability. They define the roles and permissions related to security management, planning, documentation, and clearance levels, contributing to a well-structured and manageable security framework.' },
            ],
          },
        ],
      },
      {
        id: 'd1t3-2',
        title: '1.3.2 Organizational processes (e.g., acquisitions, divestitures, governance committees)',
        content: [
          {
            body: 'Security governance is vital for organizations to address various aspects, including acquisitions, divestitures, and governance committees. In an acquisition, a company purchases another company\'s assets, resulting in the acquired company\'s dissolution. The acquiring company may choose to retain the acquired business\'s name. Conversely, in a merger, two companies combine assets to establish a new entity. Mergers are common when both companies possess comparable influence and scale. Divestiture involves either fully or partially selling off a product line, business unit, division, or subsidiary. It\'s often viewed as a preferred growth strategy over diversification, involving the complete or partial transfer of assets, personnel, facilities, and inventory. The primary goal of divestiture is to discontinue a business segment, freeing up resources for more advantageous and profitable ventures.',
          },
          {
            body: 'Acquisitions and Mergers: Acquisitions and mergers introduce heightened risks such as information disclosure, data loss, and downtime. Without proper security considerations, the risks associated with obtained products persist throughout their deployment lifecycle. To mitigate these risks, it\'s essential to conduct thorough evaluations and integrate security assessments during the acquisition process.',
          },
          {
            body: 'Divestitures: Divestitures involve selling off parts of an organization, necessitating stringent security measures to prevent data leakage and maintain confidentiality. Cybersecurity professionals must collaborate closely with business and legal teams to identify and mitigate potential vulnerabilities. Additionally, segmenting the Information Security Management System (ISMS) ensures compliance without revealing sensitive information during audits.',
          },
          {
            body: 'When assessing a third party for security integration, take into account the following procedures as effective chances to evaluate the 3rd party:',
            list: [
              'Conduct an On-Site Assessment: Visit the organization\'s premises to conduct interviews with staff and observe their operational practices.',
              'Review Document Exchange: Investigate how data and documents are exchanged, along with the formal procedures for conducting assessments and reviews.',
              'Review Processes and Policies: Request copies of security policies, processes, procedures, as well as documentation of incidents and responses for thorough examination.',
              'Third-Party Audit: Engage an independent third-party auditor, accredited by the American Institute of Certified Public Accountants (AICPA), to conduct an impartial review of the entity\'s security infrastructure based on Service Organization Control (SOC) reports.',
            ],
          },
          {
            heading: 'System and Organization Controls (SOC) reports',
            body: 'System and Organization Controls (SOC) reports are independent audit reports that evaluate the security, availability, and compliance of an organization\'s systems, particularly cloud service providers and third-party vendors. These reports are critical in risk management, vendor assessments, and regulatory compliance. There are three main types of SOC reports, each serving different purposes:',
          },
          {
            heading: 'SOC 1: Financial Reporting Controls',
            body: 'Purpose: Evaluates controls related to financial transactions and reporting. Audience: Accounting and finance teams, auditors, and companies relying on a vendor for financial processing (e.g., payroll, accounting systems). Example: A payroll processing service undergoes a SOC 1 audit to prove its system properly calculates and processes salaries without errors.',
          },
          {
            heading: 'SOC 2: Security, Availability, and Privacy Controls',
            body: 'Purpose: Focuses on security, availability, processing integrity, confidentiality, and privacy of data (based on the AICPA Trust Services Criteria). Audience: IT, cybersecurity, and compliance teams evaluating third-party vendors. Types: SOC 2 Type I evaluates security controls at a single point in time (design effectiveness). SOC 2 Type II evaluates controls over a longer period (3-12 months) to verify operational effectiveness. Example: A cloud service provider (e.g., AWS, Google Cloud) undergoes a SOC 2 audit to prove it secures customer data properly.',
          },
          {
            heading: 'SOC 3: Publicly Available SOC 2 Report',
            body: 'Purpose: A high-level summary of SOC 2 findings, meant for public distribution. Audience: Potential customers and stakeholders who want to confirm a company\'s security posture without seeing detailed audit results. Example: A SaaS company publishes a SOC 3 report on its website to reassure customers about its security compliance.',
          },
          {
            table: {
              headers: ['SOC Type', 'Purpose', 'Audience', 'Types (if any)', 'Example'],
              rows: [
                ['SOC 1', 'Evaluates controls related to financial transactions and reporting.', 'Accounting and finance teams, auditors, and companies relying on a vendor for financial processing', '–', 'A payroll processing service undergoes a SOC 1 audit to prove its system properly calculates salaries.'],
                ['SOC 2', 'Focuses on security, availability, processing integrity, confidentiality, and privacy of data (AICPA Trust Services Criteria).', 'IT, cybersecurity, and compliance teams evaluating third-party vendors', 'Type I: Design effectiveness at a point in time | Type II: Operational effectiveness over time', 'A cloud provider undergoes a SOC 2 audit to prove it secures customer data properly.'],
                ['SOC 3', 'High-level summary of SOC 2 findings for public distribution.', 'Potential customers and stakeholders', '–', 'A SaaS company publishes a SOC 3 report online to reassure customers about its security compliance.'],
              ],
            },
            warning: 'Audit the auditor: You are accountable to verify the credibility and integrity of those responsible for evaluating or assessing your organization\'s activities, processes, or compliance.',
          },
          {
            body: 'Business Enablement refers to the process of empowering an organization to take on new opportunities, markets, or capabilities. It involves leveraging technology, innovation, or strategic changes to open new possibilities. This concept goes beyond optimizing existing operations; it creates value by enabling activities or services that were previously out of reach.',
          },
          {
            body: 'Process Enhancement refers to improving existing processes to increase efficiency, reduce waste, and enhance the quality of outcomes. This typically involves process re-engineering—redesigning workflows, systems, or operations to achieve better performance.',
            table: {
              headers: ['Category', 'Business Enablement', 'Process Enhancement'],
              rows: [
                ['Objective', 'Create new opportunities and capabilities', 'Improve existing operations'],
                ['Focus', 'Innovation and new value creation', 'Optimization and efficiency'],
                ['Approach', 'Strategic and forward-looking', 'Tactical and performance-oriented'],
                ['Examples', 'Entering a new market | Launching new tech', 'Automating workflows | Reducing waste'],
                ['Outcome', 'Expands business horizons', 'Boosts competitiveness and margins'],
              ],
            },
          },
          {
            heading: 'Governance committees',
            body: 'Governance committees play a crucial role in overseeing organizational structures and practices (also during mergers, acquisition and divestitures). A governance committee is a group of stakeholders responsible for overseeing an organization\'s cybersecurity strategy, policies, and compliance. It ensures that cybersecurity efforts align with the organization\'s goals, risk appetite, and regulatory requirements.',
          },
          {
            body: 'Key Functions of a Governance Committee are usually:',
            list: [
              'Strategic Oversight: Sets the direction for cybersecurity initiatives, ensuring they support business objectives.',
              'Policy Development: Approves and reviews security policies and ensures they are updated regularly.',
              'Risk Management: Monitors cybersecurity risks and ensures appropriate mitigation measures are in place.',
              'Compliance: Ensures adherence to regulatory and legal requirements for cybersecurity.',
              'Accountability: Assigns roles and responsibilities for cybersecurity and holds teams accountable.',
            ],
          },
          {
            body: 'Who Typically Participates in a governance committee:',
            list: [
              'Senior executives (e.g., CIO, CISO, or CTO)',
              'Legal and compliance officers',
              'Risk management professionals',
              'Representatives from business units',
              'Board members in larger organizations',
            ],
            note: 'A governance committee is more likely to be present in companies that face high risks, regulatory pressures, or operational complexity. It reflects a mature and proactive approach to cybersecurity management.',
          },
          {
            heading: 'SABSA (Sherwood Applied Business Security Architecture)',
            body: 'SABSA is a framework and methodology used to develop a risk-driven, business-aligned enterprise security architecture. It focuses on integrating security into business processes by linking security solutions directly to business goals, risks, and requirements. The framework is structured around six layers, starting from Business Requirements and cascading down to Operational Security Controls. It uses a matrix approach, and emphasizes aligning security strategies with business objectives through its lifecycle phases: Strategy and Planning, Design, Implementation, and Management.',
            table: {
              headers: ['Layer', 'Focus', 'Key Question', 'Output'],
              rows: [
                ['Business Requirements', 'Business goals and drivers', 'What are the business needs?', 'Business goals, risks, and objectives'],
                ['Security Conceptual', 'Security strategies to meet business goals', 'What needs to be secured?', 'Security architecture aligned to business'],
                ['Logical Architecture', 'Security services and functions', 'How should it be secured?', 'Security policies and service definitions'],
                ['Physical Architecture', 'Technology and infrastructure design', 'With what resources?', 'Security solutions and tools'],
                ['Component Architecture', 'System-specific implementations', 'How is it implemented?', 'Technology configurations and integration'],
                ['Operational Architecture', 'Management and operations', 'How is it managed?', 'Processes, monitoring, and response plans'],
              ],
            },
            questions: [
              { q: 'Differentiate between acquisitions and mergers in the context of business operations.', a: 'An acquisition involves one company purchasing another, leading to the acquired company\'s dissolution. In contrast, a merger combines two companies\' assets to create a new entity, typically when both companies have comparable influence and size.' },
              { q: 'Explain the primary objective of divestiture and why it is often preferred over diversification.', a: 'Divestiture aims to discontinue a business segment by selling it off entirely or partially. This frees up resources for more profitable and strategic ventures. It is often favored over diversification because it allows companies to focus on core competencies and streamline operations.' },
              { q: 'How do acquisitions and mergers pose cybersecurity risks? Provide specific examples.', a: 'Acquisitions and mergers introduce risks like information disclosure, data loss, and downtime. For example, integrating disparate IT systems can create vulnerabilities, and employee layoffs or changes in access control can lead to data breaches.' },
              { q: 'Why is stringent cybersecurity crucial during divestitures?', a: 'During divestitures, safeguarding sensitive data and maintaining confidentiality are paramount. Failure to implement robust cybersecurity measures can result in data leakage to competitors or unauthorized parties, damaging reputation and incurring legal liabilities.' },
              { q: 'What are the key steps to consider when evaluating a third party for security integration?', a: 'Key steps include conducting on-site assessments, reviewing document exchange protocols, examining security policies and incident response documentation, and engaging an independent third-party auditor for a comprehensive review.' },
              { q: 'What does "Audit the auditor" mean in the context of third-party security assessments?', a: '"Audit the auditor" emphasizes the need to verify the credibility and integrity of the third-party auditor responsible for assessing your organization\'s security posture. This ensures the objectivity and reliability of the assessment findings.' },
              { q: 'Distinguish between business enablement and process enhancement.', a: 'Business enablement focuses on leveraging technology and innovation to unlock new opportunities and capabilities. It goes beyond optimizing existing processes and aims to create new value propositions. Conversely, process enhancement involves improving existing processes to increase efficiency and quality of outcomes.' },
              { q: 'What is a governance committee in the realm of cybersecurity?', a: 'A governance committee in cybersecurity is a group of stakeholders responsible for overseeing an organization\'s cybersecurity strategy, policies, and compliance. They ensure that cybersecurity efforts align with business goals, risk appetite, and regulatory requirements.' },
              { q: 'List three key functions of a cybersecurity governance committee.', a: 'Three key functions are: (1) Strategic Oversight: setting the direction for cybersecurity initiatives; (2) Risk Management: monitoring cybersecurity risks and ensuring appropriate mitigation measures; (3) Compliance: ensuring adherence to regulatory and legal cybersecurity requirements.' },
              { q: 'Describe the SABSA framework and its primary focus.', a: 'The SABSA (Sherwood Applied Business Security Architecture) framework provides a structured methodology for developing a risk-driven, business-aligned enterprise security architecture. It focuses on integrating security into business processes by directly linking security solutions to business goals, risks, and requirements.' },
            ],
          },
        ],
      },
      {
        id: 'd1t3-3',
        title: '1.3.3 Organizational roles and responsibilities',
        content: [
          {
            body: 'A security role refers to the contribution an individual makes to the implementation and management of security measures within an organization. These roles may not always be explicitly defined in job descriptions, as they can vary and evolve over time. Understanding security roles is essential for establishing effective communication and support frameworks within an organization.',
            table: {
              headers: ['Role', 'Description'],
              rows: [
                ['Senior Manager / Functional Leader / Owner / Controller', 'Ultimately responsible for the security maintained by an organization. Must sign off on all security policy issues and exercise due diligence in establishing security. Responsible for determining sensitivity/classification levels and access privileges.'],
                ['Security Professional / IT Security Officer', 'Trained and experienced engineer responsible for implementing security policies and solutions mandated by senior management. Focuses on protection more than function and implements security based on approved policies.'],
                ['Custodian', 'Implements prescribed protection as defined by policy and senior management. Responsible for backups, data integrity, deployment of solutions, and storage management.'],
                ['User', 'Any person with access to the secured system, tied to work tasks and least privilege. Must follow procedures and operate within defined security parameters.'],
                ['Auditor', 'Reviews and verifies implementation of security policies and solutions. Produces compliance/effectiveness reports and issues new directives based on findings.'],
                ['Chief Executive Officer (CEO)', 'Oversees day-to-day operations, strategic planning, and finances. Sets budgets, builds partnerships, ensures growth, and overall company success.'],
                ['Chief Financial Officer (CFO)', 'Handles accounting and financial activities. Determines financial needs, creates capital structure, oversees forecasting and budgeting.'],
                ['Chief Information Officer (CIO)', 'Oversees technology and information systems. Aligns IT with business goals, ensures secure operations, and leads the security program strategy.'],
                ['Chief Privacy Officer (CPO)', 'Ensures protection of personal and sensitive data. Oversees privacy policies, legal compliance, and often reports to the CSO.'],
                ['Chief Security Officer (CSO)', 'Understands and mitigates security risks. Creates the security program, ensures compliance, and protects assets and reputation.'],
                ['Data Owner', 'Responsible for classifying, securing, and approving disclosure of information. Defines access rights and handles security violations. Delegates daily protection to custodians.'],
                ['Data Custodian', 'Maintains and protects data by implementing controls, performing backups, ensuring integrity, and meeting policy requirements.'],
                ['System Owner', 'Oversees system security throughout lifecycle. Ensures integration of controls, reports vulnerabilities, and collaborates with data owners and response teams.'],
                ['Security Administrator', 'Implements and maintains security tools and systems. Manages user accounts, software, passwords, and focuses on network protection.'],
                ['Supervisor (User Manager)', 'Manages user activity and assets. Ensures users follow security responsibilities and informs admin of role changes.'],
                ['Change Control Analyst', 'Reviews and approves/rejects change requests to systems or software. Ensures changes are secure and maintain performance.'],
                ['Data Analyst', 'Organizes and structures data to meet company objectives. Works with data owners to align data storage with business needs.'],
              ],
            },
            note: 'Security roles need to be in sync and cohesive with organizational structures. Certain companies may define and assign roles to oversee data, systems, and processes (e.g., data owner, system owner, process owner).',
          },
          {
            warning: 'Privacy vs Cybersecurity. Privacy refers to the rights individuals have to control their personal information and how it\'s used. It\'s about ensuring that personal data is handled responsibly, often under specific regulations or laws. Cybersecurity, however, is the practice of protecting data, networks, and systems from attacks, breaches, and unauthorized access. It includes technologies, processes, and practices designed to safeguard systems from threats like hacking or malware. Cybersecurity is essential for achieving privacy because, without strong security measures, personal data is vulnerable to unauthorized access and exploitation, which would undermine the privacy protections put in place.',
            note: 'The GDPR (General Data Protection Regulation) is commonly misinterpreted as a "privacy law," but it\'s actually a data protection law. It establishes rules for how organizations should protect the personal data of EU citizens, emphasizing the security and proper handling of data.',
            questions: [
              { q: 'Differentiate between the roles of a Data Owner and a Data Custodian.', a: 'The Data Owner is ultimately responsible for the protection and use of specific information, including defining security requirements and access rights. The Data Custodian implements and maintains security controls for data protection, following the guidelines set by the Data Owner.' },
              { q: 'Explain the principle of least privilege and its relevance to user access.', a: 'The principle of least privilege limits user access to only the resources necessary for their job duties. This minimizes the potential for unauthorized access or damage in case of accidental or malicious activity.' },
              { q: 'What are the primary responsibilities of a Security Professional/IT Security Officer?', a: 'The Security Professional/IT Security Officer implements security policies and solutions defined by senior management. They focus on protecting the organization\'s assets and systems from threats.' },
              { q: 'How does the role of an Auditor contribute to the effectiveness of a security policy?', a: 'The Auditor reviews and verifies the implementation of the security policy and identifies any weaknesses or deviations. Their reports help ensure compliance and the effectiveness of security measures.' },
              { q: 'What is the significance of change control in maintaining network security?', a: 'Change control ensures that any modifications to the network, systems, or software are approved and implemented securely. It helps prevent the introduction of vulnerabilities that could compromise security.' },
              { q: 'Explain the difference between privacy and cybersecurity.', a: 'Privacy concerns the rights individuals have over their personal information and how it is used. Cybersecurity focuses on protecting data, networks, and systems from threats and unauthorized access.' },
              { q: 'Why is cybersecurity essential for achieving privacy?', a: 'Strong cybersecurity measures are necessary to prevent unauthorized access and exploitation of personal data. Without cybersecurity, privacy protections would be undermined.' },
              { q: 'How does the GDPR contribute to data protection?', a: 'The GDPR establishes rules for organizations on protecting the personal data of EU citizens. It emphasizes data security, proper handling, and individuals\' rights regarding their data.' },
            ],
          },
        ],
      },
      {
        id: 'd1t3-4',
        title: '1.3.4 Security control frameworks',
        content: [
          {
            body: 'Security control frameworks specify formalized sets of controls or security measures that organizations should adopt to safeguard their assets and mitigate risks. The following table describes the most common:',
            table: {
              headers: ['Framework', 'Description'],
              rows: [
                ['ISO 27001', 'Widely used security framework providing best practice recommendations for an ISMS (Information Security Management System). Defines 94 controls across 4 categories (Annex A): Organizational Controls: 37, People Controls: 8, Physical Controls: 14, Technological Controls: 34.'],
                ['ISO 27002', 'Provides the Code of practice for information security controls, serving as implementation guidance for ISO 27001 controls.'],
                ['NIST 800-53', 'Offers a set of security controls for US federal agencies (and optional for other companies).'],
                ['NIST RMF', 'Provides a comprehensive, flexible, repeatable, and measurable 7-step process for managing information security and privacy risk.'],
                ['COBIT', 'Developed by IT auditors at ISACA, useful for audit and assurance work, focusing on control objectives for information and related technologies.'],
                ['ITIL', 'Defines best practices for delivering IT services aligned with business goals, especially around change, configuration, access, event, and availability management.'],
                ['HIPAA', 'Framework focused on safeguarding medical information, particularly relevant in the healthcare industry.'],
                ['SOX', 'US federal law requiring top management to certify financial accuracy. Emphasizes integrity and availability of financial records.'],
                ['FedRAMP', 'Standardized approach for security assessment, authorization, and monitoring of cloud products/services used by US federal agencies.'],
                ['FISMA', 'Defines security requirements for US federal agencies and contractors; mandates agency-wide information security programs.'],
                ['PCI DSS', 'Ensures secure payment transactions and protection of cardholder data. Widely used in finance and retail.'],
                ['SABSA', 'Sherwood Applied Business Security Architecture; a risk- and business-aligned framework for enterprise security architecture.'],
                ['CIS', 'The Center for Internet Security Controls consists of 18 controls, including inventory, data protection, configuration, vulnerability management, and more.'],
              ],
            },
            warning: 'Frameworks undergo regular updates, and while you are not required to know their specific release versions, you should be familiar with the primary topics they cover.',
          },
          {
            warning: 'It is advisable not to rely on memorization of the table above. To truly understand its content, it is necessary to invest time in studying each framework thoroughly. While memorizing the table might suffice for answering some CISSP questions, the information may be forgotten shortly after the exam.',
          },
          {
            body: 'Remember that ISO/IEC 27001 and NIST SP 800-53 are two widely recognized frameworks for managing and implementing information security controls. ISO 27001 is an international standard for information security management systems (ISMS), used globally by organizations of all sizes and industries. NIST SP 800-53 is a U.S.-focused standard providing detailed security and privacy controls, widely adopted by federal agencies and private organizations needing compliance with government regulations.',
          },
          {
            body: 'They have in common:',
            list: [
              'Risk-Based Approach: Both frameworks emphasize identifying and mitigating risks to protect assets.',
              'Control Categories: They cover similar areas like access control, incident response, and physical security.',
              'Customizability: Both allow organizations to tailor controls based on their specific needs and risks.',
              'Focus on Continuous Improvement: Both encourage ongoing monitoring, assessment, and refinement of security measures.',
            ],
          },
          {
            body: 'While their key differences are:',
            table: {
              headers: ['Aspect', 'ISO 27001', 'NIST SP 800-53'],
              rows: [
                ['Origin', 'International (ISO/IEC Standard)', 'U.S. National Institute of Standards and Technology (NIST)'],
                ['Scope', 'Broad, global, applicable to any industry', 'Primarily U.S. government agencies but adaptable for others'],
                ['Focus', 'Management framework for ISMS', 'Detailed technical and operational controls'],
                ['Certification', 'Offers certification via audits', 'No formal certification process; self-assessment'],
                ['Detail Level', 'High-level control objectives', 'Highly detailed, specific control implementations'],
              ],
            },
            questions: [
              { q: 'What is the purpose of security control frameworks?', a: 'Security control frameworks provide formalized sets of controls and security measures that organizations can implement to protect their assets and mitigate potential risks. They offer a structured approach to information security management.' },
              { q: 'What are three key differences between ISO 27001 and NIST 800-53?', a: 'ISO 27001 is an internationally recognized standard, while NIST 800-53 is primarily for US federal agencies. ISO 27001 focuses on establishing an ISMS, while NIST 800-53 provides a catalog of specific security controls. ISO 27001 is more flexible and principle-based, while NIST 800-53 is more prescriptive.' },
              { q: 'How does COBIT relate to IT auditing and assurance work?', a: 'COBIT is developed by ISACA, a professional association for IT auditors. It focuses on control objectives for information and related technologies, providing a framework for auditors to assess and evaluate IT controls within an organization.' },
              { q: 'Describe the relationship between ITIL and business goals.', a: 'ITIL emphasizes aligning IT services with business objectives. It offers best practices for IT service management processes, ensuring that IT operations effectively support the organization\'s overall goals and contribute to its success.' },
              { q: 'What specific industry is HIPAA designed to protect, and why?', a: 'HIPAA is designed to protect the healthcare industry by safeguarding sensitive patient health information. It establishes privacy and security rules to prevent unauthorized access, use, or disclosure of protected health information (PHI).' },
              { q: 'What is the main focus of SOX, and how does it impact financial reporting practices?', a: 'SOX aims to ensure the accuracy and reliability of financial reporting by publicly traded companies. It mandates top management certification of financial information and strengthens internal controls to prevent financial fraud and accounting scandals.' },
              { q: 'Explain the purpose of FedRAMP and its relevance to cloud services.', a: 'FedRAMP provides a standardized approach for assessing, authorizing, and continuously monitoring the security of cloud products and services used by the US Federal Government. It ensures that cloud solutions meet the necessary security requirements before being adopted by federal agencies.' },
              { q: 'How does FISMA contribute to information security within US Federal Government agencies?', a: 'FISMA requires US Federal Government agencies and contractors to develop and implement agency-wide information security programs. It establishes a framework for managing risks, protecting sensitive data, and ensuring the secure operation of federal information systems.' },
              { q: 'What is the primary goal of PCI DSS, and what type of data does it aim to secure?', a: 'PCI DSS aims to secure payment card transactions and protect cardholder data from theft and fraud. It establishes security standards for organizations that handle credit card information, including requirements for data encryption, access control, and network security.' },
              { q: 'How does SABSA differ from other frameworks in its approach to security architecture?', a: 'SABSA distinguishes itself by focusing on aligning security architecture with business objectives. It provides a framework for risk management and security design that is closely integrated with the organization\'s overall business goals and strategies.' },
            ],
          },
        ],
      },
      {
        id: 'd1t3-5',
        title: '1.3.5 Due care/due diligence',
        content: [
          {
            body: 'Illustrating due diligence and due care stands as the sole method to refute negligence in the event of a loss. Senior management is obligated to exhibit due care and due diligence to mitigate their responsibility and legal liability in case of a loss.',
            table: {
              headers: ['Aspect', 'Due Care', 'Due Diligence'],
              rows: [
                ['When?', 'Entails promptly rectifying issues.', 'Involves a more comprehensive process including investigation into the underlying causes of incidents, events, or breaches.'],
                ['Mnemonic', 'Do control', 'Do detect'],
                ['What', 'Promptly implementing measures to initiate mitigation procedures.', 'Ensuring tasks were executed correctly and determining whether further action or research is warranted.'],
                ['What Man Rule?', 'Adheres to the principle of doing what is morally and ethically right, often called the prudent man rule.', 'Aligns with the experienced man rule, ensuring actions follow a thorough, risk-informed process.'],
                ['Dependencies', 'Relies on information provided by due diligence to make informed and responsible decisions.', 'Must be completed first to inform proper due care actions.'],
                ['Focus', 'Action', 'Knowledge'],
                ['Term', 'Short term', 'Long term'],
              ],
            },
          },
          {
            body: 'Due diligence involves the creation of a structured security framework comprising a security policy, standards, baselines, guidelines, and procedures. On the other hand, due care entails the ongoing implementation of this security framework across the IT infrastructure of an organization.',
            note: 'Distinguishing between due care and diligence could present a challenge in your CISSP exam or job interview. Ensure comprehension of the provided table, but refrain from overanalyzing to avoid potential pitfalls.',
            tip: 'Due care: Do control. Due diligence: Do detect.',
            questions: [
              { q: 'What is the primary purpose of demonstrating due care and due diligence in a cybersecurity context?', a: 'Demonstrating due care and due diligence is crucial to refute claims of negligence in the event of a security incident or loss. It helps senior management mitigate their responsibility and potential legal liability.' },
              { q: 'How does the "when" aspect differentiate due care from due diligence?', a: 'Due care emphasizes promptly rectifying identified issues, while due diligence involves a more comprehensive and ongoing process of investigating underlying causes and implementing preventative measures.' },
              { q: 'Explain the "What Man Rule" in relation to due care and due diligence.', a: 'Due care aligns with the "prudent man rule," implying actions taken are morally and ethically sound. Due diligence follows the "experienced man rule," meaning actions are thorough and informed by established risk parameters.' },
              { q: 'Why is due diligence considered a prerequisite for due care?', a: 'Due diligence involves thorough investigation and analysis, providing the necessary information for informed decision-making and responsible action, which constitute the essence of due care.' },
              { q: 'What are the temporal focuses of due care and due diligence?', a: 'Due care focuses on short-term, immediate actions to address current issues. Due diligence takes a long-term approach, aiming to prevent future incidents and build a robust security framework.' },
              { q: 'How does the concept of "Do Control" relate to due care?', a: '"Do Control" emphasizes the proactive aspect of due care, highlighting the implementation of measures to control and mitigate potential risks.' },
              { q: 'How does the concept of "Do Detect" relate to due diligence?', a: '"Do Detect" represents the investigative nature of due diligence, focusing on detecting vulnerabilities, analyzing incidents, and identifying areas for improvement.' },
              { q: 'Describe the role of a structured security framework in the context of due care and due diligence.', a: 'Due diligence involves creating a structured security framework encompassing policies, standards, and procedures. Due care ensures the ongoing implementation and enforcement of this framework across the IT infrastructure.' },
              { q: 'Provide a concise example illustrating the difference between due care and due diligence in a real-world scenario.', a: 'Scenario: A company discovers a data breach. Due diligence: Conducting a thorough investigation to identify the cause, compromised data, and attacker. Due care: Implementing immediate measures to contain the breach, patching vulnerabilities, and notifying affected parties.' },
            ],
          },
        ],
      },
      // ── 1.4 ──────────────────────────────────────────────────────────────
      {
        id: 'd1t4-1',
        title: '1.4.1 Cybercrimes and data breaches',
        content: [
          {
            note: 'As a security professional, you are anticipated to communicate effectively with C-level executives, operational personnel, and external stakeholders such as lawyers. However, it is equally important to recognize your limitations and know when to seek legal advice when necessary.',
          },
          {
            body: 'Every organization should be addressing essential inquiries such as: What measures are in place to safeguard our information and assets? What are the information security challenges specific to our organization within a global framework? What is the current state of the threat landscape? This scrutiny is crucial due to the lucrative nature of cybercrime, which often leads organizations to refrain from acknowledging victimization or pursuing cybercriminals.',
          },
          {
            body: "While it's impossible to thwart every attack, implementing effective security measures can deter cyber intrusions by rendering them unprofitable, labor-intensive, and cost-prohibitive. In essence, organizations must not present themselves as easy targets for cyber threats.",
            note: "You may never achieve complete invulnerability for your company, but it's essential to find the appropriate compromise to ensure your company is adequately protected.",
          },
          {
            body: "The laws highlighted in the following table pertain to federal regulations in the United States. It's important to note that nearly every state in the country has implemented legislation addressing computer security matters. Due to the internet's worldwide influence, many computer-related crimes transcend state boundaries, thus falling within federal jurisdiction and undergoing prosecution in federal courts.",
            table: {
              headers: ['Federal Law', 'Year', 'Description'],
              rows: [
                ['Computer Crime and Abuse Act (CCCA)', '1984', 'Outlined prohibited actions including: Unauthorized access to classified or financial federal systems; Accessing federally used computers without authorization; Perpetrating fraud using federal computers; Causing over $1,000 damage to federal systems; Altering medical records impacting care; Trafficking computer passwords tied to interstate commerce or federal systems.'],
                ['Computer Fraud and Abuse Act (CFAA)', '1986', 'Extended the CCCA by increasing the damage threshold to $5,000 and expanding scope to all "federal interest" computers, including any computer used by the U.S. government or financial institutions.'],
                ['CFAA Amendments (Computer Abuse Amendments Act)', '1994', 'Added provisions to: Prohibit malicious code creation; Expand jurisdiction to interstate commerce systems; Allow imprisonment regardless of intent; Enable civil remedies for victims (injunctions, compensation).'],
                ['National Information Infrastructure Protection Act', '1996', 'Expanded the CFAA to: Cover international commerce systems; Protect critical infrastructure (railroads, pipelines, grids, telecom); Classify intentional/reckless damage to national infrastructure as felonies.'],
                ['Federal Information Security Management Act (FISMA)', '2002', 'Mandated NIST to define security standards. Key components: Periodic risk assessments; Security policy development; Security training and testing; Incident response processes; Continuity planning for information systems.'],
                ['Federal Cybersecurity Laws (FISMA Modernization, Cybersecurity Enhancement Act)', '2014', 'Modernized federal cybersecurity with: DHS taking primary responsibility (except DoD and intelligence); NIST tasked with voluntary cybersecurity standards (SP 800 series); Creation of the National Cybersecurity and Communications Integration Center (DHS).'],
              ],
            },
            note: 'Scope and fines of the cybercrimes law in the table above are commensurate to the year in which they have been released.',
          },
          {
            body: 'A data breach represents the ultimate breakdown of the CIA triad, where sensitive information is subjected to unauthorized viewing, theft, or use by an untrusted individual. A breach is rarely just a technical failure; it is often a failure of Strategic and Tactical planning, where inadequate controls or unpatched vulnerabilities allow an adversary to bypass security perimeters. Whether the root cause is a sophisticated external attack, a misconfigured cloud database, or a simple lapse in operational discipline, the consequences extend far beyond immediate data loss—triggering legal liabilities, regulatory fines, and a long-term erosion of organizational trust.',
            warning: 'We should treat every breach as a "Lessons Learned" opportunity to refine Incident Response procedures and strengthen the defense-in-depth layers that protect an organization\'s most valuable assets.',
            questions: [
              { q: 'How can organizations make themselves less attractive targets for cybercriminals, even if complete invulnerability is unattainable?', a: 'Organizations can deter cyber intrusions by implementing security measures that make attacks unprofitable, labor-intensive, and cost-prohibitive. This involves layering security controls, establishing robust incident response plans, and fostering a culture of security awareness.' },
              { q: 'Why is understanding federal jurisdiction important in the context of computer-related crimes?', a: "Understanding federal jurisdiction is crucial because many computer-related crimes cross state lines due to the internet's global reach. Federal laws like the CFAA provide a framework for prosecuting these offenses in federal courts, ensuring consistent enforcement and addressing the complexities of cybercrime." },
              { q: 'Explain the key expansions introduced by the National Information Infrastructure Protection Act of 1996.', a: "The National Information Infrastructure Protection Act of 1996 expanded the CFAA's scope to include computer systems used in international commerce, extended protections to critical infrastructure beyond computing systems, and classified intentional or reckless damage to such infrastructure as felonies." },
              { q: 'What are the primary responsibilities outlined for NIST under FISMA of 2002?', a: 'Under FISMA, NIST is responsible for developing guidelines for implementing information security programs, including conducting risk assessments, establishing policies and procedures, providing security awareness training, and ensuring the continuity of operations for organizational information systems.' },
              { q: 'What were the primary objectives of the cybersecurity legislation of 2014?', a: 'The 2014 cybersecurity legislation aimed to modernize federal cybersecurity efforts by centralizing responsibility under the Department of Homeland Security, tasking NIST with coordinating voluntary cybersecurity standards, and establishing a national center for cybersecurity collaboration.' },
              { q: 'How does the CFAA of 1986 differ from the CCCA of 1984?', a: 'The CFAA of 1986 expanded upon the CCCA of 1984 by increasing the damage threshold from $1,000 to $5,000 and broadening the scope from federal computers processing sensitive data to all "federal interest" computers, including those used by financial institutions and systems involved in interstate commerce.' },
              { q: 'What significant changes were introduced by the CFAA Amendments of 1994?', a: 'The CFAA Amendments of 1994 prohibited the creation of malicious code, expanded jurisdiction to any computer involved in interstate commerce, allowed imprisonment regardless of intent, and granted victims the right to pursue civil remedies.' },
            ],
          },
        ],
      },
      {
        id: 'd1t4-2',
        title: '1.4.2 Licensing and Intellectual Property requirements',
        content: [
          {
            body: 'Intellectual property (IP) encompasses intangible assets like company names, creative works, and proprietary formulas or techniques. Laws exist to protect the rights of IP owners, ensuring fairness and preventing unauthorized use or reproduction of their creations.',
            warning: 'With the advancement of AI, intellectual property is evolving rapidly. Be prepared to encounter related questions in your exams and address it in your cybersecurity career.',
          },
          {
            body: 'The Digital Millennium Copyright Act (DMCA) is a comprehensive United States copyright law enacted in 1998 to address copyright issues arising from the rapid growth of the internet and digital technologies. It criminalizes the production and dissemination of technology, devices, or services intended to circumvent measures that control access to copyrighted works. Additionally, the DMCA provides safe harbors from liability for internet service providers and online platforms that host user-generated content, as long as they comply with certain requirements, including implementing a notice-and-takedown procedure for addressing copyright infringement claims.',
          },
          {
            table: {
              headers: ['Symbol', 'Name', 'Duration', 'Applies To', 'Notes', 'Attacks'],
              rows: [
                ['©', 'Copyright', 'Life of the author + 70 years; Work for hire: 95 years from publication or 120 years from creation (whichever is shorter)', 'Literary, musical, dramatic, pictorial, sculptural, motion pictures, sound recordings, architectural works', "Protects original works from unauthorized duplication; Automatically applies upon creation; Ownership defaults to creator unless it's work-for-hire", 'Piracy – Unauthorized copying or use of the material'],
                ['™ (unregistered) / ® (registered)', 'Trademark', '10 years (renewable indefinitely)', 'Words, slogans, logos', 'Must not be similar to existing marks; Must not be merely descriptive; Registration provides legal standing; Can be renewed indefinitely', 'Counterfeiting – Fake products posing as real brand; Dilution – Generic use of brand names (e.g., "Xerox")'],
                ['(none)', 'Patent', '20 years', 'Processes, machines, manufactured items', 'Must be new, useful, and non-obvious; Provides exclusive rights to the invention for a limited period; Requires formal application and approval', 'Infringement – Unauthorized use, even unintentionally'],
                ['(none)', 'Trade Secret', 'Indefinite (as long as it is kept secret and protected via NDA/NCA)', 'Confidential business info (e.g., formulas, recipes, processes)', "No formal registration required; Used to protect information you never want disclosed (e.g., Coca-Cola recipe); Enforced through contracts (NDAs/NCAs)", 'Espionage – Theft of confidential information for competitive advantage'],
              ],
            },
            tip: 'A patent is the strongest form of Intellectual Property Protection.',
          },
          {
            body: 'Security professionals should possess knowledge of the legal aspects concerning software licensing agreements. There are four prevalent types of license agreements in use today:',
            list: [
              'Contractual license agreements involve a written contract delineating responsibilities between the software vendor and customer, commonly utilized for expensive or specialized software packages.',
              'Shrink-wrap license agreements are displayed on the exterior of software packaging and typically include a clause implying agreement upon breaking the shrink-wrap seal.',
              'Click-through (or browser wrap) license agreements, increasingly common, present contract terms either on the software box or within documentation, requiring users to actively acknowledge agreement during installation.',
              'Cloud services license agreements extend click-through agreements, often omitting written agreements and displaying legal terms on-screen for users to review, typically leading to users quickly clicking through without thorough examination.',
            ],
          },
          {
            table: {
              headers: ['License Type', 'Description', 'Common Use'],
              rows: [
                ['Contractual License', 'A written contract outlining responsibilities between vendor and customer.', 'Expensive or specialized software packages'],
                ['Shrink-Wrap License', 'Terms printed on the software packaging; agreement is implied by breaking the shrink-wrap seal.', 'Packaged, boxed software'],
                ['Click-Through License (a.k.a. Browser Wrap)', 'Terms are shown on-screen or in documentation; user must click "I agree" during installation.', 'Widely used in downloadable/installable software'],
                ['Cloud Services License', 'Extends click-through model; terms are shown on-screen during use or setup, often without a separate written contract.', 'SaaS and cloud-based services'],
                ['Perpetual License', 'A one-time purchase that grants the user the right to use the software indefinitely, though support and updates may expire unless renewed separately.', 'Traditional desktop software'],
                ['Subscription License', 'A recurring payment model (e.g., monthly or yearly) where the user can use the software only while the subscription is active.', 'Modern SaaS and cloud apps'],
                ['Open-Source License', "Allows users to access, modify, and share the software's source code under specific conditions set by licenses like GPL, MIT, or Apache.", 'Developer tools, Linux distributions'],
                ['Freeware', 'Software that is free to use but usually closed-source and with restrictions on modification, redistribution, or commercial use.', 'Utilities, media players'],
                ['Enterprise License Agreement (ELA)', 'A custom agreement for large organizations that bundles multiple licenses and services under negotiated terms and pricing.', 'Large enterprises'],
                ['End User License Agreement (EULA)', 'A legal contract that defines how the end user is allowed to use the software, including rights, restrictions, and liabilities.', 'Most commercial software'],
                ['Concurrent Use License', 'A license that permits a specific number of users to access the software simultaneously, regardless of how many total users have it installed.', 'Lab or classroom environments'],
                ['Named User License', 'A license assigned to a specific individual, allowing them to use the software on multiple devices, but not transferable to others.', 'Professional tools'],
              ],
            },
            warning: "In a written contract, the customer typically has the opportunity to actively participate in the creation of the contract by negotiating its terms and signing the final document. However, in shrink-wrap and click-through agreements, the customer's role is limited to accepting the terms of the contract as presented by the seller or service provider.",
            questions: [
              { q: 'What is the significance of the DMCA in the context of intellectual property protection in the digital age?', a: 'The DMCA, enacted in 1998, criminalizes the production and distribution of technologies designed to circumvent copyright protection measures. It also establishes safe harbor provisions for online platforms that host user-generated content if they comply with specific requirements, including a notice-and-takedown system for copyright infringement claims.' },
              { q: 'Differentiate between trademarks and copyrights in terms of what they protect and their duration.', a: 'Trademarks protect distinctive marks, symbols, or slogans used to identify and differentiate goods or services in the marketplace, offering protection for 10 years, renewable indefinitely. Copyrights protect original creative works, granting authors exclusive rights for their lifetime plus 70 years.' },
              { q: 'Briefly describe the three main requirements for an invention to be eligible for patent protection.', a: 'To be eligible for patent protection, an invention must meet three criteria: novelty (it must be new), utility (it must have a practical purpose), and non-obviousness (it must not be readily apparent to someone skilled in the relevant field).' },
              { q: 'Why are trade secrets considered a valuable form of intellectual property protection?', a: 'Trade secrets offer indefinite protection for confidential information that provides a competitive edge, such as formulas, processes, or customer lists. Safeguarding measures include non-disclosure agreements (NDAs) and non-compete agreements (NCAs) to restrict access and prevent unauthorized disclosure or use.' },
              { q: 'Explain the concept of "works for hire" in copyright law and how ownership is determined.', a: '"Works for hire" refer to creations made by employees within the scope of their employment or commissioned works under contract. In these cases, the employer or commissioning party holds the copyright ownership rather than the individual creator.' },
              { q: 'What distinguishes a contractual license agreement from a shrink-wrap license agreement?', a: 'Contractual license agreements involve a written contract negotiated between the software vendor and customer, outlining specific terms and conditions for software use. In contrast, shrink-wrap license agreements are typically pre-printed terms and conditions found on the exterior of software packaging, where opening the package implies acceptance of the terms.' },
              { q: 'How do click-through license agreements function, and what are some potential concerns?', a: 'Click-through agreements present terms and conditions on-screen, requiring users to actively click "I agree" or a similar button to proceed. Concerns arise as users often click through without thoroughly reading the terms, potentially agreeing to unfavorable conditions.' },
              { q: 'Provide an example of trademark counterfeiting and explain how it harms the original brand.', a: "Counterfeiting occurs when products are intentionally designed to deceive consumers into believing they are purchasing genuine branded goods. For instance, producing fake luxury handbags bearing a renowned designer's logo constitutes trademark counterfeiting, harming the brand's reputation and profits." },
              { q: 'What is the primary risk associated with patent infringement?', a: "Patent infringement occurs when an individual or entity uses, sells, or manufactures a patented invention without the patent holder's authorization. The primary risk is facing legal action from the patent holder, potentially leading to injunctions, substantial financial damages, and legal fees." },
              { q: 'Explain the concept of "fair use" in copyright law and provide an example.', a: '"Fair use" is a legal doctrine in copyright law that permits the limited use of copyrighted material without the copyright holder\'s permission for purposes such as criticism, commentary, news reporting, teaching, scholarship, or research. An example is using brief excerpts from a copyrighted book in a scholarly article for analysis or critique.' },
            ],
          },
        ],
      },
      {
        id: 'd1t4-3',
        title: '1.4.3 Import/export controls',
        content: [
          {
            body: 'The identical computers and encryption technologies utilized in powering the internet and facilitating e-commerce possess significant potential as formidable tools when wielded by a military force. Country-based rules and laws concerning import and export controls are established to regulate the movement of products, technologies, and information across borders, typically aimed at safeguarding national security, individual privacy, and economic interests.',
          },
          {
            body: 'The Wassenaar Arrangement aims to enhance international security and stability by overseeing the transfer of conventional weapons like firearms, explosives, naval weaponry, and landmines, as well as dual-use items and technologies. In 2013, the agreement underwent revisions to encompass cyber weapons, which include malicious software, command-and-control systems, and Internet surveillance tools.',
          },
          {
            body: 'The International Traffic in Arms Regulations (ITAR) is a US regulation designed to oversee the export of items listed in the United States Munitions List (USML), including missiles, rockets, and bombs, to maintain control over their dissemination.',
          },
          {
            body: 'The Export Administration Regulations (EAR) primarily addresses items intended for commercial use, such as computers and marine equipment, but also covers products with potential military applications, even if initially designed for commercial purposes.',
          },
          {
            body: 'Both the EAR and the ITAR mandate that U.S. residents seek permission before disseminating controlled technology or technical data to foreign individuals within the United States. When such information is shared with a foreign person, it is considered an export to the individual\'s country or countries of citizenship. To prevent a deemed export scenario, organizations providing information to foreign nationals must obtain a license from the U.S. government before disclosing controlled technology or technical data to nonimmigrants.',
            table: {
              headers: ['Regulation', 'Weapons', 'Software/Hardware', 'USML (U.S. Munitions List)', 'Commercial Use'],
              rows: [
                ['Wassenaar Arrangement', '●', '●', '', ''],
                ['International Traffic in Arms (ITAR)', '●', '', '●', ''],
                ['Export Administration Regulations (EAR)', '', '', '', '●'],
              ],
            },
            questions: [
              { q: 'What is the dual nature of technology used in the internet and e-commerce, and how does this relate to military applications?', a: 'The same technologies that drive the internet and e-commerce, such as powerful computers and advanced encryption, can also be utilized for military purposes, including cyber warfare and surveillance. This duality makes these technologies subject to export controls to prevent potential misuse.' },
              { q: 'What is the primary objective of country-based import and export control laws?', a: 'Import and export control laws are primarily designed to safeguard national security, protect individual privacy, and promote economic interests. These regulations aim to control the flow of sensitive goods, technologies, and information across national borders.' },
              { q: 'How does the Wassenaar Arrangement contribute to international security and stability?', a: 'The Wassenaar Arrangement promotes international security and stability by regulating the transfer of conventional weapons and dual-use goods and technologies, including cyber weapons. By fostering transparency and cooperation among member countries, the arrangement aims to prevent the proliferation of arms and sensitive technologies that could destabilize global security.' },
              { q: 'What specific types of items fall under the purview of ITAR?', a: 'The ITAR controls the export of items specifically listed on the United States Munitions List (USML). This list includes military equipment like missiles, rockets, bombs, firearms, and other defense articles that are deemed critical to national security.' },
              { q: 'Explain the primary focus of the Export Administration Regulations (EAR).', a: 'The EAR primarily focuses on items intended for commercial use, such as computers, electronics, and marine equipment. However, it also covers products with potential military applications, even if originally designed for commercial purposes.' },
              { q: 'What is the concept of a "deemed export" and under what circumstances does it occur?', a: 'A "deemed export" occurs when controlled technology or technical data is shared with a foreign national within the United States. This sharing is considered equivalent to physically exporting the information to the individual\'s home country, triggering export control regulations.' },
              { q: 'What action is required to prevent a "deemed export" situation?', a: 'To prevent a "deemed export" situation, organizations must obtain a license from the U.S. government before disclosing controlled technology or technical data to non-immigrant foreign nationals in the United States.' },
              { q: 'What is the USML and what does it stand for?', a: 'USML stands for the United States Munitions List. It is a comprehensive list maintained by the U.S. government outlining defense articles, services, and related technical data subject to export controls under ITAR.' },
              { q: 'Differentiate between items typically found on the USML and those regulated by the EAR.', a: 'Items on the USML are primarily military in nature, such as weapons systems, ammunition, and military vehicles. The EAR, on the other hand, typically regulates commercial items like computers, electronics, and software, although some may have potential military applications.' },
            ],
          },
        ],
      },
      {
        id: 'd1t4-4',
        title: '1.4.4 Transborder data flow',
        content: [
          {
            body: "For numerous years, authorities have aimed to control the transfer of data collected within their territories to foreign nations. In certain instances, regulations aimed to safeguard individuals' private information, while in others, the state's interest lay in accessing the data for legitimate governmental needs. The advent of cloud computing and extensive data collection by public and private entities has intensified scrutiny on the transfer of such information.",
          },
          {
            body: 'The global economy thrives on data, which serves as a fundamental component of trade, generating substantial revenue even when lacking privacy-related content. Moreover, data considered legal in one jurisdiction could be deemed illegal in another, making the safeguarding of data movement a major policy priority.',
          },
          {
            body: "Data Sovereignty is the extent to which data is subject to the laws of a country, regardless of its storage location. Data sovereignty entails the recognition that data owners or controllers must be cognizant of pertinent regulations to ensure adherence and prevent breaches of restrictions governing data usage and processing. Depending on the jurisdiction, data owners may be required to demonstrate compliance with these regulations by accounting for their data. It's essential to understand that data sovereignty can transcend the borders of the country where the data is physically stored. For instance, data belonging to a European Union resident housed in the United States is subject to both EU and US data sovereignty regulations. It's crucial to distinguish data sovereignty from data privacy, as data privacy laws such as the GDPR prioritize responsible data safeguarding for individuals, while data sovereignty determines the scope of these data privacy laws.",
          },
          {
            body: 'Data residency pertains to where data is physically stored and processed, ensuring compliance with legal and regulatory frameworks based on its location. This concept is crucial in cloud computing and international data transfers, impacting data privacy, security, and compliance with local laws.',
          },
          {
            body: 'Data localization involves storing and processing data within a specific country\'s borders, driven by regulatory, security, and national interest factors. It aims to exert control over data, enhance national security, ensure privacy, and support economic interests within the jurisdiction.',
            note: 'Data residency outlines the intended geographical storage and processing of data, data sovereignty is about the rights and control over data based on the jurisdiction of the data storage and processing, and data localization mandates data to remain within a specific location and jurisdiction.',
          },
          {
            table: {
              headers: ['Concept', 'Definition', 'Key Focus', 'Example', 'Distinction From Others'],
              rows: [
                ['Data Sovereignty', "The extent to which data is subject to a country's laws, regardless of where it is stored.", 'Legal jurisdiction and compliance', "EU citizen's data stored in the U.S. is still subject to EU laws.", "Goes beyond physical location; relates to who has authority over the data, not where it's stored. Distinct from data privacy."],
                ['Data Residency', 'The physical/geographical location where data is stored and processed.', 'Location-based legal compliance', 'An organization stores Canadian user data in Canadian servers to meet local legal standards.', "Focuses on where data lives. Supports data sovereignty, but doesn't define legal control over it."],
                ['Data Localization', "The requirement to store and process data strictly within a country's borders.", 'National control and security', 'India mandates that financial data of its citizens must remain within India.', 'A strict form of data residency. Legally enforces that data cannot cross borders. Often motivated by national security and economic policies.'],
              ],
            },
            warning: 'CISOs and security professionals need to adopt a comprehensive strategy for data security. This begins by categorizing and charting the organization\'s data, pinpointing its storage and movement, and understanding its sensitivity, location, legal obligations, and business requirements. This analysis aids in recognizing data necessitating specific measures for residency, sovereignty, or localization, as well as third parties involved in managing the organization\'s data.',
            questions: [
              { q: 'How has the evolution of technology impacted concerns surrounding data transfer?', a: 'The advent of cloud computing and extensive data collection has intensified scrutiny on the transfer of data across borders due to concerns about privacy and government access.' },
              { q: 'Define data sovereignty. How does it relate to the physical location of data?', a: "Data sovereignty is the extent to which data is subject to the laws of a country, regardless of where it is physically stored. Data sovereignty acknowledges that even if data is stored outside a country's borders, it may still be subject to that country's laws." },
              { q: 'Explain the relationship between data sovereignty and data privacy.', a: 'Data sovereignty determines the scope and applicability of data privacy laws. While data privacy laws like the GDPR focus on safeguarding individual data, data sovereignty dictates which privacy laws apply based on the data\'s jurisdiction.' },
              { q: 'What is data residency and why is it particularly important in cloud computing?', a: 'Data residency refers to the physical location where data is stored and processed. It is crucial in cloud computing because data can be distributed across multiple locations, requiring organizations to comply with various legal and regulatory frameworks.' },
              { q: 'What are the potential consequences for organizations that fail to comply with data residency requirements?', a: 'Organizations that fail to comply with data residency requirements may face legal penalties, reputational damage, and loss of customer trust.' },
              { q: 'Define data localization. What are the key motivations behind it?', a: "Data localization requires data to be stored and processed within the borders of a specific country. It is driven by factors such as regulatory compliance, national security concerns, data privacy protection, and promoting domestic economic interests." },
            ],
          },
        ],
      },
      {
        id: 'd1t4-5',
        title: '1.4.5 Issues related to privacy (e.g., GDPR, CCPA, PIPL, POPIA)',
        content: [
          {
            body: 'Privacy, a longstanding principle in Western culture, dictates that information pertaining to an individual should be safeguarded from disclosure, a concept spanning millennia. However, with the advent of new technologies, this notion of privacy has been significantly challenged. Modern advancements, such as ubiquitous cellular phone tracking and detailed shopping monitoring, pose unprecedented threats to personal privacy, while governmental surveillance, including widespread facial recognition technology, further encroaches upon individual liberties. Security professionals face the task of ensuring organizational activities align with pertinent privacy laws while mitigating risks associated with managing personal information across its lifecycle.',
            warning: 'Privacy, akin to Intellectual Property, faces significant disruption due to the pervasive influence of AI.',
          },
          {
            table: {
              headers: ['Framework', 'Description'],
              rows: [
                ['Universal Declaration of Human Rights', 'Everyone is entitled to protection against arbitrary intrusion into their privacy, family life, home, or correspondence, as well as safeguarding their honor and reputation.'],
                ['OECD Privacy Principles', 'Widely adopted in international privacy laws and programs. Its eight principles cover aspects such as: lawful and fair data collection, data quality, purpose specification, use limitation, security safeguards, openness, individual participation, and accountability.'],
                ['Asia-Pacific Economic Cooperation (APEC)', 'Emphasizes the protection of personally identifiable information during cross-border transfers. It highlights organizational accountability and introduces the concept of proportionality in data breach penalties.'],
              ],
            },
          },
          {
            body: 'General Data Protection Regulation (GDPR): The GDPR is a comprehensive data protection law enacted by the European Union (EU) to regulate the processing of personal data of individuals within the EU and European Economic Area (EEA). It imposes strict requirements on organizations handling personal data, including consent for data processing, data subject rights, data breach notification, and obligations for data controllers and processors. Non-compliance can result in severe penalties, including hefty fines of up to 4% of annual global turnover or €20 million, whichever is higher.',
          },
          {
            body: 'California Consumer Privacy Act (CCPA): The CCPA is a landmark privacy law in the United States that grants California residents certain rights regarding their personal information. It requires businesses to disclose data collection and sharing practices, provide opt-out mechanisms for selling personal information, and allow consumers to access, delete, and control their data. The CCPA applies to companies meeting specific criteria, including those with annual gross revenues exceeding $25 million or those handling large volumes of personal information.',
          },
          {
            body: 'Personal Information Protection Law (PIPL) - China: The PIPL is China\'s comprehensive privacy legislation aimed at regulating the processing of personal information within the country. It establishes principles for the lawful collection, use, processing, and transfer of personal data and imposes obligations on organizations to protect individuals\' rights. The law introduces concepts such as explicit consent, data localization requirements, and heightened penalties for non-compliance, including fines of up to 5% of annual revenue or ¥50 million.',
          },
          {
            body: 'Protection of Personal Information Act (POPIA): The POPIA is South Africa\'s data protection law designed to safeguard the privacy rights of individuals and regulate the processing of personal information. It sets out conditions for lawful data processing, data subject rights, security measures, and requirements for data breaches notification. Organizations must comply with POPIA\'s provisions, which include hefty fines and potential imprisonment for contraventions.',
            table: {
              headers: ['Privacy Law', 'Jurisdiction', 'Description'],
              rows: [
                ['General Data Protection Regulation (GDPR)', 'European Union (EU) / EEA', 'A comprehensive regulation governing the processing of personal data. Requires consent, ensures data subject rights, mandates breach notifications, and sets strict responsibilities for data controllers and processors. Non-compliance may result in fines up to €20 million or 4% of global annual turnover.'],
                ['California Consumer Privacy Act (CCPA)', 'United States (California)', 'Grants California residents rights over their personal information. Requires transparency in data collection and sharing, opt-out options for data sale, and access or deletion rights for consumers. Applies to companies meeting revenue or data processing thresholds, such as $25 million+ in annual revenue.'],
                ['Personal Information Protection Law (PIPL)', 'China', "China's comprehensive data privacy law. Requires explicit consent, regulates cross-border data transfers, imposes strict data protection duties, and enforces data localization in certain cases. Non-compliance may lead to fines up to ¥50 million or 5% of annual revenue."],
                ['Protection of Personal Information Act (POPIA)', 'South Africa', 'Regulates lawful data processing, ensures individual rights, mandates breach notifications, and outlines security obligations. Non-compliance can lead to heavy fines or imprisonment.'],
              ],
            },
          },
          {
            body: 'The following table contains some common terms in use in the privacy field (many definitions are taken from GDPR and shared with other laws and regulations):',
            table: {
              headers: ['Term', 'Definition'],
              rows: [
                ['Data Controller (Data Owner)', 'The natural or legal person, public authority, agency, or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data.'],
                ['Data Processor', 'A natural or legal person, public authority, agency, or other body which processes personal data on behalf of the controller.'],
                ['Data Protection Officer (DPO)', 'An individual designated to oversee data protection and privacy matters within an organization, ensuring compliance with relevant regulations such as GDPR.'],
                ['Data Custodian', 'Responsible for implementing and maintaining safeguards for data based on the instructions of the data owner. Must have clearly defined responsibilities.'],
                ['Data Subject', 'The individual to whom personal data relates.'],
                ['Personal Data', 'Any information relating to an identified or identifiable natural person (data subject); an identifiable person can be recognized, directly or indirectly, by reference to identifiers such as name, ID number, location data, or online identifier.'],
                ['Processing', 'Any operation performed on personal data, whether automated or not, including collection, recording, organization, storage, adaptation, retrieval, consultation, use, disclosure, dissemination, alignment, restriction, erasure, or destruction.'],
              ],
            },
          },
          {
            body: 'A Privacy Impact Assessment (PIA) is a process conducted by an organization to assess whether personal data is adequately protected and to mitigate potential risks associated with it. The objectives of a PIA include identifying and evaluating privacy-related risks, determining appropriate controls to mitigate these risks, and ensuring organizational compliance with privacy regulations. The steps involved in a PIA encompass: identifying the need for the assessment; describing the data processing activities; evaluating necessity and proportionality; consulting relevant stakeholders; identifying and assessing risks; implementing measures to mitigate these risks; documenting outcomes; ongoing monitoring and review.',
            note: 'The terms Privacy Impact Assessment (PIA), Data Privacy Impact Assessment, and Data Protection Impact Assessment (DPIA) are often used interchangeably, but they can have distinct meanings depending on the context and jurisdiction. PIA is a general process used in various countries. DPIA is a specific type of impact assessment mandated by GDPR, focused on processing activities likely to result in a high risk to individuals\' rights. Data Privacy Impact Assessment is a hybrid term combining both PIA and DPIA aspects.',
            tip: 'There is no need to remember the 8 standard steps of a PIA but it is mandatory to remember that a PIA is a process conducted by an organization to assess whether personal data is adequately protected.',
            questions: [
              { q: 'What is the core principle of privacy as rooted in Western culture?', a: 'The core principle is that information pertaining to an individual should be safeguarded from disclosure, ensuring their autonomy and dignity are preserved across millennia.' },
              { q: 'How has modern technology challenged traditional notions of privacy?', a: 'Technologies such as mobile phone tracking, targeted shopping behavior monitoring, and widespread facial recognition have made it easier to collect and exploit personal data without explicit consent, posing serious threats to personal privacy.' },
              { q: 'What is the purpose of a Privacy Impact Assessment (PIA)?', a: 'A PIA is conducted to identify and mitigate risks to personal data and ensure that processing activities comply with privacy laws. It helps organizations proactively address privacy concerns before launching projects involving personal data.' },
              { q: 'What makes the GDPR one of the strictest privacy laws in the world?', a: 'The GDPR mandates explicit consent, transparency, accountability, and robust data subject rights, and imposes severe financial penalties—up to €20 million or 4% of global turnover—for non-compliance.' },
              { q: 'How does the OECD Privacy Principles framework contribute to international privacy practices?', a: 'The OECD framework provides eight guiding principles—such as purpose limitation, security safeguards, and accountability—that form the basis of many global privacy laws, promoting fair and lawful personal data processing across borders.' },
              { q: 'What is the difference between a Data Controller and a Data Processor?', a: 'A Data Controller determines the purpose and means of data processing, while a Data Processor acts on behalf of the controller and follows their instructions when handling personal data.' },
              { q: "Why is the concept of proportionality important in privacy regulations like APEC's framework?", a: 'Proportionality ensures that data protection measures are appropriate to the severity of potential risks, avoiding overregulation while still enforcing meaningful accountability and breach penalties.' },
              { q: 'Which key rights does the California Consumer Privacy Act (CCPA) grant to California residents?', a: "The CCPA allows residents to access their personal data, request its deletion, opt out of its sale, and receive clear information on how businesses collect and share their data." },
              { q: 'What is the primary focus of the Personal Information Protection Law (PIPL) in China?', a: "The PIPL regulates personal data handling within China, requiring explicit consent, enforcing data localization, and imposing stringent obligations and penalties to protect individuals' privacy rights." },
              { q: 'How are the terms PIA, DPIA, and Data Privacy Impact Assessment related?', a: 'They all refer to assessments of privacy risks, but vary by jurisdiction: PIA is broader and used globally, DPIA is specific to GDPR, and Data Privacy Impact Assessment is a hybrid term that may incorporate both privacy and protection considerations.' },
            ],
          },
        ],
      },
      {
        id: 'd1t4-6',
        title: '1.4.6 Contractual, legal, industry standards, and regulatory requirements',
        content: [
          {
            body: 'A comprehensive security program must align with a variety of external requirements that influence how data is handled, protected, and governed. The table below outlines the key categories of such requirements—contractual, legal, industry standards, and regulatory—along with their descriptions.',
            table: {
              headers: ['Requirement', 'Description'],
              rows: [
                ['Contractual Requirements', 'Are obligations outlined in agreements between parties, such as service level agreements (SLAs), vendor contracts, and non-disclosure agreements (NDAs).'],
                ['Legal Requirements — Criminal Law', 'Encompasses regulations against offenses like homicide, assault, theft, and arson.'],
                ['Legal Requirements — Civil Law (Tort Law)', 'Pertains to matters such as contractual disagreements, property dealings, employment issues, estate management, and probate proceedings.'],
                ['Legal Requirements — Administrative Law', 'Grants government bodies certain powers to establish regulations.'],
                ['Industry Standards', 'Are guidelines and best practices established by professional organizations and bodies within specific sectors. Examples include ISO/IEC 27001 and NIST Cybersecurity Framework.'],
                ['Regulatory Requirements', 'Are mandates set forth by government agencies and regulatory bodies to ensure compliance with specific standards and protocols (examples are PCI DSS and SOX).'],
              ],
            },
          },
          {
            table: {
              headers: ['Feature', 'Standard', 'Framework', 'Regulation', 'Directive', 'Law'],
              rows: [
                ['What is it?', 'A set of agreed-upon best practices, specifications, or rules.', 'A set of guidelines or principles for managing security.', 'Mandatory rules set by a governing body that must be followed.', 'A formal instruction or order issued by an authority or body.', 'A legal rule or system that governs behavior in society.'],
                ['Examples', 'ISO 27001, NIST SP 800-53, PCI DSS', 'NIST Cybersecurity Framework, COBIT, CIS Controls', 'GDPR, HIPAA, PCI DSS (when enforced)', 'EU Directives like the GDPR Directive, NIS Directive', 'Data Protection Act, Computer Misuse Act, Cybersecurity Laws'],
                ['Purpose', 'To define best practices or benchmarks for security.', 'To guide the implementation of cybersecurity practices.', 'To enforce legal compliance, protect data, and prevent harm.', 'To direct actions towards a specific security goal or measure.', 'To regulate behavior, ensure national security and protect citizens.'],
                ['Compliance', 'Voluntary compliance, often leading to certification.', 'Voluntary but recommended for better security posture.', 'Legally enforced, with penalties for non-compliance.', 'Enforced by the organization issuing the directive.', 'Enforced by government authorities, legal penalties for violations.'],
                ['Assessment', 'Audits for certification (ISO 27001, PCI DSS).', 'Self-assessment or third-party assessments.', 'Regulatory audits, investigations by government bodies.', 'Monitoring by relevant regulatory authority.', 'Legal audits, court orders, compliance checks.'],
              ],
            },
            questions: [
              { q: 'Explain what contractual requirements are and provide two examples.', a: 'Contractual requirements are obligations outlined in agreements between parties. Examples include service level agreements (SLAs) and vendor contracts.' },
              { q: 'Differentiate between legal and regulatory requirements.', a: 'Legal requirements are broad laws and regulations established by governments, while regulatory requirements are specific mandates set by government agencies to ensure compliance within particular sectors or industries.' },
              { q: 'List the three primary branches of legal requirements, and briefly describe each.', a: 'The three primary branches are: Criminal Law (addresses offenses like theft and fraud), Civil Law (deals with disputes between individuals or organizations, such as contract breaches), and Administrative Law (empowers government bodies to create regulations).' },
              { q: 'Why are industry standards important in the context of security? Provide an example.', a: 'Industry standards provide guidelines and best practices developed by professional organizations, helping organizations establish a baseline level of security. An example is the ISO/IEC 27001 standard for information security management systems.' },
              { q: 'How do service level agreements (SLAs) contribute to security within contractual obligations?', a: 'SLAs define the expected level of service for security aspects like system availability, incident response times, and data protection measures, ensuring vendors or service providers meet specific security performance standards.' },
              { q: 'Explain how non-disclosure agreements (NDAs) play a role in protecting sensitive information.', a: 'NDAs establish legal confidentiality obligations, prohibiting the unauthorized disclosure of sensitive information such as trade secrets, customer data, or internal security practices.' },
              { q: 'Why is understanding the difference between criminal and civil law relevant to security professionals?', a: 'Understanding the difference is crucial because security breaches can lead to both criminal charges (if illegal activities are involved) and civil lawsuits (for damages caused by negligence or breach of contract).' },
              { q: 'How does the NIST Cybersecurity Framework assist organizations in enhancing their security posture?', a: 'The NIST Cybersecurity Framework provides a voluntary and adaptable set of guidelines, best practices, and standards to help organizations improve their cybersecurity risk management by identifying, protecting, detecting, responding to, and recovering from threats.' },
              { q: 'Briefly explain the role of administrative law in shaping security regulations.', a: 'Administrative law grants government agencies the authority to develop and enforce specific regulations related to data protection, privacy, critical infrastructure security, and other areas impacting national security and public interest.' },
            ],
          },
        ],
      },
      // ── 1.5 ──────────────────────────────────────────────────────────────
      {
        id: 'd1t5',
        title: '1.5 Understand requirements for investigation types',
        content: [
          {
            body: 'An investigation will vary based on incident type. As an example, for a financial services company, a financial system compromise might cause a regulatory investigation. A system breach or website compromise might cause a criminal investigation. Each type of investigation has special considerations:',
            list: [
              'Administrative: An administrative investigation has a primary purpose of providing the appropriate authorities with incident information. Thereafter, the authorities will determine the proper action, if any. Administrative investigations are often tied to HR scenarios, such as when a manager has been accused of improprieties.',
              'Criminal: A criminal investigation occurs when a crime has been committed and you are working with a law enforcement agency to convict the alleged perpetrator. In such a case, it is common to gather evidence for a court of law, and to share the evidence with the defense. Therefore, you need to gather and handle the information using methods that ensure the evidence can be used in court. Remember that in a criminal case, a suspect must be proven guilty beyond a reasonable doubt. This is more difficult than showing a preponderance of evidence, which is often the standard in a civil case.',
              'Civil: In a civil case, one person or entity sues another. For example, one company might sue another for a trademark violation. A civil case is typically about monetary damages, and doesn\'t involve criminality. In a civil case, a preponderance of evidence is required to secure a victory.',
              'Industry Standards: An industry standards investigation is intended to determine whether an organization is adhering to a specific industry standard or set of standards, such as logging and auditing failed logon attempts. Because industry standards represent well-understood and widely implemented best practices, many organizations try to adhere to them even when they are not required to do so in order to improve security, and reduce operational and other risks.',
              'Regulatory: A regulatory investigation is conducted by a regulatory body, such as the Securities and Exchange Commission (SEC) or Financial Industry Regulatory Authority (FINRA), against an organization suspected of an infraction. In such cases, the organization is required to comply with the investigation, for example, by not hiding or destroying evidence.',
            ],
          },
          {
            table: {
              headers: ['Investigation Type', 'Description', 'Additional Notes'],
              rows: [
                ['Administrative', 'HR / Internal Issues', ''],
                ['Criminal', 'Court Conviction', 'Beyond Reasonable Doubt'],
                ['Civil', 'Disputes', 'Preponderance of Evidence'],
                ['Industry Standards', 'Best Practices', 'Often Voluntary'],
                ['Regulatory', 'Regulatory Bodies', 'Mandatory Compliance'],
              ],
            },
            warning: 'Never start an internal "Administrative" dig if you think it might turn "Criminal." Once you touch that data without proper forensics, it might be inadmissible in court.',
            questions: [
              { q: 'What is the primary difference between a criminal and a civil investigation?', a: 'A criminal investigation involves a crime and seeks to convict the perpetrator, while a civil investigation deals with disputes between individuals or entities and typically seeks monetary damages.' },
              { q: 'Describe the role of evidence in a criminal investigation.', a: "Evidence in a criminal investigation must be gathered and handled meticulously to be admissible in court, as it aims to prove the suspect's guilt beyond a reasonable doubt." },
              { q: 'Why might an organization choose to adhere to industry standards even when not legally required?', a: 'Organizations may adhere to industry standards to enhance security, minimize risks, and demonstrate best practices, even if not legally obligated.' },
              { q: 'What distinguishes an administrative investigation from other types?', a: 'Administrative investigations focus on gathering information for authorities to determine appropriate action, often related to internal issues like HR concerns.' },
              { q: 'Explain the concept of "preponderance of evidence" and its relevance in civil cases.', a: '"Preponderance of evidence" means the evidence presented is more convincing than the opposing side\'s, which is the standard for winning a civil case.' },
              { q: 'What is the typical outcome sought in a civil case?', a: 'The typical outcome sought in a civil case is monetary compensation for damages suffered by the plaintiff.' },
              { q: 'Provide an example of a situation that might trigger a regulatory investigation.', a: 'A company suspected of violating financial regulations, such as insider trading, could trigger a regulatory investigation by the SEC.' },
              { q: 'Who typically conducts a regulatory investigation?', a: 'Regulatory investigations are conducted by government agencies responsible for enforcing specific regulations, such as the SEC or FINRA.' },
              { q: 'Why is it crucial for organizations to cooperate during a regulatory investigation?', a: 'Organizations must cooperate with regulatory investigations to avoid penalties and demonstrate compliance with the law.' },
              { q: 'How does the burden of proof differ between criminal and civil cases?', a: 'In criminal cases, the prosecution must prove guilt "beyond a reasonable doubt," while in civil cases, the plaintiff only needs to demonstrate a "preponderance of evidence."' },
            ],
          },
        ],
      },
      // ── 1.6 ──────────────────────────────────────────────────────────────
      {
        id: 'd1t6',
        title: '1.6 Develop, document, and implement security policy, standards, procedures, and guidelines',
        content: [
          {
            body: 'In many organizations, the hierarchy of organizational documents outlines overarching expectations primarily at the policy level, with supplementary documents offering specifics on implementation. These documents not only define standards for conduct and performance but also allow flexibility to adapt to evolving situations and occurrences.',
          },
          {
            heading: 'Policy',
            body: 'A Policy is a document that defines the scope of security needed by the organization and discusses the assets that require protection and the extent to which security solutions should go to provide the necessary protection. The security policy is an overview or generalization of an organization\'s security needs. It defines the strategic security objectives, vision, and goals and outlines the security framework of an organization. The security policy is used to assign responsibilities, define roles, specify audit requirements, outline enforcement processes, indicate compliance requirements, and define acceptable risk levels. Compared to other organizational documents, policies tend to remain more stable over time. They offer a foundation for the organization\'s management, enabling leaders to establish standards and develop procedures that align with the overarching policy objectives.',
            note: 'Established organizations regularly assess their policies as part of their governance procedures. They must consider evolving external compliance requirements and shifts in business strategies. The policy review process should address the evolving needs of external stakeholders to ensure consistency in policy execution by management.',
            warning: 'The application of the term "policy" in implementing security measures within an organization can often lead to confusion. For instance, while a password policy might not be a concern for the governing body, it holds significance for the management team. This wide-ranging interpretation of the term "policy" highlights a significant challenge within our industry. The absence of a standardized language for information security practices has been consistently recognized as a hindrance to the establishment of a unified body of practice in the information security community.',
          },
          {
            body: 'After setting organizational objectives, management implements policies to achieve them.',
          },
          {
            heading: 'Standards',
            body: 'Standards serve as a valuable tool for efficient resource management, ensuring consistency in control. These standards, endorsed by management, align directly with the organization\'s strategic goals and policies. While standards are primarily a management tool, they can also emerge from organizational practices. For instance, adopting a specific vendor\'s product may unintentionally establish a standard within the organization as various departments adopt the technology independently. To sum up, standards define compulsory requirements for the homogenous use of hardware, software, technology, and security controls. Standards are prescriptive and require compliance; adherence is mandatory. Organizations embracing standards must establish performance metrics to assess their implementation.',
          },
          {
            heading: 'Procedure',
            body: 'Procedure (or standard operating procedure - SOP) is a detailed, step-by-step how-to document that describes the exact actions necessary to implement a specific security mechanism, control, or solution. Procedural documents prove valuable when strict compliance is required, especially when the steps to achieve the desired outcome are not immediately clear to those unfamiliar with the environment. As part of its diligence duties, management ensures adherence to organizational procedures through regular oversight and audits. Compliance is mandatory, and well-organized entities monitor compliance with procedural steps closely.',
          },
          {
            heading: 'Baseline',
            body: 'Baseline defines a minimum level of security that every system throughout the organization must meet. After setting a standard, a baseline is created based on the standard to fulfill particular implementation needs. Any deviation from this baseline must undergo formal approval via the organization\'s change management process. Like standards, baselines set an expectation for compliance. Security baselines, as part of this, define the minimum security controls required to protect the CIA properties for a specific configuration.',
          },
          {
            heading: 'Guideline',
            body: 'Guideline offers recommendations on how standards and baselines are implemented and serves as an operational guide for both security professionals and users. Guidelines are essential when an organization seeks flexibility in implementation to meet business goals. They often draw upon industry best practices or the organization\'s own expertise in a specific area. These guidelines prove valuable when various options exist to achieve a control objective, allowing room for creativity and experimentation. Unlike procedures, standards, and baselines, which offer explicit directions, guidelines provide a more adaptable framework that fosters innovation and efficiency. Numerous sources contribute to information security guidelines, including the CISSP CBK, which offers a broad spectrum of security practices without imposing strict rules within an organization\'s security environment. Frameworks like ISO/NIST/ITIL are often used as guidelines but may transition into policies or standards when compliance is expected.',
            questions: [
              { q: 'Explain the difference between a policy and a standard in the context of information security.', a: 'Policies define high-level security objectives and frameworks, while standards establish mandatory requirements for consistent implementation of security controls. Policies are broader in scope, while standards are more specific and actionable.' },
              { q: 'Describe the purpose of a security baseline and its relationship to organizational standards.', a: 'A security baseline defines the minimum security level for all systems, ensuring a basic level of protection. It is derived from organizational standards and tailored to specific implementation needs.' },
              { q: 'How do procedures contribute to maintaining security within an organization?', a: 'Procedures provide detailed instructions for implementing security measures, ensuring consistent execution and minimizing the risk of errors or inconsistencies.' },
              { q: 'When are guidelines more beneficial than procedures in implementing security measures?', a: 'Guidelines are preferable when flexibility is needed, allowing for adaptation to specific circumstances and encouraging innovation while still adhering to security principles.' },
              { q: 'What factors should organizations consider when reviewing their security policies?', a: 'Organizations should consider evolving compliance requirements, changes in business strategies, and the needs of external stakeholders to ensure policies remain relevant and effective.' },
              { q: 'Why is it important for security policies to avoid excessive detail?', a: 'Excessively detailed policies can become cumbersome, difficult to understand, and less adaptable to changing circumstances. Clear and concise policies are easier to implement and maintain.' },
              { q: "How can the adoption of a specific vendor's product unintentionally establish a standard?", a: 'If multiple departments independently adopt the same vendor product, it can become a de facto standard due to its widespread use and integration within the organization.' },
              { q: 'Explain the role of management in ensuring compliance with security procedures.', a: 'Management is responsible for overseeing and auditing security procedures to ensure compliance. This includes establishing monitoring mechanisms, conducting regular reviews, and enforcing disciplinary actions when necessary.' },
            ],
          },
        ],
      },
      // ── 1.7 ──────────────────────────────────────────────────────────────
      {
        id: 'd1t7-0',
        title: '1.7.0 Preface',
        content: [
          {
            body: 'Business Continuity Planning (BCP) involves assessing the risk to organizational processes and creating policies, plans, and procedures to minimize the impact those risks might have on the organization if they were to occur. BCP is used to maintain the continuous operation of a business in the event of an emergency, with a goal to implement a combination of policies, procedures, and processes. Business Continuity requires a lot of planning and preparation. Actual implementation of business continuity processes occur quite infrequently. The primary facets of business continuity are:',
            list: [
              'Resilience: (e.g. within a data center and between sites or data centers),',
              'Recovery: if a service becomes unavailable, you need to recover it as soon as possible, and',
              'Contingency: a last resort in case resilience and recovery prove ineffective.',
            ],
            warning: 'BCP vs DR: BCP activities are typically strategically focused at a high level and center themselves on business processes and operations. DR plans tend to be more tactical and describe technical activities such as recovery sites, backups, and fault tolerance. A DR plan is carried out when everything is still in emergency (while a BCP takes a broader approach to the problem). BCM (Business Continuity Management) is the management process that covers both BCP and DR.',
          },
          {
            table: {
              headers: ['Feature', 'Business Continuity Plan (BCP)', 'Disaster Recovery Plan (DRP)'],
              rows: [
                ['Primary Focus', 'Strategic: Keeping the business functional during a crisis.', 'Tactical: Restoring technical infrastructure and data.'],
                ['Scope', 'Business processes, operations, and human resources.', 'IT systems, backups, recovery sites, and connectivity.'],
                ['Approach', 'Broader; focuses on how the company continues to serve customers.', 'Specific; focuses on technical "failovers" and fault tolerance.'],
                ['Timeline', 'Active throughout the entire duration of the disruption.', 'Executed specifically during the emergency/recovery phase.'],
                ['Goal', 'Resilience and operational stability.', 'Data integrity and system uptime.'],
              ],
            },
            tip: 'BCP is wider in scope and more strategic than DR.',
          },
          {
            body: 'The Business Continuity Planning process has four main steps:',
            list: [
              'Project scope and planning: Developing the project scope and plan starts with gaining support of the management team, making a business case (cost/benefit analysis, regulatory or compliance reasons, etc.) and gaining approval to move forward. Next, you need to form a team with representatives from the business as well as IT.',
              'Business impact analysis (BIA): Identify the systems and services that the business relies on and assess the impacts that a disruption or outage would cause. You also need to figure out which systems and services you need to get things running again. Finally, prioritize the order in which critical systems and services are recovered or brought back online. As part of the BIA, establish: recovery time objectives (RTO), recovery point objectives (RPO), and maximum tolerable downtime (MTD).',
              'Continuity planning: The first two phases focus on determining how the BCP process will work and prioritizing the business assets that need to be protected. The next phase focuses on the development and implementation of a continuity strategy to minimize the impact realized risks might have on protected assets. There are two primary subtasks: Strategy development and Provisions and processes. The goal is to create a continuity of operations plan (COOP), which focuses on how an org will carry out critical business functions starting shortly after a disruption occurs and extending up to one month of sustained operations.',
              'Approval and implementation: BCP plan now needs senior management buy-in (should be endorsed by the org\'s top exec). BCP team should create an implementation schedule, and all personnel involved should receive training on the plan.',
            ],
            tip: "The top priority of BCP and DR are people. Always prioritize people's safety. Get people out of harm's way, and only after keep addressing IT recovery and restoration issues.",
            questions: [
              { q: 'What are the three primary facets of Business Continuity, and briefly explain each?', a: 'Resilience: The ability of systems to withstand disruptions. Recovery: The process of restoring systems after an outage. Contingency: The last resort plan when resilience and recovery fail.' },
              { q: 'Explain the key differences between Business Continuity Planning (BCP) and Disaster Recovery (DR).', a: 'BCP is strategically focused on maintaining overall business operations during disruptions, while DR is more tactical, focusing on technical recovery of IT systems and data.' },
              { q: 'What is the purpose of a Business Impact Analysis (BIA) in the BCP process?', a: 'BIA identifies critical systems and services, assesses the potential impact of disruptions on them, and prioritizes their recovery.' },
              { q: 'Define the terms Recovery Time Objective (RTO) and Recovery Point Objective (RPO).', a: 'RTO is the maximum acceptable time to recover a system after an outage. RPO is the maximum tolerable data loss that can occur.' },
              { q: 'What is the significance of Maximum Tolerable Downtime (MTD) in a BIA?', a: 'MTD represents the maximum duration a business can function without a specific system before facing severe consequences. It helps determine the urgency of recovery efforts.' },
              { q: 'Describe the two primary subtasks involved in the Continuity Planning phase of the BCP process.', a: 'The two subtasks are Strategy Development (defining the continuity strategy) and Provisions and Processes (outlining specific procedures and resources).' },
              { q: 'What is the primary output of the Continuity Planning phase? Briefly describe its purpose.', a: 'The primary output is the Continuity of Operations Plan (COOP), which outlines how an organization will maintain essential functions during and after a disruption.' },
              { q: 'Why is senior management buy-in crucial for the successful implementation of a BCP plan?', a: 'Senior management buy-in ensures resource allocation, policy enforcement, and organizational commitment to BCP implementation.' },
              { q: "What is the overarching priority in both BCP and DR? Explain its importance.", a: "The top priority is people's safety. Ensuring the well-being of employees and stakeholders is paramount before addressing IT or operational concerns." },
              { q: 'What resources can organizations use for guidance in developing an IT contingency plan?', a: 'Organizations can use NIST SP 800-34, a publication from the National Institute of Standards and Technology, as a guide for developing their IT contingency plans.' },
            ],
          },
        ],
      },
      {
        id: 'd1t7-1',
        title: '1.7.1 Business impact analysis (BIA)',
        content: [
          {
            body: 'According to the International Organization for Standardization (ISO), a BIA is "The process of analyzing the impact over time of a disruption on the organization." Essentially, a BIA helps an organization identify its critical business functions (CBFs) and understand the potential impact of a disaster or disruption on these functions. This analysis serves as the foundation for the business continuity plan (BCP).',
          },
          {
            heading: 'MTD (Maximum Tolerable Downtime)',
            body: "MTD is the maximum duration a business process can be unavailable before causing severe damage to the company. Think of it as the time limit for getting everything back to normal before serious problems arise. A bank's online services might have an MTD of 4 hours. If customers can't access their accounts for more than 4 hours, the bank could face significant reputational damage or regulatory penalties.",
          },
          {
            heading: 'RPO (Recovery Point Objective)',
            body: 'RPO defines the acceptable amount of data loss in case of a disaster. It specifies the point in time to which data must be restored. For example if the RPO for the bank\'s customer transactions is 15 minutes, the backup systems need to save data at least every 15 minutes to avoid losing important transactions during an outage.',
          },
          {
            heading: 'RTO (Recovery Time Objective)',
            body: "RTO is the target time for restoring a system, application, or process after a disruption. If the bank's mobile app has an RTO of 1 hour, the IT team needs to ensure the app is functional again within an hour of going offline.",
          },
          {
            heading: 'WRT (Work Recovery Time)',
            body: "WRT refers to the time needed for testing and verifying restored systems before they go live. After restoring the bank's online services in 1 hour (RTO), the team might need 30 additional minutes to test that login systems, transaction features, and notifications are working correctly. This 30 minutes is the WRT.",
          },
          {
            body: 'The following elements are of fundamental importance in conducting a successful BIA:',
            list: [
              'Executive Support: Securing buy-in from senior leadership is crucial, as BCP initiatives may not yield immediate tangible returns but are vital for long-term resilience.',
              'Project Team, Scope, and Budget: Defining the project team, scope, and budget ensures a focused and efficient BIA process.',
              'Identifying CBFs (Critical Business Factors): This is a critical step involving input from various stakeholders like system owners, subject-matter experts, customers, and suppliers.',
              'Impact Assessment: Analyzing the impact of disruptions on each CBF, considering the aforementioned metrics (MTD, RPO, RTO, WRT).',
            ],
          },
          {
            body: 'The following elements have to be considered when identifying CBFs:',
            list: [
              'Personnel: Key personnel and their roles in maintaining critical operations.',
              'Business Processes: Essential business processes that drive revenue or ensure operational continuity.',
              'Information Systems and Applications: Critical IT systems and applications supporting core business functions.',
              'Other Assets: Physical assets, intellectual property, or other resources vital for business operations.',
            ],
            questions: [
              { q: 'Explain the primary purpose of a Business Impact Analysis (BIA).', a: 'The BIA identifies critical business functions and assesses the potential impact of disruptions on those functions over time. This helps organizations prioritize recovery efforts and resource allocation.' },
              { q: 'What is the difference between RTO and WRT?', a: "RTO focuses on the time to restore a system's basic functionality, while WRT accounts for the additional time required to thoroughly test and verify its complete functionality before making it live." },
              { q: 'Why is defining the MTD crucial in business continuity planning?', a: 'MTD defines the maximum allowable downtime before a business function faces severe consequences. Understanding this limit drives the urgency and prioritization of recovery efforts.' },
              { q: "How does RPO influence a company's backup strategy?", a: 'The RPO dictates the frequency of backups required to ensure the acceptable level of data loss. For a shorter RPO, more frequent backups are needed.' },
              { q: 'List three examples of potential "critical business functions" in a manufacturing company.', a: 'Examples include: Manufacturing operations, supply chain management, order fulfillment, customer service.' },
              { q: 'Explain why executive support is essential for successful Business Continuity Planning.', a: 'BCP requires resources, budget, and organizational buy-in to implement effectively. Executive support helps secure these resources and ensures alignment with overall business goals.' },
              { q: "If a company has an RPO of 2 hours for its financial data, what does this imply about their backup frequency?", a: "An RPO of 2 hours means the company must back up its financial data at least every 2 hours to avoid losing more than 2 hours' worth of data in a disaster." },
              { q: "What could be the potential consequences of exceeding the MTD for a hospital's emergency room system?", a: "Exceeding the MTD for a hospital's emergency room system could result in life-threatening delays in patient care, reputational damage, and potential legal liabilities." },
              { q: 'Besides IT systems, what other "essential business elements" should a BIA consider?', a: 'A BIA should consider personnel, business processes, and other assets essential for maintaining operations, such as facilities, equipment, and critical relationships.' },
              { q: 'Describe the relationship between a Business Impact Analysis (BIA) and a Business Continuity Plan (BCP).', a: 'The BIA provides the foundation for the BCP. By identifying critical functions and their potential impact, the BIA helps determine the necessary recovery strategies and resources to be outlined in the BCP.' },
            ],
          },
        ],
      },
      {
        id: 'd1t7-2',
        title: '1.7.2 External dependencies',
        content: [
          {
            body: "External dependencies are a critical consideration in Business Continuity Planning (BCP), as they directly impact an organization's ability to recover and maintain operations during disruptions. Key dependencies include vendors, such as cloud providers, hardware (HW) suppliers, and software (SW) vendors, whose services and products form the backbone of many operations. Ensuring that contracts with these providers include robust Service Level Agreements (SLAs) is essential to guarantee timely support and resource availability during crises. Additionally, BCP must account for legal and regulatory requirements, which may mandate specific recovery times or data protection measures, especially in regulated industries. Furthermore, organizations must align their continuity plans with the SLAs offered to their own clients, ensuring they can meet promised levels of service even during disruptions.",
            questions: [
              { q: 'Why are external dependencies crucial in Business Continuity Planning (BCP)?', a: "External dependencies are crucial in BCP because they represent factors outside the organization's direct control that are essential for its operations. Failure to address these dependencies can significantly hinder recovery and business continuity during disruptions." },
              { q: 'Provide three examples of external dependencies that organizations typically rely on.', a: 'Three examples of external dependencies include: cloud service providers, hardware suppliers, and software vendors. These entities provide essential services and resources that many organizations rely on for their day-to-day operations.' },
              { q: 'What role do Service Level Agreements (SLAs) play in managing external dependencies?', a: 'SLAs outline the expected performance and support levels from vendors and service providers. In BCP, robust SLAs ensure timely assistance, resource availability, and clearly defined responsibilities during disruptions, aiding in a smoother recovery process.' },
              { q: 'Why is it important to consider legal and regulatory requirements in BCP?', a: 'Legal and regulatory requirements often dictate specific recovery times, data protection measures, and other crucial aspects of BCP. Neglecting these requirements can lead to non-compliance, penalties, and reputational damage.' },
              { q: "How do an organization's SLAs with its clients factor into its BCP?", a: "An organization's BCP should align with the SLAs it provides to its clients. This ensures the organization can meet its contractual obligations and maintain service levels even during disruptions, preserving customer trust and minimizing financial losses." },
            ],
          },
        ],
      },

      // ── 1.8 ──────────────────────────────────────────────────────────────
      {
        id: 'd1t8-0',
        title: '1.8.0 Preface',
        content: [
          {
            body: 'People are frequently perceived as the weakest link in any security framework. Regardless of the implementation of physical or logical controls, individuals can find ways to bypass, circumvent, or undermine them, or even disable them. Malicious actors regularly target users through phishing and spear phishing campaigns, social engineering, and various other forms of attacks. Phishing is a broad scam where attackers pose as trustworthy entities—often via email, text, or website—to trick individuals into revealing sensitive info like passwords or financial details. Spear phishing, on the other hand, is a highly targeted form of phishing: attackers research a specific individual or group and craft personalized messages that appear to come from someone they know or trust, dramatically increasing the success rate.',
            warning: 'No one is immune to phishing and spear phishing threats.',
          },
          {
            body: 'Once attackers gain access to an account, they can exploit it to traverse the network and escalate their privileges. However, with proper training and motivation, individuals can also serve as a crucial security asset, actively safeguarding not only their own interests but also those of the organization. Additionally, advancements in AI have minimized the gap between humans and computers, further influencing security dynamics (in future it won\'t be possible anymore to define people as the weakest link in a security framework).',
          },
          {
            note: 'Ensuring security starts before an employee even joins an organization. During the hiring process, it\'s crucial to define clear job descriptions and responsibilities to align expectations and minimize security risks.',
          },
          {
            body: 'A well-structured job description helps: Outline security expectations – Candidates understand their role in protecting sensitive information. Support background checks – Helps verify if a candidate\'s experience and trustworthiness align with security needs. Reduce insider threats – By ensuring only qualified, security-aware individuals take on critical roles.',
          },
          {
            body: 'A well-defined job description should include: Job Title – Clearly identifies the role. Duties & Responsibilities – Lists specific tasks and expectations. Required Skills & Qualifications – Specifies expertise needed. Security Responsibilities – Defines how the role interacts with security policies.',
          },
          {
            body: 'Job responsibilities define the specific duties, tasks, and expectations assigned to a particular role within an organization. These responsibilities are crucial because they clarify what an employee is expected to do and, in a security context, help determine the level of access they should have to sensitive systems and data.',
          },
          {
            heading: 'Importance of Job Descriptions',
            table: {
              headers: ['Category', 'Component', 'Strategic Value & Security Impact'],
              rows: [
                ['Why it Matters', 'Security Expectations', 'Ensures candidates understand their duty to protect sensitive data from Day 1.'],
                ['', 'Background Checks', "Provides a benchmark to verify if a candidate's history aligns with the role's risk level."],
                ['', 'Threat Mitigation', 'Reduces Insider Threats by filtering for security-aware, qualified individuals.'],
                ['Essential Elements', 'Job Title', 'Establishes clear identity and hierarchy within the organization.'],
                ['', 'Duties & Tasks', 'Defines specific actions, ensuring no "gray areas" in daily operations.'],
                ['', 'Skills & Qualifications', 'Mandates the technical or professional expertise required to handle the role safely.'],
                ['', 'Security Responsibilities', 'Explicitly links the role to cybersecurity policies and data handling protocols.'],
                ['Impact on Operations', 'Policy Alignment', 'Guarantees that every employee acts as a functional part of the security framework.'],
                ['', 'Access Control', 'Justifies the Level of Access based on defined duties (Least Privilege).'],
                ['', 'Role Consistency', 'Eliminates confusion by clarifying exactly who is responsible for what.'],
              ],
            },
          },
          {
            note: "Individuals represent both the most vulnerable point in your information security chain and the most critical asset to safeguard during a security incident but remember to never refer to personnel as the weakest link in your security chain, as this can demotivate them. Instead, empower them by emphasizing that the organization's security relies on their efforts and vigilance.",
          },
          {
            questions: [
              { q: 'Explain why individuals are often considered the weakest link in security.', a: 'Individuals are often considered the weakest link due to susceptibility to social engineering, phishing attacks, and errors in judgment. They can unintentionally bypass security protocols or fall victim to manipulation, providing attackers with entry points.' },
              { q: 'Describe two common social engineering techniques used to exploit human vulnerabilities.', a: 'Phishing: Deceptive emails or messages disguised as legitimate sources, aiming to trick recipients into revealing sensitive information or downloading malware. Baiting: Offering something desirable (e.g., free downloads, prizes) to lure individuals into compromising their security.' },
              { q: 'What is the difference between phishing and spear phishing attacks?', a: 'Phishing targets a wide audience with generic messages, while spear phishing is highly targeted, using personalized information to deceive specific individuals.' },
              { q: 'Explain the negative consequences of referring to personnel as "the weakest link."', a: 'Labeling personnel as "the weakest link" demotivates and creates a blame culture. It undermines their sense of responsibility, making them less likely to actively participate in security efforts.' },
              { q: 'Provide an example of how an individual can be a security asset.', a: 'An employee who is aware of phishing tactics, identifies a suspicious email, and reports it to the IT department prevents a potential security breach, demonstrating their value as a security asset.' },
            ],
          },
        ],
      },
      {
        id: 'd1t8-1',
        title: '1.8.1 Candidate screening and hiring',
        content: [
          {
            body: 'The introduction of new personnel poses a security risk; hence, every organization necessitates personnel security policies, standards, procedures, or guidelines to identify and alleviate this risk through appropriate security measures. These documents ought to detail job descriptions, classification, work tasks, responsibilities, collusion prevention, candidate screening, background checks, security clearances, employment agreements, and nondisclosure agreements. Thoroughly screening employment candidates is vital during the hiring process. Ensure to conduct comprehensive background checks encompassing criminal records, job history verification, education authentication, certification validation, and confirmation of other accolades whenever feasible. Furthermore, it is essential to contact some of the provided references.',
            tip: 'Thorough screening and in-depth interviews are essential to ensure that only suitable candidates are hired.',
          },
          {
            note: 'When evaluating job candidates, organizations must operate within legal boundaries—some screening practices are permitted, while others may violate privacy laws and employment regulations.',
          },
          {
            body: 'Permitted Screening Practices (Varies by jurisdiction): Background checks (criminal history, employment verification); Reference checks (verifying previous work experience); Education verification; Legally required security clearances (for specific roles).',
          },
          {
            body: 'Restricted or Illegal Practices: Discriminatory questions (race, religion, gender, marital status, etc.); Invasive personal data collection without consent; Medical or genetic testing (unless legally justified).',
          },
          {
            note: 'Screening activities should match the sensitivity and risk level of the job role. Higher-risk positions (e.g., those handling confidential data or financial transactions) may require more in-depth background checks, while lower-risk roles need only basic verification.',
          },
          {
            questions: [
              { q: 'Why are personnel security policies necessary for organizations?', a: 'Personnel security policies are necessary to identify and mitigate the security risks posed by new employees. These policies outline procedures and guidelines for various security aspects related to personnel.' },
              { q: 'What are two key components that should be included in a job description from a security perspective?', a: "From a security perspective, a job description should clearly outline the tasks and responsibilities associated with the position, as well as the level of access to sensitive information the role entails. This helps determine the necessary security measures and clearances." },
              { q: 'Explain the importance of collusion prevention within an organization.', a: 'Collusion prevention strategies aim to prevent employees from working together to bypass security controls or commit fraud. This involves segregating duties, implementing checks and balances, and fostering a culture of accountability.' },
              { q: 'What is the purpose of a background check during the hiring process?', a: 'Background checks help verify the information provided by a candidate and identify any potential red flags that could pose a security risk. This includes criminal history, employment history discrepancies, or fabricated credentials.' },
              { q: 'List three types of information that should be verified during a background check.', a: 'Three types of information that should be verified during a background check are: criminal records, employment history, and education credentials. This ensures the candidate\'s claims are accurate and helps assess their trustworthiness.' },
              { q: 'Why is it important to contact references provided by a candidate?', a: "Contacting references allows employers to gain additional insights into the candidate's character, work ethic, and past performance. References can offer valuable information that may not be apparent from the candidate's application or interview." },
              { q: 'What is a security clearance and why might it be required for certain positions?', a: 'A security clearance is an official determination that an individual is eligible to access classified information. Certain positions involving sensitive data or national security may require specific clearance levels.' },
              { q: 'What is the purpose of an employment agreement?', a: 'An employment agreement outlines the terms and conditions of employment, including salary, benefits, responsibilities, and grounds for termination. This legally binds both the employer and employee to the agreed upon terms.' },
              { q: 'What is a non-disclosure agreement and what does it typically cover?', a: 'A non-disclosure agreement (NDA) is a legally binding contract that prohibits employees from disclosing confidential company information to unauthorized individuals. This protects sensitive data, trade secrets, and intellectual property.' },
              { q: 'Besides background checks, what other security measures can be taken during the hiring process?', a: 'Other security measures during the hiring process can include conducting psychological evaluations, verifying professional licenses, drug testing, and providing security awareness training to new hires.' },
            ],
          },
        ],
      },
      {
        id: 'd1t8-2',
        title: '1.8.2 Employment agreements and policy driven requirements',
        content: [
          {
            body: 'An employment agreement outlines various aspects of employment, including job responsibilities, compensation, benefits, and termination details. In some cases, such agreements are for a specific duration, such as in contracts or short-term positions. They provide a structured framework for terminating underperforming employees when necessary. The comprehensiveness of an employment agreement correlates with decreased risks, such as the potential for wrongful termination lawsuits.',
          },
          {
            body: 'Example employment agreements include non-compete clauses, codes of conduct like an acceptable use policy (AUP) dictating proper use of company resources, and nondisclosure agreements (NDAs) safeguarding confidential information from disclosure by current or former employees. These agreements serve to protect both the organization\'s interests and the employees\' rights and obligations.',
          },
          {
            body: 'Furthermore, policies centered on personnel are frequently reinforced by: Noncompete agreements (NCA); Ethical guideline and requirement questionnaires and agreements; Agreements and controls governing vendors, consultants, and contractors.',
            note: "Throughout an employee's tenure at an organization, implementing strong access control mechanisms is essential to reduce risks such as fraud, unauthorized actions, or policy violations. Organizations achieve this by enforcing policies that limit access, distribute responsibilities, and regularly change roles.",
          },
          {
            body: 'Some possible controls to mitigate Personnel related risks are:\n\n1. Separation of Duties (SoD) — This principle ensures that no single individual has complete control over critical processes. By dividing responsibilities among multiple employees, organizations prevent any one person from having unchecked authority, reducing the risk of fraud or policy breaches. For example, in financial transactions, the employee who requests a payment should not be the same person who approves and processes it.\n\n2. Job Rotation — By periodically rotating employees into different roles or responsibilities, organizations can prevent fraud and insider threats. When employees know that others will review their work after a certain period, it discourages misconduct. Additionally, job rotation helps in cross-training employees, making teams more resilient to unexpected absences.\n\n3. Least Privilege — This security principle ensures that employees only receive the minimum level of access necessary to perform their tasks—no more, no less. By restricting access rights, organizations reduce the attack surface and limit the damage a compromised or malicious user can cause.\n\n4. Need to Know — Closely related to the principle of least privilege, "need to know" restricts access to sensitive or classified information based on job requirements. Employees are granted access only to the specific information they need to perform their roles.',
          },
          {
            body: 'UBA (User Behavior Analytics) is a security approach that analyzes patterns in user activities to detect anomalous or potentially malicious behavior. Instead of focusing on traditional security events like failed logins, UBA monitors how users normally interact with systems and flags deviations that may indicate insider threats, compromised accounts, or data exfiltration attempts.\n\nUEBA (User and Entity Behavior Analytics) expands on UBA by including both user behavior and system entity behavior (such as servers, IoT devices, or applications). This provides a more comprehensive security approach, detecting threats that involve both human actions and automated systems.\n\nWhy Are UBA & UEBA Important for Companies? Detecting Insider Threats – Identifies unusual access patterns or privilege misuse. Preventing Data Breaches – Detects abnormal file access or exfiltration attempts. Enhancing Threat Intelligence – Complements traditional SIEM solutions with behavioral context. Reducing False Positives – Uses machine learning to differentiate between legitimate and suspicious behavior. Improving Incident Response – Provides actionable insights for security teams to respond quickly.',
          },
          {
            questions: [
              { q: 'What are the primary functions of an employment agreement?', a: 'Employment agreements outline the terms of employment, including responsibilities, compensation, benefits, and termination procedures. They provide a clear framework for both employer and employee.' },
              { q: 'How can an employment agreement mitigate the risk of wrongful termination lawsuits?', a: 'By explicitly stating the terms of employment and termination, including grounds for dismissal, an employment agreement can reduce ambiguity and protect the employer from claims of unfair or arbitrary termination.' },
              { q: 'Explain the concept of an "acceptable use policy" (AUP) within an employment agreement.', a: 'An AUP outlines acceptable use of company resources, such as computers, internet access, and email. It sets boundaries and expectations for employee behavior while using company property.' },
              { q: 'Differentiate between a non-compete clause and a nondisclosure agreement (NDA).', a: 'A non-compete clause restricts an employee from working for competitors or starting a competing business for a specified period after leaving the company. An NDA prohibits the disclosure of confidential company information.' },
              { q: 'Why is it crucial for employment agreements to be comprehensive?', a: 'Comprehensiveness in employment agreements ensures clarity, minimizes misunderstandings, and reduces the risk of legal disputes by addressing potential issues in advance.' },
              { q: 'How does an employment agreement protect both the employer and the employee?', a: "Employment agreements protect the employer by defining employee obligations and safeguarding company interests. They protect employees by outlining their rights, compensation, and benefits, ensuring fair treatment." },
              { q: 'What types of agreements and controls might be applied to vendors and consultants?', a: 'Vendors, consultants, and contractors may be subject to confidentiality agreements, non-solicitation clauses, intellectual property ownership agreements, and performance standards outlined in their contracts.' },
              { q: 'What is the purpose of including ethical guideline and requirement questionnaires in personnel policies?', a: "Ethical guideline and requirement questionnaires ensure that employees understand and agree to the company's ethical standards and code of conduct, fostering a culture of compliance and integrity." },
              { q: 'What is the relationship between employment agreements and personnel policies?', a: 'Personnel policies expand upon the framework established by employment agreements, providing detailed procedures and guidelines related to specific areas like workplace behavior, safety, and disciplinary actions.' },
              { q: 'Provide an example of how an employment agreement can safeguard company data.', a: 'Clear policies regarding email retention and data handling within an employment agreement can prevent terminated employees from accidentally or intentionally taking company data with them upon leaving.' },
            ],
          },
        ],
      },
      {
        id: 'd1t8-3',
        title: '1.8.3 Onboarding, transfers, and termination processes',
        content: [
          {
            body: 'The Onboarding process involves integrating a new employee into the organization smoothly and consistently by establishing documented procedures. Transfer refers to an employee transitioning from one job to another within the organization, often necessitating adjustments to account access to uphold appropriate least privilege principles. Offboarding entails removing an employee\'s identity from the Identity and Access Management (IAM) system upon their departure from the organization. It may also apply when an employee transitions to a new role. Whether the departure is amicable or sudden, it is essential to ensure that the ex-employee is escorted off the premises and not permitted to return. This procedure helps maintain security and safeguard organizational assets.',
            note: 'In Identity and Access Management (IAM), the terms Onboarding, Transfer, and Offboarding are equivalent to Join, Move, Leave (JML).',
          },
          {
            questions: [
              { q: 'What are the key objectives of a well-structured onboarding process?', a: 'Onboarding aims to integrate new employees smoothly and consistently, fostering a positive first impression and setting them up for success. Documented procedures ensure a standardized experience and cover essential aspects like introductions, paperwork, training, and access provisioning.' },
              { q: 'Why is it crucial to update access privileges during employee transfers?', a: 'Updating access privileges during transfers is vital to maintain security and uphold the principle of least privilege. Employees should only have access to the resources necessary for their current role, preventing unauthorized access to sensitive data or systems.' },
              { q: 'Explain the concept of "least privilege" and its relevance to employee lifecycle management.', a: 'The principle of least privilege minimizes security risks by granting users only the permissions needed for their job functions. This limits potential damage from accidental or malicious actions, enhancing overall system security throughout the employee lifecycle.' },
              { q: 'What are the potential security risks associated with inadequate offboarding procedures?', a: 'Inadequate offboarding can lead to data breaches, unauthorized access to systems, and reputational damage. Former employees retaining access can exploit vulnerabilities or misuse confidential information, posing a significant threat to the organization.' },
              { q: 'How does an effective IAM system contribute to secure employee lifecycle management?', a: 'An effective IAM system streamlines employee lifecycle management by providing centralized control over user identities and access. It enables automated provisioning and de-provisioning of access based on roles and responsibilities, ensuring consistent and secure management of permissions.' },
              { q: 'What steps might be included in the onboarding process to ensure a new employee feels welcomed and integrated?', a: 'A comprehensive onboarding process might include welcoming events, introductions to team members, clear role expectations, access to necessary resources and tools, and ongoing support and mentorship to help new hires acclimate successfully.' },
              { q: 'What considerations should be made when transferring an employee to a role with different security clearance levels?', a: "When transferring employees to roles with different security clearance levels, it's crucial to assess the required access for the new position and promptly adjust permissions accordingly. This may involve granting additional access, revoking existing access, or modifying existing privileges to align with the principle of least privilege." },
              { q: 'Describe some best practices for handling the return of company property during the offboarding process.', a: 'Best practices for handling the return of company property during offboarding include creating a clear inventory of company assets assigned to the employee, establishing a formal procedure for returning items, and documenting the return process to prevent disputes or misunderstandings.' },
              { q: 'How can an organization ensure that offboarding is handled respectfully, even in cases of involuntary termination?', a: "Organizations can ensure respectful offboarding, even in involuntary terminations, by communicating decisions clearly and empathetically, providing support during the transition, and adhering to legal and ethical guidelines. Maintaining professionalism and dignity throughout the process helps preserve the organization's reputation and minimize potential legal issues." },
              { q: 'What are the potential legal or compliance issues that can arise from improper offboarding practices?', a: 'Improper offboarding practices can lead to legal issues related to data protection, intellectual property theft, and wrongful termination claims. Failure to revoke access properly can result in data breaches, violating privacy regulations and exposing the organization to fines and reputational damage.' },
            ],
          },
        ],
      },
      {
        id: 'd1t8-4',
        title: '1.8.4 Vendor, consultant, and contractor agreements and controls',
        content: [
          {
            body: "Organizations frequently rely on outsourcing for various IT functions. When outsourcing, it's crucial for information security policies and procedures to encompass the security aspects of engaging with service providers, vendors, and consultants. These policies and procedures need to address several key areas related to outsourcing security, including access control, document exchange and review protocols, maintenance standards, on-site assessment procedures, process and policy review mechanisms, and the establishment of Service Level Agreements (SLAs).",
          },
          {
            body: 'Access control measures ensure that only authorized individuals have access to sensitive systems and information, both within the organization and among service providers. Document exchange and review protocols govern how sensitive data is shared and reviewed between the organization and its outsourcing partners. Maintenance standards dictate how systems and software are maintained and updated to ensure ongoing security. On-site assessment procedures involve assessing the security measures and practices of service providers at their physical locations. Process and policy review mechanisms ensure that the outsourcing partners adhere to the organization\'s security policies and procedures. Finally, establishing SLAs helps define the expected level of service and sets benchmarks for security performance, ensuring accountability and transparency in the outsourcing relationship.',
          },
          {
            note: 'A Vendor Management System (VMS) is a software platform that helps organizations manage third-party vendors, contractors, and suppliers efficiently. It automates vendor selection, onboarding, performance tracking, contract management, and compliance monitoring. A VMS enhances security, reduces risks, and ensures regulatory compliance by maintaining visibility and control over external workforce and service providers.',
          },
          {
            note: 'Multiparty risk refers to security and operational risks that arise when multiple organizations, vendors, or third parties are involved in a business process, system, or supply chain.',
          },
          {
            questions: [
              { q: "Why is it crucial to incorporate security considerations into information security policies when engaging in outsourcing?", a: "Integrating security considerations into information security policies when outsourcing is crucial to mitigate the risks associated with sharing sensitive information and access to internal systems with third-party providers. This helps ensure the confidentiality, integrity, and availability of the organization's data and systems." },
              { q: 'Explain the significance of access control measures in the context of outsourcing.', a: 'Access control measures in outsourcing are essential to prevent unauthorized access to sensitive systems and data by both internal employees and external service providers. They ensure that only individuals with proper authorization can access specific resources, limiting the potential for data breaches and security incidents.' },
              { q: 'Describe the purpose of document exchange and review protocols when working with external service providers.', a: 'Document exchange and review protocols establish secure and controlled mechanisms for sharing sensitive information between the organization and its outsourcing partners. These protocols define procedures for data encryption, access limitations, and review processes, minimizing the risk of unauthorized disclosure or modification of confidential data during transmission or storage.' },
              { q: 'What role do maintenance standards play in ensuring the security of outsourced IT functions?', a: 'Maintenance standards are vital in outsourcing to ensure that the service providers maintain and update systems and software consistently. Regular updates and patching help address vulnerabilities and protect against emerging threats, minimizing the risk of system failures, security breaches, and data loss.' },
              { q: 'Why are on-site assessment procedures important for evaluating the security practices of outsourcing partners?', a: 'On-site assessment procedures allow organizations to evaluate the physical security measures and practices implemented by outsourcing partners at their facilities. These assessments verify the adequacy of security controls, such as physical access restrictions, environmental safeguards, and data protection measures, ensuring the physical safety of data and equipment.' },
              { q: 'How do process and policy review mechanisms contribute to maintaining security standards in an outsourcing arrangement?', a: "Process and policy review mechanisms ensure ongoing compliance with the organization's security policies and procedures by outsourcing partners. Regular reviews and audits help identify and address any deviations from established security standards, ensuring consistent adherence to security requirements and minimizing potential vulnerabilities." },
              { q: 'What is the function of Service Level Agreements (SLAs) in an outsourcing relationship, particularly concerning security?', a: 'SLAs in outsourcing relationships, specifically regarding security, define the expected level of service, performance metrics, and responsibilities related to security. They establish benchmarks for security performance, incident response times, and reporting procedures, ensuring accountability and providing a framework for monitoring and managing security risks.' },
              { q: 'Explain the relationship between accountability and transparency in the context of SLAs.', a: 'Accountability in SLAs ensures that the service provider is responsible for meeting the defined security standards and performance metrics. Transparency requires clear communication, reporting, and documentation of security practices, allowing the organization to monitor and verify the effectiveness of the security measures implemented by the outsourcing partner.' },
              { q: 'Besides the areas mentioned in the text, identify one additional security aspect that organizations should consider when outsourcing IT functions.', a: 'One additional security aspect to consider when outsourcing IT functions is for example data location and sovereignty. Organizations should define requirements for where their data is stored and processed, considering legal and regulatory compliance related to data privacy and protection in different jurisdictions.' },
              { q: 'Provide an example of a potential risk that could arise from inadequate security measures when outsourcing IT services.', a: 'A potential risk arising from inadequate security measures in IT outsourcing is a data breach. If a service provider lacks robust security controls, unauthorized individuals could gain access to sensitive data, leading to financial loss, reputational damage, and legal liabilities for the organization.' },
            ],
          },
        ],
      },
      // ── 1.9 ──────────────────────────────────────────────────────────────
      {
        id: 'd1t9-0',
        title: '1.9.0 Preface',
        content: [
          {
            body: "A risk-based approach in cybersecurity is essential because it turns abstract fears into clear, manageable tasks: first you assess what could go wrong (like which valuable assets are vulnerable, how likely bad things might happen, and what their impact would be), and then you respond in a smart way—by mitigating, transferring, accepting, or avoiding the risk based on your priorities and resources.",
          },
          {
            body: 'Think of risk-based approach like locking your house (assets) after figuring out which doors or windows (vulnerabilities) a burglar (threat agent) might use (attack vector), instead of leaving everything locked just because "that\'s how you do it." You measure how exposed you are, put in alarms or cameras (controls), and stay alert to new tricks criminals invent—this keeps you efficient, proactive, and aligned with business goals.',
          },
          {
            body: 'It all revolves around these human concepts:\n- Asset: The things you care about and need to protect—like data, systems, or brand reputation.\n- Vulnerability: A weakness—such as outdated software or poor passwords—that could let someone in.\n- Threat (and threat agent): The potential danger—a hacker, natural event, or even an insider—and the actor behind it.\n- Attack vector: The route used—like phishing emails or open network ports—to launch the attack.\n- Risk: The chance that a threat will exploit a vulnerability and harm your assets—and how bad that harm would be.\n- Control (or safeguard): What you do to reduce vulnerabilities or block threats—technical tools, policies, training.\n- Exposure: How much of your asset is actually open to threats, given its vulnerabilities.\n- Attack event: When someone actually hits you—this is when theory becomes real harm.',
          },
        ],
      },
      {
        id: 'd1t9-1',
        title: '1.9.1 Threat and vulnerability identification',
        content: [
          {
            note: 'NIST SP 800-30r1 provides a list of threat categories, concepts and examples.',
          },
          {
            questions: [
              { q: 'What is the key difference between a threat and a vulnerability?', a: 'A threat is a potential event that could cause harm, while a vulnerability is a weakness that makes an asset susceptible to that harm.' },
              { q: 'How do threats and vulnerabilities interact to create risk?', a: 'Threats exploit existing vulnerabilities. When a threat successfully utilizes a vulnerability, it leads to risk, which is the likelihood of harm occurring.' },
              { q: 'Explain the concept of a safeguard and its role in risk management.', a: 'A safeguard is a protective measure that mitigates risk by reducing vulnerabilities or neutralizing threats. Examples include firewalls, security cameras, and data encryption.' },
              { q: 'Differentiate between a threat agent and a threat event.', a: 'A threat agent is an entity that intentionally exploits vulnerabilities, like a hacker or malicious software. A threat event encompasses both intentional actions by threat agents and accidental occurrences that could lead to harm.' },
              { q: 'Define a threat vector and provide an example.', a: 'A threat vector is the path or method used by a threat agent to gain access to a target. For instance, a phishing email could be a threat vector used to steal credentials.' },
              { q: 'What is exposure in the context of risk assessment, and how is it quantified?', a: 'Exposure refers to the potential for asset loss due to a threat. It represents the susceptibility to harm. The Exposure Factor (EF) is a quantitative value used in risk analysis to express this susceptibility.' },
              { q: 'Describe the relationship between risk and the potential severity of harm.', a: 'Risk is directly proportional to the potential severity of harm. A threat that can cause significant damage poses a higher risk than one with limited potential impact.' },
              { q: 'Why is understanding the distinction between threats, vulnerabilities, and risk important for security professionals?', a: 'Understanding these distinctions allows security professionals to accurately assess and prioritize risks, develop effective mitigation strategies, and allocate resources appropriately.' },
              { q: 'Can a threat exist without a corresponding vulnerability? Explain.', a: 'A threat can exist theoretically without a corresponding vulnerability. However, it cannot materialize or cause harm without a weakness to exploit.' },
              { q: 'Provide a real-world example illustrating a threat, a vulnerability, and the resulting risk.', a: 'Threat: A cybercriminal attempting to steal customer data. Vulnerability: A website with weak password security. Risk: The likelihood of the cybercriminal successfully exploiting the weak passwords to steal sensitive data.' },
            ],
          },
        ],
      },
      {
        id: 'd1t9-2',
        title: '1.9.2 Risk analysis, assessment, and scope',
        content: [
          {
            body: 'Risk in the context of security is the potential for harm resulting from a threat exploiting a vulnerability within a system. This concept is often quantified as the product of the probability of harm and the severity of that harm. Addressing either the threat or vulnerability directly through mitigation efforts reduces risk. Threats exploit vulnerabilities, leading to exposure, which is the essence of risk, and safeguarding assets against threats is key to risk mitigation.',
            warning: "While it's impossible to eliminate all risks entirely, organizations can manage them by identifying acceptable and unacceptable risks, typically through a combination of quantitative and qualitative risk analysis methodologies.",
          },
          {
            body: 'Quantitative analysis assigns tangible dollar values to asset losses, while qualitative analysis assesses subjective factors. Most organizations utilize a blend of both methodologies to prioritize risks based on asset-threat pairings and rank them in order of criticality, aiming to minimize the overall risk exposure. In the process of risk ranking, quantitative analysis involves determining the anticipated annual cost of risk to the organization, known as the Annualized Loss Expectancy (ALE). This can be computed using the formula:\n\nALE = SLE x ARO\nALE = (AV x EF) x ARO\n\nHere, the acronyms correspond to:\n- AV: Asset Value: The estimated financial worth or value of an asset within an organization.\n- EF: Exposure Factor: The percentage of asset value likely to be lost in the event of a security breach.\n- SLE: Single Loss Expectancy: The anticipated monetary loss from a single occurrence of a security incident.\n- ARO: Annualized Rate of Occurrence: The estimated frequency or likelihood of a security incident occurring within a year.\n- ALE: Annualized Loss Expectancy: The projected annual financial impact resulting from potential security incidents, calculated by multiplying the SLE by the ARO.',
          },
          {
            questions: [
              { q: 'Briefly describe the two main approaches to risk analysis: quantitative and qualitative.', a: 'Quantitative risk analysis uses numerical data to determine the financial impact and probability of losses. Qualitative analysis considers subjective factors and the impact on intangible assets like reputation.' },
              { q: 'What does the acronym SLE stand for, and how is it calculated?', a: 'SLE stands for Single Loss Expectancy and represents the estimated monetary loss from a single security incident. It is calculated by multiplying the Asset Value (AV) by the Exposure Factor (EF): SLE = AV x EF.' },
              { q: 'What is the significance of the Annualized Rate of Occurrence (ARO) in risk assessment?', a: 'The Annualized Rate of Occurrence (ARO) is a crucial element in risk assessment because it estimates how frequently a particular security incident is expected to occur within a year.' },
              { q: 'How does the Annualized Loss Expectancy (ALE) help organizations prioritize risk mitigation efforts?', a: 'ALE (Annualized Loss Expectancy) helps organizations prioritize risk mitigation efforts by providing an estimated annual financial impact of potential security incidents. Higher ALE values indicate more critical risks requiring immediate attention.' },
              { q: 'Provide the complete formula for calculating the ALE, explaining each component.', a: 'The formula for calculating ALE is: ALE = SLE x ARO, where SLE is the Single Loss Expectancy and ARO is the Annualized Rate of Occurrence.' },
            ],
          },
        ],
      },
      {
        id: 'd1t9-3',
        title: '1.9.3 Risk response and treatment (e.g., cybersecurity insurance)',
        content: [
          {
            body: 'Following the risk analysis process, security should implement the most cost-effective treatments, with the appropriate approach determined by the value of the asset and the type of risk identified in prior steps.\n\nWhile it\'s impossible to completely eliminate risk, it can be managed through various approaches:\n\n- Avoidance: Opting to discontinue activities that expose the asset to risk. While this can prevent risk, it may also entail missing out on significant opportunities (opportunity cost).\n- Transfer: Sharing some risk with another party, typically an insurance company, to mitigate potential losses.\n- Mitigation: Implementing controls to reduce risk to an acceptable level.\n- Acceptance: Choosing to take no action or no further action regarding the risk associated with a particular asset.',
            warning: 'Remember the 4 terms above: avoidance, transfer, mitigation, acceptance but be aware that during your exam and your career you\'ll find many synonyms.',
          },
          {
            questions: [
              { q: 'What is the primary factor in determining the appropriate risk treatment approach?', a: 'The value of the asset and the type of risk identified are the primary factors in determining the appropriate approach to risk treatment.' },
              { q: 'Explain the concept of "opportunity cost" in the context of risk avoidance.', a: 'Opportunity cost, in the context of risk avoidance, refers to the potential benefits or profits that a company might forgo by choosing to avoid activities that carry a certain risk.' },
              { q: 'How does risk transfer typically function in a business setting?', a: 'Risk transfer typically involves a contractual agreement with another entity, often an insurance company, where the risk of potential loss is shared in exchange for a premium payment.' },
              { q: 'Provide an example of risk mitigation in practice.', a: 'Installing a firewall to protect sensitive data is an example of risk mitigation. Other examples include implementing access controls, data encryption, and employee training programs.' },
              { q: 'In what circumstances might risk acceptance be a valid strategy?', a: 'Risk acceptance may be a valid strategy when the cost of mitigating or transferring the risk is disproportionately high compared to the potential impact of the risk itself, or when the risk is considered low and unlikely to occur.' },
              { q: 'What is the relationship between asset value and risk treatment decisions?', a: 'Higher-value assets generally warrant more robust and costly risk treatment measures, while lower-value assets might justify less stringent approaches. The level of risk associated with an asset also influences the choice of treatment.' },
              { q: 'Can risk be entirely eliminated? Explain your answer.', a: 'It is generally impossible to completely eliminate risk. Every business activity inherently carries some degree of risk, and unforeseen circumstances can always arise.' },
              { q: 'Why is it crucial to analyze risk before implementing treatments?', a: 'Analyzing risk before implementing treatments is crucial to understand the nature and severity of the threats, assess the potential impact on assets, and make informed decisions about the most effective and cost-efficient ways to manage those risks.' },
              { q: 'Describe the potential drawbacks of relying solely on risk transfer as a treatment strategy.', a: "Relying solely on risk transfer, such as insurance, can be costly in terms of premium payments. Additionally, it might not cover all potential losses or indirect costs associated with a risk event, and it doesn't address the underlying causes of the risk." },
              { q: 'How can an organization determine what constitutes an "acceptable level" of risk?', a: 'An organization determines an "acceptable level" of risk through a combination of factors, including its risk appetite, industry standards, regulatory requirements, and the cost-benefit analysis of various risk treatment options.' },
            ],
          },
        ],
      },
      {
        id: 'd1t9-4',
        title: '1.9.4 Applicable types of controls (e.g., preventive, detection, corrective)',
        content: [
          {
            body: 'Security controls are designed to reduce the likelihood that a vulnerability will be exploited by a threat. By implementing security controls, organizations can mitigate the risk of vulnerabilities being exploited and protect their assets from harm. The aim of security control, as stated by NIST, is to preserve Confidentiality, Integrity and Availability of information. The term control is interchangeable with the following terms: countermeasure, safeguard, security mechanism, protection mechanism.',
          },
          {
            body: 'Usually, security controls are classified in 2 different ways: security control types and security control functions.\n\nControl types usually answer the question "how are we protecting our assets" and are divided in:\n- Physical Controls are tangible measures used to protect (or detect) unauthorized access to physical systems or areas.\n- Technical Controls include the measures implemented through technology, such as software, hardware, or network systems to protect assets.\n- Administrative Controls are measures (usually documents) implemented through policies, procedures, and other organizational measures defining personnel or business practices in line with the organization security goals.\n\nControl functions are preventative, detective, and corrective. They are related to the time in which an incident happened—before, during and after:\n- Preventative controls comprehend any security measure designed to stop any unwanted activity from occurring.\n- Detective Controls are the solutions to detect and alert to unwanted or unauthorized activity in progress after occurrence.\n- Corrective Controls are the measures to repair damage or restore resources to their prior state following an unauthorized activity.',
          },
          {
            heading: '(ISC)² Security Control Types',
            table: {
              headers: ['Control Type', 'When Applied', 'Purpose', 'Examples'],
              rows: [
                ['Directive', 'Before', 'Guide behavior via policies and awareness', 'Security policies, signage, posters'],
                ['Deterrent', 'Before', 'Discourage violations with perceived consequences', 'Guards, mantraps, warning banners'],
                ['Preventive', 'Before', 'Stop threats before they occur', 'Firewalls, IPS, antivirus'],
                ['Detective', 'During / After', 'Detect and report active or past events', 'IDS, SIEM reviews, honeypots'],
                ['Corrective', 'During / After', 'Halt impact and restore operations', 'Quarantine infected systems, terminate processes'],
                ['Recovery', 'After', 'Restore to normal operation', 'Backups, system shadowing, DR plans'],
                ['Compensating', 'Before / During / After', 'Provide alternate protection when standard controls are missing or insufficient', 'PINs replacing weak passwords, layered controls'],
              ],
            },
            warning: 'Trying to memorize any Security Control categorization, or also memorizing where a security Control is located in the table is an exercise not useful at all.',
          },
          {
            tip: 'There are some concepts that we should always take in mind when dealing with Security Controls: The same control may fall within different classifications—never overthink about the right classification. All control types are preventive by nature. Preventive and Detective controls are complementary (always, when possible, first prevent and then detect). Implementing Security Controls must always be cost effective. Usually Controls are used in layers, combining multiple security controls to develop defense in depth.',
          },
          {
            body: 'A Security Control Framework is a collection of security controls and implementation and audit guidelines usually organized as a template to help organizations in mitigating their risks. Organizations select and customize security control frameworks based on their organizational needs. The selection process is also known as scoping while the customization process may be also called tailoring.\n\nNIST Cybersecurity Framework (CSF): Developed by NIST, is a risk-based framework that helps organizations identify, assess, and prioritize their cybersecurity risks and implement appropriate controls to mitigate those risks. It is designed to be flexible and adaptable.\n\nNIST SP 800-53: More detailed and prescriptive than NIST CSF, provides a comprehensive set of security and privacy controls for federal information systems and organizations. It is organized into 20 control families.\n\nISO/IEC 27001: An international standard that provides a framework for establishing, implementing, maintaining, and continually improving an organization\'s information security management system (ISMS). It has 4 control categories and 93 controls: Organizational Controls, People Controls, Physical Controls, Technological Controls.\n\nCOBIT: Developed by ISACA, provides a set of best practices for managing and governing information and technology (IT) assets.\n\nCIS (Center for Internet Security): Maintains a list of 18 security controls to mitigate the threat of the majority of common cyberattacks, divided in 3 families: Basic, Foundational, and Organizational.',
          },
          {
            questions: [
              { q: 'Explain the three core security principles that security controls aim to preserve.', a: 'Security controls aim to preserve confidentiality, ensuring information is accessed only by authorized individuals; integrity, ensuring information is accurate and protected from unauthorized alteration; and availability, ensuring authorized users can access information when needed.' },
              { q: 'Differentiate between technical controls and administrative controls. Provide an example of each.', a: 'Technical controls are implemented through technology, such as firewalls or intrusion detection systems. Administrative controls involve policies and procedures, like security awareness training or password policies.' },
              { q: 'Why is it crucial to implement security controls in layers, following the principle of defense in depth?', a: 'Layered security, or defense in depth, provides redundancy and resilience. If one control fails, others can still mitigate the threat, reducing the risk of a successful breach.' },
              { q: 'What is the primary purpose of a Security Control Framework, and how does it assist organizations?', a: 'A Security Control Framework provides a structured set of guidelines and best practices to help organizations implement and manage security controls effectively, mitigating risks and protecting assets.' },
              { q: 'Compare and contrast the NIST Cybersecurity Framework (CSF) and NIST SP 800-53.', a: 'NIST CSF is a high-level, flexible framework that helps organizations manage cybersecurity risk. NIST SP 800-53 is a more detailed and prescriptive set of security controls specifically for federal information systems, but widely adopted by other organizations.' },
              { q: 'What are the four control categories in the ISO/IEC 27001 standard? Briefly describe each.', a: "ISO/IEC 27001's four control categories are: Organizational controls, establishing management framework for security; People controls, addressing personnel security awareness and training; Physical controls, protecting physical assets like facilities and equipment; and Technological controls, utilizing software and hardware for security." },
              { q: 'How does COBIT relate to security practices within an organization?', a: 'COBIT is a broader IT governance framework that includes security practices as a key component. By following COBIT, organizations can ensure their IT activities align with business objectives while maintaining proper security measures.' },
              { q: 'Explain the three families of security controls defined by the Center for Internet Security (CIS).', a: 'CIS defines Basic controls, essential for minimal security; Foundational controls, technical best practices for enhanced security; and Organizational controls, focusing on people and processes to maintain and improve security.' },
              { q: 'Why is it important to consider cost-effectiveness when implementing security controls?', a: 'Security control implementation must be cost-effective to ensure the cost of controls does not exceed the value of the assets being protected. This requires balancing security needs with budgetary constraints.' },
              { q: 'Why should you avoid memorizing specific security control categorizations or table locations?', a: 'Memorizing specific categorizations is less important than understanding the core concepts and principles behind security controls. The focus should be on applying those principles to real-world scenarios and adapting to the specific needs of an organization.' },
            ],
          },
        ],
      },
      {
        id: 'd1t9-5',
        title: '1.9.5 Control assessments (e.g., security and privacy)',
        content: [
          {
            body: 'A security control assessment (SCA) involves formally evaluating the individual components of a security infrastructure against established standards or expectations. This assessment can be conducted alongside or separately from comprehensive security evaluations like penetration tests or vulnerability assessments. The primary objectives of an SCA include validating the effectiveness of security measures, assessing the organization\'s risk management processes, and generating a report outlining the strengths and weaknesses of the deployed security infrastructure. Results from an SCA may indicate the continued effectiveness of security controls or highlight areas requiring remediation. Additionally, SCAs should consider the impact of security controls on privacy, ensuring alignment with regulations, contracts, and organizational privacy policies.',
            note: 'Generally, an SCA is a process implemented by federal agencies based on NIST SP 800-53 Rev. 5.',
          },
          {
            questions: [
              { q: 'What is the primary purpose of a Security Control Assessment (SCA)?', a: 'The primary purpose of an SCA is to formally evaluate the individual components of a security infrastructure against established standards or expectations to determine their effectiveness.' },
              { q: 'How does an SCA differ from a penetration test?', a: 'While both assess security, an SCA focuses on evaluating the effectiveness of existing security controls against standards, whereas a penetration test simulates real-world attacks to identify vulnerabilities.' },
              { q: 'List three key objectives of an SCA.', a: 'Three key objectives of an SCA are: validating the effectiveness of security measures, assessing the organization\'s risk management processes, and generating a report outlining strengths and weaknesses of the security infrastructure.' },
              { q: 'What are two potential outcomes of conducting an SCA?', a: 'An SCA can indicate the continued effectiveness of security controls or highlight areas requiring remediation.' },
              { q: 'Explain how privacy considerations factor into an SCA.', a: 'SCAs must consider the impact of security controls on privacy, ensuring alignment with regulations, contracts, and organizational privacy policies.' },
              { q: 'Why is it important to evaluate security controls against established standards?', a: 'Evaluating against standards ensures a consistent and recognized benchmark for security control effectiveness, allowing for comparison and identification of potential weaknesses.' },
              { q: 'Provide an example of a situation where an SCA might be necessary.', a: 'An SCA might be necessary after a significant system change, a suspected security breach, or as part of regular security audits.' },
              { q: 'What type of information is typically included in an SCA report?', a: 'An SCA report typically includes details of the assessment methodology, findings on the effectiveness of each control, recommendations for remediation, and an overall risk assessment.' },
              { q: 'Who are the typical stakeholders involved in an SCA?', a: 'Stakeholders involved in an SCA can include security personnel, IT staff, management, auditors, and potentially external consultants.' },
              { q: 'How can an organization utilize the results of an SCA to improve its security posture?', a: 'Organizations can use SCA results to prioritize remediation efforts, update security policies, allocate resources effectively, and demonstrate compliance with regulations.' },
            ],
          },
        ],
      },
      {
        id: 'd1t9-6',
        title: '1.9.6 Continuous monitoring and measurement',
        content: [
          {
            body: 'Security controls must offer measurable benefits to justify their implementation. If a control cannot be quantified, evaluated, or compared, it may not enhance security effectively.',
            tip: 'Monitoring events before and after control implementation is necessary to accurately measure benefits.',
          },
          {
            body: 'Consider whether a control provides native monitoring or requires external monitoring when selecting countermeasures. Effectiveness measurements for countermeasures often involve assessing degrees of improvement rather than precise numbers of breaches prevented. Evaluating the cost-effectiveness of a control involves comparing the security improvement gained with the expense of deployment.',
            warning: 'Implement and forget is definitely a bad approach with security countermeasures.',
          },
          {
            questions: [
              { q: 'Why is it crucial for security controls to offer measurable benefits?', a: 'Measurable benefits justify the implementation of security controls. Without quantifiable improvements, it is difficult to determine if the control is actually enhancing security.' },
              { q: 'What are the potential drawbacks of implementing a security control that cannot be quantified or evaluated?', a: 'Controls that lack quantifiable metrics cannot be effectively evaluated for their impact on security. This makes it difficult to justify their cost and assess their contribution to the overall security posture.' },
              { q: 'What aspect of monitoring should be considered when choosing between different security countermeasures?', a: 'When choosing countermeasures, consider whether a control offers native monitoring capabilities or requires external monitoring tools. This impacts the cost and complexity of implementation.' },
              { q: 'How are the effectiveness measurements for countermeasures typically assessed?', a: 'Effectiveness is often assessed by measuring the degree of improvement in security rather than relying on precise numbers of prevented breaches. This acknowledges the difficulty in quantifying all security incidents.' },
              { q: 'Why is it important to monitor events both before and after implementing a security control?', a: "Monitoring before implementation provides a baseline for comparison, while monitoring after implementation reveals the control's impact on security events. This comparison allows for a more accurate measurement of benefits." },
              { q: 'What factors are involved in evaluating the cost-effectiveness of a security control?', a: 'Cost-effectiveness involves comparing the security improvement gained from the control against the expenses associated with its deployment, including initial costs, maintenance, and operational expenses.' },
              { q: 'Explain the concept of "degrees of improvement" in the context of security control effectiveness.', a: '"Degrees of improvement" acknowledges that security benefits aren\'t always absolute. A control might reduce the frequency or severity of attacks, or improve detection rates, rather than completely eliminating threats.' },
              { q: 'What might be a reason a security control with measurable benefits is not implemented?', a: 'Even with measurable benefits, a control might not be implemented due to budget constraints, compatibility issues with existing systems, or a lack of skilled personnel to manage the control.' },
              { q: 'Why is it important to compare different security countermeasures before selection?', a: 'Comparing different countermeasures allows organizations to choose the option that offers the best balance between security improvement, cost-effectiveness, and integration with existing infrastructure.' },
            ],
          },
        ],
      },
      {
        id: 'd1t9-7',
        title: '1.9.7 Reporting (e.g., internal, external)',
        content: [
          {
            body: 'Risk reporting is a critical task following a risk analysis, involving the creation and presentation of a comprehensive report to relevant parties. While some organizations limit risk reporting to internal use, others may be required to report findings externally. The report should be accurate, timely, and clear, supporting informed decision-making and regularly updated. Additionally, a risk register or risk log inventories identified risks, tracks risk management activities, and serves as a historical record. It can be shared to enhance evaluation of threats and risks, while a risk matrix or heat map provides a visual representation of risk assessment results.',
            tip: 'Risk reporting is a fundamental skill for a security professional because it enables effective communication of potential threats, vulnerabilities, and mitigation strategies to stakeholders, facilitating informed decision-making and proactive risk management.',
          },
          {
            body: 'For an effective risk reporting it is very important to understand the concepts of Risk capacity, tolerance and appetite. Think of risk appetite as what management wants to accept, risk tolerance as how much variation they\'ll allow day-to-day, and risk capacity as the absolute maximum the organization can survive.',
          },
          {
            questions: [
              { q: 'What is the primary purpose of risk reporting?', a: 'The primary purpose of risk reporting is to communicate the results of a risk analysis to relevant parties, enabling informed decision-making regarding risk mitigation and management strategies.' },
              { q: 'Explain the importance of accuracy, timeliness, and clarity in risk reports.', a: 'Accurate, timely, and clear risk reports ensure that stakeholders have a reliable and understandable basis for making decisions related to risks. Accuracy ensures the information is dependable, timeliness allows for prompt action, and clarity promotes understanding and avoids misinterpretations.' },
              { q: 'Differentiate between internal and external risk reporting.', a: 'Internal risk reporting is intended for stakeholders within the organization, such as management, employees, and internal audit. External risk reporting involves communicating risk information to parties outside the organization, such as regulators, investors, or the public.' },
              { q: 'What is a risk register and what information does it typically contain?', a: 'A risk register is a document or database that inventories identified risks, tracks risk management activities, and serves as a historical record of risk assessments and mitigation efforts. It typically includes information like risk description, likelihood, impact, assigned owner, mitigation plans, and current status.' },
              { q: 'How does a risk register contribute to evaluating threats and risks?', a: 'A risk register enhances the evaluation of threats and risks by providing a centralized repository of risk information, enabling stakeholders to monitor existing risks, track their evolution, and assess the effectiveness of implemented risk management strategies.' },
              { q: 'What is the function of a risk matrix or heat map in risk management?', a: 'A risk matrix or heat map provides a visual representation of risk assessment results, often by plotting the likelihood and impact of each risk on a grid. This allows for quick identification and prioritization of risks based on their potential severity.' },
              { q: 'Describe the relationship between a risk analysis and a risk report.', a: 'A risk analysis identifies, assesses, and prioritizes potential risks, while a risk report presents the findings of this analysis in a structured format for communication and decision-making.' },
              { q: 'Who are the typical recipients of internal risk reports?', a: 'Typical recipients of internal risk reports include management teams at various levels, project managers, risk management committees, and relevant department heads.' },
              { q: 'Provide an example of a situation where external risk reporting might be required.', a: 'External risk reporting might be required in situations where regulations mandate disclosure of specific risks, when seeking investment funding, or when transparency with stakeholders is crucial for maintaining trust and reputation.' },
              { q: 'How does regular updating of risk reports contribute to effective risk management?', a: 'Regular updating of risk reports ensures that the information remains current and relevant, reflecting changes in the risk landscape, the effectiveness of mitigation measures, and the emergence of new risks. This continuous feedback loop supports proactive risk management and informed decision-making.' },
            ],
          },
        ],
      },
      {
        id: 'd1t9-8',
        title: '1.9.8 Continuous improvement (e.g., risk maturity modeling)',
        content: [
          {
            body: 'Risk analysis serves to inform upper management about risk mitigation strategies, such as transferring, deterring, avoiding, or accepting risks, by comparing the cost of potential asset loss with safeguard deployment costs. It identifies and quantifies risks, aiding in security budgeting and alignment with business goals. Risk assessments must be periodically updated to accommodate evolving threats and vulnerabilities, supporting continuous improvement. Evaluating enterprise risk management using the Risk Maturity Model (RMM) assesses key indicators and activities for a mature, sustainable risk management process, typically categorized into five levels:\n\n- ad hoc: this is chaos\n- preliminary: first unordered attempts to follow risk management processes\n- defined: a common standard or framework is shared and adopted across the organization\n- integrated: risk management is baked in business processes, metrics and KRI (Key Risk Indicators) are in use\n- optimized: risk management becomes proactive',
          },
          {
            questions: [
              { q: 'What is the purpose of risk analysis in relation to IT security?', a: 'Risk analysis informs upper management about potential security risks and mitigation strategies. It quantifies risks, allowing for cost-benefit analysis of safeguard deployment versus potential asset loss, and facilitates informed decision-making regarding risk acceptance, avoidance, deterrence, or transfer.' },
              { q: 'Explain the importance of regularly updating risk assessments.', a: 'Regularly updating risk assessments is essential to address evolving threats and vulnerabilities. As the technological landscape changes, new attack vectors emerge, and existing vulnerabilities become more exploitable. Keeping risk assessments current ensures appropriate security measures are in place.' },
              { q: 'Describe the five levels of the Risk Maturity Model (RMM).', a: 'The Risk Maturity Model (RMM) categorizes risk management processes into five levels: (1) Ad hoc: informal and reactive; (2) Preliminary: basic risk identification; (3) Defined: standardized processes; (4) Integrated: risk management aligned with business goals; (5) Optimized: continuous improvement and proactive risk management.' },
              { q: 'Why do legacy devices pose security risks?', a: 'Legacy devices pose security risks due to the lack of vendor support, leaving them vulnerable to newly discovered exploits. Without security updates and patches, these devices become easy targets for attackers.' },
              { q: 'What are the key distinctions between EOL and EOSL?', a: 'EOL (End of Life) marks the cessation of manufacturing, marketing, and sales of a product by the OEM. EOSL (End of Service Life) signifies the termination of all support services, including updates and patches.' },
              { q: 'What happens to firmware and software updates after a device reaches EOL?', a: 'After a device reaches EOL, development of firmware and software updates becomes limited. Post-warranty maintenance may be available at a higher cost for a limited time.' },
              { q: 'What does the term EOS typically indicate?', a: 'EOS (End of Sale) typically indicates the point at which the OEM stops selling the equipment. It\'s often used interchangeably with EOL.' },
              { q: 'Do EOL and EOSL dates necessarily mean immediate equipment failure?', a: 'EOL and EOSL dates do not necessarily guarantee immediate equipment failure. While the risk of failure increases over time, well-maintained equipment may continue to function effectively.' },
              { q: 'What options exist for supporting equipment beyond OEM support?', a: 'Beyond OEM support, options for supporting equipment include self-maintenance, engaging third-party maintenance providers, or using open-source alternatives for software and firmware.' },
              { q: 'What potential benefits can third-party maintenance providers offer?', a: 'Third-party maintenance providers can offer cost-effective solutions for maintaining equipment functionality beyond EOL or EOSL. They may provide access to expertise, spare parts, and ongoing maintenance services.' },
            ],
          },
        ],
      },
      {
        id: 'd1t9-9',
        title: '1.9.9 Risk frameworks (e.g., ISO, NIST, COBIT, SABSA, PCI)',
        content: [
          {
            body: 'A risk framework serves as a structured approach outlining how risks are assessed, addressed, and monitored. Notably, NIST has established two pivotal frameworks: the Risk Management Framework (RMF) and the Cybersecurity Framework (CSF). The CSF provides guidelines for mitigating cybersecurity risks within organizations, drawing upon existing standards, guidelines, and practices. On the other hand, the RMF functions as a risk management process designed to identify and respond to threats, delineated across three core Special Publications: SP 800-37 Rev 2, SP 800-39, and SP 800-30 Rev 1. The RMF encompasses seven steps and six cyclical phases, beginning with preparation at both organizational and system levels and culminating in continuous monitoring to assess control effectiveness and report on the system\'s security and privacy posture.',
          },
          {
            body: 'The CSF revolves around a core framework comprising five functions: Identify, Protect, Detect, Respond, and Recover. Rather than a mere checklist or procedural guide, it serves as a directive for ongoing operational activities aimed at enhancing security progressively.',
          },
          {
            body: "COBIT is a framework that helps organizations make sure their IT and security activities support business goals instead of operating in isolation. The COBIT framework is built around six governance system principles: Provide stakeholder value – IT and security activities must create value for the business. Holistic approach – Effective governance requires people, technology, information, culture, policies, and organizational structures to work together. Dynamic governance system – The system must adapt when business goals, risks, regulations, or technologies change. Governance distinct from management – Leadership sets direction and risk tolerance, while management plans, builds, runs, and monitors. Tailored to enterprise needs – COBIT should be adapted based on the organization's size, industry, risk profile, and strategy. End-to-end governance system – Governance applies across the entire organization.",
          },
          {
            body: 'SABSA (Sherwood Applied Business Security Architecture) is a security architecture framework that helps organizations design security starting from business needs rather than from technology. The key aspects of SABSA are: Business-driven security – Security requirements originate from business goals, risk appetite, and operational needs. Layered architecture – Security is designed across multiple layers (contextual, conceptual, logical, physical, and operational). Traceability – Every security control can be traced back to a specific business requirement or risk. Risk-focused approach – Security decisions are based on risk management and business impact. Lifecycle integration – Security architecture supports the full lifecycle. Alignment with enterprise architecture – Security becomes part of overall enterprise architecture.',
          },
          {
            heading: 'Risk Management Frameworks',
            table: {
              headers: ['Framework', 'Description'],
              rows: [
                ['NIST SP 800-37', 'Describes the Risk Management Framework (RMF) and provides structured guidelines to identify, assess, select, implement, and continuously monitor controls across information systems and organizations.'],
                ['ISO 31000', 'A family of international standards offering a principles-based, enterprise-wide approach for managing any type of risk. Widely applicable across industries and focuses on integrating risk management into governance and operations.'],
                ['COSO ERM', 'Defines essential enterprise risk management components, principles, and concepts. Frequently used to align governance, risk, and performance at the board and organizational level, especially in regulated industries.'],
                ['ISACA Risk IT Framework', 'Provides a structured methodology to identify, manage, and optimize IT-related risk tied to enterprise value. Closely aligned with COBIT and focused on integrating business context, risk appetite, and decision-making.'],
                ['COBIT', 'A governance and management framework for enterprise IT that ensures information and technology support business objectives, deliver value, and manage risk effectively.'],
                ['SABSA', 'A business-driven security architecture framework that translates business requirements and risk into structured security architecture layers.'],
              ],
            },
          },
          {
            questions: [
              { q: 'What is the primary purpose of a risk framework?', a: 'A risk framework provides a structured approach for assessing, addressing, and monitoring risks.' },
              { q: 'Differentiate between the NIST RMF and CSF in terms of their focus and application.', a: 'The RMF is a comprehensive risk management process focused on identifying and responding to threats, while the CSF provides guidelines specifically for mitigating cybersecurity risks.' },
              { q: 'Outline the seven steps involved in the NIST RMF process.', a: 'The seven steps of the RMF are: Prepare, Categorize, Select, Implement, Assess, Authorize, and Monitor.' },
              { q: 'Describe the core functions that constitute the NIST CSF.', a: 'The five core functions of the CSF are: Identify, Protect, Detect, Respond, and Recover.' },
              { q: 'Why is the NIST CSF considered more of a directive than a checklist?', a: 'The CSF emphasizes ongoing operational activities for continuous security enhancement rather than a static set of procedures.' },
              { q: 'Explain the role of continuous monitoring within the NIST RMF.', a: "Continuous monitoring ensures the effectiveness of security controls and provides insights into the system's security and privacy posture." },
              { q: 'What is the significance of Special Publications 800-37, 800-39, and 800-30 in the context of the RMF?', a: 'These Special Publications provide detailed guidance on implementing the RMF, managing risk, and conducting risk assessments, respectively.' },
              { q: 'How does the NIST RMF integrate security, privacy, and cyber supply chain risk management?', a: 'The RMF considers these three aspects throughout the system development life cycle, ensuring a holistic approach to risk management.' },
              { q: 'Briefly describe the purpose and scope of the ISO 31000 framework.', a: 'ISO 31000 offers a set of standards and guidelines for establishing and implementing effective risk management practices across various industries and organizations.' },
              { q: 'What is the key feature that aligns the ISACA Risk IT Framework with COBIT?', a: 'The alignment with COBIT ensures that the ISACA Risk IT Framework leverages best practices in IT governance and management for risk optimization and security.' },
            ],
          },
        ],
      },
      // ── 1.10 ─────────────────────────────────────────────────────────────
      {
        id: 'd1t10',
        title: '1.10 Apply Supply Chain Risk Management (SCRM) concepts',
        content: [
          {
            body: 'Threat modeling is a security process that involves identifying, categorizing, and analyzing potential threats. It can be conducted proactively during the design and development phase or reactively once a product is deployed. The process aims to assess the potential harm, probability of occurrence, priority of concern, and methods to mitigate or eliminate threats. A defensive approach to threat modeling occurs early in the development stages, focusing on predicting threats and integrating specific defenses during coding and crafting.',
          },
          {
            body: 'There are several common ways to approach threat modeling, each with a unique focus. Asset-based threat modeling begins by identifying valuable assets, such as sensitive data or critical systems, and assessing the threats that could compromise them. Attacker-based threat modeling focuses on understanding potential adversaries, including their motivations, capabilities, and likely attack vectors, to predict and mitigate their actions. Software-based threat modeling analyzes the application or system architecture to identify vulnerabilities in its design, code, or interactions with other components.',
          },
          {
            heading: 'Threat Modeling Approaches',
            table: {
              headers: ['Approach', 'Primary Focus', 'Key Activities'],
              rows: [
                ['Asset-based', 'Valuable Assets', 'Identifying sensitive data and critical systems; assessing threats that could compromise them.'],
                ['Attacker-based', 'Potential Adversaries', 'Understanding motivations, capabilities, and attack vectors to predict and mitigate actions.'],
                ['Software-based', 'System Architecture', 'Analyzing design, code, and component interactions to identify structural vulnerabilities.'],
              ],
            },
            note: 'While each method provides unique value, the most robust security posture usually comes from combining all three to cover every angle—from the "what" (assets) and the "who" (attackers) to the "how" (software).',
          },
          {
            body: 'Microsoft developed the STRIDE threat model, which includes six categories: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service (DoS), and Elevation of privilege. Another methodology, the Process for Attack Simulation and Threat Analysis (PASTA), comprises seven stages, each with specific objectives and deliverables. Additionally, Visual, Agile, and Simple Threat (VAST) integrates threat and risk management into an Agile programming environment.',
          },
          {
            heading: 'Threat Models',
            table: {
              headers: ['Threat Model', 'Description'],
              rows: [
                ['STRIDE', 'STRIDE is a mnemonic-based method developed by Microsoft to categorize threats: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege—helping teams systematically identify where systems may fail.'],
                ['PASTA', 'PASTA (Process for Attack Simulation & Threat Analysis) is a seven-stage, risk-centric methodology that aligns threat modeling with business objectives—covering objectives definition, application decomposition, threat analysis, attack modeling, and risk mitigation planning.'],
                ['VAST', 'VAST (Visual, Agile & Simple Threat modeling) is built for scale in Agile environments—integrating threat modeling continuously across teams and tools throughout the development lifecycle.'],
                ['DREAD', 'DREAD is a quantitative rating system measuring threats based on Damage potential, Reproducibility, Exploitability, Affected users, and Discoverability—producing an average score to prioritize risks.'],
                ['TRIKE', 'TRIKE is an open-source, risk-based methodology combining a stakeholder-defined requirement model with an implementation model (often a Data Flow Diagram) to assign acceptable risk levels and audit compliance.'],
              ],
            },
          },
          {
            body: 'Reduction analysis is a method used in threat modeling to break down a system into its fundamental components to identify potential vulnerabilities. The process focuses on understanding how different parts of the system interact and where risks might emerge. Key concepts include:\n\nTrust boundary: The line that separates areas of differing trust levels in a system. Crossing this boundary introduces potential risks because data or requests may come from untrusted or less-trusted sources. For example: Crossing from the internet (untrusted) into an internal database (trusted); Transitions between user roles, such as guest and admin.\n\nDataflow paths: The movement of data through a system, showing how information is transferred between components. Mapping these paths helps identify where sensitive data might be exposed or altered.\n\nInput points: Locations where external entities interact with the system, providing data or instructions. These points are critical because they are often exploited by attackers. Examples include login forms, file upload features, and APIs.\n\nPrivileged operations: Actions requiring elevated permissions, such as modifying system settings, accessing restricted data, or managing user roles. These operations are high-value targets for attackers.',
          },
          {
            questions: [
              { q: 'What is the primary goal of threat modeling, and when can it be conducted in the development lifecycle?', a: 'The primary goal of threat modeling is to identify, categorize, and analyze potential threats to a system. It can be conducted proactively during design and development or reactively after deployment.' },
              { q: 'Briefly explain the difference between attacker-based and asset-based threat modeling.', a: 'Attacker-based threat modeling focuses on understanding the motivations, capabilities, and attack vectors of potential adversaries. In contrast, asset-based threat modeling centers on identifying valuable assets and the threats that could compromise them.' },
              { q: 'What are the six threat categories defined by the STRIDE model?', a: 'The STRIDE model defines six threat categories: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service (DoS), and Elevation of Privilege.' },
              { q: 'What does the acronym PASTA stand for, and what is its core focus?', a: 'PASTA stands for Process for Attack Simulation and Threat Analysis. It is a seven-stage methodology primarily focused on assessing risks based on asset value.' },
              { q: 'How does the VAST approach differ from traditional threat modeling methodologies?', a: 'VAST (Visual, Agile, and Simple Threat) integrates threat and risk management directly into an Agile programming environment, making it more dynamic and adaptable compared to traditional methods.' },
              { q: 'What are the five criteria evaluated in the DREAD rating system?', a: 'The DREAD rating system evaluates five criteria: Damage potential, Reproducibility, Exploitability, Affected Users, and Discoverability.' },
              { q: 'What is the purpose of reduction analysis in the context of threat modeling?', a: "Reduction analysis breaks down a system into its fundamental components to better understand the system's logic, interactions, and potential vulnerabilities. This detailed examination helps pinpoint where risks might emerge." },
              { q: 'Define the concept of a trust boundary and provide an example.', a: 'A trust boundary is the line that separates areas of differing trust levels in a system. Crossing this boundary introduces potential security risks. An example is the transition from the internet (untrusted) to an internal database (trusted).' },
              { q: 'Why are input points considered high-risk areas from a security perspective?', a: 'Input points are high-risk areas because they provide a direct interface for external entities to interact with the system, offering opportunities for attackers to inject malicious data or commands.' },
              { q: 'Give an example of a privileged operation and explain why it is an attractive target for attackers.', a: "Granting admin access to a user is an example of a privileged operation. It's an attractive target for attackers because it grants them significant control over the system, potentially allowing them to bypass security measures and access sensitive information." },
            ],
          },
        ],
      },
      // ── 1.11 ─────────────────────────────────────────────────────────────
      {
        id: 'd1t11-1',
        title: '1.11.1 Risks associated with the acquisition of products and services from suppliers and providers (e.g., product tampering, counterfeits, implants)',
        content: [
          {
            body: 'Hardware, software, and services are associated with various risks that can impact organizational security and operations. Supply Chain Risk Management (SCRM) is crucial for ensuring the reliability, trustworthiness, and integrity of all vendors or links in the supply chain. Each link should be accountable and transparent, disclosing their practices and security requirements to their business partners. Proper organization, documentation, management, and auditing of each handoff in the supply chain are essential.',
            warning: 'The ultimate goal of a secure supply chain is to guarantee that the final product meets quality, performance, and security standards without any compromise or unauthorized manipulation throughout the process. However, the supply chain itself can pose a threat vector, as materials, software, hardware, or data obtained from trusted sources may have been compromised or manipulated maliciously.',
          },
          {
            questions: [
              { q: 'What are the three primary components associated with supply chain risks?', a: 'The three primary components associated with supply chain risks are hardware, software, and services.' },
              { q: 'What is the core objective of Supply Chain Risk Management (SCRM)?', a: 'The core objective of Supply Chain Risk Management (SCRM) is to ensure the reliability, trustworthiness, and integrity of all vendors and links within the supply chain.' },
              { q: 'Explain the concept of accountability and transparency in the context of SCRM.', a: 'Accountability in SCRM means each link in the chain takes responsibility for their actions and their security practices. Transparency requires that they openly share these practices and security requirements with their business partners.' },
              { q: 'Why is proper documentation and management crucial for each stage of the supply chain?', a: 'Proper documentation and management at each stage provide a clear audit trail, enabling organizations to track materials and identify potential points of compromise. This facilitates effective risk assessment and incident response.' },
              { q: 'What is the ultimate goal of a secure supply chain?', a: 'The ultimate goal of a secure supply chain is to guarantee that the final product meets quality, performance, and security standards without any compromise or unauthorized manipulation throughout the process.' },
              { q: 'Describe how the supply chain itself can become a threat vector.', a: 'The supply chain itself can become a threat vector if materials, software, hardware, or data obtained from seemingly trusted sources have been compromised or maliciously manipulated at any point before reaching the end user.' },
              { q: 'What types of materials could be compromised in a supply chain attack?', a: 'A wide range of materials could be compromised in a supply chain attack, including raw materials, manufactured components, software packages, hardware devices, and sensitive data.' },
              { q: 'Why is trust not sufficient to guarantee security in a supply chain?', a: 'Trust alone is not sufficient because even trusted sources can be unwittingly compromised. SCRM emphasizes verification and validation at each stage to ensure the integrity of all components.' },
              { q: 'How does SCRM help organizations mitigate the risks associated with third-party vendors?', a: 'SCRM helps organizations mitigate risks associated with third-party vendors by establishing clear security standards, conducting due diligence on vendors, monitoring their practices, and implementing controls to minimize the impact of potential compromises.' },
            ],
          },
        ],
      },
      {
        id: 'd1t11-2',
        title: '1.11.2 Risk mitigations (e.g., third-party assessment and monitoring, minimum security requirements, service level requirements, silicon root of trust, physically unclonable function, software bill of materials)',
        content: [
          {
            body: "Third-party assessment and monitoring are essential steps for organizations before engaging in business partnerships. Conducting due diligence through third-party assessments aids in gathering pertinent information for evaluation. On-site assessments provide valuable insights into physical security and operational practices, while thorough document reviews help assess architecture, designs, policies, and procedures. Understanding the current environment's state is crucial for identifying any compliance issues or shortcomings prior to integrating IT infrastructures. The level of access and depth of information obtained during assessments typically align with the closeness of the partnership. Establishing minimum security requirements is a fundamental aspect of the assessment process, which may involve adapting existing security requirements or establishing new ones. Similarly, reviewing Service Level Agreements (SLAs) ensures alignment with internal operations, customer expectations, and partner agreements.",
          },
          {
            body: 'The Silicon Root of Trust refers to a hardware-based security feature embedded in the silicon (microchip) of a device. It is the foundational trust anchor that is critical for secure booting, key storage, and cryptographic operations. The RoT is used to verify the integrity of the firmware and software during the boot process to ensure that they have not been tampered with.',
            note: 'Since it is hardware-based, RoT is considered highly resistant to tampering or attacks compared to software-based trust mechanisms.',
          },
          {
            body: 'A Physically Unclonable Function (PUF) is a hardware-based security feature that takes advantage of the inherent physical differences in manufacturing processes to create unique identifiers. These differences are not reproducible, meaning that no two PUFs are identical, even if they come from the same production line. A PUF can generate a unique cryptographic key or challenge-response pair based on these physical properties, making it highly secure for applications such as device authentication or encryption key generation.',
          },
          {
            body: 'A Software Bill of Materials (SBOM) is a comprehensive list or inventory of all the components (e.g., libraries, frameworks, modules) included in a piece of software. It provides transparency into the software supply chain, helping organizations track vulnerabilities and dependencies across different software components. The SBOM is critical for assessing the security posture of software, as it allows for identifying vulnerable or outdated libraries, ensuring that only trusted and secure components are included.',
          },
          {
            questions: [
              { q: 'Why are third-party assessments important before engaging in business partnerships?', a: "Third-party assessments are crucial for gathering information about potential partners and evaluating their security practices. This helps organizations identify potential risks and ensure compatibility before entering into a business relationship." },
              { q: 'What are two methods of conducting third-party assessments, and what type of information does each method gather?', a: 'Two methods are on-site assessments, which offer insights into physical security and operational practices, and document reviews, which help assess architecture, designs, policies, and procedures.' },
              { q: "What is the purpose of understanding the current state of a potential partner's environment?", a: "Understanding the current environment helps identify compliance issues or shortcomings in the potential partner's security posture, which can be addressed before integration." },
              { q: 'How does the closeness of a partnership impact the level of access and information obtained during assessments?', a: 'Closer partnerships typically necessitate deeper levels of access and more comprehensive information sharing during assessments due to the increased interconnectivity and potential risks involved.' },
              { q: 'Why is establishing minimum security requirements a crucial part of the assessment process?', a: 'Establishing minimum security requirements ensures that the partner meets a baseline level of security, minimizing the risk of vulnerabilities affecting the organization. These requirements may involve adapting existing standards or creating new ones.' },
              { q: 'What considerations should be made when reviewing Service Level Agreements (SLAs) as part of third-party assessments?', a: 'SLAs should align with internal operations, customer expectations, and partner agreements. Consideration must be given to existing SLAs of the partner and the potential need to support them until expiration or renewal.' },
              { q: 'What challenges might arise when harmonizing SLAs with established standards?', a: 'Harmonizing SLAs may require significant time and coordination, particularly when existing SLAs must be honored, potentially leading to delays in full integration.' },
              { q: 'What is the importance of document reviews in third-party assessments?', a: "Document reviews are essential for assessing the architectural design, policies, and procedures of the potential partner, providing valuable insights into their security practices and compliance posture." },
              { q: "How do on-site assessments contribute to the overall understanding of a potential partner's security posture?", a: "On-site assessments allow for direct observation of the physical security measures and operational practices of the potential partner, offering a more comprehensive understanding of their real-world security posture." },
            ],
          },
        ],
      },
      // ── 1.12 ─────────────────────────────────────────────────────────────
      {
        id: 'd1t12-1',
        title: '1.12.1 Methods and techniques to increase awareness and training (e.g., social engineering, phishing, security champions, gamification)',
        content: [
          {
            body: 'Before initiating actual training sessions, it is imperative to establish security awareness among users. Once this foundational step is accomplished, training sessions can commence, focusing on instructing employees in their job tasks and ensuring compliance with security policies.',
          },
          {
            body: 'All new hires necessitate some level of training to adhere to standards, guidelines, and procedures mandated by security policies. Education, on the other hand, involves a more comprehensive learning process, often associated with individuals pursuing certification or seeking career advancement.',
          },
          {
            heading: 'Awareness, Training, and Education',
            table: {
              headers: ['Stage', 'Objective & Scope'],
              rows: [
                ['Awareness', 'Establish a security mindset before formal training begins. New hires first need to understand why security matters—recognize threats like phishing, safe data handling (e.g. encryption), and physical asset protection.'],
                ['Training', 'Once awareness is built, deliver task-specific instruction on job-related security practices and policy compliance. This is required for all new employees to meet standards and procedures.'],
                ['Education', 'Involves deeper, often role- or certification-based learning—ideal for individuals seeking career advancement or technical expertise beyond standard training.'],
              ],
            },
            tip: 'The final target of awareness, training and education is a change in user behaviour.',
          },
          {
            body: 'Training should be mandatory and provided to both new hires and through regular sessions conducted yearly at a minimum. Additionally, routine operational security tests, including phishing simulations, tailgating exercises, and social engineering scenarios, are crucial for evaluating and enhancing security awareness. The concept of security champions has gained traction, designating individuals within teams to advocate for security measures, address areas requiring attention, and facilitate skill development among team members. Furthermore, gamification techniques are being employed to make training and education more engaging, incorporating elements like interactive games, score tracking, and rewards to incentivize participation and knowledge retention.',
          },
          {
            body: 'Microtraining delivers very short, focused learning modules—typically under 5 minutes—tailored to a single cybersecurity topic like phishing detection or password hygiene. These bite-sized sessions boost engagement and retention, fit seamlessly into daily workflows, and are easy to update regularly. Standard training is longer and more structured—think multi-hour sessions or full courses that cover multiple topics in depth. For cybersecurity teams, microtraining is ideal for ongoing awareness reinforcement, rapid updates, just-in-time learning, and behavioral change. Standard training remains essential for onboarding, structured compliance, and foundational learning—but works best when complemented by microtraining to reinforce key concepts over time.',
          },
          {
            body: 'Measuring the effectiveness of awareness, training, and education in cybersecurity involves combining real-world data, testing, and feedback. You begin with pre-and post-training assessments (knowledge checks and quizzes) to gauge improvement in employee understanding. Next, track behavioral metrics, like phishing simulation click rates, reporting frequency, and time to report—to see if learning results in safer actions over time. Finally, collect employee feedback and monitor security incident trends (e.g., number of breaches or policy violations) to understand how awareness and training impact real-world behavior and compliance.',
          },
          {
            heading: 'Measuring Effectiveness of Awareness, Training & Education',
            table: {
              headers: ['Focus Area', 'How to Measure'],
              rows: [
                ['Knowledge Gain', 'Pre- and post-training quizzes: measure score improvement'],
                ['Behavior Change', 'Phishing simulation results: click rate, report rate, time to report'],
                ['Engagement & Reach', 'Completion & participation rates: percent of staff trained'],
                ['Feedback & Perception', 'Surveys / feedback forms to assess relevance and confidence'],
                ['Incident & Compliance Trends', 'Security incident metrics: number of breaches, policy violations over time'],
              ],
            },
          },
          {
            questions: [
              { q: 'What is the essential first step before starting security training, and why is it crucial?', a: 'Establishing security awareness is crucial before starting training. This foundation ensures employees understand the importance of security and are more receptive to training content.' },
              { q: 'Differentiate between training and education in the context of cybersecurity.', a: 'Training focuses on specific job tasks and compliance with security policies, while education is broader, involving deeper learning and career advancement. Education often includes certifications and advanced concepts.' },
              { q: 'List three examples of threats that employees should be aware of.', a: 'Employees should be aware of threats like phishing, malware, and social engineering. These are common attack vectors used to compromise data and systems.' },
              { q: 'What is the recommended frequency for security training, and why is ongoing training important?', a: 'Security training should be mandatory for all employees, with new hire training and annual refresher sessions at a minimum. Regular training keeps employees updated on evolving threats and reinforces best practices.' },
              { q: 'Describe three methods for conducting routine operational security tests.', a: 'Operational security tests can include phishing simulations, tailgating exercises, and social engineering scenarios. These tests assess employee preparedness and identify vulnerabilities in security practices.' },
              { q: 'Explain the role of a "security champion" within an organization.', a: 'Security champions are individuals within teams who promote security awareness, address concerns, and help develop team members\' security skills. They act as liaisons between security teams and employees.' },
            ],
          },
        ],
      },
      {
        id: 'd1t12-2',
        title: '1.12.2 Periodic content reviews to include emerging technologies and trends (e.g., cryptocurrency, artificial intelligence (AI), blockchain)',
        content: [
          {
            body: 'Given the complexity of threats, effective training must be both pertinent and engaging. This necessitates regular updates to training materials and the methods used for testing and evaluation. Simply repeating the same phishing test campaign or utilizing identical approaches for security assessments lacks effectiveness. This principle extends to other training materials as well. Rather than solely relying on extensive security documentation, consider leveraging internal social media platforms, videos, and interactive campaigns to enhance training and awareness efforts.',
          },
          {
            heading: 'Security Champions & Gamification',
            table: {
              headers: ['Concept', 'Role & Benefits'],
              rows: [
                ['Security Champions', 'Act as internal advocates: translate security into team-specific actions, spot early risks, and extend security culture without scaling the central team. They improve awareness and prevention across development and operational teams.'],
                ['Gamification', 'Turns passive training into engaging, hands-on experiences with rewards and feedback—leading to higher participation, better knowledge retention, and measurable behavior change in areas like phishing detection and policy compliance.'],
              ],
            },
          },
          {
            questions: [
              { q: 'Why is it crucial to regularly update training materials and methods for cybersecurity training?', a: 'Regular updates are crucial to keep up with the ever-evolving threat landscape. Outdated materials and methods become irrelevant and fail to address new and emerging threats.' },
              { q: 'What are the limitations of using repetitive phishing tests and identical security assessments?', a: 'Repetitive tests and assessments become predictable, leading to complacency and reduced learning. Attackers constantly change their tactics, making such approaches ineffective in preparing employees for real-world scenarios.' },
              { q: 'Besides traditional security documentation, what alternative methods can be employed for effective training and awareness?', a: 'Alternative methods include leveraging internal social media platforms, creating engaging videos, and designing interactive campaigns. These formats can be more appealing and effective in conveying information compared to traditional documentation.' },
              { q: 'How can internal social media platforms contribute to enhancing cybersecurity awareness?', a: 'Internal social media platforms can be used to share security tips, news, and updates in a concise and easily digestible format. They also encourage employee engagement and facilitate discussions around cybersecurity topics.' },
              { q: 'Explain the concept of "pertinent" training in the context of cybersecurity.', a: 'Pertinent training means the content is directly relevant to the specific roles, responsibilities, and potential threats employees face within the organization.' },
              { q: 'Why is "engaging" training important for cybersecurity awareness?', a: 'Engaging training captures and maintains employee interest, promoting active learning and knowledge retention. This is crucial for cultivating a strong security culture within the organization.' },
              { q: 'What are the potential consequences of failing to keep cybersecurity training relevant and engaging?', a: 'Failure to keep training relevant and engaging can lead to decreased awareness, increased vulnerability to attacks, and potential data breaches or other security incidents.' },
              { q: 'How can organizations assess the effectiveness of their cybersecurity training programs?', a: 'Organizations can assess training effectiveness through metrics like employee performance on simulated phishing tests, surveys to gauge knowledge retention, and analysis of security incident reports.' },
              { q: 'What is the role of employee feedback in improving cybersecurity training?', a: 'Employee feedback helps identify areas where the training can be improved in terms of content, delivery, and relevance. It ensures the training program continuously evolves to meet the needs of the workforce.' },
            ],
          },
        ],
      },
      {
        id: 'd1t12-3',
        title: '1.12.3 Program effectiveness evaluation',
        content: [
          {
            body: 'Allocating resources, including both time and finances, is essential for assessing the effectiveness of the company\'s security awareness and training initiatives. Key performance indicators, such as the percentage of employees clicking on simulated phishing campaign links, should be diligently monitored. It\'s crucial to analyze whether the awareness and training efforts are successfully reducing these clicks over time. If not, a reassessment of the strategies may be warranted.',
          },
        ],
      },
      // ── 1.13 ─────────────────────────────────────────────────────────────
      {
        id: 'd1t13-1',
        title: '1.13.1 Integrating AI into Risk Management Frameworks',
        content: [
          {
            body: 'Security leadership has shifted from protecting static data to securing dynamic learning systems. We must recognize that AI assets are not merely "new software"—they are fundamental shifts in the organizational risk posture. Unlike traditional code, AI is non-deterministic; its outputs can change over time through a phenomenon known as model drift, and its vulnerabilities are often found in its logic rather than just its syntax.',
          },
          {
            body: 'To lead effectively, we must integrate Machine Learning (ML) models and Large Language Models (LLMs) into our existing Enterprise Risk Management (ERM) frameworks.',
          },
          {
            body: 'AI must be treated as a "first-class citizen" within risk management frameworks. This integration involves three core actions:\n\n- Asset Discovery and Inventory: You cannot protect what you don\'t know exists. Organizations must catalog "Shadow AI"—unauthorized LLM usage by employees—and formalize the inventory of training datasets, model weights, and APIs.\n\n- Risk Assessment of Non-Deterministic Outputs: Traditional risk assessments look for "pass/fail" vulnerabilities. AI risk assessment must evaluate the probability of "hallucinations" or "adversarial prompts" that could lead to data exfiltration.\n\n- Regulatory Alignment: AI governance must ensure that automated decisions comply with global mandates like the GDPR (Right to Explanation) and the EU AI Act.',
          },
        ],
      },
      {
        id: 'd1t13-2',
        title: '1.13.2 Establishing Ethics and Mitigating Algorithmic Bias',
        content: [
          {
            body: 'When an organization utilizes AI for automated decision-making—such as hiring, credit scoring, or security orchestration—we must ensure the process is both ethical and defensible.\n\n- Algorithmic Bias: Bias often enters the system through the training data (garbage in, garbage out). If the training set is not representative, the model\'s decisions will be skewed. We should consider implementing Bias Auditing as a standard part of the security assessment.\n\n- Transparency and Explainability (XAI): Security leadership requires the ability to explain why a model made a specific decision. Black-box AI is a liability; transparent AI is an asset.\n\n- Human-in-the-Loop (HITL): For high-stakes decisions, the framework must mandate a human review to mitigate the risk of automated errors.',
            tip: 'The C-Suite wants to use AI to move faster; our job is to ensure they don\'t drive off a cliff because the "autopilot" was biased or insecure.',
          },
        ],
      },
      {
        id: 'd1t13-3',
        title: '1.13.3 Privacy and Legal Compliance',
        content: [
          {
            body: 'The intersection between AI and privacy is of particular interest, we must ensure that:\n\n- Data Minimization: AI models don\'t ingest more PII than necessary.\n\n- Differential Privacy: Noise is added to datasets so that the model learns patterns without "memorizing" individual identities.\n\n- Intellectual Property Rights: The organization must clear the rights for all data used in training to avoid legal repercussions regarding copyright and ownership.',
          },
        ],
      },
      {
        id: 'd1t13-4',
        title: '1.13.4 Evaluating the AI Supply Chain',
        content: [
          {
            body: 'Most organizations integrate AI by leveraging third-party Large Language Model (LLM) providers, specialized SaaS AI tools, or open-source frameworks. This reliance creates a complex AI Supply Chain.',
            tip: 'Evaluating an AI service provider requires a multi-layered approach that examines the technical, legal, and operational resilience of the partner.',
          },
          {
            heading: 'Data Sourcing and Transparency',
            body: 'The "fuel" of any AI model is the data it was trained on. A lack of transparency in data sourcing is a major strategic risk.\n\n- Data Provenance: Where did the training data come from? Was it obtained legally and ethically?\n- Poisoning Risks: If a provider\'s training pipeline is insecure, an adversary could "poison" the data, leading to backdoors in the model that are nearly impossible to detect through traditional scanning.\n- Copyright and IP: the provider must offer indemnification (a contractual "promise to pay") against intellectual property claims arising from the model\'s training set.',
          },
          {
            heading: 'Resilience of Provider-Managed Models',
            body: "Unlike a standard web server, an AI model's \"uptime\" isn't the most important measure of resilience. You must assess the model's defense against evolving AI-specific threats:\n\n- Model Evasion: Can the provider demonstrate that their model is hardened against adversarial inputs designed to bypass safety filters?\n\n- Inversion and Extraction: What controls are in place to prevent an attacker from querying the API to \"reverse engineer\" the training data or the proprietary model weights?",
          },
          {
            heading: 'Mitigating Strategic Blind Spots',
            body: 'To prevent AI adoption from creating unmanaged risks, we must integrate AI-specific clauses into the Third-Party Risk Management (TPRM) lifecycle:',
            table: {
              headers: ['Control Area', 'Requirement for AI Providers'],
              rows: [
                ['Right to Audit', 'The ability to review model performance logs and bias audit reports.'],
                ['Data Usage Rights', 'Explicit agreement that the provider will not use your corporate prompts or data to train their "base" models (Opt-out of learning).'],
                ['Model Versioning', 'Ensuring the provider cannot push a "live" update to the model logic without prior notification and testing by your team.'],
                ['Exit Strategy', 'How easily can you migrate your fine-tuned data or "embeddings" if the provider goes out of business or suffers a catastrophic breach?'],
              ],
            },
          },
          {
            heading: "The CISSP's \"Due Diligence\" Checklist",
            body: 'Due diligence when adopting a new AI tool should include:\n\n- Is there an AI Bill of Materials (AI-BOM)? Just as we use a Software BOM to track libraries, an AI-BOM should list the base model, the datasets, and the fine-tuning layers.\n\n- Where is the "Inference" happening? Is your data staying within a secured enclave, or is it being sent to a third-party cloud where you lose visibility?\n\n- What is the "SLA for Logic"? If the model starts producing "hallucinations" or biased results that damage your brand, what is the provider\'s responsibility for remediation?',
          },
          {
            questions: [
              { q: 'Why is AI considered "non-deterministic" compared to traditional software code?', a: 'Unlike traditional code that follows fixed logic (if-then), AI outputs can change over time due to new data or "model drift," meaning the same input may not always produce the same result.' },
              { q: 'What is "Shadow AI," and why is it a risk for organizations?', a: 'Shadow AI refers to the unauthorized use of LLMs or AI tools by employees without IT approval. It is a risk because sensitive corporate data could be leaked into public models that the organization does not control.' },
              { q: 'In the context of AI risk assessment, what is a "hallucination"?', a: 'A hallucination is when an AI model generates confident but false or logically incorrect information, which can lead to poor decision-making or security vulnerabilities.' },
              { q: 'What is the primary purpose of "Differential Privacy" in AI training?', a: 'It involves adding mathematical "noise" to datasets so the model can learn general patterns without "memorizing" or exposing the specific identities of individuals within the data.' },
              { q: 'How does "Algorithmic Bias" usually enter an AI system?', a: 'It usually enters through the training data ("garbage in, garbage out"). If the training data is not representative or contains historical prejudices, the model will produce skewed or unfair results.' },
              { q: 'Explain the concept of "Human-in-the-Loop" (HITL).', a: 'HITL is a governance requirement where a human must review and approve high-stakes AI decisions to prevent automated errors or biased outcomes.' },
              { q: 'What is "Data Provenance" and why is it important for AI security?', a: 'Data provenance is the record of where training data originated and how it was handled. It is vital to ensure the data was obtained legally and hasn\'t been "poisoned" by malicious actors.' },
              { q: 'What is the difference between "Model Evasion" and "Model Extraction"?', a: 'Evasion is an attack where an adversary uses "adversarial prompts" to bypass safety filters. Extraction is an attempt to "reverse engineer" the model\'s weights or training data through repeated queries.' },
              { q: 'What is an "AI Bill of Materials" (AI-BOM)?', a: 'Similar to a Software BOM, an AI-BOM is a list that catalogs the base model, datasets, and fine-tuning layers used in an AI system to ensure transparency and supply chain security.' },
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