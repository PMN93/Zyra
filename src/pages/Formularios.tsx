import { useState } from 'react'
import { Header } from '../components/dashboard/Header'
import { 
  Plus, 
  FileText, 
  Eye, 
  Edit2, 
  MoreHorizontal, 
  MessageSquare, 
  Calendar,
  Trash2, 
  GripVertical, 
  ArrowLeft, 
  Save, 
  Type, 
  AlignLeft, 
  Lock, 
  Hash, 
  CheckSquare, 
  CircleDot, 
  ChevronDown, 
  List, 
  Search, 
  ToggleLeft, 
  Clock, 
  CalendarRange, 
  Upload, 
  Camera, 
  PenTool, 
  Sliders, 
  Star, 
  Send, 
  RotateCcw, 
  ArrowRight,
  X,
  Layers
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormField {
  id: string
  type: string
  label: string
  placeholder?: string
  required: boolean
}

interface FormStep {
  id: string
  title: string
  fields: FormField[]
}

const availableComponents = [
  { type: 'text', label: 'Caixa de Texto', icon: Type, category: 'Entrada de Texto' },
  { type: 'textarea', label: 'Área de Texto', icon: AlignLeft, category: 'Entrada de Texto' },
  { type: 'password', label: 'Campo de Senha', icon: Lock, category: 'Entrada de Texto' },
  { type: 'number', label: 'Seletor de Número', icon: Hash, category: 'Entrada de Texto' },
  { type: 'checkbox', label: 'Caixa de Seleção', icon: CheckSquare, category: 'Seleção' },
  { type: 'radio', label: 'Botão de Opção', icon: CircleDot, category: 'Seleção' },
  { type: 'select', label: 'Menu Suspenso', icon: ChevronDown, category: 'Seleção' },
  { type: 'listbox', label: 'Lista de Seleção', icon: List, category: 'Seleção' },
  { type: 'combobox', label: 'Combobox / Auto-complete', icon: Search, category: 'Seleção' },
  { type: 'toggle', label: 'Chave de Alternância', icon: ToggleLeft, category: 'Seleção' },
  { type: 'date', label: 'Bloco de Data', icon: Calendar, category: 'Data e Hora' },
  { type: 'time', label: 'Seletor de Hora', icon: Clock, category: 'Data e Hora' },
  { type: 'daterange', label: 'Intervalo de Data', icon: CalendarRange, category: 'Data e Hora' },
  { type: 'fileupload', label: 'Upload de Arquivo', icon: Upload, category: 'Mídia e Especiais' },
  { type: 'camera', label: 'Captura de Imagem / Câmera', icon: Camera, category: 'Mídia e Especiais' },
  { type: 'signature', label: 'Bloco de Assinatura', icon: PenTool, category: 'Mídia e Especiais' },
  { type: 'slider', label: 'Controle Deslizante', icon: Sliders, category: 'Avançado' },
  { type: 'rating', label: 'Classificação por Estrelas', icon: Star, category: 'Avançado' },
  { type: 'submit', label: 'Botão de Envio', icon: Send, category: 'Ações' },
  { type: 'reset', label: 'Botão de Limpeza', icon: RotateCcw, category: 'Ações' },
  { type: 'stepper', label: 'Avançar / Voltar', icon: ArrowRight, category: 'Ações' },
]

const initialForms = [
  { id: 1, name: 'Pré-cadastro Raríssima Be Rare', responses: 1954, status: 'active',   created: '15 jan 2025', views: 3240 },
  { id: 2, name: 'Pesquisa de Satisfação Q1',      responses: 128,  status: 'active',   created: '1 fev 2025',  views: 450  },
  { id: 3, name: 'Formulário de Contato Website',  responses: 67,   status: 'inactive', created: '10 dez 2024', views: 890  },
  { id: 4, name: 'Avaliação de Atendimento',         responses: 312,  status: 'inactive', created: '5 nov 2024',  views: 1100 },
]

export default function Formularios() {
  const [currentView, setCurrentView] = useState<'list' | 'builder'>('list')
  const [forms, setForms] = useState(initialForms)

  // Estados do Construtor com Steps
  const [formTitle, setFormTitle] = useState('Novo Formulário sem Título')
  const [formDescription, setFormDescription] = useState('Adicione uma descrição para o seu formulário')
  
  const [steps, setSteps] = useState<FormStep[]>([
    {
      id: 'step-1',
      title: 'Etapa 1',
      fields: [
        { id: '1', type: 'text', label: 'Nome Completo', placeholder: 'Digite seu nome', required: true }
      ]
    }
  ])
  const [activeStepId, setActiveStepId] = useState<string>('step-1')
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>('1')

  const currentStep = steps.find(s => s.id === activeStepId) || steps[0]

  const handleAddStep = () => {
    const newStepId = `step-${Date.now()}`
    const newStep: FormStep = {
      id: newStepId,
      title: `Etapa ${steps.length + 1}`,
      fields: []
    }
    setSteps([...steps, newStep])
    setActiveStepId(newStepId)
    setSelectedFieldId(null)
  }

  const handleDeleteStep = (stepId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (steps.length === 1) return // Mantém pelo menos uma etapa
    const updatedSteps = steps.filter(s => s.id !== stepId)
    setSteps(updatedSteps)
    if (activeStepId === stepId) {
      setActiveStepId(updatedSteps[0].id)
      setSelectedFieldId(updatedSteps[0].fields[0]?.id || null)
    }
  }

  const handleAddField = (component: typeof availableComponents[0]) => {
    const newField: FormField = {
      id: String(Date.now()),
      type: component.type,
      label: component.label,
      placeholder: 'Digite aqui...',
      required: false
    }

    const updatedSteps = steps.map(step => {
      if (step.id === activeStepId) {
        return {
          ...step,
          fields: [...step.fields, newField]
        }
      }
      return step
    })

    setSteps(updatedSteps)
    setSelectedFieldId(newField.id)
  }

  const handleRemoveField = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updatedSteps = steps.map(step => {
      if (step.id === activeStepId) {
        return {
          ...step,
          fields: step.fields.filter(f => f.id !== id)
        }
      }
      return step
    })

    setSteps(updatedSteps)
    if (selectedFieldId === id) {
      const currentFields = updatedSteps.find(s => s.id === activeStepId)?.fields || []
      setSelectedFieldId(currentFields.length > 0 ? currentFields[0].id : null)
    }
  }

  const handleDeleteForm = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setForms(forms.filter(form => form.id !== id))
  }

  const handleSaveForm = () => {
    const newFormItem = {
      id: Date.now(),
      name: formTitle,
      responses: 0,
      status: 'active',
      created: 'Hoje',
      views: 0
    }
    setForms([newFormItem, ...forms])
    setCurrentView('list')
  }

  const handleOpenPreview = () => {
    const previewWindow = window.open('', '_blank')
    if (!previewWindow) return

    const stepsHtml = steps.map((step, sIdx) => {
      const fieldsHtml = step.fields.map(field => {
        let inputHtml = `<input type="${field.type === 'password' ? 'password' : field.type === 'number' ? 'number' : 'text'}" placeholder="${field.placeholder || ''}" class="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />`
        
        if (field.type === 'textarea') {
          inputHtml = `<textarea placeholder="${field.placeholder || ''}" class="w-full h-24 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"></textarea>`
        } else if (field.type === 'checkbox' || field.type === 'radio' || field.type === 'toggle') {
          inputHtml = `<div class="flex items-center gap-2 text-sm"><input type="${field.type === 'radio' ? 'radio' : 'checkbox'}" class="h-4 w-4 rounded border-border text-primary" /><span>Opção de exemplo</span></div>`
        } else if (field.type === 'submit') {
          inputHtml = `<button type="button" class="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">${field.label}</button>`
        }

        return `
          <div class="space-y-1.5 p-4 rounded-2xl border border-border bg-card shadow-sm">
            <label class="block text-xs font-semibold text-foreground">${field.label} ${field.required ? '<span class="text-rose-500">*</span>' : ''}</label>
            ${inputHtml}
          </div>
        `
      }).join('')

      return `
        <div class="step-container ${sIdx === 0 ? '' : 'hidden'} space-y-4" data-step="${sIdx}">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
            <h2 class="text-base font-bold text-slate-800">${step.title}</h2>
            <span class="text-xs font-medium text-slate-500">Etapa ${sIdx + 1} de ${steps.length}</span>
          </div>
          ${fieldsHtml}
          <div class="flex items-center justify-between pt-4">
            ${sIdx > 0 ? `<button type="button" onclick="changeStep(${sIdx - 1})" class="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white">Voltar</button>` : '<div></div>'}
            ${sIdx < steps.length - 1 ? `<button type="button" onclick="changeStep(${sIdx + 1})" class="px-4 py-2 rounded-xl bg-blue-600 text-xs font-semibold text-white">Avançar</button>` : `<button type="submit" class="px-4 py-2 rounded-xl bg-emerald-600 text-xs font-semibold text-white">Enviar Formulário</button>`}
          </div>
        </div>
      `
    }).join('')

    previewWindow.document.write(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>${formTitle} - Visualização</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <script>
          function changeStep(targetIndex) {
            const steps = document.querySelectorAll('.step-container');
            steps.forEach((el, idx) => {
              if (idx === targetIndex) {
                el.classList.remove('hidden');
              } else {
                el.classList.add('hidden');
              }
            });
          }
        </script>
      </head>
      <body class="bg-slate-50 min-h-screen py-12 px-4 flex flex-col items-center">
        <div class="w-full max-w-xl space-y-6">
          <div class="text-center space-y-2">
            <h1 class="text-2xl font-bold text-slate-900">${formTitle}</h1>
            <p class="text-sm text-slate-500">${formDescription}</p>
          </div>
          <form class="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200" onsubmit="event.preventDefault(); alert('Formulário enviado com sucesso!');">
            ${stepsHtml}
          </form>
        </div>
      </body>
      </html>
    `)
    previewWindow.document.close()
  }

  const selectedField = currentStep?.fields.find(f => f.id === selectedFieldId)

  if (currentView === 'builder') {
    return (
      <>
        <Header title="Construtor de Formulários" subtitle="Crie e personalize seu formulário com blocos e etapas" />

        {/* Barra superior de Ações do Construtor */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-card border border-border rounded-2xl p-4 shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => setCurrentView('list')}
              className="flex items-center gap-1.5 h-10 px-3 rounded-xl border border-border bg-background hover:bg-muted/50 text-xs font-semibold text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
            <div>
              <input 
                type="text" 
                value={formTitle} 
                onChange={(e) => setFormTitle(e.target.value)}
                className="text-sm font-bold text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none px-1 py-0.5 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={handleOpenPreview}
              className="flex items-center gap-1.5 h-10 px-4 rounded-xl border border-border bg-background hover:bg-muted/50 text-xs font-semibold text-foreground transition-colors cursor-pointer"
            >
              <Eye className="h-4 w-4" />
              Visualizar
            </button>
            <button 
              type="button"
              onClick={handleSaveForm}
              className="flex items-center gap-1.5 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer"
            >
              <Save className="h-4 w-4" />
              Salvar Formulário
            </button>
          </div>
        </div>

        {/* Layout Principal: Coluna de Steps (Esquerda) + Canvas (Centro) + Painel Lateral (Direita) */}
        <div className="flex flex-1 min-h-0 gap-3 overflow-hidden">
          
          {/* COLUNA DE ETAPAS / STEPS (Esquerda do Canvas) */}
          <div className="w-56 flex flex-col rounded-2xl border border-border bg-card shadow-md overflow-hidden shrink-0">
            <div className="border-b border-border px-4 py-3 bg-muted/25 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Etapas</h3>
              </div>
              <button 
                type="button"
                onClick={handleAddStep}
                className="flex items-center gap-1 h-7 px-2 rounded-lg bg-primary text-primary-foreground text-[11px] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                title="Adicionar nova etapa"
              >
                <Plus className="h-3 w-3" /> Etapa
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  onClick={() => {
                    setActiveStepId(step.id)
                    setSelectedFieldId(step.fields[0]?.id || null)
                  }}
                  className={cn(
                    "group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer text-xs",
                    activeStepId === step.id 
                      ? "bg-primary/10 border-primary font-semibold text-primary" 
                      : "bg-background border-border hover:bg-muted/50 text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
                      {index + 1}
                    </span>
                    <input 
                      type="text"
                      value={step.title}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        const val = e.target.value
                        setSteps(steps.map(s => s.id === step.id ? { ...s, title: val } : s))
                      }}
                      className="bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none truncate w-24 text-xs"
                    />
                  </div>

                  {steps.length > 1 && (
                    <button 
                      type="button"
                      onClick={(e) => handleDeleteStep(step.id, e)}
                      className="text-muted-foreground hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                      title="Excluir etapa"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CANVAS DO FORMULÁRIO */}
          <div className="flex-1 flex flex-col rounded-2xl border border-border bg-card shadow-md overflow-hidden">
            <div className="border-b border-border px-6 py-4 bg-muted/25 shrink-0 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Canvas de Construção ({currentStep?.title})</h3>
                <p className="text-[11px] text-muted-foreground">Arraste ou clique nos componentes à direita para montar a etapa atual</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-2xl mx-auto w-full">
              <div className="border-b border-border pb-4 mb-4">
                <input 
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="text-xl font-bold text-foreground bg-transparent w-full focus:outline-none"
                />
                <input 
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="text-xs text-muted-foreground bg-transparent w-full focus:outline-none mt-1"
                />
              </div>

              {currentStep?.fields.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
                  <p className="text-xs font-medium text-muted-foreground">Esta etapa está vazia.</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">Adicione componentes usando o painel lateral direito.</p>
                </div>
              ) : (
                currentStep?.fields.map((field) => (
                  <div 
                    key={field.id}
                    onClick={() => setSelectedFieldId(field.id)}
                    className={cn(
                      "group relative p-4 rounded-xl border bg-background transition-all cursor-pointer shadow-sm",
                      selectedFieldId === field.id ? "border-primary ring-2 ring-primary/10" : "border-border hover:border-border/80"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground/40" />
                        <span className="text-xs font-semibold text-foreground">
                          {field.label} {field.required && <span className="text-rose-500">*</span>}
                        </span>
                      </div>
                      <button 
                        type="button"
                        onClick={(e) => handleRemoveField(field.id, e)}
                        className="text-muted-foreground hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="pointer-events-none">
                      {field.type === 'textarea' ? (
                        <div className="h-20 w-full rounded-xl border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                          {field.placeholder}
                        </div>
                      ) : field.type === 'checkbox' || field.type === 'radio' || field.type === 'toggle' ? (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="h-4 w-4 rounded border border-border bg-muted/20" />
                          <span>Opção de exemplo</span>
                        </div>
                      ) : field.type === 'submit' || field.type === 'reset' ? (
                        <div className="h-9 w-32 rounded-xl bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                          {field.label}
                        </div>
                      ) : (
                        <div className="h-9 w-full rounded-xl border border-border bg-muted/20 px-3 flex items-center text-xs text-muted-foreground">
                          {field.placeholder}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* PAINEL LATERAL: BLOCOS E COMPONENTES / PROPRIEDADES */}
          <div className="w-80 flex flex-col rounded-2xl border border-border bg-card shadow-md overflow-hidden shrink-0">
            <div className="border-b border-border px-4 py-3 bg-muted/25 shrink-0">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Blocos e Componentes</h3>
              <p className="text-[10px] text-muted-foreground">Clique para adicionar à etapa atual</p>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {availableComponents.map((comp, idx) => {
                const Icon = comp.icon
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddField(comp)}
                    className="flex w-full items-center justify-between p-2.5 rounded-xl border border-border bg-background hover:bg-muted/50 text-left text-xs font-medium text-foreground transition-all group shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span>{comp.label}</span>
                    </div>
                    <Plus className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )
              })}
            </div>

            {selectedField && (
              <div className="border-t border-border p-4 bg-muted/10 shrink-0 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-foreground uppercase tracking-wider">Propriedades do Bloco</h4>
                  <button type="button" onClick={() => setSelectedFieldId(null)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] font-semibold text-muted-foreground">Rótulo / Label</label>
                    <input 
                      type="text" 
                      value={selectedField.label}
                      onChange={(e) => {
                        const updatedFields = currentStep.fields.map(f => f.id === selectedField.id ? { ...f, label: e.target.value } : f)
                        setSteps(steps.map(s => s.id === activeStepId ? { ...s, fields: updatedFields } : s))
                      }}
                      className="h-8 w-full rounded-lg border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-muted-foreground">Placeholder</label>
                    <input 
                      type="text" 
                      value={selectedField.placeholder || ''}
                      onChange={(e) => {
                        const updatedFields = currentStep.fields.map(f => f.id === selectedField.id ? { ...f, placeholder: e.target.value } : f)
                        setSteps(steps.map(s => s.id === activeStepId ? { ...s, fields: updatedFields } : s))
                      }}
                      className="h-8 w-full rounded-lg border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="text-[10px] font-semibold text-muted-foreground">Campo Obrigatório</label>
                    <input 
                      type="checkbox"
                      checked={selectedField.required}
                      onChange={(e) => {
                        const updatedFields = currentStep.fields.map(f => f.id === selectedField.id ? { ...f, required: e.target.checked } : f)
                        setSteps(steps.map(s => s.id === activeStepId ? { ...s, fields: updatedFields } : s))
                      }}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </>
    )
  }

  return (
    <>
      <Header title="Formulários" subtitle="2 formulários ativos" />

      <div className="flex flex-1 min-h-0 flex-col gap-3 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 shrink-0">
          <p className="text-xs text-muted-foreground">{forms.length} formulários no total</p>
          <button 
            type="button"
            onClick={() => setCurrentView('builder')}
            className="ml-auto flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />Novo Formulário
          </button>
        </div>

        {/* Forms grid */}
        <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto content-start">
          {forms.map(form => (
            <div key={form.id} className="group rounded-2xl border border-border bg-card p-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{form.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                        form.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                          : 'bg-muted text-muted-foreground'
                      )}>
                        <span className={cn('h-1.5 w-1.5 rounded-full', form.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground')} />
                        {form.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button 
                    type="button" 
                    onClick={(e) => handleDeleteForm(form.id, e)}
                    className="rounded-lg p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-rose-500/10 hover:text-rose-600 transition-all cursor-pointer"
                    title="Excluir formulário"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button 
                    type="button" 
                    className="rounded-lg p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted hover:text-foreground transition-all cursor-pointer"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-xl bg-muted/40 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground">Respostas</p>
                  <p className="text-sm font-bold text-foreground flex items-center gap-1">
                    <MessageSquare className="h-3 w-3 text-primary" />{form.responses.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/40 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground">Visualizações</p>
                  <p className="text-sm font-bold text-foreground flex items-center gap-1">
                    <Eye className="h-3 w-3 text-violet-500" />{form.views.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/40 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground">Criado em</p>
                  <p className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />{form.created}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                <button type="button" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
                  <Eye className="h-3.5 w-3.5" />Ver Respostas
                </button>
                <button 
                  type="button" 
                  onClick={() => setCurrentView('builder')}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary/10 py-2 text-[11px] font-semibold text-primary hover:bg-primary/15 transition-colors cursor-pointer"
                >
                  <Edit2 className="h-3.5 w-3.5" />Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}