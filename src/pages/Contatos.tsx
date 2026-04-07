import { Header } from '../components/dashboard/Header'
import { Search, Filter, Plus, MoreHorizontal, Mail, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const contacts = [
  { id: 1, name: 'Ana Silva',        email: 'ana.silva@email.com',    phone: '(11) 99999-1234', tag: 'Cliente',    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',    status: 'active' },
  { id: 2, name: 'João Pedro',       email: 'joao.pedro@email.com',   phone: '(11) 98888-5678', tag: 'Lead',       tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300', status: 'active' },
  { id: 3, name: 'Maria Souza',      email: 'maria.souza@email.com',  phone: '(21) 97777-9012', tag: 'Prospect',   tagColor: 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300', status: 'inactive' },
  { id: 4, name: 'Carlos Lima',      email: 'carlos.lima@email.com',  phone: '(31) 96666-3456', tag: 'Cliente',    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',    status: 'active' },
  { id: 5, name: 'Fernanda Costa',   email: 'fernanda@email.com',     phone: '(41) 95555-7890', tag: 'Lead',       tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300', status: 'active' },
  { id: 6, name: 'Rafael Mendes',    email: 'rafael.m@email.com',     phone: '(51) 94444-2345', tag: 'Parceiro',   tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300', status: 'active' },
  { id: 7, name: 'Juliana Rocha',    email: 'ju.rocha@email.com',     phone: '(61) 93333-6789', tag: 'Prospect',   tagColor: 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300', status: 'inactive' },
  { id: 8, name: 'Marcos Oliveira',  email: 'marcos.o@email.com',     phone: '(71) 92222-0123', tag: 'Cliente',    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',    status: 'active' },
]

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

const avatarColors = [
  'bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500',
  'bg-rose-500', 'bg-teal-500', 'bg-indigo-500', 'bg-orange-500',
]

export default function Contatos() {
  return (
    <>
      <Header title="Contatos" subtitle="643 contatos cadastrados" />

      <div className="flex flex-1 min-h-0 flex-col gap-3 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Buscar contatos..." className="h-9 w-full rounded-xl border border-border bg-card pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <button className="flex h-9 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-medium text-muted-foreground shadow-sm hover:text-foreground transition-colors">
            <Filter className="h-3.5 w-3.5" />Filtrar
          </button>
          <button className="ml-auto flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors">
            <Plus className="h-3.5 w-3.5" />Novo Contato
          </button>
        </div>

        {/* Contacts list */}
        <div className="flex-1 rounded-2xl border border-border bg-card shadow-md overflow-hidden min-h-0">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_2fr_1.5fr_1fr_auto] items-center gap-4 border-b border-border px-5 py-2.5">
            {['Nome', 'Email', 'Telefone', 'Tag', ''].map(h => (
              <p key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</p>
            ))}
          </div>

          {/* Rows */}
          <div className="overflow-y-auto h-[calc(100%-40px)]">
            {contacts.map((c, i) => (
              <div
                key={c.id}
                className={cn(
                  'grid grid-cols-[2fr_2fr_1.5fr_1fr_auto] items-center gap-4 px-5 py-3 transition-colors hover:bg-muted/40 cursor-pointer',
                  i < contacts.length - 1 && 'border-b border-border/50'
                )}
              >
                {/* Name + avatar */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white', avatarColors[i % avatarColors.length])}>
                    {initials(c.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-foreground">{c.name}</p>
                    <span className={cn('inline-flex items-center gap-1', c.status === 'active' ? 'text-emerald-500' : 'text-muted-foreground')}>
                      <span className={cn('h-1.5 w-1.5 rounded-full', c.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground')} />
                      <span className="text-[10px]">{c.status === 'active' ? 'Ativo' : 'Inativo'}</span>
                    </span>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <Mail className="h-3 w-3 shrink-0 text-muted-foreground" />
                  <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                </div>
                {/* Phone */}
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3 w-3 shrink-0 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{c.phone}</p>
                </div>
                {/* Tag */}
                <span className={cn('inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold', c.tagColor)}>
                  {c.tag}
                </span>
                {/* Actions */}
                <button className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
