// Procurement EBR content. Sources: Ops deck "EBR_Procurement_Nov26_MdP-Draft2" (12 Nov 2026) for H1 FY27;
// FY26 automation baseline from the previous Procurement EBR site (procebr).
const CONFIG = {
  key: 'procurement',
  domain: 'Procurement',
  title: 'Procurement Executive Business Review',
  period: 'H1 FY27',
  accent: '#0284c7',
  source: 'Sources: Ops EBR deck draft 2 (Nov 2026) · FY26 automation baseline',
  tabs: [
    {
      id: 'highlights',
      label: 'Highlights',
      title: 'H1 FY27 highlights',
      sub: 'FY26 vs FY27 performance',
      blocks: [
        {
          type: 'kpis',
          items: [
            { value: '91%', label: 'PR Create by bot (in scope)', note: 'Up from 58% in FY26', trend: 'up' },
            { value: '88%', label: 'PO Create by bot', note: 'Up from 84% in FY26', trend: 'up' },
            { value: '−25%', label: 'Spot buy turnaround (PR to PO)', note: 'Hours from PR to PO', trend: 'down' },
            { value: '−48%', label: 'PO acknowledgement turnaround', note: 'From 4 days to 2 days', trend: 'down' },
          ],
        },
        {
          type: 'chart', kind: 'bar', span: 4, title: 'PR Create by bot', note: '% of in-scope PRs', suffix: '%', max: 100,
          labels: ['FY26', 'FY27 H1'], datasets: [{ label: 'PR Create', data: [58, 91], colors: ['#94a3b8', 'var(--accent)'] }],
          footnote: 'Driven by end-user adoption and added scope.',
        },
        {
          type: 'chart', kind: 'bar', span: 4, title: 'PO Create by bot', note: '% of POs', suffix: '%', min: 70, max: 100,
          labels: ['FY26', 'FY27 H1'], datasets: [{ label: 'PO Create', data: [84, 88], colors: ['#94a3b8', 'var(--accent)'] }],
          footnote: 'Scope added for RI PR lines (CMAC, intercompany) and Mobile POs.',
        },
        {
          type: 'chart', kind: 'bar', span: 4, title: 'Spot buy turnaround, PR to PO', note: 'Hours', suffix: 'h',
          labels: ['FY26', 'FY27 H1'], datasets: [{ label: 'Turnaround', data: [90.9, 67.5], colors: ['#94a3b8', 'var(--accent)'] }],
          footnote: 'Process optimisation and cost-centre owner follow-up.',
        },
        {
          type: 'list', span: 6, title: 'What changed',
          items: [
            { title: 'Sustained end-user engagement', text: 'Higher adoption increased PR volumes created by the bot.' },
            { title: 'Scope added', text: 'RI PR lines for CMAC and intercompany; Mobile PO type included.' },
            { title: 'Vendor compliance', text: 'Buyer-led vendor education and Apple POs included in acknowledgement automation.' },
          ],
        },
        {
          type: 'list', span: 6, title: 'Operational insight',
          items: [
            { title: 'SLA dashboard', text: 'Tracks turnaround and volumes to drive outcome-based results.', status: 'live' },
            { title: 'E-invoicing', text: 'Procurement team supported the e-invoicing implementation.', status: 'implemented' },
          ],
        },
      ],
    },
    {
      id: 'rpa',
      label: 'Transformation and RPA',
      title: 'Transformation and RPA',
      sub: 'Bots in production and automation coverage',
      blocks: [
        {
          type: 'kpis',
          items: [
            { value: '5+', label: 'Procurement automations live' },
            { value: '80%', label: 'Overall automation coverage', note: 'FY26 year-end' },
            { value: '5 FTE', label: 'Redeployed to value roles' },
            { value: '75→91%', label: 'Vendor NPS', trend: 'up' },
          ],
        },
        {
          type: 'chart', kind: 'line', span: 5, title: 'PR Create by bot, monthly', note: 'Jan 2025 to Mar 2026 · target 80%', suffix: '%', max: 100,
          labels: ["Jan'25", 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', "Jan'26", 'Feb', 'Mar'],
          datasets: [
            { label: 'Achieved', data: [7, 8, 13, 19, 14, 14, 21, 55, 61, 80, 82, 82, 86, 86, 88] },
            { label: 'Target', data: Array(15).fill(80), color: '#d97706', dashed: true },
          ],
          footnote: 'H1 FY27 reached 91%.',
        },
        {
          type: 'chart', kind: 'bar', span: 3, horizontal: true, title: 'Automation coverage by step', note: 'FY26 year-end', suffix: '%', max: 100,
          labels: ['PR Create', 'PO Create', 'PO Release 31', 'PO Release 37', 'PO Ack'],
          datasets: [{ label: 'Coverage', data: [60, 80, 78, 100, 98] }],
        },
        {
          type: 'list', span: 4, title: 'Bots in production',
          items: [
            { title: 'PR Create bot', text: 'Scope analysed and expanded continuously.', metric: '91%', status: 'live' },
            { title: 'PO Create bot', text: 'RI PR lines (CMAC, intercompany) and Mobile POs added.', metric: '88%', status: 'live' },
            { title: 'PO Release bot', text: 'Release strategies 31 and 37 in scope.', metric: 'R31 + R37', status: 'live' },
            { title: 'PO Acknowledgement bot', text: 'Reminder mails and Apple POs included.', metric: '−48% TAT', status: 'live' },
            { title: 'SAP auto-create (ROMC)', text: 'Bot and SAP auto-create working together.', status: 'live' },
          ],
        },
      ],
    },
    {
      id: 'way-forward',
      label: 'Way forward',
      title: 'Way forward',
      sub: 'FY27 automation pipeline and priorities',
      blocks: [
        {
          type: 'list', span: 5, rows: 2, title: 'FY27 automation pipeline',
          items: [
            { title: 'IT PR upfront approval', text: 'Automate the upfront IT requisition approval step.', status: 'planned' },
            { title: 'Release 31 for Mobile POs', text: 'Extend Release 31 automation to Mobile PO scope.', status: 'progress' },
            { title: 'PO acknowledgement capture', text: 'Auto-capture and match Apple acknowledgements.', status: 'progress' },
            { title: 'UiPath platform migration', text: 'Community to Enterprise edition, with platform governance.', status: 'planned' },
            { title: 'E-invoicing and OCR', text: 'End-to-end source-to-pay invoice capture.', status: 'implemented' },
          ],
        },
        {
          type: 'cards', span: 7, cols: 3, title: 'FY27 priorities',
          items: [
            { title: 'Procurement analytics', text: 'Faster category and spend insight.' },
            { title: 'Exception management', text: 'Route exceptions automatically to the right owner.' },
            { title: 'Supplier health and risk', text: 'Monitoring with early alerts.' },
            { title: 'Lead-time prediction', text: 'Use history to reduce emergency POs.' },
            { title: 'Budget and policy check', text: 'Automated check before PR release.' },
            { title: 'SLA dashboard', text: 'Turnaround and volumes, by owner.', status: 'live' },
          ],
        },
        {
          type: 'asks', span: 7, title: 'Decisions requested from Telkom', note: 'Owners and dates to agree',
          items: [
            'Approve scope for IT PR upfront approval automation.',
            'Confirm the UiPath Enterprise migration and licence approach.',
            'Nominate business owners for the FY27 analytics priorities.',
          ],
        },
      ],
    },
  ],
}
export default CONFIG
