import { Header } from '../components/dashboard/Header'
import { Search, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const threads = [
  { id: 1, name: 'Ana Silva',       preview: 'Olá, gostaria de saber mais sobre os planos...', time: '2 min',  unread: 2, avatar: 'bg-blue-500' },
  { id: 2, name: 'João Pedro',      preview: 'Já preenchi o formulário, quando retornam?',     time: '18 min', unread: 0, avatar: 'bg-violet-500' },
  { id: 3, name: 'Maria Souza',     preview: 'Perfeito, obrigada pelo retorno!',               time: '1h',     unread: 0, avatar: 'bg-emerald-500' },
  { id: 4, name: 'Carlos Lima',     preview: 'Quando posso agendar uma reunião?',              time: '3h',     unread: 1, avatar: 'bg-amber-500' },
  { id: 5, name: 'Fernanda Costa',  preview: 'Estou com dúvidas sobre a proposta enviada.',    time: '5h',     unread: 0, avatar: 'bg-rose-500' },
  { id: 6, name: 'Rafael Mendes',   preview: 'Ok, vou aguardar o contato da equipe.',          time: '1d',     unread: 0, avatar: 'bg-teal-500' },
]

const messages = [
  { id: 1, sender: 'Ana Silva',  text: 'Olá, gostaria de saber mais sobre os planos disponíveis.',        time: '14:30', mine: false },
  { id: 2, sender: 'Eu',        text: 'Olá Ana! Claro, temos 3 planos: Básico, Pro e Enterprise.',        time: '14:32', mine: true  },
  { id: 3, sender: 'Ana Silva',  text: 'Qual a diferença entre o Pro e o Enterprise?',                    time: '14:33', mine: false },
  { id: 4, sender: 'Eu',        text: 'No Enterprise você tem suporte dedicado e integrações ilimitadas.', time: '14:35', mine: true  },
  { id: 5, sender: 'Ana Silva',  text: 'Ótimo! Como posso começar?',                                      time: '14:36', mine: false },
]

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function whatsapp() {
  const [selected, setSelected] = useState(threads[0].id)
  const active = threads.find(t => t.id === selected)!

  return (
    <>
      <Header title="Whatsapp" subtitle="1954 respostas recebidas" />

      <div className="flex flex-1 min-h-0 gap-3 overflow-hidden">
        {/* Thread list */}
        <div className="w-72 shrink-0 flex flex-col rounded-2xl border border-border bg-card shadow-md overflow-hidden">
          <div className="p-3 border-b border-border shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Buscar..." className="h-8 w-full rounded-xl border border-border bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={cn(
                  'flex w-full items-start gap-3 px-3 py-3 text-left transition-colors',
                  i < threads.length - 1 && 'border-b border-border/50',
                  selected === t.id ? 'bg-primary/5' : 'hover:bg-muted/50'
                )}
              >
                <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white', t.avatar)}>
                  {initials(t.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="truncate text-xs font-semibold text-foreground">{t.name}</p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{t.time}</span>
                  </div>
                  <p className="truncate text-[11px] text-muted-foreground mt-0.5">{t.preview}</p>
                </div>
                {t.unread > 0 && (
                  <span className="shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">{t.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message thread */}
        <div className="flex flex-1 min-w-0 flex-col rounded-2xl border border-border bg-card shadow-md overflow-hidden">
          {/* Thread header */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3 shrink-0">
            <div className={cn('flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white', active.avatar)}>
              {initials(active.name)}
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">{active.name}</p>
              <p className="text-[10px] text-muted-foreground">Via formulário · Pré-cadastro</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={cn('flex gap-2', msg.mine && 'flex-row-reverse')}>
                {!msg.mine && (
                  <div className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white', active.avatar)}>
                    {initials(msg.sender)}
                  </div>
                )}
                <div className={cn(
                  'max-w-[70%] rounded-2xl px-3 py-2 text-xs',
                  msg.mine
                    ? 'rounded-tr-sm bg-primary text-primary-foreground'
                    : 'rounded-tl-sm bg-muted text-foreground'
                )}>
                  <p>{msg.text}</p>
                  <p className={cn('mt-1 text-[10px]', msg.mine ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-border p-3 shrink-0">
            <input placeholder="Escreva uma resposta..." className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
