import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-[20%_80%] h-screen">
    <aside className="hidden md:block bg-bgSidebar p-4 h-screen">
      {/* Konten Sidebar */}
     <Sidebar />
    </aside>
    <main className="bg-white p-4 lg:col-span-2">
      {/* Konten Utama */}
      <h1 className="text-2xl font-bold">Main Content</h1>
      <p>Here is the main content of the page.</p>
    </main>
  </div>
  )
}

export default App
