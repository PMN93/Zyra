import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/dashboard')
  }

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
        
        {/* Seta de Voltar no Canto Superior Esquerdo */}
        <button
          type="button"
          onClick={() => navigate('/inicial')}
          className="absolute top-6 left-6 p-2 rounded-xl border border-gray-100 dark:border-[#1e2d60] bg-gray-50/50 dark:bg-[#1b2559]/10 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1b2559]/30 hover:text-[#1b2559] dark:hover:text-white transition-all active:scale-95"
          aria-label="Voltar para seleção"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

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
            Insira suas credenciais para acessar o painel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1b2559] dark:text-gray-300 mb-1.5">E-mail</label>
            <input
              type="email"
              required
              placeholder="nome@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1e2d60] bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-[#4da1ff] transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-semibold text-[#1b2559] dark:text-gray-300">Senha</label>
              
              {/* CORREÇÃO DO ERRO AQUI: Ajustado a rota para onde sua tela de esqueci senha foi mapeada */}
              <button 
                type="button" 
                onClick={() => navigate('/esquecisenha')} 
                className="text-xs font-semibold text-[#3b82f6] hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Esqueceu a senha?
              </button>
              
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1e2d60] bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-[#4da1ff] transition-all"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center">
              <input
                id="show-password"
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 dark:border-[#1e2d60] text-[#3b82f6] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="show-password" className="ml-2 text-sm text-gray-500 dark:text-gray-400 select-none cursor-pointer">
                Mostrar senha
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-none transition-all active:scale-[0.98]"
          >
            Entrar no Sistema
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">&copy; 2026 Zyra CRM. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}