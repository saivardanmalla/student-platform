# Student & Application Management Platform (SAMP)

Frontend-only enterprise SaaS prototype based on the Product Requirements Document.

## Quick start

Open `index.html` in a modern browser, or serve the folder:

```bash
cd student-platform
python3 -m http.server 8765
# then open http://localhost:8765
```

## Demo login

| Role     | Quick action              | Credentials              |
|----------|---------------------------|--------------------------|
| Admin    | **Login as Admin**        | admin@samp.demo / demo123 |
| Employee | **Login as Employee**     | nagaraju@samp.demo / demo123 |

Click the quick-fill buttons on the login screen, then **Sign in**.

## What’s included

- **Login** with demo Admin / Employee role simulation  
- **Admin Dashboard** — all PRD metrics (Direct, B2B, Offers, Waiting, Deferred, Dropped, Private Shifted, Still Thinking, Lead-by counts), status distribution, country mix  
- **Employee Dashboard** — assigned workload, work queue, pending payments  
- **Students directory** — search, filter, sort, pagination, CSV export, Add Student  
- **Multi-step student form** — Personal → Academic → Account → Application → Payment → Review  
  - Conditional Germany fields (APS, Uni-Assist, Blocked Account, Enrollment, Dorm)  
  - Masked sensitive credentials with reveal / copy  
- **Student detail** — profile sections, payment card, status change with confirmation, activity timeline drawer  
- **Leads & Applications** — table + pipeline (Kanban) views, status badges, Direct/B2B  
- **Payments** — fee breakdown, status badges (Paid / Partially Paid / Pending / Overdue)  
- **University database** — advanced filters, add/edit (Admin), client-side CSV export  
- **Employees** (Admin) — directory with assignment counts  
- **Audit Center** (Admin) — summary cards, filters, detail drawer with before/after  
- **Reports hub** — prototype export buttons  
- **Global shell** — left sidebar (role-aware), top bar, ⌘K command search, toasts, drawers, modals  
- **Persistence** — localStorage for students, universities, audit events, session  

## Design system

- Font: Inter  
- Background `#F7F8FA` · Surface `#FFFFFF` · Primary `#2563EB`  
- Success / Warning / Danger / Info tokens as specified  
- Border radius 10–14px, soft shadows, Lucide-style icons  
- Responsive: desktop sidebar, tablet collapse, mobile drawer  

## Stack (CDN)

React 18 · Tailwind CSS · Lucide React · localStorage state  

No build step required. Prototype honesty: no real auth, encryption, or backend.

## Source

Aligned with PRD v1.0 — Frontend Prototype Scope (25 September 2026).
