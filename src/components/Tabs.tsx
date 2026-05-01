interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface Props {
  active: string;
  onChange: (tab: string) => void;
  tabs: Tab[];
}

export default function Tabs({ active, onChange, tabs }: Props) {
  return (
    <div className="main-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`main-tab${active === tab.id ? ' active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined && <span className="tab-count mono">{tab.count}</span>}
        </button>
      ))}
    </div>
  );
}
