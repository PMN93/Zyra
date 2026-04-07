import { Header } from '../components/dashboard/Header'
import { Plus, Edit2, Trash2, Tag } from 'lucide-react'

const tags = [
  { id: 1, name: 'Cliente',      count: 284, color: '#3b82f6', bg: 'bg-blue-100 dark:bg-blue-500/20',       text: 'text-blue-700 dark:text-blue-300'       },
  { id: 2, name: 'Lead',         count: 198, color: '#f59e0b', bg: 'bg-amber-100 dark:bg-amber-500/20',     text: 'text-amber-700 dark:text-amber-300'     },
  { id: 3, name: 'Prospect',     count: 76,  color: '#8b5cf6', bg: 'bg-violet-100 dark:bg-violet-500/20',   text: 'text-violet-700 dark:text-violet-300'   },
  { id: 4, name: 'Parceiro',     count: 43,  color: '#10b981', bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-300' },
  { id: 5, name: 'Urgente',      count: 12,  color: '#ef4444', bg: 'bg-rose-100 dark:bg-rose-500/20',       text: 'text-rose-700 dark:text-rose-300'       },
  { id: 6, name: 'VIP',          count: 29,  color: '#f97316', bg: 'bg-orange-100 dark:bg-orange-500/20',   text: 'text-orange-700 dark:text-orange-300'   },
  { id: 7, name: 'Inativo',      count: 88,  color: '#64748b', bg: 'bg-slate-100 dark:bg-slate-500/20',     text: 'text-slate-700 dark:text-slate-300'     },
  { id: 8, name: 'Newsletter',   count: 331, color: '#14b8a6', bg: 'bg-teal-100 dark:bg-teal-500/20',       text: 'text-teal-700 dark:text-teal-300'       },
]

export default function Tags() {
  return (
    <>
      <Header title="Tags" subtitle="Gerenciamento de tags" />

      <div className="flex flex-1 min-h-0 flex-col gap-3 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 shrink-0">
          <p className="text-xs text-muted-foreground">{tags.length} tags cadastradas</p>
          <button className="ml-auto flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors">
            <Plus className="h-3.5 w-3.5" />Nova Tag
          </button>
        </div>

        {/* Tags grid */}
        <div className="flex-1 rounded-2xl border border-border bg-card shadow-md overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border px-5 py-2.5">
            {['Tag', 'Contatos', '', ''].map((h, i) => (
              <p key={i} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</p>
            ))}
          </div>

          <div className="overflow-y-auto h-[calc(100%-40px)]">
            {tags.map((tag, i) => (
              <div key={tag.id} className={`group grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors cursor-pointer ${i < tags.length - 1 ? 'border-b border-border/50' : ''}`}>
                {/* Tag pill + bar */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tag.bg} ${tag.text}`}>
                    <Tag className="h-3 w-3" style={{ color: tag.color }} />
                    {tag.name}
                  </span>
                  {/* Usage bar */}
                  <div className="flex-1 max-w-[200px]">
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${(tag.count / 643) * 100}%`, backgroundColor: tag.color }}
                      />
                    </div>
                  </div>
                </div>
                {/* Count */}
                <span className="text-xs font-semibold text-foreground">{tag.count} contatos</span>
                {/* Edit */}
                <button className="rounded-lg p-1.5 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted hover:text-foreground transition-all">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                {/* Delete */}
                <button className="rounded-lg p-1.5 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-500/20 transition-all">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
