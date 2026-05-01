interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  active: string;
  onChange: (tab: string) => void;
  tabs: Tab[];
}

export default function Tabs({ active, onChange, tabs }: TabsProps) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn${active === tab.id ? ' active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="tab-count">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
