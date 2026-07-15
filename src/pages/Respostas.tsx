import { Search, RotateCcw, Eye, Trash2, ChevronDown, Download, Sparkles, Bell, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Lead {
  id: number
  formulario: string
  nome: string
  telefone: string
  cpf: string
  data: string
  pontuacao: string | number
  status: 'Aprovado' | 'Reprovado'
  cep?: string
  logradouro?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  estado?: string
  chamado?: boolean
}

const initialLeads: Lead[] = [
  { 
    id: 1, 
    formulario: "Pré-cadastro Raríssima Be Rare", 
    nome: "Bianca Alves Pereira", 
    telefone: "+5519984390586", 
    cpf: "401.148.378-80", 
    data: "25/11/2025 10:51", 
    pontuacao: "-", 
    status: "Reprovado",
    cep: "13402-096",
    logradouro: "Rua Tupã",
    numero: "293",
    complemento: "Casa fundo",
    bairro: "Jardim Tatuapé",
    cidade: "Piracicaba",
    estado: "SP"
  },
  { 
    id: 2, 
    formulario: "Pré-cadastro Raríssima Be Rare", 
    nome: "Tainara Elisa Silva Meira", 
    telefone: "+551917978502", 
    cpf: "490.569.818-97", 
    data: "25/11/2025 09:30", 
    pontuacao: "-", 
    status: "Reprovado",
    cep: "13400-000",
    logradouro: "Avenida Principal",
    numero: "102",
    complemento: "Apto 32",
    bairro: "Centro",
    cidade: "Piracicaba",
    estado: "SP"
  },
  { 
    id: 3, 
    formulario: "Pré-cadastro Raríssima Be Rare", 
    nome: "Claudia Fernandes Rodrigues Camargo", 
    telefone: "+551996142996", 
    cpf: "347.642.518-50", 
    data: "24/11/2025 22:49", 
    pontuacao: "-", 
    status: "Reprovado",
    cep: "13405-120",
    logradouro: "Rua das Flores",
    numero: "45",
    complemento: "",
    bairro: "Vila Rezende",
    cidade: "Piracicaba",
    estado: "SP"
  },
  { id: 4, formulario: "Pré-cadastro Raríssima Be Rare", nome: "Sandra Aparecida Macedo", telefone: "+5519967658116", cpf: "184.887.288-75", data: "24/11/2025 12:10", pontuacao: "-", status: "Reprovado" },
  { id: 5, formulario: "Pré-cadastro Raríssima Be Rare", nome: "Danieli Ferreira dos Santos", telefone: "+5519971100525", cpf: "411.167.378-33", data: "24/11/2025 09:33", pontuacao: "-", status: "Reprovado" },
  { id: 6, formulario: "Pré-cadastro Raríssima Be Rare", nome: "ELAINE FERREIRA DA SILVA", telefone: "+5519947819812", cpf: "414.537.328-61", data: "24/11/2025 09:12", pontuacao: "-", status: "Reprovado" },
  { id: 7, formulario: "Pré-cadastro Raríssima Be Rare", nome: "Regiane Silva Santos Carvalho", telefone: "+5519972469648", cpf: "308.976.208-01", data: "24/11/2025 06:27", pontuacao: "-", status: "Reprovado" },
  { id: 8, formulario: "Pré-cadastro Raríssima Be Rare", nome: "Poliana Oliveira leite", telefone: "+5575981956556", cpf: "058.704.635-05", data: "23/11/2025 15:52", pontuacao: "-", status: "Aprovado" }
]

export default function Respostas() {
  const [leads, setLeads] = useState<Lead[]>(() => {
    // Carrega o histórico do localStorage ao montar o componente
    const savedChamados = localStorage.getItem('leads_chamados')
    const chamadosIds = savedChamados ? JSON.parse(savedChamados) : []
    
    return initialLeads.map(lead => ({
      ...lead,
      chamado: chamadosIds.includes(lead.id)
    }))
  })

  const [search, setSearch] = useState('')
  const [selectedForm, setSelectedForm] = useState('Todos os formulários')
  const [selectedStatus, setSelectedStatus] = useState('Todos os status')
  const [selectedDate, setSelectedDate] = useState('')

  const [activeDetailsLead, setActiveDetailsLead] = useState<Lead | null>(null)
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null)
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null)

  const navigate = useNavigate()

  const handleClearFilters = () => {
    setSearch('')
    setSelectedForm('Todos os formulários')
    setSelectedStatus('Todos os status')
    setSelectedDate('')
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = search === '' || 
      lead.nome.toLowerCase().includes(search.toLowerCase()) || 
      lead.cpf.includes(search) || 
      lead.telefone.includes(search)

    const matchesForm = selectedForm === 'Todos os formulários' || lead.formulario === selectedForm
    const matchesStatus = selectedStatus === 'Todos os status' || lead.status === selectedStatus
    const matchesDate = selectedDate === '' || lead.data.includes(selectedDate.split('-').reverse().join('/'))

    return matchesSearch && matchesForm && matchesStatus && matchesDate
  })

  const updateStatus = (id: number, status: 'Aprovado' | 'Reprovado') => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return { ...lead, status }
      }
      return lead
    }))
  }

  const handleDeleteConfirm = () => {
    if (leadToDelete) {
      setLeads(prev => prev.filter(l => l.id !== leadToDelete.id))
      setLeadToDelete(null)
    }
  }

  const handleWhatsappClick = (lead: Lead) => {
    const savedChamados = localStorage.getItem('leads_chamados')
    const chamadosIds: number[] = savedChamados ? JSON.parse(savedChamados) : []
    
    if (!chamadosIds.includes(lead.id)) {
      chamadosIds.push(lead.id)
      localStorage.setItem('leads_chamados', JSON.stringify(chamadosIds))
    }

    setLeads(prevLeads => prevLeads.map(item => {
      if (item.id === lead.id) {
        return { ...item, chamado: true }
      }
      return item
    }))

    navigate('/dashboard/whatsapp', { 
      state: { 
        novoContato: { 
          nome: lead.nome, 
          telefone: lead.telefone 
        } 
      } 
    })
  }

  return (
    <div className="flex flex-col h-full gap-4 relative">
      
      {/* CABEÇALHO */}
      <header className="flex items-center justify-between w-full bg-card border border-border rounded-2xl px-4 py-3 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 border border-blue-100">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground leading-none">Respostas</span>
            <span className="text-[10px] text-muted-foreground mt-1">1954 respostas recebidas</span>
          </div>
          <span className="ml-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600 border border-blue-100/50">
            Visão Geral
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input 
              placeholder="Buscar..." 
              className="h-8 w-48 rounded-full border border-border bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background hover:bg-muted/50 text-muted-foreground transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white border-2 border-card">
              3
            </span>
          </button>
          
          <button className="flex h-8 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-600/10 transition-colors px-4 ml-2">
            <Download className="h-3.5 w-3.5" />
            Exportar CSV
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="flex flex-1 flex-col gap-3 min-h-0 overflow-hidden">
        
        {/* Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4 rounded-2xl border border-border bg-card shadow-md shrink-0 items-end">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-muted-foreground">Formulário</span>
            <select 
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
              className="h-8 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option>Todos os formulários</option>
              <option>Pré-cadastro Raríssima Be Rare</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-muted-foreground">Data</span>
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-8 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-muted-foreground">Status</span>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-8 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option>Todos os status</option>
              <option>Aprovado</option>
              <option>Reprovado</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-muted-foreground">Filtrar por nome/doc</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input 
                placeholder="Buscar por ID..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-full rounded-xl border border-border bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" 
              />
            </div>
          </div>

          <button 
            onClick={handleClearFilters}
            className="flex h-8 items-center justify-center gap-1.5 rounded-xl border border-border bg-background hover:bg-muted/50 text-xs font-semibold text-foreground transition-colors px-3 w-full"
          >
            <RotateCcw className="h-3 w-3" />
            Limpar Filtros
          </button>
        </div>

        {/* Tabela de Leads */}
        <div className="flex-1 overflow-hidden rounded-2xl border border-border bg-card shadow-md flex flex-col">
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/20 text-[10px] font-bold tracking-wider text-muted-foreground uppercase sticky top-0 bg-card z-10">
                  <th className="px-5 py-3">Formulário</th>
                  <th className="px-5 py-3">Nome</th>
                  <th className="px-5 py-3">Telefone</th>
                  <th className="px-5 py-3">CPF</th>
                  <th className="px-5 py-3">Data</th>
                  {/* Nome da coluna WhatsApp */}
                  <th className="px-5 py-3 text-center">WhatsApp</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-foreground">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5 max-w-[240px] truncate font-medium text-muted-foreground">
                      {lead.formulario}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-foreground">
                      {lead.nome}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {lead.telefone}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {lead.cpf}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {lead.data}
                    </td>
                    
                    {/* COLUNA WHATSAPP */}
                    <td className="px-5 py-3.5 text-center font-medium">
                      {lead.chamado ? (
                        <span className="inline-flex items-center justify-center text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 font-bold text-[10px]">
                          Chamado
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center text-muted-foreground/60 bg-muted/30 px-2.5 py-1 rounded-full border border-border/40 font-medium text-[10px] select-none">
                          Não chamado
                        </span>
                      )}
                    </td>

                    {/* COLUNA STATUS COM DROPDOWN */}
                    <td className="px-5 py-3.5 relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveDropdownId(activeDropdownId === lead.id ? null : lead.id)
                        }}
                        className={cn(
                          "inline-flex h-6 items-center gap-1.5 rounded-lg border px-2 text-[10px] font-bold transition-all",
                          lead.status === 'Aprovado'
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 border-rose-500/30 hover:bg-rose-500/20"
                        )}
                      >
                        {lead.status}
                        <ChevronDown className="h-3 w-3 opacity-60" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdownId === lead.id && (
                        <>
                          {/* Camada invisível para fechar ao clicar fora */}
                          <div 
                            className="fixed inset-0 z-20 cursor-default" 
                            onClick={() => setActiveDropdownId(null)}
                          />
                          
                          {/* Opções do Dropdown - Fundos e Cores de Textos Removidos */}
                          <div className="absolute left-5 mt-1 w-28 rounded-xl border border-border bg-card shadow-lg z-30 py-1 flex flex-col">
                            <button
                              onClick={() => {
                                updateStatus(lead.id, 'Aprovado')
                                setActiveDropdownId(null)
                              }}
                              className={cn(
                                "flex w-full items-center px-3 py-2 text-[10px] font-bold text-left transition-colors hover:bg-muted/50",
                                lead.status === 'Aprovado' ? "text-foreground" : "text-muted-foreground"
                              )}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" />
                              Aprovado
                            </button>
                            <button
                              onClick={() => {
                                updateStatus(lead.id, 'Reprovado')
                                setActiveDropdownId(null)
                              }}
                              className={cn(
                                "flex w-full items-center px-3 py-2 text-[10px] font-bold text-left transition-colors hover:bg-muted/50",
                                lead.status === 'Reprovado' ? "text-foreground" : "text-muted-foreground"
                              )}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mr-2" />
                              Reprovado
                            </button>
                          </div>
                        </>
                      )}
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex gap-1.5">
                        <button 
                          onClick={() => setActiveDetailsLead(lead)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" 
                          title="Visualizar"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>

                        <button 
                          onClick={() => setLeadToDelete(lead)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-muted hover:text-rose-600 transition-colors" 
                          title="Excluir"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        
                        {/* Botão do WhatsApp */}
                        <button 
                          onClick={() => handleWhatsappClick(lead)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors" 
                          title="Falar no WhatsApp interno"
                        >
                          <svg 
                            className="h-4 w-4 stroke-current" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
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
      </div>

      {/* ================= MODAL DETALHES DA RESPOSTA ================= */}
      {activeDetailsLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-xl flex flex-col overflow-hidden max-h-[90vh]">
            <div className="p-5 pb-3 flex justify-between items-start">
              <div>
                <h2 className="text-base font-bold text-foreground">Detalhes da Resposta</h2>
                <p className="text-[11px] text-muted-foreground mt-0.5">Visualize todos os dados preenchidos nesta resposta do formulário</p>
              </div>
              <button onClick={() => setActiveDetailsLead(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="px-5 pb-4 flex justify-between items-center text-[11px] text-muted-foreground border-b border-border/60">
              <div><strong>Formulário:</strong> {activeDetailsLead.formulario}</div>
              <div><strong>Data:</strong> {activeDetailsLead.data}</div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="p-4 rounded-xl border border-violet-100 bg-violet-50/20 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-violet-950">Preenchimento do Formulário:</span>
                  <span className="text-base font-bold text-violet-700">100%</span>
                </div>
                <div className="w-full bg-violet-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-violet-600 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-muted-foreground font-medium mt-1">
                  <span>18 de 18 campos preenchidos</span>
                  <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                    <Check className="h-3 w-3" /> Completo
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-muted/10 space-y-4">
                <h3 className="text-xs font-bold text-foreground">Dados Preenchidos</h3>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground">Status atual:</span>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold w-fit">
                    <span className={cn("h-2 w-2 rounded-full", activeDetailsLead.status === 'Aprovado' ? 'bg-emerald-500' : 'bg-rose-500')}></span>
                    {activeDetailsLead.status}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground">Nome completo</span>
                  <div className="rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground font-medium">
                    {activeDetailsLead.nome}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground">Qual seu endereço?</span>
                  <div className="rounded-xl border border-border bg-background p-3.5 space-y-2 text-xs">
                    <div className="font-semibold text-foreground">CEP: <span className="font-normal text-muted-foreground">{activeDetailsLead.cep || "13402-096"}</span></div>
                    <div className="font-semibold text-foreground">Logradouro: <span className="font-normal text-muted-foreground">{activeDetailsLead.logradouro || "Rua Tupã"}</span></div>
                    <div className="font-semibold text-foreground">Número: <span className="font-normal text-muted-foreground">{activeDetailsLead.numero || "293"}</span></div>
                    <div className="font-semibold text-foreground">Complemento: <span className="font-normal text-muted-foreground">{activeDetailsLead.complemento || "Casa fundo"}</span></div>
                    <div className="font-semibold text-foreground">Bairro: <span className="font-normal text-muted-foreground">{activeDetailsLead.bairro || "Jardim Tatuapé"}</span></div>
                    <div className="font-semibold text-foreground">Cidade: <span className="font-normal text-muted-foreground">{activeDetailsLead.cidade || "Piracicaba"}</span></div>
                    <div className="font-semibold text-foreground">Estado: <span className="font-normal text-muted-foreground">{activeDetailsLead.estado || "SP"}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL CONFIRMAR EXCLUSÃO ================= */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-xl p-5 flex flex-col gap-4">
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-foreground">Confirmar Exclusão</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tem certeza que deseja excluir esta resposta? Esta ação não pode ser desfeita.
              </p>
            </div>
            
            <div className="flex gap-2.5 justify-end">
              <button onClick={() => setLeadToDelete(null)} className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted/50 text-xs font-semibold text-foreground transition-colors">
                Cancelar
              </button>
              <button onClick={handleDeleteConfirm} className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-600/10 transition-colors">
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}