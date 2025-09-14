import Dashboard from '../Dashboard';

export default function DashboardExample() {
  return (
    <Dashboard 
      onFeatureSelect={(feature) => console.log('Feature selected:', feature)}
    />
  );
}