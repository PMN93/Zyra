import { useState } from 'react'
import { Header } from '../components/dashboard/Header'
import { Plus, MoreHorizontal, Clock, Tag, ChevronDown, Check, X, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Card {
  id: number
  title: string
  tag: string
  tagColor: string
  due: string
}

interface Column {
  id: string
  label: string
  color: string
}

interface QuadroData {
  id: string
  name: string
  columns: Column[]
  cards: Record<string, Card[]>
}

const initialQuadros: QuadroData[] = [
  {
    id: '1',
    name: 'Quadro Principal (CRM)',
    columns: [
      { id: 'todo', label: 'A Fazer', color: 'bg-slate-400' },
      { id: 'doing', label: 'Em Andamento', color: 'bg-blue-500' },
      { id: 'done', label: 'Concluído', color: 'bg-emerald-500' },
    ],
    cards: {
      todo: [
        { id: 1, title: 'Criar proposta para cliente XYZ', tag: 'Urgente', tagColor: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300', due: 'Hoje' },
        { id: 2, title: 'Atualizar base de contatos', tag: 'Normal', tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300', due: 'Amanhã' },
      ],
      doing: [
        { id: 3, title: 'Campanha de e-mail Q2', tag: 'Normal', tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300', due: '12 abr' },
      ],
      done: [
        { id: 4, title: 'Reunião de alinhamento Q1', tag: 'Feito', tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300', due: '1 abr' },
      ]
    }
  }
]

const availableColors = [
  { label: 'Cinza', value: 'bg-slate-400' },
  { label: 'Azul', value: 'bg-blue-500' },
  { label: 'Esmeralda', value: 'bg-emerald-500' },
  { label: 'Roxo', value: 'bg-purple-500' },
  { label: 'Amarelo', value: 'bg-amber-500' },
  { label: 'Rosa', value: 'bg-rose-500' },
]

const priorityTags = [
  { label: 'Urgente', tagColor: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300' },
  { label: 'Alta', tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' },
  { label: 'Normal', tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' },
  { label: 'Baixa', tagColor: 'bg-muted text-muted-foreground' },
]

export default function Quadro() {
  const [quadros, setQuadros] = useState<QuadroData[]>(initialQuadros)
  const [activeQuadroId, setActiveQuadroId] = useState<string>(initialQuadros[0].id)
  const [isQuadroDropdownOpen, setIsQuadroDropdownOpen] = useState(false)
  const [filtroColuna, setFiltroColuna] = useState<string>('todos')

  // Modal Novo Quadro
  const [isNewQuadroModalOpen, setIsNewQuadroModalOpen] = useState(false)
  const [novoQuadroNome, setNovoQuadroNome] = useState('')
  const [quantidadeColunas, setQuantidadeColunas] = useState<number>(3)
  const [colunasConfig, setColunasConfig] = useState<{ label: string; color: string }[]>([
    { label: 'A Fazer', color: 'bg-slate-400' },
    { label: 'Em Andamento', color: 'bg-blue-500' },
    { label: 'Concluído', color: 'bg-emerald-500' },
  ])

  // Modal Novo Card (Item)
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false)
  const [targetColumnId, setTargetColumnId] = useState<string>('')
  const [cardTitle, setCardTitle] = useState('')
  const [cardSelectedTagIndex, setCardSelectedTagIndex] = useState(2) // Normal por padrão
  const [cardDue, setCardDue] = useState('Hoje')

  // Drag and Drop State
  const [draggedCardInfo, setDraggedCardInfo] = useState<{ cardId: number; sourceColId: string } | null>(null)

  const currentQuadro = quadros.find(q => q.id === activeQuadroId) || quadros[0]

  const handleSelectQuadro = (id: string) => {
    setActiveQuadroId(id)
    setFiltroColuna('todos')
    setIsQuadroDropdownOpen(false)
  }

  // Ajusta a quantidade e inputs de colunas dinamicamente
  const handleQuantidadeColunasChange = (qtd: number) => {
    setQuantidadeColunas(qtd)
    const updated = [...colunasConfig]
    if (qtd > updated.length) {
      for (let i = updated.length; i < qtd; i++) {
        updated.push({ label: `Coluna ${i + 1}`, color: availableColors[i % availableColors.length].value })
      }
    } else {
      updated.splice(qtd)
    }
    setColunasConfig(updated)
  }

  const handleAddQuadroSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!novoQuadroNome.trim()) return

    const newColumnsFormatted: Column[] = colunasConfig.map((col, index) => ({
      id: `col_${Date.now()}_${index}`,
      label: col.label,
      color: col.color
    }))

    const initialCards: Record<string, Card[]> = {}
    newColumnsFormatted.forEach(col => {
      initialCards[col.id] = []
    })

    const newQuadro: QuadroData = {
      id: String(Date.now()),
      name: novoQuadroNome,
      columns: newColumnsFormatted,
      cards: initialCards
    }

    setQuadros([...quadros, newQuadro])
    setActiveQuadroId(newQuadro.id)
    setFiltroColuna('todos')
    setNovoQuadroNome('')
    setQuantidadeColunas(3)
    setColunasConfig([
      { label: 'A Fazer', color: 'bg-slate-400' },
      { label: 'Em Andamento', color: 'bg-blue-500' },
      { label: 'Concluído', color: 'bg-emerald-500' },
    ])
    setIsNewQuadroModalOpen(false)
  }

  const handleOpenAddCardModal = (colId: string) => {
    setTargetColumnId(colId)
    setCardTitle('')
    setCardSelectedTagIndex(2)
    setCardDue('Hoje')
    setIsNewCardModalOpen(true)
  }

  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cardTitle.trim() || !targetColumnId) return

    const tagObj = priorityTags[cardSelectedTagIndex]

    const newCard: Card = {
      id: Date.now(),
      title: cardTitle,
      tag: tagObj.label,
      tagColor: tagObj.tagColor,
      due: cardDue || 'Hoje'
    }

    const updatedQuadros = quadros.map(q => {
      if (q.id === currentQuadro.id) {
        const colCards = q.cards[targetColumnId] || []
        return {
          ...q,
          cards: {
            ...q.cards,
            [targetColumnId]: [...colCards, newCard]
          }
        }
      }
      return q
    })

    setQuadros(updatedQuadros)
    setIsNewCardModalOpen(false)
  }

  // Lógica de Drag and Drop
  const handleDragStart = (e: React.DragEvent, cardId: number, sourceColId: string) => {
    setDraggedCardInfo({ cardId, sourceColId })
    e.dataTransfer.setData('text/plain', String(cardId))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, destColId: string, targetCardId?: number) => {
    e.preventDefault()
    if (!draggedCardInfo) return

    const { cardId, sourceColId } = draggedCardInfo
    const sourceCards = [...(currentQuadro.cards[sourceColId] || [])]
    const cardIndex = sourceCards.findIndex(c => c.id === cardId)
    if (cardIndex === -1) return

    const [movedCard] = sourceCards.splice(cardIndex, 1)

    const updatedQuadros = quadros.map(q => {
      if (q.id === currentQuadro.id) {
        let newCardsMap = { ...q.cards }

        if (sourceColId === destColId) {
          const destCards = sourceCards
          if (targetCardId !== undefined) {
            const targetIndex = destCards.findIndex(c => c.id === targetCardId)
            if (targetIndex !== -1) {
              destCards.splice(targetIndex, 0, movedCard)
            } else {
              destCards.push(movedCard)
            }
          } else {
            destCards.push(movedCard)
          }
          newCardsMap[sourceColId] = destCards
        } else {
          const destCards = [...(newCardsMap[destColId] || [])]
          if (targetCardId !== undefined) {
            const targetIndex = destCards.findIndex(c => c.id === targetCardId)
            if (targetIndex !== -1) {
              destCards.splice(targetIndex, 0, movedCard)
            } else {
              destCards.push(movedCard)
            }
          } else {
            destCards.push(movedCard)
          }
          newCardsMap[sourceColId] = sourceCards
          newCardsMap[destColId] = destCards
        }

        return { ...q, cards: newCardsMap }
      }
      return q
    })

    setQuadros(updatedQuadros)
    setDraggedCardInfo(null)
  }

  const columnsToDisplay = filtroColuna === 'todos' 
    ? currentQuadro.columns 
    : currentQuadro.columns.filter(c => c.id === filtroColuna)

  return (
    <>
      <Header title="Quadro" subtitle="Gestão de tarefas e fluxos" />

      {/* CONTAINER INTERMEDIÁRIO */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-card border border-border rounded-2xl p-4 shadow-sm shrink-0">
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsQuadroDropdownOpen(!isQuadroDropdownOpen)}
              className="flex items-center gap-2 h-10 px-4 rounded-xl border border-border bg-background hover:bg-muted/50 text-xs font-semibold text-foreground transition-colors"
            >
              <span className="text-muted-foreground font-normal">Quadro:</span>
              <span>{currentQuadro.name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-1" />
            </button>

            {isQuadroDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-xl border border-border bg-card p-1.5 shadow-xl z-30">
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Seus Quadros:
                </div>
                {quadros.map(q => (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuadro(q.id)}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs text-foreground hover:bg-muted transition-colors"
                  >
                    <span className="truncate">{q.name}</span>
                    {q.id === activeQuadroId && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsNewQuadroModalOpen(true)}
            className="flex items-center gap-1.5 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Criar
          </button>
        </div>

        {/* Filtros Dinâmicos */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] text-muted-foreground mr-1 font-medium">Filtrar:</span>
          <button
            onClick={() => setFiltroColuna('todos')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap",
              filtroColuna === 'todos'
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Todas
          </button>
          {currentQuadro.columns.map(col => (
            <button
              key={col.id}
              onClick={() => setFiltroColuna(col.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5",
                filtroColuna === col.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className={cn('h-1.5 w-1.5 rounded-full', col.color)} />
              {col.label}
            </button>
          ))}
        </div>

      </div>

      {/* Colunas do Quadro com suporte a Drag & Drop */}
      <div className="flex flex-1 min-h-0 gap-3 overflow-hidden">
        {columnsToDisplay.map(col => {
          const cardsInCol = currentQuadro.cards[col.id] || []
          return (
            <div 
              key={col.id} 
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className="flex flex-1 min-w-[260px] flex-col rounded-2xl border border-border bg-card shadow-md overflow-hidden"
            >
              <div className="flex items-center gap-2 border-b border-border px-4 py-3 shrink-0">
                <span className={cn('h-2 w-2 rounded-full', col.color)} />
                <h3 className="flex-1 text-xs font-semibold text-foreground">{col.label}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {cardsInCol.length}
                </span>
                <button 
                  onClick={() => handleOpenAddCardModal(col.id)}
                  className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  title="Criar novo item"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {cardsInCol.map(card => (
                  <div 
                    key={card.id} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id, col.id)}
                    onDrop={(e) => {
                      e.stopPropagation()
                      handleDrop(e, col.id, card.id)
                    }}
                    className="group rounded-xl border border-border bg-background p-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-grab active:cursor-grabbing relative"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-start gap-1.5 flex-1">
                        <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-xs font-medium text-foreground leading-snug flex-1">{card.title}</p>
                      </div>
                      <button className="shrink-0 rounded-md p-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold', card.tagColor)}>
                        <Tag className="h-2.5 w-2.5" />{card.tag}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" />{card.due}
                      </span>
                    </div>
                  </div>
                ))}

                {cardsInCol.length === 0 && (
                  <div className="text-center py-6 text-[11px] text-muted-foreground/60 border border-dashed border-border/60 rounded-xl">
                    Nenhuma tarefa aqui
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal: Criar Novo Quadro */}
      {isNewQuadroModalOpen && (
        <div 
          onClick={() => setIsNewQuadroModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
          >
            <div className="p-5 pb-3 flex justify-between items-start border-b border-border shrink-0">
              <div>
                <h2 className="text-sm font-bold text-foreground">Criar Novo Quadro</h2>
                <p className="text-[10px] text-muted-foreground mt-0.5">Defina o nome, a quantidade de colunas, títulos e cores de referência</p>
              </div>
              <button 
                onClick={() => setIsNewQuadroModalOpen(false)} 
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <form onSubmit={handleAddQuadroSubmit} className="p-5 space-y-4 overflow-y-auto">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-muted-foreground">Nome do Quadro</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Gestão de Projetos"
                  value={novoQuadroNome}
                  onChange={(e) => setNovoQuadroNome(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-muted-foreground">Quantidade de Colunas</label>
                <select
                  value={quantidadeColunas}
                  onChange={(e) => handleQuantidadeColunasChange(Number(e.target.value))}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Coluna' : 'Colunas'}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-muted-foreground">Configuração das Colunas (Título e Cor)</label>
                <div className="space-y-2.5">
                  {colunasConfig.map((col, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-xl border border-border bg-muted/20">
                      <input 
                        type="text"
                        required
                        placeholder={`Título da coluna ${index + 1}`}
                        value={col.label}
                        onChange={(e) => {
                          const updated = [...colunasConfig]
                          updated[index].label = e.target.value
                          setColunasConfig(updated)
                        }}
                        className="h-9 flex-1 rounded-lg border border-border bg-background px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <select
                        value={col.color}
                        onChange={(e) => {
                          const updated = [...colunasConfig]
                          updated[index].color = e.target.value
                          setColunasConfig(updated)
                        }}
                        className="h-9 w-32 rounded-lg border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        {availableColors.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                      <span className={cn('h-4 w-4 rounded-full shrink-0', col.color)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5 justify-end pt-3 border-t border-border">
                <button 
                  type="button"
                  onClick={() => setIsNewQuadroModalOpen(false)} 
                  className="px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted text-xs font-semibold text-muted-foreground transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-md transition-opacity hover:opacity-90"
                >
                  Criar Quadro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Criar Novo Item (Card) */}
      {isNewCardModalOpen && (
        <div 
          onClick={() => setIsNewCardModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-5 pb-3 flex justify-between items-start border-b border-border">
              <div>
                <h2 className="text-sm font-bold text-foreground">Novo Item na Coluna</h2>
                <p className="text-[10px] text-muted-foreground mt-0.5">Preencha as informações do novo card</p>
              </div>
              <button 
                onClick={() => setIsNewCardModalOpen(false)} 
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <form onSubmit={handleAddCardSubmit} className="p-5 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-muted-foreground">Título do Item</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Realizar reunião com fornecedor"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-muted-foreground">Tag de Prioridade</label>
                <div className="grid grid-cols-2 gap-2">
                  {priorityTags.map((pt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCardSelectedTagIndex(idx)}
                      className={cn(
                        "flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold transition-all",
                        cardSelectedTagIndex === idx 
                          ? "border-primary ring-2 ring-primary/20 bg-primary/5 text-foreground" 
                          : "border-border bg-background text-muted-foreground hover:bg-muted/50"
                      )}
                    >
                      <span className={cn('h-2 w-2 rounded-full', pt.tagColor.split(' ')[0])} />
                      {pt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-muted-foreground">Data para Realizar a Tarefa</label>
                <input 
                  type="text" 
                  placeholder="Ex: Hoje, Amanhã, 15 abr"
                  value={cardDue}
                  onChange={(e) => setCardDue(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="flex gap-2.5 justify-end pt-3 border-t border-border">
                <button 
                  type="button"
                  onClick={() => setIsNewCardModalOpen(false)} 
                  className="px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted text-xs font-semibold text-muted-foreground transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-md transition-opacity hover:opacity-90"
                >
                  Adicionar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}