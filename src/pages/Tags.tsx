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
  
  // Estado do Modal de Criação
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [novaTagName, setNovaTagName] = useState('')
  const [novaTagCor, setNovaTagCor] = useState('#0e82df')
  const [novaTagDescricao, setNovaTagDescricao] = useState('')
  const [novaTagCategoria, setNovaTagCategoria] = useState('Kanban')

  // Estado do Modal de Edição (Apenas Descrição)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTagId, setEditingTagId] = useState<string | null>(null)
  const [editTagDescricao, setEditTagDescricao] = useState('')

  // Estado do Modal de Confirmação de Deleção
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [tagIdToDelete, setTagIdToDelete] = useState<string | null>(null)

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

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('Todas as categorias')
    setSelectedColorFilter('Todas as cores')
  }

  const openDeleteModal = (id: string) => {
    setTagIdToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (tagIdToDelete) {
      setTags(tags.filter(tag => tag.id !== tagIdToDelete))
      setTagIdToDelete(null)
      setIsDeleteModalOpen(false)
    }
  }

  // Abre o modal isolando apenas a descrição antiga para edição
  const openEditModal = (tag: TagItem) => {
    setEditingTagId(tag.id)
    setEditTagDescricao(tag.descricao === '-' ? '' : tag.descricao)
    setIsEditModalOpen(true)
  }

  const handleSaveEditTag = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTagId) return

    setTags(tags.map(tag => {
      if (tag.id === editingTagId) {
        return {
          ...tag,
          descricao: editTagDescricao.trim() || '-'
        }
      }
      return tag
    }))

    setIsEditModalOpen(false)
    setEditingTagId(null)
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
    <div className="min-h-screen w-full bg-[#f8f9fa] dark:bg-[#0b1428] p-6 text-gray-800 dark:text-white font-sans overflow-y-auto transition-colors duration-200">
      
      {/* HEADER SUPERIOR */}
      <div className="w-full bg-white dark:bg-[#15224f] rounded-2xl border border-gray-200 dark:border-[#213575]/40 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md transition-colors">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Tags</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Organize e categorize seus dados</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 py-2 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
          >
            <span>+</span> Nova Tag
          </button>
        </div>
      </div>

      {/* BARRA DE FILTROS E BUSCA */}
      <div className="w-full bg-white dark:bg-[#15224f] rounded-2xl border border-gray-200 dark:border-[#213575]/40 p-4 mt-6 flex flex-col md:flex-row items-center gap-3 shadow-lg transition-colors">
        <div className="relative w-full md:flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-300 dark:border-[#213575] bg-gray-50 dark:bg-[#0b1428]/60 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#2563eb] transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-[#213575] bg-white dark:bg-[#15224f] text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#2563eb]"
          >
            <option>Todas as categorias</option>
            <option>Kanban</option>
          </select>

          <select
            value={selectedColorFilter}
            onChange={(e) => setSelectedColorFilter(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-[#213575] bg-white dark:bg-[#15224f] text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#2563eb]"
          >
            <option>Todas as cores</option>
          </select>

          <button
            type="button"
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm font-semibold border border-gray-300 dark:border-[#213575] rounded-xl text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#0b1428]/30 hover:bg-gray-200 dark:hover:bg-[#213575]/40 transform hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      <div className="mt-3 px-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
        Total: {filteredTags.length} tags
      </div>

      {/* TABELA DE LISTAGEM PRINCIPAL */}
      <div className="w-full bg-white dark:bg-[#15224f] rounded-2xl border border-gray-200 dark:border-[#213575]/40 shadow-lg overflow-hidden mt-3 transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#213575] text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-[#0b1428]/20">
                <th className="px-6 py-3.5">Nome</th>
                <th className="px-6 py-3.5">Cor</th>
                <th className="px-6 py-3.5">Categoria</th>
                <th className="px-6 py-3.5">Descrição</th>
                <th className="px-6 py-3.5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#213575]/30 text-sm font-semibold">
              {filteredTags.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-50 dark:hover:bg-[#213575]/20 transition-all">
                  
                  <td className="px-6 py-3.5 text-gray-900 dark:text-white">
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
                        className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10 inline-block" 
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

                  <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400 font-medium">{tag.descricao}</td>

                  <td className="px-6 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      
                      {/* BOTÃO EDITAR */}
                      <button 
                        onClick={() => openEditModal(tag)}
                        aria-label="Editar tag"
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-[#213575] rounded-xl bg-transparent hover:bg-gray-100 dark:hover:bg-[#213575]/40 shadow-sm transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>

                      {/* BOTÃO EXCLUIR */}
                      <button 
                        onClick={() => openDeleteModal(tag.id)}
                        aria-label="Excluir tag"
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-[#213575] rounded-xl bg-transparent hover:bg-gray-100 dark:hover:bg-[#213575]/40 shadow-sm transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#15224f] w-full max-w-md rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-[#213575] my-auto text-gray-800 dark:text-white transition-colors">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Criar Nova Tag</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Adicione uma nova tag para organizar seus dados</p>
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
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-[#213575] bg-gray-50 dark:bg-[#0b1428]/60 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Cor</label>
                <div className="grid grid-cols-10 gap-2 max-h-36 overflow-y-auto p-1 border border-gray-200 dark:border-[#213575] rounded-xl bg-gray-50 dark:bg-[#0b1428]/60">
                  {CORES_PREDEFINIDAS.map((cor) => (
                    <button
                      key={cor}
                      type="button"
                      onClick={() => setNovaTagCor(cor)}
                      className={`w-6 h-6 rounded-full border transition-all transform active:scale-90 ${novaTagCor === cor ? 'border-gray-800 dark:border-white scale-110 ring-2 ring-blue-500/20' : 'border-black/10 dark:border-white/10'}`}
                      style={{ backgroundColor: cor }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <span>Seletor:</span>
                  <input 
                    type="color" 
                    value={novaTagCor}
                    onChange={(e) => setNovaTagCor(e.target.value)}
                    className="w-6 h-5 rounded cursor-pointer border border-gray-300 dark:border-[#213575] bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Código:</span>
                  <input 
                    type="text" 
                    value={novaTagCor}
                    onChange={(e) => setNovaTagCor(e.target.value)}
                    className="w-20 px-1.5 py-0.5 border border-gray-300 dark:border-[#213575] rounded text-center font-mono text-[11px] bg-white dark:bg-transparent text-gray-900 dark:text-white"
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
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-[#213575] bg-gray-50 dark:bg-[#0b1428]/60 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                <select
                  value={novaTagCategoria}
                  onChange={(e) => setNovaTagCategoria(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-[#213575] bg-white dark:bg-[#15224f] text-gray-900 dark:text-white focus:outline-none focus:border-[#2563eb]"
                >
                  <option>Kanban</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold border border-gray-300 dark:border-[#213575] rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#213575]/40 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97]"
                >
                  Criar Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PARA EDITAR TAG (Apenas campo de descrição) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#15224f] w-full max-w-md rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-[#213575] my-auto text-gray-800 dark:text-white transition-colors">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Editar Descrição</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Modifique o texto da descrição abaixo</p>
            </div>

            <form onSubmit={handleSaveEditTag} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                <textarea
                  placeholder="Escreva a nova descrição..."
                  value={editTagDescricao} // Traz o texto que a pessoa já escreveu
                  onChange={(e) => setEditTagDescricao(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-[#213575] bg-gray-50 dark:bg-[#0b1428]/60 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false)
                    setEditingTagId(null)
                  }}
                  className="px-4 py-2 text-xs font-bold border border-gray-300 dark:border-[#213575] rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#213575]/40 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97]"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#15224f] w-full max-w-sm rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-[#213575] text-gray-800 dark:text-white transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-full mb-4 border border-red-200 dark:border-red-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Excluir Tag</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 max-w-[280px]">
                Tem certeza que deseja excluir esta tag? Essa ação não poderá ser desfeita.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 w-full">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false)
                  setTagIdToDelete(null)
                }}
                className="flex-1 py-2 px-4 text-xs font-bold border border-gray-300 dark:border-[#213575] rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#213575]/40 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2 px-4 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-all duration-200 active:scale-95"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}