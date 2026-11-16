// Procurement EBR. Sources: Procurement MBR 21 Sep 2026 (SLAs Aug '26), Ops EBR draft 2 (12 Nov 2026),
// Procurement RPA weekly governance (5 Nov 2026), Procurement control tower / ContractOps AI pilot proposal.
const M = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
const CONFIG = {
  key: 'procurement',
  domain: 'Procurement',
  period: 'H1 FY27',
  accent: '#009FE3',
  accent2: '#FF6F4D',
  source: 'Procurement MBR 21 Sep 2026 · Ops EBR draft 2 · RPA governance 5 Nov 2026',
  tabs: [
    {
      id: 'since', label: 'Since last EBR', title: 'Since the May 2026 EBR',
      blocks: [
        {
          type: 'hero', items: [
            { value: '4 of 6', label: 'May commitments delivered', sub: 'Apple ack · Mobile POs · R1 services · e-invoicing', tone: 'good', detail: { rows: [['Delivered', 'Apple acknowledgement, Release 31 for Mobile POs, R1 services (CMAC), OCR e-invoicing'], ['To confirm', 'IT PR upfront approval, UiPath platform migration']] } },
            { value: '91%', label: 'PR Create by bot', sub: 'May EBR: 88%', tone: 'good' },
            { value: '22 Aug', label: 'E-invoicing went live', sub: 'May EBR: blueprint sign-off' },
            { value: '−48%', label: 'PO acknowledgement time', sub: '4 days to 2 days', tone: 'good' },
          ],
        },
        {
          type: 'journey', span: 12, rows: 4, title: 'Where we were, where we are · click a row', thenLabel: 'Last EBR · May 2026', nowLabel: 'Now · H1 FY27',
          items: [
            { icon: 'Bot', label: 'PR Create by bot', then: '88% (Mar 2026)', now: '91%', status: 'live' },
            { icon: 'Send', label: 'PO Release automation', then: 'R31 + R37 added', now: '>95%', status: 'live', detail: { text: 'Now includes Mobile POs (Release 31 extension delivered).' } },
            { icon: 'MailCheck', label: 'PO acknowledgement', then: 'Non-ack POs −36%', now: '4 → 2 days', status: 'live', detail: { text: 'Apple acknowledgements now captured automatically; vendor compliance education by buyers.' } },
            { icon: 'UserPlus', label: 'Supplier onboarding', then: '2.9 days', now: '2.67 days', status: 'live' },
            { icon: 'FileCheck2', label: 'OCR e-invoicing', then: 'Blueprint sign-off', now: 'Live', status: 'live', detail: { text: 'Live 22 Aug 2026: CMAC (5 vendors), Amdocs, 9 ICT vendors across T001 and T080. Open item: CMAC invoice duplication to APS.' } },
            { icon: 'Layers', label: 'R1 services (CMAC, intercompany)', then: 'In analysis', now: 'In production', status: 'live' },
            { icon: 'ClipboardCheck', label: 'IT PR upfront approval', then: 'FY27 pipeline', now: 'To confirm', tone: 'muted', status: 'confirm' },
          ],
        },
      ],
    },
    {
      id: 'performance', label: 'Performance', title: 'Purchasing performance, April to September 2026',
      blocks: [
        {
          type: 'hero', items: [
            { value: '29,886', label: 'POs created', sub: 'Avg PR to PO: 0.14 days', detail: { text: 'Monthly POs: Apr 3,915 · May 5,535 · Jun 5,262 · Jul 5,057 · Aug 4,819 · Sep 5,298. September mix: Auto 2,852, Bot 1,891, Manual 555.' } },
            { value: '91%', label: 'PR Create by bot', sub: 'FY26: 58%', tone: 'good', detail: { text: 'Sustained end-user engagement and continuously added scope. Source: Ops EBR draft 2, FY26 vs FY27.' } },
            { value: '89%', label: 'September POs touchless', sub: 'Auto + bot', detail: { text: '4,743 of 5,298 September POs created automatically or by bot.' } },
            { value: 'R10.1m', label: 'Auction value', sub: '41 reverse · 8 forward', detail: { rows: [['Reverse auctions', '41 events · R5.9m'], ['Forward auctions', '8 events · R4.2m']] } },
          ],
        },
        {
          type: 'chart', kind: 'line', span: 7, title: 'PR release to PO release', note: 'Business hours, by channel', suffix: 'h', labels: M,
          datasets: [
            { label: 'Auto', data: [3, 2, 5, 1, 0, 1], color: 'accent' },
            { label: 'Bot', data: [29, 14, 16, 19, 33, 8], color: 'accent2' },
            { label: 'Manual', data: [20, 13, 23, 42, 74, 13], color: '#E07B00' },
            { label: 'RFQ', data: [36, 45, 45, 38, 48, 44], color: '#9AA4B0' },
          ],
        },
        {
          type: 'shift', span: 5, title: 'What moved',
          items: [
            { label: 'PR Create by bot', from: '58%', to: '91%' },
            { label: 'Supplier onboarding (days)', from: '3.54', to: '2.67' },
            { label: 'Vendors without VAT number', from: '44', to: '8' },
          ],
        },
      ],
    },
    {
      id: 'sla', label: 'Service levels', title: 'Service levels, August 2026',
      blocks: [
        {
          type: 'tiles', span: 8, rows: 2, cols: 4, title: 'Every SLA at a glance', note: 'WNS performance · click for detail',
          items: [
            { label: 'PR to PO conversion', value: '100%', detail: { rows: [['Volume', '4,818'], ['End-to-end', '97%'], ['Standard', '99%']] } },
            { label: 'PO amendments', value: '100%', detail: { rows: [['Volume', '920'], ['End-to-end', '97%']] } },
            { label: 'PO acknowledgements', value: '100%', detail: { rows: [['Volume', '1,499']] } },
            { label: 'Open order management', value: '1%', tone: 'red', detail: { text: 'Standard 95%. Focus: reduce overdue POs from 30 to 15 days.' } },
            { label: 'Spot buy: PR to quote', value: '100%', detail: { rows: [['Volume', '329'], ['End-to-end', '85%']] } },
            { label: 'Spot buy: quote to PO', value: '100%' },
            { label: 'Supplier onboarding', value: '100%', detail: { rows: [['Transactional', '30 · end-to-end 90%'], ['Prospective', '9 · end-to-end 66%']] } },
            { label: 'First inquiry resolution', value: '100%' },
            { label: 'Material and service masters', value: '100%', detail: { rows: [['Volume', '182']] } },
            { label: 'Contracts', value: '100%', detail: { rows: [['Volume', '258']] } },
            { label: 'B-BBEE maintenance', value: '100%' },
            { label: 'P-Card compliance', value: '100%' },
            { label: 'P-Card reporting', value: '100%' },
            { label: 'Sourcing events support', value: '100%' },
            { label: 'Knowledge and training', value: '100%' },
            { label: 'Recurring reports', value: '100%' },
          ],
        },
        {
          type: 'rings', span: 4, title: 'Headline', items: [
            { pct: 93, value: '13/14', label: 'Measured SLAs met', sub: 'Exception: open orders' },
            { pct: 97, value: '97%', label: 'PR to PO end-to-end', color: 'accent2' },
          ],
        },
        {
          type: 'shift', span: 4, title: 'Targets in motion',
          items: [{ label: 'Overdue PO target (days)', from: '30', to: '15' }, { label: 'Spot buy, WNS days (Aug to Sep)', from: '1.85', to: '1.5' }],
        },
      ],
    },
    {
      id: 'rpa', label: 'Automation', title: 'Four bots run the purchase-to-order chain',
      blocks: [
        {
          type: 'flow', span: 12, rows: 3, title: 'PR to PO acknowledgement · click a stage',
          items: [
            { name: 'PR Create', pct: 88, value: '>88%', status: 'live', detail: { text: 'Requisition creation from NEDLMP with SAP eligibility checks.', rows: [['Open item', 'Deleted material/service codes in NEDLMP cause fallouts; code change tested in ZP2, CR logged.']] } },
            { name: 'PR to PO', pct: 90, value: '~90%', status: 'live', color: 'accent2', detail: { rows: [['Open item', 'Target value exceed errors; CMAC closed-PO commitments being reconciled.'], ['Change', 'Discount and international POs moved to manual on 26 Sep.']] } },
            { name: 'PO Release', pct: 95, value: '>95%', status: 'live', detail: { text: 'Release strategies 31 and 37, incl. Mobile POs. Release time per PO 2–4 minutes.', rows: [['Watch', 'Manual releases rose from 13 to 27 hours in October (mainly international).']] } },
            { name: 'PO Ack', pct: 90, value: '>90%', status: 'live', color: 'accent2', detail: { text: 'Supplier acknowledgement capture and reminders, incl. Apple. No open issues.' } },
          ],
        },
        {
          type: 'cards', span: 12, cols: 6, rows: 2, title: 'Delivered and in build',
          items: [
            { icon: 'FileCheck2', name: 'OCR e-invoicing', line: 'Live 22 Aug · CMAC, Amdocs, 9 ICT vendors', status: 'live' },
            { icon: 'Layers', name: 'R1 services (CMAC)', line: 'In production · 7 items added', status: 'live' },
            { icon: 'Apple', name: 'Apple acknowledgement', line: 'In production', status: 'live' },
            { icon: 'Trash2', name: 'Deletion letter review', line: 'Good progress', status: 'progress' },
            { icon: 'CreditCard', name: 'Virtual Pay', line: 'AS-IS / TO-BE done', status: 'progress' },
            { icon: 'Archive', name: 'e-Sourcing archive', line: 'RPA extracts to OpenText', status: 'progress' },
          ],
        },
      ],
    },
    {
      id: 'ai', label: 'AI opportunities', title: 'From bots that execute to agents that assist',
      blocks: [
        {
          type: 'stairs', span: 5, rows: 3, title: 'Procurement automation maturity', current: 1, target: 3, targetLabel: '6–12 months',
          levels: ['Manual', 'Rules-based RPA', 'Connected visibility', 'Agent-assisted', 'Autonomous'],
          footnote: 'Next: connect PR, PO, release and acknowledgement events into one timeline.',
        },
        {
          type: 'stepper', span: 7, rows: 3, title: 'Flagship pilot · ContractOps AI', note: '90-day pilot proposal · not live',
          steps: [
            { name: 'Contract', icon: 'FileText', title: 'Read the signed agreement', points: ['Ariba workspace', 'Terms and amendments', 'Rates and escalation'] },
            { name: 'Analyse', icon: 'ScanSearch', title: 'Check terms against SAP rules', points: ['Line-item reconciliation', 'Material vs service', 'Payment conditions'] },
            { name: 'Gaps', icon: 'AlertTriangle', title: 'Surface exceptions with owners', points: ['Missing approvals', 'Agreement mapping', 'PO line differences'] },
            { name: 'Evidence', icon: 'Upload', title: 'Resolve with evidence', points: ['Upload checklist', 'Reviewer decision', 'Audit trail'] },
            { name: 'Re-check', icon: 'RefreshCw', title: 'Re-validate what changed', points: ['Versioned evidence', 'Closed vs open exceptions'] },
            { name: 'SAP ready', icon: 'ShieldCheck', title: 'Hand over an SAP-ready pack', points: ['Line-item mapping', 'Human sign-off', 'No autonomous posting'] },
          ],
        },
        {
          type: 'cards', span: 12, cols: 5, rows: 2, agent: true, title: 'Agent opportunities · click for detail',
          items: [
            { icon: 'Radar', name: 'Exception triage', line: 'Finds why a PR or PO stopped', status: 'proposed', detail: { rows: [['Input', 'Bot logs, SAP status, NEDLMP queue'], ['Output', 'Classified exception with suggested fix and owner'], ['Measure', 'Touches avoided, turnaround']] } },
            { icon: 'ShieldAlert', name: 'Supplier risk', line: 'Early warning on suppliers', status: 'proposed', detail: { rows: [['Input', 'Acknowledgement history, delivery, compliance'], ['Output', 'Risk-ranked suppliers with evidence']] } },
            { icon: 'PieChart', name: 'Spend intelligence', line: 'Category and spot-buy insight', status: 'proposed', detail: { rows: [['Input', 'PO and contract data'], ['Output', 'Contract opportunities, e.g. reducing spot buy']] } },
            { icon: 'Timer', name: 'Lead-time prediction', line: 'Fewer emergency POs', status: 'proposed', detail: { rows: [['Input', 'Historic lead times by supplier and category'], ['Output', 'Predicted delays before they happen']] } },
            { icon: 'Gauge', name: 'Control tower', line: 'One live view, PR to payment', status: 'proposed', detail: { text: 'End-to-end P2P reporting as the data foundation for every agent above.' } },
          ],
        },
      ],
    },
    {
      id: 'next', label: 'Way forward', title: 'Three waves to intelligent procurement',
      blocks: [
        {
          type: 'waves', span: 8, rows: 2, title: 'Roadmap',
          items: [
            { when: 'Now', name: 'Deliver and control', items: ['Deletion letter adoption', 'Virtual Pay solution', 'Restore discount and international POs to bot', 'NEDLMP master data clean-up'] },
            { when: 'Next', name: 'Expand and prevent', items: ['Deletion rules engine', 'Document completeness checks', 'Discount PO and zero-value automation', 'E-invoicing cost-centre bot'] },
            { when: 'Future', name: 'Intelligent procurement', items: ['P2P control tower', 'Exception triage agent', 'Supplier and spend intelligence', 'ContractOps AI pilot'] },
          ],
        },
        {
          type: 'asks', span: 4, rows: 2, title: 'Decisions requested from Telkom',
          items: ['Sponsor the ContractOps AI 90-day pilot', 'Owner and date for NEDLMP master data clean-up', 'Approve discount PO and zero-value automation scope'],
        },
      ],
    },
  ],
}
export default CONFIG
