import AppHeader from './AppHeader';

export default function Layout({ children }) {
  return (
    <div>
      <AppHeader />
      {children}
    </div>
  );
}