import { Search, Filter, Plus, Pencil, Trash2, X, Bell, Sparkles, Check, Phone, Mail } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Contato {
  id: number
  nome: string
  email: string
  telefone: string
  tag: 'Cliente' | 'Lead' | 'Prospect' | 'Parceiro'
  status: 'Ativo' | 'Inativo'
}

const initialContatos: Contato[] = [
  { id: 1, nome: "Ana Silva", email: "ana.silva@email.com", telefone: "(11) 99999-1234", tag: "Cliente", status: "Ativo" },
  { id: 2, nome: "João Pedro", email: "joao.pedro@email.com", telefone: "(11) 88888-5678", tag: "Lead", status: "Ativo" },
  { id: 3, nome: "Maria Souza", email: "maria.souza@email.com", telefone: "(21) 97777-9012", tag: "Prospect", status: "Inativo" },
  { id: 4, nome: "Carlos Lima", email: "carlos.lima@email.com", telefone: "(31) 96666-3456", tag: "Cliente", status: "Ativo" },
  { id: 5, nome: "Fernanda Costa", email: "fernanda@email.com", telefone: "(41) 95555-7890", tag: "Lead", status: "Ativo" },
  { id: 6, nome: "Rafael Mendes", email: "rafael.m@email.com", telefone: "(51) 94444-2345", tag: "Parceiro", status: "Ativo" },
  { id: 7, nome: "Juliana Rocha", email: "ju.rocha@email.com", telefone: "(61) 93333-6789", tag: "Prospect", status: "Inativo" },
  { id: 8, nome: "Marcos Oliveira", email: "marcos.o@email.com", telefone: "(71) 92222-0123", tag: "Cliente", status: "Ativo" },
]

const tagStyles = {
  Cliente: "bg-blue-50 text-blue-600 border-blue-100/70",
  Lead: "bg-amber-50 text-amber-600 border-amber-100/70",
  Prospect: "bg-purple-50 text-purple-600 border-purple-100/70",
  Parceiro: "bg-emerald-50 text-emerald-600 border-emerald-100/70",
}

const avatarColors = [
  "bg-[#1e75e6] text-white",
  "bg-[#8b5cf6] text-white",
  "bg-[#10b981] text-white",
  "bg-[#f59e0b] text-white",
  "bg-[#ef4444] text-white",
  "bg-[#14b8a6] text-white",
  "bg-[#6366f1] text-white",
  "bg-[#f97316] text-white",
]

const getAvatarColor = (id: number) => {
  return avatarColors[id % avatarColors.length]
}

