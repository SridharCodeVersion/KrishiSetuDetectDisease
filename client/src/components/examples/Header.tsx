import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      isDarkMode={false}
      toggleDarkMode={() => console.log('Dark mode toggled')}
      isSidebarOpen={false}
      toggleSidebar={() => console.log('Sidebar toggled')}
    />
  );
}