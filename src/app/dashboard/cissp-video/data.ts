export interface VideoChapter {
  time: string
  seconds: number
  title: string
  covered: string
}

export const VIDEO_ID = '_nyZhYnCNLA'

export const chapters: VideoChapter[] = [
  { time: '0:00–0:15', seconds: 0, title: 'Introduction', covered: 'Course goals, exam prep philosophy, pacing tips, CAT exam format basics' },
  { time: '0:15–0:30', seconds: 900, title: 'CAT Exam Format & Changes', covered: "CAT exam changes (June update), recommended study materials, intro to 'think like a manager,' due diligence vs. due care" },
  { time: '0:30–0:45', seconds: 1800, title: 'Exam Prep Strategy', covered: 'Due diligence/do care examples, security planning horizons, learning techniques intro (spaced repetition)' },
  { time: '0:45–1:00', seconds: 2700, title: 'How to "Think Like a Manager" / Domain 1 begins', covered: 'Mnemonics, chunking technique, 80/20 study strategy, using practice exams, CIA triad' },
  { time: '1:00–1:15', seconds: 3600, title: 'Domain 1: Security and Risk Management', covered: 'Code of ethics, security policy levels, risk categories/factors, security planning types' },
  { time: '1:15–1:30', seconds: 4500, title: 'Domain 1 (cont.)', covered: 'Risk response options (accept/mitigate/transfer/avoid/deter/reject), NIST 800-37 risk framework steps' },
  { time: '1:30–1:45', seconds: 5400, title: 'Domain 1 (cont.)', covered: 'Types of risk (residual/inherent/total), risk formulas intro, quantitative vs. qualitative risk analysis' },
  { time: '1:45–2:00', seconds: 6300, title: 'Domain 1 (cont.)', covered: 'Quantitative risk analysis steps, EF/SLE/ARO/ALE formulas with examples' },
  { time: '2:00–2:15', seconds: 7200, title: 'Domain 1 (cont.)', covered: 'Safeguard evaluation formula, supply chain risk, threat modeling (STRIDE, PASTA, VAST, DREAD, TRIKE)' },
  { time: '2:15–2:30', seconds: 8100, title: 'Legal and Regulatory Aspects', covered: 'COBIT, attack diagramming, reduction analysis, security control types, types of law' },
  { time: '2:30–2:45', seconds: 9000, title: 'Legal and Regulatory Aspects (cont.)', covered: 'Key U.S. cyber laws (CFAA, FISMA, DMCA), IP/licensing, export controls, GDPR intro' },
  { time: '2:45–3:00', seconds: 9900, title: 'U.S. Privacy Laws / Domain 2 begins', covered: 'HIPAA, HITECH, GLBA, COPPA, ECPA; BCP basics; breach consequences; data lifecycle' },
  { time: '3:00–3:15', seconds: 10800, title: 'Domain 2: Asset Security', covered: 'Data classification, data destruction methods, PII/PHI, data ownership roles, GDPR terms (anonymization/pseudonymization)' },
  { time: '3:15–3:30', seconds: 11700, title: 'Domain 3: Security Architecture and Engineering', covered: 'Secure design principles, zero trust, secure defaults, privacy by design' },
  { time: '3:30–3:45', seconds: 12600, title: 'Domain 3 (cont.)', covered: 'IoT, SIEM/SOAR, microservices, containers, APIs, embedded systems, HPC/edge/fog computing' },
  { time: '3:45–4:00', seconds: 13500, title: 'Domain 3 (cont.)', covered: 'Cloud computing (IaaS/PaaS/SaaS), shared responsibility model, cloud deployment models, CASB, post-quantum crypto' },
  { time: '4:00–4:15', seconds: 14400, title: 'Domain 3 – Cryptography', covered: 'Codes vs. ciphers, stream/block ciphers, one-time pad, symmetric vs. asymmetric' },
  { time: '4:15–4:30', seconds: 15300, title: 'Symmetric vs. Asymmetric Cryptography', covered: 'DES modes, XOR, key clustering, asymmetric crypto example, hash functions, salts, PKI' },
  { time: '4:30–4:45', seconds: 16200, title: 'Security Models', covered: 'Biba, Bell-LaPadula, Clark-Wilson, Brewer-Nash, TCB, evaluation criteria (Common Criteria)' },
  { time: '4:45–5:00', seconds: 17100, title: 'Physical Security Controls Overview / Domain 4 begins', covered: 'Access control types (MAC/DAC), physical security controls, fire suppression, locks, site selection' },
  { time: '5:00–5:15', seconds: 18000, title: 'Domain 4: Communication and Network Security', covered: 'Network segmentation (VXLAN, SDN, SD-WAN), Li-Fi, Zigbee, 5G, CDNs, OSI model intro' },
  { time: '5:15–5:30', seconds: 18900, title: 'OSI Model Overview', covered: 'OSI model details, TCP vs. UDP, network topologies, wireless standards (WEP/WPA/WPA2)' },
  { time: '5:30–5:45', seconds: 19800, title: 'Types of Firewalls (lead-in)', covered: 'Antenna types, network devices (switches/routers/gateways), WAN types, firewall types' },
  { time: '5:45–6:00', seconds: 20700, title: 'Intrusion Detection and Prevention / Domain 5 begins', covered: 'Modern firewalls (WAF/NGFW/UTM), IDS/IPS, honeypots, common network attacks, AAA protocols' },
  { time: '6:00–6:15', seconds: 21600, title: 'Domain 5: Identity and Access Management', covered: 'Kerberos, authentication factors, MFA, biometrics (crossover error rate)' },
  { time: '6:15–6:30', seconds: 22500, title: 'Multi-Factor Authentication (MFA) and Biometrics / Access Control Models', covered: 'SSO standards (SAML/OAuth/OpenID), access control models, security control categories' },
  { time: '6:30–6:45', seconds: 23400, title: 'Domain 6: Security Assessment and Testing', covered: 'Risk elements, access control attacks, phishing variants, vulnerability assessments vs. pen tests' },
  { time: '6:45–7:00', seconds: 24300, title: 'Domain 6 (cont.) / Domain 7 begins', covered: 'Software testing types, security management oversight, internal/external audits' },
  { time: '7:00–7:15', seconds: 25200, title: 'Domain 7: Security Operations', covered: 'New Domain 7 tech (WAF/NGFW/UEBA/AI), least privilege, information lifecycle, configuration/change management' },
  { time: '7:15–7:30', seconds: 26100, title: 'Denial of Service Attacks (lead-in)', covered: 'Patch/vulnerability management, incident response (7-step process), DoS attacks, botnets, honeypots' },
  { time: '7:30–7:45', seconds: 27000, title: 'E-Discovery, Forensics, and Digital Evidence Preservation / Recovery Sites', covered: 'Evidence/forensics, e-discovery, chain of custody, disaster recovery sites (hot/warm/cold), RPO/RTO' },
  { time: '7:45–8:00', seconds: 27900, title: 'Disaster Recovery Plan Tests / Domain 8', covered: 'BCP steps, DR test types, SDLC, DevSecOps, code repos, RDBMS, software dev models, testing, wrap-up' },
]