const formatarTelefone = (value: string) => {
  const nums = value.replace(/\D/g, '')
  const apenasNumeros = nums.slice(0, 11)

  if (apenasNumeros.length <= 2) {
    return apenasNumeros
  }
  if (apenasNumeros.length <= 6) {
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`
  }
  if (apenasNumeros.length <= 10) {
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 6)}-${apenasNumeros.slice(6)}`
  }
  return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7)}`
}

type TipoFiltro = 'todos' | 'nome' | 'tag' | 'telefone'

export default function Contatos() {
  const [contatos, setContatos] = useState<Contato[]>(initialContatos)
  const [search, setSearch] = useState('')
  
  const [filtroAtivo, setFiltroAtivo] = useState<TipoFiltro>('todos')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false)
  const [editingContato, setEditingContato] = useState<Contato | null>(null)
  const [deletingContato, setDeletingContato] = useState<Contato | null>(null)

  const [newContato, setNewContato] = useState<Omit<Contato, 'id'>>({
    nome: '',
    email: '',
    telefone: '',
    tag: 'Cliente',
    status: 'Ativo'
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredContatos = contatos.filter(contato => {
    const term = search.toLowerCase()
    if (!term) return true

    switch (filtroAtivo) {
      case 'nome':
        return contato.nome.toLowerCase().includes(term)
      case 'tag':
        return contato.tag.toLowerCase().includes(term)
      case 'telefone':
        return contato.telefone.replace(/\D/g, '').includes(term.replace(/\D/g, ''))
      case 'todos':
      default:
        return (
          contato.nome.toLowerCase().includes(term) ||
          contato.telefone.replace(/\D/g, '').includes(term.replace(/\D/g, '')) ||
          contato.tag.toLowerCase().includes(term)
        )
    }
  })

  const getPlaceholderText = () => {
    switch (filtroAtivo) {
      case 'nome': return "Buscar por nome..."
      case 'tag': return "Buscar por tag..."
      case 'telefone': return "Buscar por telefone..."
      default: return "Buscar contatos..."
    }
  }

  const handleCreateNewContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newId = contatos.length > 0 ? Math.max(...contatos.map(c => c.id)) + 1 : 1
    setContatos(prev => [...prev, { ...newContato, id: newId }])
    setNewContato({ nome: '', email: '', telefone: '', tag: 'Cliente', status: 'Ativo' })
    setIsNewContactModalOpen(false)
  }

  const handleSaveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingContato) return
    setContatos(prev => prev.map(c => c.id === editingContato.id ? editingContato : c))
    setEditingContato(null)
  }

  const handleDeleteConfirm = () => {
    if (deletingContato) {
      setContatos(prev => prev.filter(c => c.id !== deletingContato.id))
      setDeletingContato(null)
    }
  }

  return (
    // AJUSTADO: Adicionado w-full e overflow-hidden para garantir fechamento do layout
    <div className="flex flex-col h-full w-full gap-4 relative bg-[#f8fafc] p-6 overflow-hidden">
      
      <header className="flex items-center justify-between w-full bg-white rounded-[24px] px-6 py-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),_0_8px_10px_-6px_rgba(0,0,0,0.08)] shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-500 border border-blue-100/50">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-800 leading-none">Contatos</span>
            <span className="text-[11px] text-slate-400 mt-1">{contatos.length} contatos cadastrados</span>
          </div>
          <span className="ml-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600 border border-blue-100/30">
            Visão Geral
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input 
              placeholder="Buscar..." 
              className="h-9 w-48 rounded-full border border-slate-100 bg-slate-50/50 pl-8 pr-3 text-xs placeholder:text-slate-400 focus:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
            />
          </div>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white hover:bg-slate-50 text-slate-500 transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white border-2 border-white">
              3
            </span>
          </button>
        </div>
      </header>

      <div className="flex items-center justify-between gap-3 shrink-0 mt-2">
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <div className="relative w-80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] rounded-2xl">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder={getPlaceholderText()} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-2xl border border-slate-100 bg-white pl-10 pr-4 text-xs text-slate-700 placeholder:text-slate-400/80 focus:border-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={cn(
                "flex h-10 items-center justify-center gap-2 rounded-2xl border px-5 text-xs font-semibold transition-all select-none shadow-[0_4px_12px_rgba(0,0,0,0.02)]",
                filtroAtivo !== 'todos' 
                  ? "bg-blue-50 text-blue-600 border-blue-200" 
                  : "bg-white border-slate-100 hover:bg-slate-50 text-slate-500 hover:text-slate-800"
              )}
            >
              <Filter className="h-4 w-4" />
              <span>
                {filtroAtivo === 'todos' && "Filtrar"}
                {filtroAtivo === 'nome' && "Filtro: Nome"}
                {filtroAtivo === 'tag' && "Filtro: Tag"}
                {filtroAtivo === 'telefone' && "Filtro: Telefone"}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.06)] z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Filtrar por:
                </div>
                
                <button
                  onClick={() => { setFiltroAtivo('todos'); setIsDropdownOpen(false); }}
                  className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span>Todos os campos</span>
                  {filtroAtivo === 'todos' && <Check className="h-3.5 w-3.5 text-blue-600" />}
                </button>

                <button
                  onClick={() => { setFiltroAtivo('nome'); setIsDropdownOpen(false); }}
                  className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span>Nome</span>
                  {filtroAtivo === 'nome' && <Check className="h-3.5 w-3.5 text-blue-600" />}
                </button>

                <button
                  onClick={() => { setFiltroAtivo('tag'); setIsDropdownOpen(false); }}
                  className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span>Tag</span>
                  {filtroAtivo === 'tag' && <Check className="h-3.5 w-3.5 text-blue-600" />}
                </button>

                <button
                  onClick={() => { setFiltroAtivo('telefone'); setIsDropdownOpen(false); }}
                  className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span>Telefone</span>
                  {filtroAtivo === 'telefone' && <Check className="h-3.5 w-3.5 text-blue-600" />}
                </button>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={() => setIsNewContactModalOpen(true)}
          className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-[0_8px_20px_rgba(37,99,235,0.24)] transition-all hover:translate-y-[-1px] active:translate-y-[0px] px-5"
        >
          <Plus className="h-4 w-4" />
          Novo Contato
        </button>
      </div>

      <div className="flex-1 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.03)] flex flex-col">
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse text-left text-xs table-fixed">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/40 text-[10px] font-bold tracking-wider text-slate-400 uppercase sticky top-0 bg-white z-10">
                <th className="px-6 py-4 w-[25%]">Nome</th>
                <th className="px-6 py-4 w-[25%]">Email</th>
                <th className="px-6 py-4 w-[20%]">Telefone</th>
                <th className="px-6 py-4 w-[18%] text-center">Tag</th>
                <th className="px-6 py-4 w-[12%] text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {filteredContatos.map((contato) => (
                <tr key={contato.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4 truncate">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold text-xs shadow-sm",
                        getAvatarColor(contato.id)
                      )}>
                        {contato.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="font-semibold text-slate-800 text-sm truncate">{contato.nome}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            contato.status === 'Ativo' ? 'bg-emerald-500' : 'bg-slate-300'
                          )}></span>
                          <span className="text-[10px] text-slate-400 font-medium">{contato.status}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-500 truncate">
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{contato.email}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-500 truncate">
                    <div className="flex items-center gap-2 truncate">
                      <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{contato.telefone}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "inline-flex items-center justify-center px-3 py-1 rounded-full border text-[10px] font-bold w-24 text-center truncate",
                      tagStyles[contato.tag]
                    )}>
                      {contato.tag}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-2">
                      <button 
                        onClick={() => setEditingContato(contato)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 bg-white text-slate-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-colors" 
                        title="Editar Contato"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>

                      <button 
                        onClick={() => setDeletingContato(contato)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 bg-white text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-colors" 
                        title="Excluir Contato"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredContatos.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">
                    Nenhum contato encontrado com esses filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isNewContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
            <div className="p-5 pb-3 flex justify-between items-start border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Novo Contato</h2>
                <p className="text-[10px] text-slate-400 mt-0.5">Preencha as informações para cadastrar um novo contato</p>
              </div>
              <button 
                onClick={() => setIsNewContactModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewContact} className="p-5 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: João da Silva"
                  value={newContato.nome}
                  onChange={(e) => setNewContato({ ...newContato, nome: e.target.value })}
                  className="h-9.5 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400">Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="Ex: joao@email.com"
                  value={newContato.email}
                  onChange={(e) => setNewContato({ ...newContato, email: e.target.value })}
                  className="h-9.5 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400">Telefone</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: (11) 99999-9999"
                  value={newContato.telefone}
                  onChange={(e) => setNewContato({ ...newContato, telefone: formatarTelefone(e.target.value) })}
                  className="h-9.5 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-400">Tag</label>
                  <select 
                    value={newContato.tag}
                    onChange={(e) => setNewContato({ ...newContato, tag: e.target.value as Contato['tag'] })}
                    className="h-9.5 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-2.5 text-xs text-slate-700 focus:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Lead">Lead</option>
                    <option value="Prospect">Prospect</option>
                    <option value="Parceiro">Parceiro</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-400">Status</label>
                  <select 
                    value={newContato.status}
                    onChange={(e) => setNewContato({ ...newContato, status: e.target.value as Contato['status'] })}
                    className="h-9.5 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-2.5 text-xs text-slate-700 focus:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2.5 justify-end pt-3 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsNewContactModalOpen(false)} 
                  className="px-4 py-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-500 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/10 transition-colors"
                >
                  Cadastrar Contato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingContato && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
            <div className="p-5 pb-3 flex justify-between items-start border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Editar Contato</h2>
                <p className="text-[10px] text-slate-400 mt-0.5">Atualize as informações cadastrais do contato</p>
              </div>
              <button 
                onClick={() => setEditingContato(null)} 
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={editingContato.nome}
                  onChange={(e) => setEditingContato({ ...editingContato, nome: e.target.value })}
                  className="h-9.5 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 text-xs text-slate-700 focus:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400">Email</label>
                <input 
                  type="email" 
                  required
                  value={editingContato.email}
                  onChange={(e) => setEditingContato({ ...editingContato, email: e.target.value })}
                  className="h-9.5 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 text-xs text-slate-700 focus:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400">Telefone</label>
                <input 
                  type="text" 
                  required
                  value={editingContato.telefone}
                  onChange={(e) => setEditingContato({ ...editingContato, telefone: formatarTelefone(e.target.value) })}
                  className="h-9.5 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 text-xs text-slate-700 focus:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-400">Tag</label>
                  <select 
                    value={editingContato.tag}
                    onChange={(e) => setEditingContato({ ...editingContato, tag: e.target.value as Contato['tag'] })}
                    className="h-9.5 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-2.5 text-xs text-slate-700 focus:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Lead">Lead</option>
                    <option value="Prospect">Prospect</option>
                    <option value="Parceiro">Parceiro</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-400">Status</label>
                  <select 
                    value={editingContato.status}
                    onChange={(e) => setEditingContato({ ...editingContato, status: e.target.value as Contato['status'] })}
                    className="h-9.5 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-2.5 text-xs text-slate-700 focus:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2.5 justify-end pt-3 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setEditingContato(null)} 
                  className="px-4 py-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-500 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/10 transition-colors"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingContato && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 flex flex-col gap-4">
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-slate-800">Excluir Contato</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tem certeza que deseja excluir o contato de <strong className="text-slate-800">{deletingContato.nome}</strong>? Esta ação é definitiva.
              </p>
            </div>
            
            <div className="flex gap-2.5 justify-end">
              <button 
                onClick={() => setDeletingContato(null)} 
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-500 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleDeleteConfirm} 
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-600/10 transition-colors"
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