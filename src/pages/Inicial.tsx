import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginSelection() {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('zyra-ui-theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('zyra-ui-theme', 'light')
    }
  }, [isDark])

  useEffect(() => {
    const savedTheme = localStorage.getItem('zyra-ui-theme')
    if (savedTheme === 'dark') setIsDark(true)
  }, [])

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-[#f4f7fe] dark:bg-[#0b1329] p-4 transition-colors duration-300">
      
      {/* Alternador de Tema */}
      <div className="absolute top-6 right-6">
        <button
          type="button"
          onClick={() => setIsDark(!isDark)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-[#1e2d60] bg-white dark:bg-[#111c44] text-sm font-medium text-[#1b2559] dark:text-white hover:bg-gray-50 dark:hover:bg-[#1b2559]/30 transition-all shadow-sm active:scale-95"
        >
          {isDark ? <span>Modo Claro</span> : <span>Modo Escuro</span>}
        </button>
      </div>

      {/* Card Principal */}
      <div className="w-full max-w-md bg-white dark:bg-[#111c44] rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none p-8 border border-gray-100 dark:border-[#1e2d60] transition-colors duration-300 relative">
        
        {/* Logo & Título */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 bg-[#4da1ff] rounded-2xl flex items-center justify-center text-white shadow-[0_8px_20px_rgba(59,130,246,0.45)] mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white tracking-tight">
            Zyra <span className="text-[#3b82f6] font-medium text-sm align-super">CRM</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
            Seja bem-vindo. Escolha uma opção para continuar.
          </p>
        </div>

        {/* Blocos de Opção */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full p-5 text-left rounded-xl border-2 border-gray-100 dark:border-[#1e2d60] bg-gray-50/50 dark:bg-[#1b2559]/10 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:scale-[0.99]"
          >
            <h3 className="font-semibold text-[#1b2559] dark:text-white">Já tenho uma conta existente</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Entrar direto no sistema utilizando suas credenciais.</p>
          </button>

          <button
            type="button"
            onClick={() => navigate('/cadastrar')}
            className="w-full p-5 text-left rounded-xl border-2 border-gray-100 dark:border-[#1e2d60] bg-gray-50/50 dark:bg-[#1b2559]/10 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:scale-[0.99]"
          >
            <h3 className="font-semibold text-[#1b2559] dark:text-white">Criar uma conta</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Não tem acesso? Clique aqui para registrar seus dados.</p>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">&copy; 2026 Zyra CRM. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}