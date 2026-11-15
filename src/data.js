// Procurement EBR content.
// Sources: Procurement MBR 21 Sep 2026 (MBR Procurement Sep 2026.pptx; SLAs reported for Aug '26),
// Ops EBR deck draft 2 (12 Nov 2026), Procurement RPA weekly governance notes (5 Nov 2026).
// Telkom fiscal year: FY27 month 1 = Apr 2026.
const M = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
const CONFIG = {
  key: 'procurement',
  domain: 'Procurement',
  title: 'Procurement Executive Business Review',
  period: 'H1 FY27',
  accent: '#0284c7',
  source: 'Sources: Procurement MBR 21 Sep 2026 (SLAs Aug ’26) · Ops EBR draft 2 (12 Nov 2026) · RPA governance 5 Nov 2026',
  tabs: [
    {
      id: 'highlights',
      label: 'Highlights',
      title: 'H1 FY27 highlights',
      sub: 'April to September 2026',
      blocks: [
        {
          type: 'kpis',
          items: [
            { value: '29,886', label: 'POs created, Apr–Sep', note: 'Avg PR to PO 0.14 days' },
            { value: '91%', label: 'PR Create by bot (in scope)', note: 'Up from 58% in FY26', trend: 'up' },
            { value: '1.6 days', label: 'Spot buy, WNS turnaround', note: 'YTD · 1,476 POs · cost-centre approval 2.33 days' },
            { value: 'R10.1m', label: 'Auction value realised', note: '41 reverse (R5.9m) · 8 forward (R4.2m)' },
          ],
        },
        {
          type: 'chart', kind: 'bar', span: 4, title: 'POs created per month', note: 'Sep: Auto 2,852 · Bot 1,891 · Manual 555',
          labels: M, datasets: [{ label: 'POs', data: [3915, 5535, 5262, 5057, 4819, 5298] }],
          footnote: '89% of September POs created automatically or by bot.',
        },
        {
          type: 'chart', kind: 'line', span: 4, title: 'PR release to PO release', note: 'Business hours by channel', suffix: 'h',
          labels: M,
          datasets: [
            { label: 'Auto', data: [3, 2, 5, 1, 0, 1] },
            { label: 'Bot', data: [29, 14, 16, 19, 33, 8], color: '#0f766e' },
            { label: 'Manual', data: [20, 13, 23, 42, 74, 13], color: '#d97706' },
            { label: 'RFQ', data: [36, 45, 45, 38, 48, 44], color: '#94a3b8' },
          ],
          footnote: 'September recovered after the August peak.',
        },
        {
          type: 'chart', kind: 'bar', span: 4, title: 'Spot buy turnaround', note: 'Days', suffix: 'd',
          labels: M,
          datasets: [
            { label: 'Cost-centre approval', data: [1.89, 2.33, 2.29, 1.94, 2.41, 2.29], color: '#94a3b8' },
            { label: 'WNS', data: [1.35, 1.4, 1.35, 1.07, 1.85, 1.5], color: 'var(--accent)' },
          ],
          footnote: 'Spot buy volumes rose to 355 POs in September.',
        },
        {
          type: 'list', span: 6, title: 'Key call-outs',
          items: [
            { title: 'Spot buy reduced', text: 'Qalaboche contract in place.' },
            { title: 'Controls', text: 'Target value errors down; all GRC testing submitted.' },
            { title: 'SLA turnaround dashboards', text: 'Published, with SLA tables and turnaround graphs per period.', status: 'live' },
          ],
        },
        {
          type: 'list', span: 6, title: 'Supplier and master data',
          items: [
            { title: 'Supplier onboarding (transactional)', text: '155 YTD · average 3.45 days; September 2.67 days.', metric: '2.67 d' },
            { title: 'First inquiry resolution', text: '102 YTD · average 0.23 days.', metric: '0.23 d' },
            { title: 'Vendor VAT number project', text: 'Outstanding vendors cut from 44 (15 Sep) to 8 (29 Sep).', metric: '44 → 8' },
          ],
        },
      ],
    },
    {
      id: 'sla',
      label: 'Service levels',
      title: 'Service level performance',
      sub: 'Reported for August 2026',
      blocks: [
        {
          type: 'kpis',
          items: [
            { value: '13 of 14', label: 'Measured SLAs at 100% (WNS)', note: 'Exception: open order management' },
            { value: '4,818', label: 'PR to PO conversions', note: 'WNS 100% · end-to-end 97%' },
            { value: '1,499', label: 'PO acknowledgements', note: '100% within standard' },
            { value: '1%', label: 'Open order management', note: 'Standard 95% · action plan in place', trend: 'down', good: false },
          ],
        },
        {
          type: 'table', span: 12, rows: 2, title: 'SLA detail', note: 'WNS = within WNS control · Actual = end-to-end',
          columns: ['SLA', 'Standard', 'Volume', 'WNS', 'Actual'],
          rows: [
            ['PR to PO conversion', '99%', '4,818', '100%', '97%'],
            ['PO amendments', '99%', '920', '100%', '97%'],
            ['Open order management', '95%', '2,294', '1%', '0%'],
            ['PO acknowledgements', '95%', '1,499', '100%', '100%'],
            ['Spot buy: PR to quote finalisation', '98%', '329', '100%', '85%'],
            ['Spot buy: quote to PO release', '98%', '329', '100%', '100%'],
            ['Prospective supplier onboarding (single)', '95%', '9', '100%', '66%'],
            ['Transactional supplier onboarding (single)', '95%', '30', '100%', '90%'],
            ['Material and services masters', '95%', '182', '100%', '99%'],
            ['Contracts', '95%', '258', '100%', '99%'],
            ['B-BBEE updates and maintenance', '99%', '130', '100%', '100%'],
            ['P-Card spend compliance', '99%', '26', '100%', '100%'],
            ['P-Card operations reporting', '95%', '143', '100%', '100%'],
            ['Sourcing events admin support', '99%', '144', '100%', '100%'],
          ],
        },
      ],
    },
    {
      id: 'rpa',
      label: 'Transformation and RPA',
      title: 'Transformation and RPA',
      sub: 'Automation status · RPA governance to 5 Nov 2026',
      blocks: [
        {
          type: 'kpis',
          items: [
            { value: '>88%', label: 'PR Create automation', note: 'Running smoothly' },
            { value: '>95%', label: 'PO Release automation', note: 'Incl. Mobile POs' },
            { value: '~90%', label: 'PR to PO automation', note: 'Running smoothly' },
            { value: '>90%', label: 'PO Acknowledgement automation', note: 'No open issues' },
          ],
        },
        {
          type: 'list', span: 4, rows: 2, title: 'Delivered and in production',
          items: [
            { title: 'R1 services in PRs (CMAC)', text: 'In production since Aug 2026; 7 more items added in Oct.', status: 'live' },
            { title: 'Apple acknowledgement', text: 'Completed and in production.', status: 'live' },
            { title: 'OCR e-invoicing', text: 'Live 22 Aug 2026: CMAC (5 vendors), Amdocs, 9 ICT vendors (T001, T080).', status: 'live' },
            { title: 'Reports and SLA dashboards', text: 'In production, monitored and enhanced.', status: 'live' },
            { title: 'ITR', text: 'Closed and decommissioned.', status: 'complete' },
          ],
        },
        {
          type: 'list', span: 4, rows: 2, title: 'In development',
          items: [
            { title: 'Deletion letter review', text: 'Good progress; drive adoption.', status: 'progress' },
            { title: 'Virtual Pay solution', text: 'AS-IS and TO-BE documented; solution in progress.', status: 'progress' },
            { title: 'E-invoicing cost-centre bot', text: 'Cost-centre file download and upload.', status: 'progress' },
            { title: 'SAP e-Sourcing archive', text: 'RPA extracts of contracts and RFx events; next: OpenText validation.', status: 'progress' },
            { title: 'Discount POs and zero-value items', text: 'Being scoped for bot creation.', status: 'planned' },
          ],
        },
        {
          type: 'list', span: 4, rows: 2, title: 'Open items from RPA governance',
          items: [
            { title: 'PR Create: material and service codes', text: 'Items deleted in NEDLMP cause fallouts and duplicates. Code change tested in ZP2; CR logged.', status: 'progress' },
            { title: 'PR to PO: target value errors', text: 'Extra manual work; CMAC closed-PO commitment reconciliation under way.', status: 'progress' },
            { title: 'PO release turnaround', text: 'Manual releases rose from 13 to 27 hours in October, mainly international POs.', status: 'confirm' },
            { title: 'Discount and international POs', text: 'Moved from bot to manual on 26 Sep.', status: 'confirm' },
            { title: 'CMAC invoice duplication to APS', text: 'E-invoicing challenge being resolved.', status: 'progress' },
          ],
        },
      ],
    },
    {
      id: 'way-forward',
      label: 'Way forward',
      title: 'Way forward',
      sub: 'Current focus areas and decisions',
      blocks: [
        {
          type: 'steps', span: 12, rows: 2, title: 'Focus areas by stream',
          items: [
            { title: 'Sourcing support', points: ['SAP e-Sourcing archive to OpenText', 'Order management SLA reporting', 'Ariba tasks demo to COP'] },
            { title: 'PO management', points: ['Monitor PO release turnaround', 'Overdue POs: 30 to 15 days', 'Drive deletion letter adoption'] },
            { title: 'Master data', points: ['Non-VAT vendors vs spend', 'Ariba SCOC version changes', 'Registration number format clean-up'] },
            { title: 'Across streams', points: ['Work instruction revisions', 'Automation scoping', 'Cross-skilling', 'E-invoicing rollout support'] },
          ],
        },
        {
          type: 'asks', span: 12, title: 'Decisions requested from Telkom', note: 'Owners and dates to agree',
          items: [
            'Agree the plan to restore discount and international POs to the bot.',
            'Confirm NEDLMP material and service master clean-up owner and date.',
            'Approve scope for discount PO and zero-value item automation.',
          ],
        },
      ],
    },
  ],
}
export default CONFIG
