import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface TagItem {
  id: string
  nome: string
  corHex: string
  categoria: string
  descricao: string
}

export default function Tags() {
  const navigate = useNavigate()
  
  // Estados de layout e filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas as categorias')
  const [selectedColorFilter, setSelectedColorFilter] = useState('Todas as cores')
  const [isDark, setIsDark] = useState(false)
  
  // Estado do Modal de Criação
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [novaTagName, setNovaTagName] = useState('')
  const [novaTagCor, setNovaTagCor] = useState('#0e82df')
  const [novaTagDescricao, setNovaTagDescricao] = useState('')
  const [novaTagCategoria, setNovaTagCategoria] = useState('Kanban')

  // Lista de cores pré-definidas
  const CORES_PREDEFINIDAS = [
    '#0e82df', '#f34242', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
    '#14b8a6', '#d97706', '#e11d48', '#0284c7', '#22c55e', '#a855f7', '#f472b6', '#2dd4bf', '#eab308', '#f43f5e',
    '#3b82f6', '#4ade80', '#fbbf24', '#c084fc', '#4bc5a5', '#fde047', '#f87171', '#38bdf8', '#a3e635', '#fb923c',
    '#db2777', '#0891b2', '#65a30d', '#ea580c', '#4f46e5', '#374151', '#991b1b', '#047857', '#854d0e', '#6b21a8',
    '#be185d', '#0e7490', '#4d7c0f', '#9a3412', '#312e81'
  ]

  // Estado das Tags
  const [tags, setTags] = useState<TagItem[]>([
    { id: '1', nome: 'Ana Crsitina', corHex: '#374151', categoria: 'Kanban', descricao: '-' },
    { id: '2', nome: 'Ana Julia', corHex: '#fb7185', categoria: 'Kanban', descricao: '-' },
    { id: '3', nome: 'Barbara Feires', corHex: '#0e82df', categoria: 'Kanban', descricao: '-' },
    { id: '4', nome: 'Daiane Cristina', corHex: '#84cc16', categoria: 'Kanban', descricao: '-' },
    { id: '5', nome: 'Debora Bertolini', corHex: '#c084fc', categoria: 'Kanban', descricao: '-' },
    { id: '6', nome: 'Fabiola', corHex: '#991b1b', categoria: 'Kanban', descricao: '-' },
    { id: '7', nome: 'Gabriela Peixe', corHex: '#c2410c', categoria: 'Kanban', descricao: '-' },
    { id: '8', nome: 'Isabela Zurk', corHex: '#3730a3', categoria: 'Kanban', descricao: '-' },
    { id: '9', nome: 'Jeice Carvalho', corHex: '#3730a3', categoria: 'Kanban', descricao: '-' },
  ])

  useEffect(() => {
    const savedTheme = localStorage.getItem('zyra-ui-theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('Todas as categorias')
    setSelectedColorFilter('Todas as cores')
  }

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id))
  }

  const handleCreateTag = (e: React.FormEvent) => {
    e.preventDefault()
    if (!novaTagName.trim()) return

    const novaTag: TagItem = {
      id: Date.now().toString(),
      nome: novaTagName,
      corHex: novaTagCor,
      categoria: novaTagCategoria,
      descricao: novaTagDescricao.trim() || '-'
    }

    setTags([novaTag, ...tags])
    setNovaTagName('')
    setNovaTagCor('#0e82df')
    setNovaTagDescricao('')
    setNovaTagCategoria('Kanban')
    setIsModalOpen(false)
  }

  const filteredTags = tags.filter(tag => {
    const matchSearch = tag.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        tag.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === 'Todas as categorias' || tag.categoria === selectedCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen w-full bg-[#f4f7fe] dark:bg-[#0b1329] p-6 text-[#1b2559] dark:text-white font-sans overflow-y-auto">
      
      {/* HEADER SUPERIOR */}
      <div className="w-full bg-white dark:bg-[#111c44] rounded-2xl border border-gray-100 dark:border-[#1e2d60] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#1b2559] dark:text-white">Tags</h1>
          <p className="text-xs text-gray-400 mt-0.5">Organize e categorize seus dados</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 py-2 px-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-bold rounded-xl shadow-md transform hover:-translate-y-0.5 hover:shadow-blue-500/20 transition-all duration-200 active:scale-95"
          >
            <span>+</span> Nova Tag
          </button>
        </div>
      </div>

      {/* BARRA DE FILTROS E BUSCA */}
      <div className="w-full bg-white dark:bg-[#111c44] rounded-2xl border border-gray-100 dark:border-[#1e2d60] p-4 mt-6 flex flex-col md:flex-row items-center gap-3 shadow-sm">
        <div className="relative w-full md:flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#1e2d60] bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#3b82f6] transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#1e2d60] bg-white dark:bg-[#111c44] text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#3b82f6]"
          >
            <option>Todas as categorias</option>
            <option>Kanban</option>
          </select>

          <select
            value={selectedColorFilter}
            onChange={(e) => setSelectedColorFilter(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#1e2d60] bg-white dark:bg-[#111c44] text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#3b82f6]"
          >
            <option>Todas as cores</option>
          </select>

          {/* ATUALIZADO AQUI: Sombra ativada somente com hover:shadow-md */}
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm font-semibold border border-gray-200 dark:border-[#1e2d60] rounded-xl hover:bg-gray-50 dark:hover:bg-[#1b2559]/30 transform hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      <div className="mt-3 px-1 text-xs font-semibold text-gray-400">
        Total: {filteredTags.length} tags
      </div>

      {/* TABELA DE LISTAGEM PRINCIPAL */}
      <div className="w-full bg-white dark:bg-[#111c44] rounded-2xl border border-gray-100 dark:border-[#1e2d60] shadow-sm overflow-hidden mt-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-b border-gray-100 dark:border-[#1e2d60] text-[11px] font-bold tracking-wider text-gray-400 uppercase bg-gray-50/50 dark:bg-[#1b2559]/10">
                <th className="px-6 py-3.5">Nome</th>
                <th className="px-6 py-3.5">Cor</th>
                <th className="px-6 py-3.5">Categoria</th>
                <th className="px-6 py-3.5">Descrição</th>
                <th className="px-6 py-3.5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#1e2d60]/50 text-sm font-semibold">
              {filteredTags.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1b2559]/20 transition-all">
                  
                  <td className="px-6 py-3.5 text-[#1b2559] dark:text-white">
                    <div className="flex items-center gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="currentColor" 
                        viewBox="0 0 24 24" 
                        style={{ color: tag.corHex }} 
                        className="w-4 h-4 shrink-0"
                      >
                        <path fillRule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39.18 2.39-1.122v-3.082l3.082-3.082c1.302 0 2.042-1.47 1.121-2.39L11.69 2.25A3 3 0 0 0 9.568 2.25H5.25ZM6 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" clipRule="evenodd" />
                      </svg>
                      {tag.nome}
                    </div>
                  </td>

                  <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-4 h-4 rounded-full border border-black/10 inline-block" 
                        style={{ backgroundColor: tag.corHex }}
                      />
                      {tag.corHex}
                    </div>
                  </td>

                  <td className="px-6 py-3.5">
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: tag.corHex }}
                    >
                      {tag.categoria}
                    </span>
                  </td>

                  <td className="px-6 py-3.5 text-gray-400 font-medium">{tag.descricao}</td>

                  <td className="px-6 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      
                      <button 
                        aria-label="Editar tag"
                        className="p-2 text-slate-400 hover:text-blue-500 dark:text-gray-400 border border-gray-200 dark:border-[#1e2d60] rounded-xl bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-[#1b2559]/30 shadow-sm transform hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 active:scale-95"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>

                      <button 
                        onClick={() => handleDeleteTag(tag.id)}
                        aria-label="Excluir tag"
                        className="p-2 text-slate-400 hover:text-red-500 dark:text-gray-400 border border-gray-200 dark:border-[#1e2d60] rounded-xl bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-[#1b2559]/30 shadow-sm transform hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 active:scale-95"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PARA CRIAR NOVA TAG */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#111c44] w-full max-w-md rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-[#1e2d60] my-auto">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Criar Nova Tag</h2>
              <p className="text-xs text-gray-400 mt-0.5">Adicione uma nova tag para organizar seus dados</p>
            </div>

            <form onSubmit={handleCreateTag} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Nome da tag"
                  value={novaTagName}
                  onChange={(e) => setNovaTagName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#1e2d60] bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#3b82f6] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Cor</label>
                <div className="grid grid-cols-10 gap-2 max-h-36 overflow-y-auto p-1 border border-gray-100 dark:border-[#1e2d60] rounded-xl bg-gray-50/50 dark:bg-[#0b1329]/50">
                  {CORES_PREDEFINIDAS.map((cor) => (
                    <button
                      key={cor}
                      type="button"
                      onClick={() => setNovaTagCor(cor)}
                      className={`w-6 h-6 rounded-full border transition-all transform active:scale-90 ${novaTagCor === cor ? 'border-black dark:border-white scale-110 ring-2 ring-blue-500/20' : 'border-black/10'}`}
                      style={{ backgroundColor: cor }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <span>Seletor:</span>
                  <input 
                    type="color" 
                    value={novaTagCor}
                    onChange={(e) => setNovaTagCor(e.target.value)}
                    className="w-6 h-5 rounded cursor-pointer border border-gray-200"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Código:</span>
                  <input 
                    type="text" 
                    value={novaTagCor}
                    onChange={(e) => setNovaTagCor(e.target.value)}
                    className="w-20 px-1.5 py-0.5 border border-gray-200 dark:border-[#1e2d60] rounded text-center font-mono text-[11px] bg-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Descrição (Opcional)</label>
                <textarea
                  placeholder="Descrição da tag"
                  value={novaTagDescricao}
                  onChange={(e) => setNovaTagDescricao(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#1e2d60] bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#3b82f6] transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                <select
                  value={novaTagCategoria}
                  onChange={(e) => setNovaTagCategoria(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#1e2d60] bg-white dark:bg-[#111c44] text-gray-900 dark:text-white focus:outline-none focus:border-[#3b82f6]"
                >
                  <option>Kanban</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold border border-gray-200 dark:border-[#1e2d60] rounded-xl hover:bg-gray-50 dark:hover:bg-[#1b2559]/30 transform hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97]"
                >
                  Criar Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}