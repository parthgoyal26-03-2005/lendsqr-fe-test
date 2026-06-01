import { MetricCard } from '../components/common/MetricCard'
import type { ActivityItem } from '../types/dashboard'
import { formatCompactNumber } from '../utils/formatters'
import { Topbar } from '../components/layout/Topbar'
import './DashboardPage.scss'

const stats = [
  { label: 'Users', value: formatCompactNumber(2453), tone: 'blue', trend: '+12.4% this month' },
  { label: 'Active Loans', value: formatCompactNumber(1542), tone: 'green', trend: '+8.1% vs last week' },
  { label: 'Savings', value: formatCompactNumber(1268), tone: 'amber', trend: '+4.9% in 30 days' },
  { label: 'Rejected', value: formatCompactNumber(223), tone: 'pink', trend: '-2.2% from last cycle' },
] as const

const activities: ActivityItem[] = [
  { title: 'KYC reviews', description: '38 records cleared for verification.', time: '10 min ago' },
  { title: 'Loan disbursement', description: '14 loans released to eligible customers.', time: '1 hour ago' },
  { title: 'Compliance alert', description: '3 flagged accounts need manual review.', time: 'Today' },
]

export const DashboardPage = () => (
  <section className="dashboard-page">
    <Topbar title="Dashboard" subtitle="Overview of customer activity and portfolio health" />

    <div className="dashboard-page__metrics">
      {stats.map((card) => (
        <MetricCard
          key={card.label}
          label={card.label}
          value={card.value}
          accent={card.tone}
          note={card.trend}
        />
      ))}
    </div>

    <div className="dashboard-page__grid">
      <article className="dashboard-card">
        <h3>Users by Segment</h3>
        <div className="dashboard-card__chart" aria-hidden="true">
          <span style={{ height: '64%' }} />
          <span style={{ height: '48%' }} />
          <span style={{ height: '82%' }} />
          <span style={{ height: '36%' }} />
          <span style={{ height: '58%' }} />
        </div>
      </article>

      <article className="dashboard-card">
        <h3>Recent Activity</h3>
        <ul className="dashboard-card__activity">
          {activities.map((activity) => (
            <li key={activity.title}>
              <strong>{activity.title}</strong>
              <span>{activity.description}</span>
              <small>{activity.time}</small>
            </li>
          ))}
        </ul>
      </article>
    </div>
  </section>
)
