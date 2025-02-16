export default function HomeView() {
  return (
    <div>
      <div>Node: {window.versions.node()}</div>
      <div>Chrome: {window.versions.chrome()}</div>
      <div>Electron: {window.versions.electron()}</div>
      <button
        onClick={async () => {
          const response = await window.versions.ping();
          alert(response); // Display the response from ping()
        }}
      >
        Ping
      </button>
    </div>
  );
}
