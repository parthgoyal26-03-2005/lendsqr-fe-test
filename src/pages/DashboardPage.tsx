import { MetricCard } from '../components/common/MetricCard'
import { formatCompactNumber } from '../utils/formatters'
import { Topbar } from '../components/layout/Topbar'
import './DashboardPage.scss'

const stats = [
  { label: 'Users', value: formatCompactNumber(2453), tone: 'blue',},
  { label: 'Active Loans', value: formatCompactNumber(1542), tone: 'green', },
  { label: 'Savings', value: formatCompactNumber(1268), tone: 'amber', },
  { label: 'Rejected', value: formatCompactNumber(223), tone: 'pink', },
] as const



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

    
    </div>
  </section>
)
